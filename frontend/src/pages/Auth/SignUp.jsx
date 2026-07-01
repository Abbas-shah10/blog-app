import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuthStore from "../../app/createAuth"
import { toast } from "react-toastify"
const SignUp = () => {
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signUp = useAuthStore((state) => state.signup)

    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault()
        if (!username | !email | !password) return;
        await signUp({ username, email, password })
        toast.success("user Register Successfully")
        navigate('/sign-in')
    }
    return (
        <>
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <p className="text-black font-medium mt-2 text-2xl">Register if you don't have Account</p>
                    </div>
                    {/* Login Form */}
                    <div>
                        <form className="space-y-6" onSubmit={handleSignUp}>
                            {/* UserName */}
                            <div>
                                <label className="label block mb-2">username</label>
                                <input
                                    type="username"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    name="text"
                                    placeholder="Enter Your username"
                                    className="w-full px-2 py-3 outline-blue-200"
                                />

                            </div>
                            {/* Email Address */}
                            <div>
                                <label className="label block mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className="w-full px-2 py-3 outline-blue-200"
                                />

                            </div>

                            {/* Password */}
                            <div>
                                <label className="label block mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    name="password"
                                    placeholder="Enter Your Password"
                                    className="w-full px-2 py-3 outline-blue-200"
                                />

                            </div>

                            {/* Submit Button */}
                            <button className="w-full btn-primary bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed py-2 hover:bg-blue-300 transition-all rounded-md">
                                <Link
                                    // disabled={isLoggingIn}
                                    to={'/sign-in'}
                                >
                                    Sign Up
                                </Link>
                            </button>
                        </form>
                        <p className="text-center mt-2">Already Have Account: <Link className="text-blue-800 hover:text-blue-400 duration-150" to={'/sign-in'}>Sign In</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp