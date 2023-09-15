import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axiosClient from "../config/axiosClient"
import Alert from "../components/Alert"

const ConfirmAccount = () => {

    const [token, setToken] = useState('')
    const [success, setSuccess] = useState({})
    const [alert, setAlert] = useState({})
    const [number, setNumber] = useState(5)
    const params = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        if(params.id) {
            setToken(params.id)
        } else {
            navigate('/')
        }
    }, [params])

    const getToken = async () => {
        if(token.length) {
            try {
                const url = `/users/confirm/${token}`
                const { data } = await axiosClient(url)
                setSuccess({ msg: data.msg });
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
        getToken()
    }, [token])

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize mb-10">Confirm your account and start building {''}
            <span className="text-slate-700">your projects</span></h1>
            { success.msg && (
                <>
                    <p className="font-bold text-4xl mt-20 mb-6 text-indigo-600">
                        {success.msg}
                    </p>
                    <p className="text-xl">You can now <Link to="/" className="text-indigo-600 font-bold">Log In</Link> and start building your proyects!</p>
                </>
            )}
            { alert.msg && (
                <>
                    <Alert alert={alert} /> 
                    <p className="font-bold">Redirecting to Log In {number}...</p>
                </>
            )}
        </>
    )
}

export default ConfirmAccount