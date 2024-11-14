const express = require('express')
const path = require('path')
const app = express()
const port = 3000


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const events = [
  {
    "title": "Coldplay World Tour",
    "description": "Experience the magic of Coldplay's live performance in cities worldwide.",
    "image": "/images/concert.png"
  },
  {
    "title": "Taylor Swift: Eras Tour",
    "description": "Join Taylor Swift as she performs songs from all of her albums in an unforgettable show.",
    "image": "/images/concert.png"
  },
  {
    "title": "Ed Sheeran Live",
    "description": "Catch Ed Sheeran live as he performs his chart-topping hits in your city.",
    "image": "/images/concert.png"
  },
  {
    "title": "The Weeknd After Hours Tour",
    "description": "The Weeknd brings his After Hours Tour to the stage with stunning visuals and hits.",
    "image": "/images/concert.png"
  },
  {
    "title": "Adele's 30 Tour",
    "description": "Adele returns to the stage with her powerful voice and new hits from her album '30'.",
    "image": "/images/concert.png"
  }
];

app.get('/home', (req, res) => {
  const data = { title: 'Ticket Sales', message: 'Buy your ticket now!', events: events};
  res.render('index', data);
});

app.get('/admin', (req, res) => {
  const data = {title: 'Admin Dashboard'}
  res.render('admin', data)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})