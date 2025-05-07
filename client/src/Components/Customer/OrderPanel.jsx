
import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const QuestionCard = React.memo(({ question, onRemoveQuestion, onChange, onRemoveAnswer, onAddAnswer }) => {
    const cardStyle = {
        width: '350px',
        margin: '10px',
    };

    return (
        <Card title="Question" style={cardStyle}>
            <div className="p-field">
                <label htmlFor="title">Question Title</label>
                <InputText
                    id="title"
                    name="title"
                    value={question.title}
                    onChange={(e) => onChange(e, question.id)}
                    style={{ width: '100%' }}
                    placeholder="Enter the question title"
                />
            </div>
            <div className="p-field">
                <label htmlFor="content">Question Content</label>
                <InputTextarea
                    id="content"
                    name="content"
                    value={question.content}
                    onChange={(e) => onChange(e, question.id)}
                    rows={3}
                    style={{ width: '100%' }}
                    placeholder="Enter the question content"
                />
            </div>
            <div className="p-field">
                <label>Answers</label>
                {question.answers.map((answer, index) => (
                    <div key={`${question.id}-answer-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <InputText
                            data-index={index}
                            name="answers"
                            value={answer}
                            onChange={(e) => onChange(e, question.id, index)}
                            style={{ flex: 1, marginRight: '10px' }}
                            placeholder={`Answer ${index + 1}`}
                        />
                        <Button
                            icon="pi pi-times"
                            className="p-button-rounded p-button-danger"
                            onClick={() => onRemoveAnswer(question.id, index)}
                        />
                    </div>
                ))}
                <Button label="Add Answer" type="button" onClick={() => onAddAnswer(question.id)} />
            </div>
            <br />
            <Button label="Remove Question" className="p-button-danger" onClick={() => onRemoveQuestion(question.id)} />
        </Card>
    );
});

const OrderPanel = () => {
    const toast = useRef(null);
    const { token } = useSelector((state) => state.token);
    const { userInfo } = useSelector((state) => state.token);
    const navigate = useNavigate();

    const [panelDetails, setPanelDetails] = useState({
        name: '',
        description: '',
        numsOfParticipants: 1000,
        questions: [],
        customer: userInfo.customer,
    });

    const handlePanelChange = (e) => {
        const { name, value } = e.target;
        setPanelDetails({
            ...panelDetails,
            [name]: value,
        });
    };

    const addQuestion = () => {
        const newQuestion = { id: Date.now(), title: '', content: '', answers: [''], userAnswers: [], questionType: '680e4aa1fa7cb5ca5a3ebd6f' };
        setPanelDetails((prev) => ({
            ...prev,
            questions: [...prev.questions, newQuestion],
        }));
    };

    const handleQuestionChange = (e, id, index = null) => {
        const { name, value } = e.target;
        setPanelDetails((prev) => ({
            ...prev,
            questions: prev.questions.map((q) => {
                if (q.id === id) {
                    if (name === 'answers' && index !== null) {
                        const updatedAnswers = [...q.answers];
                        updatedAnswers[index] = value;
                        return { ...q, answers: updatedAnswers };
                    }
                    return { ...q, [name]: value };
                }
                return q;
            }),
        }));
    };

    const removeQuestion = (id) => {
        setPanelDetails((prev) => ({
            ...prev,
            questions: prev.questions.filter((q) => q.id !== id),
        }));
    };

    const addAnswer = (questionId) => {
        setPanelDetails((prev) => {
            const question = prev.questions.find((q) => q.id === questionId);
            if (question.answers.length >= 4) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Answer Limit',
                    detail: 'You cannot add more than 4 answers to a question.',
                    life: 3000,
                });
                return prev;
            }
            return {
                ...prev,
                questions: prev.questions.map((q) =>
                    q.id === questionId
                        ? { ...q, answers: [...q.answers, ''] }
                        : q
                ),
            };
        });
    };

    const removeAnswer = (questionId, index) => {
        setPanelDetails((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === questionId
                    ? { ...q, answers: q.answers.filter((_, i) => i !== index) }
                    : q
            ),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (panelDetails.questions.length < 1) {
                throw new Error("You must add at least one question to the panel.");
            }
            const res = await axios.post('http://localhost:1135/panel', panelDetails, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/customer');
        } catch (error) {
            let errorMessage = error.response
            ? error.response.data.message
            : 'An error occurred while submitting the panel.';
            if (panelDetails.questions.length < 1){
                errorMessage="You must add at least one question to the panel."
            }
      
            toast.current.show({
                severity: 'error',
                summary: 'Submission Error',
                detail: errorMessage,
                life: 5000,
            });
        }
    };
    const surveyCost = panelDetails.questions.length * 5;
    return (
        <div className="order-panel">
            <h2>Create Panel Order</h2>
            
            <div style={{
                marginBottom: '20px',
                fontSize: '24px', 
                fontWeight: 'bold',
                color: '#ffffff', 
                backgroundColor: '#4caf50',
                padding: '10px 20px', 
                borderRadius: '8px', 
                textAlign: 'center', 
                width: 'fit-content', 
                margin: '0 auto' 
            }}>
                Survey Cost: ${surveyCost}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="p-field">
                    <label htmlFor="name">Panel Name</label>
                    <InputText
                        id="name"
                        name="name"
                        value={panelDetails.name}
                        onChange={handlePanelChange}
                        required
                        style={{ width: '100%' }}
                        placeholder="Enter the panel name"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="description">Panel Description</label>
                    <InputTextarea
                        id="description"
                        name="description"
                        value={panelDetails.description}
                        onChange={handlePanelChange}
                        rows={3}
                        style={{ width: '100%' }}
                        placeholder="Enter the panel description"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="numsOfParticipants">Number of Participants</label>
                    <InputNumber
                        id="numsOfParticipants"
                        value={panelDetails.numsOfParticipants}
                        onValueChange={(e) => handlePanelChange({ target: { name: 'numsOfParticipants', value: e.value } })}
                        min={1}
                        style={{ width: '100%' }}
                        placeholder="Enter the number of participants"
                    />
                </div>

                <Button label="Add Question" type="button" onClick={addQuestion} style={{ marginBottom: '20px' }} />

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {panelDetails.questions.map((question) => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            onChange={handleQuestionChange}
                            onRemoveQuestion={removeQuestion}
                            onAddAnswer={addAnswer}
                            onRemoveAnswer={removeAnswer}
                        />
                    ))}
                </div>

                <Button label="Submit Panel Order" type="submit" className="p-button-success" />
            </form>
            <Toast ref={toast} />
        </div>
    );
};

export default OrderPanel;