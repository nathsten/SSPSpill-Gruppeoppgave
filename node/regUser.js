// @ts-check

/**
 * @param {string} id
 */
const $ = (id) => document.getElementById(id);

const userNameInpt = /**@type {HTMLInputElement}*/ ($("nameInpt"));
const sendUserNameBtn = $("saveUser");

let userName = String(userNameInpt.value);

// export const sendUsername = () => userName;

// sendUserNameBtn.addEventListener("click", setUsername);

// function setUsername(){
//     // Midlertidlig
//     localStorage.setItem("username", JSON.stringify(userName));
// }
