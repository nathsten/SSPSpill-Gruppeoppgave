const rndSSP = () => {
    let SSP = ['stein', 'saks', 'papir'];
    const rndTall = () => Math.floor(Math.random() * SSP.length);
    let output = SSP[rndTall()];
    return output;
}

console.log(rndSSP());
