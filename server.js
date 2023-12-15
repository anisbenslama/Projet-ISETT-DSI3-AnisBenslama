const express = require('express')
const app = express()
const port = 3000
const path = require('path');
var exphbs =  require('express-hbs');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'news'
});

app.engine('hbs', exphbs.express4({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  connection.query('SELECT * FROM actualites ORDER BY date_publication DESC',(err, results) => {
    if (err) throw err;
    res.render('accueil', {actualites: results});
  });
  
});

app.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "views/add.html"));
});

  app.get("/addnews", function(req, res) {
    var untitre = req.query.titre;
    var unedesc = req.query.description;
    var sql = "insert into actualites(titre, description) values(?, ?)"
    
    connection.query(sql, [untitre, unedesc], function(error, results, fields) {
        res.redirect('/');
    })
});
  

  connection.connect((err) => {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to the database');
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }) 