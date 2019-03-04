"use strict";
console.log("messages.js") // log to the JavaScript console.

const mockLogInUser = {name: "user1"}


class User{
    constructor(userId, profilePic, userName){
        this.userId = userId;
        this.profilePic = profilePic;
        this.userName = userName;
    }
}


class Message{
    constructor(user, title, content, sentDate, isRead) {
        this.user = user;
        this.title = title;
        this.content = content;
        this.sentDate = sentDate;
        this.isRead = isRead;
    }
}

class MessageDisplay{
    constructor(listOfMessages){
        this.listOfMessages = listOfMessages;
    }

    get element() {
        return this.createElement();
    }

    createElement() {
        const a = document.createElement("a");
        a.setAttribute("href", "msg_detail.html");
        a.className = "list-group-item list-group-item-action flex-column align-items-start pr-1"
        const div = document.createElement("div");
        div.className = "d-flex w-100 justify-content-between"
        a.appendChild(div);
        const ul = document.createElement("ul")
        ul.className = "col-2 list-inline m-0 p-0"
        const img = document.createElement("img");
        img.className = "list-inline-item rounded-circle avatar";
        img.setAttribute("src", "./img/avatar_placeholder.png");
        ul.appendChild(img);
        div.appendChild(ul)
        const li = document.createElement("li");
        li.className = "list-inline-item";
        ul.appendChild(li)
        const small = document.createElement("small")
        small.innerHTML = this.listOfMessages[0].user.userName;
        li.appendChild(small);
        const div2 = document.createElement("div");
        div2.className = "col-10";
        div.appendChild(div2);
        const div3 = document.createElement("div")
        div3.className = "d-flex justify-content-between";
        div2.appendChild(div3);
        const h5 = document.createElement("h5");
        div3.appendChild(h5)
        h5.innerHTML = "Order confirmation ";
        const small2 = document.createElement("small");
        small2.className = "border rounded p-1";
        small2.innerHTML = this.listOfMessages.length;
        h5.appendChild(small2);
        const span = document.createElement("span");
        span.innerHTML = this.listOfMessages[0].sentDate;
        div3.appendChild(span);
        const span2 = document.createElement("span");
        if (this.listOfMessages[0].isRead){
            span2.innerHTML = "Read"
            span2.className = "badge badge-pill badge-light";
            span2.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">-->
            <path d="M0 0h24v24H0z" fill="none" />-->
            <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" /></svg>`
        }
        else {
            span2.innerHTML = "New";
            span2.className = "badge badge-pill badge-primary";
        }
        span.appendChild(span2);
        const p = document.createElement("p");
        div2.appendChild(p);
        p.className = "text-truncate";
        p.innerHTML = this.listOfMessages[0].content;

        return a;
    }
}

const mockMessageData1 = [];
const user1 = new User("1", "./img/avatar_placeholder.png", "user1");
const msg1 = new Message(user1, "Order confirmation ", "Hello world", "4:34 March 3, 2019 ", true);
mockMessageData1.push(msg1);
const user2 = new User("2", "./img/avatar_placeholder.png", "user2");
const msg2 = new Message(user2, "Confirming order ", "World hello", "4:34 March 3, 9102 ", true);
mockMessageData1.push(msg2);

const mockMessageData2 = [];
const user3 = new User("3", "./img/avatar_placeholder.png", "user3");
const msg3 = new Message(user3, "Order confirmation ", "Hello world", "4:34 March 3, 2019 ", false);
console.log(msg3.isRead);
mockMessageData2.push(msg3);
const user4 = new User("4", "./img/avatar_placeholder.png", "user4");
const msg4 = new Message(user4, "Confirming order ", "World hello", "4:34 March 3, 9102 ", false);
mockMessageData2.push(msg4);

const md1 = new MessageDisplay(mockMessageData1);
const md2 = new MessageDisplay(mockMessageData2);

$('#end').before(md1.element);
$('#end').before(md2.element);

function changeColor() {
    
}