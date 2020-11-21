// Laster inn spillerene fra databasen.
function setup(){
    loadJSON('all', getUserData);
}
// Lager en variabel med brukerene i. 
// Alle variabler med brukere må skje her
function getUserData(data){
    // Objektet med brukerene
    let userList = data;
    // Arrayen med bare brukenavenene
    let userArray = Object.keys(data);
    // brukeren som maksinen tilhører. 
    let thisUser;

    console.log(data);
    console.log(userList['Nathaniel'].score);
    console.log(userList[thisUser]);
    console.log(Object.keys(userList));

    // Henter brukernavent ditt i localStorage, dette er sånn at programet vet hvem du er.
    if(localStorage.getItem("username")){
        const getThisUsername = JSON.parse(localStorage.getItem("username"));
        thisUser = getThisUsername;
    }

    console.log(userList[thisUser]);
    console.log(userList[userArray[0]].username);

    // Kjøre funksjonen som lager brukerene, denne MÅ kjøre etter vi har hentet dataene fra /all (highscore.json)
    lagBrukere(userList, userArray);
}

// Funksjonen som kobles til HTML siden og lager divene med brukerne sin highscore i. 
function lagBrukere(users, userArray){
    // Kobling til #spillereListe.
    const spillereListe = $("spillereListe");

    /**
     * @param {object} users
     * @param {string[]} spillereArray
     * @param {HTMLElement} div
     * Funksjonen tar inn objektet med spillerene, 
     * arrayen med navet til alle spillerene
     * diven (spillereListe) vi legger de nye divene med brukerdataene inni. 
     */
    function createSpillereListe(users, spillereArray, div){
        // For-løkke som lager en ny div per bruker.
        for(let i=0; i<spillereArray.length; i++){
            const spillerDiv = document.createElement("div");
            spillerDiv.innerHTML = `${users[spillereArray[i]].username}: ${users[spillereArray[i]].score}`;
            div.append(spillerDiv);
        }
    }
    // Til slutt kjører vi funksjonen som lager spillerene på siden og sender nødvendig data til den. 
    createSpillereListe(users, userArray, spillereListe);
}
