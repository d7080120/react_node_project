
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import QuestionAnalysisCard from './QuestionAnalysisCard'; // Ensure the correct import
import { Card } from 'primereact/card';

const AnalizePanel = () => {
    const location = useLocation();
    const panel = location.state.someProp; // Ensure someProp is defined in the state

    return (
        <div>
            <h2>{panel.name} - Answers Analysis</h2>
            <Card title="Panel Description">
                <p>{panel.description}</p>
            </Card>
            {panel.questions.map(question => (
                <QuestionAnalysisCard key={question.id} question={question} />
            ))}
        </div>
    );
};
export default AnalizePanel;

