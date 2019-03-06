"use strict";
console.log("orderpage.js") // log to the JavaScript console.

const dataFormat = { year: 'numeric', month: 'short', day: 'numeric' };

function displayOrders(orderList, gotBuyerList) {
    let i = 0;
    orderList.forEach(order => {
        let progressbarVal = 10;
        if (order.status == "active") {
            progressbarVal = 50;
        } else if (order.status == "finished") {
            progressbarVal = 100;
        } else if (order.status == "posted") {
            const postedElementHtml = `
            <div class="row m-2 p-3 border-bottom">
                <div class="col-2 d-none d-md-block text-center order">
                    <img src="${order.producImage}" alt="...">
                </div>
                <div class="col-10  mt-auto mb-auto">
                    <div class="row">
                        <h5>${order.productName}. <small>Posted, no respond yet.</small></h5>
                    </div>
                </div>
            </div>`;
            $(".postContainer").append(postedElementHtml);
        }
        if (order.status != "posted") {
            const elementHtml = `
            <div class="row m-2 p-3 border-bottom">
                <div class="col-2 d-none d-md-block text-center order">
                    <img src="${order.producImage}" alt="...">
                </div>
                <div class="col-6 col-md-4 mt-auto mb-auto">
                    <div class="row">
                        <h5>${order.productName} <small>Arrives ${order.arriveDate.toLocaleDateString("en-US", dataFormat)}</small></h5>
                    </div>
                    <div class="row progress">
                        <div class="progress-bar" role="progressbar" style="width: ${progressbarVal}%;" aria-valuenow="${progressbarVal}"
                            aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="row d-flex justify-content-between align-items-center">
                        <small>Processing</small>
                        <small>Shipped</small>
                        <small>Delivered</small>
                    </div>
                </div>
                <div class="col-6">
                    <div class="row">
                        <div class="col-4 d-none d-sm-block text-center mt-auto mb-auto"><img alt="..." src="${gotBuyerList[i].avatar}" class="rounded-circle list-inline-item avatar"/></div>
                        <div class="col-sm-8">
                            <a href="#">${gotBuyerList[i].userName}</a>
                            <p><strong>Deliver to:</strong> ${order.shipAddr}</p>
                        </div>
                    </div>
                </div>
            </div>`;
            if (progressbarVal == 50 || progressbarVal == 10) {
                $(".activeContainer").append(elementHtml);
            } else if (progressbarVal == 100) {
                $(".finishContainer").append(elementHtml);
            }
        }
        i += 1;
    });
}

function updateStickyTitleInfo(headerInfo) {
    $("#stickyActiveNum").html(headerInfo.activeNum);
    $("#stickyFinishNum").html(headerInfo.finishedNum);
    $("#stickyPostNum").html(headerInfo.postedNum);
}

function getOrders() {
    const mockOrderList = []
    const mockOrder1 = {
        producImage: "img/frozen_veg.png",
        productName: "Frozen vegetables",
        status: "active",
        arriveDate: new Date(2019, 8, 21),
        shipAddr: "Bahen Centre for Information Technology St George St Toronto, ON M5S 2E4",
        buyerId: "1"
    }
    mockOrderList.push(mockOrder1);
    const mockOrder2 = {
        producImage: "img/canned_soup.jpg",
        productName: "Frozen vegetables",
        status: "finished",
        arriveDate: new Date(2019, 5, 12),
        shipAddr: "Bahen Centre for Information Technology St George St Toronto, ON M5S 2E4",
        buyerId: "2"
    }
    mockOrderList.push(mockOrder2);
    const mockOrder3 = {
        producImage: "img/nestea.jpg",
        productName: "Nestea Lemon",
        status: "posted",
        arriveDate: null,
        shipAddr: "",
        buyerId: ""
    }
    mockOrderList.push(mockOrder3);
    return mockOrderList;
}

function getBuyerList() {
    const gotBuyer1 = {
        userId: "1",
        avatar: "img/avatar_placeholder.png",
        userName: "user1",
    }
    const gotBuyer2 = {
        userId: "2",
        avatar: "img/avatar_placeholder.png",
        userName: "user2",
    }
    const gotBuyerList = [gotBuyer1, gotBuyer2];
    return gotBuyerList;
}

function main() {
    displayOrders(getOrders(), getBuyerList());
    updateStickyTitleInfo(getUser().orderInfo);
}
$(document).ready(main);

