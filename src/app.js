import express from "express";
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const flash = require('express-flash');
import userRoutes from "./routes/userRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import cors from "cors";
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
//import isAuth from "./middleware/auth";
var morgan = require('morgan');
require("dotenv").config();
require('./database');
const app = express();

const store = new MongoDBSession({
 uri: process.env.DATABASE_URL,
 collection: 'mySessions'
})

app.use(session({
  name: process.env.SESS_NAME,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie:{
    maxAge: 3 * 24 * 60 * 60,
    sameSite: true
  }
})
);
app.use(flash());
app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(bodyParser.json());
//set morgan to log info about requests for development use.
app.use(morgan('dev'));
app.use(express.json()); //parse JSON body from HTTP request
app.use(cors());
app.use(userRoutes);  //import and use routes
app.use(applicationRoutes); //import and use application form routes

//static files
app.use(express.static(path.join(__dirname, "public")));

//Handlebars setting
app.engine('.hbs', exphbs({ defaultLayout: false, extname: '.hbs' }));
app.set('views', path.join(__dirname, 'views'));
//view engine
app.set('view engine', '.hbs');

  app.get('/', (req, res) => {
  // req.session.isAuth = true;
    /*console.log(req.session);
    console.log(req.session.id);*/
    res.render("homepage");
  });
   app.post('/logout', (req, res) => {
     req.session.destroy((error) =>{
       if(error) throw error;
       res.redirect('/homepage')
     });
   })
   //retrieving
   app.get('/form', function(req, res){
    Application.find(function(err, response){
        console.log(response);
     });
    });
  
  export default app;