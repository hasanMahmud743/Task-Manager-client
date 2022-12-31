import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import AddTask from "../Pages/AddTask/AddTask";
import Comments from "../Pages/Comments/Comments";
import CompletedTask from "../Pages/CompletedTask/CompletedTask";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Media from "../Pages/Media/Media";
import MyTask from "../Pages/MyTask/MyTask";
import Registration from "../Pages/Registration/Registration";

export const router = createBrowserRouter([
 {
    path: '/',
    element: <Main></Main>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/addtask',
            element: <AddTask></AddTask>
        },
        {
            path: '/mytask',
            element: <MyTask></MyTask>
        },
        {
            path: '/completedtask',
            element: <CompletedTask></CompletedTask>
        },
        {
            path: '/media',
            element: <Media></Media>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/registration',
            element: <Registration></Registration>
        },
        {
            path: '/comments/:id',
            element: <Comments></Comments>,
            loader: ({params})=> fetch(`https://task-manager-server-side.vercel.app/completedTask/${params.id}`)
        }

    ]
 }
])