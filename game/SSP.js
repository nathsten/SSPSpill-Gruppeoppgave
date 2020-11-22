// @ts-check

/**
 * Forkortelse for document.getElementById("idName");
 * Kunne også ha vert skrevet slik:
    function $(id){
        return document.getElementById(id);
    }
 * Den må ikke hete "$", men det er bare et typisk tegn for å hente data (ligner på jquery);
 * @param {string} id
 * @returns {object}
 */
// @ts-ignore
const $ = (id) => document.getElementById(id);


// Kobling til SSPDiv, denne inneholder de tre inputene for SSP på nettsiden
const SSPDiv = $("SSPDiv");
//Vi lager resten av koblingene nedover her:
const winstreakDiv = $("winstreak");
const winsDiv = $("wins");
const loosesDiv = $("losses");
const highScoreDiv = $("highscore");
const scoreDiv = $("score");
const boksDiv = $("boks");
const correctSound = $("correctSound");
const wrongSound = $("wrongSound");


/** 
 * EventListener som kjører funskjonen sjekkSSP(); når du 
 * trykker på en av stein / saks / papir bildene på skjermen.
*/
SSPDiv.addEventListener("click", sjekkSSP);

// Globale variabler:
let wins = 0;
let losses = 0;
let score = 0;
let winstreak = 0;
let winstreakPoeng = 50;
const loseFarge = "rgba(245, 69, 38, 0.739)";
const winFarge = "rgba(136, 231, 27, 0.685)";
const uavgjortFarge = "rgba(255, 255, 0, 0.664)";
let highScoreArray = [0];

// Sjekker om vi allerede har en lagret highscore og legger den til i highScoreArray.
getFromLocalStorrage("scoreArray");

/** 
* Setter de ulike divene (winstreakDiv, winsDiv, loosesDiv, highScoreDiv) sin innerHTML
    til start verdien av wins, losses, winstreak, og scoren din.
* Denne kjøres når siden starter. 
*/
oppdatereLabels(wins, losses, winstreak, score);

/**
 * Funksjon som returnerer tilfeldig 'stein', 'saks', 'papir'.
 * @returns {String}
 * Skriver den som "const" fordi da kan vi ikke endre på funksjonen
 * ved et uheld senere.
 */
const rndSSP = () => {
    // En array med med lengde 0-2.
    const SSP = ['stein', 'saks', 'papir'];
    // Returnerer et tilfeldig tall mellom 0 og lengden av SSP arrayen (0 - 2).
    const rndTall = () => Math.floor(Math.random() * SSP.length);
    // Output blir SSP[0/1/2];
    const output = SSP[rndTall()];
    // Returnerer stein / saks / papir som en String
    return output;
}

/**
 * Funksjonen tar inn et HTMLElement som vi lager koblinger til ovenfor:
 * @param {HTMLElement} element
 * Fargen vi sender til funksjonen er en string: "rgba(214, 147, 79, 0.78)".
 * @param {String} farge
 * Her skal funksjonen først endre bakgrunnsfargen til elementet
    og bruke 250ms på det.
    Derretter venter den 250ms før den bruker nye 250ms
    til å endre tilbake til standard
 */
function endreFarge(element, farge){
    // Vi bruker CSS kommandoer på HTMLElementet som blir sendt inn. 
    // Først endrer vi background-color.
    element.style.backgroundColor = farge;

    // Vi venter 250ms, før vi endrer den tilbake til opprinnelig bakgrunnsfarge. 
    setTimeout(() => {
        element.style.backgroundColor = "rgba(0, 255, 255, 0.65)";
    }, 250);
} 

/**
 * Oppdaterer divene "#winstreak, #wins, #losses" sin innterHTML
    med tallene som blir tatt inn i parametrene (winsTall, lossesTall, winstreakTall).
    I utgangspunktet litt unødvendig å ta inn tallene i parameterene, men vi gjør det alikevel
    for treningen sin del.
 * @param {Number} winsTall
 * @param {Number} lossesTall
 * @param {Number} winstreakTall
 * @param {Number} scoreTall
 */
