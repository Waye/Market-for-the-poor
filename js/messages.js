"use strict";
console.log("messages.js") // log to the JavaScript console.


const Message = function (from, to, title, content, date, isRead, isStarred) {
        this.from = from;
        this.to = to;
        this.title = title;
        this.content = content;
        this.date = date;
        this.isRead = isRead;
        this.isStarred = isStarred;    
}


const curUser = new User_post('User1', 'Somewhere Over The Rainbow', 'img/avatar_placeholder.png', false, '(123) 111-1111');
const messages = []
messages.push(new Message('User2', 'User1', "Offer Question", "Hey, Could you give me some explanation on what is included in the frozen vegetables in your offer? Thank you!", new Date(2019, 1, 11), true, true))
messages.push(new Message('User1', 'User2', "Answer To Question", "Hey, it includes broccoli, lettuce, sliced tomato, sliced potato, and green beans. Let me know if you are interested.", new Date(2019, 1, 12), true, false))
messages.push(new Message('User3', 'User1', "Regarding the Offer", "Hello, I was wondering if you could give me some explanation on what is included in the frozen vegetables in your offer. Thank you!", new Date(2019, 2, 11), true, false))
messages.push(new Message('User1', 'User3', "Response", "Hello, it includes broccoli, lettuce, sliced tomato, sliced potato, and green beans. Let me know if you are interested.", new Date(2019, 2, 13), false, false))

const dataFormat = { year: 'numeric', month: 'short', day: 'numeric' };


$(document).ready(function() {
    renderMenuSection()
    renderInboxOrSent(inboxFirstMsgFinder)
})


$('#sent').click(function() {
    resetActive()
    removeMainContainer()
    renderInboxOrSent(sentFirstMsgFinder)
    $('#sent').addClass('active')
})


$('#inbox').click(function() {
    resetActive()
    removeMainContainer()
    renderInboxOrSent(inboxFirstMsgFinder)
    $('#inbox').addClass('active')
})


$('#starred').click(function() {
    resetActive()
    removeMainContainer()
    renderStarred()
    $('#starred').addClass('active')
})


$('#newMsg').click(function() {
    resetActive()
    removeMainContainer()
    renderNewMessage()
    $('#newMsg').addClass('active')
})

$('body').on('click', '#cancel', removeMainContainer)
$('body').on('click', '#send', sendMessage)

function renderMenuSection() {
    let numSent = 0
    let numInbox = 0
    let numStarred = 0
    for (let m of messages) {
        if (m.from != curUser.name) {
            numInbox = numInbox + 1
        } else {
            numSent = numSent + 1
        }
        if (m.isStarred) {
            numStarred = numStarred + 1
        }
    }
    $('#inboxNum').html(numInbox)
    $('#sentNum').html(numSent)
    $('#starredNum').html(numStarred)
}


function renderInboxOrSent(firstMsgFinder) {
    const users = getUsersInvolved()
    let html = ''
    console.log(messages)
    for (let u of users) {
        const conversation = messages.filter(msg => msg.from == u || msg.to == u)
        
        // fist inbox message of conversation
        let m = getFirstMsg(firstMsgFinder, conversation)
        const date = m.date.toLocaleDateString("en-US", dataFormat)
        let status = (m.isRead ? 'Read' : 'New')
        html = html + `<a href="msg_detail.html" class="list-group-item list-group-item-action flex-column align-items-start pr-1">
        <div class="d-flex w-100 justify-content-between">
            <ul class="col-2 list-inline m-0 p-0">
                <img class="list-inline-item rounded-circle avatar" src="./img/avatar_placeholder.png">
                <li class="list-inline-item"><small>${m.from}</small></li>
            </ul>
            <div class="col-10">
                <div class="d-flex justify-content-between">
                    <h5>${m.title} <small class="border rounded p-1">${conversation.length}</small></h5><span>${date}
                    <span class="badge badge-pill badge-primary">${status}</span></span>
                </div>
                <p class="text-truncate">${m.content}</p>
            </div>
        </div></a>`
    }
    html = html + '<div id="end" class="card-footer text-center">No more messages</div>'
    $('#mainContainer').html(html)
}


function renderStarred() {
    let html = ''
    for (let m of messages) {
        if (m.isStarred) {
            const date = m.date.toLocaleDateString("en-US", dataFormat)
            html = html + `<a href="msg_detail.html" class="list-group-item list-group-item-action flex-column align-items-start pr-1">
            <div class="d-flex w-100 justify-content-between">
                <ul class="col-2 list-inline m-0 p-0">
                    <img class="list-inline-item rounded-circle avatar" src="./img/avatar_placeholder.png">
                    <li class="list-inline-item"><small>${m.from}</small></li>
                </ul>
                <div class="col-10">
                    <div class="d-flex justify-content-between">
                        <h5>${m.title}</h5><span>${date}
                        <span class="badge badge-pill badge-primary">${status}</span></span>
                    </div>
                    <p class="text-truncate">${m.content}</p>
                </div>
            </div></a>`
        }
    }
    html = html + '<div id="end" class="card-footer text-center">No more messages</div>'
    $('#mainContainer').html(html)
}

function renderNewMessage() {
    const html = `<div class="modal-content">
        <div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">New Message</h5></div>
        <div class="modal-body"><table class="table"><tbody>
        <tr><td>Message To:</td><td><input id="msgTo" type="text"></td></tr>
        <tr><td>Message Title:</td><td><input id="msgTitle" type="text"></td></tr>
        <tr><td>Content:</td><td><textarea id="msgContent" rows="5" cols="50" placeholder="Write your message"></textarea></td><td></td></tr>
        </tbody></table></div></div>
        <div class="modal-footer">
        <button id="cancel" type="button" class="btn btn-secondary cancel" data-dismiss="modal">Cancel</button>
        <button id="send" type="button" class="btn btn-primary send">Send</button></div>`
    $('#mainContainer').html(html)
}


function getUsersInvolved() {
    let users = []
    for (let m of messages) {
        if (!users.includes(m.from) && m.from != curUser.name) {
            users.push(m.from)
        }
        if (!users.includes(m.to) && m.to != curUser.name) {
            users.push(m.to)
        }
    }
    return users
}


function getFirstMsg(op, conversation) {
    for (let msg of conversation) {
        if (op(msg.from, curUser.name)) {
            return msg
        }
    }
}


function inboxFirstMsgFinder(a, b) {
    return a != b
}


function sentFirstMsgFinder(a, b) {
    return a == b
}


function removeMainContainer() {
    $('#mainContainer').html('')
}


function resetActive() {
    $('a').removeClass('active');
}

function sendMessage() {
    const to = $('#msgTo').val()
    const from = curUser.name
    const title = $('#msgTitle').val()
    const content = $('#msgContent').val()
    const date = (new Date()).toLocaleDateString(dataFormat)
    messages.push(new Message(to, from, title, content, date, false, false))
    removeMainContainer()
    renderMenuSection()
    const html = `<div class='row'><div class='col-md-2'></div>
    <div class='col-md-8'><br><br><h1>Message Sent Successfully !</h1<div class='col-md-2'></div></div>`
    $('#mainContainer').html(html)

}
