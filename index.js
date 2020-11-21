const fs = require('fs');
const express = require('express');
const port = 3000;

const getScoreList = JSON.parse(fs.readFileSync('node/highscore.json'));
let userID = Number((Object.keys(getScoreList).length) + 1);

const index = express();

const server = index.listen(port, callBack);

function callBack(error){
    if(error){
        console.log('Noe gikk galt...')
    }   else{
        console.log(`Server kjører på: localhost:${port}`);
    }
}

// Hvis ikke noe annet så er du ikke registrert. 
let userRegistered = false;
// Siden vi skal laste inn, foreløpig ingenting. 
let pageLoad;

// Laster inn userRegistrered.json og sjekker om den er true/false. 
const getUserRegistered = JSON.parse(fs.readFileSync('node/userRegistrered.json'));
userRegistered = getUserRegistered["userRegiststrered"];

// Hvis userRegistrered er true, så laster vi inn spillet. 
if(userRegistered !== "false"){
    // Siden vi skal laste inn er mappen 'game'.
    pageLoad = 'game';
}
// Dersom den er false eller noe annet av en eller annen grunn så laster vi inn registreringssiden. 
else{
    // Siden vi skal laste inn er mappen 'node'. 
    pageLoad = 'node';
}

// Bruker index(variabelen for serveren) til å åpne siden som vi bestemte over. 
index.use(express.static(pageLoad));

// Funksjonen som lagrer brukeren. 
index.get('/regUser/:brukernavn', sendUsername);

// tar i mot en request, og sender en response.
function sendUsername(request, response){
    // data blir det du sente inn. 
    let data = request.params;
    // brukernavnValue blir det du skrev inn som brukernavn. 
    let brukernavnValue = data.brukernavn;

    // scoreListen som er highscore.json får en ny objekt som er deg.
    // Du vil få 100 som highscore automatisk, samt userID. 
    getScoreList[brukernavnValue] = {"username": brukernavnValue, "userID": userID, "score": 100};

    // Vi gjør den om til JSON string. 
    let storeScoreList = JSON.stringify(getScoreList, null, 2);

    // Vi lagrer dataen i highscore.json
    fs.writeFileSync('node/highscore.json', storeScoreList, finished);

    // Endrer på userRegiststrered fra false til true. 
    const storeUserRegistered = getUserRegistered["userRegiststrered"] = {"userRegiststrered": "true"};
    // Gjør den om til JSON String. 
    const JSONstoreUserRegistered = JSON.stringify(storeUserRegistered, null, 2);

    // Sender response. 
    response.send(`Takk for din registrering ${brukernavnValue}, du er nå registrert i vår database`);
    // Skriver tilbake at userRegistrered er true. 
    fs.writeFileSync('node/userRegistrered.json', JSONstoreUserRegistered, callBackSaveUser);
    function callBackSaveUser(data){
        console.log(data)
    }
}
function finished(){
    console.log("Done");
}

// For å laste inn alt som står i highscore.json
index.get('/all', sendBrukere);

function sendBrukere(req, res){
    res.send(getScoreList);
}

// For å søke etter et brukernavn
index.get('/searchUser/:username', searchUser);

function searchUser(req, res){
    const user = req.params.username;
    let msg;

    if(getScoreList[user]){
        msg = `${user}: ${getScoreList[user]}`;
    }   
    else{
        msg = "Bruker var ikke funnet";
    }
    res.send(msg);
}