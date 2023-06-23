import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const TaskForm = ({ onTaskAdded }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const task = { name };
    try {
      const config = {
        headers: { Authorization: `Bearer ${await localStorage.getItem('token')}` }
      };
      const response = await axios.post(`http://localhost:3000/tasks`, task, config);
      onTaskAdded(response.data);
      setName('');
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div style={{ position: 'relative', left: '15%' }} className='py-3 '>
        <Form.Group controlId="formTaskName" className='col-8' style={{ float: 'left' }}>
          {/* <Form.Label>Task Name</Form.Label> */}
          <Form.Control

            type="text"
            placeholder="Enter task name"
            value={name}
            onChange={handleNameChange}
          />
        </Form.Group>
        {/* <div style={{width:"2%"}}></div> */}
        <Button variant="primary" type="submit" >
          Add Task
        </Button>
      </div>
      {/* {tasksUpdated && <p>Tasks updated</p>} */}
    </Form>
  );
};

export default TaskForm;