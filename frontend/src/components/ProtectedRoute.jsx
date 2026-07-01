import { Outlet, Navigate } from "react-router-dom"
import useAuthStore from "../app/createAuth"
const ProtectedRoute = () => {
  const userInfo = useAuthStore((state) => state.user)
  const token = localStorage.getItem("token")
  return userInfo && token ? <Outlet /> : <Navigate to='/sign-in' />
}

export default ProtectedRoute