"use strict";
console.log("feedpage.js") // log to the JavaScript console.

let currUser = null;
let currFeedData = [];
// Refresh
$("#refreshBtn").on('click', function() {
    clearAllFilter();
    $.get("/get_feeds", (feedData) => { updateFeed(feedData) });
});

// Sort
$("#sortOptionContainer").on('click', 'a', function() {
    const sortMethod = $(this).attr('id');
    let sortedFeed = currFeedData;
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
        return new Date(a.date) - new Date(b.date);
    });
    return feed;
}
function sortNew(feed) {
    feed.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
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
    if (minPrice != '' && minPrice == parseInt(minPrice)) updateFeed(filterMinPrice(minPrice, currFeedData));
    $("#maxPriceInput").val('');
});
$("#collapseFilter").on('click', '#maxPriceBtn', function() {
    const maxPrice = $("#maxPriceInput").val();
    if (maxPrice != '' && maxPrice == parseInt(maxPrice)) updateFeed(filterMaxPrice(maxPrice, currFeedData));
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
        if (filterList.includes(f.category)) filterResult.push(f);
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
    updateFeed(filterFeed(activeFilters, currFeedData));
}
$('#collapseCard').on('click', '#clearFilter', clearAllFilter)

function clearAllFilter() { // Click clear filter
    $('#collapseCard').find('.active').removeClass('active');
    $("#clearFilter").remove();
    updateFeed(currFeedData); // force update all feed
}

function addInfoHeaderContent(activeNum, finishedNum, postedNum, user) {
    if (user.isBuyer) {
        $('#feedName').html("Offer feed");
        $("#dollarCol").remove();
        $("#feedNavCol").attr("class", "col-12");
        $("#feedNavCol").find('h1').removeClass("display-4");
    } else {
        const totalTextLg = document.createElement("h1");
        totalTextLg.className += "display-4 d-none d-lg-block";
        const twoMonthTotal = 49000;
        totalTextLg.innerText = twoMonthTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD'});
        const totalTextMd = document.createElement("h1");
        totalTextMd.className += "d-lg-none d-md-block";
        totalTextMd.innerText = twoMonthTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD'});
        $('#dollarCol').append(totalTextLg);
        $('#dollarCol').append(totalTextMd);
        $('#dollarCol').append('<p class="text-left ml-md-3 text-muted">2-month total</p>');
        $('#feedName').html("Request feed");
    }
    $('.activeNum').html(activeNum);
    $('.finishedNum').html(finishedNum);
    $('.postedNum').html(postedNum);
}

function getFilterData(feedData) {
    // const gotPosts = currUser.posts;
    let foodFilterNum = 0;
    let electronicsFilterNum = 0;
    let clothingFilterNum = 0;
    let furnitureFilterNum = 0;
    let toolsFilterNum = 0;
    let otherFilterNum = 0;
    feedData.forEach(post => {
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
    const filterData = [
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
    return filterData;
}

function addFilter(feedData) {
    getFilterData(feedData).forEach(filterData => {
        $("#priceFilter").before(`
        <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-2" id="${filterData.filter}">
        ${filterData.filter}<span class="badge badge-light badge-pill" id="${filterData.filter}Num">${filterData.filterNum}
        </span></a>`);
    })
}

class Post {
    constructor(id, title, type, quantity, price, userName, userId, date) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
        this.userName = userName;
        this.userId = userId
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
        imgCol.className += "col-12 col-md-2 mb-3 text-center";
        const imgElement = document.createElement('img');
        imgElement.className += "rounded";
        imgElement.setAttribute("alt", "...");
        imgElement.setAttribute("src", this.image);
        imgCol.appendChild(imgElement);

        const contentCol = document.createElement('div');
        contentCol.className += "col-8 col-md-7";
        const contentHeader = document.createElement('h4');
        const contentHeaderLink = document.createElement('a');
        contentHeaderLink.setAttribute("href", "/detail/" + this.id);
        contentHeaderLink.appendChild(document.createTextNode(this.title));
        const contentHeaderQty = document.createElement('small');
        contentHeaderQty.appendChild(document.createTextNode(this.quantity));
        contentHeader.appendChild(contentHeaderLink);
        contentHeader.appendChild(document.createTextNode(' '));
        contentHeader.appendChild(contentHeaderQty);
        const contentInfo= document.createElement('p');
        const contentInfoLink = document.createElement('a');
        contentInfoLink.setAttribute("href", '/profile/' + this.userId);
        contentInfoLink.appendChild(document.createTextNode(this.userName));
        const contentInfoDate = document.createElement('span');
        const dataFormat = { year: 'numeric', month: 'short', day: 'numeric' };
        contentInfoDate.appendChild(document.createTextNode(new Date(this.date).toLocaleDateString("en-US", dataFormat)));
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

function getFeed(feedData) {
    const parsedPosts = [];
    feedData.forEach(gotPost => {
        const post1 = new Post(gotPost._id, gotPost.title, gotPost.category, 
            gotPost.quantity, gotPost.price, gotPost.userName, gotPost.userId, gotPost.date);
        post1.setDescription(gotPost.description);
        post1.setPostImg(gotPost.image);
        if (gotPost.image.length <= 0) {
            post1.setPostImg('/img/post-initial-image.png');
        }
        parsedPosts.push(post1);
    })
    return parsedPosts;
}

function updateFeed(feedData) {
    $('#productContainer').empty();
    getFeed(feedData).forEach(p => {
        $('#productContainer').append(p.element);
    });
}

function main() {
    $.get("/get_feeds_header")
    .then((result, status) => {
        currUser = result[0];
        addInfoHeaderContent(result[1], result[2], result[3], result[0]);
        return $.get("/get_feeds")
    })
    .then((feedData) => {
        currFeedData = feedData
        console.log(feedData)
        addFilter(feedData);
        updateFeed(feedData);
        feedData = feedData;
    })
    .catch((err) => {
        console.log("Feedpage main:", err);
    })
}
$(main);
