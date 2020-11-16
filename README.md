# Stein, saks papir spill - Gruppeoppgave
Stein, saks, papir spill mot maskinen.

## Div med Stein, saks, papir knapper. 
Diven må bestå av tre diver som får innerHTML "stein"( font-size blir på 0% fordi vi vil ikke se teksten) osv slik at det blir lett for oss å sjekke hvilke du har trykket på i ‘’SjekkSSP’’ funksjonen 
Alle divene må ha klassenavnet "SSP" slik at vi kan senere sjekke i ‘’SjekkSSP’’ at du har trykket på en av de tre inputene. 

## Funksjon (rndSSP) som returnerer stein/saks/papir som er maskinen sitt valg. 
Tar inn en array: const SSP = ['stein', 'saks', 'papir'], og genrerer et tilfeldig tall mellom 0 og lengden av arrayen. Derretter returnerer den SSP[0 / 1 / 2];

## Funksjonen SjekkSSP() 
Finner ut hvilke av stein/saks/papir du har trykket på, og lager en variabel med maskinen sin tilfeldige stein/saks/papir. 

Inni funksjonen så må vi sjekke at du har trykket på noe med klassenavnet "SSP".
Dersom det stemmer kan vi først sjekke om du har trykket på er den samme som maskinen har valgt. Hvis det stemmer så blir det uavgjort, og ingen får poeng. Bakgrunnsfargen skifter til gul også tilbake til vanlig i løpet av 500ms. 

Hvis den du har trykket på ikke er lik den som maskinen har valgt må vi finne ut om din slår maskinen eller om den slår deg, da får vinneren poeng. Vinner du blir bakgrunnsfargen grønn også skrifter den tilbake ila 500ms. Taper du blir bakgrunnsfargen rød også skifter den tilbake ila 500ms. 

## Pseudokode
### 1. Brukeren åpner siden og siden sjekker i localStorrage om spilleren har lagret noen highscores tidligere. 

        1.10 Dersom den har det blir det hentet ut og vises i headeren, da kan du se tidligere high score. 

### 2. Brukeren trykker på en av de tre valgene 'stein', 'saks', 'papir'.
        2.10 Programmet registerer hvilke av de spilleren har trykket på.

        2.20 Programmet kjører funksjonen rndSSP(); og får en tilfeldig stein / saks / papir. Dette blir maskinen sitt valg. 

        2.30 Programmet sjekker om den du har trykket på er den samme som maskinen.

            2.31 Det blir uavgjort. 

        2.40 Programmet sjekker om du vinner eller taper. 

            2.41 Programmet endrer bakgrunnsfargen til den du har trykket på bassert på om du vinner, taper eller det blir uavgjort. 

        2.50 Programmet oppdaterer antall wins, losses, winstreak, og score. 

### 3. Dersom summen av dine wins og losses blir 20. 
        3.10 Vi gir beskjed om du har vunnet eller tapt. 

        3.11 Scoren din blir lagret i en array, med dine andre scores. 

        3.12 wins, losses, winstreak og score blir til 0 og spillet starter på nytt

        3.12 Hvis scoren din er større enn din gamle score:
        
            3.121 HigscoreDiv blir oppdatert. 