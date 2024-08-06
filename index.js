const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
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



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
