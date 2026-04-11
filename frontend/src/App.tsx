
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Protected from './features/auth/components/Protected'
import Home from './features/chats/pages/Home'
import Authinit from './features/auth/components/Authinit'
import Applayout from './Applayout'
import Chat from './features/chats/components/Chat'

function App() {



const router=createBrowserRouter([
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/",
    element:
    <Protected>
      <Applayout/>
    </Protected>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/chat/:id",
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
