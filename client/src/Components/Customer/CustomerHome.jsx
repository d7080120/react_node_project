import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function CustomerHome() {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleButtonClick = (path) => {
        navigate(path); // Navigate to the selected path
    };

    return (
        <Card title="Select an Option" style={{ width: '400px', margin: '20px auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Button
                    label="to purchase a panel"
                    onClick={() => handleButtonClick('/orderpanel')}
                    style={{ marginBottom: '10px', width: '100%' }}
                />
                <Button
                    label="analize of your panels"
                    onClick={() => handleButtonClick('/customerPanels')}
                    style={{ marginBottom: '10px', width: '100%' }}
                />
               
            </div>
        </Card>
    );
}

export default CustomerHome;