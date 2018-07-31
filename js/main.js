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

    if (($('#month').value <= m || !$('#month').checkValidity()) && ($('#year').value == y || !$('#year').checkValidity())) {
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

const findGetParameter = parameterName => {
    let result = null,
        items = location.search.substr(1).split("&");

    for (let index = 0; index < items.length; index++) {
        if ((items[index] + '=').indexOf(parameterName) === 0) {
            result = decodeURIComponent(items[index].slice(parameterName.length + 1));

            break;
        }
    }

    return result;
};

const url = `https://survivalapexshop.com/shop/cart/displayMiniCartByCode?shoppingCartCode=${findGetParameter('shoppingCartCode')}`;
fetch(url, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    }, error => {
        console.log(error);
    })
    .then(products => {
        displayProducts(products.shoppingCartItems);
        sumUpQuantity(products.shoppingCartItems);
        sumUpPrices(products.shoppingCartItems);
    });


const displayProducts = products => {
    // display products list
    products.forEach(product => {
        const   productWrapper = $('.product-wrapper'),
            div = document.createElement('div');
        div.className = 'row product';

        div.innerHTML = `
    <div class="col-6">
        <div class="product-img-wrapper text-center">
            <img src="${product.image}" class="product-image" alt="product-image">
        </div>
    </div>
    <div class="col-6 product-description">
        <p class="price"><strong>${product.price}</strong></p>
        <p class="description">${product.name}</p>
        <p class="quantity">Qty: <strong>${product.quantity}</strong></p>
    </div>`;

        productWrapper.appendChild(div);
    });
};

const sumUpQuantity = products => {
    // sum up all items
    const sumProducts = products.map(product => {
        return product.quantity;
    }).reduce((total, num) => {
        return total + num;
    });

    // display items amount
    $('.products-amount').innerHTML = `${sumProducts} ${ sumProducts > 1 ? 'Items' : 'Item' }`;
}

const sumUpPrices = products => {
    // sum app all prices
    const sumPrices = products.map(price => {
        return price.productPrice;
    }).reduce((total, num) => {
        return total + num;
    });

    // display items prices
    $('.total-pay').innerHTML = `$${sumPrices}`;
}



