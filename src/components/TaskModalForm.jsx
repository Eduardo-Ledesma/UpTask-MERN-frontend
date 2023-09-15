import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProyects from '../hooks/useProyects'
import Alert from './Alert'

const PRIORITY = ['Low', 'Medium', 'High']

const TaskModalForm = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [priority, setPriority] = useState('')
    const [id, setId] = useState(null)

    const { taskFormModal, handleTaskFormModal, alert, showAlert, submitTaskForm, proyect: { _id }, task } = useProyects()
    
    useEffect(() => {
        if(task.name) {
            setName(task.name)
            setDescription(task.description)
            setDate(task.date.split('T')[0])
            setPriority(task.priority)
            setId(task._id)
        } else {
            setName('')
            setDescription('')
            setDate('')
            setPriority('')
            setId(null)
        }
    }, [task])

    const handleSubmit = async e => {
        e.preventDefault()

        if(!name.length || !description.length || !date || !priority) {
            showAlert({
                msg: 'All fields are required',
                error: true
            })
            return
        }
        const proyect = _id
        await submitTaskForm({name, description, priority, date, proyect, id})
        setName('')
        setDescription('')
        setDate('')
        setPriority('')
        setId(null)
    }

    const { msg } = alert

    return (
        <Transition.Root show={taskFormModal} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleTaskFormModal}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleTaskFormModal}
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h2" className="text-2xl leading-6 font-bold text-sky-700 text-center">
                                        { task.name ? 'Edit Task' : 'Create Task' }
                                    </Dialog.Title>
                                    <form className='my-10'
                                        onSubmit={handleSubmit}
                                    >
                                        { msg && <Alert alert={alert} />}
                                        <div className='mb-5 flex flex-col'>
                                            <label htmlFor="name"
                                                className='tex-gray-700 uppercase font-bold text-sm text-left'
                                            >
                                                Task Name
                                            </label>
                                            <input type="text" 
                                                id='name'
                                                placeholder='Task Name'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md
                                                focus:outline-sky-600'
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                            />
                                        </div>

                                        <div className='mb-5 flex flex-col'>
                                            <label htmlFor="description"
                                                className='tex-gray-700 uppercase font-bold text-sm text-left'
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                id='description'
                                                placeholder='Description'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md
                                                focus:outline-sky-600'
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                            />
                                        </div>

                                        <div className='mb-5 flex flex-col'>
                                            <label htmlFor="date"
                                                className='tex-gray-700 uppercase font-bold text-sm text-left'
                                            >
                                                Deadline Date
                                            </label>
                                            <input type="date" 
                                                id='date'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md
                                                focus:outline-sky-600'
                                                value={date}
                                                onChange={e => setDate(e.target.value)}
                                            />
                                        </div>

                                        <div className='mb-5 flex flex-col'>
                                            <label htmlFor="priority"
                                                className='tex-gray-700 uppercase font-bold text-sm text-left'
                                            >
                                                Priority
                                            </label>
                                            <select
                                                id='priority'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md
                                                focus:outline-sky-600 hover:cursor-pointer'
                                                value={priority}
                                                onChange={e => setPriority(e.target.value)}
                                            >
                                                <option value="">-- Select --</option>
                                                { PRIORITY.map( el => (
                                                    <option key={el}>{el}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <input type="submit"
                                            value={ task.name ? 'Edit Task' : 'Create Task' }
                                            className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase 
                                            font-bold hover:cursor-pointer transition-colors rounded text-sm'
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default TaskModalForm
