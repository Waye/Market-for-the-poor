"use strict";
console.log("msg_detail.js") // log to the JavaScript console.

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

    get element() {
        return this.createElement();
    }

    createElement(){
        let div = document.createElement("div");
        if (this.user.userName == mockLogInUser.name){
            div.className = "card mr-3 ml-3 mb-3 bg-light";
        }
        else {
            div.className = "card mr-3 ml-3 mb-3";
        }
        let div2 = document.createElement("div2");
        div2.className = "card-body";
        div.appendChild(div2);
        let ul = document.createElement("ul");
        ul.className = "list-inline m-0";
        div2.appendChild(ul);
        let li = document.createElement("li");
        li.className = "list-inline-item";
        ul.appendChild(li);
        let img = document.createElement("img");
        img.className = "rounded-circle list-inline-item mb-3 avatar";
        img.setAttribute("src", "./img/profile-initial-image.png");
        li.appendChild(img);
        let li2 = document.createElement("li");
        li2.className = "list-inline-item";
        ul.appendChild(li2);
        let p = document.createElement("p");
        p.className = "m-0";
        let strong = document.createElement("strong");
        strong.innerHTML = this.user.userName;
        p.appendChild(strong);
        if (this.user.userName == mockLogInUser.name){
            let span = document.createElement("span");
            span.innerHTML = " (me)";
            p.appendChild(span);
        }
        let p2 = document.createElement("p");
        p2.className = "m-0";
        p2.innerHTML = this.sentDate;
        li2.appendChild(p);
        li2.appendChild(p2);

        let h5 = document.createElement("h5");
        h5.className = "card-title";
        h5.innerHTML = this.title;
        div2.appendChild(h5);
        let p3 = document.createElement("p");
        p3.className = "card-text";
        p3.innerHTML = this.content;
        div2.appendChild(p3);

        return div
    }
}


const user1 = new User("1", "./img/profile-initial-image.png", "user1");
const msg1 = new Message(user1, "Order confirmation ", "Hello world", "4:34 March 3, 2019 ", true);
const user2 = new User("2", "./img/profile-initial-image.png", "user2");
const msg2 = new Message(user2, "Confirming order ", "World hello", "4:34 March 3, 9102 ", true);
const user3 = new User("3", "./img/profile-initial-image.png", "user3");
const msg3 = new Message(user3, "Order confirmation ", "Hello world", "4:34 March 3, 2019 ", false);
const user4 = new User("4", "./img/profile-initial-image.png", "user4");
const msg4 = new Message(user4, "Confirming order ", "World hello", "4:34 March 3, 9102 ", false);

const mockMessageData = [];
mockMessageData.push(msg1);
mockMessageData.push(msg2);
mockMessageData.push(msg3);
mockMessageData.push(msg4);

let j;
for (j = 0; j < mockMessageData.length; j++) {
    $('#mainContainer').append(mockMessageData[j].element);
    console.log(mockMessageData[j].element);
}
