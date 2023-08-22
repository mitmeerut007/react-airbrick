import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Unicons from "@iconscout/react-unicons";
import axios from "axios"; // Import Axios
import loginImg from "../assets/login.png";

const Login = () => {
  const [passShow, setPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    email: "admin@123.com",
    password: "admin@123",
  });

  const navigate = useNavigate();

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
    } else {
      try {
        const response = await axios.post(
          "https://airbrick-backend.vercel.app/api/user/login",
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
          toast.success("Login Successfully...");
          localStorage.setItem("usersdatatoken", res.result.token);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          navigate("/home", { replace: "true" });
          setInpval({ ...inpval, email: "", password: "" });
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
  };

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("https://airbrick-backend.vercel.app/api/user/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();

    if (data.status === 401 || !data) {
      console.log("user not valid");
      navigate("/");
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    DashboardValid();
  }, []);

  return (
    <section className="flex items-center justify-center h-screen login-container">
      <ToastContainer />
      <div className="flex flex-wrap items-center justify-center mx-auto shadow-md w-[90%] bg-white md:h-[520px] rounded-3xl max-w-screen-lg overflow-hidden">
        <div className="w-full md:w-1/2">
          <img src={loginImg} className="w-[w-[80%] mx-auto py-3 sm:py-10 md:p-0" alt="login" />
        </div>
        <div className="w-full md:w-1/2 bg-[#EE7153] h-full flex items-center">
          <div className="w-[90%] md:w-[80%] mx-auto pt-5 pb-12 md:py-10">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-3xl mb-5 text-center">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                  Enter your email
                </label>
                <input
                  type="email"
                  value={inpval.email}
                  onChange={setVal}
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 md:py-3.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                  Enter your password
                </label>
                <div className="relative">
                  <input
                    type={!passShow ? "password" : "text"}
                    onChange={setVal}
                    value={inpval.password}
                    name="password"
                    id="password"
                    placeholder={!passShow ? "••••••••" : "Type your password..."}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-primary-600 block w-full px-2.5 md:py-3.5"
                    required
                  />
                  <span className="absolute inset-y-0 top-2 md:top-3 right-3" onClick={() => setPassShow(!passShow)}>
                    {!passShow ? <Unicons.UilEye color="gray" /> : <Unicons.UilEyeSlash color="gray" />}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                onClick={loginuser}
                className="w-full text-white font-bold bg-[#7C97DA] hover:bg-blue-400 focus:ring-4 focus:outline-none rounded-lg text-sm px-2.5 py-3.5 text-center"
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
