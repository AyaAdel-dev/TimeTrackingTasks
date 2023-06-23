import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import SearchBar from './SearchBar';
import TaskTable from './TaskTable';
import TaskForm from './TaskForm';
import axios from 'axios';
import "../styles/task.css"
import { useNavigate } from 'react-router-dom';

const ClearStorageButton = () => {

  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate(`/`);
  };

  return (
    <button onClick={handleClick} style={{backgroundColor:"violet",borderRadius:"5px"}}>Log Out</button>
  );
};

const GetMyTasks = ({ setTasks }) => {

  const handleClick = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    const response = await axios.get(`http://localhost:3000/tasks/me`, config);
    setTasks(response.data)
  };

  return (
    <button onClick={handleClick} className="mt-2" style={{backgroundColor:"violet",borderRadius:"5px"}}>Get My Tasks</button>
  );
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${await localStorage.getItem('token')}` }
      };
      const response = await axios.get(`http://localhost:3000/tasks/`, config);
      setTasks(response.data);
      // console.log(response.data);
    } catch (error) {
      // console.error(error.value);
      console.log(error);
    }
  };

  const handleSearchTermChange = (value) => {
    setSearchTerm(value);
  };

  const handleTaskAdded = async (task) => {
    try {
      setTasks((prevTasks) => [...prevTasks, task]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home-background">
      <div className="secDiv">
        <ClearStorageButton />
        <GetMyTasks setTasks={setTasks} />
        <Container >
          <h1 className='text-justify text-center py-3 ' style={{ color: '#ffa72b', textDecoration: "underline" }}>Task Management App</h1>
          <SearchBar searchTerm={searchTerm} onSearchTermChange={handleSearchTermChange} />
          <TaskForm onTaskAdded={handleTaskAdded} />
          {/* <TaskForm onTaskAdded={setTasks} /> */}
          <TaskTable searchTerm={searchTerm} tasks={tasks} setTasks={setTasks} />
        </Container>
      </div>
    </div>
  );
};

export default Home;