import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });
      const user = response.data;
      // Do something with the user object, e.g. store it in a global state
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
