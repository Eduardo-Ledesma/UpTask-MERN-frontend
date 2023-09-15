import useProyects from "../hooks/useProyects"
import useAuth from "../hooks/useAuth"
import Swal from "sweetalert2"

const Collaborator = ({col}) => {
    
    const { _id, name, email } = col
    const { auth } = useAuth()
    const { deleteCol, proyect } = useProyects()

    const handleClick = async id => {
        await Swal.fire({
            title: 'Are you sure?',
            text: "The user will be removed from the list of collaborators",
            icon: 'warning',
            iconColor: '#d33',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then( async (result) => {
            if (result.isConfirmed) {
                await deleteCol(id)
                Swal.fire({
                    title: 'Collaborator removed from the project!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2500
                })
            }
        })
    }

    return (
        <div className="border-b p-5 flex justify-between items-center"> 
            <div>
                <p className="text-xl font-bold text-blue-700">{name}</p>
                <p className="text-gray-600 font-bold">{email}</p>
            </div>

            { proyect.creator === auth._id && (
                <div>
                    <button type="button" 
                        className="px-4 py-3 text-red-600 uppercase font-bold text-sm rounded-lg transition-colors 
                        hover:text-red-800 my-auto"
                        onClick={() => handleClick(_id)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    )
}

export default Collaborator