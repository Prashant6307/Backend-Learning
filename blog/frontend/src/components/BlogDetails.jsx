import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Comment from "./Comment"
import { useSelector } from "react-redux"
import TextareaAutosize from "react-textarea-autosize"
import { useNavigate } from "react-router-dom"

const BlogDetails = () => {

    const loggedInUser = useSelector(store => store.user)


    const { id } = useParams()
    const [blog, setBlog] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [likesCount, setLikesCount] = useState(0)

    const navigate = useNavigate()


    const getBlogDetails = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_BASE_URL + "/blog/" + id)

            setBlog(res.data.data)
            setLikesCount(res.data.data.likes.length)
        }
        catch (err) {
            console.log(err.message);

        }
    }



    const handleBlogEdit = () => {
        setTitle(blog.title)
        setContent(blog.content)
        setIsEditing(true)
    }

    const deleteBlog = async () => {

        try {

            const res = await axios.delete(
                import.meta.env.VITE_BASE_URL + "/blog/" + id,
                {
                    withCredentials: true
                }
            )

            navigate("/blogs")

            console.log(res.data.message)


        } catch (err) {

            console.log(err.message)

        }

    }

    const updateBlog = async () => {

        try {

            const res = await axios.patch(
                import.meta.env.VITE_BASE_URL + "/blog/" + id,
                {
                    title,
                    content
                },
                {
                    withCredentials: true
                }
            )
            setBlog({
                ...blog,
                title: res.data.data.title,
                content: res.data.data.content
            })


            setBlog(res.data.data)

            setIsEditing(false)


        } catch (err) {

            console.log(err.message)

        }

    }

    const getLikes = async () => {
        try {
            const res = await axios.patch(import.meta.env.VITE_BASE_URL + "/blog/" + id + "/like", {}, { withCredentials: true })
            console.log(res.data.data)
            setLikesCount(res.data.data?.likes.length)

        } catch (err) {
            console.log(err.message);

        }

    }

    useEffect(() => {
        getBlogDetails()
    }, [id])

    return (
        <div className="max-w-7xl mx-auto">
            <div className="w-7xl border border-gray-300 mt-4 rounded-md mx-auto p-4 mb-4">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <img src={blog?.author?.photoUrl} alt="" className="w-12 rounded-full" />
                        <div className="text-sm">
                            <p className="font-bold">{blog?.author?.firstName}</p>
                            <p className="text-gray-500">
                                {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric"
                                })}
                            </p>
                        </div>
                    </div>

                    <div>
                        {
                            loggedInUser?._id?.toString() === (blog?.author?._id || blog?.author)?.toString()
                            &&
                            (
                                <div className="flex gap-2">

                                    <button className="rounded-md bg-indigo-400 p-1 px-4 font-medium text-white hover:bg-indigo-600 cursor-pointer"
                                        onClick={() => handleBlogEdit()}
                                    >
                                        Edit
                                    </button>

                                    <button className="rounded-md bg-red-400 p-1 px-4 font-medium 
                                    text-white hover:bg-red-600 cursor-pointer"
                                        onClick={() => deleteBlog()}
                                    >
                                        Delete
                                    </button>

                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="ml-14">

                    {
                        isEditing ? (
                            <div>

                                <TextareaAutosize className="outline-none w-full placeholder:text-5xl font-bold text-5xl"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />


                                <TextareaAutosize
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full border p-4 rounded-lg outline-none"
                                />


                                <div className="flex gap-2 mt-2">

                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                                        onClick={updateBlog}
                                    >
                                        Save
                                    </button>


                                    <button
                                        className="bg-gray-400 text-white px-4 py-2 rounded-md"
                                        onClick={() => {
                                            setIsEditing(false)
                                        }}
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </div>

                        ) : (

                            <div className="w-full">
                                <div className="text-xl">
                                    <p onClick={getLikes}>❤️{likesCount}</p>
                                </div>

                                <h2 className="text-5xl font-bold my-4 ">
                                    {blog?.title}
                                </h2>

                                <p className="text-xl">
                                    {blog?.content}
                                </p>
                            </div>

                        )
                    }


                </div>



                <Comment></Comment>



            </div>
        </div>
    )
}

export default BlogDetails
