import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import axiosClient from "../config/axiosClient"
import Alert from "../components/Alert"
import useAuth from "../hooks/useAuth"

const ForgotPassword = () => {
    
    const [email, setEmail] = useState('')
    const [alert, setAlert] = useState({})

    const { auth } = useAuth()

    const handleSubmit = async e => {
        e.preventDefault()
        
        if(!email) {
            setAlert({
                msg: 'Please write your email so we can send you the instrucctions',
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, 3500);
            return
        }
        if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
            setAlert({
                msg: 'Invalid Email',
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, 3500);
            return
        }


        try {
            const url = `/users/forgot-password`
            const { data } = await axiosClient.post(url, {email})
            setAlert({
                msg: data.msg,
            })
            setEmail('')
        } catch (error) {
            setAlert({ 
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, 3500);
        }
    }
    
    const { msg } = alert

    return (
        <>
            { auth.name && <Navigate to='/proyects' />}
            <h1 className="text-sky-600 font-black text-6xl capitalize">Recover the access and don&apos;t lose {''}
            <span className="text-slate-700">your projects</span></h1>

            <form className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >
                { msg && <Alert alert={alert} /> }
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

                <div className="xl:flex">
                    <input type="submit" value='Send'
                        className="bg-sky-700 w-full xl:w-1/2 mx-auto py-3 text-white uppercase font-bold rounded-md 
                        text-xl hover:cursor-pointer hover:bg-sky-800 transition-colors"
                    />
                </div>
            </form>

            <nav className="lg:flex lg:justify-between">
                <div className="block text-center my-5">
                    <Link to='/'
                        className="text-slate-600 text-xl 
                        hover:border-b hover:border-slate-600"
                    >Already have a account? Log in</Link>
                    
                </div>
                <div className="block text-center my-5">
                    <Link to='/register'
                        className="text-slate-600 text-xl 
                        hover:border-b hover:border-slate-600"
                    >Don&apos;t have a account? Sign up</Link>
                </div>
            </nav>
        </>
    )
}

export default ForgotPassword