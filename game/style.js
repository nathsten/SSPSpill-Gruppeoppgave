// Mest sannsylig ikke nødvendig, men mulig vi må bruke den for å laste inn CSSen til spillet.
function setStyle(){
    const style = `
    body{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    #header {
        border: black 1px solid;
        border-radius: 20px;
        width: 100%;
        height: 100px;
        background: linear-gradient(to right, #6b6b6b,#ffffff, #ff0000);
    }
    #winstreak, #wins, #losses, #highscore, #score {
        position: absolute;
        font-size: 1.5em;
        top: 15px;
        width: 130px;
        height: 50px;
        line-height: 50px;
        border: 2px black solid;
        border-radius: 10px;
        top: 30px;
        padding-left: 10px;
    }
    #overskrift {
        position: absolute;
        top: 20px;
        font-size: 3rem;
        left: calc(50% - 169px);
        margin-top: 5px;
    }
    #wins {
        left: 2%;
    }
    #losses {
        left: 13.5%;
    }
    #score{
        left: 24.5%;
    }
    
    #highscore {
        right: 2%;
        width: 220px;
    }
    #winstreak{
        right: 20%;
        width: 180px;
    }
    
    
    #SSPDiv{
        position: relative;
        width: 60%;
        height: 400px;
        left: calc(50% - 30%);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        user-select: none;
        font-size: 0%;
    }
    
    #SSPDiv>div{
        position: relative;
        width: 250px;
        height: 250px;
        background-color: rgba(0, 255, 255, 0.65);
        left: calc(50% - 125px);
        top: 75px;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.25s;
        background-position: center;
        background-size: 60%;
        background-repeat: no-repeat;
    }
    
    #SSPDiv>div:hover{
        background-color: rgba(39, 151, 255, 0.527);
        animation: vinke 1s linear infinite;
    }
    
    #stein{
        background-image: url("/bilder/stein.png");
    }
    
    #saks{
        background-image: url("/bilder/saks.png");
    }
    
    #papir{
        background-image: url("/bilder/papir.png");
    }
    
    #boks {
        position: absolute;
        height: 150px;
        width: 300px;
        border-radius: 20px;
        visibility: hidden;
        text-align: center;
        font-size: 3rem;
        line-height: 8rem;
    
    }
    
    @keyframes vinke{
        0%{transform: rotate(0deg);}
        25%{transform: rotate(-15deg);}
        50%{transform: rotate(0deg);}
        75%{transform: rotate(15deg);}
        100%{transform: rotate(0deg);}
    }
    
    @keyframes vant {
        0% { visibility: hidden; left: 0%; opacity: 0%;}
        15% { left: 25%; opacity: 80%; visibility: visible;}
        50% { left: 50%; opacity: 100%; visibility: visible;}
        85% { left: 75%; opacity: 100%; visibility: visible;}
        100% {left: 100%; opacity: 0%; visibility: hidden;}
    }
    
    @keyframes tapt {
        0% { visibility: visible; left: 0%; opacity: 0%;}
        15% { left: 25%; opacity: 80%; visibility: visible;}
        50% { left: 50%; opacity: 100%; visibility: visible;}
        85% { left: 75%; opacity: 100%; visibility: visible;}
        100% {left: 100%; opacity: 0%; visibility: hidden;}
    }
    
    @keyframes uavgjort {
        0% { visibility: hidden; left: 0px; opacity: 0%;}
        15% { left: 25%; opacity: 80%; visibility: visible;}
        50% { left: 50%; opacity: 100%; visibility: visible;}
        85% { left: 75%; opacity: 80%; visibility: visible;}
        100% {left: 100%; opacity: 0%; visibility: hidden;}
    }
    .vant {
        animation: vant 4s linear;
        background-color: rgb(33, 231, 33);
    }
    .tapt {
        animation: tapt 4s linear;
        background-color: rgb(231, 17, 17);
    }
    .uavgjort {
        animation: uavgjort 4s linear;
        background-color: orange;
    }
    
    #spillereDiv {
        position: absolute;
        bottom: 30px;
        left: calc(50% - 45%);
        width: 90%;
        height: 250px;
        border: solid 1px black;
        background: linear-gradient(to right, #ff5555,#fffb23, #5bf06f, #5d89f0, #965cf3);
        border-radius: 50px;
        overflow: scroll;
    }
    
    #SpillereHeader{
        position: relative;
        width: 50%;
        text-align: center;
        color: black;
        text-decoration: none;
        font-size: 1.2rem;
        left: calc(50% - 25%);
    }
    
    #SpillereHeader>h1{
        font-family: 'Niconne', cursive;
        border-bottom: #5d89f0 solid 2px;
    }
    
    #spillereListe{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        width: 100%;
    }
    
    #spillereListe>div{
        margin: 10px;
        margin-left: 20px;
        font-size: 1.5em;
    }    
    `;

    document.head.append(style);
}