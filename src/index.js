const express = require('express');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
const users = [];

// Create User
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    // is valid
    if (!name || !email) {
        return res.status(400).json({ error: 'Both name & email are required' });
    }

    const newUsr = {
        id: uuidv4(),
        name,
        email
    };

    users.push(newUsr);

    return res.status(201).json(newUsr);
});

//get user via ID
app.get('/users/:id', (req,res) => {
    const {id} = req.params;
    const user = users.find( u => u.id == id);

    //if the user doesnt exist, give err
    if (!user){
        return res.status(404).json({error: 'user doesn\'t exist'})
    }

    //user does exist, return 200 
    return res.status(200).json(user);
})

//update a user with their ID
app.put('/users/:id',(req,res) => {
    const {id}= req.params;
    const {name, email}=req.body;

    //make sure both email and name exist
    if (!name || !email) {
        return res.status(400).json({ error: 'Both name & email are required' });
    }

    //find user
    const userindex= users.findIndex(u => u.id === id);

    //if the user doesnt exist, give err
    if (userindex === -1) {
        return res.status(404).json({ error: 'user doesn\'t exist' })
    }

    users[userindex] = {id,name,email};

    return res.status(200).json(users[userindex]);

})

//delete a user w/ their id

app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    // Remove user from array
    users.splice(userIndex, 1);

    // Success, no content
    return res.status(204).send();
});



app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing