
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Protected from './features/auth/components/Protected'
import Home from './features/chats/pages/Home'
import Authinit from './features/auth/components/Authinit'
import Applayout from './Applayout'
import Chat from './features/chats/components/Chat'
import Hero from './features/chats/pages/Hero'

function App() {



const router=createBrowserRouter([
  {
path:"/",
element:<Hero/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/dashboard",
    element:
    <Protected>
      <Applayout/>
    </Protected>,
    children:[
      {
        path:"/dashboard",
        element:<Home/>
      },
      {
        path:"/dashboard/chat/:id",
        element:<Chat/>
      }
    ]
  }
])

  return (
    <Authinit>
      <RouterProvider router={router}/>
    </Authinit>
  )
}

export default App
