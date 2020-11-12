//@ts-check

//Forkortelse for document.getElementById("idName");
const $ = (id) => document.getElementById(id);

/**
 * Funksjon som returnerer tilfeldig 'stein', 'saks', 'papir'.
 * @returns {String}
 */
const rndSSP = () => {
    const SSP = ['stein', 'saks', 'papir'];
    const rndTall = () => Math.floor(Math.random() * SSP.length);
    const output = SSP[rndTall()];
    return output;
}

//Kobling til SSPDiv
const SSPDiv = $("SSPdiv");

SSPDiv.addEventListener("click", sjekkSSP);

/**
 * Hovedfunksjonen som finner ut hvile av SSP du har trykket på
 * og kjører funksjonen som returnerer maskinen sitt svar
 * @param {{ target: any; }} e
 */
function sjekkSSP(e){
    // t blir den av de tre inputene du har trykket på
    const t = e.target;
    
    // maskinSSP er maskinen sin stein / saks / papir.
    const maskinSSP = rndSSP();
}