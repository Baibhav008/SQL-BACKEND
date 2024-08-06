const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'userdb',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL DB');
});


app.post('/api/signup', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
        db.query(insertQuery, [email, username, hashedPassword], (err, result) => {
            if (err) 
            {
                console.error('Error inserting user:', err);
                res.status(500).json({ message: 'Error registering user' });
            } 
            else 
            {
                const user_id = result.insertId;

                res.status(200).json({
                    status: 'Account successfully created',
                    status_code: 200,
                    user_id: user_id,
                });
            }
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const getUserQuery = 'SELECT * FROM users WHERE username = ?';
      db.query(getUserQuery, [username], async (err, rows) => {
        if (err || rows.length === 0) {
          res.status(401).json({ status: 'User not found', status_code: 401 });
        } else {
          const user = rows[0];
          console.log('Stored password:', user.password);
          console.log('Provided password:', password);
          const passwordMatch = await bcrypt.compare(password.trim(), user.password);
          console.log('Password match:', passwordMatch);
  
          if (passwordMatch) {
            const token = jwt.sign({ user_id: user.user_id }, 'key', { expiresIn: '1h' });
            res.status(200).json({
              status: 'Login successful',
              status_code: 200,
              user_id: user.user_id,
              access_token: token,
            });
          } else {
            res.status(401).json({ status: 'Incorrect username/password provided. Please retry', status_code: 401 });
          }
        }
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Error during login' });
    }
  });


  

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
