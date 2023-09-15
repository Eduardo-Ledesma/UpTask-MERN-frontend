import { useState, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom"
import axiosClient from "../config/axiosClient"

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [tokenLS, setTokenLS] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const userAuth = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setLoading(false)
                return
            }

            try {
                const { data } = await axiosClient('/users/profile', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }) 
                setAuth(data)
                setTokenLS(token)
            } catch (error) {
                setAuth({})
                console.log(error.response.data.msg)
            }
            setLoading(false)
        }
        userAuth()
    }, [])

    const authLogOut = () => {
        setAuth({})
        setTokenLS('')
    }

    return <AuthContext.Provider
        value={{
            auth,
            setAuth,
            loading,
            authLogOut
        }}
    >
        {children}
    </AuthContext.Provider>
}

export {
    AuthProvider
}

export default AuthContext