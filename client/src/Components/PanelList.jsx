

import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { ProductService } from './ProductService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function PanelList() {
    const [panels, setPanels] = useState([]);
    const { token } = useSelector((state) => state.token);
    const navigate = useNavigate(); // Use navigate hook
  
    useEffect(() => {
        ProductService.getPanels(token).then((data) => setPanels(data));
    }, [token]); // Add token to dependency array

    const itemTemplate = (data) => {
        const handleButtonClick = () => {
            navigate(`/panel/${data.name}`, { state: { someProp: data } }); // Replace with your target route and parameter
        };

        return (
            <div className="col-10">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{data.name}</div>
                            </div>
                            <div className="flex flex-column gap-2">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-chart-bar product-category-icon"></i>
                                    <span className="font-semibold">{data.questions.length} questions</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-start" style={{ height: '100%' }}>
                            <div className="description" style={{ 
                                minHeight: '100px',
                                maxHeight: '100px',
                                overflow: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                textAlign: 'left'
                            }}>
                                {data.description}
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-6 lg:gap-2">
                            <span className="text-2xl font-semibold">{data.score} points</span>
                            <Button icon="pi pi-comments" label="To participate" onClick={handleButtonClick} disabled={data.inventoryStatus === 'OUTOFSTOCK'} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <DataScroller value={panels} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
        </div>
    );
}