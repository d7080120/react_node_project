import React, { useState } from "react";
import { RadioButton } from 'primereact/radiobutton';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
function Question({ question, onAnswerChange, selectedAnswer, onSave, onNext }) {
    const handleSave = () => {
        if (selectedAnswer) {
            onSave(question._id, selectedAnswer, question.score); 
            onNext();
        }
    };
    const handleNext = () => {
        setVisible(false)
        onNext(); 

    };
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');
    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => handleNext(false)} autoFocus />
        </div>
    );

    const show = (position) => {
        setPosition(position);
        setVisible(true);
    };
    console.log(question);
    return (
        <Card title={question.title} style={{ width: '400px', margin: '20px auto' }}>
            <div style={{ fontWeight: 'bold' }}>
                This question will give you {question.score} points
            </div>
            <br />
            <div style={{ fontWeight: 'bold' }}>
                {question.content}
            </div>
            {question.answers.map((answer, index) => (
                <div key={index} style={{ textAlign: 'left', wordWrap: 'break-word' }}> 
                    <RadioButton
                        value={answer}
                        checked={selectedAnswer === answer} 
                        onChange={(e) => onAnswerChange(e.value)} 
                        inputId={`answer_${index}`}
                    />
                    <label htmlFor={`answer_${index}`}>{answer}</label>
                </div>
            ))}
            <div style={{ marginTop: '20px' }}>

               
             <Button label="Skip Question" icon="pi pi-arrow-right" onClick={() => show('top')} className="p-button"style={{ marginRight: '10px' }} />
               
                <Button
                    label="Continue"
                    icon="pi pi-save"
                    onClick={handleSave}
                    disabled={!selectedAnswer} 
                />
                <Dialog header="skip qustion" visible={visible} position={position} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }} footer={footerContent} draggable={false} resizable={false}>
                    <p className="m-0">
                        if you skip this question you will lose {question.score} points
                        <br />
                        are you sure that you want to skip?
                    </p>
                </Dialog>
            </div>
        </Card>
    );
}

export default Question;