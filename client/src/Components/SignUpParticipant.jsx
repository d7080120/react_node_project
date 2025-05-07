
import axios from 'axios';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { InputMask } from "primereact/inputmask";
import cities from '../data/cities.json'
import { AutoComplete } from "primereact/autocomplete";
import { InputNumber } from 'primereact/inputnumber';
import React, { useEffect, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { SelectButton } from 'primereact/selectbutton';
import { Toast } from 'primereact/toast';

import UserContext from '../App'
export default function SignUpParticipant({ setVisible, visible }) {
    const user = useContext(UserContext);
    const toast = useRef(null);

    const options = ['Female', 'Male'];
    const [value, setValue] = useState(options[0]);
    const [gender, setGender] = useState('Female')
    const [city, setCity] = useState('')
    const [filteredCountries, setFilteredCountries] = useState([...cities]);
    const search = (event) => {
        setTimeout(() => {
            let _filteredCountries;

            if (!event.query.trim().length) {
                _filteredCountries = [...cities];
            }
            else {
                _filteredCountries = cities.filter((country) => {
                    return country.city.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFilteredCountries(_filteredCountries);
        }, 250);
    }
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const defaultValues = {
        phone: '',
        username: '',
        date: '',
        name: '',
        email: '',
        password: '',
        address: '',
        date: null,
        city: null,
        accept: false,
        gender: 'Female'
    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    const onSubmit = (data) => {
        console.log(data);
        setFormData(data);
        console.log(formData);
        const sucsses = sign(data)
        console.log(sucsses);
    };
    
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );
    const sign = async (data) => {
        data.gender = gender
        data.city = data.city.city
        const isValidCity = filteredCountries.some(country => country.city === data.city);
        if (!isValidCity) {
            toast.current.show({ severity: 'error', summary: 'Submit Failed', detail: "You Shold choose the city from the list" });
            return
        }
        console.log(gender);
        console.log(data);
        console.log(formData);
        try {
            const res = await axios.post('http://localhost:1135/auth/registerParticipant', data)
            console.log("res" + res);
            reset(); setShowMessage(true);
            setVisible(false)

            return true
        }
        catch (e) {
            if (e.status === 401)
                if (JSON.parse(e.request.response).message === "All fields are required")
                    toast.current.show({ severity: 'error', summary: 'Login Failed', detail: "You Shold fill all the required fields" });
            if (e.status === 409) {
                toast.current.show({ severity: 'error', summary: 'Login Failed', detail: "This username is exist choose another username" });
                return false;
            }
            if (e.status === 400) {
                toast.current.show({ severity: 'error', summary: 'Login Failed', detail: e.message });
                return false;
            }
        }

    }
    return (
        <div className="card">
            <Dialog
                visible={visible}
                modal
                onHide={() => { if (!visible) return; setVisible(false); }}
                content={({ hide }) => (
                    <div className="form-demo">
                        <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                            <div className="flex justify-content-center flex-column pt-6 px-3">
                                <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                                <h5>Registration Successful!</h5>
                                <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                                    Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
                                </p>
                            </div>
                        </Dialog>
                        <div className="flex justify-content-center">
                            <div className="card" >
                                <h2 className="text-center">Register</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                                    <div className="field">
                                        <span className="p-float-label" style={{ padding: "5 px" }}>
                                            <Controller name="username" control={control} rules={{ required: 'Userame is required.' }} render={({ field, fieldState }) => (
                                                <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                            )} />
                                            <label htmlFor="username" className={classNames({ 'p-error': errors.name })}>Username*</label>
                                        </span>
                                        {getFormErrorMessage('username')}
                                    </div>
                                    <div className="field">
                                        <span className="p-float-label" >
                                            <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                                                <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} header={passwordHeader} footer={passwordFooter} />
                                            )} />
                                            <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                                        </span>
                                        {getFormErrorMessage('password')}
                                    </div>
                                    <div className="field">
                                        <span className="p-float-label" style={{ padding: "5 px" }}>
                                            <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                                <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                            )} />
                                            <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Name*</label>
                                        </span>
                                        {getFormErrorMessage('name')}
                                    </div>
                                    <div className="field">
                                        <span className="p-float-label p-input-icon-right" >
                                            <Controller name="email" control={control}
                                                rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                                                render={({ field, fieldState }) => (
                                                    <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                                )} />
                                            <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                                        </span>
                                        {getFormErrorMessage('email')}
                                    </div>
                                    <div className="field">
                                        <span className="p-float-label p-input-icon-right">
                                            <Controller
                                                name="phone"
                                                control={control}
                                                rules={{
                                                    required: 'Phone is required.',
                                                    pattern: {
                                                        value: /^0\d{2}-\d{3}-\d{4}$/,
                                                        message: 'Invalid phone number. Format: 999-999-9999'
                                                    }

                                                }}
                                                render={({ field, fieldState }) => (
                                                    <InputMask id={field.name} {...field}

                                                        className={classNames({ 'p-invalid': fieldState.invalid })} mask="999-999-9999" placeholder="999-999-9999"></InputMask>
                                                )}
                                            />
                                            <label htmlFor="phone" className={classNames({ 'p-error': !!errors.phone })}>Phone*</label>
                                        </span>
                                        {getFormErrorMessage('phone')}
                                    </div>
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Controller
                                                name="date" 
                                                control={control}
                                                rules={{ required: 'Birthday is required.' }} 
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <Calendar
                                                            id={field.name}
                                                            value={field.value}
                                                            onChange={(e) => field.onChange(e.value)} 
                                                            dateFormat="dd/mm/yy"
                                                            mask="99/99/9999"
                                                            showIcon
                                                            className={classNames({ 'p-invalid': fieldState.invalid })} 
                                                        />
                                                    </>
                                                )}
                                            />
                                            <label htmlFor="date" className={classNames({ 'p-error': !!errors.date })}>Birthday*</label>
                                        </span>
                                        {getFormErrorMessage('date')}

                                    </div>
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Controller
                                                name="city" 
                                                control={control}
                                                rules={{ required: 'City is required.' }} 
                                                render={({ field, fieldState }) => (
                                                    <AutoComplete
                                                        {...field} 
                                                        field='city' 
                                                        value={field.value} 
                                                        suggestions={filteredCountries}
                                                        completeMethod={search}
                                                        onChange={(e) => {
                                                            field.onChange(e.value)
                                                        }}
                                                        dropdown
                                                        className={classNames({ 'p-invalid': fieldState.invalid })} 
                                                    />
                                                )}
                                            />
                                            <label htmlFor="city" className={classNames({ 'p-error': !!errors.city })}>City*</label>
                                        </span>
                                        {getFormErrorMessage('city')}
                                    </div>
                                    <div className="field">
                                        <span className="p-float-label" style={{ padding: "5 px" }}>
                                            <Controller name="address" control={control} rules={{ required: 'Address is required.' }} render={({ field, fieldState }) => (
                                                <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                            )} />
                                            <label htmlFor="address" className={classNames({ 'p-error': errors.name })}>Address*</label>
                                        </span>
                                        {getFormErrorMessage('address')}
                                    </div>
                                    <div className="inline-flex flex-column gap-2">
                                        <label htmlFor="username" className="text-primary-50 font-semibold">
                                            gender
                                        </label>

                                        <div style={{ padding: "1px" }} className="card flex justify-content-center">
                                            <SelectButton value={value} onChange={(e) => { setValue(e.value); setGender(e.value) }} options={options} />
                                        </div>
                                    </div>

                                    <div className="field-checkbox">
                                        <Controller name="accept" control={control} rules={{ required: true }} render={({ field, fieldState }) => (
                                            <Checkbox inputId={field.name} onChange={(e) => field.onChange(e.checked)} checked={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="accept" className={classNames({ 'p-error': errors.accept })}>I agree to the terms and conditions*</label>
                                    </div>

                                    <Button type="submit" label="Submit" className="mt-2" />
                                    <Button label="Cancel" onClick={(e) => hide(e)} className="mt-2"></Button>

                                </form>
                            </div>
                        </div>
                    </div>
                )}

            ></Dialog>
            <Toast ref={toast} />


        </div>
    )
}
