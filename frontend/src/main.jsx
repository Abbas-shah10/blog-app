import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SignIn from './pages/Auth/SignIn.jsx'
import SignUp from './pages/Auth/SignUp.jsx'
import Posts from './pages/Posts/Posts.jsx'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import CreatePost from './pages/Posts/CreatePost.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />} >
        <Route path="" element={<Posts />} />
        <Route element={<ProtectedRoute />}>
          <Route path='create-post' element={<CreatePost />} />
        </Route>
      </Route>
      <Route path='sign-in' element={<SignIn />} />
      <Route path='sign-up' element={<SignUp />} />
    </>
  )
)



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
