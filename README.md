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
sudo npm i express firebase-admin socketio nodemon assert
```