function oppdatereLabels(winsTall, lossesTall, winstreakTall, scoreTall){
    winsDiv.innerHTML = `Vunnet: ${winsTall}`;
    loosesDiv.innerHTML = `Tapt: ${lossesTall}`;
    winstreakDiv.innerHTML = `Winstreak: ${winstreakTall}`;
    scoreDiv.innerHTML = `Score: ${scoreTall}`;
    highScoreDiv.innerHTML = `HighScore: ${finnHighScore(highScoreArray)}`;
}

/**
 * Bruker en "for løkke" til å sortere ut det høyeste tallet 
 * i arrayen som blir tilsendt
 * Tar inn en array med tall
 * @param {Number[]} scoreList
 * Returnerer et enkelt tall (mulig vi skal gjøre det om til String)
 * @returns {Number}
 */
function finnHighScore(scoreList){
    let max = scoreList[0]; // Annta at den første verdien i arrayen er størt. 

    // "looper" igjennom arrayen.
    for(let i=0; i<scoreList.length; i++){
        // Dersom scoreList possisjon i (som er mellom 0 og lengden av scoreList)
        //  er større enn den som allerede er lagre som "max", endrer vi max til funnet tall.
        if(scoreList[i] > max) {
            max = scoreList[i];
        }
    }
    // Til slutt returnerer vi "max", som er den største verdien funnet i arrayen. 
    return max;
}

/**
 * Funskjonen tar inn de globale vaiablene "antallWins" og "antallLosses".
 * Dette er ikke nødvendig fordi de er globale variabler, 
 * men vi gjør det alikevel for treningen sin del.
 * @param {Number} winsTall
 * @param {Number} lossesTall
 */
function sjekkSeier(winsTall, lossesTall){
    /**
     * Funksjonen skal sjekke om summen av dine seiere og tap >= 20.
     * Dersom den er 20, finner vi ut hvem som har vunnet og lagrer highScoren din
     * Derretter må vi restarte scoren, wins, losses og winstreak og starte spillet på nytt. 
     */
    if(winsTall + lossesTall === 20){
        if(score > finnHighScore(highScoreArray)){
            updateUserScore(score);
        }
        highScoreArray.push(score);
        setToLocalStorrage("scoreArray", highScoreArray);
        wins = 0;
        score = 0;
        losses = 0;
        winstreak = 0;
        winstreakPoeng = 50;

        // Dersom boksDiv har en klasse fra før av tar vi den vekk. 
        boksDiv.className = "";
        // Bare for å restarte boksDiv. 
        void boksDiv.offsetWidth;
        // Gjør innerHTMLen tom slik at vi kan endre på den nedenfor. 
        boksDiv.innerHTML = "";
        // Sjekker km du har vunnet, tapt eller om det ble uavgjort. 
        if (winsTall > lossesTall) {
            boksDiv.className = "vant";
            boksDiv.innerHTML = "Du vant";
        } 
        else if (winsTall < lossesTall) {
            boksDiv.className = "tapt";
            boksDiv.innerHTML = "Du tapte";
        } 
        else if (winsTall === lossesTall) {
            boksDiv.className = "uavgjort";
            boksDiv.innerHTML = "Uavgjort";
        }
        // Venter i 2sekunder før den restarter score-divene.
        setTimeout(() => {
        oppdatereLabels(wins, losses, winstreak, score);
        }, 2000);
    }
}

/**
 * key (navnet til dataen vi lagrer i localStorrage) 
 * sender vi som en String "scoreArray".
 * @param {String} key
 * Vi tar inn og lagrer arrayen med tall som "item", dette må gjøres
 * om til en JSON String. ( JSON.stringify(item) )
 * @param {Number[]} item
 * Funksjonen skal lagre highScoreArray(eller den arrayen vi sender til den)
    i localStorrage vi bruker navet "scoreArray" som key. 
 */
function setToLocalStorrage(key, item){
    localStorage.setItem(key, JSON.stringify(item));
}

