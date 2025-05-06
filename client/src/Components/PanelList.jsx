import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { ProductService } from './ProductService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
export default function PanelList() {
    const [panels, setPanels] = useState([]);
    const { token, userInfo } = useSelector((state) => state.token); // Get token and userInfo from Redux
    const [userScore, setUserScore] = useState(userInfo.participant.score); // State to hold user score
    const navigate = useNavigate(); // Use navigate hook
    const toast = useRef(null);
    console.log(userInfo);
    const handleNavigate = () => {
        navigate('/redeem', {
            state: { availablePoints: userInfo.participant.score },
        });
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
            navigate(`/panel/${data.name}`); // Replace with your target route and parameter
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
            {/* <RedeemPoints availablePoints={userInfo.participant.score} onRedeem={onRedeem}></RedeemPoints> */}
            {/* <RedeemPoints availablePoints={userInfo.participant.score} onRedeem={onRedeem} setUserScore={setUserScore}></RedeemPoints> */}
            {/* <RedeemPoints availablePoints={userInfo.participant.score}  setUserScore={setUserScore}></RedeemPoints> */}


            <div className="card" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '8px',
            }}>
                <button
                    onClick={handleNavigate}
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        padding: '12px 20px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
                >
                    Redeem Points
                </button>

                <div style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#4CAF50',
                }}>
                    Your Points: {userScore}
                    <br />
                </div>
            </div>
            <Toast ref={toast} /> {/* Toast component for notifications */}

            <DataScroller value={panels} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
        </div>
    );
}