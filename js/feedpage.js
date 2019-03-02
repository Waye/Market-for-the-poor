"use strict";
console.log("feedpage.js") // log to the JavaScript console.

const mockHeaderInfo = {
    twoMonthTotal : 48300,
    activeNum : 3,
    finishedNum : 21,
    postedNum : 12
}

function addInfoHeaderContent(headerInfo, user) {
    const totalTextLg = document.createElement("h1");
    totalTextLg.className += "display-4 d-none d-lg-block";
    totalTextLg.innerText = headerInfo.twoMonthTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD'});
    const totalTextMd = document.createElement("h1");
    totalTextMd.className += "d-lg-none d-md-block";
    totalTextMd.innerText = headerInfo.twoMonthTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD'});
    $('#dollarCol').append(totalTextLg);
    $('#dollarCol').append(totalTextMd);
    $('#dollarCol').append('<p class="text-left ml-md-3 text-muted">2-month total</p>');

    if (user.isBuyer) {
        $('#feedName').html("Offer feed");
    } else {
        $('#feedName').html("Request feed");
    }
    $('.activeNum').html(headerInfo.activeNum);
    $('.finishedNum').html(headerInfo.finishedNum);
    $('.postedNum').html(headerInfo.postedNum);
}

addInfoHeaderContent(mockHeaderInfo, mockUser);

class Product {
    constructor(productId, productName, quantity, price, sellerName, postDate) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.sellerName = sellerName;
        this.postDate = postDate;
        this.description = "(No description)";
        this.productImg = null;
    }
    setDescription(description) {
        this.description = description;
    }
    setProductImg(img) {
        this.productImg = img;
    }
    // Getter
    get element() {
        return this.createElement();
    }

    // Method for getter
    createElement() {
        const productElement = document.createElement('div');
        productElement.className += "row mt-3 mb-3 border-bottom product";

        const imgCol = document.createElement('div');
        imgCol.className += "col-12 col-md-2";
        const imgElement = document.createElement('img');
        imgElement.className += "rounded float-left";
        imgElement.setAttribute("alt", "...");
        imgElement.setAttribute("src", this.productImg);
        imgCol.appendChild(imgElement);

        const contentCol = document.createElement('div');
        contentCol.className += "col-8 col-md-7";
        const contentHeader = document.createElement('h3');
        const contentHeaderLink = document.createElement('a');
        contentHeaderLink.setAttribute("href", "#");
        contentHeaderLink.appendChild(document.createTextNode(this.productName));
        const contentHeaderQty = document.createElement('small');
        contentHeaderQty.appendChild(document.createTextNode(this.quantity));
        contentHeader.appendChild(contentHeaderLink);
        contentHeader.appendChild(document.createTextNode(' '));
        contentHeader.appendChild(contentHeaderQty);
        const contentInfo= document.createElement('p');
        const contentInfoLink = document.createElement('a');
        contentInfoLink.setAttribute("href", "#");
        contentInfoLink.appendChild(document.createTextNode(this.sellerName));
        const contentInfoDate = document.createElement('span');
        const dataFormat = { year: 'numeric', month: 'short', day: 'numeric' };
        contentInfoDate.appendChild(document.createTextNode(this.postDate.toLocaleDateString("en-US", dataFormat)));
        contentInfo.appendChild(contentInfoLink);
        contentInfo.appendChild(document.createTextNode(' posted on '));
        contentInfo.appendChild(contentInfoDate);
        const contentDescrib= document.createElement('p');
        contentDescrib.appendChild(document.createTextNode(this.description));
        contentCol.appendChild(contentHeader);
        contentCol.appendChild(contentInfo);
        contentCol.appendChild(contentDescrib);

        const priceCol = document.createElement('div');
        priceCol.className += "col-4 col-md-3 text-right";
        const priceStr = (this.price).toLocaleString('en-US', { style: 'currency', currency: 'USD'});
        priceCol.innerHTML = `<h2>${priceStr}</h2>`;

        productElement.appendChild(imgCol);
        productElement.appendChild(contentCol);
        productElement.appendChild(priceCol)
        return productElement;
    }
}

const mockProductData = [];
const product1 = new Product(1, "Frozen vegetables", "10 kg", 100, "User1", new Date(2018, 12, 23));
product1.setDescription("Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.");
product1.setProductImg("img/frozen_veg.png");
mockProductData.push(product1);
const product2 = new Product(2, "Canned soup", "20 unit", 89, "User3", new Date(2018, 12, 10));
product2.setDescription("Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.");
product2.setProductImg("img/canned_soup.jpg");
mockProductData.push(product2);

mockProductData.forEach(p => {
    $('#productContainer').append(p.element);
});
