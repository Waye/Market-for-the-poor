const User = function (name, description, icon, isBuyer, phone) {
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.isBuyer = isBuyer;
    this.phone = phone;
}

const Post = function(id, date, title, userName, description, price, quantity, image, dueDate, type, category) {
    this.id = id;
    this.date = date;
    this.title = title;
    this.userName = userName;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
    this.dueDate = dueDate;
    this.type = type;
    this.category = category
}

//logged in as seller and request is from another buyer

//server call: send get request to get all info depending on type of the user logged in
const seller = new User('User2', 'Somewhere Over The Rainbow', 'img/avatar_placeholder.png', false, '(123) 111-1111')
const buyer = new User('User1', 'Twitter, Inc. 795 Folsom Ave, Suite 600 San Francisco, CA 94107', 'img/avatar_placeholder.png', true, '(123) 456-7890')
const post = new Post('0001', new Date(2018, 11, 31), 'Frozen Vegetables', 'User1',
 'Mix of 10 kinds of vegetables. Frozen and packaged safely. Easy to Cook while good in taste. Initial request of 10kg is made. After first purchase, we are willing to make ongoing, continuous orders if the quality of the product is approved.',
  100, '10 kg', 'img/frozen_veg.png', new Date(2019, 1, 6), 'request', 'Food');

// const currentUser = getUser();
const postOwner = (currentUser.isBuyer ? seller : buyer);

$(document).ready(function() {
    renderPostTitle()
    renderSlidePic()
    renderPostDate()
    renderUserTypeAndOfferType()
    renderPostOwnerImage()
    renderPostOwnerDescription()
    renderPostDescription()
})

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


function renderPostDate() {
    const timeDiff = (post.dueDate.getTime() - post.date.getTime())/1000;
    const dayDiff = Math.ceil(timeDiff/(3600 * 24))
    const postDate = post.date.toLocaleDateString("en-US", dateFormat)
    const dueDate = post.dueDate.toLocaleDateString("en-US", dateFormat)
    const html = `<p>Posted on:  <span id="postDate">${postDate}</span></p>
    <p>Needed before: <span id="dueDate">${dueDate}</span></p>
    <p>Days remaining: <span id="remainingDays">${dayDiff}</span></p>`
    $(dateInfo)[0].innerHTML = html;
}

function renderUserTypeAndOfferType() {
    let userType = null;
    let offerType = null;
    // if logged in as buyer, this post detail is a post from seller so user must make request. vice versa
    if (currentUser.isBuyer) {
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
    <h6 class="h-0 mt-2 mb-1">${postOwner.name}</h6></a>`
    $('#userImageContainer')[0].innerHTML = html
    console.log($('#userImageContainer')[0])
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
    if (currentUser.isBuyer) {
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