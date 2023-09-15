import { Link } from "react-router-dom"

const PreviewProyects = ({proyect}) => {

  const { name, _id, client } = proyect

  return (
    <div className="border-b p-5 flex flex-col gap-y-4 sm:flex-row items-center">
      <p className="flex-1 font-bold text-blue-800">{name}<span className="text-sm text-gray-500 uppercase ml-1">{''} {client}</span></p>

      <Link to={`${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
      >Show Project</Link>
    </div>
  )
}

export default PreviewProyects