

import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { CustomerPanelService } from './CustomerPanelService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from 'primereact/progressbar';
export default function PanelList() {
    const [panels, setPanels] = useState([]);
    const { token } = useSelector((state) => state.token);
    const { userInfo } = useSelector((state) => state.token);
    const [isHovered, setIsHovered] = useState(false); 
    const handleMouseEnter = () => {
        setIsHovered(true); 
    };
    const handleMouseLeave = () => {
        setIsHovered(false); 
    };
    const navigate = useNavigate();
    useEffect(() => {
        CustomerPanelService.getPanels(token, userInfo).then((data) => setPanels(data));
    }, [token, userInfo]);

    const itemTemplate = (data) => {
        const handleButtonClick = () => {
            console.log(data);
            navigate(`/analizePanel`, { state: { someProp: data } });
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
                                    <i className="pi pi-user product-category-icon"></i>
                                    {console.log(data)}
                                    <span className="font-semibold">{data.listParticipans.length} participants</span>
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
                            <Button icon="pi pi-chart-bar" label="To whach analize" onClick={handleButtonClick} disabled={data.inventoryStatus === 'OUTOFSTOCK'} />
                        </div>
                    </div>
                </div>
                <div className="card">
                    {console.log(data)}
                    <div style={{ width: '100%', margin: 'auto', textAlign: 'center', position: 'relative' }}>
            {isHovered && (
                <div
                    style={{
                        position: 'absolute',
                        top: '-30px', 
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'grey', 
                        color: 'white', 
                        padding: '5px 10px',
                        borderRadius: '5px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                    }}
                >
                    {data.listParticipans.length}/{data.numsOfParticipants} participants
                </div>
            )}
            <div
                style={{
                    height: '25px',
                    width: '100%',
                    backgroundColor: '#e0e0df',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} 
            >
                <div
                    style={{
                        height: '100%',
                        width: `${(data.listParticipans.length / data.numsOfParticipants) * 100}%`, 
                        backgroundColor: '#4caf50', 
                        transition: 'width 0.5s ease-in-out',
                    }}
                ></div>
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