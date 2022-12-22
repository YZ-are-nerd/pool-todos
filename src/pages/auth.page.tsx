import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Auth from '../components/Auth/template/Auth'
import { User } from '../store/User'
const AuthPage = () => {
  const user = useRecoilValue(User)
  const navigate = useNavigate()
  useEffect(() => {
    console.log('auth', user);
    if (user) navigate('/');
  },[user])
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <Auth />
    </div>
  )
}

export default AuthPage