let cart = [];

// Cambiare sezione
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');

    if (id === "cart") {
        updateCart();
    }
}

// Aggiungere al carrello (senza duplicati)
function addToCart(name, price, qtyId) {
    let qty = parseInt(document.getElementById(qtyId).value);

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({
            name: name,
            price: price,
            qty: qty
        });
    }

    updateCart();
    alert("Aggiunto al carrello!");
}

// Rimuovere prodotto
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Aggiornare carrello
function updateCart() {
    let container = document.getElementById("cart-items");
    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p>Il carrello è vuoto</p>";
    }

    cart.forEach((item, index) => {
        container.innerHTML += `
            <div style="margin-bottom:10px; border-bottom:1px solid #ccc; padding:5px;">
                <p><strong>${item.name}</strong></p>
                <p>Quantità: ${item.qty}</p>
                <p>Prezzo: ${(item.price * item.qty).toFixed(2)}€</p>
                <button onclick="removeFromCart(${index})">❌ Rimuovi</button>
            </div>
        `;
        total += item.price * item.qty;
    });

    document.getElementById("cart-total").innerText = 
        "Totale: " + total.toFixed(2) + "€";
}

// Conferma ordine
function confirmOrder() {
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let zip = document.getElementById("zip").value;

    if (!name || !address || !city || !zip) {
        alert("Compila tutti i campi!");
        return;
    }

    if (cart.length === 0) {
        alert("Il carrello è vuoto!");
        return;
    }

    document.getElementById("confirmation").classList.remove("hidden");
    document.getElementById("confirmation").innerText =
        "Ordine confermato! Ti contatteremo dopo la verifica del pagamento.";

    cart = []; // svuota carrello
    updateCart();
}
