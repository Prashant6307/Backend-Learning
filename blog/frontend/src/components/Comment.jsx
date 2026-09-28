import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import TextareaAutosize from "react-textarea-autosize"

const Comment = () => {

    const loggedInUser = useSelector(store => store.user)

    const { id } = useParams()

    const [comments, setComments] = useState([])
    const [commentText, setCommentText] = useState("")
    const [editedComment, setEditedComment] = useState("")
    const [editingCommentId, setEditingCommentId] = useState(null)

    const getAllComments = async () => {
            const allComments = await axios.get(import.meta.env.VITE_BASE_URL + "/comments/" + id, { withCredentials: true })
    
            
            setComments(allComments.data.data)
    
        }

    useEffect(()=>{
        getAllComments()
    },[])

    const handleSubmit = async () => {
        try {
            const res = await axios.post(import.meta.env.VITE_BASE_URL + "/comment",
                { text: commentText, blogId: id }, { withCredentials: true })

            console.log(res.data.data)

            setComments([
                ...comments,
                res.data.data
            ])
            setCommentText("")
        } catch (err) {
            console.log(err.message)
        }

    }

    const editComment = async (commentId) => {
        try {
            const res = await axios.patch(import.meta.env.VITE_BASE_URL + "/comment/" + commentId, { text: editedComment }, { withCredentials: true })

            console.log(res.data.data)

            setComments(
                comments.map((comment) => (
                    comment._id === commentId
                        ? res.data.data
                        : comment
                ))
            )
            setEditingCommentId(null)
            setEditedComment("")

        } catch (err) {
            console.log(err.message);

        }
    }

    const deleteComment = async (commentId) => {
        try {
            const res = await axios.delete(import.meta.env.VITE_BASE_URL + "/comment/" + commentId, { withCredentials: true })
            console.log(res.data.data);


            setComments(
                comments.filter((comment) => comment._id !== commentId)
            )
        } catch (err) {
            console.log(err.message);

        }
    }

    return (
        <div>
            <div className="">
                <p className="font-bold text-xl mt-4 py-4">Top Comments</p>

                <TextareaAutosize type="text" onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                    className="outline-none w-full rounded-md border border-gray-400 p-1"
                    placeholder="Add to discussion"
                />

                <div className="flex gap-2">

                    <button onClick={handleSubmit} className="bg-indigo-400 px-4 py-2 rounded-md font-bold text-white hover:bg-indigo-600 cursor-pointer">Submit</button>
                    <button type="submit" className="bg-gray-200 px-4 py-2 rounded-md font-bold text-gray-400 hover:bg-gray-600 cursor-pointer">Preview</button>
                </div>
            </div>

            <div className="mt-5 ">

                {
                    comments.map((comment) => (
                        <div
                            key={comment._id}
                            className="border-b py-3 w-6xl"
                        >
                            <div className="flex justify-between">

                                <div className="flex items-center">
                                    <div className="flex gap-2 items-center">

                                        <img
                                            src={comment.author?.photoUrl}
                                            className="w-8 h-8 rounded-full"
                                        />

                                        <p className="font-bold">
                                            {comment.author?.firstName}
                                        </p>

                                    </div>
                                    <p className="ml-10 text-sm text-gray-500">
                                        {
                                            new Date(comment.createdAt)
                                                .toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric"
                                                })
                                        }
                                    </p>

                                </div>


                                {
                                    (loggedInUser?._id?.toString() === comment?.author?._id?.toString()) && <div className="flex items-center justify-center gap-2">
                                        {
                                            editingCommentId === comment._id ? (

                                                <>


                                                    <button
                                                        className="bg-green-400 font-medium text-white p-1 px-4 hover:bg-green-600 rounded-md"
                                                        onClick={() => editComment(comment._id)}>
                                                        Save
                                                    </button>
                                                </>

                                            ) : (

                                                <>
                                                    <button
                                                        className="rounded-md bg-indigo-400 p-1 px-4 font-medium text-white hover:bg-indigo-600 cursor-pointer"
                                                        onClick={() => {
                                                            setEditingCommentId(comment._id)
                                                            setEditedComment(comment.text)
                                                        }}>
                                                        Edit
                                                    </button>
                                                </>

                                            )
                                        }
                                        <button
                                            className="rounded-md bg-red-400 p-1 px-4 font-medium text-white hover:bg-red-600 cursor-pointer"
                                            onClick={() => deleteComment(comment._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>}
                            </div>

                            <div className="ml-10">

                                {
                                    editingCommentId === comment._id ? (
                                        <TextareaAutosize
                                            value={editedComment}
                                            onChange={(e) => setEditedComment(e.target.value)}
                                            className="w-full border rounded-md p-2 mt-2 outline-none border-gray-400"
                                        />
                                    ) : (
                                        <p>
                                            {comment.text}
                                        </p>
                                    )
                                }

                            </div>

                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Comment
