import { useState, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom"
import axiosClient from "../config/axiosClient"
import useAuth from "../hooks/useAuth"
import Swal from "sweetalert2"
import io from 'socket.io-client'

let socket

const ProyectsContext = createContext()

const ProyectsProvider = ({children}) => {

    const [proyects, setProyects] = useState([])
    const [proyectsCollaborator, setProyectsCollaborator] = useState([])
    const [totalProyects, setTotalProyects] = useState([])
    const [proyect, setProyect] = useState({})
    const [alert, setAlert] = useState({})
    const [loading, setLoading] = useState(false)
    const [taskFormModal, setTaskFormModal] = useState(false)
    const [collaboratorFormModal, setCollaboratorFormModal] = useState(false)
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState({})
    const [collaborator, setCollaborator] = useState({})
    const [collaborators, setCollaborators] = useState([])
    const [proyectOwner, setProyectOwner] = useState('')
    const [proyectSearch, setProyectSearch] = useState('')
    const [proyectsResult, setProyectsResult] = useState([])
    const [tasksSearch, setTasksSearch] = useState('')
    const [tasksResult, setTasksResult] = useState([])

    const navigate = useNavigate()
    const { auth } = useAuth()

    const showAlert = alert => {
        setAlert(alert)
        setTimeout(() => {
            setAlert({})
        }, 3500);
    }

    // to find projects
    useEffect(() => {
        const filteredProyects = proyectSearch === '' ? [] : totalProyects.filter( prjct => 
            prjct.name.toLowerCase().includes(proyectSearch.toLowerCase()))
        setProyectsResult(filteredProyects) 
    }, [proyectSearch])

    // to find tasks
    useEffect(() => {
        const filteredTasks = tasksSearch === '' ? [] : tasks.filter( tsk => 
            tsk.name.toLowerCase().includes(tasksSearch.toLowerCase()))
            setTasksResult(filteredTasks) 
    }, [tasksSearch])

    // to get the projects
    useEffect(() => {
        const getProyects = async () => {
            const token = localStorage.getItem('token')
            if(!token) return
            setLoading(true)
            
    
            try {
                const { data } = await axiosClient('/proyects', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                
                const ownProyects = data.filter(prjct => prjct.creator === auth._id)
                setProyects(ownProyects)

                const proyectCollaborator = data.filter(prjct => prjct.creator !== auth._id)
                setProyectsCollaborator(proyectCollaborator)

                setTotalProyects(data)
            } catch (error) {
                console.log(error.response.data.msg)
            }
            setLoading(false)
        }
        getProyects()
    }, [auth._id])

    // open connection to socket.io
    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL_IO)
    }, [])
    
    const submitForm = async (proyect) => {
        if(proyect.id) {
            await editProyect(proyect)
        } else {
            await createProyect(proyect)
        }
    }

    const createProyect = async proyect => {
        const token = localStorage.getItem('token')
        if(!token) return
        
        try {
            const { data } = await axiosClient.post('/proyects', proyect, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            setProyects([...proyects, data]) 
            showAlert({
                msg: 'Project created successfully!'
            })
            setTimeout(() => {
                navigate('/proyects')
            }, 3000)
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const getProyect = async id => {
        const token = localStorage.getItem('token')
        if(!token) return
        setLoading(true)
        setTasks([])

        try {
            const { data } = await axiosClient(`/proyects/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            setProyectOwner(data.ownerName)
            setProyect(data.proyect)
            setTasks(data.proyect.tasks)
            setCollaborators(data.proyect.collaborators)
            setAlert({})
            setProyectSearch('')
        } catch (error) {
            setProyect({})
            setTasks([])
            navigate('/proyects')
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
        setLoading(false)
    }

    const editProyect = async proyect => {
        const token = localStorage.getItem('token')
        if(!token) return

        try {
            const { id } = proyect
            const { data } = await axiosClient.put(`/proyects/${id}`, proyect, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            const updatedProyects = proyects.map( proyect => proyect._id === data._id ? data : proyect)
            setProyects(updatedProyects)
            showAlert({
                msg: 'Project edited successfully!'
            })
            setTimeout(() => {
                navigate('/proyects')
            }, 3000)
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const deleteProyect = async id => {
        const token = localStorage.getItem('token')
        if(!token) return

        try {
            await axiosClient.delete(`/proyects/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            const updatedProyects = proyects.filter( proyect => proyect._id !== id )
            setProyects(updatedProyects)
            Swal.fire({
                title: 'Your project has been deleted.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2900
            })
            setTimeout(() => {
                navigate('/proyects')
            }, 3000)
        } catch (error) {
            Swal.fire({
                title: 'Ups, an error ocurred',
                icon: 'error',
                showConfirmButton: false,
                timer: 2900
            })
        }
    }

    const handleTaskFormModal = () => {
        setTaskFormModal(false)
        setTask({})
    }

    const handleCollaboratorFormModal = () => {
        setCollaboratorFormModal(false)
        setAlert({})
        setCollaborator({})
    }

    const submitTaskForm = async (task) => {
        if(task.id) {
            await editTask(task)
        } else {
            await createTask(task)
        }
    }

    const createTask = async task => {
        const token = localStorage.getItem('token')
        if(!token) return

        try {
            
            const { data } = await axiosClient.post('/tasks', task, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            
            setAlert({
                msg: 'Task created successfully!'
            })
            setTimeout(() => {
                setAlert({})
                handleTaskFormModal()
            }, 2000);

            // Socket io
            socket.emit('new task', data)
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    // socket io
    const addSocketTask = task => {
        setTasks([...tasks, task])
    }

    const getTask = task => {
            setTask(task)
            setTaskFormModal(true)
    }

    const editTask = async task => {
        const token = localStorage.getItem('token')
        if(!token) return

        try {
            const { data } = await axiosClient.put(`/tasks/${task.id}`, task, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            
            setAlert({
                msg: 'Task edited successfully!'
            })
            setTimeout(() => {
                setAlert({})
                handleTaskFormModal()
            }, 2000);

            // socket io
            socket.emit('update task', data)
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    // socket io
    const updateSocketTask = updatedTask => {
        const updatedTasks = tasks.map(task => task._id === updatedTask._id ? updatedTask : task)
        setTasks(updatedTasks)
    }

    const deleteTask = async task => {
        const token = localStorage.getItem('token')
        if(!token) return

        try {
            await axiosClient.delete(`/tasks/${task._id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            Swal.fire({
                title: 'Your task has been deleted.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2900
            })

            // Socket io
            socket.emit('delete task', task)
        } catch (error) {
            Swal.fire({
                title: error.response.data.msg,
                icon: 'error',
                showConfirmButton: false,
                timer: 2900
            })
        }
    }

    // socket io
    const deleteSocketTask = deletedTask => {
        const updatedTasks = tasks.filter(task => task._id !== deletedTask._id)
        setTasks(updatedTasks)
    }

    const completeTask = async id => {
        const token = localStorage.getItem('token')
        if(!token) return

        try {
            const { data } = await axiosClient.post(`/tasks/state/${id}`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            
            // socket io
            socket.emit('complete task', data)
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    // socket io
    const completeSocketTask = completedTask => {
        const updatedTasks = tasks.map(task => task._id === completedTask._id ? completedTask : task)
        setTasks(updatedTasks)
    }

    const findCollaborator = async email => {
        const token = localStorage.getItem('token')
        if(!token) return
        setCollaborator({})

        try {
            const { data } = await axiosClient.post('/proyects/collaborators', {email}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            setCollaborator(data)
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const addCollaborator = async collaborator => {
        const token = localStorage.getItem('token')
        if(!token) return

        try {
            const { data } = await axiosClient.post(`/proyects/collaborators/${proyect._id}`, collaborator, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            
            showAlert({ 
                msg: 'Collaborator added successfully!'
            })
            setCollaborators([...collaborators, data])
            
            setTimeout(() => {
                setAlert({})
                setCollaborator({})
                handleCollaboratorFormModal()
            }, 2000);
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const deleteCol = async id => {
        const token = localStorage.getItem('token')
        if(!token) return

        try {
            const { data } = await axiosClient.post(`/proyects/collaborator-delete/${proyect._id}`, {id}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            showAlert(data)
            const updatedCollaborators = collaborators.filter(col => col._id !== id)
            setCollaborators(updatedCollaborators)
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const proyectsLogOut = () => {
        setProyects([])
        setProyectsCollaborator([])
        setTotalProyects([])
        setProyect({})
        setAlert({})
        setTasks([])
        setCollaborators([])
        setProyectOwner('')
        setProyectSearch('')
        setProyectsResult([])
    }

    return <ProyectsContext.Provider
        value={{
            proyects,
            proyectsCollaborator,
            alert,
            showAlert,
            submitForm,
            getProyect,
            proyect,
            setProyect,
            loading,
            deleteProyect,
            taskFormModal,
            setTaskFormModal,
            handleTaskFormModal,
            submitTaskForm,
            tasks,
            getTask,
            task,
            deleteTask,
            findCollaborator,
            collaborator,
            setCollaborator,
            addCollaborator,
            collaborators,
            deleteCol,
            completeTask,
            proyectOwner,
            proyectSearch,
            setProyectSearch,
            proyectsResult,
            addSocketTask,
            deleteSocketTask,
            updateSocketTask,
            completeSocketTask,
            proyectsLogOut,
            setTasksSearch,
            tasksSearch,
            tasksResult,
            collaboratorFormModal,
            setCollaboratorFormModal,
            handleCollaboratorFormModal
        }}
    >
        {children}
    </ProyectsContext.Provider>
}

export {
    ProyectsProvider
}

export default ProyectsContext