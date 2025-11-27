import { PopoverContent, Popover, PopoverTrigger } from '@radix-ui/react-popover'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import axios from 'axios'

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LogoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.error || "Something went wrong");
        }

    }
    return (
        <>
            <div className='flex justify-between items-center mx-auto max-w-7xl p-5'>
                <div className='bg-white'>
                    <h1 className='text-2xl font-bold'> Career<span className='text-[#6A38C2]'>Verse</span></h1>
                </div>

                <div className='flex gap-2 items-center'>
                    <ul className='flex gap-5 font-medium items-center'>
                        {
                            user && user.role == 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>

                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }

                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className='bg-[#6A38C2] hover:bg-[#4400b8]'>Signup</Button></Link>

                            </div>

                        ) : (
                            <Popover >
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='absolute right-0 mt-2 bg-white w-80 p-5 rounded-xl shadow-xl border border-gray-100 z-50'>
                                    <div>
                                        <div className='flex gap-4 space-y-2 '>
                                            <Avatar className='cursor-pointer'>
                                                <AvatarImage src={user?.profile?.profilePhoto} />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>

                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role =='student' && (
                                                    <div className='flex gap-2 cursor-pointer items-center'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>

                                                )
                                            }

                                            <div className='flex items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={LogoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div >

        </>
    )
}
export default Navbar

