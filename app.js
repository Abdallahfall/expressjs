const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
function checkBusinessHours(req, res, next) {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hourOfDay = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay <= 17) {
    next();
  } else {
    res.status(403).send('L\'application n\'est disponible que pendant les heures ouvrables.');
  }
}

app.use(express.static('public')); 
app.use(checkBusinessHours); 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html');
});

app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});
