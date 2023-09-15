import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Alert from "./Alert"
import useProyects from "../hooks/useProyects"

const FormNewProyect = ({proyect}) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [client, setClient] = useState('')
    const [id, setId] = useState(null)
    
    const params = useParams()
    const { alert, showAlert, submitForm } = useProyects()

    useEffect(() => {
        if(params.id) {
            setId(params.id)
            setName(proyect?.name)
            setDescription(proyect?.description)
            setDate(proyect.date?.split('T')[0])
            setClient(proyect?.client)
        }
    }, [params, proyect])
    

    const handleSubmit = async e => {
        e.preventDefault()
        if(!name.trim() || !description.trim() || !date || !client.trim()) {
            showAlert({
                msg: 'All fields are required',
                error: true
            })
            return
        }
        if(name.length < 4) {
            showAlert({
                msg: 'Project name must have minimum 4 characters',
                error: true
            })
            return
        }
        if(description.length < 20) {
            showAlert({
                msg: 'Project description must have minimum 20 characters',
                error: true
            })
            return
        }
        await submitForm({name, description, date, client, id})
        setName('')
        setDescription('')
        setDate('')
        setClient('')
        setId(null)
    }

    const { msg } = alert

    return (
        <form className="bg-white flex flex-col py-10 px-5 md:w-2/3 lg:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit}
        >
            { msg && <Alert alert={alert} />}
            <div>
                <label htmlFor="name"
                    className="text-gray-700 uppercase font-bold text-sm"
                >Project Name:</label>
                <input type="text" id="name"
                    className="border-2 w-full p-2 mt-2 rounded-md focus:outline-sky-600 mb-4"
                    placeholder="Project Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="description"
                    className="text-gray-700 uppercase font-bold text-sm"
                >Description:</label>
                <textarea id="description"
                    className="border-2 w-full p-2 mt-2 rounded-md focus:outline-sky-600 mb-4"
                    placeholder="Must contain at least 20 characters"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="date"
                    className="text-gray-700 uppercase font-bold text-sm"
                >Deadline Date:</label>
                <input type="date" id="date"
                    className="border-2 w-full p-2 mt-2 rounded-md focus:outline-sky-600 mb-4"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="client"
                    className="text-gray-700 uppercase font-bold text-sm"
                >Client Name:</label>
                <input type="text" id="client"
                    className="border-2 w-full p-2 mt-2 rounded-md focus:outline-sky-600"
                    placeholder="Client Name"
                    value={client}
                    onChange={e => setClient(e.target.value)}
                />
            </div>

            <input type="submit"
                value={ id ? 'Edit Project' : 'Create Project'}
                className="bg-violet-600 w-full xl:w-1/2 mx-auto py-3 text-white uppercase font-bold rounded-md 
                    text-xl hover:cursor-pointer hover:bg-violet-700 transition-colors mt-10"
            />
        </form>
    )
}

export default FormNewProyect