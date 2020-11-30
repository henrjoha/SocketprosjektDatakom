# Systemoppsett beskrivelse
I denne seksjonens skal vi gå gjennom oppsettet av systemet, vi skal vise hvordan man laster ned nødvendige moduler og hvordan disse brukes. Dette skal være nokk til å kunne kjøre koden gitt fra github. Vi kjørte server siden på en laptop med Ubuntu 20.04.1 LTS operativsystem, og esp32 modulen som sensor klient. Vi anbefaler dette hvis prosjektet skal bli replikert.

For å skjekke hvilken version av Ubuntu som foreløpig kjører på din maskin, åpne terminal ved å trykke "Ctrl+Alt+T".

```
lsb_release -a 
```
## Installere Node.js og moduler

Oppdater pakker og installer `Node.js`
```
cd ~
apt-get update
apt-get install nodejs
```

Installer (Node Package Manager)`npm`
```
sudo apt get install npm
```
Lag en prosjekt mappe og `cd` inn til mappen
```
mkdir <din_prosjektmappe>
cd <din_prosjektmappe>
```
Bruk `npm init` for å initialisere mappen for `Node.js`
```
npm init
```
Følg beksrivelsen og pass på at `entry point` er satt til `index.js` og ikke `app.js`.

Installer "dependencies"
```
sudo npm i express firebase-admin socketio nodemon assert http
```
## Last ned koden

Last ned filene som zip og ekstrakter alt inn i prosjekt mappen som ble laget tidligere.

For at koden skal kunne kjøre fra en annen enhet, må `IPaddr` under `Public/script/socket.js` endres til din egen. 

## Sett opp ESP32
For å laste over koden til Esp32 modulen brukte vi Arduino IDE. Den kan lastes ned fra arduino.cc.\\

Pakk ut filene og kjør instalasjon
```
  cd Downloads
  tar -xf arduino-1.8.13-linuxaarch64.tar.xz -C /home/$USER/
  cd ..
  cd arduino-1.8.13
  ./install.sh
```
Deretter kan du skrive «arduino» i en terminal, eller se om en snarvei har blitt laget på skrivebordet.

For å laste opp kode til ESP32 kontrollerne må man først legge inn riktig kode og deretter laste den opp. Husk å ha mikrokontrolleren plugget inn i en USB mens dette foregår. 

For å få eksempelkoden til å kjøre må man ha installert `Wifi.h` og `WifiMulti.h` samt SocketIoClient bibliotekene. Disse kan installeres via Arduino IDE, eller man kan laste de ned selv og putte de i libraries mappen i arduino mappen, gjør man ikke dette får man en error og koden kompilerer ikke.

For at esp32 modulen skal kunne tilkobles en annen webserver må IP addressen endres til webserveren sin. Det samme gjelder ssid og wifi passord som må tilsvare nettverket det er på.
