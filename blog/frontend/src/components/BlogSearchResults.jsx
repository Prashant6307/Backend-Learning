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
        
        <div className=" w-full max-w-xl mx-auto   p-4">
            <h1 className="my-4 font-bold text-2xl">
                Search results for "{search}"
            </h1>
            <div className="cursor-pointer flex flex-col  ">

                {
                    blogs.map(blog => (
                        <BlogCard
                            key={blog._id}
                            blog={blog}
                        />
                    ))
                }
            </div>

        </div>
    )
}


export default BlogSearchResults