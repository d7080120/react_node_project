



//דבורה היקרה עשיתי את כל המטלות ומחקתי אם השינוי לא עבר בהצלחה השתמשי נא בקונטרול זי תודה רבה מעומק לב אילה

// import React, { useRef, useState } from 'react';
// import { Toast } from 'primereact/toast';
// import PdfFormGenerator from './EntryDocument';

// const RedeemPoints = ({ availablePoints, onRedeem }) => {
//     const [pointsToRedeem, setPointsToRedeem] = useState(0);
//     const [showDownloadComponent, setShowDownloadComponent] = useState(false);
//     const [points, setPoints] = useState(0);
//     const toast = useRef(null);

//     // Fallback if onRedeem is not provided






    
//     const redeemHandler = onRedeem || (() => Promise.resolve(true));

//     const handleRedeem = async () => {
//         if (pointsToRedeem > 0 && pointsToRedeem <= availablePoints) {
//             const isRedeemed = await redeemHandler(pointsToRedeem);
//             if (isRedeemed) {
//                 setPoints(pointsToRedeem);
//                 setShowDownloadComponent(true);
//                 toast.current.show({
//                     severity: 'success',
//                     summary: 'Redemption Successful',
//                     detail: `Successfully redeemed ${pointsToRedeem} points!`,
//                 });
//                 setPointsToRedeem(0); // Reset the input
//             } else {
//                 toast.current.show({
//                     severity: 'error',
//                     summary: 'Redemption Failed',
//                     detail: 'An error occurred while redeeming points. Please try again later.',
//                 });
//             }
//         } else {
//             toast.current.show({
//                 severity: 'error',
//                 summary: 'Invalid Input',
//                 detail: 'Please select a valid number of points to redeem.',
//             });
//         }
//     };

//     const handleInputChange = (e) => {
//         let value = Math.max(0, Number(e.target.value)); // Prevent negative numbers

//         // Adjust the value to the nearest multiple of 5
//         if (value % 5 !== 0) {
//             value = Math.round(value / 5) * 5;
//         }

//         setPointsToRedeem(value);
//     };

//     return (
//         <div
//             style={{
//                 padding: '20px',
//                 border: '1px solid #ccc',
//                 borderRadius: '12px',
//                 maxWidth: '400px',
//                 margin: 'auto',
//                 backgroundColor: '#f9f9f9',
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//                 textAlign: 'center',
//             }}
//         >
//             <h3
//                 style={{
//                     color: '#4CAF50',
//                     fontSize: '24px',
//                     fontWeight: 'bold',
//                     marginBottom: '10px',
//                 }}
//             >
//                 Redeem Your Points!
//             </h3>
//             <p
//                 style={{
//                     color: '#555',
//                     fontSize: '16px',
//                     marginBottom: '20px',
//                 }}
//             >
//                 You have <strong style={{ fontSize: '18px', color: '#FF5722' }}>{availablePoints}</strong> points available. Use them to claim exciting rewards!
//             </p>
//             <input
//                 type="number"
//                 value={pointsToRedeem}
//                 onChange={handleInputChange}
//                 min="0"
//                 max={availablePoints}
//                 step="5" // Enforce step of 5
//                 placeholder="Enter points to redeem"
//                 style={{
//                     padding: '10px',
//                     fontSize: '16px',
//                     marginBottom: '10px',
//                     width: '100%',
//                     border: '2px solid #4CAF50',
//                     borderRadius: '6px',
//                     outline: 'none',
//                 }}
//             />
//             <button
//                 onClick={handleRedeem}
//                 style={{
//                     backgroundColor: '#4CAF50',
//                     color: 'white',
//                     border: 'none',
//                     padding: '12px 20px',
//                     borderRadius: '6px',
//                     cursor: 'pointer',
//                     fontSize: '16px',
//                     fontWeight: 'bold',
//                     transition: 'all 0.3s ease',
//                 }}
//                 onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
//                 onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
//             >
//                 Redeem and Download
//             </button>
//             <Toast ref={toast} />
//             {showDownloadComponent && (
//                 <div
//                     style={{
//                         marginTop: '20px',
//                         padding: '15px',
//                         backgroundColor: '#e8f5e9',
//                         borderRadius: '8px',
//                         border: '1px solid #4CAF50',
//                     }}
//                 >
//                     <h4 style={{ color: '#4CAF50', marginBottom: '10px' }}>Your Report is Ready</h4>
//                     <PdfFormGenerator amount={points/5} />
//                 </div>
//             )}
//             <div
//                 style={{
//                     marginTop: '20px',
//                     color: '#888',
//                     fontSize: '14px',
//                     fontStyle: 'italic',
//                 }}
//             >
//                 Redeem your points today and enjoy exclusive benefits!
//             </div>
//         </div>
//     );
// };

