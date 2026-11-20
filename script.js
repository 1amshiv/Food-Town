const menu = [
{ id: 1, name: "Margherita Pizza", price: 249, category: "pizza", icon: "🍕" },
{ id: 2, name: "Veg Loaded Pizza", price: 349, category: "pizza", icon: "🍕" },
{ id: 3, name: "Classic Burger", price: 129, category: "burger", icon: "🍔" },
{ id: 4, name: "Cheese Burger", price: 169, category: "burger", icon: "🍔" },
{ id: 5, name: "Paneer Roll", price: 119, category: "rolls", icon: "🌯" },
{ id: 6, name: "Egg Roll", price: 99, category: "rolls", icon: "🌯" },
{ id: 7, name: "Cold Coffee", price: 89, category: "drinks", icon: "🥤" },
{ id: 8, name: "Fresh Lime Soda", price: 59, category: "drinks", icon: "🍹" }
];

let cart = [];
let discountPercent = 0;
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let toastTimer;

const menuList = document.getElementById("menuList");
const cartBody = document.getElementById("cartBody");
const cartCount = document.getElementById("cartCount");
const couponMsg = document.getElementById("couponMsg");
const orderMsg = document.getElementById("orderMsg");
const historyList = document.getElementById("historyList");
const bankBox = document.getElementById("bankBox");
const bankFields = ["bankName", "accNo", "bankPass"];
const toast = document.getElementById("toast");

function showToast(text) {
toast.textContent = text;
toast.classList.add("show");
clearTimeout(toastTimer);
toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
}

function showHistory() {
historyList.innerHTML = "";
orders.forEach(order => {
const item = document.createElement("li");
item.textContent = `Order #${order.id}: ${order.items} | ${order.pay} | Rs. ${order.total} | ${order.paid ? "✔ PAID" : "Pay on delivery"}`;
historyList.appendChild(item);
});
if (orders.length === 0) {
historyList.innerHTML = "<li>No orders yet.</li>";
}
}

function showBank() {
const useBank = document.getElementById("bank").checked;
bankBox.hidden = !useBank;
bankFields.forEach(id => {
document.getElementById(id).required = useBank;
});
}

function showMenu(category) {
const items = category === "all" ? menu : menu.filter(item => item.category === category);
menuList.innerHTML = "";
items.forEach(item => {
const card = document.createElement("article");
card.innerHTML = `<div class="icon">${item.icon}</div><h3>${item.name}</h3><p>Rs. ${item.price}</p><button type="button" data-id="${item.id}">Add to cart</button>`;
menuList.appendChild(card);
});
}

function addToCart(id) {
const product = menu.find(item => item.id === id);
const found = cart.find(item => item.id === id);
if (found) {
found.qty++;
} else {
cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
}
const qty = cart.find(item => item.id === id).qty;
showToast(`1 ${product.name} added to cart (${qty} in cart)`);
showCart();
}

function changeQty(id, change) {
const found = cart.find(item => item.id === id);
found.qty += change;
if (found.qty <= 0) {
cart = cart.filter(item => item.id !== id);
}
showCart();
}

function showCart() {
cartBody.innerHTML = "";
let subtotal = 0;
let count = 0;
cart.forEach(item => {
const total = item.price * item.qty;
subtotal += total;
count += item.qty;
const row = document.createElement("tr");
row.innerHTML = `<th scope="row">${item.name}</th><td>Rs. ${item.price}</td><td><button class="qty" data-id="${item.id}" data-change="-1" type="button">-</button> ${item.qty} <button class="qty" data-id="${item.id}" data-change="1" type="button">+</button></td><td>Rs. ${total}</td>`;
cartBody.appendChild(row);
});
if (cart.length === 0) {
cartBody.innerHTML = '<tr><td colspan="4">Your cart is empty.</td></tr>';
}
const discount = Math.round(subtotal * discountPercent / 100);
let fee = 40;
if (subtotal >= 500 || subtotal === 0) {
fee = 0;
}
document.getElementById("subtotal").textContent = "Rs. " + subtotal;
document.getElementById("discount").textContent = "Rs. " + discount;
document.getElementById("fee").textContent = "Rs. " + fee;
document.getElementById("grand").textContent = "Rs. " + (subtotal - discount + fee);
cartCount.textContent = count;
}

document.querySelectorAll(".filter").forEach(button => {
button.addEventListener("click", () => {
document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
button.classList.add("active");
showMenu(button.dataset.cat);
});
});

menuList.addEventListener("click", event => {
if (event.target.tagName === "BUTTON") {
addToCart(Number(event.target.dataset.id));
}
});

cartBody.addEventListener("click", event => {
if (event.target.classList.contains("qty")) {
changeQty(Number(event.target.dataset.id), Number(event.target.dataset.change));
}
});

document.getElementById("applyCoupon").addEventListener("click", () => {
const code = document.getElementById("coupon").value.trim().toUpperCase();
if (code === "FIRST10") {
discountPercent = 10;
couponMsg.textContent = "Coupon applied: 10% off.";
} else {
discountPercent = 0;
couponMsg.textContent = "Invalid coupon code.";
}
showCart();
});

document.getElementById("orderForm").addEventListener("submit", event => {
event.preventDefault();
if (cart.length === 0) {
orderMsg.textContent = "Please add at least one item to your cart.";
return;
}
const form = event.target;
const name = form.name.value.trim();
const paid = form.pay.value === "Net banking";
const pay = paid ? "Net banking (" + form.bankName.value + ", A/C ending " + form.accNo.value.slice(-4) + ")" : form.pay.value;
const total = document.getElementById("grand").textContent;
const items = cart.map(item => `${item.name} x${item.qty}`).join(", ");
orders.unshift({ id: 1001 + orders.length, items: items, pay: pay, paid: paid, total: total.replace("Rs. ", "") });
localStorage.setItem("orders", JSON.stringify(orders));
orderMsg.textContent = (paid ? "✔ PAID. " : "") + `Thank you, ${name}! Your order of ${total} will be delivered to your address soon. Payment: ${pay}.`;
cart = [];
discountPercent = 0;
form.reset();
showBank();
showCart();
showHistory();
});

function showView(view) {
document.querySelectorAll("[data-view]").forEach(item => {
if (item.tagName === "SECTION") {
item.hidden = item.dataset.view !== view;
} else if (item.closest("nav")) {
item.classList.toggle("current", item.dataset.view === view);
}
});
}

document.querySelectorAll("a[data-view]").forEach(link => {
link.addEventListener("click", () => showView(link.dataset.view));
});

document.querySelectorAll("input[name=pay]").forEach(radio => radio.addEventListener("change", showBank));

document.querySelectorAll("[data-digits]").forEach(field => {
field.addEventListener("input", () => {
field.value = field.value.replace(/\D/g, "");
});
});

showView("home");
showHistory();
showMenu("all");
showCart();
