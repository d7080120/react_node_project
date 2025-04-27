
// // import React, { useEffect, useState } from 'react';
// // import { Chart } from 'primereact/chart';

// // export default function QuestionAnalysisCard({ question }) {
// //     const [chartData, setChartData] = useState({});
// //     const [chartOptions, setChartOptions] = useState({});

// //     useEffect(() => {
// //         // Count occurrences of each answer based on userAnswers
// //         const answerCounts = question.userAnswers.reduce((acc, answer) => {
// //             const answerBody = answer.body; // Extract body of each answer
// //             acc[answerBody] = (acc[answerBody] || 0) + 1;
// //             return acc;
// //         }, {});

// //         // Prepare data for the chart
// //         const data = {
// //             labels: Object.keys(answerCounts), // Unique answers as labels
// //             datasets: [
// //                 {
// //                     label: 'Answer Count',
// //                     data: Object.values(answerCounts), // Corresponding counts for each answer
// //                     backgroundColor: [
// //                         'rgba(255, 159, 64, 0.2)',
// //                         'rgba(75, 192, 192, 0.2)',
// //                         'rgba(54, 162, 235, 0.2)',
// //                         'rgba(153, 102, 255, 0.2)'
// //                     ],
// //                     borderColor: [
// //                         'rgb(255, 159, 64)',
// //                         'rgb(75, 192, 192)',
// //                         'rgb(54, 162, 235)',
// //                         'rgb(153, 102, 255)'
// //                     ],
// //                     borderWidth: 1
// //                 }
// //             ]
// //         };

// //         // Options for the chart
// //         const options = {
// //             scales: {
// //                 y: {
// //                     beginAtZero: true
// //                 }
// //             }
// //         };

// //         // Set chart data and options
// //         setChartData(data);
// //         setChartOptions(options);
// //     }, [question.userAnswers]); // Re-run effect if userAnswers change

// //     return (
// //         <div className="card">
// //             <h3>{question.title}</h3>
// //             <Chart type="bar" data={chartData} options={chartOptions} />
// //         </div>
// //     );
// // }
















// import React, { useState, useEffect } from 'react';
// import { Chart } from 'primereact/chart';

// export default function PieChartDemo({ question }) {
//     const [chartData, setChartData] = useState({});
//     const [chartOptions, setChartOptions] = useState({});

//     useEffect(() => {
//         const documentStyle = getComputedStyle(document.documentElement);
        
//         // Count occurrences of each answer based on userAnswers
//         const answerCounts = question.userAnswers.reduce((acc, answer) => {
//             const answerBody = answer.body; // Extract body of each answer
//             acc[answerBody] = (acc[answerBody] || 0) + 1;
//             return acc;
//         }, {});

//         // Prepare data for the pie chart
//         const data = {
//             labels: Object.keys(answerCounts), // Unique answers as labels
//             datasets: [
//                 {
//                     data: Object.values(answerCounts), // Corresponding counts for each answer
//                     backgroundColor: [
//                         documentStyle.getPropertyValue('--blue-500'), 
//                         documentStyle.getPropertyValue('--yellow-500'), 
//                         documentStyle.getPropertyValue('--green-500'),
//                         documentStyle.getPropertyValue('--red-500')
//                     ],
//                     hoverBackgroundColor: [
//                         documentStyle.getPropertyValue('--blue-400'), 
//                         documentStyle.getPropertyValue('--yellow-400'), 
//                         documentStyle.getPropertyValue('--green-400'),
//                         documentStyle.getPropertyValue('--red-400')

//                     ]
//                 }
//             ]
//         };

//         const options = {
//             plugins: {
//                 legend: {
//                     labels: {
//                         usePointStyle: true
//                     }
//                 }
//             }
//         };

//         setChartData(data);
//         setChartOptions(options);
//     }, [question.userAnswers]); // Re-run effect if userAnswers change

//     return (
//         <div className="card flex justify-content-center">
//             <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
//         </div>
//     );
// }



































































// import React, { useEffect, useState } from 'react';
// import { Chart } from 'primereact/chart';

// export default function QuestionAnalysisCharts({ question }) {
//     const [barChartData, setBarChartData] = useState({});
//     const [barChartOptions, setBarChartOptions] = useState({});
//     const [pieChartData, setPieChartData] = useState({});
//     const [pieChartOptions, setPieChartOptions] = useState({});

//     useEffect(() => {
//         // Count occurrences of each answer based on userAnswers
//         const answerCounts = question.userAnswers.reduce((acc, answer) => {
//             const answerBody = answer.body; // Extract body of each answer
//             acc[answerBody] = (acc[answerBody] || 0) + 1;
//             return acc;
//         }, {});

//         // Prepare data for the bar chart
//         const barData = {
//             labels: Object.keys(answerCounts),
//             datasets: [
//                 {
//                     label: 'Answer Count',
//                     data: Object.values(answerCounts),
//                     backgroundColor: [
//                         'rgba(255, 159, 64, 0.2)',
//                         'rgba(75, 192, 192, 0.2)',
//                         'rgba(54, 162, 235, 0.2)',
//                         'rgba(153, 102, 255, 0.2)'
//                     ],
//                     borderColor: [
//                         'rgb(255, 159, 64)',
//                         'rgb(75, 192, 192)',
//                         'rgb(54, 162, 235)',
//                         'rgb(153, 102, 255)'
//                     ],
//                     borderWidth: 1
//                 }
//             ]
//         };

//         const barOptions = {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         };

//         // Set data and options for the bar chart
//         setBarChartData(barData);
//         setBarChartOptions(barOptions);

//         // Prepare data for the pie chart
//         const pieData = {
//             labels: Object.keys(answerCounts),
//             datasets: [
//                 {
//                     data: Object.values(answerCounts),
//                     backgroundColor: [
//                         '#42A5F5', 
//                         '#66BB6A', 
//                         '#FFA726', 
//                         '#EF5350' // Additional colors for segments.
//                     ],
//                     hoverBackgroundColor: [
//                         '#2196F3', 
//                         '#43A047', 
//                         '#FF9800', 
//                         '#F44336'
//                     ]
//                 }
//             ]
//         };

//         const pieOptions = {
//             plugins: {
//                 legend: {
//                     labels: {
//                         usePointStyle: true
//                     }
//                 }
//             }
//         };

//         // Set data and options for the pie chart
//         setPieChartData(pieData);
//         setPieChartOptions(pieOptions);
        
//     }, [question.userAnswers]); // Re-run effect if userAnswers change

//     return (
//         <div className="card">
//             <h3>{question.title}</h3>
//             <div className="flex flex-wrap gap-4 justify-content-around">
//                 <div className="w-full md:w-30rem">
//                     <Chart type="bar" data={barChartData} options={barChartOptions} />
//                 </div>
//                 <div className="w-full md:w-30rem">
//                     <Chart type="pie" data={pieChartData} options={pieChartOptions} />
//                 </div>
//             </div>
//         </div>
//     );
// }




import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';

export default function QuestionAnalysisCharts({ question }) {
    const [barChartData, setBarChartData] = useState({});
    const [barChartOptions, setBarChartOptions] = useState({});
    const [pieChartData, setPieChartData] = useState({});
    const [pieChartOptions, setPieChartOptions] = useState({});

    useEffect(() => {
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
                        '#42A5F5',
                        '#66BB6A',
                        '#FFA726',
                        '#EF5350'
                    ],
                    hoverBackgroundColor: [
                        '#2196F3',
                        '#43A047',
                        '#FF9800',
                        '#F44336'
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