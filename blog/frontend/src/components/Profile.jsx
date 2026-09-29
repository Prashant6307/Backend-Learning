import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import BlogCard from "./BlogCard"

const Profile = () => {

    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])

    const getProfile = async () => {
        const res = await axios.get(import.meta.env.VITE_BASE_URL + "/profile", { withCredentials: true })

        console.log(res.data.data)
        setUser(res.data.data)
    }

    const getUserBlogs = async () => {
        const res = await axios.get(import.meta.env.VITE_BASE_URL + "/profile/blogs", { withCredentials: true })
        console.log(res.data.data);
        setBlogs(res.data.data)

    }

    useEffect(() => {
        getProfile()
        getUserBlogs()
    }, [])
    return (
        <div className="mx-auto max-w-7xl flex justify-center">
            <div className="mt-2 flex  flex-col gap-4">
                <div className="flex justify-center">
                    <img src={user?.photoUrl} alt="user photo" className="w-20 rounded-full shadow-mauve-500 shadow-md" />
                </div>

                <div className="text-center">
                    <p>Name: {user?.firstName}</p>
                    <p>profession</p>
                    <p>Email: {user?.emailId}</p>
                    <p>Bio: {user?.bio}</p>
                </div>

                <div>
                    <h4 className="font-bold text-2xl my-4">Your Blogs</h4>
                    {blogs.map((blog)=>
                        <BlogCard blog={blog} key={blog._id}/>
                    )}
                </div>

            </div>




        </div>
    )
}

export default Profile
