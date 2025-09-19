// cria notificações de barra no topo
function showTopNotification(message, type = 'info') {
    const notificationBar = document.getElementById('top-notification');
    const notificationMessage = document.getElementById('top-notification-message');
    if (!notificationBar || !notificationMessage) return;
    notificationMessage.textContent = message;
    notificationBar.className = `top-notification-bar top-notification-bar--${type}`;
    notificationBar.classList.add('show');
    setTimeout(() => {
        notificationBar.classList.remove('show');
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    const menuToggleButton = document.getElementById('mobile-menu-toggle');

    // mostra/esconde o menu e troca o ícone
    const toggleMenu = () => {
        const menuMobile = document.querySelector('.menu-mobile');
        const menuIcon = document.getElementById('mobile-menu-icon-img');

        const iconHamburger = 'assets/img/img_reserve/menu_white_36dp.png';
        const iconClose = 'assets/img/img_reserve/close_white_36dp.png';

        menuMobile.classList.toggle('open');

        if (menuMobile.classList.contains('open')) {
            menuIcon.src = iconClose;
            menuIcon.alt = "Fechar Menu";
        } else {
            menuIcon.src = iconHamburger;
            menuIcon.alt = "Abrir Menu";
        }
    };

    if (menuToggleButton) {
        menuToggleButton.addEventListener('click', toggleMenu);
    }

    // troca icons modo escuro
    const themeToggleFooterBtn = document.getElementById('theme-toggle-btn');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-btn-mobile');

    function updateIconsForTheme() {
        const isDarkMode = document.documentElement.classList.contains('dark-mode');

        const loginIcon = document.getElementById('login-icon-header');
        const cartIcon = document.getElementById('cart-icon-header');
        const cardapioIcon = document.getElementById('cardapio-menu-header-mobile');
        const homeIcon = document.getElementById('home-mobile-header-mobile');
        const loginmobIcon = document.getElementById('login-icon-header-mobile');
        const closeIcon = document.getElementById('close-icon-header');
        const xloginIcon = document.getElementById('close-icon-login');

        const iconPaths = {
            login: { dark: 'assets/img/account(white).png', light: 'assets/img/account.png' },
            cart: { dark: 'assets/img/cart(white).png', light: 'assets/img/cart.png' },
            cardapio: { dark: 'assets/img/ticket(white).png', light: 'assets/img/ticket.png' },
            home: { dark: 'assets/img/home(white).png', light: 'assets/img/home.png' },
            loginmob: { dark: 'assets/img/account(white).png', light: 'assets/img/account.png' },
            close: { dark: 'assets/img/img_reserve/close_white_36dp.png', light: 'assets/img/img_reserve/close_black_36dp.png' },
            xlogin: {dark: 'assets/img/img_reserve/close_white_36dp.png', light:'assets/img/img_reserve/close_black_36dp.png' }
        };

        if (loginIcon) loginIcon.src = isDarkMode ? iconPaths.login.dark : iconPaths.login.light;
        if (cartIcon) cartIcon.src = isDarkMode ? iconPaths.cart.dark : iconPaths.cart.light;
        if (cardapioIcon) cardapioIcon.src = isDarkMode ? iconPaths.cardapio.dark : iconPaths.cardapio.light;
        if (homeIcon) homeIcon.src = isDarkMode ? iconPaths.home.dark : iconPaths.home.light;
        if (loginmobIcon) loginmobIcon.src = isDarkMode ? iconPaths.loginmob.dark : iconPaths.loginmob.light;
        if (closeIcon) closeIcon.src = isDarkMode ? iconPaths.close.dark : iconPaths.close.light;
        if (xloginIcon) xloginIcon.src = isDarkMode ? iconPaths.xlogin.dark : iconPaths.xlogin.light;
    }

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark-mode');

        if (document.documentElement.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.removeItem('theme');
        }

        updateIconsForTheme();
    };

    if (themeToggleFooterBtn) themeToggleFooterBtn.addEventListener('click', toggleTheme);
    if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);

    updateIconsForTheme();
});

// login flutuante
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('loginModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const openModalBtnMobile = document.getElementById('openModalBtnMobile');
    const openBtns = [];

    if (openModalBtn) openBtns.push(openModalBtn);
    if (openModalBtnMobile) openBtns.push(openModalBtnMobile);

    const closeBtn = document.querySelector('.close-btn');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('senha');

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => modal.classList.remove('hidden'));
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }

    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.add('hidden');
        });
    }

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll(".category-btn");
    const menuContainers = document.querySelectorAll(".menu-container");

    if (categoryButtons.length > 0 && menuContainers.length > 0) {
        categoryButtons[0].classList.add("active");
        menuContainers[0].classList.add("active");

        categoryButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = button.getAttribute("data-target");

                categoryButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                menuContainers.forEach(container => container.classList.remove("active"));
                const targetContainer = document.getElementById(targetId);
                if (targetContainer) targetContainer.classList.add("active");
            });
        });
    }

    const increaseFontBtn = document.getElementById('increase-font-btn');
    const decreaseFontBtn = document.getElementById('decrease-font-btn');
    const htmlElement = document.documentElement;

    const fontLevels = {
        'default': '16px',
        'medium': '18px',
        'large': '20px'
    };

    const setFontSize = (level) => {
        htmlElement.style.fontSize = fontLevels[level];
        localStorage.setItem('fontSize', level);
    };

    const changeFontSize = (direction) => {
        const currentSize = getComputedStyle(htmlElement).fontSize;
        const levels = Object.keys(fontLevels);

        let currentLevelIndex = levels.findIndex(level => fontLevels[level] === currentSize);
        if (currentLevelIndex === -1) currentLevelIndex = 0;

        if (direction === 'increase' && currentLevelIndex < levels.length - 1) {
            currentLevelIndex++;
        } else if (direction === 'decrease' && currentLevelIndex > 0) {
            currentLevelIndex--;
        }

        setFontSize(levels[currentLevelIndex]);
    };

    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize && fontLevels[savedFontSize]) {
        setFontSize(savedFontSize);
    }

    if (increaseFontBtn) increaseFontBtn.addEventListener('click', () => changeFontSize('increase'));
    if (decreaseFontBtn) decreaseFontBtn.addEventListener('click', () => changeFontSize('decrease'));
});

