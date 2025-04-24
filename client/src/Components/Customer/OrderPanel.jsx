


























import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const QuestionCard = React.memo(({ question, onRemoveQuestion, onChange, onRemoveAnswer, onAddAnswer }) => {
    return (
        <Card title="Question" style={{ width: '350px', margin: '10px' }}>
            <div className="p-field">
                <label htmlFor="title">Question Title</label>
                <InputText
                    id="title"
                    name="title"
                    value={question.title}
                    onChange={(e) => onChange(e, question.id)}
                    style={{ width: '100%', fontSize: '16px' }} // Large font size
                />
            </div>
            <div className="p-field">
                <label htmlFor="content">Question Content</label>
                <InputText
                    id="content"
                    name="content"
                    value={question.content}
                    onChange={(e) => onChange(e, question.id)}
                    rows={2}
                    style={{ width: '100%', fontSize: '16px' }} // Large font size
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
            <Button label="Remove Question" onClick={() => onRemoveQuestion(question.id)} />
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
        customer:userInfo._id
    });

    const handlePanelChange = (e) => {
        const { name, value } = e.target;
        setPanelDetails({
            ...panelDetails,
            [name]: value,
        });
    };

    const addQuestion = () => {
        const newQuestion = { id: Date.now(), title: '', cotents: '', answers: [''] ,userAnswewrs:[]};
        setPanelDetails((prev) => ({
            ...prev,
            questions: [...prev.questions, newQuestion],
        }));
    };

    const handleQuestionChange = (e, id, index = null) => {
        const { name, value,content } = e.target;
        setPanelDetails((prev) => ({
            ...prev,
            questions: prev.questions.map((q) => {
                if (q.id === id) {
                    if (name === 'answers' && index !== null) {
                        const updatedAnswers = [...q.answers];
                        updatedAnswers[index] = value;
                        return { ...q, answers: updatedAnswers };
                    }
                    if (name==='content'){
                        return { ...q, ['cotents']: value }
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
        setPanelDetails((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === questionId
                    ? { ...q, answers: [...q.answers, ''] }
                    : q
            ),
        }));
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
            console.log(panelDetails);

            const res = await axios.post('http://localhost:1135/panel', panelDetails, {
                headers: { Authorization: `Bearer ${token}` },
            });
        navigate('/customer');
            console.log(res);
        } catch (error) {
            console.error('Submission error:', error);
            const errorMessage = error.response ? error.response.data.message : 'An error occurred during the submission.';
            toast.current.show({ severity: 'error', summary: 'Request Failed', detail: errorMessage });
        }

    };
        return (

    <div className="order-panel">
    <h2>Create Panel Order</h2>
    <form onSubmit={handleSubmit}>
        <div className="p-field">
            <label htmlFor="name">Panel Name</label>
            <InputText
                id="name"
                name="name"
                value={panelDetails.name}
                onChange={handlePanelChange}
                required
            />
        </div>

        <div className="p-field">
            <label htmlFor="description">Description</label>
            <InputText
                id="description"
                name="description"
                value={panelDetails.description}
                onChange={handlePanelChange}
                rows={3}
            />
        </div>

        <div className="p-field">
            <label htmlFor="numsOfParticipants">Number of Participants</label>
            <InputText
                id="numsOfParticipants"
                value={panelDetails.numsOfParticipants}
                onChange={(e) => handlePanelChange({ target: { name: 'numsOfParticipants', value: e.target.value } })}
            />
        </div>

        <Button label="Add Question" type="button" onClick={addQuestion} style={{ margin: '10px 0' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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

        <Button label="Submit Panel Order" type="submit" />
    </form>
    <Toast ref={toast} />
</div>
);
};

export default OrderPanel;

