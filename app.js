var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
// Import du middleware
const getRoleMiddleware = require('./utils/getRoleMiddleware');

// import Models
const models = require('./Models');

// Port prod ou dev
const port = process.env.PORT || 3900;

// Mongodb variable
const mongoose = require('mongoose');

// Connection à la BDD
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Variable Serveur
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_MDP;
const cluster = process.env.MONGO_CLUSTER;
const dbname = process.env.MONGO_DATABASE;
const localHostMongoDB = `mongodb://127.0.0.1:27017/api-nutritionniste`;
const urlMongoDBExterne = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;

// Connection
mongoose.connect(urlMongoDBExterne, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', function () {
  console.log('Echec de connection à la BDD');
});
db.once('open', function () {
  console.log('Connected to BDD server successfully');
});

// Les routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recetteRoute = require('./routes/recette');
const allergnRoute = require('./routes/allergn');
const regimeRoute = require('./routes/regime');
const formContactRoute = require('./routes/contact');

var app = express();

// Crée les modèles
app.set('models', models);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(getRoleMiddleware);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
// Regle le problème d'accès au serveur par proxy full access
app.use((req, res, next) => {
  req.accepts('application/json');
  res.header('Access-Control-Allow-Methods', 'POST, GET');
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, X-Requested-With'
  );
  next();
});

// Routes
app.use('/', indexRouter);
usersRouter(app);
recetteRoute(app);
allergnRoute(app);
regimeRoute(app);
formContactRoute(app);

// Vérifier l'état du serveur
app.listen(port, () => {
  console.log(`Server sucessfully launched on port ${port}`);
});

module.exports = app;
