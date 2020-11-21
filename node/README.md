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
Når kan du registrer deg for å så bli sendt videre til spillet. 

Programmet husker på hvem du er via localStorage. 

Med getUserData.js laster vi inn brukerne med '/all' fra highscore.json og bruker en "for-løkke" til å lage en egen div for hver bruker med sin highscore på siden i #spillereListe. 

Det som gjenstår er å oppdatere highscoren din dersom du får en høyere score enn din tidligere score. 
Mulig vi må bruke 'fs' for dette og det KAN lage noen problemer, må tenke litt på dette. 

# Requirements:
Må ha node instalert for å kunen jobbe med serveren. https://nodejs.org/en/

Bruker "fs" (file system) til å skrive inn i JSON filen. (inkludert i nodejs)

Bruker "express" til serveren. (må instaleres) npm install express --save

Bruker p5.js for å laste inn JSON dataen via serveren, har linket til koden øverst i begge index.html filene. 