// Carrinho de compras
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.name === productName);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ name: productName, quantity: 1, price: productPrice });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`"${productName}" adicionado ao carrinho!`);

    if (document.getElementById('cartItemsContainer')) {
        renderCartItems();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filters .filter-button');
    const productCards = document.querySelectorAll('.pizza-card');

    if (filterButtons.length > 0 && productCards.length > 0) {
        productCards.forEach(card => {
            card.querySelectorAll('.size-btn').forEach(button => {
                button.dataset.basePrice = button.dataset.price;
            });
        });

        filterButtons[0].classList.add('active');

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.currentTarget.classList.add('active');

                const surcharge = e.currentTarget.textContent.trim() === 'Premium' ? 10 : 0;
                updateAllProductPrices(surcharge);
            });
        });

        function updateAllProductPrices(surcharge) {
            productCards.forEach(card => {
                const sizeButtons = card.querySelectorAll('.size-btn');
                const buyButton = card.querySelector('.buy-button');

                sizeButtons.forEach(sizeBtn => {
                    const basePrice = parseFloat(sizeBtn.dataset.basePrice);
                    const newPrice = basePrice + surcharge;
                    sizeBtn.dataset.price = newPrice.toFixed(2);
                });

                const activeSizeButton = card.querySelector('.size-btn.active');
                if (activeSizeButton) {
                    const newPrice = parseFloat(activeSizeButton.dataset.price);
                    const formattedPrice = `R$ ${newPrice.toFixed(2).replace('.', ',')}`;
                    if (buyButton) {
                        buyButton.textContent = formattedPrice;
                        buyButton.dataset.priceText = formattedPrice;
                    }
                }
            });
        }
    }
});

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const subtotalSpan = document.getElementById('subtotal');
    const totalSpan = document.getElementById('total');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
    } else {
        cart.forEach((item, index) => {
            const itemPrice = item.price || 32.90;

            subtotal += itemPrice * item.quantity;

            const itemHTML = `
                <div class="item-carrinho" data-product-name="${item.name}" data-product-price="${itemPrice.toFixed(2)}">
                    <img src="${item.image || 'assets/img/pizzas/pizzaa.png'}" alt="${item.name}" class="item-imagem">
                    <div class="item-detalhes">
                        <h3>${item.name}</h3>
                    </div>
                    <div class="item-controles">
                        <a href="#" class="editar-item">Editar</a>
                        <div class="seletor-quantidade">
                            <button class="btn-qtd btn-decrease" onclick="updateQuantity(${index}, -1)">-</button>
                            <span class="quantidade">${item.quantity}</span>
                            <button class="btn-qtd btn-increase" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += itemHTML;
        });
    }

    subtotalSpan.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    totalSpan.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }
}

function clearCart() {
    localStorage.removeItem('cart');
    renderCartItems();
}

function goToPayment() {
    alert("Redirecionando para pagamento...");
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('cartItemsContainer')) {
        renderCartItems();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginModal form');
    if (!loginForm) return;

    const errorMessageDiv = loginForm.querySelector('.login-error');
    const inputFields = loginForm.querySelectorAll('input');

    if (errorMessageDiv) {
        inputFields.forEach(input => {
            input.addEventListener('input', () => {
                errorMessageDiv.classList.remove('show');
            });
        });
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const identificador = loginForm.querySelector('#identificador').value;
        const senha = loginForm.querySelector('#senha').value;
        const usuariosCadastrados = JSON.parse(localStorage.getItem('usuariosCadastrados')) || [];
        const usuarioEncontrado = usuariosCadastrados.find(
            user => (user.login === identificador || user.email === identificador)
        );

        if (usuarioEncontrado && usuarioEncontrado.senha === senha) {
            localStorage.setItem('sessaoAtiva', JSON.stringify({ login: usuarioEncontrado.login }));
            showTopNotification(`Bem-vindo(a) de volta, ${usuarioEncontrado.nome}!`, 'success');
            setTimeout(() => window.location.reload(), 2800);
        } else {
            if (errorMessageDiv) {
                errorMessageDiv.textContent = 'Usuário, e-mail ou senha incorretos.';
                errorMessageDiv.classList.add('show');
            }
        }
    });
});
