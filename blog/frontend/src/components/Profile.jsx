import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import BlogCard from "./BlogCard"
import TextareaAutosize from "react-textarea-autosize"
import { useDispatch } from "react-redux"
import { addLoggedInUserInfo } from "../utils/userSlice"

const Profile = () => {

    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])

    const [isEditing, setIsEditing] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [photoUrl, setPhotoUrl] = useState("")
    const [profileBio, setProfileBio] = useState("")

    const dispatch = useDispatch()

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
        try {
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
            dispatch(addLoggedInUserInfo(res.data.data));
            setIsEditing(false);


            setUser(res.data.data)

            setIsEditing(false)

        }
        catch (err) {
            console.error(err.response?.data?.message || err.message)
        }


    }

    useEffect(() => {
        getProfile()
        getUserBlogs()
    }, [])

    const handleEdit = () => {

        setFirstName(user?.firstName || "")
        setPhotoUrl(user?.photoUrl || "")
        setProfileBio(user?.profileBio || "")
        setIsEditing(true)
    }
    return (

        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto max-w-5xl">

                {isEditing ? (
                    /* Edit Profile */
                    <div className="mx-auto max-w-xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Edit Profile
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Update your personal information.
                            </p>
                        </div>

                        <div className="flex flex-col gap-5">

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    First Name
                                </label>
                                <input
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                                    placeholder="Enter your first name"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Profile Photo URL
                                </label>
                                <input
                                    value={photoUrl}
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                                    placeholder="https://example.com/photo.jpg"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Bio
                                </label>
                                <TextareaAutosize
                                    value={profileBio}
                                    onChange={(e) => setProfileBio(e.target.value)}
                                    minRows={4}
                                    maxRows={8}
                                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                                    placeholder="Tell readers a little about yourself..."
                                />
                            </div>

                            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                                <button
                                    onClick={updateProfile}
                                    className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-violet-700 active:scale-[0.98]"
                                >
                                    Save Changes
                                </button>

                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                            </div>

                        </div>
                    </div>
                ) : (
                    <>
                        {/* Profile Card */}
                        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                            <div className="h-32 bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 sm:h-40" />

                            <div className="px-6 pb-8 sm:px-10">
                                <div className="-mt-12 flex flex-col items-center sm:-mt-14">
                                    <img
                                        src={user?.photoUrl}
                                        alt="User profile"
                                        className="h-24 w-24 rounded-full border-4 border-white bg-white object-cover shadow-md sm:h-28 sm:w-28"
                                    />

                                    <h1 className="mt-4 text-2xl font-bold text-gray-900">
                                        {user?.firstName}
                                    </h1>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {user?.emailId}
                                    </p>

                                    <p className="mt-4 max-w-xl text-center leading-7 text-gray-600">
                                        {user?.profileBio || "No bio added yet. Tell the world about yourself."}
                                    </p>

                                    <button
                                        onClick={handleEdit}
                                        className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 active:scale-[0.98]"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Your Blogs */}
                        <div className="mt-10">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Your Blogs
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        All the stories you've shared.
                                    </p>
                                </div>

                                <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700">
                                    {blogs.length} {blogs.length === 1 ? "Blog" : "Blogs"}
                                </span>
                            </div>

                            {blogs.length > 0 ? (
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    {blogs.map((blog) => (
                                        <div
                                            key={blog._id}
                                            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                        >
                                            <BlogCard blog={blog} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
                                    <p className="text-lg font-semibold text-gray-800">
                                        No blogs yet
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Your published blogs will appear here.
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                )}

            </div>
        </div>


    )
}

export default Profile
