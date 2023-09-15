import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import axiosClient from "../config/axiosClient"
import Alert from "../components/Alert"
import useAuth from "../hooks/useAuth"

const Register = () => {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [alert, setAlert] = useState({})

    const { auth } = useAuth()

    const handleSubmit = async e => {
        e.preventDefault()

        if(!name.trim() || !password.trim() || !email.trim()) {
            setAlert({
                msg: "All fields are required",
                error: true
            })
            removeAlert()
            return
        }
        if(name.length < 4) {
            setAlert({
                msg: "Name too short",
                error: true
            })
            removeAlert()
            return
        }
        if(password.length < 5 ) {
            setAlert({
                msg: "The password must be longer than 5 characters",
                error: true
            })
            removeAlert()
            return
        }
        if(password !== repeatPassword) {
            setAlert({
                msg: 'Passwords do not match. Please ensure that your passwords are identical.',
                error: true
            })
            removeAlert()
            return
        }
        if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
            setAlert({
                msg: 'Invalid Email',
                error: true
            })
            removeAlert()
            return
        }

        try {
            const { data } = await axiosClient.post('/users', {
                name, password, email 
            })
            setAlert({ msg: data.msg})
            setName('')
            setEmail('')
            setPassword('')
            setRepeatPassword('')
        } catch (error) {
            setAlert({ 
                msg: error.response.data.msg,
                error: true
            })
            removeAlert()
        }
    }

    const { msg } = alert
    function removeAlert() {
        setTimeout(() => {
            setAlert({})
        }, 3500);
    }
    
    return (
        <>
            { auth.name && <Navigate to='/proyects' />}
            <h1 className="text-sky-600 font-black text-6xl capitalize">Register and manage {''}
            <span className="text-slate-700">your projects</span></h1>

            <form className="my-10 bg-white shadow rounded-lg p-10"
                noValidate
                onSubmit={handleSubmit}
            >
                { msg && <Alert alert={alert} />}
                <div className="my-5">
                    <label htmlFor="fullname"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >Full Name</label>
                    <input type="text" id="fullname" placeholder="Full name"
                        className="w-full mt-3 p-3 border-b-2 bg-gray-50 focus:outline-none
                        focus:border-sky-600 text-xl"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

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

                <div className="my-8">
                    <label htmlFor="repeat-password"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >Repeat Password</label>
                    <input type="password" id="repeat-password" placeholder="Repeat password"
                        className="w-full mt-3 p-3 border-b-2 bg-gray-50 focus:outline-none
                        focus:border-sky-600 text-xl"
                        value={repeatPassword}
                        onChange={e => setRepeatPassword(e.target.value)}
                    />
                </div>

                <div className="xl:flex">
                    <input type="submit" value='Sign up'
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
                    <Link to='/forgot-password'
                        className="text-slate-600 text-xl 
                        hover:border-b hover:border-slate-600"
                    >Forgotten Password?</Link>
                </div>
            </nav>
        </>
    )
}

export default Register