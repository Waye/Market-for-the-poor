"use strict";
console.log("nav.js")  // log to the JavaScript console.

const mockUser = {
    name: "user",
    password: "user",
    isBuyer: false,
    loggedIn: false,
    avatar: null
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
    searchTextbox.className += "form-control mr-sm-2 d-none d-md-block";
    searchTextbox.setAttribute("type", "text");
    searchTextbox.setAttribute("placeholder", "Search");
    const searchBtn = document.createElement("button");
    searchBtn.className += "btn btn-light";
    searchBtn.setAttribute("type", "submit");
    searchBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            fill="#007bff" />
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
    const postBtnLink = document.createElement("a");
    postBtnLink.className += "btn btn-success nav-link";
    postBtnLink.setAttribute("href", "#"); // TODO fix the link
    postBtnLink.innerHTML = `<svg class="d-md-none d-sm-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
            fill="white" />
        <path d="M0 0h24v24H0z" fill="none" /></svg>`;
    const postBtnSpan = document.createElement("span")
    postBtnSpan.className += "d-none d-md-block";
    postBtnSpan.innerText = "Post a new ";
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
    profileBtnLink.className += "btn nav-link btn-outline-primary";
    profileBtnLink.setAttribute("href", "#");
    profileBtnLink.innerText = "Profile";
    profileBtn.appendChild(profileBtnLink);

    /// Message button
    const msgBtn = document.createElement("li");
    msgBtn.className += "nav-item ml-2";
    const msgBtnLink = document.createElement("a");
    msgBtnLink.className += "btn nav-link btn-outline-primary";
    msgBtnLink.setAttribute("href", "messages.html");
    msgBtnLink.innerText = "Messages";
    msgBtn.appendChild(msgBtnLink);

    /// Logout button
    const logoutBtn = document.createElement("li");
    logoutBtn.className += "nav-item ml-2";
    const logoutBtnLink = document.createElement("a");
    logoutBtnLink.className += "btn nav-link btn-outline-secondary";
    logoutBtnLink.setAttribute("href", "#");
    logoutBtnLink.innerText = "Logout";
    logoutBtn.appendChild(logoutBtnLink);

    navBtnUl.append(postBtn);
    navBtnUl.append(profileBtn);
    navBtnUl.append(msgBtn);
    navBtnUl.append(logoutBtn)
    $("#topNav").append(navBtnUl);
}

addNavContent(mockUser);
