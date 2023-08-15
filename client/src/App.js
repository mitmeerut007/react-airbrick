import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ShowCase from "./pages/ShowCase";
import NotFoundPage from "./pages/NotFoundPage";
import Project from "./pages/Project";
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/Context";
import Loader from "./components/Loader";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);

  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("http://localhost:5000/api/user/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();

    if (data.status === 401 || !data) {
      console.log("user not valid");
      history("/");
    } else {
      console.log("user verify");
      setLoginData(data);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 800);
  }, []);

  return (
    <>
      {data ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/showcase" element={<ShowCase />} />
          <Route path="/project" element={<Project />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      ) : (
        <Loader />
      )}
    </>
  );
}
