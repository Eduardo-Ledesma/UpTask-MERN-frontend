import useAuth from "../hooks/useAuth"
import useProyects from "../hooks/useProyects"
import formatDate from "../helpers/formatDate"
import Swal from "sweetalert2"

const Tasks = ({task}) => {
    
    const { name, description, date, priority, _id, state, completedBy } = task
    const { auth } = useAuth()
    const { getTask, deleteTask, proyect, completeTask } = useProyects()
    
    const setPriority = () => {
        let classWillBe 
        if(priority === 'Low') {
            classWillBe = 'text-green-600 font-bold'
        } else if(priority === 'Medium') {
            classWillBe = 'text-yellow-600 font-bold'
        } else {
            classWillBe = 'text-red-600 font-bold'
        }
        return classWillBe
    }
    const myColorIs = setPriority()

    const handleClick = async task => {
        await Swal.fire({
            title: 'Are you sure?',
            text: "The task will be deleted!",
            icon: 'warning',
            iconColor: '#d33',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then( async (result) => {
            if (result.isConfirmed) {
                await deleteTask(task)
            }
        })
    }

    return (
        <div className="border-b p-5 flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between gap-2">
            <div className="mb-4 sm:mb-0 md:mb-6 lg:mb-0 max-w-4xl flex flex-col items-start">
                <div className="sm:flex gap-6 items-center mb-2 sm:mb-0">
                    <h3 className="mb-2 text-2xl text-blue-600 font-bold">{name}</h3>

                        <div className="flex items-center gap-1">
                            <button className={state ? "text-green-600" : "text-amber-600"}
                                onClick={() => completeTask(_id)}
                            >{ state ? 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                            </button>
                            <p className="text-sm text-gray-700">{state ? 'Done!' : 'In progress'}</p>
                        </div>
                </div>
                <p className="mb-4 text-xm text-gray-500">{description}</p>
                <p className="mb-2 text-sm font-bold">{formatDate(date)}</p>
                <p className="text-xl font-bold text-gray-600">Priority: <span className={myColorIs}>{priority}</span>
                </p>
                { state && <p className="bg-green-600 text-white rounded-lg px-2 py-0.5 mt-2 text-sm">
                    Completed by: {completedBy?.name}</p>}
            </div>

            { proyect.creator === auth._id && (
                <div className="flex sm:flex-col md:flex-row gap-2">
                    <button className="px-4 py-3 text-blue-600 uppercase font-bold text-sm rounded-lg my-auto transition-colors
                    hover:text-blue-800"
                        onClick={() => getTask(task)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </button>

                    <button className="px-4 py-2 text-red-600 uppercase font-bold text-sm rounded-lg transition-colors 
                    hover:text-red-800 my-auto"
                        onClick={() => handleClick(task)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    )
}

export default Tasks