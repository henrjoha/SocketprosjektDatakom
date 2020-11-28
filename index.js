
const express = require("express");
const app = express();
const assert = require("assert");
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

var admin = require("firebase-admin"); 

app.use(express.static('Public'));  
app.use(express.json()); 
app.use(express.urlencoded({extended: false}))

const serverPort = 5000;


const dbname = "datakom-prosjekt-1";
const dbuser = "henrjoha"
const adminurl = `/home/${dbuser}/socketprosjekt/${dbname}-firebase-adminsdk-f9ex6-7f320e57ef.json`;

const serviceAccount = require(adminurl);
//$env: GOOGLE_APPPLICATION_CREDENTIALS='/home/henrjoha/socketprosjekt/datakom-prosjekt-1-firebase-adminsdk-f9ex6-7f320e57ef.json'
var fAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //credential: admin.credential.applicationDefault(),
  databaseURL: `https://${dbname}.firebaseio.com`
});


var db = fAdmin.database();

server.listen(serverPort, function(){ //Here we tell the server to start listening (open) on the port we earlier defined
    console.log('listening on *:' + serverPort);
});


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


io.on('connection', (socket) => {

    var regDate = getDateAsString(); //Get the register date
    var currentTime = getTimeAsString(); //Get the register time

    var clientID = socket.id;
    var client = io.sockets.connected[clientID]; 
    var clientIPRAW = client.request.connection.remoteAddress; 
    var IPArr = clientIPRAW.split(":",4);

    io.emit("clientConnected", clientID, IPArr[3]);
    console.log(`Klient tilkoblet: ${IPArr[3]}`)
    socket.on('changeTurnState', function(state) {

        io.emit('TurnStateChange', state);
        app.post('TurnstateChange', state);
		console.log('user ' + clientID + ' changed the Turn state to: ' + state);

	    });
    var timers = [];
    socket.on('requestDataFromBoard', function(interval) { 
        console.log('user ' + clientID + ' requested data with interval (ms): ' + interval);
        if (interval > 99) { //if the timeinterval is not more than 100ms it does not allow it to start
            timers.push( //If an actual argument is given (a time period) it starts the timer and periodically calls the function
                setInterval(() => { //If an actual argument is given (a time period) it starts the timer and periodically calls the function
                    io.emit('dataRequest', 0); //Send "dataRequest" command/function to all ESP32's
                }, interval)
            );
        } 
        else {
            console.log("too short timeintervall");
        }
    });

    socket.on('stopDataFromBoard', () => { //This function stops all the timers set by a user so that data will no longer be sent to the webpage
        console.log('user ' + clientID + ' cleared data request interval');

        for (var i = 0; i < timers.length; i++) {//For loop to clear all set timers
            clearTimeout(timers[i]); //Cleartimer is the same as stopping the timer, in this case we clear all possible timers previously set
        }

    });


    socket.on('dataFromBoard', (data) => { //This is function that actually receives the data. The earlier one only starts the function.

        // var sensdata = data.splt(' ', 2);

        io.emit('data', data); //Everytime a "dataFromBoard" tag (with data) is sent to the server, "data" tag with the actual data is sent to all clients
        //This means the webbrowser will receive the data, and can then graph it or similar.
        console.log('user ' + IPArr[3] + ' delivered: ' + data);  

        db.ref('sensordata/'+ "sensor_1/"/* + regUID*/).push({ //One can store data in a subdirectory for the user in sensordata by removing the comment inside .ref
            /* UID: regUID, If you choose to have data ownership stored per entry the microcontroller would have to be authenticated */
              _id: IPArr[3], //You could add an ekstra variable to every dataFromBoard transmission with a microcontrollerID to lessen the need for authentication
              data: data, //This would be the sensor data, eg a temperature datapoint
              logged_at: regDate + "-" + currentTime, //When is the data taken, both date and time
          }).then((snap) => { //When the data has been successfully saved
              console.log("Data lagret i database");
          });
    });

});
