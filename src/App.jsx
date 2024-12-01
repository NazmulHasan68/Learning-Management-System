import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { Login } from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import MainLayout from './Layout/MainLayout'
import Courses from './pages/student/Courses'
import Mylearning from './pages/student/Mylearning'
import Profile from './pages/student/Profile'
import Sidebar from './pages/admin/lecture/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import CourseTable from './pages/admin/course/CourseTable'
import AddCourse from './pages/admin/lecture/AddCourse'


const appRoutr = createBrowserRouter([
  {
    path:'/',
    element:<MainLayout/>,
    children:[
      {
        path:"/",
        element:(
        <>
          <HeroSection/>
          <Courses/>

        </>
        )
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/my-learning",
        element:<Mylearning/>
      },
      {
        path:"/profile",
        element:<Profile/>
      },

      // admin route start form here
      {
        path : "/admin",
        element : <Sidebar/>,
        children:[
          {
            path : "dashboard",
            element : <Dashboard/>
          },
          {
            path : "course",
            element : <CourseTable/>
          },
          {
            path : "course/create",
            element : <AddCourse/>
          },
        ]
      }
    ],
  }
])

function App() {
  return (
    <main>
      <RouterProvider router={appRoutr}>

      </RouterProvider>
    </main>
  )
}

export default App
