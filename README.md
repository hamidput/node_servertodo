# node_servertodo
## Step 1: Install dependency 
   command: npm install
## Step 2 : Run server
   command : node server.js

   ----------------------------------------------------------------
   Create Table task
   CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task_name VARCHAR(255) NOT NULL,
  completed TINYINT NOT NULL DEFAULT 0
);

