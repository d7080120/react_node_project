import React, { useState,useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { ProductService } from './ProductService';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PdfFormGenerator from './EntryDocument';
import RedeemPoints from './Redeempoints';
import { Toast } from 'primereact/toast';
import { setUser } from '../redux/tokenSlice';
import axios from "axios";
export default function PanelList() {
    const [panels, setPanels] = useState([]);
    const { token, userInfo } = useSelector((state) => state.token); // Get token and userInfo from Redux
    const [userScore, setUserScore] = useState(userInfo.participant.score); // State to hold user score
    const navigate = useNavigate(); // Use navigate hook
    const toast = useRef(null);
    const dispatch = useDispatch();
    console.log(userInfo);
    const onRedeem = async (pointsToRedeem) => {
        try {
            const response = await axios.put(
                `http://localhost:1135/participant`,
                { score:userInfo.participant.score-pointsToRedeem,_id:userInfo.participant._id },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    'Content-Type': 'application/json',
                }
            );

            toast.current.show({
                severity: 'success',
                summary: 'Redemption Successful',
                detail: `Successfully redeemed ${pointsToRedeem} points!`,
            });

    
            const u=response.data.participantUser
            u.participant=response.data.participant
            setUserScore(u.participant.score)
            dispatch(setUser(u));
            return true; // Return true if redemption is successful
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Redemption Failed',
                detail: 'An error occurred while redeeming points. Please try again later.',
            });
            return false; // Return false if redemption fails
        }
    };
    useEffect(() => {
        // Fetch panels data
        ProductService.getPanels(token).then((data) => setPanels(data));

        // Set the user's score from userInfo
        if (userInfo && userInfo.score) {
            setUserScore(userInfo.score);
        }
    }, [token, userInfo]); // Add token and userInfo to dependency array
    const itemTemplate = (data) => {
        const handleButtonClick = () => {
            console.log(data.name);
            navigate(`/panel/${data.name}`, { state: { someProp: data } }); // Replace with your target route and parameter
        };
        
    
        return (
            <div className="col-10">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{data.name}</div>
                            </div>
                            <div className="flex flex-column gap-2">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-chart-bar product-category-icon"></i>
                                    <span className="font-semibold">{data.questions.length} questions</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-start" style={{ height: '100%' }}>
                            <div className="description" style={{ 
                                minHeight: '100px',
                                maxHeight: '100px',
                                overflow: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                textAlign: 'left'
                            }}>
                                {data.description}
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-6 lg:gap-2">
                            <span className="text-2xl font-semibold">{data.score} points</span>
                            <Button icon="pi pi-comments" label="To participate" onClick={handleButtonClick} disabled={data.inventoryStatus === 'OUTOFSTOCK'} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <RedeemPoints availablePoints={userInfo.participant.score} onRedeem={onRedeem}></RedeemPoints>

        <div className="card">
            {/* Display User Points */}
            <div style={{
                marginBottom: '20px',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#4caf50',
                textAlign: 'center'
            }}>
                Your Points: {userScore} 
                <br/>

            </div>
            <Toast ref={toast} /> {/* Toast component for notifications */}

            <DataScroller value={panels} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
        </div></div>
    );
}