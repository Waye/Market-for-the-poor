"use strict";
console.log("messages.js") // log to the JavaScript console.


// get request to server to get current user's messages
// const messages = currentUser.messages;
const dataFormat = { year: 'numeric', month: 'short', day: 'numeric' };
let messages = []
let currentUser = null


//on load render whole page
$(document).ready(function() {
    //get request to set user 
    getUpdatedMessage().then(result => {
        currentUser = result.email
        renderInboxOrSent(inboxFirstMsgFinder, true)
        modifyNavMsgNum()
    }).catch((error) => {
        console.log("Error occurred")
    })
})


function getUpdatedMessage() {
    return $.ajax({
        type: 'GET',
        url: '/messages/updated',
        success: function(result) {
            console.log(result)
            messageDatefy(result)
        },
        error: function (error) {
            return error
        }
    })
}


$('#sent').click(function() {
    getUpdatedMessage().then((result) => {
        messages = result.messages
        resetActive()
        removeMainContainer()
        renderInboxOrSent(sentFirstMsgFinder, false)
        $('#sent').addClass('active')
        fillSelectedIcon('#sent path')
    }).catch((error) => {
        console.log("Error occurred")
        console.log(error)
    })
})

// Inbox selected in the left menu bar, display inbox messages in the middle
$('#inbox').click(function() {
    getUpdatedMessage().then((result) => {
        messages = result.messages
        resetActive()
        removeMainContainer()
        renderInboxOrSent(inboxFirstMsgFinder, true)
        $('#inbox').addClass('active')
        fillSelectedIcon('#inbox path')
    }).catch((error) => {
        console.log(error)
    })
})

// Starred selected in the left menu bar, display starred messages in the middle
$('#starred').click(function() {
    getUpdatedMessage().then((result) => {
        messages = result.messages
        resetActive()
        removeMainContainer()
        renderStarred()
        $('#starred').addClass('active')
        fillSelectedIcon('#starred path')
    })
})

// New Message selected in the left menu bar, display new message form in the middle
$('#newMsg').click(function() {
    resetActive()
    removeMainContainer()
    renderNewMessageForm()
    $('#newMsg').addClass('active')
    fillSelectedIcon('#newMsg path')
})

// On new message form, cancel is clicked. Remove form from the middle
$('body').on('click', '#cancel', removeMainContainer)

// On new message form, send is clicked. Send the message.
// Done
$('body').on('click', '#send', sendMessage)

// On starred section, after clicking the message, show the full content.
$('body').on('click', 'a.starred', function() {
    $(this).find('p').removeClass('text-truncate').addClass('text-left')
})

// Clicking on message will show full history
// Need to update all inbox with this target user to read
$('body').on('click', 'a.conversation', function() {
    const targetUser = $(this).find('small.targetUser')[0].innerHTML
    console.log(targetUser)
    if ($('#inbox').hasClass("active")) {
        const data = {
            from: targetUser,
            to: currentUser
        }
        $.ajax({
            type: 'PATCH',
            url: '/messages/read',
            data: data,
            success: function(result) {
                messages = result
                removeMainContainer()
                modifyNavMsgNum()
                renderMsgDetail(targetUser)
            }
        })
    } else {
        removeMainContainer()
        renderMsgDetail(targetUser)
    }
})

// Star or Unstar the message. Send update request to server inside the function to change the status of message
// Done
$('body').on('click', 'a.msgToStar', starOrUnstarMessage)

// Delete the message. Send delete Request to server inside the function.
// Done
$('body').on('click', 'a.msgToDelete', deleteMessage)

// Same as send message but more convenient UI for user. Send Post request to server inside the function
$('body').on('click', '#reply', sendReply)


