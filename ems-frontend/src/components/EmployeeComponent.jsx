import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate,useParams}  from 'react-router-dom'


const EmployeeComponent = () => {
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [email,setEmail]=useState('')
    const [houseNumber,setHouseNumber]=useState('')
    const [street,setStreet]=useState('')
    const [city,setCity]=useState('')
    const [state,setState]=useState('')
    const [country,setCountry]=useState('')

   const {id} = useParams();
    const [errors,setErrors]=useState({
        firstName:'',
        lastName:'',
        email:'',
        houseNumber:'',
        street:'',
        city:'',
        state:'',
        country:''
    })

    const navigator = useNavigate();
    useEffect(() =>{
        if(id){

            getEmployee(id).then((response) =>{
                console.log("getEmployee",response, id);
                
                setFirstName(response?.data?.firstName);
                setLastName(response?.data?.lastName);
                setEmail(response?.data?.email);
                setHouseNumber(response?.data?.houseNumber);
                setStreet(response?.data?.street);
                setCity(response?.data?.city);
                setState(response?.data?.state);
                setCountry(response?.data?.country);
                // address: [
                //     houseNumber,
                //     street,
                //     city,
                //     state,
                //     country
                // ].filter(field => field !== '').join(', ')
            }).catch(error => {
                console.error(error);
            })
        }
    },[id])

    function saveOrUpdateEmployee(e){
        e.preventDefault()
        if(Validateform()){
            const employee={firstName,lastName,email,houseNumber,street,city,state,country
            }
            console.log("employee", employee);
            if(id){
                updateEmployee(id,employee).then((response) =>{
                    console.log(response.data);
                    navigator('/employee')
                    }).catch(error => {
                        console.error(error);
                            })
                    }
                    else{
                        createEmployee(employee).then((response) =>{
                            console.log(response.data);
                            navigator('/employee')
                            }).catch(error => {
                                console.error(error);
                                   })
                        }   
                            }
    }
function Validateform() {
    let valid = true;
    const errorscopy = { ...errors };

    const namePattern = /^[a-zA-Z]+$/; // Regular expression to match only alphabets
    const emailPattern = /^[^\s@]+@[^\s@]+\.com$/; // Regular expression to match a valid 
    const numberPattern= /^[0-9]/


    if (firstName.trim()) {
        if (!namePattern.test(firstName.trim())) {
            errorscopy.firstName = 'First name should contain only alphabets';
            console.log('jghdgjef');
            valid = false;
        } else {
            errorscopy.firstName = '';
        }
    } else {
        errorscopy.firstName = 'First name is required';
        valid = false;
    }

    if (lastName.trim()) {
        if (!namePattern.test(lastName.trim())) {
            errorscopy.lastName = 'Last name should contain only alphabets';
            valid = false;
        } else {
            errorscopy.lastName = '';
        }
    } else {
        errorscopy.lastName = 'Last name is required';
        valid = false;
    }
if (email.trim()) {
        if (!emailPattern.test(email.trim())) {
            errorscopy.email = 'Invalid email format';
            valid = false;
        } else {
            errorscopy.email = '';
        }
    } else   {
        errorscopy.email = 'Email is required';
        valid = false;
      }
        if(houseNumber.trim()){
            if(!numberPattern.test(houseNumber.trim())){
        errorscopy.houseNumber = 'House number should be numbers';
        valid = false;
      }else{
        errorscopy.houseNumber = '';
      }
    }else{
        errorscopy.houseNumber='House number required'
    }

      
     if(street.trim()){
        if(!namePattern.test(street.trim())){
             errorscopy.street = 'Street should contain only alphabets and spaces';
             valid=false;
          }else{
                 errorscopy.street = '';
                }
          }else{
                    errorscopy.street = 'Street is required';
                    valid = false;
          }
          if(city.trim()){
            if(!namePattern.test(city.trim())){
                errorscopy.city = 'City should contain only alphabets and spaces';
                valid=false;
                }else{
                    errorscopy.city = '';
          }
        } else{
            errorscopy.city = 'City is required';
            valid = false;
          }
          if(state.trim()){
            if(!namePattern.test(state.trim())){
                errorscopy.state = 'State should contain only alphabets and spaces';
                valid=false;
          }else{
            errorscopy.state = '';

          }
        }
        else{
            errorscopy.state="State is required ";
            valid=false;
        }
          if(country.trim()){
            if(!namePattern.test(country.trim())){
                errorscopy.country = 'Country should contain only alphabets and spaces';
                valid=false;
          }else{
            errorscopy.country = '';
          }
        }else{
            errorscopy.country = 'Country is required';
            valid=false;
      }
    setErrors(errorscopy);
    return valid;
}
function pageTitle(){
    if(id){
        return <h2 className='text-center'>Update Employee</h2>
    }else{
        return <h2 className='text-center'>Add Employee</h2>
    }
    // return 'Employee Component'

 }

  return (
    <div className='container'>
        <div className="row">
            <div className="card">
               {
                pageTitle()
               }
                <div className="card-body">
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input type="text" 
                             placeholder='Enter Employee First Name'
                             name='firstName'
                             className={`form-control ${errors.firstName ? 'is-invalid': ''}`}
                             value={firstName}
                             onChange={(e)=>setFirstName(e.target.value)}/>
                             {errors.firstName &&<div className='invalid-feedback'>{errors.firstName}</div>}
                             </div>

                             <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input type="text" 
                             placeholder='Enter Employee Last Name'
                             name='lastName'
                             className={`form-control ${errors.lastName ? 'is-invalid': ''}`}
                             value={lastName}
                             onChange={(e) => setLastName(e.target.value)}/>
                             {errors.lastName &&<div className='invalid-feedback'>{errors.lastName}</div>}

                             </div>

                             <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input type="text" 
                                 placeholder='Enter Employee Email Id'
                                 name='email'
                                 className={`form-control ${errors.email ? 'is-invalid': ''}`}
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}/>
                                 {errors.email &&<div className='invalid-feedback'>{errors.email}</div>}
                             </div>
                             <div className='from-group mb-2'>
                                <label  className='form-label'>Address :</label>
                                <input type="text"
                                 placeholder='HouseNumber'
                                  className={`form-control ${errors.houseNumber ? 'is-invalid': ''}`}
                                  value={houseNumber}
                                    onChange={(e) => setHouseNumber(e.target.value)}
                                />{errors.houseNumber &&<div className='invalid-feedback'>{errors.houseNumber}</div>}
                                <input
                                    type="text"
                                    placeholder='street'
                                    className={`form-control ${errors.street ? 'is-invalid':''}`}
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                />{errors.street &&<div className='invalid-feedback'>{errors.street}</div>}

                                <input
                                    type="text"
                                    placeholder='city'
                                    className={`form-control ${errors.city ? 'is-invalid':''}`}
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />{errors.city &&<div className='invalid-feedback'>{errors.city}</div>}

                                <input
                                    type="text"
                                    placeholder='State'
                                    className = {`form-control ${errors.state ? 'is-invalid':''}`}
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />{errors.state &&<div className='invalid-feedback'>{errors.state}</div>}

                                <input
                                    type="text"
                                    placeholder='Country'
                                    className={`form-control ${errors.country ? 'is-invalid':''}`}
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                                
                             {errors.country &&<div className='invalid-feedback'>{errors.country}</div>}
                                
                             </div>
                             <div className='text-center'>
                             <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button></div>
                    </form>
                </div>
            </div>
      
    </div>
    </div>
  )
}

export default EmployeeComponent