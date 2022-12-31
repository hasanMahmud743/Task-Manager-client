import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Spinner } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../Context/Contexts";

const MyTask = () => {
  const { user, loading } = useContext(authContext);
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    fetch(
      `https://task-manager-server-side.vercel.app/myTask?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoader(false);
        setTasks(data);
      });
  }, [user?.email]);

  const handleDelete = (id) => {
    console.log(id);
    fetch(`https://task-manager-server-side.vercel.app/myTask/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          const deletedItem = tasks.find((task) => task._id === id);
          const reamining = tasks.filter(
            (task) => task._id !== deletedItem._id
          );
          setTasks(reamining);
        }
      });
  };

  const handleUpdate = (id) => {
    console.log(id);
  };

  const completedTaskHandler = (id) => {
    const completedTasks = tasks.find((task) => task._id === id);
    console.log(completedTasks);

    const completed = {
      task: completedTasks.task,
      taskHeader: completedTasks.taskHeader,
      email: user?.email,
    };

    fetch("https://task-manager-server-side.vercel.app/completedTask", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(completed),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetch(`https://task-manager-server-side.vercel.app/myTask/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.acknowledged) {
              const deletedItem = tasks.find((task) => task._id === id);
              const reamining = tasks.filter(
                (task) => task._id !== deletedItem._id
              );
              setTasks(reamining);
            }
          });
      });
  };

  return (
    <div>
      <h3 className="text-3xl font-bold my-5">My Tasks: </h3>
      {(loading || loader) && (
        <div className="text-center mt-20">
          <Spinner
            className="m-auto"
            color="success"
            size="xl"
            aria-label="Success spinner example"
          />
        </div>
      )}

      {tasks.length === 0 && (
        <p className="font-bold text-3xl text-center pt-20">
          No tasks added yet
        </p>
      )}

      <div className="grid md:grid-cols-3 m-5 gap-5">
        {tasks.map((task) => (
          <div className=" p-6 bg-white border relative pb-10  h-72 border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {task.taskHeader}
              </h5>
              <FontAwesomeIcon
                className="cursor-pointer"
                onClick={() => handleDelete(task._id)}
                icon={faCircleXmark}
              />
            </div>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
            <p className="h-32 overflow-y-scroll"> {task.task}</p>
            <div className="flex absolute bottom-5">
              <Button className="mt-5" onClick={() => setShow(task._id)}>
                Update
              </Button>
             

              {/* <React.Fragment>
                <Modal show={show} onClose={() => setShow(!show)}>
                  <Modal.Header>Terms of Service</Modal.Header>
                  <Modal.Body>
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {task.task}
                      </p>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {task.taskHeader}
                      </p>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={() => setShow(!show)}>I accept</Button>
                    <Button color="gray" onClick={() => setShow(!show)}>
                      Decline
                    </Button>
                  </Modal.Footer>
                </Modal>
              </React.Fragment>  */}

              <Button
                onClick={() => completedTaskHandler(task._id)}
                className="mt-5 ml-3"
                gradientMonochrome="info"
              >
                Complete Task
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div></div>
     
    </div>
  );
};

export default MyTask;
