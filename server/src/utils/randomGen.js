const RandomGenerator = (length) => {
    let pin = '';

    //if we do const pin = 0 then it will just add the numbers but by '' it will add those numbers as an array

    for (let index = 0; index < length; index++) {
        pin += Math.floor(Math.random()*10);
    }

    return pin;

    //math.random generates any number between 0 and 1
}


module.exports = RandomGenerator