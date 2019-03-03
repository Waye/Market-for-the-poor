"use strict";
console.log("nav.js")  // log to the JavaScript console.

const mockUser = {
    name: "user",
    password: "user",
    isBuyer: false,
    loggedIn: false,
    avatar: null,
    unreadNum: 3
}

const mockAdmin = {
    name: "admin",
    password: "admin",
    loggedIn: false,
    avatar: null
}

function addNavContent(user) {
    // Logo and home page redirect
    const logoLink = document.createElement("a");
    logoLink.className += "navbar-brand";
    logoLink.setAttribute("href", "feedpage.html");
    logoLink.innerText = "Logo"; // TODO replace it with dynamic logo image.
    $("#topNav").append(logoLink);

    // Search box input
    const searchInput = document.createElement("form");
    searchInput.className += "form-inline mr-auto";
    searchInput.setAttribute("action", "/action_page.php");
    const searchTextbox = document.createElement("input");
    searchTextbox.className += "form-control mr-sm-2 d-none d-sm-block";
    searchTextbox.setAttribute("type", "text");
    searchTextbox.setAttribute("placeholder", "Search");
    const searchBtn = document.createElement("button");
    searchBtn.className += "btn btn-light";
    searchBtn.setAttribute("type", "submit");
    searchBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            fill="#6c757d" />
        <path d="M0 0h24v24H0z" fill="none" />
    </svg>`;
    searchInput.appendChild(searchTextbox);
    searchInput.appendChild(searchBtn);
    $("#topNav").append(searchInput);

    // The rest of the buttons
    const navBtnUl = document.createElement("ul");
    navBtnUl.className += "navbar-nav";

    /// Post button
    const postBtn = document.createElement("li");
    postBtn.className += "nav-item ml-2";
    const postBtnLink = document.createElement("button");
    postBtnLink.className += "btn btn-success nav-link";
    postBtnLink.setAttribute("type", "button");
    postBtnLink.setAttribute("data-toggle","modal");
    postBtnLink.setAttribute("data-target", "#modal");
    postBtnLink.innerHTML = `<svg class="d-md-none d-sm-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
            fill="white" />
        <path d="M0 0h24v24H0z" fill="none" /></svg>`;
    const postBtnSpan = document.createElement("span")
    postBtnSpan.className += "d-none d-md-block";
    postBtnSpan.innerText = "Post a new ";
    postBtn.id="myModal";
    if (user.isBuyer) {
        // Buyer posts request
        postBtnSpan.innerText += "request";
    } else {
        // Seller posts offer
        postBtnSpan.innerText += "offer";
    }
    postBtnLink.appendChild(postBtnSpan)
    postBtn.appendChild(postBtnLink);



    /// Profile button
    const profileBtn = document.createElement("li");
    profileBtn.className += "nav-item ml-2";
    const profileBtnLink = document.createElement("a");
    profileBtnLink.className += "btn nav-link btn-info";
    profileBtnLink.setAttribute("href", "#");
    profileBtnLink.innerHTML = `<svg class="d-md-none d-sm-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`;
    const profileBtnSpan = document.createElement("span")
    profileBtnSpan.className += "d-none d-md-block";
    profileBtnSpan.innerText = "Profile";
    profileBtnLink.appendChild(profileBtnSpan);
    profileBtn.appendChild(profileBtnLink);

    /// Message button
    const msgBtn = document.createElement("li");
    msgBtn.className += "nav-item ml-2";
    const msgBtnLink = document.createElement("a");
    msgBtnLink.className += "btn nav-link btn-info";
    msgBtnLink.setAttribute("href", "messages.html");
    msgBtnLink.innerHTML = `<svg class="d-md-none d-sm-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`;
    const msgBtnSpan = document.createElement("span")
    msgBtnSpan.className += "d-none d-md-block";
    msgBtnSpan.innerText = "Messages ";
    msgBtnSpan.innerHTML += `<span class="badge badge-light">${mockUser.unreadNum}</span>`;
    msgBtnLink.appendChild(msgBtnSpan);
    msgBtn.appendChild(msgBtnLink);

    /// Logout button
    const logoutBtn = document.createElement("li");
    logoutBtn.className += "nav-item ml-2";
    const logoutBtnLink = document.createElement("a");
    logoutBtnLink.className += "btn nav-link btn-light";
    logoutBtnLink.setAttribute("href", "login.html");
    logoutBtnLink.innerHTML = `<svg class="d-md-none d-sm-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>`;
    const logoutBtnSpan = document.createElement("span")
    logoutBtnSpan.className += "d-none d-md-block";
    logoutBtnSpan.innerText = "Logout";
    logoutBtnLink.appendChild(logoutBtnSpan);
    logoutBtn.appendChild(logoutBtnLink);

    navBtnUl.append(postBtn);
    navBtnUl.append(profileBtn);
    navBtnUl.append(msgBtn);
    navBtnUl.append(logoutBtn)
    $("#topNav").append(navBtnUl);
}

addNavContent(mockUser);

