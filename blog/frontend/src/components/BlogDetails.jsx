import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const BlogDetails = () => {

    const { id } = useParams()
    const [blog, setBlog] = useState(null)


    const getBlogDetails = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_BASE_URL + "/blog/" + id)
            console.log(res.data.data);
            setBlog(res.data.data)
        }
        catch (err) {
            console.log(err.message);

        }
    }


    useEffect(() => {
        getBlogDetails()
    }, [id])
    return (
        <div className="max-w-7xl mx-auto">
            <div className="max-w-lg border border-black mx-auto p-4">
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

                <div className="ml-14" >

                    <h2 className="text-2xl font-bold">{blog?.title}</h2>

                    <p>{blog?.content}</p>
                </div >

                <div className="">
                    <p className="font-bold text-xl mt-4 py-4">Top Comments</p>

                    <textarea type="text" name="" id="" className="outline-none w-full rounded-md border border-gray-400 p-1" placeholder="Add to discussion"/>

                    <div className="flex gap-2">
                        
                    <button type="submit" className="bg-indigo-400 px-4 py-2 rounded-md font-bold text-white">Submit</button>
                    <button type="submit" className="bg-gray-200 px-4 py-2 rounded-md font-bold text-gray-400">Preview</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BlogDetails
