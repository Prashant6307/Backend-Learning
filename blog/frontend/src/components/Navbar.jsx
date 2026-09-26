
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { addSearch } from "../utils/searchSlice"
import axios from "axios"

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await axios.post(import.meta.env.VITE_BASE_URL + "/logout", {}, { withCredentials: true })
            navigate("/login")
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="shadow-sm ">
            <div className="navbar bg-base-100  max-w-7xl mx-auto">
                <div className="flex-1">
                    <Link to="/blogs" className="btn btn-ghost text-sm  sm:text-xl ">Blog</Link>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => navigate("create")} className="text-blue-800 font-medium border border-b-blue-800 px-4 rounded-md">Create Post</button>
                    <input
                        type="text"
                        placeholder="Search Notes"
                        className="border w-24 sm:p-1 rounded-md sm:w-64"
                        onChange={(e) => dispatch(addSearch(e.target.value))}
                    />
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.magnific.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?semt=ais_hybrid&w=740&q=80" />
                            </div>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><Link to="/notes">Get all notes</Link></li>
                            <li onClick={handleLogout}><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar

