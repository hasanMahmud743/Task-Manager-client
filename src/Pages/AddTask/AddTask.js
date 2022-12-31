import { Button, FileInput, Label, Spinner, Textarea, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { authContext } from "../../Context/Contexts";

const AddTask = () => {
    const {user} = useContext(authContext)
    console.log(user.email)
  const [task, setTask] = useState("");
  const [loader, setLoader] = useState(false);
  const [taskHeader, setTaskHeader] = useState("");
  const [photo, setPhoto] = useState(false);
  const { register, handleSubmit } = useForm();
    console.log(photo)

  const submitValue = (e) => {
    e.preventDefault();
    console.log(e.key);
  };

  const onSubmit = (data) => {
    setLoader(true)
    console.log(data);
    const formData = new FormData();
    const image = data.image[0];
    image && setPhoto(true)
    console.log(image);
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=cad1f541584e3f8d3cac37ff49ab51fa`;
    fetch(url, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.thumb.url);
        const myMediaObj = {
          taskHeader,
          email: user?.email,
          task,
          url: data.data.thumb.url,
        };
        console.log(myMediaObj);
        fetch("https://task-manager-server-side.vercel.app/media", {
          method: "Post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(myMediaObj),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setLoader(false)
            toast.success('Tasks added to the media route.');
          });
      });
  };

  const keypress = (e) => {
    if (e.key === "Enter" && task) {
      const myTask = {
        taskHeader,
        task,
        email: user?.email,
      };
      fetch(`https://task-manager-server-side.vercel.app/myTask`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(myTask),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          e.target.value = "";
        });
      console.log(e.target.value);
    }
  };
  return (
    <div className="max-w-2xl m-auto">
      <div>
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
      <p className="text-3xl m-5 font-bold">Add your today's task:</p>
        <form className="m-5" onKeyPress={keypress} onSubmit={submitValue} id="textarea">
          <div className="mb-2 block">
            <Label htmlFor="comment" value="" />
          </div>

          <TextInput
            className="my-5"
            placeholder="Type task header...."
            id="base"
            onChange={(e) => setTaskHeader(e.target.value)}
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

      <form  onSubmit={handleSubmit(onSubmit)} className="m-5 mt-10">
        <div id="fileUpload">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Upload file" />
          </div>
          <FileInput
            {...register("image")}
            onChange={(e) => setPhoto(true)}
            id="file"
            helperText={photo || "Add file to enable the button"}
          />
        </div>
        <Button className="mt-5" type="submit" disabled={photo ?  false : true }> Add Media</Button>
      
      </form>
      <Toaster/>
    </div>
  );
};

export default AddTask;
