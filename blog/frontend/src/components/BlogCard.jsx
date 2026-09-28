
const BlogCard = ({blog}) => {
    console.log(blog.author)
    return (
        <div>
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
