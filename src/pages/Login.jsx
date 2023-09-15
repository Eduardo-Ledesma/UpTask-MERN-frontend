import { useState } from "react"
import { Link, useNavigate, Navigate } from "react-router-dom"
import axiosClient from "../config/axiosClient"
import Alert from "../components/Alert"
import useAuth from "../hooks/useAuth"

const Login = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({})
    const navigate = useNavigate()

    const { auth, setAuth } = useAuth()

    const removeAlert = () => {
        setTimeout(() => {
            setAlert({})
        }, 3500);
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if(!email || !password.trim()) {
            setAlert({
                msg: 'All fields are required',
                error: true
            })
            removeAlert()
            return
        }

        try {
            const { data } = await axiosClient.post('/users/login', {
                email, password 
            })
            setAuth(data)
            localStorage.setItem('token', data.token)
            navigate('/proyects')
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            removeAlert()
        }
    }

    const { msg } = alert

    return (
        <>  
            { auth.name && <Navigate to='/proyects' />}
            <h1 className="text-sky-600 font-black text-6xl capitalize">Login and manage {''}
            <span className="text-slate-700">your projects</span></h1>

            <form className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >
                { msg && <Alert alert={alert} />}
                <div className="my-5">
                    <label htmlFor="email"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >Email</label>
                    <input type="email" id="email" placeholder="Email address"
                        className="w-full mt-3 p-3 border-b-2 bg-gray-50 focus:outline-none
                        focus:border-sky-600 text-xl"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="my-8">
                    <label htmlFor="password"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >Password</label>
                    <input type="password" id="password" placeholder="Password"
                        className="w-full mt-3 p-3 border-b-2 bg-gray-50 focus:outline-none
                        focus:border-sky-600 text-xl"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className="xl:flex">
                    <input type="submit" value='Log in'
                        className="bg-sky-700 w-full xl:w-1/2 mx-auto py-3 text-white uppercase font-bold rounded-md 
                        text-xl hover:cursor-pointer hover:bg-sky-800 transition-colors"
                    />
                </div>
            </form>

            <nav className="lg:flex lg:justify-between">
                <div className="block text-center my-5">
                    <Link to='register'
                        className="text-slate-600 text-xl 
                        hover:border-b hover:border-slate-600"
                    >Don&apos;t have a account? Sign up</Link>
                </div>
                <div className="block text-center my-5">
                    <Link to='forgot-password'
                        className="text-slate-600 text-xl 
                        hover:border-b hover:border-slate-600"
                    >Forgotten Password?</Link>
                </div>
            </nav>
        </>
    )
}

export default Login