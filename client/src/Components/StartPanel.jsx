import React from "react";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import {  useSelector } from 'react-redux';

function StartPanel({  panel, setNum }) {
    const { userInfo } = useSelector((state) => state.token);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f9f9f9" }}>
            <Card style={{ width: "400px", textAlign: "center", padding: "1.5rem" }}>
                <h2>Hello {userInfo.name}</h2>
                <p style={{ fontSize: "16px", margin: "10px 0" }}>
                    We invite you to take part in the new survey: <strong>{panel.name}</strong>
                </p>
                <p style={{ fontSize: "14px", color: "#757575", marginBottom: "20px" }}>
                    {panel.description}
                </p>
                <Message 
                    severity="warn" 
                    text="If you refresh the page during the panel, you will return to the start." 
                    style={{ marginBottom: "20px" }} 
                />
                <Button 
                    label="Start the Panel" 
                    onClick={() => setNum(0)} 
                    className="p-button-success" 
                    style={{ width: "100%" }} 
                />
            </Card>
        </div>
    );
}

export default StartPanel;