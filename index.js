import { menuArray } from '/data.js'
import {v4 as uuidv4} from 'https://jspm.dev/uuid'

const menuItems = document.getElementById("menu-items")
const orderedItems = document.getElementById("ordered-items")
const paymentModal = document.getElementById("payment-modal")
const payBtn = document.getElementById("pay-btn")
const paymentCompleteMessage = document.getElementById("payment-complete-message")
const billSection = document.getElementById("bill-section")
const paymentForm = document.getElementById("payment-form")
let totalPrice = document.getElementById("total-price")
let billTotal = 0
let orderedItem = []

function renderMenu(){

    
    menuArray.forEach(function(menuItem){
        let ingredientsHtml = ``
        // console.log(menuItem.ingredients)
    menuItem.ingredients.forEach(function(ingredient){
        ingredientsHtml += `${ingredient}, `})
        
        menuItems.innerHTML += `
        <div class="menu-item" data-item="${menuItem.id}">
            <p class="menu-emoji">${menuItem.emoji}</p>
            <div class="menu-item-text">
                <p class="item-name">${menuItem.name}</p>
                <p class="item-ingredients">${ingredientsHtml}</p>
                <p class="item-price">$${menuItem.price}</p>
            </div>
            <button 
                data-item="${menuItem.id}"
                class="add-to-order-btn"
                >+</button>
        </div>
    `    
    })
    
}
   
renderMenu()

document.addEventListener("click", function(e){
   if (e.target.dataset.item) {
       addToBill(e.target.dataset.item)
   } else if (e.target.id === "complete-order-btn") {
       completeOrder()
   } else {
       removeFromBill(e.target)
   }
})

function addToBill(itemClicked){
    if (orderedItems.childElementCount === 0){
        document.getElementById("bill-section").classList.toggle("hidden")
    }
    orderedItem = menuArray.filter(function(item){
        return item.id === Number(itemClicked)
    })[0]
    orderedItems.innerHTML += `
        <p id="${uuidv4()}" class="item-purchased">
            <span>${orderedItem.name} <a id="remove-item-btn">remove</a></span>
            <span class="money">${orderedItem.price}</span>
        </p>
    `
    billTotal += orderedItem.price
    totalPrice.innerHTML = `
        ${billTotal}
    `
}

function removeFromBill(itemClicked){
    let removeBtnClicked = itemClicked.parentElement.parentElement.id
    let deletedItem = document.getElementById(removeBtnClicked)
    let deletedItemPrice = document.getElementById(removeBtnClicked).children[1].innerHTML
    if (deletedItem.id == removeBtnClicked){
        deletedItem.remove()
    }
    totalPrice.innerHTML = billTotal -= Number(deletedItemPrice)
    if (orderedItems.childElementCount === 0 ){
        billSection.classList.toggle("hidden")
    }
}

function completeOrder(){
    paymentModal.classList.toggle("hidden")
}

paymentForm.addEventListener("submit", function makePayment(e){
    billSection.classList.toggle("hidden")
    paymentCompleteMessage.classList.toggle("hidden")
    paymentModal.classList.toggle("hidden")
    e.preventDefault()
    renderPaymentCompleteMessage()

})
function renderPaymentCompleteMessage(){
    const paymentFromData = new FormData(paymentForm)
    const userName = paymentFromData.get("user-name")
    paymentCompleteMessage.innerHTML = `
    <p>
       Thanks, ${userName} Your order is on its way!
    </p>
    `
}