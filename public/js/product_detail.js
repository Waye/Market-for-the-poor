// const currentUser = getUser();
// const postOwner = (currentUser.isBuyer ? seller : buyer);

let postOwner;
let post;
let id;
let isBuyer;

$(document).ready(function() {
    getPostInfo();
});

function getPostInfo() {
    $.get("/detail/" + detailId + "/post").then((result) => {
        console.log("DetailId completed");
        post = result;
        id = result._id;
        return $.get("/profile_info")
    }).then((profileResult) => {
        console.log("Profile result completed");
        isBuyer = profileResult.isBuyer;
        return $.get("/detail/" + id + "/user")
    }).then((userResult) => {
        console.log("Render started");
        postOwner = userResult;
        renderPostTitle();
        renderSlidePic();
        // renderPostDate();
        renderUserTypeAndOfferType();
        renderPostOwnerImage();
        renderPostOwnerDescription();
        renderPostDescription();
        console.log("Render completed");
    });
}

function renderPostTitle() {
    const html = `<h3>${post.title}</h3><h3 class="ml-auto">$${post.price}</h3>
            <p class="ml-3">for <span>${post.quantity}</span></p>`
    $('#postTitle')[0].innerHTML = html;
}

function renderSlidePic() {
    const html = `<div class="carousel-item active"><img class="d-block w-100" src="${post.image}" alt="First slide"></div>
    <div class="carousel-item"><img class="d-block w-100" src="${post.image}" alt="Second slide"></div>
    <div class="carousel-item"><img class="d-block w-100" src="${post.image}" alt="Third slide"></div>`
    $('#imgSlideContainer')[0].innerHTML = html
}

const dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };


// function renderPostDate() {
//     console.log(typeof post.dueDate);
//     const timeDiff = (post.dueDate.getTime() - post.date.getTime())/1000;
//     const dayDiff = Math.ceil(timeDiff/(3600 * 24))
//     const postDate = post.date.toLocaleDateString("en-US", dateFormat)
//     const dueDate = post.dueDate.toLocaleDateString("en-US", dateFormat)
//     const html = `<p>Posted on:  <span id="postDate">${postDate}</span></p>
//     <p>Needed before: <span id="dueDate">${dueDate}</span></p>
//     <p>Days remaining: <span id="remainingDays">${dayDiff}</span></p>`
//     $(dateInfo)[0].innerHTML = html;
// }

function renderUserTypeAndOfferType() {
    let userType = null;
    let offerType = null;
    // if logged in as buyer, this post detail is a post from seller so user must make request. vice versa
    if (isBuyer) {
        userType = 'seller'
        offerType = 'request'
    } else {
        userType = 'buyer'
        offerType = 'offer'
    }
    const html = `<h4>About this ${userType}</h4>`
    $('#userType')[0].innerHTML = html;
    $('#makeOfferRequest')[0].innerHTML = `Make ${offerType}`
}


function renderPostOwnerImage() {
    const html = `<a href="#" class="text-center">
    <div class="mr-auto ml-auto"><img alt="..." src="${postOwner.icon}" class="rounded-circle avatar"></div>
    <h6 class="h-0 mt-2 mb-1">${postOwner.name}</h6></a>`;
    $('#userImageContainer')[0].innerHTML = html;
    console.log(postOwner.name);
}

function renderPostOwnerDescription() {
    const html = `<p>Description:  ${postOwner.description}</p><p>Phone #:  ${postOwner.phone}</p>`
    $('#userDescription')[0].innerHTML = html
}

function renderPostDescription() {
    const html = `<p class="text-left">${post.description}</p>`
    $('#postDescription')[0].innerHTML = html
}

$('body').on('click', '#makeOfferRequest', makeOffer)

// need server call. For phase 1, just a pop up.
function makeOffer() {
    const popUpMsg = $('#popUpMsg')
    let msg = ''
    if (isBuyer) {
        msg = 'request'
    } else {
        msg = 'offer'
    }
    
    popUpMsg.html(`<div class="alert alert-success fade show" role="alert">
    You have successfully made the ${msg}!</div>`)
    setTimeout(function() {
        $('.alert').alert('close')
        $('.alert').alert('dispose')
    }, 4000)
}