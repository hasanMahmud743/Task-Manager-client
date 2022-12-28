import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";

const CompletedTask = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/completedTask")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCompletedTasks(data);
      });
  }, []);

  const incompleteTask = id =>{
    const completed =  completedTasks.find(ct => ct._id === id)
    const makeComplete = {
        task: completed.task,
        taskHeader: completed.taskHeader
    }

    fetch('http://localhost:5000/myTask',{
        method: 'post',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(makeComplete) 
    })
    .then(res => res.json())
    .then(data=>{
        console.log(data)
        fetch(`http://localhost:5000/completedTask/${id}`,{
            method: 'delete'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                const selected =  completedTasks.find(cp => cp._id === id)
                const reamining = completedTasks.filter(cp => cp._id !== selected._id)
                setCompletedTasks(reamining)
            }
        })
       
    })
  }
  return (
    <div>
        <p className="text-3xl font-bold mb-5">Completed Tasks: </p>
      <div className="grid grid-cols-3 gap-5">
        {completedTasks.map((ct) => (
          <a
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {ct.taskHeader}
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
              {ct.task}
            </p>
            <Button onClick={()=> incompleteTask(ct._id)} className="mt-5">
              Declear Incomplete
            </Button>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CompletedTask;
