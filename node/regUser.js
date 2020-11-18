
const $ = (id) => document.getElementById(id);

function setup(){
    const userNameInpt = /**@type {HTMLInputElement}*/ ($("nameInpt"));
    const sendUserNameBtn = $("saveUser");
    console.log("Server is running . . .")

    sendUserNameBtn.addEventListener("click", setUsername);

    function setUsername(){
        let userName = String(userNameInpt.value);
        console.log(userName);
        let storeUser = JSON.stringify(userName, null, 2);

        userNameInpt.value = "";
    }
}
