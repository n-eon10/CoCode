import { useNavigate } from "react-router-dom";

export const useCreateUser = () => {
  const navigate = useNavigate();

  const createUser = async (username, email, password) => {
    const response = await fetch("http://localhost:8080/api/users/createuser", {
      method: "POST",
      body: JSON.stringify({
        "username": `${username}`,
        "email": `${email}`,
        "password": `${password}`
      }),
      headers: {
        "Content-Type": "application/json"
      }

    });

    const json = await response.json();

    if (response.ok) {
      navigate("/signin");
    }

    return json;
  }

  return createUser;
}