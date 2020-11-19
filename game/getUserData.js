let users;
let userArray = [];

// Laster inn spillerene fra databasen.
function setup(){
    loadJSON('all', getUserData);
}

// Lager en variabel med brukerene i. 
function getUserData(data){
    console.log(data);
    users = data;
    console.log(users['Nathaniel'].score);
}

// Skal sortere ut alle spillerene i en array.
function structureSpillere(){
    let userKeys = keys(users);
    return userKeys;
}

function lagBrukere(){
    const spillereDiv = $("spillereDiv");
    const spillereListe = $("spillereListe");

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