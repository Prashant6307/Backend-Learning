import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { addSearch } from "../utils/searchSlice"
import axios from "axios"

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await axios.post(import.meta.env.VITE_BASE_URL + "/logout",{},{ withCredentials: true })
            navigate("/login")
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">📋Notes Taking</a>
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Search Notes"
                    className="input w-24 md:w-auto"
                    onChange={(e) => dispatch(addSearch(e.target.value))}
                />
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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
    )
}

export default Navbar
