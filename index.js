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

index.use(express.static('node'));

index.get('/regUser/:brukernavn', sendUsername);

function sendUsername(request, response){
    let data = request.params;
    let brukernavnValue = data.brukernavn;

    getScoreList[brukernavnValue] = {"username": brukernavnValue, "userID": userID, "score": 100};

    let storeScoreList = JSON.stringify(getScoreList, null, 2);

    fs.writeFileSync('node/highscore.json', storeScoreList, finished);
    response.send(`Takk for din registrering ${brukernavnValue}, du er nå registrert i vår database`);
}
function finished(){
    console.log("Done");
}

index.get('/all', sendBrukere);

function sendBrukere(req, res){
    res.send(getScoreList);
}

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

/**
 * HTTP NODE SERVER KODE:
 * Ser ut så jeg må bruke express fremfor node http.
 */
// const http = require('http');

// const server = http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     fs.readFile('node/index.html', function(error, data){
//         if(error){
//             res.writeHead(404);
//             res.write('Error 404, not found');
//         }   else{
//             res.write(data);
//         }
//         res.end();
//     })
// })

// server.listen(port, function(error){
//     if(error){
//         console.error('Noe gikk galt...')
//     }   else{
//         console.log(`Server kjører på: localhost:${port}`);
//     }
// })