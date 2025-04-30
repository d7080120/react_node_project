
import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';

export default function QuestionAnalysisCharts({ question }) {
    const [barChartData, setBarChartData] = useState({});
    const [barChartOptions, setBarChartOptions] = useState({});
    const [pieChartData, setPieChartData] = useState({});
    const [pieChartOptions, setPieChartOptions] = useState({});

    useEffect(() => {
        console.log(question);
        // Count occurrences of each answer based on userAnswers
        const answerCounts = question.userAnswers.reduce((acc, answer) => {
            const answerBody = answer.body; // Extract body of each answer
            acc[answerBody] = (acc[answerBody] || 0) + 1;
            return acc;
        }, {});

        // Prepare data for the bar chart
        const barData = {
            labels: Object.keys(answerCounts),
            datasets: [
                {
                    label: 'Answer Count',
                    data: Object.values(answerCounts).map(Math.floor), // Use whole numbers
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
                        stepSize: 1 // Ensure whole numbers on y-axis
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false // Allows the chart to fill its container
        };

        // Set data and options for the bar chart
        setBarChartData(barData);
        setBarChartOptions(barOptions);

        // Prepare data for the pie chart
        const pieData = {
            labels: Object.keys(answerCounts),
            datasets: [
                {
                    data: Object.values(answerCounts).map(Math.floor), // Use whole numbers
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
            maintainAspectRatio: false // Allows the chart to fill its container
        };

        // Set data and options for the pie chart
        setPieChartData(pieData);
        setPieChartOptions(pieOptions);

    }, [question.userAnswers]); // Re-run effect if userAnswers change

    return (
        <div className="card">
            <h1>{question.title}</h1>
            <h3>{question.cotents}</h3>
            <h3>{question.userAnswers.length} participants in this question</h3>

            <div className="flex justify-content-between" style={{ height: '400px' }}>
                <div style={{ flex: '1 1 70%', height: '100%' }}>
                    <Chart type="bar" data={barChartData} options={barChartOptions} style={{justifyContent: 'center',alignItems: 'center'}}/>
                </div>
                <div style={{ flex: '1 1 30%', height: '100%' }}>
                    <Chart type="pie" data={pieChartData} options={pieChartOptions} />
                </div>
            </div>
        </div>
 
    );
}