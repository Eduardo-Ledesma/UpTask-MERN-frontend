import { useContext } from "react"
import ProyectsContext from "../context/ProyectsProvider"

const useProyects = () => {
    return useContext(ProyectsContext)
}

export default useProyects