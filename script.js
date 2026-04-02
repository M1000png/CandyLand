let cart = [];

// Cambiare sezione
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');

    if (id === "cart") updateCart();
}

// Aggiungere al carrello
function addToCart(name, price, qtyId) {
    let qty = parseInt(document.getElementById(qtyId).value);

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ name, price, qty });
    }

    updateCart();
}

// Rimuovere tutto
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Rimuovere quantità
function removeQuantity(index, inputId) {
    let qtyToRemove = parseInt(document.getElementById(inputId).value);

    if (isNaN(qtyToRemove) || qtyToRemove <= 0) {
        alert("Quantità non valida");
        return;
    }

    if (qtyToRemove >= cart[index].qty) {
        cart.splice(index, 1);
    } else {
        cart[index].qty -= qtyToRemove;
    }

    updateCart();
}

// Aggiorna carrello
function updateCart() {
    let container = document.getElementById("cart-items");
    let totalText = document.getElementById("cart-total");

    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p>Carrello vuoto</p>";
        totalText.innerText = "";
        return;
    }

    cart.forEach((item, index) => {
        container.innerHTML += `
            <div>
                <p><strong>${item.name}</strong></p>
                <p>Quantità: ${item.qty}</p>
                <p>Prezzo: ${(item.price * item.qty).toFixed(2)}€</p>

                <input type="number" min="1" value="1" id="remove-${index}">
                <button onclick="removeQuantity(${index}, 'remove-${index}')">➖</button>

                <button onclick="removeFromCart(${index})">❌</button>
            </div>
        `;
        total += item.price * item.qty;
    });

    totalText.innerText = "Totale: " + total.toFixed(2) + "€";
}

// Conferma ordine
function confirmOrder() {
    if (cart.length === 0) {
        alert("Carrello vuoto");
        return;
    }

    document.getElementById("confirmation").classList.remove("hidden");
    document.getElementById("confirmation").innerText = "Ordine confermato!";

    cart = [];
    updateCart();
}
