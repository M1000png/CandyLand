let cart = [];

// Cambiare sezione
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');

    if (id === "cart") {
        updateCart();
    }
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

// Rimuovere prodotto completamente
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Rimuovere quantità specifica
function removeQuantity(index, inputId) {
    let input = document.getElementById(inputId);
    let qtyToRemove = parseInt(input.value);

    if (!qtyToRemove || qtyToRemove <= 0) {
        alert("Inserisci una quantità valida");
        return;
    }

    let item = cart[index];

    if (qtyToRemove < item.qty) {
        item.qty -= qtyToRemove; // rimuove solo una parte
    } else {
        cart.splice(index, 1); // rimuove tutto se >=
    }

    updateCart();
}

// Aggiornare carrello
function updateCart() {
    let container = document.getElementById("cart-items");
    let totalText = document.getElementById("cart-total");

    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p>Il carrello è vuoto</p>";
        totalText.innerText = "";
        return;
    }

    cart.forEach((item, index) => {
        container.innerHTML += `
            <div style="margin-bottom:10px; border-bottom:1px solid #0ff; padding:10px;">
                <p><strong>${item.name}</strong></p>
                <p>Quantità: ${item.qty}</p>
                <p>Prezzo: ${(item.price * item.qty).toFixed(2)}€</p>

                <input type="number" min="1" value="1" id="remove-${index}" style="width:60px;">
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
        "Ordine confermato!";

    cart = [];
    updateCart();
}

Usa npm

Usa un tag <script>
Se non utilizzi strumenti di creazione, usa questa opzione per aggiungere e utilizzare l'SDK Firebase JS. Questa opzione va bene per iniziare, ma non è consigliata per le app di produzione. Scopri di più.

Copia e incolla gli script in fondo al tag <body>, ma prima di utilizzare qualsiasi servizio Firebase:

<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCGXamR4TsNwZ3b6rOJ0lcpKcQwBll9RDg",
    authDomain: "candy-1f2fc.firebaseapp.com",
    projectId: "candy-1f2fc",
    storageBucket: "candy-1f2fc.firebasestorage.app",
    messagingSenderId: "146950008413",
    appId: "1:146950008413:web:ff752225d2de01a72fe7b4",
    measurementId: "G-RHJ069R51E"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
