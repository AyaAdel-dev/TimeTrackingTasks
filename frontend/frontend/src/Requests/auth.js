import axios from "axios";

async function login(data) {
  try {
    const response = await axios.post("http://localhost:3000/auth/login", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default login;
