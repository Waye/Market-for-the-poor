function renderPostTitle() {
    const html = `<h3>${postTitle}</h3><h3 class="ml-auto">$${postPrice}</h3>
            <p class="ml-3">for <span>${postQuantity}</span></p>`
    $('#postTitle')[0].innerHTML = html;
}

function renderSlidePic() {
    let html = '';
    // postImages.forEach((postImg) => {
    // })
    if (postImages == "") {
        html += `<div class="carousel-item active"><img class="d-block w-100" src="/img/post-initial-image.png"></div>`
    } else {
        html += `<div class="carousel-item active"><img class="d-block w-100" src="${postImages}"></div>`
    }
    $('#imgSlideContainer')[0].innerHTML = html
}

const dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };

function renderPostDate() {
    const timeDiff = (new Date(postDueDate).getTime() - new Date(postDate).getTime())/1000;
    const dayDiff = Math.ceil(timeDiff/(3600 * 24))
    const postLocaleDate = new Date(postDate).toLocaleDateString("en-US", dateFormat)
    const dueLocaleDate = new Date(postDueDate).toLocaleDateString("en-US", dateFormat)
    const html = `<p>Posted on:  <span id="postDate">${postLocaleDate}</span></p>
    <p>Needed before: <span id="dueDate">${dueLocaleDate}</span></p>
    <p>Days remaining: <span id="remainingDays">${dayDiff}</span></p>`
    $(dateInfo)[0].innerHTML = html;
}

function renderUserTypeAndOfferType() {
    let userType = "";
    let offerType = "";
    // if logged in as buyer, this post detail is a post from seller so user must make request. vice versa
    console.log("PostOwner: ", postOwnerIsBuyer, "LoggedInUser: ", isBuyer)
    if (!postOwnerIsBuyer) {
        userType = "seller"
        offerType = "request"
    } else {
        userType = "buyer"
        offerType = "offer"
    }
    if (postOwnerIsBuyer != isBuyer) {
        const html = `<h4>About this ${userType}</h4>`
        console.log("RenderHtml: ", html)
        $('#userType')[0].innerHTML = html;
        $('#makeOfferRequest')[0].innerHTML = `Make ${offerType}`
    } else {
        const html = `<h4>About this ${userType}</h4>`
        $('#userType')[0].innerHTML = html;
        $("#makeOfferRequest").remove();
        if (postOwnerName == userName) $("#sendMsgBtn").addClass("disabled")
    }
}


function renderPostOwnerImage() {
    let postIcon = postOwnerIcon;
    if (postOwnerIcon == "") {
        postIcon = "/img/profile-image.jpg"
    }
    const html = `<a href="/profile/${postOwnerId}" class="text-center">
        <div class="mr-auto ml-auto"><img alt="..." src=${postIcon} class="rounded-circle avatar"></div>
    <h6 class="h-0 mt-2 mb-1">${postOwnerName}</h6></a>`;
    $('#userImageContainer')[0].innerHTML = html;
}

function renderPostOwnerDescription() {
    const html = `<p>Description:  ${postOwnerDescription}</p><p>Phone #:  ${postOwnerPhone}</p>`
    $('#userDescription')[0].innerHTML = html
}

function renderPostDescription() {
    const html = `<p class="text-left">${postDescription}</p>`
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

$(document).ready(function() {
    renderPostTitle()
    renderSlidePic()
    renderPostDate()
    renderUserTypeAndOfferType()
    renderPostOwnerImage()
    renderPostOwnerDescription()
    renderPostDescription()
})