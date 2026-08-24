import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "Admin" && password === "Admin@123") {
      localStorage.setItem("adminLogin", JSON.stringify(true));
      alert("Login Successful");
      navigate("/admin");
    } else {
      alert("Wrong Username or Password");
    }
  };

  return (
    <div className="container py-5">
      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button className="btn btn-dark w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
