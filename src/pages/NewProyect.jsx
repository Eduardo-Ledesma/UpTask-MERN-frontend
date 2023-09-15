import FormNewProyect from "../components/FormNewProyect"

const NewProyect = () => {
    return (
        <>
            <h1 className="text-4xl font-black text-violet-600">Create Project</h1>

            <div className="mt-10 flex justify-center">
                <FormNewProyect />
            </div>
        </>
    )
}

export default NewProyect