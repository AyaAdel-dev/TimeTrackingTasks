import axios from 'axios';

async function register(data) {
  try {
    const response = await axios.post('http://localhost:3000/auth/register',data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default register;