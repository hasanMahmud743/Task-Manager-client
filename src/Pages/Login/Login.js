import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Lottie from "react-lottie";
import { Link, useNavigate } from "react-router-dom";
import login from "../../assets/login.json";
import { authContext } from "../../Context/Contexts";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { signInUser } = useContext(authContext);
  const onSubmit = (data) => {
    setLoader(true)
    console.log(data);
    const email = data.email;
    const password = data.password;
    signInUser(email, password).then((res) => {
      console.log(res.user);
      setLoader(false)
      navigate("/");
    });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: login,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
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
      <div className="grid grid-cols-2 mx-10 gap-5">
        <div>
          <Card className="m-10">
            <p className="text-3xl font-bold text-center py-8">Login</p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Your email" />
                </div>
                <TextInput
                  id="email1"
                  type="email"
                  placeholder="Your Email"
                  required={true}
                  {...register("email")}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Your password" />
                </div>
                <TextInput
                  id="password1"
                  placeholder="Your Password"
                  type="password"
                  required={true}
                  {...register("password")}
                />
              </div>
              <p className="text-sm">
                New Here? Go to{" "}
                <Link className="text-blue-600" to="/registration">
                  registration
                </Link>{" "}
                page
              </p>
              <Button className="my-5" type="submit">
                Log In
              </Button>
            </form>
          </Card>
        </div>

        <div>
          <Lottie options={defaultOptions} height={500} width={500} />
        </div>
      </div>
    </div>
  );
};

export default Login;
