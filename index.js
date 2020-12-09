//laster inn moduler 
const express = require("express");
const app = express();
const assert = require("assert");
const server = require("http").createServer(app); // starter en http server
const io = require("socket.io").listen(server);//starter en socket server over http serveren 

var admin = require("firebase-admin"); 


app.use(express.static('Public'));  //express gjør index.html tilgjengelig via mappestruktur
app.use(express.json()); 
app.use(express.urlencoded({extended: false}))


const serverPort = 5000;

const dbname = "datakom-prosjekt-1";
const dbuser = "henrjoha"
const adminurl = `/home/${dbuser}/socketprosjekt/${dbname}-firebase-adminsdk-f9ex6-7f320e57ef.json`;

// oppsett av firebase
const serviceAccount = require(adminurl);
//$env: GOOGLE_APPPLICATION_CREDENTIALS='/home/henrjoha/socketprosjekt/datakom-prosjekt-1-firebase-adminsdk-f9ex6-7f320e57ef.json'
var fAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //credential: admin.credential.applicationDefault(),
  databaseURL: `https://${dbname}.firebaseio.com`
});

var db = fAdmin.database();

//starter å lytte etter tilkoblinger på serverPort
server.listen(serverPort, function(){
    console.log('listening on *:' + serverPort);
});

// for dato
function getDateAsString() {
    var currentDate = new Date(); //We use the JavaScript Date object/function and then configure it
    var currentMonth;
    var currentDay;

    if(currentDate.getMonth() < 10) {
        currentMonth = "0" + String(currentDate.getMonth());
    } else {
        currentMonth = String(currentDate.getMonth());
    }

    if(currentDate.getDay() < 10) {
        currentDay = "0" + String(currentDate.getDay());
    } else {
        currentDay = String(currentDate.getDay());
    }

    var date = currentDate.getFullYear() + "-" + currentMonth + "-" + currentDay;
    return date; //returns the date string
}
// for klokkeslett
function getTimeAsString() {
    var currentTime = new Date(); //We use the JavaScript Date object/function and then configure it

    var currentHour;
    var currentMinute;
    var currentSecond;

    if(currentTime.getHours() < 10) {
        currentHour = "0" + String(currentTime.getHour());
    } else {
        currentHour = String(currentTime.getHours());
    }

    if(currentTime.getMinutes() < 10) {
        currentMinute = "0" + String(currentTime.getMinutes());
    } else {
        currentMinute = String(currentTime.getMinutes());
    }

    if(currentTime.getSeconds() < 10) {
        currentSecond = "0" + String(currentTime.getSeconds());
    } else {
        currentSecond = String(currentTime.getSeconds());
    }

    var time = currentHour + "-" + currentMinute + "-" + currentSecond;
    return time; //returns the time string
}


// //sletter gammel data
// var hour = 1; //timer til data blir slettet
// var oldref = db.ref('https://console.firebase.google.com/project/datakom-prosjekt-1/database/datakom-prosjekt-1/data/~2Fsensordata~2Fsensor_1');
// var now = Date.now();
// var cutoff = now - hour * 60 * 60 * 1000;
// var old = oldref.orderByChild('logged_at').endAt(cutoff).limitToLast(1);
// var listener = old.on('child_added', function(snapshot) {
//     snapshot.oldref.remove();
// });


// Kjører for klient tilkobling 
io.on('connection', (socket) => {

    var regDate = getDateAsString(); //Get the register date
    var currentTime = getTimeAsString(); //Get the register time

    var clientID = socket.id;
    var client = io.sockets.connected[clientID]; 
    var clientIPRAW = client.request.connection.remoteAddress; 
    var IPArr = clientIPRAW.split(":",4);
	
    io.emit("clientConnected", clientID, IPArr[3]); // gjør clientConnected tilgjengelig for alle på samme port via socket.io
    console.log(`Klient tilkoblet: ${IPArr[3]}`) 
	
    socket.on('changeTurnState', function(state) { //kjører på endring i turnstate
        io.emit('TurnStateChange', state);
        app.post('TurnstateChange', state);
	console.log('user ' + clientID + ' changed the Turn state to: ' + state);
    });
	
    var timers = [];
	// bestemer om requestDataFromBoard er valid og emiter dataRequest om time interval er lang nokk.
    socket.on('requestDataFromBoard', function(interval) { 
        console.log('user ' + clientID + ' requested data with interval (ms): ' + interval);
        if (interval > 99) {
            timers.push(
                setInterval(() => {
                    io.emit('dataRequest', 0); 
                }, interval)
            );
        } 
        else {
            console.log("too short timeintervall");
        }
    });

    socket.on('stopDataFromBoard', () => {// stpper data ved å cleare timeren 
        console.log('user ' + clientID + ' cleared data request interval');
        for (var i = 0; i < timers.length; i++) {
            clearTimeout(timers[i]); 
        }

    });
 
    socket.on('dataFromBoard', (data) => { //Mottar data
        // var sensdata = data.splt(' ', 2);
        io.emit('data', data); //Everytime a "dataFromBoard" tag (with data) is sent to the server, "data" tag with the actual data is sent to all clients
        //This means the webbrowser will receive the data, and can then graph it or similar.
        console.log('user ' + IPArr[3] + ' delivered: ' + data);  

        db.ref('sensordata/'+ "sensor_1/"/* + regUID*/).push({ //lagrer data til databasen i firebase.
              _id: IPArr[3], 
              data: data, /
              logged_at: regDate + "-" + currentTime, 
          }).then((snap) => { 
              console.log("Data lagret i database");
          });
    });
});
