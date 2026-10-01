import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import BlogCard from "./BlogCard"
import TextareaAutosize from "react-textarea-autosize"

const Profile = () => {

    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])

    const [isEditing, setIsEditing] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [photoUrl, setPhotoUrl] = useState("")
    const [profileBio, setProfileBio] = useState("")

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

    const updateProfile = async () => {

        const res = await axios.patch(
            import.meta.env.VITE_BASE_URL + "/profile/edit",
            {
                firstName,
                photoUrl,
                profileBio
            },
            {
                withCredentials: true
            }
        )


        setUser(res.data.data)

        setIsEditing(false)

    }

    useEffect(() => {
        getProfile()
        getUserBlogs()
    }, [])

    const handleEdit = () => {

        setFirstName(user.firstName)
        setPhotoUrl(user.photoUrl)
        setProfileBio(user.profileBio)
        setIsEditing(true)
    }
    return (
        <div className="mx-auto max-w-7xl flex justify-center">
            <div className="mt-2 flex  flex-col gap-4">
                {
                    isEditing ? (

                        <div className="flex flex-col gap-2">

                            <p className="text-md">First Name</p>

                            <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="outline-none p-2 border border-gray-200"
                                placeholder="Edit First Name"
                            />

                            <input
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                className="outline-none p-2 "
                            />

                            <TextareaAutosize
                                value={profileBio}
                                onChange={(e) => setProfileBio(e.target.value)}
                            />


                            <button onClick={updateProfile}>
                                Save
                            </button>

                        </div>

                    ) : (
                        <>
                            <div className="flex justify-center">
                                <img src={user?.photoUrl} alt="user photo" className="w-20 rounded-full shadow-mauve-500 shadow-md" />
                            </div>

                            <div className="text-center">
                                <p>Name: {user?.firstName}</p>
                                <p>profession</p>
                                <p>Email: {user?.emailId}</p>
                                <p>Bio: {user?.profileBio}</p>
                            </div>

                            <div>
                                <button
                                    onClick={handleEdit}
                                    className="font-medium text-white text-2xl bg-violet-500 p-1 rounded-md hover:bg-violet-600 cursor-pointer"
                                >
                                    Edit Profile
                                </button>

                            </div>

                            <div>
                                <h4 className="font-bold text-2xl my-4">Your Blogs</h4>
                                {blogs.map((blog) =>
                                    <BlogCard blog={blog} key={blog._id} />
                                )}
                            </div>




                        </>
                    )}
            </div>




        </div>
    )
}

export default Profile
