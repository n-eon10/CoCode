import { useNavigate } from "react-router-dom"
import { useAuthContext } from "./useAuthContext";


export const useLogin = () => {

  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    const response = await fetch("http://localhost:8080/api/users/loginuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": `${email}`,
        "password": `${password}`
      })
    });


    const json = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({type: "LOGIN", payload: json});
      navigate("/rooms");
    }

    return json;
  }

  return login;
};