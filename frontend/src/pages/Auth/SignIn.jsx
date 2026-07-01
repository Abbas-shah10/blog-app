import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuthStore from "../../app/createAuth"
import { toast } from "react-toastify"

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()


    const login = useAuthStore((state) => state.login)


    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!email || !password) return;
        try {
            await login({ email, password })
            toast.success("User Login Successfully")
            navigate('/')
        } catch (error) {
            toast.error("Error Login user", error)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <p className="text-black font-medium mt-2 text-2xl">Sign In to your Account</p>
                    </div>
                    {/* Login Form */}
                    <div>
                        <form className="space-y-6" onSubmit={handleSubmit}>
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
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Your Password"
                                    className="w-full px-2 py-3 outline-blue-200"
                                />

                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full btn-primary bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed py-2 hover:bg-blue-300 transition-all rounded-md"
                            >
                                <Link>Sign In</Link>
                            </button>
                        </form>
                        <p className="text-center mt-2">Don't Have an Account <Link className="text-blue-800 hover:text-blue-400 duration-150" to={'/sign-up'}>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn