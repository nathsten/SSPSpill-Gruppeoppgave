const $ = (id) => document.getElementById(id);

function setup(){
    const userNameInpt = /**@type {HTMLInputElement}*/ ($("nameInpt"));
    const sendUserNameBtn = $("saveUser");
    const gui = $("gui");

    console.log("Server is running . . .");

    loadJSON('all', getData);

    sendUserNameBtn.addEventListener("click", setUsername);
    userNameInpt.addEventListener("keydown", sjekkEnter);

    function sjekkEnter(e){
        if(e.key === 'Enter'){
            setUsername();
        }
    }

    function setUsername(){
        let userName = String(userNameInpt.value);
        console.log(userName);
        let storeUser = JSON.stringify(userName);
        loadJSON(`regUser/${userName}`, finished);

        gui.innerHTML = "";

        const msg = document.createElement("div");
        msg.id = "msg";
        msg.innerHTML = `Takk ${userName} du er nå registrert, spillet starter øyeblikk`;
        gui.append(msg);

        localStorage.setItem("username", JSON.stringify(userName));

        function finished(data){
            console.log(data);
        }

        userNameInpt.value = "";
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
}

// function gameLoad(err){
//     if(!err){
//         console.log('Game successfully opended');
//     }
//     else{
//         console.log('Noe er gale..')
//     }
// }

function getData(data){
    console.log(data);
}