import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import AddTask from "../Pages/AddTask/AddTask";
import CompletedTask from "../Pages/CompletedTask/CompletedTask";
import MyTask from "../Pages/MyTask/MyTask";

export const router = createBrowserRouter([
 {
    path: '/',
    element: <Main></Main>,
    children: [
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

    ]
 }
])