// export default RedeemPoints;




import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import PdfFormGenerator from './EntryDocument';
import { ProductService } from './ProductService';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/tokenSlice';
import { useLocation } from 'react-router-dom';
import axios from "axios";

// const RedeemPoints = ({ availablePoints, onRedeem }) => {
const RedeemPoints = () => {
    const [pointsToRedeem, setPointsToRedeem] = useState(0);
    const [showDownloadComponent, setShowDownloadComponent] = useState(false);
    const [points, setPoints] = useState(0);
    const toast = useRef(null);
    const { token, userInfo } = useSelector((state) => state.token);
    const [availablePoints, setUserScore] = useState(userInfo.participant.score); // State to hold user score
    const dispatch = useDispatch();

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
            if(setUserScore){
            setUserScore(u.participant.score)}
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
    // Fallback if onRedeem is not provided
    const redeemHandler = onRedeem || (() => Promise.resolve(true));

    const handleRedeem = async () => {
        if (pointsToRedeem > 0 && pointsToRedeem <= availablePoints) {
            const isRedeemed = await redeemHandler(pointsToRedeem);
            if (isRedeemed) {
                setPoints(pointsToRedeem);
                setShowDownloadComponent(true);
                toast.current.show({
                    severity: 'success',
                    summary: 'Redemption Successful',
                    detail: `Successfully redeemed ${pointsToRedeem} points!`,
                });
                setPointsToRedeem(0); // Reset the input
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'Redemption Failed',
                    detail: 'An error occurred while redeeming points. Please try again later.',
                });
            }
        } else {
            toast.current.show({
                severity: 'error',
                summary: 'Invalid Input',
                detail: 'Please select a valid number of points to redeem.',
            });
        }
    };

    const handleInputChange = (e) => {
        let value = Math.max(0, Number(e.target.value)); // Prevent negative numbers

        // Adjust the value to the nearest multiple of 5
        if (value % 5 !== 0) {
            value = Math.round(value / 5) * 5;
        }

        setPointsToRedeem(value);
    };

    // Calculate the dollar equivalent of the points
    const dollarValue = pointsToRedeem / 5;

    return (
        <div
            style={{
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '12px',
                maxWidth: '400px',
                margin: 'auto',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
            }}
        >
            <h3
                style={{
                    color: '#4CAF50',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                }}
            >
                Redeem Your Points!
            </h3>
            <p
                style={{
                    color: '#555',
                    fontSize: '16px',
                    marginBottom: '20px',
                }}
            >
                You have <strong style={{ fontSize: '18px', color: '#FF5722' }}>{availablePoints}</strong> points available. Use them to claim exciting rewards!
            </p>
            <p style={{ fontSize: '14px', color: '#888', marginBottom: '20px' }}>
                <strong>Note:</strong> Every 5 points equals $1.
            </p>
            <div style={{ position: 'relative', marginBottom: '20px' }}>
                <input
                    type="number"
                    value={pointsToRedeem}
                    onChange={handleInputChange}
                    min="0"
                    max={availablePoints}
                    step="5" // Enforce step of 5
                    placeholder="Enter points to redeem"
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        width: '100%',
                        border: '2px solid #4CAF50',
                        borderRadius: '6px',
                        outline: 'none',
                    }}
                />
                <div
                    style={{
                        marginTop: '5px',
                        fontSize: '14px',
                        color: '#555',
                        textAlign: 'left',
                    }}
                >
                    Equals: <strong>${dollarValue.toFixed(2)}</strong>
                </div>
            </div>
            <button
                onClick={handleRedeem}
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
                Redeem 
            </button>
            <Toast ref={toast} />
            {showDownloadComponent && (
                <div
                    style={{
                        marginTop: '20px',
                        padding: '15px',
                        backgroundColor: '#e8f5e9',
                        borderRadius: '8px',
                        border: '1px solid #4CAF50',
                    }}
                >
                    <h4 style={{ color: '#4CAF50', marginBottom: '10px' }}>Your Report is Ready</h4>
                    <PdfFormGenerator amount={points / 5} />
                </div>
            )}
            <div
                style={{
                    marginTop: '20px',
                    color: '#888',
                    fontSize: '14px',
                    fontStyle: 'italic',
                }}
            >
                Redeem your points today and enjoy exclusive benefits!
            </div>
        </div>
    );
};

export default RedeemPoints;