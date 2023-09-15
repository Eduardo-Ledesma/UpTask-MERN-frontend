import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Sidebar = () => {

    const { auth: { name } } = useAuth();

    return (
        <aside className="md:w-1/3 lg:w-1/5 px-5 py-10 border-b-2 border-gray-300 md:border-none">
            <p className="text-xl font-bold text-gray-600">Welcome {name}!</p>

            <Link to='new'
                className="bg-sky-600 w-full p-3 text-white uppercase font-bold 
                    block mt-5 text-center rounded-md transition-colors hover:bg-sky-700"
            >
            New Project</Link>
        </aside>
    )
}

export default Sidebar