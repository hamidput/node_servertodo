const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL connection configuration
const dbConfig = {
  host: 'your-mysql-host',
  user: 'your-mysql-username',
  password: 'your-mysql-password',
  database: 'todo_list_db',
};

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM tasks');
    connection.end();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Add a new task
app.post('/tasks', async (req, res) => {
  const taskName = req.body.taskName;
  if (!taskName) {
    return res.status(400).json({ error: 'Task name is required' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute('INSERT INTO tasks (task_name) VALUES (?)', [taskName]);
    connection.end();
    res.json({ id: result.insertId, taskName: taskName });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute('DELETE FROM tasks WHERE id = ?', [taskId]);
    connection.end();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
