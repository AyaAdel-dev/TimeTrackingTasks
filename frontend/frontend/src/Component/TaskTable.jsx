import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import "../styles/table.css"
const TaskTable = ({ searchTerm, tasks, setTasks }) => {
  // const [tasks, setTasks] = useState([]);
  const [elapsedTime, setElapsedTime] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      const config = {
        params: {
          searchTerm,
        },
        headers: { Authorization: `Bearer ${await localStorage.getItem('token')}` }
      };
      const response = await axios.get(`http://localhost:3000/tasks`, config);
      setTasks(response.data);
    };
    fetchTasks();
  }, [searchTerm]);

  const handleStartClick = async (index) => {
    const config = {
      headers: { Authorization: `Bearer ${await localStorage.getItem('token')}` }
    };
    const task = tasks[index];
    task.status = 'progressing';
    task.isRunning = true;
    try {
      const response = await axios.put(`http://localhost:3000/tasks/${task._id}`, task, config);
      setTasks((prevTasks) => {
        const newTasks = [...prevTasks];
        newTasks[index] = response.data;
        return newTasks;
      });

      // start timer
      setElapsedTime((prevElapsedTime) => {
        const newElapsedTime = { ...prevElapsedTime };
        clearInterval(newElapsedTime[task._id]); // clear any existing timer for this task
        newElapsedTime[task._id] = setInterval(() => {
          task.timeElapsed += 1;
          setTasks((prevTasks) => {
            const newTasks = [...prevTasks];
            newTasks[index].timeElapsed = task.timeElapsed;
            return newTasks;
          });
        }, 1000);
        return newElapsedTime;
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Unauthorized: This is not your task to track time on');
      }
    }
  };

  const handleStopClick = async (index) => {
    const config = {
      headers: { Authorization: `Bearer ${await localStorage.getItem('token')}` }
    };
    const task = tasks[index];
    task.status = 'begin';
    task.isRunning = false;
    clearInterval(elapsedTime[task._id]);
    try {

      const response = await axios.put(`http://localhost:3000/tasks/${task._id}`, task, config);
      setTasks((prevTasks) => {
        const newTasks = [...prevTasks];
        newTasks[index] = response.data;
        return newTasks;
      });

      // clear timer
      setElapsedTime((prevElapsedTime) => {
        const newElapsedTime = { ...prevElapsedTime };
        delete newElapsedTime[task._id];
        return newElapsedTime;
      });

    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Unauthorized: This is not your task to track time on');
      }
    }
  };

  const handleEditClick = async (index, newName) => {
    const task = tasks[index];
    task.name = newName;
    const response = await axios.put(`http://localhost:3000/tasks/${task._id}`, task);
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[index] = response.data;
      return newTasks;
    });
  };

  const handleDeleteClick = async (index) => {
    const config = {
      headers: { Authorization: `Bearer ${await localStorage.getItem('token')}` }
    };
    const task = tasks[index];
    try {
      await axios.delete(`http://localhost:3000/tasks/${task._id}`, config);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Unauthorized: This is not your task to delete');
      }
    }

    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const getTotalTime = () => {
    let totalElapsedTime = 0;
    tasks.forEach((task) => {
      totalElapsedTime += task.timeElapsed;
    });
    return totalElapsedTime;
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div style={{ height: '33.5rem', overflowY: 'scroll' }} >
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Time Elapsed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task._id}>
              <td>{task.name}</td>
              <td>{task.status}</td>
              <td>{formatTime(task.timeElapsed)}</td>
              <td style={{ paddingRight: '10px' }}>
                {task.isRunning ? (
                  <Button variant="danger" onClick={() => handleStopClick(index)}>
                    Stop
                  </Button>
                ) : (
                  <Button variant="success" onClick={() => handleStartClick(index)}>
                    Start
                  </Button>
                )}
                <Button
                  variant="warning"
                  onClick={() =>
                    handleEditClick(
                      index,
                      prompt('Enter new task name:', task.name),
                    )
                  }
                  style={{ marginLeft: '10px', marginRight: '10px' }}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteClick(index)}>
                  Delete
                </Button>
                <Button
                  variant="primary"
                  onClick={() => alert(`Total time for task ${task.name}: ${formatTime(task.timeElapsed)}`)}
                  style={{ marginLeft: '10px' }}
                >
                  Show total time
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <div>Total Time Elapsed: {formatTime(getTotalTime())}</div> */}
    </div>
  );
};

export default TaskTable;