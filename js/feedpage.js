"use strict";
console.log("feedpage.js") // log to the JavaScript console.


// Refresh
$("#refreshBtn").on('click', function() {
    updateFeed(getFeed());
});


// Sort
$("#sortOptionContainer").on('click', 'a', function() {
    const sortMethod = $(this).attr('id');
    let sortedFeed = getFeed();
    if (sortMethod == "sortNew") {
        sortNew(sortedFeed);
    } else if (sortMethod == "sortOld") {
        sortOld(sortedFeed);
    } else if (sortMethod == "sortHigh") {
        sortHigh(sortedFeed);
    } else if (sortMethod == "sortLow") {
        sortLow(sortedFeed);        
    }
    updateFeed(sortedFeed);
})
function sortOld(feed) {
    feed.sort(function(a, b) {
        return a.postDate - b.postDate;
    });
    return feed;
}
function sortNew(feed) {
    feed.sort(function(a, b) {
        return b.postDate - a.postDate;
    });
    return feed;
}
function sortHigh(feed) {
    feed.sort(function(a, b) {
        return b.price - a.price;
    });
    return feed;
}
function sortLow(feed) {
    feed.sort(function (a, b) {
        return a.price - b.price;
    });
    return feed;
}


// Filter
$("#collapseFilter").on('click', '#minPriceBtn', function() {
    const minPrice = $("#minPriceInput").val();
    if (minPrice != '' && minPrice == parseInt(minPrice)) updateFeed(filterMinPrice(minPrice, getFeed()));
    $("#maxPriceInput").val('');
});
$("#collapseFilter").on('click', '#maxPriceBtn', function() {
    const maxPrice = $("#maxPriceInput").val();
    if (maxPrice != '' && maxPrice == parseInt(maxPrice)) updateFeed(filterMaxPrice(maxPrice, getFeed()));
    $("#minPriceInput").val('');
});
function filterMinPrice(minPrice, feedList) {
    const filterResult = [];
    feedList.forEach(f => {
        if (f.price >= minPrice) filterResult.push(f);
    })
    return filterResult;
}
function filterMaxPrice(maxPrice, feedList) {
    const filterResult = [];
    feedList.forEach(f => {
        if (f.price <= maxPrice) filterResult.push(f);
    })
    return filterResult;
}
$('#collapseFilter').on('click', 'a', function() {
    $(this).toggleClass('active');
    if ($('.active').length > 0 && $("#clearFilter").length == 0) {
        $("#collapseFilter").before(`<div class="card-header p-1 pl-3 pr-3" id="clearFilter"><span class="d-none d-md-block">Clear filters</span></div>`);
    } else if ($('.active').length == 0) {
        $("#clearFilter").remove();
    }
    handleFilter();
});
function filterFeed(filterList, feedList) {
    if (filterList.length <= 0) return feedList;
    const filterResult = [];
    feedList.forEach(f => {
        if (filterList.includes(f.type)) filterResult.push(f);
    })
    return filterResult;
}
function handleFilter() {
    const foundActiveFilters = $('#collapseCard').find('.active');
    const activeFilters = []
    for (let i = 0; i < foundActiveFilters.length; i++) {
        activeFilters.push(foundActiveFilters[i].id);
    }
    console.log(activeFilters);
    updateFeed(filterFeed(activeFilters, getFeed()));
}
$('#collapseCard').on('click', '#clearFilter', function() { // Click clear filter
    $('#collapseCard').find('.active').removeClass('active');
    $("#clearFilter").remove();
    updateFeed(getFeed()); // force update all feed
})

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
        $("#dollarCol").remove();
        $("#feedNavCol").attr("class", "col-12");
        $("#feedNavCol").find('h1').removeClass("display-4");
    } else {
        $('#feedName').html("Request feed");
    }
    $('.activeNum').html(headerInfo.activeNum);
    $('.finishedNum').html(headerInfo.finishedNum);
    $('.postedNum').html(headerInfo.postedNum);
}

function addFilter(filterDataList) {
    filterDataList.forEach(filterData => {
        $("#priceFilter").before(`<a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-2" id="${filterData.filter}">
        ${filterData.filter}<span class="badge badge-light badge-pill" id="foodFilterNum">${filterData.filterNum}</span></a>`);
    })
}

function getProductPageUrl(productId) {
    return "product_detail.html"
}

class Post {
    constructor(productId, productName, type, quantity, price, sellerName, postDate) {
        this.productId = productId;
        this.productName = productName;
        this.type = type;
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
        imgCol.className += "col-12 col-md-2 mb-3";
        const imgElement = document.createElement('img');
        imgElement.className += "rounded float-left";
        imgElement.setAttribute("alt", "...");
        imgElement.setAttribute("src", this.productImg);
        imgCol.appendChild(imgElement);

        const contentCol = document.createElement('div');
        contentCol.className += "col-8 col-md-7";
        const contentHeader = document.createElement('h3');
        const contentHeaderLink = document.createElement('a');
        contentHeaderLink.setAttribute("href", getProductPageUrl(this.productId));
        contentHeaderLink.appendChild(document.createTextNode(this.productName));
        const contentHeaderQty = document.createElement('small');
        contentHeaderQty.appendChild(document.createTextNode(this.quantity));
        contentHeader.appendChild(contentHeaderLink);
        contentHeader.appendChild(document.createTextNode(' '));
        contentHeader.appendChild(contentHeaderQty);
        const contentInfo= document.createElement('p');
        const contentInfoLink = document.createElement('a');
        contentInfoLink.setAttribute("href", "profile.html");
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
        const priceStr = (this.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        priceCol.innerHTML = `<h3>${priceStr}</h3>`;

        productElement.appendChild(imgCol);
        productElement.appendChild(contentCol);
        productElement.appendChild(priceCol)
        return productElement;
    }
}

function getFeed() {
    const mockProductData = [];
    const product1 = new Post(1, "Frozen vegetables", "food", "10 kg", 100, "User1", new Date(2018, 11, 23));
    product1.setDescription("Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.");
    product1.setProductImg("img/frozen_veg.png");
    mockProductData.push(product1);
    const product2 = new Post(2, "Canned soup", "food", "20 unit", 89, "User3", new Date(2018, 11, 10));
    product2.setDescription("Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.");
    product2.setProductImg("img/canned_soup.jpg");
    mockProductData.push(product2);
    return mockProductData;
}

function getHeaderInfo() {
    const mockHeaderInfo = {
        twoMonthTotal : 48300,
        activeNum : 3,
        finishedNum : 21,
        postedNum : 12
    }
    return mockHeaderInfo
}

function getFilterData() {
    const mockFilterData = [
        {
            filter: "food",
            filterNum: 14
        },
        {
            filter: "electronics",
            filterNum: 2
        },
        {
            filter: "clothings",
            filterNum : 1
        },
        {
            filter: "furnitures",
            filterNum : 3
        },
        {
            filter: "tools",
            filterNum : 4
        },
        {
            filter: "other",
            filterNum : 9
        }
    ]
    return mockFilterData;
}

function getUserFeedpage() {
    const mockUser = {
        name: "user",
        password: "user",
        isBuyer: true,
        loggedIn: false,
        avatar: null,
        unreadNum: 3
    }
    return mockUser;
}

function updateFeed(productData) {
    $('#productContainer').empty();
    if (productData) {
        productData.forEach(p => {
            $('#productContainer').append(p.element);
        });
    }
}

function main() {
    addInfoHeaderContent(getHeaderInfo(), getUserFeedpage());
    addFilter(getFilterData());
    updateFeed(getFeed());
}
$(document).ready(main);
