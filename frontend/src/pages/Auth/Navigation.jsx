import { NavLink, Link, useNavigate } from "react-router-dom"
import useAuthStore from "../../app/createAuth"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
const Navigation = () => {
  const userInfo = useAuthStore((state) => state.user)
  const [dropdownOpen, setDropDownOpen] = useState(false)
  const logOut = useAuthStore((state) => state.logout)

  const navigate = useNavigate()

  let token = localStorage.getItem("token")


  useEffect(() => {
    if (!token) {
      navigate("/sign-in")
    }

  }, [navigate, token])

  const handleLogout = async () => {
    try {
      await logOut()
      toast.success("User logout Successfully")
      navigate('/sign-in')
    } catch (error) {
      toast.error("Error Logout user", error)
    }
  }
  return (
    <>
      <nav className="flex items-center justify-around h-20 py-8 bg-teal-200 rounded-br-md rounded-bl-md fixed top-0 w-full z-30 backdrop-blur-sm border-b border-b-blue-200">
        <div>
          <h2 className="pl-3 text-2xl font-semibold italic">MyBlogApp</h2>
        </div>
        <div >
          <ul className="flex items-center p-3 ">
            <li>
              <NavLink className={({ isActive }) => `py-2 block duration-200 ${isActive ? "text-blue-600" : "text-black"} pr-5 text-2xl hover:text-blue-600`} to={'/'}>Home</NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => `py-2 block duration-200 ${isActive ? "text-blue-600" : "text-black"} pr-5 text-2xl hover:text-blue-600`} to={'/about'}>About</NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => `py-2 block duration-200 ${isActive ? "text-blue-600" : "text-black"} pr-5 text-2xl hover:text-blue-600`} to={'/contact'}>Contact</NavLink>
            </li>
          </ul>
        </div>

        <div className="relative">
          <button
            onClick={() => setDropDownOpen(!dropdownOpen)}
            className="flex items-center text-gray-800 focus:outline-none"
          >
            {userInfo ? (
              <>
                <div className="mr-4">
                  <Link className="px-3 py-2 hover:bg-slate-50 hover:text-black duration-150 rounded-md bg-black text-white" to={'/create-post'}>
                    create Post
                  </Link>
                </div>
                <span className="text-black">{userInfo.username}</span>
              </>
            ) : (
              <>
                <Link className="bg-blue-500 text-white px-3 mr-3 rounded-md hover:bg-blue-300 duration-200 py-2" to='/sign-in'>Sign In</Link>
                <Link className="bg-blue-500 text-white px-3 mr-3 rounded-md hover:bg-blue-300 duration-200 py-2" to='/sign-up'>Sign Up</Link>
              </>
            )}
            {userInfo && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            )}
          </button>
          {userInfo && dropdownOpen && (
            <div className="absolute -left-10 right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
              <div className="p-3">
                <p className="text-md text-center text-black">{userInfo?.email}</p>
                <button className="w-full mt-3 btn-outline rounded-md p-3 hover:bg-red-400 duration-200 hover:text-white text-black text-center bg-red-500 " onClick={handleLogout}>Sign out</button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navigation