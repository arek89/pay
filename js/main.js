const $ = selector => {
    return document.querySelector(selector);
};

const isValidCCNumber = ccNumb => {
    ccNumb = ccNumb.toString();
    ccNumb = ccNumb.replace(/\s/g,""); // strip spaces

    let valid = "0123456789", // Valid digits in a credit card number
        len = ccNumb.length, // The length of the submitted cc number
        temp, // temp variable for parsing string
        bNum = true; // by default assume it is a number

    // Determine if the ccNumb is in fact all numbers
    for (let j = 0; j < len; j++) {
        temp = '' + ccNumb.substring(j, j+1);
        if (valid.indexOf(temp) === -1) bNum = false;
    }

    if (!bNum) return false; // if it is NOT a number, you can either alert to the fact, or just pass a failure
    if (len === 0) return false; // Determine if it is the proper length
    if (len > 19) return false; //Apparently Diner's Club can have 19 digits *NEW*
    if (len < 12) return false; //Apparently Maestro can have 12 digits *NEW*

    return true;
};

const isValid = () => {
    let valid = true,
        CurrentDate = new Date(),
        m = CurrentDate.getMonth(),
        y = CurrentDate.getFullYear();

    if (!$('#cardHolderName').checkValidity()) {
        $('#cardHolderName').classList.add('wrong');
        valid = false;
    } else {
        $('#cardHolderName').classList.remove('wrong');
    }

    if (!isValidCCNumber($('#cardNumber').value)) {
        $('#cardNumber').classList.add('wrong');
        valid = false;
    } else {
        $('#cardNumber').classList.remove('wrong');
    }

    if (($('#month').value <= m || $('#month').value === '') && ($('#year').value == y) || $('#year').value === '') {
        $('#month').classList.add('wrong');
        $('#year').classList.add('wrong');
        valid = false;
    } else {
        $('#month').classList.remove('wrong');
        $('#year').classList.remove('wrong');
    }

    if (!$('#cvv').checkValidity()) {
        $('#cvv').classList.add('wrong');
        valid = false;
    } else {
        $('#cvv').classList.remove('wrong');
    }

    return valid;
};

const onSubmit = () => {
    if (!isValid()) return;

    console.log('submit');
};