function sendMessage() {
    const to = $('#msgTo').val()
    const from = currentUser
    const title = $('#msgTitle').val()
    const content = $('#msgContent').val()
    const data = {
        to: to,
        from: from,
        title: title,
        content: content,
        isStarred: false,
        isRead: false,
        date: new Date()
    }

    $.ajax({
        type: 'POST',
        data: data,
        url: '/messages/send_new',
        success: function(result) {
            if (result) {
                messages = result
                removeMainContainer()
                renderMenuSection()
                modifyNavMsgNum()
                const html = `<div class='row'><div class='col-md-2'></div>
                <div class='col-md-8'><br><br><h1>Message Sent Successfully !</h1<div class='col-md-2'></div></div>`
                $('#mainContainer').html(html)
            }
        }
    })
}


function starOrUnstarMessage() {
    const content = $(this).parent().parent().parent().find('p.msgDetailContent')[0].innerHTML
    const targetUser = $('#replyContainer').find('input')[0].id
    const data = {
        content: content,
        target: targetUser
    }
    console.log(content)
    console.log($(this).hasClass('active'))
    $.ajax({
        type: 'PATCH',
        data: data,
        url: '/messages/star_unstar',
        success: function(result) {
            messageDatefy(result)
            renderMenuSection()
            renderMsgDetail(targetUser)
        }
    })
}


function deleteMessage() {
    const content = $(this).parent().parent().parent().find('.msgDetailContent')[0].innerHTML
    const targetUser = $('#replyContainer').find('input')[0].id
    const data = {
        content: content,
        target: targetUser
    }

    $.ajax({
        type: 'DELETE',
        data: data,
        url: '/messages/delete',
        success: function(result) {
            console.log(result)
            messageDatefy(result)
            renderMenuSection()
            modifyNavMsgNum()
            renderMsgDetail(targetUser)
        }
        
    })
}


function sendReply() {
    // the reply input field id is set to be the target user.
    const to = $(this).parent().prev()[0].id
    const from = currentUser
    const title = `Reply from ${currentUser}`
    const content = $(this).parent().prev().val()
    console.log(to)
    console.log(content)
    const data = {
        to: to,
        from: from,
        title: title,
        content: content,
        date: new Date(),
        isStarred: false,
        isRead: false
    }
    $.ajax({
        type: 'POST',
        url: '/messages/send_new',
        data: data,
        success: function(result) {
            messages = result
            renderMenuSection()
            removeMainContainer()
            renderMsgDetail(to)
        }
    })
}


