import axios from "axios"
import { useState } from "react"

const NoteCard = () => {

    const [title, setTile] = useState("")
    const [description, setDescription] = useState("")

    const handleDiscard = () => {
        setDescription("")
        setTile("")
    }

    const handleSave = async () => {
        try {
            const res = await axios.post(import.meta.env.VITE_BASE_URL + "/notes", { title, description }, { withCredentials: true })
            setDescription("")
            setTile("")
        }
        catch (err) {
            console.log(err.message);

        }


    }
    return (
        <div className="flex justify-center items-center ">

            <div className="flex flex-col m-8 border p-2 rounded-lg w-60 sm:w-md md:w-xl">
                <label className="font-bold">Title</label>
                <input
                    type="text"
                    placeholder="Title"
                    className="border p-2 rounded-lg"
                    value={title}
                    onChange={(e) => setTile(e.target.value)}
                />
                <textarea
                    className="border rounded-sm w-full max-h-120 h-40 p-2 mt-4"
                    placeholder="Description"
                    value={description}
                    maxLength={1000}
                    onChange={(e) => setDescription(e.target.value)}
                >

                </textarea>
                <p className="text-sm text-gray-500">
                    {description.length}/1000 characters
                </p>

                <div className="flex justify-center gap-4 mt-4">

                    <button className="btn btn-secondary" onClick={handleDiscard}>Discard</button>
                    <button className="btn btn-success" onClick={handleSave}>Save</button>
                </div>
            </div>

        </div>
    )
}

export default NoteCard