/**
 * Tar inn navnet på dataen vi skal hente ut som en String
 * @param {String} key
 * Funksjonen erstatter den tomme globale arrayen highScoreArray med 
 * dataen den får fra localStorrage. 
 * Funksjoenen sjekker om verdien allerede finnes i localStorrage,
    for å så hente den ut og legge den dataen til i arrayen vi sender til den.
    For at vi skal kunne bruke den igjen må vi gjøre den tilbake til en vanlig Array
    da bruker vi JSON.parse( localStorrage.getItem(key) )
*/
function getFromLocalStorrage(key){
    if(localStorage.getItem(key)){
        let getHighScore = JSON.parse(localStorage.getItem(key));
        highScoreArray = getHighScore;
    }
}

/**
 * HOVEDFUNKSJONEN:
 * Den tar inn "e" som den bruker til å finne ut hvile av 
 * SSP bildene du har trykket på, og lagrer den som "t". 
 * Derretter kjører den funksjonen rndSSP(); som returnerer 
 * maskinen sitt tilfeldige svar på stein / saks / papir.
 * @param {{ target: HTMLElement; }} e
 */
function sjekkSSP(e){
    // t blir den av de tre inputene du har trykket på
    const t = e.target;
    
    // maskinSSP er maskinen sin tilfeldig valgte stein / saks / papir.
    const maskinSSP = rndSSP();

    /**
     * Først må vi sjekke at du faktisk har trykket på en av SSP bildene.
     * Så sjekker vi om det blir uavgjort.
     * Dersom det ikke er uavgjort sjekker vi om du vinner eller taper. 

     * For å endre bakgrunnsfargen kjører vi funksjonen endreFarge(t, winFagre)
        vi sender "t" fordi det er det HTMLElementet vi jobber med, og "winFarge", dersom du har vunnet.
    */
if (t.className === "SSP") {
        if (t.innerHTML === maskinSSP) {
            // Bakgrunnsfargen til HTMLElementet blir uavgjortFarge.
            endreFarge(t, uavgjortFarge);
            // Ingen endring på poengene.

        } else if (t.innerHTML === "stein" && maskinSSP === "saks") {
            // Du vinner
            wins += 1;
            winstreak += 1;
            score += 100;

            // Dersom du har en winstreak får du poeng for det, 
            //  og poeng gitt for winstreak øker med 50 for hver gang. 
            if(winstreak > 1){
                score += winstreakPoeng;
                winstreakPoeng += 50;
            }

            // bakgrunnsfargen til HTMLElementet blir winFarge.
            endreFarge(t, winFarge);
            // Spiller av lyden for rett.
            correctSound.play();

            // Skal oppdatere divene med wins/loss og winstreak
        } else if (t.innerHTML === "saks" && maskinSSP === "papir") {
            // Du vinner
            wins += 1;
            winstreak += 1;
            score += 100;

            // Dersom du har en winstreak får du poeng for det, 
            //  og poeng gitt for winstreak øker med 50 for hver gang. 
            if(winstreak > 1){
                score += winstreakPoeng;
                winstreakPoeng += 50;
            }

            // bakgrunnsfargen til HTMLElementet blir winFarge.
            endreFarge(t, winFarge);
            // Spiller av lyden for rett.
            correctSound.play();
            
        } else if (t.innerHTML === "papir" && maskinSSP === "stein") {
            // Du vinner
            wins += 1;
            winstreak += 1;
            score += 100;

            // Dersom du har en winstreak får du poeng for det, 
            //  og poeng gitt for winstreak øker med 50 for hver gang. 
            if(winstreak > 1){
                score += winstreakPoeng;
                winstreakPoeng += 50;
            }
            // bakgrunnsfargen til HTMLElementet blir winFarge.
            endreFarge(t, winFarge);
            // Spiller av lyden for rett.
            correctSound.play();

        } else {
            losses += 1;
            winstreak = 0;
            score -= 50;
            // Setter poeng per winstreak tilbake til 50.
            winstreakPoeng = 50;

            // Sender HTMLElementet vi jobber med til funkjsonen sammen med fargen.
            endreFarge(t, loseFarge);
            // Spiller av lyden for feil.
            wrongSound.play();
        }
        // Sender wins, losses, winstreak, og score til funksjonen slik at det blir vist på skjermen. 
        oppdatereLabels(wins, losses, winstreak, score);
        // Sjekker om runden er over. 
        sjekkSeier(wins, losses);
    }
}