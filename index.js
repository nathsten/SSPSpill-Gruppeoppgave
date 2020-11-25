const fs = require('fs');
const express = require('express');
const port = 3000;
const path = require('path');
const router = express.Router();

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
let userRegistered;
// Siden vi skal laste inn, foreløpig ingenting. 
let pageLoad;

// // Laster inn userRegistrered.json og sjekker om den er true/false. 
const getUserRegistered = JSON.parse(fs.readFileSync('node/userRegistrered.json'));
userRegistered = getUserRegistered["userRegiststrered"];

// Prøver å finne en måte å gjøre dette på med localStorage, men ser ikke ut så det går. 
index.get('/user/:auth', checkAuth)

function userFound(){
    console.log('User found');
    userRegistered = 'true';
    console.log(userRegistered);
}

function checkAuth(req, res){
    const userAuth = req.params.auth;
    if(userAuth === 'true'){
        userFound();
    }
    else{
        console.log('User not found');
    }
}

// Hvis userRegistrered er true, så laster vi inn spillet. 
if(userRegistered === "true"){
    // Siden vi skal laste inn er mappen 'game'.
    pageLoad = 'game';
}
// Dersom den er false eller noe annet av en eller annen grunn så laster vi inn registreringssiden. 
else{
    // Siden vi skal laste inn er mappen 'node'. 
    pageLoad = 'node';
}

// Bruker index(variabelen for serveren) til å åpne siden som vi bestemte over. 
// Skal sette meg mer inn i de uliek måtene å laste inn sider på, mulig det finnes en bedre måte. 
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
    getScoreList[brukernavnValue] = {"username": brukernavnValue, "userID": userID, "score": 0};

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

index.get('/newHighscore/:user/:score', storeNewScore);

function storeNewScore(req, res){
    // Lagrer nye scoren på thisUser i highscore.json.
    let user = req.params.user;
    let newScore = req.params.score;

    getScoreList[user].score = newScore;

    const storeNewHigscore = JSON.stringify(getScoreList, null, 2);

    fs.writeFileSync('node/highscore.json', storeNewHigscore, newHighscoreStored);

    function newHighscoreStored(data, error){
        if(error){
            console.log('Noe gikk galt med å lagre ny highscore...')
        }
        else{
            console.log(data);
        }
    }
    res.send(`Higscoren til ${user} er endret.`);

    // Må nå bruke loadJSON('/user/score) for å kjøre funksjonen og lagre din nye highscore i highscore.json
}

index.get('/loadGame',function(req, res){
    res.sendFile(path.join(__dirname+'/game' + '/index.html'));
});