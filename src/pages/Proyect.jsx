import { useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import TaskModalForm from "../components/TaskModalForm"
import CollaboratorModalForm from "../components/CollaboratorModalForm"
import Tasks from "../components/Tasks"
import Collaborator from "../components/Collaborator"
import useAuth from "../hooks/useAuth"
import useProyects from "../hooks/useProyects"
import Swal from 'sweetalert2'
import io from 'socket.io-client'

let socket;

const Proyect = () => {

    const params = useParams()
    const { auth } = useAuth()
    const { getProyect, proyect, loading, deleteProyect, setTaskFormModal, tasks, collaborators, 
        proyectOwner, addSocketTask, deleteSocketTask, updateSocketTask, completeSocketTask, 
        tasksResult, tasksSearch, setCollaboratorFormModal } = useProyects()
    const { name, _id } = proyect
    const navigate = useNavigate()
    
    useEffect(() => {
        if(params.id) {
            getProyect(params.id)

            // open connection to socket io
            socket = io(import.meta.env.VITE_BACKEND_URL_IO)
            socket.emit('open project', params.id)
        }
    }, [params])

    // get response from the back
    useEffect(() => {
        socket.on('added task', newTask => {
            if(newTask.proyect === proyect._id) {
                addSocketTask(newTask)
            }
        })

        socket.on('deleted task', task => {
            if(task.proyect === proyect._id) {
                deleteSocketTask(task)
            }
        })

        socket.on('updated task', task => {
            if(task.proyect._id === proyect._id) {
                updateSocketTask(task)
            }
        })

        socket.on('completed task', task => {
            if(task.proyect._id === proyect._id) {
                completeSocketTask(task)
            }
        })
    })

    const handleClick = async id => {
        await Swal.fire({
            title: 'Are you sure?',
            text: "The project will be deleted!",
            icon: 'warning',
            iconColor: '#d33',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then( async (result) => {
            if (result.isConfirmed) {
                await deleteProyect(id)
            }
        })
    }

    return (
        loading ? 
            <Spinner /> : (
            <>
                <div className="flex justify-between">
                    <h1 className="font-black text-4xl text-gray-600">Project: <span className="text-blue-600">{name}</span></h1>
                    
                    <div className="mt-4">
                        <button 
                            onClick={() => navigate(-1)}
                            className="uppercase font-bold flex gap-2 bg-sky-600 transition-colors hover:bg-sky-700 p-2 rounded-full text-white"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" />
                        </svg>
                        </button>
                    </div>
                </div>
                <p className="text-gray-700 font-bold text-sm mt-6 lg:mt-0">Created by: {proyectOwner}</p>
                { proyect.creator === auth._id && (
                    <div className="flex mt-6 gap-6">
                        <div className="flex items-center gap-2 text-gray-500 hover:text-green-700 mb-4 mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                            </svg>
                            <Link to={`/proyects/edit/${params.id}`}
                                className="uppercase font-bold"
                            >
                            Edit</Link>
                        </div>

                        <div className="flex items-center gap-2 text-gray-500 hover:text-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                            </svg>
                            <button type="button"
                                className="uppercase font-bold"
                                onClick={() => handleClick(_id)}
                            >
                            Delete</button>
                        </div>
                    </div>
                )}
                
                <div className="flex items-center gap-10 mt-10">
                    <p className="font-bold text-2xl text-gray-600 underline">Project Tasks</p>
                    { proyect.creator === auth._id && (
                        <button type="button" 
                            className="text-blue-600 uppercase font-bold flex gap-2 text-lg transition-colors hover:text-blue-800" 
                            onClick={() => setTaskFormModal(true)}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Add
                        </button> 
                    )}  
                </div>
                <TaskModalForm />

                <div className="bg-white shadow mt-6 rounded-lg">
                    { tasksSearch.length > 0 ? !tasksResult.length ? (
                        <p className="font-bold text-xl text-center text-gray-600 mt-12 py-4">No Coincidences.</p>
                    ) : (
                        <>
                            {tasksResult.map(task => (
                                <Tasks 
                                    key={task._id}
                                    task={task}
                                />
                            ))}
                        </>
                    ) : (
                        <>
                            { tasks.length ? 
                                tasks.map(task => (
                                    <Tasks 
                                        key={task._id}
                                        task={task}
                                    />
                                )) : <p className="text-center my-5 p-10 text-gray-600 uppercase">
                                You have no tasks in this project
                                </p>
                            }
                        </>
                    )}
                </div>

                <div className="flex items-center gap-10 mt-10">
                    <p className="font-bold text-2xl text-gray-600 underline">Collaborators</p>
                    { proyect.creator === auth._id && (
                        <button type="button" 
                            className="text-blue-600 uppercase font-bold flex gap-2 text-lg transition-colors hover:text-blue-800" 
                            onClick={() => setCollaboratorFormModal(true)}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Add 
                        </button>
                    )}   
                </div>
                <CollaboratorModalForm />

                <div className="bg-white shadow mt-6 rounded-lg">
                    { collaborators.length ? 
                        collaborators.map(col => (
                            <Collaborator 
                                key={col._id}
                                col={col}
                            />
                    )) : <p className="text-center my-5 p-10 text-gray-600 uppercase">
                        You have no collaborators in this project
                        </p>}
                </div>
            </>
        )
    )
}

export default Proyect