function renderMenuSection() {
    let numSent = 0
    let numInbox = 0
    let numStarred = 0
    for (let m of messages) {
        if (m.from != currentUser) {
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
        let status = ''
        if (isRenderingInbox) {
            targetUser = m.from
            status = (m.isRead ? '<span class="badge badge-pill badge-light">Read <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/></svg></span></span>' : '<span class="badge badge-pill badge-primary">New</span>')
        } else {
            targetUser = m.to
            status = '<span class="badge badge-pill badge-light">Sent<span>'
        }

        const date = m.date.toLocaleDateString("en-US", dataFormat)
        html = html + `<a class="conversation list-group-item list-group-item-action flex-column align-items-start pr-1">
        <div class="d-flex w-100 justify-content-between">
            <ul class="col-2 list-inline m-0 p-0">
                <img class="list-inline-item rounded-circle avatar" src="/img/avatar_placeholder.png">
                <li class="list-inline-item"><small class="targetUser">${targetUser}</small></li>
            </ul>
            <div class="col-10">
                <div class="d-flex justify-content-between">
                    <h5>${m.title} <small class="border rounded p-1">${conversation.length}</small></h5><span>${date}
                    ${status}</span>
                </div>
                <p class="text-truncate">${m.content}</p>
            </div>
        </div></a>`
    }
    html = html + '<div id="end" class="card-footer text-center">No more messages</div>'
    $('#mainContainer').html(html)
}



function renderMsgDetail(targetUser) {
    const conversation = messages.filter(msg => msg.from == targetUser || msg.to == targetUser)
    const len = conversation.length
    // Assign targetUser as input id so that when reply is made, we can construct new message using this id.
    let html = `<div id='replyContainer' class="input-group mb-3 mt-3 pr-3 pl-3">
    <input id="${targetUser}" type="text" class="form-control" placeholder="Reply..." aria-label="Recipient's username" aria-describedby="basic-addon2">
    <div class="input-group-append"><button id="reply" class="btn btn-primary" type="button">Send</button></div></div>`

    for (let i = len - 1; i >= 0; i--) {
        let m = conversation[i]
        // let date = m.date.toLocaleDateString("en-US", dataFormat)
        let svg = null
        // console.log(m.isStarred)
        if (m.isStarred) {
            svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#007bff"/>
            </svg>`
        } else {
            svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" fill="rgb(16,108,255)"></path>
            </svg>`
        }
        html = html +  `
        <div class="card mr-3 ml-3 mb-3 bg-light">
            <div2 class="card-body">
                <ul class="list-inline m-0 d-flex">
                    <li class="list-inline-item"><img class="rounded-circle list-inline-item mb-3 avatar" src="/img/avatar_placeholder.png"></li>
                    <li class="list-inline-item"><p class="m-0"><strong>${m.from}</strong></p><p class="m-0">${m.date}</p></li>
                    <li class="ml-auto">
                        <a class="msgToStar active ml-3">
                            ${svg}</a>
                        <a class="msgToDelete active ml-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="rgb(16,108,255)"></path>
                                </svg></a></li></ul>
                <h5 class="card-title">${m.title}</h5>
                <p class="card-text msgDetailContent">${m.content}</p>
            </div2>
        </div>`
    }
    $('#mainContainer').html(html)
}


function renderStarred() {
    let html = ''
    for (let m of messages) {
        if (m.isStarred) {
            const date = m.date.toLocaleDateString("en-US", dataFormat)
            let targetUser = (m.from == currentUser ? m.to : m.from)

            html = html + `<a class="starred list-group-item list-group-item-action flex-column align-items-start pr-1">
            <div class="d-flex w-100 justify-content-between">
                <ul class="col-2 list-inline m-0 p-0">
                    <img class="list-inline-item rounded-circle avatar" src="/img/avatar_placeholder.png">
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


function renderNewMessageForm() {
    const html = `<div class="modal-content border-0">
        <div class="modal-header border-0 border-top rounded-0"><h5 class="modal-title" id="exampleModalLabel">New Message</h5></div>
        <div class="modal-body"><table class="table"><tbody>
        <tr><td>Message To:</td><td><input id="msgTo" type="text"></td></tr>
        <tr><td>Message Title:</td><td><input id="msgTitle" type="text"></td></tr>
        <tr><td>Content:</td><td><textarea id="msgContent" rows="5" cols="50" placeholder="Write your message"></textarea></td><td></td></tr>
        </tbody></table></div></div>
        <div class="modal-footer">
        <button id="cancel" type="button" class="btn btn-secondary cancel" data-dismiss="modal">Discard</button>
        <button id="send" type="button" class="btn btn-primary send">Send</button></div>`
    $('#mainContainer').html(html)
}


function getUsersInvolved() {
    let users = []
    for (let m of messages) {
        if (!users.includes(m.from) && m.from != currentUser) {
            users.push(m.from)
        }
        if (!users.includes(m.to) && m.to != currentUser) {
            users.push(m.to)
        }
    }
    return users
}


function getFirstMsg(op, conversation) {
    const len = conversation.length
    for (let i = len - 1; i >= 0; i--) {
        if (op(conversation[i].from, currentUser)) {
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


function modifyNavMsgNum() {
    let unreadNum = 0;
    messages.forEach(msg => {if (!msg.isRead && msg.from != currentUser) {unreadNum++}})
    $('span.msgButtonNav').html(unreadNum)
}


function messageDatefy(obj) {
    for (let msg of obj.messages) {
        msg.date = new Date(msg.date)
    }
    messages = obj.messages
}


function fillSelectedIcon(iconSelector) {
    $('#sent path').attr('fill', 'black')
    $('#inbox path').attr('fill', 'black')
    $('#starred path').attr('fill', 'black')
    $('#newMsg path').attr('fill', 'black')
    $(iconSelector).attr('fill', 'white')
}
