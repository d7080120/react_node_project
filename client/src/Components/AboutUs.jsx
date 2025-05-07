import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const AboutUs = () => {
    return (
        <div className="about-us-container" style={{ padding: '50px', textAlign: 'center' }}>
            <h1 style={{ color: '#4CAF50', marginBottom: '20px' }}>About Us</h1>
            <Card
                title="Welcome to Think Panel"
                subTitle="Israel's Leading Survey Platform"
                style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    borderRadius: '10px',
                }}
                header={
                    <img
                        alt="Survey"
                        src="../image.png"
                        style={{
                            maxWidth: '40%',
                            borderRadius: '10px 10px 0 0',
                        }}
                    />
                }
            >
                <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                    Welcome to <strong>Think Panel</strong>, the ultimate Israeli platform for creating, sharing, and exploring surveys! 
                    We believe in the power of questions and answers to connect people from all walks of life. Whether you're a student, parent, professional, or retiree, our platform is designed for everyone.
                </p>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginTop: '20px', color: '#555' }}>
                    Discover a world of surveys tailored to your interests, share your opinions on trending topics, and even create surveys to engage your friends, family, or community. 
                    Think Panel makes it easy, fun, and rewarding to participate in the conversation that shapes our society.
                </p>

           
            </Card>
        </div>
    );
};

export default AboutUs;