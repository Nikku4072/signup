const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const users = []; // Dummy database to store registered users

app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;
    
    // Simple validation
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if the email is already registered
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Store the user in the database (in this case, in-memory array)
    const newUser = { name, email, password };
    users.push(newUser);

    return res.status(201).json({ success: true, message: 'User registered successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
