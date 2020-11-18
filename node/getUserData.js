// @ts-check

const getId = (id) => document.getElementById(id);

const fs = require('fs');

function lagBrukere(){
    const spillereDiv = getId("spillereDiv");
    const spillereListe = getId("spillereListe");

    // Denne er bare midlertidig, skal lese av highscore.json filen. 
    let spillereData = ['Helene: Highscore: 100', 'Eleonora: Highscore: 100', 'Nathaniel: Highscore: 100'];

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