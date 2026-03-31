let cart = [];
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}
function addToCart(name, price, qtyId) {
    let qty = parseInt(document.getElementById(qtyId).value);
    cart.push({
        name: name,
        price: price,
        qty: qty
    });
    updateCart();
    alert("Aggiunto al carrello!");
}
function updateCart() {
    let container = document.getElementById("cart-items");
    container.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        container.innerHTML += `
            <p>${item.name} x${item.qty} = ${(item.price * item.qty).toFixed(2)}€</p>
        `;
        total += item.price * item.qty;
    });
    document.getElementById("cart-total").innerText = 
        "Totale: " + total.toFixed(2) + "€";
}
function confirmOrder() {
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let zip = document.getElementById("zip").value;
    if (!name || !address || !city || !zip) {
        alert("Compila tutti i campi!");
        return;
    }
    document.getElementById("confirmation").classList.remove("hidden");
    document.getElementById("confirmation").innerText =
        "Ordine confermato! Ti contatteremo dopo la verifica del pagamento.";
}