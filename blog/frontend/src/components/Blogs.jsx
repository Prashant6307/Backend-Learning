import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addBlog } from "../utils/blogSlice"

const Blogs = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(store => store.blogs)

    const fetchAllBlogs = async () => {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}` + "/blogs", { withCredentials: true })
        const blogsData = res.data.data
        dispatch(addBlog(blogsData))
        console.log(blogsData)
    }

    useEffect(() => {
        fetchAllBlogs()
    }, [])

    return (
        <div className=" w-full max-w-xl mx-auto border border-black flex  p-4">
            {
                blogs.map((blog) =>

                    <div key={blog?._id}>

                        <div className="flex gap-2">
                            <img src={blog?.author?.photoUrl} alt="" className="w-12 rounded-full" />
                            <div className="text-sm">
                                <p className="font-bold">{blog?.author?.firstName}</p>
                                <p className="text-gray-500">
                                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric"
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="">
                            <h2 className="ml-14 text-2xl font-bold">{blog?.title}</h2>
                        </div>

                    </div>

                )




            }
        </div>
    )
}

export default Blogs
