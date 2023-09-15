import { useEffect } from "react"
import PreviewProyects from "../components/PreviewProyects"
import Spinner from "../components/Spinner"
import useProyects from "../hooks/useProyects"
import Alert from "../components/Alert"
import ProyectsResults from "../components/ProyectsResults"

const Proyects = () => {
    
    const { proyects, proyectsCollaborator, loading, alert, proyectsResult, proyectSearch, setProyect } = useProyects()

    useEffect(() => {
        setProyect({})
    }, [])
    

    return (
        <>
            { proyectSearch.length > 0 ? !proyectsResult.length ? (
                <p className="font-bold text-xl text-center text-gray-600 mt-12">No Coincidences.</p>
            ) : (
                <>
                    <h1 className="text-4xl font-black text-violet-600">Results</h1>
                    <div className="bg-white shadow mt-10 rounded-lg">
                        { proyectsResult.map( prjct => (
                        <ProyectsResults 
                            key={prjct._id}
                            proyect={prjct}
                        />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-4xl font-black text-violet-600">Your Projects</h1>
                    { loading && <Spinner />}
                    { alert.error && <Alert alert={alert} />}
                    { proyects.length ? (
                        <div className="bg-white shadow mt-10 rounded-lg">
                            { proyects.map( proyect => (
                                <PreviewProyects 
                                    key={proyect._id}
                                    proyect={proyect}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="mt-16 text-center text-gray-600 uppercase">You have no projects yet.</p>
                    )}

                    <h2 className="text-3xl mt-16 font-black text-violet-600">As Collaborator</h2>
                    { proyectsCollaborator.length ? (
                        <div className="bg-white shadow mt-10 rounded-lg">
                            { proyectsCollaborator.map( proyectCol => (
                                <PreviewProyects 
                                    key={proyectCol._id}
                                    proyect={proyectCol}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="mt-16 text-center text-gray-600 uppercase">You are not collaborating in any project yet.</p>
                    )}
                </>
            )}
        </>
        
    )
}

export default Proyects