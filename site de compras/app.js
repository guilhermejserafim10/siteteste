// Lista de produtos no carrinho
let cartItems = [];

// Função para atualizar o conteúdo do modal do carrinho
function updateCartModal() {
    const cartModalBody = document.getElementById("cartItems");
    cartModalBody.innerHTML = ""; // Limpa o conteúdo do modal

    if (cartItems.length === 0) {
        cartModalBody.innerHTML = "<p>Seu carrinho está vazio.</p>";
    } else {
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item", "d-flex", "justify-content-between", "align-items-center", "mb-3");
            
            cartItem.innerHTML = `
                <div>
                    <h6>${item.name}</h6>
                    <small>Quantidade: ${item.quantity}</small>
                </div>
                <span class="text-success font-weight-bold">R$${item.price}</span>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remover</button>
            `;

            cartModalBody.appendChild(cartItem);
        });

        // Adiciona total do carrinho
        const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        const totalElement = document.createElement("div");
        totalElement.classList.add("d-flex", "justify-content-between", "align-items-center", "mt-4", "font-weight-bold");
        totalElement.innerHTML = `<span>Total:</span><span>R$${totalAmount.toFixed(2)}</span>`;
        cartModalBody.appendChild(totalElement);
    }
}

// Função para adicionar um produto ao carrinho
function addToCart(productId, productName, productPrice) {
    // Verifica se o item já está no carrinho
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
        // Se já estiver, aumenta a quantidade
        existingItem.quantity += 1;
    } else {
        // Se não, adiciona um novo item
        cartItems.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    // Atualiza o modal do carrinho
    updateCartModal();
}

// Função para remover um item do carrinho
function removeFromCart(index) {
    cartItems.splice(index, 1); // Remove o item pelo índice
    updateCartModal();
}

// Adiciona o evento de clique a todos os botões "Adicionar ao Carrinho"
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const productId = parseInt(button.getAttribute("data-id"));
        const productName = button.parentElement.querySelector(".card-title").textContent;
        const productPrice = parseFloat(button.parentElement.querySelector(".text-success").textContent.replace("R$", ""));
        
        addToCart(productId, productName, productPrice);
        alert(`O produto "${productName}" foi adicionado ao carrinho!`);
    });
});
