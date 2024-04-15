const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const User = require('./models/user.model.js');
const Note = require('./models/note.model.js');

const app = express();

app.use(express.json());
app.unsubscribe(express.urlencoded({ extended: false }));


app.use(cors({
    origin: 'http://localhost:19006'
}));



// test server working
app.get('/', (req, res) => {
    res.send('Server Test Request: Showed');
});


// set Data
app.post('/api/user', async (req, res) => {
    // console.log(req.body);
    // res.send('Data Received');
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ messege: console.err.messege });
    }
});

// View all Data
app.get('/api/user', async (req, res) => {
    // console.log(req.body);
    // res.send('Data Received');
    try {
        const user = await User.find({});
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ messege: console.err.messege });
    }
});

// View user Data
app.get('/api/user/:email', async (req, res) => {
    // console.log(req.body);
    // res.send('Data Received');
    try {
        const { email } = req.params;
        // const user = await User.findById(id);
        const user = await User.find({ email: email });
        // if (user =! '[]') {
        //     res.status(500).json({ messege: "No data Found" });
        // } else {
        // }
        res.status(200).json(user);
        // console.log(res.json(user));
    } catch (err) {
        res.status(500).json({ messege: console.err.messege });
    }
});

// View user Data by name
// app.get('/api/user/name/:name', async (req, res) => {
//     // console.log(req.body);
//     // res.send('Data Received');
//     try {
//         const { name } = req.params;
//         const user = await User.find({ name: new RegExp(`^${name}`) });
//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json({ messege: console.err.messege });
//     }
// });


// update user Data
app.put('/api/user/:id', async (req, res) => {
    // console.log(req.body);
    // res.send('Data Received');
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user) {
            return res.status(404).json({ messege: "Data Not Found" });
        }
        const updateUser = await User.findById(id);
        res.status(200).json(updateUser);
    } catch (err) {
        res.status(500).json({ messege: console.err.messege });
    }
});

// Delete user Data
app.delete('/api/user/:id', async (req, res) => {
    // console.log(req.body);
    // res.send('Data Received');
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ messege: "Data Not Found" });
        }
        res.status(200).json("Data deleted Successfully");
    } catch (err) {
        res.status(500).json({ messege: console.err.messege });
    }
});



//note manage api part

// set Data
app.post('/api/note', async (req, res) => {
    try {
        const note = await Note.create(req.body);
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ messege: console.err.messege });
    }
});
// View all note Data
app.get('/api/note', async (req, res) => {
    try {
        const note = await Note.find({});
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ messege: console.err.messege });
    }
});
// View note Data
app.get('/api/note/:email', async (req, res) => {
    // console.log(req.body);
    // res.send('Data Received');
    try {
        const { email } = req.params;
        const note = await Note.find({ email: email });
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ messege: console.err.messege });
    }
});
// update note Data
app.put('/api/note/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndUpdate(id, req.body);
        if (!note) {
            return res.status(404).json({ messege: "Data Not Found" });
        }
        const updateNote = await Note.findById(id);
        res.status(200).json(updateNote);
    } catch (err) {
        res.status(500).json({ messege: console.err.messege });
    }
});
// Delete note Data
app.delete('/api/note/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id);
        if (!note) {
            return res.status(404).json({ messege: "Data Not Found" });
        }
        res.status(200).json("Data deleted Successfully");
    } catch (err) {
        res.status(500).json({ messege: console.err.messege });
    }
});

//mongodb+srv://<username>:<password>@cluster0.vbaw8.mongodb.net/<database_name>?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://kavidubimsara:Hunter12045@notesketch.avna9ib.mongodb.net/notepadDB?retryWrites=true&w=majority&appName=NoteSketch")
    .then(() => {
        console.log('Connected to the database!');
        app.listen(3000, () => {
            console.log('server is running on port 3000');
        });

    }).catch(() => {
        console.log("Connection Failed!!");
    });