// 
import React, { useState } from 'react';
import Question from './Question';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Panel() {
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [answers, setAnswers] = useState([])
    const [num, setNum] = useState(0);
    const [escore, setScore] = useState(0);
    const location = useLocation();
    const panel = location.state.someProp;
    const questions = panel.questions;
    const { token } = useSelector((state) => state.token);
    const { userInfo } = useSelector((state) => state.token);

    console.log(panel)
    const handleAnswerChange = (answer) => {
        setSelectedAnswer(answer);
    };
    const handleSave = async (question_id, answer, score) => {
        const ans = [ ...answers ]
        ans.push({question_id ,  answer})
        setAnswers(ans)
        console.log('Saved answer:', answers);
        setScore(score + escore)
    };
    const handleNext = () => {
        setNum(num + 1);
        setSelectedAnswer('');
    };
    const [visible, setVisible] = useState(false);
    const saveAnswers= async() =>{
        try {
            const res = await axios.put(
                'http://localhost:1135/panel/addAnswers', // כתובת ה-API
                { // גוף הבקשה (body)
                    participant: userInfo._id,
                    answers: answers,
                    panel_id: panel._id,
                },
                { // כותרות הבקשה (headers)
                    headers: { Authorization: `Bearer ${token}` },
                    'Content-Type': 'application/json'
                }
            );
    
            if (res.status === 200) {
                alert("wow");
            }
        } catch (error) {
            console.error("Error saving answers:", error.response?.data || error.message);
            alert("Failed to save answers");
        }
    }
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
                    <>
                        <p>All questions are completed.</p>
                        <button onClick={saveAnswers}>exit and add the points to your score</button>
                    </>

                )}
            </div>
            <Button label="scores from this panel" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            <Dialog header="Header" visible={visible} onHide={() => { if (!visible) return; setVisible(false); }}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <p className="m-0">
                    In this pannel You have accumulated {escore} points
                </p>
            </Dialog>
        </>
    );
}
export default Panel;