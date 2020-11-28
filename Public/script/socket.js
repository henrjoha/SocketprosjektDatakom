
const port = 5000;
const IPaddr = '192.168.68.122';

const socket = io.connect(`${IPaddr}:${port}`, {secure: false});

//Gir bare informasjon ved tilkobling
socket.on('connect', () => { 
    console.log('Client has connected to the server!'); 
});
socket.on('clientConnected', (id, ip) => { 
    console.log('Client recevied ID: ' + id);
    console.log("Client IP: " + ip);

});

//Oppdaterer grafen på siden
socket.on('data', (data) => { 
    //    console.log('Data was received: ' + data);
    //    console.log(Number(data));
        var middleman=data.split(" ", 2)
            if(middleman[0]==1){
                dataArr1.push(middleman[1]); 
                console.log(middleman[1]);
            }
                
            
            if(middleman[0]==2){
                dataArr2.push(middleman[1]);  
                console.log(middleman[1]);
            }
    
            if(middleman[0]==3){
                dataArr3.push(middleman[1]);  
                console.log(middleman[1]);
            } 
                
    
            if(middleman[0]==4){
                dataArr4.push(middleman[1]);  
                console.log(middleman[1]);
            }
    });
    

//emitter en endring 
function changeLEDState(state) {
    socket.emit('changeLEDState', state); 
    console.log("changeLEDState called");

}

//emitter datareq med interval
function requestDataFromBoard(interval) {
    socket.emit('requestDataFromBoard', interval); 
    console.log("requestDataFromBoard was called with intervall: " + interval);
}

//emitter stopdata
function stopDataFromBoard() { 
    socket.emit('stopDataFromBoard'); 
    console.log("stopDataFromBoard was called");
}
