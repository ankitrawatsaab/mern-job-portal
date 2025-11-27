import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'


const Signup = () => {

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);


  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    dispatch(setLoading(true));
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }, withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }

  }

  return (
    <div>
      <Navbar />
      <div className='flex justify-center items-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign Up </h1>
          <div className='my-2 flex flex-col gap-3'>
            <Label>Full Name</Label>
            <Input type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder='Enter Your Full Name' />
          </div>
          <div className='my-2 flex flex-col gap-3'>
            <Label>Email</Label>
            <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder='Enter Your Email' />
          </div>
          <div className='my-2 flex flex-col gap-3'>
            <Label>Phone Number</Label>
            <Input type="tel" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder='Enter Your Phone Number' />
          </div>
          <div className='my-2 flex flex-col gap-3'>
            <Label>Password</Label>
            <Input type="password" value={input.password} name="password" placeholder='Enter Your Password' onChange={changeEventHandler} />
          </div>
          <div className='flex justify-between items-center'>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input type="radio" value="student" name="role" className={"cursor-pointer"} checked={input.role === 'student'} onChange={changeEventHandler} />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio" value="recruiter" name="role" checked={input.role === 'recruiter'} onChange={changeEventHandler} className={"cursor-pointer"} />
                <Label htmlFor="r2">Recuriter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input accept="image/*" type="file" className={"cursor-pointer"} onChange={changeFileHandler} />
            </div>
          </div>
          {
            loading ? <Button className="w-full my-4" ><Loader2 className='mr-2 h-4 w-4 animation-spin' />Please Wait</Button> : <Button type="Submit" className="w-full my-4 ">Signup</Button>
          }
          <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
        </form>
      </div>


    </div>
  )
}

export default Signup
