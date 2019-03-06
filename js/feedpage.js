"use strict";
console.log("feedpage.js") // log to the JavaScript console.

// Refresh
$("#refreshBtn").on('click', function() {
    clearAllFilter();
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
        return a.date - b.date;
    });
    return feed;
}
function sortNew(feed) {
    feed.sort(function(a, b) {
        return b.date - a.date;
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
$('#collapseCard').on('click', '#clearFilter', clearAllFilter)

function clearAllFilter() { // Click clear filter
    $('#collapseCard').find('.active').removeClass('active');
    $("#clearFilter").remove();
    updateFeed(getFeed()); // force update all feed
}

function addInfoHeaderContent(headerInfo, userIsBuyer) {
    // console.log(userIsBuyer);
    if (userIsBuyer) {
        $('#feedName').html("Offer feed");
        $("#dollarCol").remove();
        $("#feedNavCol").attr("class", "col-12");
        $("#feedNavCol").find('h1').removeClass("display-4");
    } else {
        const totalTextLg = document.createElement("h1");
        totalTextLg.className += "display-4 d-none d-lg-block";
        totalTextLg.innerText = headerInfo.twoMonthTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD'});
        const totalTextMd = document.createElement("h1");
        totalTextMd.className += "d-lg-none d-md-block";
        totalTextMd.innerText = headerInfo.twoMonthTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD'});
        $('#dollarCol').append(totalTextLg);
        $('#dollarCol').append(totalTextMd);
        $('#dollarCol').append('<p class="text-left ml-md-3 text-muted">2-month total</p>');
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

function getProductPageUrl(id) {
    if (getUser().isBuyer) {
        return "product_detail_buyer.html"
    }
    return "product_detail_seller.html"
}

class Post {
    constructor(id, title, type, quantity, price, userName, date) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
        this.userName = userName;
        this.date = date;
        this.description = "(No description)";
        this.image = null;
    }
    setDescription(description) {
        this.description = description;
    }
    setPostImg(img) {
        this.image = img;
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
        imgElement.className += "rounded";
        imgElement.setAttribute("alt", "...");
        imgElement.setAttribute("src", this.image);
        imgCol.appendChild(imgElement);

        const contentCol = document.createElement('div');
        contentCol.className += "col-8 col-md-7";
        const contentHeader = document.createElement('h4');
        const contentHeaderLink = document.createElement('a');
        contentHeaderLink.setAttribute("href", getProductPageUrl(this.id));
        contentHeaderLink.appendChild(document.createTextNode(this.title));
        const contentHeaderQty = document.createElement('small');
        contentHeaderQty.appendChild(document.createTextNode(this.quantity));
        contentHeader.appendChild(contentHeaderLink);
        contentHeader.appendChild(document.createTextNode(' '));
        contentHeader.appendChild(contentHeaderQty);
        const contentInfo= document.createElement('p');
        const contentInfoLink = document.createElement('a');

        let profile = null
        if (getUser().isBuyer) {
            profile = 'profile_seller.html'
        } else {
            profile = 'profile_seller.html'
        }
        contentInfoLink.setAttribute("href", profile);
        contentInfoLink.appendChild(document.createTextNode(this.userName));
        const contentInfoDate = document.createElement('span');
        const dataFormat = { year: 'numeric', month: 'short', day: 'numeric' };
        contentInfoDate.appendChild(document.createTextNode(this.date.toLocaleDateString("en-US", dataFormat)));
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
        priceCol.innerHTML = `<h4>${priceStr}</h4>`;

        productElement.appendChild(imgCol);
        productElement.appendChild(contentCol);
        productElement.appendChild(priceCol)
        return productElement;
    }
}

function getFeed() {
    const gotPosts = getUser().posts;
    const parsedPosts = [];
    gotPosts.forEach(gotPost => {
        const post1 = new Post(gotPost.id, gotPost.title, gotPost.category, 
            gotPost.quantity, gotPost.price, gotPost.userName, gotPost.date);
        post1.setDescription(gotPost.description);
        post1.setPostImg(gotPost.image);
        parsedPosts.push(post1);
    })
    return parsedPosts;
}

function getFilterData() {
    const gotPosts = getUser().posts;
    let foodFilterNum = 0;
    let electronicsFilterNum = 0;
    let clothingFilterNum = 0;
    let furnitureFilterNum = 0;
    let toolsFilterNum = 0;
    let otherFilterNum = 0;
    gotPosts.forEach(post => {
        if (post.category == "food") {
            foodFilterNum += 1;
        } else if (post.category == "electronics") {
            electronicsFilterNum += 1;
        } else if (post.category == "clothing") {
            clothingFilterNum += 1;
        } else if (post.category == "furniture") {
            furnitureFilterNum += 1;
        } else if (post.category == "tools") {
            toolsFilterNum += 1;
        } else {
            otherFilterNum += 1;
        }
    })

    const mockFilterData = [
        {
            filter: "food",
            filterNum: foodFilterNum
        },
        {
            filter: "electronics",
            filterNum: electronicsFilterNum
        },
        {
            filter: "clothing",
            filterNum : clothingFilterNum
        },
        {
            filter: "furniture",
            filterNum : furnitureFilterNum
        },
        {
            filter: "tools",
            filterNum : toolsFilterNum
        },
        {
            filter: "other",
            filterNum : otherFilterNum
        }
    ]
    return mockFilterData;
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
    const currUser = getUser();
    addInfoHeaderContent(currUser.orderInfo, currUser.isBuyer);
    addFilter(getFilterData());
    updateFeed(getFeed());
}
$(document).ready(main);
