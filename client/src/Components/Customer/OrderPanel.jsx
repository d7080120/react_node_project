// import React, { useState } from 'react';
// import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { InputTextarea } from 'primereact/inputtextarea';

// const QuestionCard = ({ onAddQuestion }) => {
//     const [newQuestion, setNewQuestion] = useState({
//         title: '',
//         content: '',
//         answers: [''] // Array to hold multiple answers
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'answers') {
//             const answers = [...newQuestion.answers];
//             answers[e.target.dataset.index] = value;
//             setNewQuestion({
//                 ...newQuestion,
//                 answers
//             });
//         } else {
//             setNewQuestion({
//                 ...newQuestion,
//                 [name]: value
//             });
//         }
//     };

// const addAnswerField = () => {
//     setNewQuestion({
//         ...newQuestion,
//         answers: [...newQuestion.answers, ''] // Add new empty answer field
//     });
// };

//     const handleAddQuestion = () => {
//         if (newQuestion.title && newQuestion.content) {
//             onAddQuestion(newQuestion);
//             setNewQuestion({ title: '', content: '', answers: [''] }); // Reset after adding
//         }
//     };

//     return (
//         <Card title="Add Question" style={{ width: '400px', margin: '20px' }}>
//             <div className="p-field">
//                 <label htmlFor="title">Question Title</label>
//                 <InputText 
//                     id="title" 
//                     name="title" 
//                     value={newQuestion.title} 
//                     onChange={handleInputChange} 
//                     style={{ width: '100%' }} 
//                 />
//             </div>
//             <div className="p-field">
//                 <label htmlFor="content">Question Content</label>
//                 <InputTextarea 
//                     id="content" 
//                     name="content" 
//                     value={newQuestion.content}
//                     onChange={handleInputChange}
//                     rows={3}
//                     style={{ width: '100%' }} 
//                 />
//             </div>
//             <div className="p-field">
//                 <label>Answers</label>
//                 {newQuestion.answers.map((answer, index) => (
//                     <InputText 
//                         key={index} 
//                         data-index={index} 
//                         name="answers" 
//                         value={answer} 
//                         onChange={handleInputChange} 
//                         style={{ width: '100%', marginBottom: '10px' }} 
//                         placeholder={`Answer ${index + 1}`} 
//                     />
//                 ))}
//                 <Button label="Add Answer" type="button" onClick={addAnswerField} />
//             </div>
//             <Button label="Add Question" onClick={handleAddQuestion} style={{ marginTop: '10px' }} />
//         </Card>
//     );
// };

// const OrderPanel = () => {
//     const [panelDetails, setPanelDetails] = useState({
//         name: '',
//         description: '',
//         numsOfParticipants: 1000,
//         questions: [],
//     });

//     const handlePanelChange = (e) => {
//         const { name, value } = e.target;
//         setPanelDetails({
//             ...panelDetails,
//             [name]: value
//         });
//     };

//     const addQuestion = (question) => {
//         setPanelDetails({
//             ...panelDetails,
//             questions: [...panelDetails.questions, question]
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Submit panel details to the backend (example API endpoint)
//         await fetch('/api/panels', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(panelDetails),
//         });

//         // Reset the panel form after submission if needed
//         setPanelDetails({
//             name: '',
//             description: '',
//             numsOfParticipants: 1000,
//             questions: [],
//         });
//     };

//     return (
//         <div className="order-panel">
//             <h2>Create Panel Order</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="p-field">
//                     <label htmlFor="name">Panel Name</label>
//                     <InputText id="name" name="name" value={panelDetails.name} onChange={handlePanelChange} required />
//                 </div>

//                 <div className="p-field">
//                     <label htmlFor="description">Description</label>
//                     <InputTextarea id="description" name="description" value={panelDetails.description} onChange={handlePanelChange} rows={3} />
//                 </div>

//                 <div className="p-field">
//                     <label htmlFor="numsOfParticipants">Number of Participants</label>
//                     <InputText id="numsOfParticipants" value={panelDetails.numsOfParticipants} onChange={(e) => handlePanelChange({ target: { name: 'numsOfParticipants', value: e.target.value } })} />
//                 </div>

//                 <QuestionCard onAddQuestion={addQuestion} />

//                 <h4>Current Questions</h4>
//                 <ul>
//                     {panelDetails.questions.map((q, index) => (
//                         <li key={index}>
//                             {q.title}: {q.content} | Answers: {q.answers.join(', ')}
//                         </li>
//                     ))}
//                 </ul>

//                 <Button label="Submit Panel Order" type="submit" />
//             </form>
//         </div>
//     );
// };

// export default OrderPanel






























import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

const QuestionCard = ({ question, onRemoveQuestion, onChange }) => {
    const [newQuestion, setNewQuestion] = useState({
        title: '',
        content: '',
        answers: [''] // Array to hold multiple answers
    });

    const addAnswerField = () => {
        setNewQuestion({
            ...newQuestion,
            answers: [...newQuestion.answers, ''] // Add new empty answer field
        });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'answers') {
            const answers = [...newQuestion.answers];
            answers[e.target.dataset.index] = value;
            setNewQuestion({
                ...newQuestion,
                answers
            });
        } else {
            setNewQuestion({
                ...newQuestion,
                [name]: value
            });
        }
    };
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
                {newQuestion.answers.map((answer, index) => (<>
                    <InputText
                        key={index}
                        data-index={index}
                        name="answers"
                        value={answer}
                        onChange={handleInputChange}
                        style={{ width: '100%', marginBottom: '10px' }}
                        placeholder={`Answer ${index + 1}`}

                    />
                    <Button icon="pi pi-shopping-cart" className="p-button-rounded" ></Button>
                    <br/>
                </>
                ))}
                <Button label="Add Answer" type="button" onClick={addAnswerField} />
            </div>
            <Button label="Remove Question" onClick={() => onRemoveQuestion(question.id)} />
        </Card>
    );
};

const OrderPanel = () => {
    const [panelDetails, setPanelDetails] = useState({
        name: '',
        description: '',
        numsOfParticipants: 1000,
        questions: [],
    });

    const handlePanelChange = (e) => {
        const { name, value } = e.target;
        setPanelDetails({
            ...panelDetails,
            [name]: value,
        });
    };

    const addQuestion = () => {
        const newQuestion = { id: Date.now(), title: '', content: '' };
        setPanelDetails((prev) => ({
            ...prev,
            questions: [...prev.questions, newQuestion],
        }));
    };

    const handleQuestionChange = (e, id) => {
        const { name, value } = e.target;
        setPanelDetails((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === id ? { ...q, [name]: value } : q
            ),
        }));
    };

    const removeQuestion = (id) => {
        setPanelDetails((prev) => ({
            ...prev,
            questions: prev.questions.filter((q) => q.id !== id),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Submit panel details to the backend (example API endpoint)
        await fetch('/api/panels', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(panelDetails),
        });

        // Reset the panel form after submission if needed
        setPanelDetails({
            name: '',
            description: '',
            numsOfParticipants: 1000,
            questions: [],
        });
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
                    <InputTextarea
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

                <Button label="Add Question" onClick={addQuestion} style={{ margin: '10px 0' }} />

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {panelDetails.questions.map((question) => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            onChange={handleQuestionChange}
                            onRemoveQuestion={removeQuestion}
                        />
                    ))}
                </div>

                <Button label="Submit Panel Order" type="submit" />
            </form>
        </div>
    );
};

export default OrderPanel