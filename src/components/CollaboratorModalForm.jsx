import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useParams } from 'react-router-dom'
import useProyects from '../hooks/useProyects'
import Alert from './Alert'

const CollaboratorModalForm = () => {

    const [email, setEmail] = useState('')
    const { alert, showAlert, findCollaborator, handleCollaboratorFormModal, 
        collaboratorFormModal, collaborator, addCollaborator } = useProyects()
    
    const params = useParams()

    const handleSubmit = async e => {
        e.preventDefault()

        if(!email) {
            showAlert({
                msg: 'Email is required',
                error: true
            })
            return
        }
        if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
            showAlert({
                msg: 'Invalid Email',
                error: true
            })
            return
        }
        await findCollaborator(email)
        setEmail('')
    }

    const { msg } = alert

    return (
        <Transition.Root show={collaboratorFormModal} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleCollaboratorFormModal}>
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
                                    onClick={handleCollaboratorFormModal}
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
                                        Add Collaborator
                                    </Dialog.Title>

                                    <form className="my-10"
                                        noValidate
                                        onSubmit={handleSubmit}
                                    >
                                        { msg && <Alert alert={alert} />} 

                                        <div className='flex flex-col'>
                                            <label htmlFor="email"
                                                className="text-gray-700 uppercase font-bold text-md"
                                            >Collaborator&apos;s Email:</label>
                                            <input type="email" id="email"
                                                className="border-2 w-full p-2 mt-2 rounded-md focus:outline-sky-600 mb-4"
                                                placeholder="Collaborator's Email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </div>
                                        
                                        <div className="flex">
                                            <input type="submit"
                                                value='Search'
                                                className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase 
                                                font-bold hover:cursor-pointer transition-colors rounded-md mt-4 text-sm'
                                            />
                                        </div>
                                    </form>

                                    { collaborator?._id && (
                                        <div className="flex justify-center mt-10">
                                            <div className="w-full">
                                                <h2 className="text-center mb-10 text-2xl font-bold text-gray-600">Result:</h2>

                                                <div className="flex justify-between items-center gap-2">
                                                    <p className="font-bold text-2xl text-gray-600">User:<span className="text-blue-700"> {collaborator?.name}</span></p>

                                                    <button type="button"
                                                        className="bg-blue-500 px-5 py-2 rounded-lg uppercase text-white text-sm font-bold
                                                        transition-colors hover:bg-blue-600 flex items-center gap-2"
                                                        onClick={() => addCollaborator({
                                                            email: collaborator.email,
                                                            id: params.id
                                                        }
                                                        )}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default CollaboratorModalForm
