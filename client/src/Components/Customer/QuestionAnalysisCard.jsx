
import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';

export default function QuestionAnalysisCharts({ question }) {
    const [barChartData, setBarChartData] = useState({});
    const [barChartOptions, setBarChartOptions] = useState({});
    const [pieChartData, setPieChartData] = useState({});
    const [pieChartOptions, setPieChartOptions] = useState({});

    useEffect(() => {
        console.log(question);
        const answerCounts = question.userAnswers.reduce((acc, answer) => {
            const answerBody = answer.body; 
            acc[answerBody] = (acc[answerBody] || 0) + 1;
            return acc;
        }, {});

        const barData = {
            labels: Object.keys(answerCounts),
            datasets: [
                {
                    label: 'Answer Count',
                    data: Object.values(answerCounts).map(Math.floor), 
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                    ],
                    borderWidth: 1
                }
            ]
        };

        const barOptions = {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1 
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false 
        };
        setBarChartData(barData);
        setBarChartOptions(barOptions);
        const pieData = {
            labels: Object.keys(answerCounts),
            datasets: [
                {
                    data: Object.values(answerCounts).map(Math.floor), 
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.4)',
                        'rgba(75, 192, 192, 0.4)',
                        'rgba(54, 162, 235, 0.4)',
                        'rgba(153, 102, 255, 0.4)'
                    ],
                    hoverBackgroundColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                    ]
                }
            ]
        };

        const pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false 
        };
        setPieChartData(pieData);
        setPieChartOptions(pieOptions);

    }, [question.userAnswers]);
    const containerStyle = {
        padding: '1rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '1rem',
    };

    const chartContainerStyle = {
        flex: '1 1 calc(50% - 1rem)', 
        height: '300px', 
        minWidth: '300px', 
    };

    return (
        <div className="card">
            <h1>{question.title}</h1>
            <h3>{question.content}</h3>
            <h3>{question.userAnswers.length} participants in this question</h3>

            <div style={containerStyle}>
                <div style={{ ...chartContainerStyle }}>
                    <Chart type="bar" data={barChartData} options={barChartOptions} />
                </div>
                <div style={{ ...chartContainerStyle }}>
                    <Chart type="pie" data={pieChartData} options={pieChartOptions} />
                </div>
            </div>
        </div>
    );
}