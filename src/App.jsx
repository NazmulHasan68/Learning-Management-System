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
import Dashboard from './pages/admin/lecture/Dashboard'
import CourseTable from './pages/admin/course/CourseTable'
import AddCourse from './pages/admin/course/AddCourse'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/CreateLecture'
import EditLecture from './pages/admin/lecture/EditLecture'
import CourseDetails from './pages/student/CourseDetails'
import CourseProgress from './pages/student/CourseProgress'
import SearchPage from './pages/student/SearchPage'
import ProtectedRoutes, { AdminRoute, AuthenticatedUser } from './components/ProtectedRoutes'
import PurchaseCourseProtectedRoute from './components/PurchaseCourseProjectedRoute'


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
        element:<AuthenticatedUser><Login/></AuthenticatedUser>
      },
      {
        path:"/my-learning",
        element:<ProtectedRoutes><Mylearning/></ProtectedRoutes>
      },
      {
        path:"/profile",
        element:<ProtectedRoutes><Profile/></ProtectedRoutes>
      },
      {
        path:"/course/search",
        element:<ProtectedRoutes><SearchPage/></ProtectedRoutes>
      },
      {
        path:"/course-details/:courseId",
        element:<ProtectedRoutes><CourseDetails/></ProtectedRoutes>
      },
      {
        path:"/course-progress/:courseId",
        element:<ProtectedRoutes>
              <PurchaseCourseProtectedRoute>
                <CourseProgress/>
              </PurchaseCourseProtectedRoute>
            </ProtectedRoutes>
      },
      // admin route start form here
      {
        path : "/admin",
        element :<AdminRoute><Sidebar/></AdminRoute> ,
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
          {
            path : "course/:courseId",
            element : <EditCourse/>
          },
          {
            path : "course/:courseId/lecture",
            element : <CreateLecture/>
          },
          {
            path : "course/:courseId/lecture/:lectureId",
            element : <EditLecture/>
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
