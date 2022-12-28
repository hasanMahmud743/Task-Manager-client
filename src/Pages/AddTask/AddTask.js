import { FileInput, Label, Textarea, TextInput } from "flowbite-react";
import React, { useState } from "react";

const AddTask = () => {
  const [task, setTask] = useState("");
  const [taskHeader, setTaskHeader] = useState('')
 

  const submitValue = (e) => {
    e.preventDefault();
    console.log(e.key);
  };

  const keypress = (e) => {
    if (e.key === "Enter" && task) {
      const myTask = {
        taskHeader,
        task
      }
      fetch('http://localhost:5000/myTask',{
        method: 'post',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(myTask) 
    })
    .then(res => res.json())
    .then(data=>{
        console.log(data)
        e.target.value = ''
    })
      console.log(e.target.value)
    }
  };
  return (
    <div>
      <div>
        <form onKeyPress={keypress} onSubmit={submitValue} id="textarea">
          <div className="mb-2 block">
            <Label htmlFor="comment" value="Add your today's Task" />
          </div>

          <TextInput
            className="my-5"
            placeholder="Type task header...."
            id="base"
            onChange={(e)=> setTaskHeader(e.target.value)}
            type="text"
            sizing="base"
          />

          <Textarea
            id="comment"
            placeholder="Type your task...."
            required={true}
            onChange={(event) => setTask(event.target.value)}
            rows={4}
            helperText="Press enter button to add the text on My Task"
          />
        </form>
      </div>

      <div className="mt-10">
        <div id="fileUpload">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Upload file" />
          </div>
          <FileInput id="file" />
        </div>
        <button
          type="button"
          class="text-white mt-5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddTask;
