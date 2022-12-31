import { Card, Spinner } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../Context/Contexts";

const Media = () => {
  const { user } = useContext(authContext);
  const [media, setMedia] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch(
      `https://task-manager-server-side.vercel.app/media?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMedia(data);
        setLoader(false);
      });
  }, [user?.email]);
  return (
    <div>
      <p className="text-3xl m-5 font-bold">Media tasks: </p>
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

      {media.length === 0 && (
        <p className="font-bold text-3xl text-center pt-20">
          No Media tasks added yet
        </p>
      )}

      <div className="grid md:grid-cols-3 m-5 my-5 gap-5">
        {media.map((md) => (
          <Card imgSrc={md.url}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {md.taskHeader}
            </h5>
            <p className="font-normal text-justify overflow-hidden text-gray-700 dark:text-gray-400">
              {md.task}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Media;
