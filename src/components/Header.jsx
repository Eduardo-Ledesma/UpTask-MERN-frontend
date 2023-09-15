import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useProyects from "../hooks/useProyects"
import Swal from "sweetalert2"

const Header = ({showInput}) => {

    const { authLogOut } = useAuth()
    const { proyectSearch, setProyectSearch, proyectsLogOut, proyect, tasksSearch, setTasksSearch } = useProyects()

    const navigate = useNavigate()

        const handleLogOut = () => {
            Swal.fire({
                title: 'Are you sure you want to log out?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, log out.'
            }).then((result) => {
                if (result.isConfirmed) {
                    authLogOut()
                    proyectsLogOut()
                    localStorage.removeItem('token')
                    navigate('/')
                }
            })
        }

    return (
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between">
                <h2 className="text-6xl mb-10 md:mb-0 text-sky-600 font-black text-center">
                    <Link to='/proyects'>UpTask</Link></h2>

                <div className="flex justify-center mb-6 md:mb-0">
                    <div className="flex items-center gap-1 justify-center bg-gray-200 px-6 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input type="search"
                            placeholder={proyect.name ? 'Find Task' : 'Find projects'}
                            className="rounded-lg lg:w-96 block p-2 border-2 my-4 md:m-0 text-center md:text-left 
                            focus:border-sky-600 focus:outline-none"
                            value={proyect.name ? tasksSearch : proyectSearch}
                            onChange={e => {proyect.name ? setTasksSearch(e.target.value) : setProyectSearch(e.target.value)}}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4">
                    <Link to='/proyects' 
                        className="font-bold uppercase my-2 md:m-0 bg-sky-500 min-w-min w-1/3 md:w-auto p-3 text-center rounded text-white text-sm
                        hover:bg-sky-600 transition-colors"
                    >Projects</Link>

                    <button
                        type="button"
                        className="text-white text-sm bg-red-600 p-3 min-w-min w-1/3 md:w-auto rounded-md uppercase 
                        font-bold transition-colors hover:bg-red-700"
                        onClick={handleLogOut}
                    >Log out</button>
                </div>
            </div>
        </header>
    )
}

export default Header