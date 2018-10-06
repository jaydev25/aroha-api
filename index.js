const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const app = express();
const migrations = require('./storage/migration');


const morgan = require('morgan');
const passport = require('passport');
const config = require('./api/config/' + process.env.NODE_ENV);
const cors = require('cors');

const hookJWTStrategy = require('./middlewares/passport');
app.use(passport.initialize());

// Hook the passport JWT strategy.
hookJWTStrategy(passport);

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('hit', (message) => {
    console.log(message);
    io.emit(message);
  });
});

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(cors())
app.use(morgan('dev'));
app.use(require('./api'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
migrations.runMigration().then(() => {
  server.listen(PORT, () => console.log(`Listening on ${ PORT }`))
});

