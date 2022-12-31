import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Spinner } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../Context/Contexts";

const CompletedTask = () => {
  const { user } = useContext(authContext);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    fetch(
      `https://task-manager-server-side.vercel.app/completedTask?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCompletedTasks(data);
        setLoader(false);
      });
  }, [user?.email]);

  const incompleteTask = (id) => {
    const completed = completedTasks.find((ct) => ct._id === id);
    const makeComplete = {
      task: completed.task,
      taskHeader: completed.taskHeader,
      email: user?.email,
    };

    fetch("https://task-manager-server-side.vercel.app/myTask", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(makeComplete),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetch(
          `https://task-manager-server-side.vercel.app/completedTask/${id}`,
          {
            method: "delete",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.acknowledged) {
              const selected = completedTasks.find((cp) => cp._id === id);
              const reamining = completedTasks.filter(
                (cp) => cp._id !== selected._id
              );
              setCompletedTasks(reamining);
            }
          });
      });
  };

  const handleDelete = (id) => {
    fetch(`https://task-manager-server-side.vercel.app/completedTask/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          const selected = completedTasks.find((cp) => cp._id === id);
          const reamining = completedTasks.filter(
            (cp) => cp._id !== selected._id
          );
          setCompletedTasks(reamining);
        }
      });
  };
  return (
    <div>
      <p className="text-3xl font-bold m-5">Completed Tasks: </p>
      {loader && (
        <div className="text-center mt-20">
          <Spinner
            className="m-auto"
            color="success"
            size="xl"
            aria-label="Success spinner example"
          />
        </div>
      )}
      {completedTasks.length === 0 && (
        <p className="font-bold text-3xl text-center pt-20">
          You have no completed task yet
        </p>
      )}

      <div className="grid md:grid-cols-3  gap-5">
        {completedTasks.map((ct) => (
          <div
            href="#"
            class="block m-5 p-6 h-72 relative bg-white border border-gray-200 rounded-lg shadow-md  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="flex justify-between">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {ct.taskHeader}
              </h5>
              <FontAwesomeIcon
                className="cursor-pointer"
                onClick={() => handleDelete(ct._id)}
                icon={faCircleXmark}
              />
            </div>
            <p class="font-normal text-gray-700 dark:text-gray-400"></p>
            <p className="h-32 scroll-ml-2 overflow-y-scroll"> {ct.task}</p>
            <div className="flex absolute mt-10 bottom-2 my-3">
              <Button onClick={() => incompleteTask(ct._id)}>
                Incomplete Task
              </Button>
              <Link to={`/comments/${ct._id}`}>
                {" "}
                <Button className="ml-5">Add Comment</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedTask;
