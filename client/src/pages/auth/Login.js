import React,{useState} from 'react'
import Layout from '../../components/layout/layout'
import toast from 'react-hot-toast'
import axios from 'axios';
import {useNavigate,useLocation} from 'react-router-dom';
import '../../style/authstyle.css';
import { useAuth } from '../../context/auth'

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [auth,setAuth] = useAuth()

    const navigate = useNavigate()
    const location = useLocation()

     //form function
     const handlesubmit = async (e) => { 
        e.preventDefault();
        try {
          const res = await axios.post('/api/v1/auth/login',{email,password});
          if (res && res.data.success) {
            toast.success(res.data && res.data.message);
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token  
            })
            localStorage.setItem('auth',JSON.stringify(res.data));
            navigate(location.state || '/');
          } else {
            toast.error(res.data.message);
          };
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong')
        }
      }

  return (
    <Layout title="Register - Ecommer App">
    <div className='MYform-container'>
        <form onSubmit={handlesubmit}>
           <h4 className='title'>LOGIN FORM</h4>
    
           <div className="mb-3">
            <input type="email" value={email} className="form-control" id="exampleInputEmail1"
             placeholder='Enter Your Email'
              onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <input type="password" value={password} className="form-control" id="exampleInputPassword1"
             placeholder='Enter Your Password'
              onChange={(e) => setPassword(e.target.value)} required />
          </div>

         
          <button type="submit" className="btn btn-primary">LOGIN</button>
        </form>

    </div>
     
</Layout>
  )
}

export default Login