# Lagre highscoren til alle spillerne. 
Alle som registrerer seg kan se alle andre registrerte spillere sin highscore nederst på siden.

## Plan:
Før du får spille første gang må du registrere et brukernavn.

Når du er registrert blir "userRegistered": true, i 'userRegistered.json', denne filen er indiviuell for hver spiller. 

Brukernavnet blir lagret i localstorrage og brukes til å lagre spilleren sin highscore slik at den kan vises til alle andre som spiller uavhengig maskin. 

Spillerene sin highscore vises i diven "spillereDiv", sortert etter hvem som har høyest score.

Vi bruker en "for løkke" til å lage diver for hver spiller, se "getUserData.js". 

Dersom du slår din gamle highscore så blir den oppdatert i highscore.json. 

Dersom du slår en annen spiller skal du få beskjed om det. 

Dataen om spilleren lagres i en JSON fil. 

### Note:
Nå kan du registrer deg for å så bli sendt videre til spillet. 

Programmet husker på hvem du er via localStorage. 

Med getUserData.js laster vi inn brukerne med "loadJSON('all')" fra highscore.json og bruker en "for-løkke" til å lage en egen div for hver bruker med sin highscore på siden i #spillereListe. 

Når du slår din tidligere score blir den oppdatert med en gang i highscore.json, og det blir oppdatert på skjermen. 

Alt funker strålende nå, det som magler er å sortere spillerene etter score, og finne ut hvem av spillerene sin highscore du har passert, og en animasjon som vises på skjermen som viser hvem du har slått. 

# Requirements:
Må ha node instalert for å kunen jobbe med serveren. https://nodejs.org/en/

Bruker "fs" (file system) til å skrive inn i JSON filen. (inkludert i nodejs)

Bruker "express" til serveren. (må instaleres) npm install express --save

Bruker "cookie-parser" til å lagre og laste inn cookies når brukeren registrer seg. (må instaleres) npm install cookie-parse --save

Bruker p5.js for å laste inn JSON dataen via serveren, har linket til koden øverst i begge index.html filene. 
