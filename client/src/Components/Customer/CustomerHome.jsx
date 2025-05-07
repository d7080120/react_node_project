import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom'; 
function CustomerHome() {
    const navigate = useNavigate();
    const handleButtonClick = (path) => {
        navigate(path); 
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