import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import FormNewProyect from "../components/FormNewProyect"
import useProyects from "../hooks/useProyects"


const EditProyect = () => {

    const params = useParams()
    const { proyect, getProyect, loading } = useProyects()
    const { name } = proyect

    useEffect(() => {
        if(params.id) {
            getProyect(params.id)
        }
    }, [params])

    return (
        loading ? <Spinner /> : (
            <>
                <h1 className="font-black text-4xl">{name}</h1>

                <div className="mt-10 flex justify-center">
                    <FormNewProyect proyect={proyect} />
                </div>
            </>
        )
    )
}

export default EditProyect