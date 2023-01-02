import { Button } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../Context/Contexts";

const Home = () => {
  const { user } = useContext(authContext);
  const [task, setTask] = useState([]);
  const [completedTask, setCompletedTasks] = useState([]);
  const [media, setMedia] = useState([]);
  useEffect(() => {
    fetch(`https://task-manager-server-side.vercel.app/completedTask?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCompletedTasks(data);
      });
  }, []);

  useEffect(() => {
    fetch(`https://task-manager-server-side.vercel.app/myTask?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTask(data);
      });
  }, []);

  useEffect(() => {
    fetch(`https://task-manager-server-side.vercel.app/media?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMedia(data);
      });
  }, []);

  return (
    <div>
      <p className="font-bold text-center text-3xl">Welcome to Task Manager</p>
      <p className="text-center text-xl font-bold">No way to forget again </p>
      

      <div className="grid md:grid-cols-3 gap-5 m-5 mt-10">
        <div>
          <div class="w-full  bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div class="flex flex-col px-4 pt-10 items-center pb-10">
              <img
                class="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="https://cdn-icons-png.flaticon.com/512/906/906334.png"
                alt="Bonnie image"
              />
              <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                My Task
              </h5>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                All the tasks are stored Here
              </span>
              {user?.uid && (
                <p className="py-3 text-2xl">
                  You have{" "}
                  <span className="font-bold text-3xl text-green-700 border-dotted">
                    {task.length}
                  </span>{" "}
                  task pending{" "}
                </p>
              )}

              <div class="flex mt-4 space-x-3 md:mt-6">
                {user?.uid ? (
                 <Link to='/mytask'>
                 <Button className="w-40" color="success">
                   Explore
                 </Button>
               </Link>
                ) : (
                  <Link to="/login">
                    {" "}
                    <Button className="w-40" color="success">
                      Log in to Explore
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="w-full  bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div class="flex flex-col px-4 pt-10 items-center pb-10">
              <img
                class="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQplmsF0Zq-8OwM6-p3hEE2mH8Z_4X6okklOvoS_lRjqlV43PScIPrcoDJwaDU4Kjsq95k&usqp=CAU"
                alt="Bonnie image"
              />
              <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Completed Task
              </h5>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                All the completed tasks are stored Here
              </span>
              {user?.uid && (
                <p className="py-3 text-2xl">
                  You already completed{" "}
                  <span className="font-bold text-3xl text-green-700 border-dotted">
                    {completedTask.length}
                  </span>{" "}
                  task{" "}
                </p>
              )}

              <div class="flex mt-4 space-x-3 md:mt-6">
                {user?.uid ? (
                  <Link to='/completedtask'>
                    <Button className="w-40" color="success">
                      Explore
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    {" "}
                    <Button className="w-40" color="success">
                      Log in to Explore
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="w-full  bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div class="flex flex-col px-4 pt-10 items-center pb-10">
              <img
                class="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-task-icon-png-image_4171509.jpg"
                alt="Bonnie image"
              />
              <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Media Task
              </h5>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                All the Media tasks are stored Here
              </span>
              {user?.uid && (
                <p className="py-3 text-2xl">
                  You have{" "}
                  <span className="font-bold text-3xl text-green-700 border-dotted">
                    {media.length}
                  </span>{" "}
                  Media task{" "}
                </p>
              )}

              <div class="flex mt-4 space-x-3 md:mt-6">
                {user?.uid ? (
                  <Link to="/media">
                    {" "}
                    <Button className="w-40" color="success">
                      Explore
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    {" "}
                    <Button className="w-40" color="success">
                      Log in to Explore
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
