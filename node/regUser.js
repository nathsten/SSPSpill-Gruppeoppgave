const $ = (id) => document.getElementById(id);

function setup(){
    // Koblinger til HTML siden. 
    const userNameInpt = /**@type {HTMLInputElement}*/ ($("nameInpt"));
    const sendUserNameBtn = $("saveUser");
    const gui = $("gui");
    let users;

    // Hvis alt funker som det skal så blir dette logget. 
    console.log("Server is running . . .");

    // Laster inn data fra highscore.json.
    // 'all', er funksjonen for å lese highscore.json fra index.js(70).
    loadJSON('all', getData);

    // eventlistnere på knappen eller inputen for Enter. 
    sendUserNameBtn.addEventListener("click", setUsername);
    userNameInpt.addEventListener("keydown", sjekkEnter);

    function sjekkEnter(e){
        if(e.key === 'Enter'){
            setUsername();
        }
    }

    // Funksjonen registrerer hva du har skrevet inn og lagrer deg i databasen. 
    function setUsername(){
        let userName = String(userNameInpt.value);
        console.log(userName);

        loadJSON('all', checkUsername);

        function checkUsername(data){
            const useres = data;

            if(userName === ""){
                alert("Venligst fyll inn feltet")
            }
            else if(useres[userName] != undefined){
                const rndNum = () => Math.floor(Math.random() * 9);
                alert(`Beklager ${userName} finnes allerede, prøv feks: ${userName}${rndNum()}${rndNum()}${rndNum()}`);
            }
            else{
                registerUser();
            }
        }

        // Du blir lagret så lenge du ikke submiter et tomt felt.   
        function registerUser(){
            // registerer deg til highscore.json med 'regUser/:username', funksjonen på index.js(45).
            loadJSON(`regUser/${userName}`, finished);

            // Feltet blir tomt. 
            gui.innerHTML = "";

            // Viser beskjeden at du er registrert. 
            const msg = document.createElement("div");
            msg.id = "msg";
            msg.innerHTML = `Takk ${userName} du er nå registrert, spillet starter øyeblikk`;
            gui.append(msg);

            // Lagrer brukernavet ditt i localStorage. 
            localStorage.setItem("username", JSON.stringify(userName));

            // Bare for debugging. 
            function finished(data){
                console.log(data);
            }

            // Venter 2sek før den laster inn "game" siden.
            userNameInpt.value = "";
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    }
}

function getData(data){
    console.log(data);
}