import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/tokenSlice';
import axios from "axios";
import PdfFormGenerator from './EntryDocument';

const RedeemPoints = ({ availablePoints ,onRedeem}) => {
    const [pointsToRedeem, setPointsToRedeem] = useState(0);
    const [showDownloadComponent, setShowDownloadComponent] = useState(false);
    const toast = useRef(null);
    const [points, setPoints] = useState(0);
console.log(onRedeem);
    const handleRedeem = async () => {
        console.log(pointsToRedeem,availablePoints);
        if (pointsToRedeem > 0 && pointsToRedeem <= availablePoints) {
            const isRedeemed = await onRedeem(pointsToRedeem);
            if (isRedeemed) {
                setShowDownloadComponent(true); // Show the download component after successful redemption
            }
            setPoints(pointsToRedeem)
            setPointsToRedeem(0); // Reset the input after redeeming
        } else {
            toast.current.show({
                severity: 'error',
                summary: 'Invalid Input',
                detail: 'Please select a valid number of points to redeem.',
            });
        }
    };
    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '300px' }}>
            <h3>Redeem Your Points</h3>
            <p>You have <strong>{availablePoints}</strong> points available.</p>
            <input
                type="number"
                value={pointsToRedeem}
                onChange={(e) => setPointsToRedeem(Number(e.target.value))}
                min="0"
                max={availablePoints}
                style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
            />
            <button
                onClick={handleRedeem}
                style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Redeem and Download
            </button>
            <Toast ref={toast} />
            {showDownloadComponent && (
                <div style={{ marginTop: '20px' }}>
                    <h4>Your Report is Ready</h4>
                   
                    {console.log(pointsToRedeem)}
            <PdfFormGenerator amount={pointsToRedeem}/>

                </div>
            )}
        </div>
    );
};

export default RedeemPoints;