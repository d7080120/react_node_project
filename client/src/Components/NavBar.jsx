import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Importing the image
import panelImage from '../image.png'; // Adjust the path as per your directory structure

export default function NavBar() {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.token);
    const userName = userInfo.name; // User's name from context/state
    const userParticipant = userInfo.roles.find((r) => r === 'Participant')
    const userCustomer = userInfo.roles.find((r) => r === 'Customer')

    const logout = {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
            navigate('/');
        }
    }
    const aboutus = {
        label: 'About Us',
        icon: 'pi pi-briefcase ',
        command: () => {
            navigate('/aboutus');
        }
    }

    const start = (
        <img
            alt="Panels Logo"
            src={panelImage}
            height="40"
            className="mr-2"
        />
    );
    const participantItems = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => {
                navigate('/participant');
            }
        },
        {
            label: 'Panels',
            icon: 'pi pi-list',
            command: () => {
                navigate('/participant');
            }
        },
        {
            label: 'Redeem points',
            icon: 'pi pi-gift',
            command: () => {
                navigate('/redeem');
            }
        },
        
        aboutus,
        logout
    ];

    const customerItems = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => {
                navigate('/customer');
            }
        },
        {
            label: 'Order Panel',
            icon: 'pi pi-shopping-cart',
            command: () => {
                navigate('/orderpanel');
            }
        },
        {
            label: 'Analyze Panel',
            icon: 'pi pi-chart-bar',
            command: () => {
                navigate('/customerPanels');
            }
        },
        
        aboutus,
        logout,
    ];

    const end = (
        <div className="flex align-items-center gap-2">
            <span>Hello {userName}</span>
            <Avatar label={userName[0]} shape="circle" />
        </div>
    );

    return (
        <div style={{ position: 'fixed',
            top: 0,
            width: '99vw', // Use viewport width
            left: 0, // Make sure it starts from the leftmost edge
            zIndex: 1000,
            boxSizing: 'border-box'}}>
            {userCustomer && <Menubar model={customerItems} start={start} end={end} />}
            {userParticipant && <Menubar model={participantItems} start={start} end={end} />}
        </div>
    );
}
