# Lagre highscoren til alle spillerne. 
Alle som registrerer seg kan se alle andre registrerte spillere sin highscore nederst på siden.

## Plan:
Før du får spille første gang må du registrere et brukernavn.

Brukernavnet brukes til å lagre spilleren sin highscore slik at den kan vises til alle andre som spiller uavhengig maskin. 

Spillerene sin highscore vises i diven "spillereDiv", sortert etter hvem som har høyest score.

Vi bruker en "for løkke" til å lage diver for hver spiller, se "getUserData.js". 

Dersom du slår en annen spiller skal du få beskjed om det. 

Dataen om spilleren lagres i en JSON fil. 

#### Note:
Serveren funker nå til å registrere spillere i databasen (highscore.JSON). Skal hente ut dataen i "getUserData.js" med "loadJSON('/all')", også lage en array med navnene og et object med scorene lagret i highscore.JSON.  

# Requirements:
Må ha node instalert for å kunen jobbe med serveren. https://nodejs.org/en/

Bruker "fs" (file system) til å skrive inn i JSON filen. (inkludert i nodejs)

Bruker "express" til serveren. (må instaleres) npm install express --save

Bruker p5.js for å laste inn JSON dataen via serveren. (Må lastes ned) https://p5js.org/download/