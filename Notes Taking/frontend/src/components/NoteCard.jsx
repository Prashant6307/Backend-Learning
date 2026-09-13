import axios from "axios"
import { useState } from "react"
import Notify from "./Notify"

const NoteCard = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [notify, setNotify] = useState(null)

    const handleTimeout = ()=>{
        setTimeout(() => {
            setNotify(null);
        }, 5000);
    }

    const handleDiscard = () => {
        setDescription("")
        setTitle("")
    }

    const handleSave = async () => {
        try {
            await axios.post(
                import.meta.env.VITE_BASE_URL + "/notes",
                { title, description },
                { withCredentials: true }
            );

            setDescription("");
            setTitle("");

            setNotify({
                message: "Task Created Successfully",
                type: "success"
            });
            handleTimeout()

        } catch (err) {
            console.log(err.message);

            setNotify({
                message: err.response?.data?.message || err.message,
                type: "error"
            });
            handleTimeout()
        }
    };



    return (
        <div className="flex justify-center items-center ">
            {notify && (
                <Notify
                    message={notify.message}
                    type={notify.type}
                />
            )}
            <div className="flex flex-col m-8 border p-2 rounded-lg w-60 sm:w-md md:w-xl">
                <label className="font-bold">Title</label>
                <input
                    type="text"
                    placeholder="Title"
                    className="border p-2 rounded-lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
