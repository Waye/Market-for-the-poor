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
messages.push(new Message('User2', 'User1', "Delivery Method", "Thank you very much for your kind response. Can you also inform me the method of delivery? Also, it would be great if you could inform us the processing time as well.", new Date(2019, 1, 14), false, true))
messages.push(new Message('User3', 'User1', "Regarding the Offer", "Hello, I was wondering if you could give me some explanation on what is included in the frozen vegetables in your offer. Thank you!", new Date(2019, 2, 11), true, false))
messages.push(new Message('User1', 'User3', "Response", "Hello, it includes broccoli, lettuce, sliced tomato, sliced potato, and green beans. Let me know if you are interested.", new Date(2019, 2, 13), true, false))

const dataFormat = { year: 'numeric', month: 'short', day: 'numeric' };


$(document).ready(function() {
    renderMenuSection()
    renderInboxOrSent(inboxFirstMsgFinder, true)
})


$('#sent').click(function() {
    resetActive()
    removeMainContainer()
    renderInboxOrSent(sentFirstMsgFinder, false)
    $('#sent').addClass('active')
})


$('#inbox').click(function() {
    resetActive()
    removeMainContainer()
    renderInboxOrSent(inboxFirstMsgFinder, true)
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
$('body').on('click', 'a.starred', function() {
    $(this).find('p').removeClass('text-truncate').addClass('text-left')
})


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


function renderInboxOrSent(firstMsgFinder, isRenderingInbox) {
    const users = getUsersInvolved()
    //get messages from server
    let html = ''

    for (let u of users) {
        const conversation = messages.filter(msg => msg.from == u || msg.to == u)

        // fist inbox message of conversation
        let m = getFirstMsg(firstMsgFinder, conversation)
        if (m == null) {
            continue
        }
        let targetUser = (isRenderingInbox ? m.from : m.to)
        let status = null
        if (isRenderingInbox) {
            targetUser = m.from
            status = (m.isRead ? 'Read' : 'New')
        } else {
            targetUser = m.to
            status = 'Sent'
        }

        const date = m.date.toLocaleDateString("en-US", dataFormat)
        html = html + `<a href="#" class="conversation list-group-item list-group-item-action flex-column align-items-start pr-1">
        <div class="d-flex w-100 justify-content-between">
            <ul class="col-2 list-inline m-0 p-0">
                <img class="list-inline-item rounded-circle avatar" src="./img/avatar_placeholder.png">
                <li class="list-inline-item"><small class="targetUser">${targetUser}</small></li>
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


$('body').on('click', 'a.conversation', function() {
    const targetUser = $(this).find('small.targetUser')[0].innerHTML
    console.log(targetUser)
    removeMainContainer()
    // renderReplyForm(targetUser)
    renderMsgDetail(targetUser)
})


function renderMsgDetail(targetUser) {
    const conversation = messages.filter(msg => msg.from == targetUser || msg.to == targetUser)
    const len = conversation.length
    // Assign targetUser as input id so that when reply is made, we can construct new message using this id.
    let html = `<div id='replyContainer' class="input-group mb-3 mt-3 pr-3 pl-3">
    <input id="${targetUser}" type="text" class="form-control" placeholder="Reply..." aria-label="Recipient's username" aria-describedby="basic-addon2">
    <div class="input-group-append"><button id="reply" class="btn btn-primary" type="button">Send</button></div></div>`

    for (let i = len - 1; i >= 0; i--) {
        let m = conversation[i]
        let date = m.date.toLocaleDateString("en-US", dataFormat)
        let svg = null
        if (m.isStarred) {
            svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#007bff">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            <path d="M0 0h24v24H0z" fill="none"/></svg>`
        } else {
            svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" fill="rgb(16,108,255)"></path>
            <path d="M0 0h24v24H0z" fill="none"></path></svg>`
        }
        html = html +  `
        <div class="card mr-3 ml-3 mb-3 bg-light">
            <div2 class="card-body">
                <ul class="list-inline m-0 d-flex">
                    <li class="list-inline-item"><img class="rounded-circle list-inline-item mb-3 avatar" src="./img/avatar_placeholder.png"></li>
                    <li class="list-inline-item"><p class="m-0"><strong>${m.from}</strong></p><p class="m-0">${date}</p></li>
                    <li class="ml-auto">
                        <a class="msgToStar active ml-3" href="#">
                            ${svg}</a>
                        <a class="msgToDelete active ml-3" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="rgb(16,108,255)"></path>
                                <path d="M0 0h24v24H0z" fill="none"></path></svg></a></li></ul>
                <h5 class="card-title">${m.title}</h5>
                <p class="card-text msgDetailContent">${m.content}</p>
            </div2>
        </div>`
    }
    $('#mainContainer').html(html)
}

$('body').on('click', 'a.msgToStar', starNewMessage)

function starNewMessage() {
    const content = $(this).parent().parent().parent().find('p.msgDetailContent')[0].innerHTML
    for (let msg of messages) {
        if (msg.content == content) {
            if (msg.isStarred) {
                msg.isStarred = false
            } else {
                msg.isStarred = true
            }
        }
    }
    const targetUser = $('#replyContainer').find('input')[0].id
    renderMenuSection()
    renderMsgDetail(targetUser)
}


// const Message = function (from, to, title, content, date, isRead, isStarred
$('body').on('click', '#reply', sendReply)
function sendReply() {
    // the reply input field id is set to be the target user.
    const to = $(this).parent().prev()[0].id
    const from = curUser.name
    const title = `Reply from ${curUser.name}`
    const content = $(`#${to}`).val()
    messages.push(new Message(from, to, title, content, new Date(), false, false))
    console.log(messages)
    renderMenuSection()
    removeMainContainer()
    renderMsgDetail(to)
}


function renderStarred() {
    let html = ''
    for (let m of messages) {
        if (m.isStarred) {
            const date = m.date.toLocaleDateString("en-US", dataFormat)
            let targetUser = (m.from == curUser.name ? m.to : m.from)

            html = html + `<a href='#' class="starred list-group-item list-group-item-action flex-column align-items-start pr-1">
            <div class="d-flex w-100 justify-content-between">
                <ul class="col-2 list-inline m-0 p-0">
                    <img class="list-inline-item rounded-circle avatar" src="./img/avatar_placeholder.png">
                    <li class="list-inline-item"><small>${targetUser}</small></li></ul>
                <div class="col-10">
                    <div class="d-flex justify-content-between">
                        <h5>${m.title}</h5><span>${date}</span>
                    </div>
                    <p class="text-truncate">${m.content}</p></div>
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
    const len = conversation.length
    for (let i = len - 1; i >= 0; i--) {
        if (op(conversation[i].from, curUser.name)) {
            return conversation[i]
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
    // const date = (new Date()).toLocaleDateString(dataFormat)
    messages.push(new Message(from, to, title, content, new Date(), false, false))
    removeMainContainer()
    renderMenuSection()
    const html = `<div class='row'><div class='col-md-2'></div>
    <div class='col-md-8'><br><br><h1>Message Sent Successfully !</h1<div class='col-md-2'></div></div>`
    $('#mainContainer').html(html)
}


