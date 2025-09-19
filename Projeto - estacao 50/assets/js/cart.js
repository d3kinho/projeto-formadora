// adiciona item ao localStorage
function addToCart(productName, productSize, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemNameWithSize = `${productName} (${productSize})`;
    const existingItemIndex = cart.findIndex(item => item.name === itemNameWithSize);
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ name: itemNameWithSize, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
    showTopNotification(`"${itemNameWithSize}" foi adicionado ao carrinho!`, 'success');
}

// atualiza o ícone do carrinho
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTotalDesktop = document.querySelector('.cart-total');
    const cartCountDesktop = document.querySelector('.cart-count');
    const cartTotalMobile = document.querySelector('.cart-total-mobile span');
    const cartCountMobileBadge = document.querySelector('.cart-count-mobile-badge');
    const mobileCartBar = document.querySelector('.mobile-cart-bar');

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        if (item.price) {
            totalPrice += item.price * item.quantity;
        }
    });

    const formattedPrice = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;

    if (cartTotalDesktop && cartCountDesktop) {
        cartTotalDesktop.textContent = formattedPrice;
        cartCountDesktop.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`;
    }

    if (cartTotalMobile && cartCountMobileBadge && mobileCartBar) {
        if (totalItems > 0) {
            mobileCartBar.style.display = 'block';
            cartTotalMobile.textContent = formattedPrice;
            cartCountMobileBadge.textContent = totalItems;
        } else {
            mobileCartBar.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {

    const productCards = document.querySelectorAll('.pizza-card');

    productCards.forEach(card => {
        const sizeButtons = card.querySelectorAll('.size-btn');
        const buyButton = card.querySelector('.buy-button');
        const errorMessageDiv = card.querySelector('.product-error-message');

        sizeButtons.forEach(button => {
            button.addEventListener('click', () => {
                sizeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                if (errorMessageDiv) errorMessageDiv.classList.remove('show');

                const selectedPrice = parseFloat(button.dataset.price);
                const formattedPrice = `R$ ${selectedPrice.toFixed(2).replace('.', ',')}`;
                
                if (buyButton) {
                    buyButton.textContent = formattedPrice;
                    buyButton.dataset.priceText = formattedPrice; 
                }
            });
        });

        if (buyButton) {
            
            buyButton.addEventListener('mouseover', () => {

                if (buyButton.dataset.priceText) {
                    buyButton.textContent = 'COMPRAR';
                }
            });

            buyButton.addEventListener('mouseout', () => {

                if (buyButton.dataset.priceText) {
                    buyButton.textContent = buyButton.dataset.priceText;
                }
            });
            
            buyButton.addEventListener('click', () => {
                const productName = card.querySelector('.pizza-info h3').innerText;

            if (card.classList.contains('sem-tamanho')) {
                const productPrice = parseFloat(buyButton.dataset.price);
                    addToCart(productName, "", productPrice, card.dataset.image);

            } else {
            const activeSizeButton = card.querySelector('.size-btn.active');
            if (activeSizeButton) {
                const productSize = activeSizeButton.dataset.size;
                const productPrice = parseFloat(activeSizeButton.dataset.price);
                const productImage = card.dataset.image;
                addToCart(productName, productSize, productPrice);
            } else {
                
                if (errorMessageDiv) {
                    errorMessageDiv.textContent = `Por favor, selecione um tamanho.`;
                    errorMessageDiv.classList.add('show');
                }
                const sizeSelector = card.querySelector('.size-selector');
                if (sizeSelector) {
                    sizeSelector.classList.add('shake-error');
                    setTimeout(() => {
                        sizeSelector.classList.remove('shake-error');
                    }, 500); 
                }
            }
        }
    });
}
    });

    // atualiza o ícone do carrinho assim que a página carrega
    updateCartIcon();
});