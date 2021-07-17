function validateNic(nic) {
    // should be requred
    if (nic === '') {
        console.log('Not Valid nic');
        return false
    }
    // if length 10 
    else if (nic.length == 10) {
        // last letter should be X or V
        const lastLetter = nic[nic.length - 1];
        const numbers = nic.slice(0, nic.length - 1);
        console.log(numbers, !isNaN(numbers))
        if ((lastLetter === 'V' || lastLetter === 'X'|| lastLetter ==="v"|| lastLetter ==="x") && !isNaN(numbers)) {
            console.log('This is valid old nic');
            return true
        }
        else {
            console.log('This is not a valid old nic number', (lastLetter === 'V' || lastLetter === 'X'), isNaN(numbers));
            return false
        }
    }
    // if length 13
    else if (nic.length == 13) {
        // only digits
        if (!isNaN(nic)) {
            console.log('This is a valid new nic number');
            return true
        }
        else {
            console.log('This is not a valid new nic number', nic);
            return false
        }
    }
    else {
        return false
    }

}

module.exports.validateNic=validateNic;