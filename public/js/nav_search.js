"use strict";
console.log("navbar.js")  // log to the JavaScript console.

const dataFormatNav = { year: 'numeric', month: 'short', day: 'numeric'};

$("body").on('click', function(){
    $('#searchrResultModal').remove();
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
})
$("#topNav").on('keydown', '#searchInput', function(e){
    if (e.keyCode == 13) {
        e.preventDefault()
        if (!($('#searchInput').val() == '')) {
            const data = {
                keyword: $('#searchInput').val()
            }
            $.ajax({
                type: 'POST',
                url: '/search',
                data: data,
                success: function(result) {
                    $("#topNav").after(`
                        <div class="modal" id="searchrResultModal" tabindex="-1" role="dialog" data-focus=false>
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-body p-1 pl-3 pr-3">
                                        ${getSearchResult(result)}
                                    </div>
                                </div>
                            </div>
                        </div>`)
                    $('#searchrResultModal').modal('show');
                    // const offset = $("#searchInput").offset();
                    $("#searchrResultModal").css({
                        'top': $("#searchInput").top() + $("#searchInput").height() + 20,
                        'left': $("#searchInput").left() + 20
                    })
                },
                error: function(result) {
                    if (result.status == '500') {
                        alert('There is problem with server. Please try again later.')
                    }
                }
            })
        }
    } else if (e.keyCode == 27) {
        $('#searchInput').val('')
        $('#searchrResultModal').remove();
    }
});


function getSearchResult(result) {
    let html = ''
    let postImage = post.image;
    if (post.image == "") {
        postImage = "/img/post-initial-image.png";
    }
    for (let post of result) {
        post.date = new Date(post.date).toLocaleDateString("en-US", dataFormatNav)
        
        html += `<div class="row mt-2 mb-2 border-bottom result">
        <div class="col-3 mb-2"><img class="rounded" alt="..." src="${postImage}"></div>
        <div class="col-9">
            <h5><a href="/detail/${post._id}">${post.title}</a> <small>5 packs</small></h5>
            <p>${post.userName} posted on <span>${post.date}</span></p>
        </div></div>`
    }
    return html
}


function main() {
    console.log("navbar.js in main")
}
$(document).ready(main);
