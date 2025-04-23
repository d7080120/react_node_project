// 
import React, { useState } from 'react';
import Question from './Question';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useLocation } from 'react-router-dom';

function Panel() {
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [num, setNum] = useState(0);
    const [score, setScore] = useState(0);
    const location = useLocation();
    const panel = location.state.someProp;
    const questions=panel.questions;
    console.log(panel)
    const handleAnswerChange = (answer) => {
        setSelectedAnswer(answer);
    };
    const handleSave = (answer,score) => {
        console.log('Saved answer:', answer);
        setScore(score)
    };
    const handleNext = () => {
            setNum(num + 1);
            setSelectedAnswer(''); 
    };
           const [visible, setVisible] = useState(false);
    return (
        <>
        <div>
            {num < questions.length ? (
                <Question
                    question={questions[num]}
                    onAnswerChange={handleAnswerChange}
                    selectedAnswer={selectedAnswer}
                    onSave={handleSave}
                    onNext={handleNext}
                />
            ) : (
                <p>All questions completed.</p>
            )}
        </div>
         <Button label="scores from this panel" icon="pi pi-external-link" onClick={() => setVisible(true)} />
         <Dialog header="Header" visible={visible} onHide={() => {if (!visible) return; setVisible(false); }}
             style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
             <p className="m-0">
                 In this pannel You have accumulated {score} points
             </p>
         </Dialog>
         </>
    );
}
export default Panel;