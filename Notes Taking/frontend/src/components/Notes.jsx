import axios from "axios";
import Navbar from "./Navbar"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotes, removeNote, updateNote, updateNoteStatus } from "../utils/allNotesSlice";


const Notes = () => {

    const searchNotesResults = useSelector(store => store.search)

    const dispatch = useDispatch()
    const [editId, setEditId] = useState(null)

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

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/notes/${id}`,
                {
                    withCredentials: true
                }
            )
            dispatch(removeNote(id))

            console.log(res.data);
        } catch (err) {
            console.log(err.response?.data);
        }
    }

    const changeStatus = async (id, status) => {

        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/notes/status/${id}`,
                {

                    status
                },
                {
                    withCredentials: true
                }
            )

            dispatch(updateNoteStatus({ id, status }))



            console.log(res.data);
        } catch (err) {
            console.log(err.response?.data);
        }
    }

    const handleEdit = async (id) => {
        setEditId(id)
    }

    const handleSave = async (id, status) => {
        if (status === "completed") {
            return
        }
        const note = showAllNotes.find(note => note._id === id);

        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/notes/${id}`,
                {
                    title: note.title,
                    description: note.description
                },
                {
                    withCredentials: true
                }
            );

            dispatch(updateNoteStatus({ id, status }))

            console.log(res.data);

            setEditId(null);
        } catch (err) {
            console.log(err.response?.data);
        }
    }
    useEffect(() => {
        fetchAllNotes()
    }, [])

    return (
        <div>
            <Navbar />
            <div className="flex flex-wrap justify-center">
                {showAllNotes.filter((note) =>
                    note.title.toLowerCase().includes(searchNotesResults.toLowerCase()) ||
                    note.description.toLowerCase().includes(searchNotesResults.toLowerCase())
                ).map((allNotes) =>
                    <div key={allNotes._id}
                        className="flex justify-center items-center ">

                        <div className="flex flex-col m-8 border p-2 rounded-lg w-60 sm:w-md md:w-xl">
                            <div className="flex justify-between my-2">
                                <label
                                    className="font-bold"
                                >
                                    Title
                                </label>
                                <p>
                                    Status:
                                    <span
                                        className={allNotes.status === "completed" ? "bg-green-200 rounded-md p-1" : "bg-yellow-200 rounded-md p-1"}
                                    >
                                        {allNotes.status}</span>
                                </p>
                            </div>
                            <input
                                type="text"
                                placeholder="Title"
                                className="border p-2 rounded-lg"
                                value={allNotes.title || ""}
                                readOnly={editId !== allNotes._id}
                                onChange={(e) => dispatch(
                                    updateNote({
                                        id: allNotes._id,
                                        title: e.target.value,
                                        description: allNotes.description
                                    })
                                )}
                            />
                            <textarea
                                className="border rounded-sm w-full max-h-120 h-40 p-2 mt-4"
                                placeholder="Description"
                                value={allNotes.description || ""}
                                readOnly={editId !== allNotes._id}
                                onChange={(e) => dispatch(
                                    updateNote({
                                        id: allNotes._id,
                                        title: allNotes.title,
                                        description: e.target.value
                                    })
                                )}
                            >

                            </textarea>


                            <div className="flex justify-center gap-1 sm:gap-4 mt-4">

                                <button
                                    className="btn btn-error btn-xs sm:btn-sm md:btn-md"
                                    onClick={() => handleDelete(allNotes._id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn btn-success btn-xs sm:btn-sm md:btn-md"
                                    onClick={() => changeStatus(allNotes._id, "completed")}
                                >
                                    Mark as Done
                                </button>
                                <button
                                    className="btn btn-info btn-xs sm:btn-sm md:btn-md"
                                    onClick={() => handleEdit(allNotes._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-success btn-xs sm:btn-sm md:btn-md"
                                    onClick={() => handleSave(allNotes._id, "pending")}

                                >
                                    Save
                                </button>
                            </div>
                        </div>

                    </div>)}
            </div>



        </div>
    )
}

export default Notes
