const express = require('express');
const { join } = require('path');

const app = express();

app.use(express.json());
app.use(express.static(join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))

const container = [];

app.post('/user', (req, res) => {
    
    container.push({
        req.body
    })
    res.send(``)
})

app.get('/user', (req, res) => {
    const nombre = req.body.nombre;
    const email = req.body.email;
    container.push({
        nombre,
        email
    })
    res.send(``)
})

app.get('/users', (req, res) => {
    res.sendFile(__dirname +'/public' +'/datos.html')
    
});

app.listen(4000, console.log('Server running ...'));


