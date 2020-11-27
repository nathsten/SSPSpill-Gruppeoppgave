const fs = require('fs');
const express = require('express');
const port = 3000;
const cookieParser = require('cookie-parser');

const getScoreList = JSON.parse(fs.readFileSync('node/highscore.json'));
// Bestemmer userID basert på antall personer som er lagret + 1. 
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

// Bruke coockie parser til å lese av om du er registrert eller ei. 
index.use(cookieParser());

// Med en gang vi starter serveren så sjekker vi i cookies om du er registrert. 
index.get('/', reqCookie);

function reqCookie(req, res) {
    const cookie = req.headers.cookie;
    if(cookie === 'name=true'){
        console.log('User found');
        // laster inn spill siden dersom du er registrert
        res.sendFile(__dirname + '/gameLoad/index.html');
        // console.log(cookie);
    }
    else{
        // Laster inn registreringssiden dersom du ikke allerede har registrert deg. 
        res.sendFile(__dirname + '/node/index.html');
        console.log('No user found');
    }
}

// Funksjonen som lagrer brukeren. 
index.get('/regUser/:brukernavn', sendUsername);

// tar i mot en request, og sender en response.
function sendUsername(request, response){
    // data blir det du sente inn. 
    let data = request.params;
    // brukernavnValue blir det du skrev inn som brukernavn. 
    let brukernavnValue = data.brukernavn;

    response.cookie('name', 'true').send('cookie set');
    // scoreListen som er highscore.json får en ny objekt som er deg.
    // Du vil få 0 som highscore automatisk, samt userID. 
    getScoreList[brukernavnValue] = {"username": brukernavnValue, "userID": userID, "score": String(0)};

    // Vi gjør den om til JSON string. 
    let storeScoreList = JSON.stringify(getScoreList, null, 2);

    // Vi lagrer dataen i highscore.json
    fs.writeFileSync('node/highscore.json', storeScoreList, finished);

    // Endrer på userRegiststrered fra false til true. 
    // const storeUserRegistered = getUserRegistered["userRegiststrered"] = {"userRegiststrered": "true"};
    // Gjør den om til JSON String. 
    // const JSONstoreUserRegistered = JSON.stringify(storeUserRegistered, null, 2);

    // Sender response. 
    // response.send(`Takk for din registrering ${brukernavnValue}, du er nå registrert i vår database`);ç
    // Skriver tilbake at userRegistrered er true. 
    // fs.writeFileSync('node/userRegistrered.json', JSONstoreUserRegistered, callBackSaveUser);
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