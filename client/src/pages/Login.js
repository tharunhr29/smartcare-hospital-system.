import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const login = async () => {
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      alert("Login Success");

      navigate("/appointment"); // redirect
    } catch {
      alert("Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="bg-white shadow-xl p-8 rounded-xl w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Patient Login
        </h2>

        <input
          placeholder="Email"
          className="border p-3 rounded w-full mb-4"
          onChange={e =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded w-full mb-4"
          onChange={e =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={login}
          className="bg-blue-600 text-white w-full p-3 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
