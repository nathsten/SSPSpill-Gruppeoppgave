let userList;
let userArray = [];
let thisUser;

// Laster inn spillerene fra databasen.
function setup(){
    loadJSON('all', getUserData);
}
// Lager en variabel med brukerene i. 
// Alle variabler med brukere må skje her
function getUserData(data){
    console.log(data);
    userList = data;
    console.log(userList['Nathaniel'].score);
    console.log(userList[thisUser]);
}
if(localStorage.getItem("username")){
    const getThisUsername = JSON.parse(localStorage.getItem("username"));
    thisUser = getThisUsername;
}

console.log(thisUser);

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