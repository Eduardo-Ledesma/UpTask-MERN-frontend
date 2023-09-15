import { useState, useEffect } from "react"
import { useParams, useNavigate, Link, Navigate } from "react-router-dom"
import axiosClient from "../config/axiosClient"
import Alert from "../components/Alert"
import useAuth from "../hooks/useAuth"

const NewPassword = () => {

    const [token, setToken] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [passwordChanged, setPasswordChanged] = useState(false)
    const [alert, setAlert] = useState({})
    const [number, setNumber] = useState(5)
    const params = useParams()
    const navigate = useNavigate()

    const { auth } = useAuth()

    useEffect(() => {
        if(params.id) {
            setToken(params.id)
        } else {
            navigate('/')
        }
    }, [params])

    const validateToken = async () => {
        if(token.length) {
            try {
                const url = `/users/forgot-password/${token}`
                await axiosClient(url)
            } catch (error) {
                setAlert({
                    msg: error.response.data.msg,
                    error: true
                })

                const countdown = number => {
                    if (number >= 1) {
                        setTimeout(() => {
                            setNumber(number)
                            countdown(number - 1)
                        }, 1000)
                    } else {
                        setTimeout(() => {
                            navigate('/')
                        }, 1000)
                    }
                }
                countdown(4)
            }
        }
    }

    useEffect(() => {
        validateToken()
    }, [token])

    const handleSubmit = async e => {
        e.preventDefault()
        
        if(!password || !repeatPassword) {
            setAlert({
                msg: 'All fields are required',
                error: true
            })
            removeAlert()
            return
        }
        if(password.length < 5) {
            setAlert({
                msg: 'Password must contain minimum 5 characters',
                error: true
            })
            removeAlert()
            return
        }
        if(password !== repeatPassword) {
            setAlert({
                msg: "Passwords don't match",
                error: true
            })
            removeAlert()
            return
        }
        
        try {
            const url = `/users/forgot-password/${token}`
            const { data } = await axiosClient.post(url, {token, password})
            setAlert({
                msg: data.msg
            })
            setPasswordChanged(true)
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

    function removeAlert() {
        setTimeout(() => {
            setAlert({})
        }, 3500)
    }
    const { msg } = alert

    return (
        <>
            { auth.name && <Navigate to='/proyects' />}
            <h1 className="text-sky-600 font-black text-6xl capitalize mb-20">Reset your password and don&apos;t lose {''}
            <span className="text-slate-700">your projects</span></h1>
            
            { msg && <Alert alert={alert} /> } 
                
            { msg === 'Invalid token' ? (
                <p className="font-bold">Redirecting to Log In {number}...</p>
            ) : (
                <>
                    <form className="my-10 bg-white shadow rounded-lg p-10"
                        onSubmit={handleSubmit}
                    >
                        <div className="my-8">
                            <label htmlFor="password"
                                className="uppercase text-gray-600 block text-xl font-bold"
                            >New password</label>
                            <input type="password" id="password" placeholder="New password"
                                className="w-full mt-3 p-3 border-b-2 bg-gray-50 focus:outline-none
                                focus:border-sky-600 text-xl"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="my-8">
                            <label htmlFor="repeat-password"
                                className="uppercase text-gray-600 block text-xl font-bold"
                            >Repeat new password</label>
                            <input type="password" id="repeat-password" placeholder="Repeat new password"
                                className="w-full mt-3 p-3 border-b-2 bg-gray-50 focus:outline-none
                                focus:border-sky-600 text-xl"
                                value={repeatPassword}
                                onChange={e => setRepeatPassword(e.target.value)}
                            />
                        </div>

                        <div className="xl:flex">
                            <input type="submit" value='Save Change'
                                className="bg-sky-700 w-full xl:w-1/2 mx-auto py-3 text-white uppercase font-bold rounded-md 
                                text-xl hover:cursor-pointer hover:bg-sky-800 transition-colors"
                            />
                        </div>
                    </form>
                    
                    { passwordChanged && (
                        <div className="block text-center my-5">
                        <Link to='/'
                            className="text-slate-600 text-xl 
                            hover:border-b hover:border-slate-600"
                        >Go to Log in</Link>
                    </div>
                    )}
                    
                </>
            )}
            
        </>
    )
}

export default NewPassword