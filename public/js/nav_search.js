"use strict";
console.log("navbar.js")  // log to the JavaScript console.

// // Search box input
// $("#topNav").after(`
// <div class="modal" id="searchrResultModal" tabindex="-1" role="dialog" data-focus=false>
//     <div class="modal-dialog" role="document">
//         <div class="modal-content">
//             <div class="modal-body p-1 pl-3 pr-3">
//                 ${getSearchResult()}
//             </div>
//         </div>
//     </div>
// </div>`);

const dataFormatNav = { year: 'numeric', month: 'short', day: 'numeric'};

$("body").on('click', function(){
    $('#searchrResultModal').remove();
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
})
$("#topNav").on('keydown', '#searchInput', function(e){
    if (e.keyCode == 13) {
        if ($('#searchInput').val() == '') {
            $('#searchrResultModal').modal('hide')
        } else {
            console.log('enter')
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
                },
                error: function(result) {
                    $("#topNav").after(`
                        <div class="modal" id="searchrResultModal" tabindex="-1" role="dialog" data-focus=false>
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-body p-1 pl-3 pr-3">
                                        <p>No result found</p>
                                    </div>
                                </div>
                            </div>
                        </div>`)
                    $('#searchInput').val('')
                }
            })
        }
    }
});


function getSearchResult(result) {
    const html = ''
    for (let post of result) {
        post.date = new Date(post.date).toLocaleDateString("en-US", dataFormatNav)
        
        html += `<div class="row mt-2 mb-2 border-bottom result">
        <div class="col-3 mb-2"><img class="rounded" alt="..." src="${post.image}"></div>
        <div class="col-9">
            <h5><a href="/detail/${post._id}">Nestea Lemon, Pack of 12 cans</a> <small>5 packs</small></h5>
            <p>${post.userName} posted on <span>${post.date}</span></p>
        </div></div>`
    }
    return html
}


function main() {
    console.log("navbar.js in main")
}
$(document).ready(main);

// return `
//         <div class="row mt-2 mb-2 border-bottom result">
//         <div class="col-3 mb-2"><img class="rounded" alt="..." src="/img/nestea.jpg"></div>
//         <div class="col-9">
//             <h5><a href="/detail/buyer">Nestea Lemon, Pack of 12 cans</a> <small>5 packs</small></h5>
//             <p><a href="/profile">User2</a> posted on <span>Dec 9, 2018</span></p>
//         </div></div>

//         <div class="row mt-2 mb-2 border-bottom result">
//         <div class="col-3 mb-2"><img class="rounded" alt="..." src="/img/nestea.jpg"></div>
//         <div class="col-9">
//             <h5><a href="/detail/buyer">Nestea Lemon, Pack of 12 cans</a> <small>5 packs</small></h5>
//             <p><a href="/profile">User2</a> posted on <span>Dec 9, 2018</span></p>
//         </div></div>
        
//         <div class="row mt-2 mb-2 border-bottom result">
//         <div class="col-3 mb-2"><img class="rounded" alt="..." src="/img/nestea.jpg"></div>
//         <div class="col-9">
//             <h5><a href="/detail/buyer">Nestea Lemon, Pack of 12 cans</a> <small>5 packs</small></h5>
//             <p><a href="/profile">User2</a> posted on <span>Dec 9, 2018</span></p>
//         </div></div>`;