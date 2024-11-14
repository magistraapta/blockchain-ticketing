const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const events = require('./events')

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/home', (req, res) => {
  const data = { title: 'Ticket Sales', message: 'Buy your ticket now!', events: events};
  res.render('index', data);
});

app.get('/admin', (req, res) => {
  const data = {title: 'Admin Dashboard'}
  res.render('admin', data)
})

app.get('/event/:id', (req, res) => {
  const eventId = req.params.id;
  const event = events.find(event => event.id == eventId);
  
  if (event) {
    res.render('detail', {title:"Detail Page", event: event });
  } else {
    res.status(404).send('Event not found');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})