import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const ProyectsResults = ({proyect}) => {
    
    const { auth } = useAuth()
    const { name, creator, client, _id } = proyect

    return (
        <div className="border-b p-5 flex flex-col sm:flex-row gap-y-6 items-center">

            <div className="flex-1 flex items-center gap-2">
            <p className="font-bold text-blue-800">{name}<span className="text-sm text-gray-500 uppercase ml-1">{''} {client}</span></p>
            {creator === auth._id && <p className="bg-green-600 text-white rounded-lg px-2 py-0.5 text-sm font-bold">Creator</p>}
            </div>
            
            <Link to={`${_id}`}
                className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
            >Show Project</Link>
    </div>
    )
}

export default ProyectsResults