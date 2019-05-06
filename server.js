const ip = require("ip");
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const auth = require("@dreamz11/auth")
const path = require('path');

app.set('views', './views'); //Configuramos el directorio de vistas
app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({extended : false})); //Para recuperar parámetros de peticiones post

app.use(session({
  secret: 'verySecureSecret',
  resave: true,
  saveUninitialized: true,
}));

app.use('/', auth({
  passwordFile: path.join(__dirname, 'users.json'),
  pathToProtect: ('./dist','../../'),
  registerView: 'register',
  successRegisterView: 'registerSuccess',
  errorRegisterView: 'registerError',
  loginView: 'login',
  successLoginView: 'loginSuccess',
  errorLoginView: 'loginError',
  logoutView: 'logout',
  unauthorizedView: 'unauthorizedView'

}));

app.get('/', function(req,res){
  res.render('index');
});

app.get('/content', function(req,res){
  res.render('../dist/content');
});



// listen on all addresses
const server = app.listen(process.env.PORT||8080, '0.0.0.0', function () {

  const host = server.address().address;
  const port = server.address().port;

  console.log('Server with sessions and auth listening at http://%s:%s my ip = %s', host, port, ip.address());

});
