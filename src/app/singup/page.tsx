"use client";
import React,{ useState} from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

async function singup(id:string, password:string) {
  try{
    const response = await axios({
      url: 'https://worldisaster.com/auth/signup',
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data:{'username':id,'password':password},
      })
    console.log('회원가입 성공',response);
  } catch (error) {
    console.log('회원가입 실패',error);
  }   
}

export default function Singup() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const handlueSubmit = async(event: React.FormEvent)=>{
    event.preventDefault();
    await singup(id, password);
  }
    
  return (
    <div>
      <form className='flex flex-col mt-10 w-60' onSubmit={handlueSubmit}>
        <input onChange={(e)=>{
          setId(e.target.value)
        }} type="text" placeholder="아이디" />
        <input onChange={(e)=>{
          setPassword(e.target.value)
        }} type="password" placeholder="비밀번호" />
        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}