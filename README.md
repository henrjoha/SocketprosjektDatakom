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

Last ned Arduino IDE fra https://www.arduino.cc/en/software

```
sudo usermod -a -G dialout $USER && \
sudo apt-get install git && \
wget https://bootstrap.pypa.io/get-pip.py && \
sudo python get-pip.py && \
sudo pip install pyserial && \
mkdir -p ~/Arduino/hardware/espressif && \
cd ~/Arduino/hardware/espressif && \
git clone https://github.com/espressif/arduino-esp32.git esp32 && \
cd esp32 && \
git submodule update --init --recursive && \
cd tools && \
python3 get.py
```
