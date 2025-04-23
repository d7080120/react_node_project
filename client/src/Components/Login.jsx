import React, { useState, useRef } from 'react';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import SignUpCustomer from './SignUpCustomer';
import { setToken, setUser } from '../redux/tokenSlice';
import { Toast } from 'primereact/toast';
import SignUpParticipant from './SignUpParticipant';

export default function Login() {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const [visibleCust, setVisibleCust] = useState(false);
    const [visiblePart, setVisiblePart] = useState(false);
    const dispatch = useDispatch();
    const toast = useRef(null); 
    const login = async () => {
        try {
            const res = await axios.post('http://localhost:1135/auth/login', { username: userName, password: password });
            console.log(res.data.userInfo);
            dispatch(setUser(res.data.userInfo));
            dispatch(setToken(res.data.accessToken));
            console.log(res);
            if(res.data.userInfo.roles.find((e)=>{return e==="Participant"})){
                navigate('/participant'); 
            }
            if(res.data.userInfo.roles.find((e)=>{return e==="Customer"})){
                navigate('/customer'); 
            }
            
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response ? error.response.data.message : 'An error occurred during login.';
            toast.current.show({ severity: 'error', summary: 'Login Failed', detail: errorMessage });
        }
    };

    return (
        <div className="card">
            <div className=" flex-column md:flex-row">
                <div style={{ marginBottom: 100 }} className="w-full md:w-full flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div style={{ marginBottom: 20 }} className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Username</label>
                        <InputText onChange={(e) => setUserName(e.target.value)} id="username" type="text" className="w-12rem" />
                    </div>
                    <div style={{ marginBottom: 20 }} className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Password</label>
                        <InputText onChange={(e) => setPassword(e.target.value)} id="password" type="password" className="w-12rem" />
                    </div>
                    <Button onClick={login} label="Login" icon="pi pi-user" className="w-10rem mx-auto"></Button>
                </div>
                <div className="w-full md:w-full">
                    <Divider layout="horizontal" className="hidden md:flex">
                        <b>OR</b>
                    </Divider>
                    <Divider layout="horizontal" className="flex md:hidden" align="center">
                        <b>OR</b>
                    </Divider>
                </div>

                <div className="w-full md:w-full align-items-center justify-content-center py-5">
                    <Button style={{ margin: 30 }} onClick={() => setVisibleCust(true)} label="to purchase a panel" icon="pi pi-user-plus" severity="success" className="w-10rem"></Button>
                    <br />
                    <Button onClick={() => setVisiblePart(true)} label="new participant" icon="pi pi-user-plus" severity="success" className="w-10rem"></Button>
                </div>
            </div>
            {visiblePart ? <SignUpParticipant setVisible={setVisiblePart} visible={visiblePart}></SignUpParticipant> : <></>}
            {visibleCust ? <SignUpCustomer setVisible={setVisibleCust} visible={visibleCust} /> : <></>}
            <Toast ref={toast} /> {/* Toast component for notifications */}
        </div>
    )
}
