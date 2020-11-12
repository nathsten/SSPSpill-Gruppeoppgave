//@ts-check

//Forkortelse for document.getElementById("idName");
const $ = (id) => document.getElementById(id);

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

// Kobling til SSPDiv, denne inneholder de tre inputene for SSP på nettsiden
const SSPDiv = $("SSPdiv");
/** 
 * EventListener som kjører funskjonen sjekkSSP(); når du 
 * trykker på en av stein / saks / papir bildene på skjermen.
*/
SSPDiv.addEventListener("click", sjekkSSP);

/**
 * Hovedfunksjonen:
 * Den tar inn "e" som den bruker til å finne ut hvile av 
 * SSP bildene du har trykket på, og lagrer den som t. 
 * Derretter kjører den funksjonen rndSSP(); som returnerer 
 * maskinen sitt tilfedige svar på stein / saks / papir.
 * @param {{ target: any; }} e
 * Per nå returnerer ikke funskjonen noen ting.
 * @returns {void}
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
     */
}