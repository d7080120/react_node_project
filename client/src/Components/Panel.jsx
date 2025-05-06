import React, { useState, useRef } from 'react';
import Question from './Question';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { setToken, setUser } from '../redux/tokenSlice';
import { Message } from 'primereact/message';
import StartPanel from './StartPanel';
import { useNavigate } from 'react-router-dom';

function Panel() {
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [answers, setAnswers] = useState([])
    const [closeDisable, setCloseDisable] = useState(false)
    const [num, setNum] = useState(-1);
    const [escore, setScore] = useState(0);
    const location = useLocation();
    const panel = location.state.someProp;
    const questions = panel.questions;
    const { token } = useSelector((state) => state.token);
    const { userInfo } = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use navigate hook

    console.log(closeDisable)
    const handleAnswerChange = (answer) => {
        setSelectedAnswer(answer);
    };
    const handleSave = async (question_id, answer, score) => {
        const ans = [...answers]
        ans.push({ question_id, answer })
        setAnswers(ans)
        console.log('Saved answer:', answers);
        setScore(score + escore)
    };
    const handleNext = () => {
        setNum(num + 1);
        setSelectedAnswer('');
    };
    const toast = useRef(null)
    const [visible, setVisible] = useState(false);
    const saveAnswers = async () => {
        setCloseDisable(true)
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
                // alert(`you succeed the panel and earned ${escore} points`);
            }
        } catch (error) {
            setCloseDisable(false)
            console.error("Error saving answers:", error.response?.data || error.message);
            toast.current.show({ severity: 'error', summary: 'Error saving answers' });
        }


        try {
            const updateParticipant = { ...userInfo.participant }
            updateParticipant.score = userInfo.participant.score + escore
            updateParticipant.date = userInfo.participant.dateOfBirth
            console.log(updateParticipant)
            const UpUserInfo = { ...userInfo }
            UpUserInfo.participant = updateParticipant
            dispatch(setUser(UpUserInfo));
            const res = await axios.put(
                'http://localhost:1135/participant', // כתובת ה-API
                // גוף הבקשה (body)
                updateParticipant
                ,
                { // כותרות הבקשה (headers)
                    headers: { Authorization: `Bearer ${token}` },
                    'Content-Type': 'application/json'
                }
            );

            if (res.status === 200) {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Your answers have been saved!', life: 3000 });
                navigate('/participant')
            }
        } catch (error) {
            setCloseDisable(false)
            toast.current.show({ severity: 'error', summary: 'Failed to add points' });

            console.error("Error saving answers:", error.response?.data || error.message);
        }

    }
    return (
        <>
            {num === -1 ?(
                <StartPanel panel={panel} setNum={setNum}/>
       
                ): (<></>)}
            <div>
                {num > -1 && num < questions.length ? (
                    <Question
                        question={questions[num]}
                        onAnswerChange={handleAnswerChange}
                        selectedAnswer={selectedAnswer}
                        onSave={handleSave}
                        onNext={handleNext}
                    />
                ) : (
                    <>
                       
                    </>

                )}
                {num >= questions.length ?(<> <Toast ref={toast} />
                        <div style={{ textAlign: 'center', padding: '2rem', background: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ color: '#4CAF50', marginBottom: '1rem' }}>All questions are completed!</h3>
                            <Button label="Exit and Add Points" icon="pi pi-check" disabled={closeDisable} onClick={saveAnswers} className="p-button-success" />
                        </div></>):(<></>)}
            </div>
            <Button label="scores from this panel" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            <Dialog header="Your score" visible={visible} onHide={() => { if (!visible) return; setVisible(false); }}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <p className="m-0">
                    In this pannel You have accumulated {escore} points
                </p>
            </Dialog>
        </>
    );
}
export default Panel;