import { Button, TextInput } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { authContext } from "../../Context/Contexts";

const Comments = () => {
  const {user} = useContext(authContext)
  const data = useLoaderData();
  const [comment, setComment] = useState("");
  const [commentsCollection, setCommentsCollection] = useState([]);
  const [loader, setLoader] = useState(false)
  console.log(data);

  useEffect(() => {
    fetch(`https://task-manager-server-side.vercel.app/comments?task=${data.task}&taskHeader=${data.taskHeader}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCommentsCollection(data);
        setComment('')
      });
  }, [loader]);

  const handleComment = () => {
   
    const myComment = {
      comment,
      task: data.task,
      taskHeader: data.taskHeader
      
    };
    console.log(myComment);
    fetch("https://task-manager-server-side.vercel.app/comments", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(myComment),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoader(!loader)
        setComment('')
        
      });
  };
  return (
    <div className="max-w-2xl m-auto">
      <p className="text-3xl m-5 font-bold">Comment Section: </p>
      <div className="m-5">
        <div>
          <div class=" mt-5 p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {data.taskHeader}
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {data.task}
            </p>
          </div>

          <p className="font-bold text-2xl mt-10 mb-3">Add Comments:</p>
          <TextInput
            id="text"
            type="text"
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add Your comment here...."
            required={true}
          />
          <Button
            onClick={handleComment}
            className="mt-3"
            gradientMonochrome="info"
          >
           Add  Comments
          </Button>
        </div>

        <div>
          {
            commentsCollection.length === 0 && <p className="text-2xl pt-10 font-bold text-center">No comments added</p>
          }
          {/* <p className="text-2xl font-bold">Comments:</p> */}
          {commentsCollection.map((cc) => (
            <div
              href="#"
              class="block p-6 mt-5 bg-white border border-gray-200 rounded-lg shadow-md  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Comments
              </h5>
              <p class="font-normal text-gray-700 dark:text-gray-400">
               {cc?.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
