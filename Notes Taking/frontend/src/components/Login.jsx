import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [isSignupForm, setIsSignupForm] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            await axios.post(import.meta.env.VITE_BASE_URL + "/login",
                { emailId, password },
                {
                    withCredentials: true
                })
        }

        catch (err) {
            console.log(err.message)
        }

        navigate("/notes")


    }
    const handleSignup = async () => {
        const res = await axios.post(import.meta.env.VITE_BASE_URL + "/signup", { firstName, emailId, password }, { withCredentials: true })

        console.log(res.data)

        navigate("/notes")
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">{isSignupForm ? "Sign-Up" : "Login"}</h1>

                </div>
                <div className="card bg-base-100 w-full max-w-sm sm:w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            {isSignupForm && <> <label className="label">First Name</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </>}
                            <label className="label">Email</label>
                            <input
                                type="email"
                                className="input"
                                placeholder="Email"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                            <label className="label">Password</label>
                            <input
                                type="password"
                                className="input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div><a className="link link-hover">Forgot password?</a></div>

                            <p
                                className="cursor-pointer"
                                onClick={() => setIsSignupForm((value) => !value)}>
                                {isSignupForm ? "Already have account: click to Login" : "New User: click to Signup"}
                            </p>

                            <button className="btn btn-neutral mt-4"
                                onClick={isSignupForm ? handleSignup : handleLogin}>{isSignupForm ? "Signup" : "Login"}</button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
