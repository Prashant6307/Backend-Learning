import { useNavigate } from "react-router-dom"

const BlogCard = ({blog}) => {
    console.log(blog.author)
    const navigate = useNavigate()
    return (
        <div onClick={()=>navigate(`/blog/${blog._id}`)} className="border border-gray-200 rounded-md mb-4 p-2 ">
            <div className="flex gap-2 ">
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

            <div className="flex gap-2 mt-2 p-2">
                {blog?.tags.map((tag, index) =>
                    <div key={index} >
                        <p className="px-3 py-1 rounded-full border">#{tag}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BlogCard
