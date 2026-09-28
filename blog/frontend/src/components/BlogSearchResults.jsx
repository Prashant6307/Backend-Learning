import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import BlogCard from "./BlogCard"


const BlogSearchResults = () => {

    const [searchParams] = useSearchParams()

    const search = searchParams.get("query")

    const [blogs, setBlogs] = useState([])


    const getSearchResults = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/blogs`,
                {
                    params: {
                        search: search
                    }
                }
            )

            setBlogs(res.data.data)

        } catch (err) {
            console.log(err.message)
        }
    }


    useEffect(() => {

        if (search) {
            getSearchResults()
        } else {
            setBlogs([])
        }

    }, [search])


    return (
        <div>

            <h1>
                Search results for "{search}"
            </h1>


            {
                blogs.map(blog => (
                    <BlogCard
                        key={blog._id}
                        blog={blog}
                    />
                ))
            }

        </div>
    )
}


export default BlogSearchResults