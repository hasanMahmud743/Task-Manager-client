import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";

const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/myTask")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      });
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/myTask/${id}`, {
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

  const completedTaskHandler = id =>{
    
    const completedTasks = tasks.find(task => task._id === id)
    console.log(completedTasks)
    
    const completed = {
        task: completedTasks.task,
        taskHeader: completedTasks.taskHeader
    }

    fetch('http://localhost:5000/completedTask',{
        method: 'post',
        headers: {
            'content-Type' : 'application/json'
        },
        body: JSON.stringify(completed)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        fetch(`http://localhost:5000/myTask/${id}`, {
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
    })
  }

  return (
    <div>
      <h3 className="text-3xl font-bold my-5">My Tasks: </h3>

      <div className="grid md:grid-cols-3 m-5 gap-5">
        {tasks.map((task) => (
          <div>
            <div class=" p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {task.taskHeader}
                </h5>
                <FontAwesomeIcon
                  className="cursor-pointer"
                  onClick={() => handleDelete(task._id)}
                  icon={faCircleXmark}
                />
              </div>

              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
              <p> {task.task}</p>
              <div className="flex">
                <Button className="mt-5" onClick={() => setShow(task._id)}>
                  Update
                </Button>

                <React.Fragment>
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
                </React.Fragment>

                <Button onClick={() => completedTaskHandler( task._id)} className="mt-5 ml-3" gradientMonochrome="info">
                  Complete Task
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div></div>
    
    </div>
  );
};

export default MyTask;
