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
const $ = (id) => document.getElementById(id);

// Kobling til SSPDiv, denne inneholder de tre inputene for SSP på nettsiden
const SSPDiv = $("SSPDiv");
//Vi lager resten av koblingene nedover her:

/** 
 * EventListener som kjører funskjonen sjekkSSP(); når du 
 * trykker på en av stein / saks / papir bildene på skjermen.
*/
SSPDiv.addEventListener("click", sjekkSSP);

// Globale variabler:
// let wins = 0;
// osv..
let wins = 0;
let losses = 0;
let scores = 0;
let winstreak = 0;
let tapfarge = "rgba(245, 69, 38, 0.739)";
let winfarge = "rgba(136, 231, 27, 0.685)";
let uavgjortfarge = "rgba(255, 255, 0, 0.664)";
let highScoreArray = [];

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
 */
function endreFarge(element, farge){
    element.style.backgroundColor = farge;
    element.style.transition = "0.25s";
    setTimeout(() => {
        element.style.backgroundColor = "rgba(0, 255, 255, 0.65)";
        element.style.transition = "0.25s";
    }, 250);
} 
    /**
     * Her skal funksjonen først endre bakgrunnsfargen til elementet
     * og bruke 250ms på det.
     * Derretter venter den 250ms før den bruker nye 250ms
     * til å endre tilbake til standard
     */

/**
 * @param {Number} winsTall
 * @param {Number} lossesTall
 * @param {Number} winstreakTall
 */
function oppdatereLabels(winsTall, lossesTall, winstreakTall){
    /**
     * Oppdaterer divene "#winstreak, #wins, #losses" sin innterHTML
     * med tallene som blir tatt inn i parametrene (winsTall, lossesTall, winstreakTall).
     */
}

/**
 * Tar inn en array med tall
 * @param {Number[]} scoreList
 * Returnerer et enkelt tall (mulig vi skal gjøre det om til String)
 * @returns {Number}
 */
function finnHighScore(scoreList){
    /**
     * Bruker en "for løkke" til å sortere ut det høyeste tallet 
     * i arrayen som blir tilsendt
     */
    return null;
}

/**
 * Funskjonen tar inn de globale vaiablene "antallWins" og "antallLosses".
 * Dette er ikke nødvendig fordi de er globale variabler, 
 * men vi gjør det alikevel for treningen sin del.
 * @param {Number} wins
 * @param {Number} losses
 */
function sjekkSeier(wins, losses){
    /**
     * Funksjonen skal sjekke om summen av dine seiere og tap >= 20.
     * Dersom den er 20, finner vi ut hvem som har vunnet og lagrer highScoren din
     * Derretter må vi restarte scoren, wins, losses og winstreak og starte spillet på nytt. 
     */
}

/**
 * value (navnet til dataen vi lagrer i localStorrage) 
 * sender vi som en String "scoreArray".
 * @param {String} value
 * Vi tar inn og lagrer arrayen med tall som "item", dette må gjøres
 * om til en JSON String. ( JSON.stringify(item) )
 * @param {Number[]} item
 */
function setToLocalStorrage(value, item){
    /**
     * Funksjonen skal lagre highScoreArray(eller den arrayen vi sender til den)
     * i localStorrage vi bruker navet "scoreArray" som value. 
     */
    localStorage.setItem(value, JSON.stringify(item));
}

/**
 * Tar inn navnet på dataen vi skal hente ut som en String
 * @param {String} value
 * Funksjonen erstatter den tomme globale arrayen highScoreArray med 
 * dataen den får fra localStorrage. 
 */
function getFromLocalStorrage(value){
    /**
     * Funksjoenen sjekker om verdien allerede finnes i localStorrage,
     * for å så hente den ut og legge den dataen til i highScoreArray (global variabel).
     * For at vi skal kunne bruke den igjen må vi gjøre den tilbake til en vanlig Array
     * da bruker vi JSON.parse( localStorrage.getItem(value) )
     */
    let getHighScore = JSON.parse(localStorage.getItem(value));
    
}

/**
 * HOVEDFUNKSJONEN:
 * Den tar inn "e" som den bruker til å finne ut hvile av 
 * SSP bildene du har trykket på, og lagrer den som "t". 
 * Derretter kjører den funksjonen rndSSP(); som returnerer 
 * maskinen sitt tilfeldige svar på stein / saks / papir.
 * @param {{ target: HTMLElement; }} e
 * Per nå returnerer ikke funskjonen noen ting.
 * @returns {void}
 */
function sjekkSSP(e){
    // t blir den av de tre inputene du har trykket på
    const t = e.target;
    
    // maskinSSP er maskinen sin tilfeldig valgte stein / saks / papir.
    const maskinSSP = rndSSP();
    if (t.className === "SSP") {
        if (t.innerHTML === maskinSSP) {
            alert("uavgjort");
        } else if (t.innerHTML === "stein" && maskinSSP === "saks") {
            alert("du vinner")
        } else if (t.innerHTML === "saks" && maskinSSP === "papir") {
            alert("du vinner")
        } else if (t.innerHTML === "papir" && maskinSSP === "stein") {
            alert("du vinner")
        } else {
            alert("maskin vinner")
        } 
    }
    
    /**
     * Først må vi sjekke at du faktisk har trykket på en av SSP bildene.
     * Så sjekker vi om det blir uavgjort.
     * Dersom det ikke er uavgjort sjekker vi om du vinner eller taper. 
     */
}
