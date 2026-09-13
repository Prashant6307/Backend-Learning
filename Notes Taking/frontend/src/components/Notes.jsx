import axios from "axios";
import Navbar from "./Navbar"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotes } from "../utils/allNotesSlice";

const Notes = () => {

    const dispatch = useDispatch()

    const showAllNotes = useSelector(store => store.allUserNotes)

    const fetchAllNotes = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_BASE_URL + "/notes", { withCredentials: true })
            console.log("Notes:", res.data.data);
            dispatch(addNotes(res.data.data))

        } catch (err) {
            console.log(err.message);

        }
    }
    useEffect(() => {
        fetchAllNotes()
    }, [])

    return (
        <div>
            <Navbar />
            <div className="flex flex-wrap justify-center">
                {showAllNotes.map((allNotes) => <div key={allNotes._id} className="flex justify-center items-center ">

                    <div className="flex flex-col m-8 border p-2 rounded-lg w-60 sm:w-md md:w-xl">
                        <label className="font-bold">Title</label>
                        <input
                            type="text"
                            placeholder="Title"
                            className="border p-2 rounded-lg"
                            value={allNotes.title}
                            readOnly
                        />
                        <textarea
                            className="border rounded-sm w-full max-h-120 h-40 p-2 mt-4"
                            placeholder="Description"
                            value={allNotes.description}
                            readOnly
                        >

                        </textarea>


                        <div className="flex justify-center gap-4 mt-4">

                            <button className="btn btn-error" >Delete</button>
                        <button className="btn btn-success" >Mark as Done</button>
                        </div>
                    </div>

                </div>)}
            </div>



        </div>
    )
}

export default Notes
