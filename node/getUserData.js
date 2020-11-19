// @ts-check

/**
 * @param {string} id
 */
const getId = (id) => document.getElementById(id);

function lagBrukere(){
    const spillereDiv = getId("spillereDiv");
    const spillereListe = getId("spillereListe");

    // Bruke loadJSON til å lese JSON filen med spillerene. Bare linke den i SSP.html!!

    // Denne er bare midlertidig, skal lese av highscore.json filen. 
    let spillereData = ['Helene: 100', 'Eleonora: 100', 'Nathaniel: 100', 'David: 100', 'Kirat: 100'];

    /**
     * @param {string[]} spillere
     * @param {HTMLElement} div
     */
    function createSpillereListe(spillere, div){
        for(let i=0; i<spillere.length; i++){
            const spillerDiv = document.createElement("div");
            spillerDiv.innerHTML = spillere[i];
            div.append(spillerDiv);
        }
    }

    createSpillereListe(spillereData, spillereListe);
}