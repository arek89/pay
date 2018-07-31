"use strict";

var $ = function $(selector) {
    return document.querySelector(selector);
};

var isValidCCNumber = function isValidCCNumber(ccNumb) {
    ccNumb = ccNumb.toString();
    ccNumb = ccNumb.replace(/\s/g, ""); // strip spaces

    var valid = "0123456789",
        // Valid digits in a credit card number
    len = ccNumb.length,
        // The length of the submitted cc number
    temp = void 0,
        // temp variable for parsing string
    bNum = true; // by default assume it is a number

    // Determine if the ccNumb is in fact all numbers
    for (var j = 0; j < len; j++) {
        temp = '' + ccNumb.substring(j, j + 1);
        if (valid.indexOf(temp) === -1) bNum = false;
    }

    if (!bNum) return false; // if it is NOT a number, you can either alert to the fact, or just pass a failure
    if (len === 0) return false; // Determine if it is the proper length
    if (len > 19) return false; //Apparently Diner's Club can have 19 digits *NEW*
    if (len < 12) return false; //Apparently Maestro can have 12 digits *NEW*

    return true;
};

var isValid = function isValid() {
    var valid = true,
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

var onSubmit = function onSubmit() {
    if (!isValid()) return;

    console.log('submit');
};

var findGetParameter = function findGetParameter(parameterName) {
    var result = null,
        items = location.search.substr(1).split("&");

    for (var index = 0; index < items.length; index++) {
        if ((items[index] + '=').indexOf(parameterName) === 0) {
            result = decodeURIComponent(items[index].slice(parameterName.length + 1));

            break;
        }
    }

    return result;
};

var url = "https://survivalapexshop.com/shop/cart/displayMiniCartByCode?shoppingCartCode=" + findGetParameter('shoppingCartCode');
fetch(url, {
    method: 'GET'
}).then(function (response) {
    return response.json();
}).then(function (products) {
    displayProducts(products.shoppingCartItems);
    sumUpQuantity(products.shoppingCartItems);
    sumUpPrices(products.shoppingCartItems);
});

var displayProducts = function displayProducts(products) {
    // display products list
    products.forEach(function (product) {
        var productWrapper = $('.product-wrapper'),
            div = document.createElement('div');
        div.className = 'row product';

        div.innerHTML = "\n    <div class=\"col-6\">\n        <div class=\"product-img-wrapper text-center\">\n            <img src=\"" + product.image + "\" class=\"product-image\" alt=\"product-image\">\n        </div>\n    </div>\n    <div class=\"col-6 product-description\">\n        <p class=\"price\"><strong>" + product.price + "</strong></p>\n        <p class=\"description\">" + product.name + "</p>\n        <p class=\"quantity\">Qty: <strong>" + product.quantity + "</strong></p>\n    </div>";

        productWrapper.appendChild(div);
    });
};

var sumUpQuantity = function sumUpQuantity(products) {
    // sum up all items
    var sumProducts = products.map(function (product) {
        return product.quantity;
    }).reduce(function (total, num) {
        return total + num;
    });

    // display items amount
    $('.products-amount').innerHTML = sumProducts + " " + (sumProducts > 1 ? 'Items' : 'Item');
};

var sumUpPrices = function sumUpPrices(products) {
    // sum app all prices
    var sumPrices = products.map(function (price) {
        return price.productPrice;
    }).reduce(function (total, num) {
        return total + num;
    });

    // display items prices
    $('.total-pay').innerHTML = "$" + sumPrices;
};