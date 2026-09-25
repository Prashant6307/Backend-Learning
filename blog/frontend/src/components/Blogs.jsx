import axios from "axios"
import { useEffect } from "react"

const Blogs = () => {

    const fetchAllBlogs = async () => {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}` + "/blogs", { withCredentials: true })
        const blogs = res.data.data
        console.log(blogs)
    }

    useEffect(() => {
        fetchAllBlogs()
    }, [])

    return (
        <div>

        </div>
    )
}

export default Blogs
