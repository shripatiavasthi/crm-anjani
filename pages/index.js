'use client';
import TextField from '../components/TextField'
import Button from '../components/Button'
import { useSelector, useDispatch } from 'react-redux'
import { userlogin } from "../feature/loginSlice"
import React, { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit'
import { useRouter } from 'next/navigation';


export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch()

  const getlocalStorage = async() => {
    const isLogin =  await localStorage.getItem('userlogin')
    return isLogin
  }

  React.useEffect(() => {
    getlocalStorage().then((res)=> {
      router.push('/dashboard')
    })  
  }, [])
  


  const Form = () => {
    const [localState, setlocalState] = useState({
      "user": '',
      "password": ''
    })

    const handleChange = (e) => {
      e.preventDefault()
      const name = e.target.name
      const value = e.target.value
      setlocalState(values => ({
        ...values,
        [name]: value
      }))
    }

    const onSubmit = async () => {
      const data = {
        body: {
          email: localState.user,
          password: localState.password
        }
      }
      const rawResp = await dispatch(userlogin(data))
      const resp = await unwrapResult(rawResp)
      if(resp.data.token){
        localStorage.setItem('userlogin', 'true')
        router.push('/dashboard')
      }else{
        alert("Invalid username or password") 
      }
    }

    return (
      <div className='flex flex-col justify-center items-center border-2 px-10 py-10 border-blue-200 rounded-md'>
        <p className='py-5 text-xl'>
          Login
        </p>
        <TextField name='user' value={localState.user} label='Email' variant='outlined' onChange={handleChange} />
        <TextField name='password' value={localState.password} label='Password' variant='outlined' onChange={handleChange} />
        <Button css={'py-8'} text="Submit" onClick={onSubmit} />
      </div>
    )
  }


  return (
    <div className='flex flex-col justify-center items-center h-screen '>
      <Form />
    </div>
  )
}
