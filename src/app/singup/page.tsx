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
  const handleSubmit = async(event: React.FormEvent)=>{
    event.preventDefault();
    await singup(id, password);
  }
    
  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto w-full" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            아이디
          </label>
          <input onChange={(e)=>{
            setId(e.target.value)}}
            type="text" placeholder="아이디"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              비밀번호
          </label>
          <input onChange={(e)=>{
            setPassword(e.target.value)}}
            type="password" placeholder="비밀번호"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex items-center justify-center">
          <button className="btn" type="submit">회원가입</button>
        </div>
      </form>
    </div>
  )
}