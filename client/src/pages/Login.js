import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Unicons from "@iconscout/react-unicons";
import axios from "axios"; // Import Axios

const Login = () => {
  const [passShow, setPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const loginuser = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    if (email === "") {
      toast.error("email is required!");
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!");
    } else if (password === "") {
      toast.error("password is required!");
    } else if (password.length < 6) {
      toast.error("password must be 6 char!");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/login",
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const res = response.data;

        if (res.status === 201) {
          localStorage.setItem("usersdatatoken", res.result.token);
          history("/home");
          setInpval({ ...inpval, email: "", password: "" });
        }
      } catch (error) {
        // Handle error here (display a message or take other actions)
        console.error("Error:", error);
      }
    }
  };

  return (
    <section className="bg-gray-500">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  value={inpval.email}
                  onChange={setVal}
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={!passShow ? "password" : "text"}
                    onChange={setVal}
                    value={inpval.password}
                    name="password"
                    id="password"
                    placeholder={!passShow ? "••••••••" : "Type your password..."}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                  <span className="absolute inset-y-0 top-2 right-2" onClick={() => setPassShow(!passShow)}>
                    {!passShow ? <Unicons.UilEye color="gray" /> : <Unicons.UilEyeSlash color="gray" />}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                onClick={loginuser}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
