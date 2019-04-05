"use strict";
console.log(targetUserId)
// server call to get posts
let posts = []
let filterResult = []

function createPost(post) {
    const detail = '/detail/' + post._id;
    const onePost = `<!--one post-->
    <div class="col-lg-3 col-md-6 col-sm-6 mb-4 post-column">
        <div class="card shadow postCard" >
            <!--Card image-->
            <div class="image-constrain">
                <img src="${post.image}"  class="card-img-top post-img p-3" >
            </div>
            <!--Card content-->
            <div class="card-body text-center">
                <!--Title & role-->
                <h6 class="post-title font-weight-bold font-italic text-truncate">${post.title}</h6>
                <h6 class="post-role text-primary">${post.price}, <small>${post.quantity}</small></h6>
                <a href="${detail}" class="btn btn-light">Detail</a>
                <!--<a href="" class="btn btn-light" >Modify</a>-->
            </div>
        </div>
    </div>`;
    return onePost;
}

function renderPage(pagenum, postgroup) {
    $('#post-TwoRow').html('')

    let end = pagenum * 8
    let start = end - 8
    let html = ``

    if (postgroup.length < end) {
        end = postgroup.length
    }

    html = html + `<div class="row fadeIn post-row">`
    for (let i = start; i < end; i++) {
        html = html + createPost(postgroup[i])
        if (i === start + 3) {
            html = html + `</div>`
            html = html + `<div class="row fadeIn post-row">`
        } else if (i === end - 1) {
            html = html + `</div>`
        }
    }

    $('#post-TwoRow').append(html)
}

function createPagination(groupPost) {
    $('#pagenav').html('')

    let pagenumber = Math.ceil(groupPost.length / 8)

    for (let i = 1; i <= pagenumber; i++) {
        let li = `
        <li class="page-item " id="${i}">
            <a class="page-link " href="#">${i}
            <!--<span class="sr-only">(current)</span>-->
            </a>
        </li>`;

        $('#pagenav').append(li);
    }
}

//filter for nav-filter-bar
function filter(keyword) {
    filterResult = []
    if (keyword == "Total") {
        filterResult = posts
    } else {
        posts.forEach(f => {
            if (f.category == keyword) {
                filterResult.push(f)
            }
        })
    }

}

//use id to listen id for pagination
$('#pagenav').on('click', '.page-item', function () {
    const key = $(this).attr('id')
    renderPage(key, filterResult)
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// find keyword to filter
$('#filter-apply-nav').on('click', '.nav-item', function () {
    filter($(this).find(".nav-link").attr("id"))
    createPagination(filterResult)
    renderPage(1, filterResult)
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function main() {
    $.get("/get_posts/" + targetUserId).then(
    (result) => {
        // console.log(result);
        posts = result;
        filter('Total');
        renderPage(1, filterResult);
        createPagination(filterResult);    
    });
}
$(document).ready(main);