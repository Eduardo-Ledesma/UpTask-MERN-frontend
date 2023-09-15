import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import CollaboratorForm from "../components/CollaboratorForm"
import useProyects from "../hooks/useProyects"
import Alert from "../components/Alert"

const NewCollaborator = () => {

    const navigate = useNavigate()
    const params = useParams()
    const { getProyect, proyect, collaborator, addCollaborator, setCollaborator, alert } = useProyects()

    useEffect(() => {
        if(params.id) {
            getProyect(params.id)
            setCollaborator({})
        }
    }, [])
    
    if(!proyect?._id) return <Alert alert={alert} />

    return (
        <>


            { collaborator?._id && (
                <div className="flex justify-center mt-10">
                    <div className="bg-white py-10 px-5 rounded-lg w-full sm:w-2/3 md:w-full lg:w-2/3 xl:w-1/2 shadow">
                        <h2 className="text-center mb-10 text-3xl font-bold text-gray-600">Result:</h2>

                        <div className="flex justify-between items-center">
                            <p className="font-bold text-2xl text-gray-600">User:<span className="text-blue-700"> {collaborator.name}</span></p>

                            <button type="button"
                                className="bg-blue-500 px-5 py-2 rounded-lg uppercase text-white text-sm font-bold
                                transition-colors hover:bg-blue-600 flex items-center gap-2"
                                onClick={() => addCollaborator({
                                    email: collaborator.email
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
        </>
    )
}

export default NewCollaborator