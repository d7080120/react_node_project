import React, { useState } from "react";
import { RadioButton } from 'primereact/radiobutton';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
function Question({ question, onAnswerChange, selectedAnswer, onSave, onNext }) {
    const handleSave = () => {
        if (selectedAnswer) {
            onSave(question._id,selectedAnswer,question.score); // Save the answer
            onNext();
        }
    };

    const handleNext = () => {
        setVisible(false)
            onNext(); // Proceed to the next question
        
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

            {question.answers.map((answer, index) => (
                <div key={index} style={{ textAlign: 'left', wordWrap: 'break-word' }}> {/* Left align and wrap words */}
                    <RadioButton
                        value={answer}
                        checked={selectedAnswer === answer} // Correctly checks the selected answer
                        onChange={(e) => onAnswerChange(e.value)} // Updates selected answer
                        inputId={`answer_${index}`}
                    />
                    <label htmlFor={`answer_${index}`}>{answer}</label>
                </div>
            ))}
            <div style={{ marginTop: '20px' }}>
                <Button
                    label="Continue"
                    icon="pi pi-save"
                    onClick={handleSave}
                    disabled={!selectedAnswer} // Disable until an answer is selected
                    style={{ marginRight: '10px' }}
                />
                <Button label="Skip Question" icon="pi pi-arrow-right" onClick={() => show('top')} className="p-button" />

                {/* <Button
                    label="Next"
                    icon="pi pi-arrow-right"
                    onClick={handleNext}
                /> */}
                <Dialog header="skip qustion" visible={visible} position={position} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent} draggable={false} resizable={false}>
                <p className="m-0">
                    if you skip this question you will lose {question.score} points
                    <br/>
                    are you sure that you want to skip?
                </p>
            </Dialog>
            </div>
        </Card>
    );
}

export default Question;