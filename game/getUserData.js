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
        div.innerHTML = "";
        // For-løkke som lager en ny div per bruker.
        for(let i=0; i<spillereArray.length; i++){
            const spillerDiv = document.createElement("div");
            spillerDiv.innerHTML = `${users[spillereArray[i]].username}: ${users[spillereArray[i]].score}`;
            if(users[spillereArray[i]].username === thisUserForNewScore){
                spillerDiv.style.color = "rgb(60, 236, 60)";
                spillerDiv.style.textDecoration = "underline";
            }
            div.append(spillerDiv);
        }
    }

    // Til slutt kjører vi funksjonen som lager spillerene på siden og sender nødvendig data til den. 
    createSpillereListe(users, sortUsersByScore(users, userArray), spillereListe);

    // Funksjon som sorterer brukerene etter highscore.
    function sortUsersByScore(users, userArray){
        // en kopi av arrayen siden vi skal endre på den. 
        let arrayOfUsers = userArray;
        let sortedUsers = [];
        // Så lenge lengden av arrayOfUsers er større enn 0, kjører funksjonen. 
        while (arrayOfUsers.length !== 0){
            let leadingUser = arrayOfUsers[0]; // Antar at dette er den største. 
            let leadingUsersScore = Number(users[arrayOfUsers[0]].score); // Antar at dette er den største. 
            for(let i=0; i<arrayOfUsers.length; i++){
                let userScore = Number(users[arrayOfUsers[i]].score);
                // Hvis bruker nr i sin score er større enn den antatte, blir den brukeren satt som leadingUser. 
                if(userScore > leadingUsersScore){
                    leadingUser = arrayOfUsers[i];
                    leadingUsersScore = Number(users[arrayOfUsers[i]].score);
                }
            }
            // Legger leadingUser til i arrayen 
            sortedUsers.push(leadingUser);
            let index = arrayOfUsers.indexOf(leadingUser);
            // Fjerner den brukeren som vi valgte ut nå. 
            arrayOfUsers.splice(index, 1);
            // For loopen kjører på nytt helt til array en er tom. 
        }
        // Returnerer en array med navnene sortert etter hvem som har høyest highscore. 
        return sortedUsers;
    }
}
let thisUserForNewScore;

if(localStorage.getItem("username")){
    const getThisUsername = JSON.parse(localStorage.getItem("username"));
    thisUserForNewScore = getThisUsername;
}

/**
 * Updates user score in highscore.json
 * @param {Number} thisUserScore
 */
function updateUserScore(thisUserScore){
    loadJSON(`newHighscore/${thisUserForNewScore}/${thisUserScore}`, finishedUpdateUserScore);
    loadJSON('all', updateLagSpillere);

    function updateLagSpillere(data){
        let users = data;
        let userArray = Object.keys(data);

        lagBrukere(users, userArray);
    }
}

function finishedUpdateUserScore(error, data){
    if(error){
        console.error('Noe gikk galt med å oppdatere brukeren highscore')
    }
    else{
        console.log(data);
    }
}