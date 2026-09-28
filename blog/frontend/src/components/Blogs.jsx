import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addBlog } from "../utils/blogSlice"
import { useNavigate } from "react-router-dom"
import BlogCard from "./BlogCard"

const Blogs = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        <div className=" w-full max-w-xl mx-auto   p-4">
            {
                blogs.map((blog) =>

                    <div key={blog?._id} onClick={() => navigate(`/blog/${blog._id}`)} className="cursor-pointer flex flex-col border border-gray-200 rounded-md mb-4 p-2">

                        <BlogCard blog={blog}/>

                    </div>

                )
            }
        </div>
    )
}

export default Blogs
