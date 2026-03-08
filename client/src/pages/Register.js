import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const register = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registration Success");

      navigate("/login");
    } catch {
      alert("Registration Failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="bg-white shadow-xl p-8 rounded-xl w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Patient Registration
        </h2>

        <input
          placeholder="Name"
          className="border p-3 rounded w-full mb-4"
          onChange={e =>
            setForm({ ...form, name: e.target.value })
          }
        />

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
          onClick={register}
          className="bg-green-600 text-white w-full p-3 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}
