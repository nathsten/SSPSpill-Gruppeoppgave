const rndSSP = () => {
    const SSP = ['stein', 'saks', 'papir'];
    const rndTall = () => Math.floor(Math.random() * SSP.length);
    const output = SSP[rndTall()];
    return output;
}

console.log(rndSSP());
