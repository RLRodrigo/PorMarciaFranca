// window.addEventListener('DOMContentLoaded', () => {
//   // Seleciona os elementos necessários
//   const shopBtn = document.querySelector('.shopBtn');
//   const cartBtn = document.querySelector('.cartBtn');
//   const itemContainer = document.querySelector('.item-container');
//   const tbody = document.querySelector('.tbody');
//   const checkoutBtn = document.querySelector('.checkout-btn');
//   const shopSec = document.querySelector('.shop');
//   const cartSec = document.querySelector('.cart');

//   // Verifica se há dados de carrinho no localStorage e os recupera
//   const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

//   // Mostra a seção de loja e esconde a seção do carrinho ao carregar a página
//   shopSec.style.display = 'block';
//   cartSec.style.display = 'none';

//   // Event listener para exibir a seção de loja ao clicar no botão "Shop"
//   shopBtn.addEventListener('click', () => {
//     cartSec.style.display = 'none';
//     shopSec.style.display = 'block';
//   });

//   // Event listener para exibir a seção do carrinho ao clicar no botão "Cart"
//   cartBtn.addEventListener('click', () => {
//     shopSec.style.display = 'none';
//     cartSec.style.display = 'block';
//   });

//   // Faz uma requisição GET para obter os dados dos produtos
//   fetch('http://localhost/myserver.php', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json'
//     }
//   })
//     .then(res => res.json())
//     .then(data => {
//       // Itera sobre os produtos retornados e cria os elementos HTML correspondentes
//       data.forEach(product => {
//         const div = document.createElement('div');
//         div.classList.add('item');
//         div.setAttribute('item-id', product.id);
//         div.innerHTML = `
//           <img src="./img/${product.image}">
//           <h3>${product.title}</h3>
//           <span class="price">$${product.price}/kg</span>
//           <button class="btn add-btn">Add To Cart</button>
//         `;
//         itemContainer.appendChild(div);

//         const addBtn = div.querySelector('.add-btn');
//         addBtn.addEventListener('click', () => {
//           const item = {
//             id: product.id,
//             title: product.title,
//             price: product.price,
//             image: product.image,
//             quantity: 1
//           };
//           addToCart(item);
//         });
//       });

//       // Atualiza a contagem do carrinho com base nos itens armazenados
//       updateCartCount();
//     });

//   // Função para adicionar um item ao carrinho
//   function addToCart(item) {
//     const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

//     if (existingItem) {
//       existingItem.quantity++;
//     } else {
//       cartItems.push(item);
//     }

//     // Salva os itens do carrinho atualizados no localStorage
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));

//     updateCartCount();
//   }

//   // Função para remover um item do carrinho
//   function removeFromCart(itemId) {
//     const itemIndex = cartItems.findIndex(item => item.id === itemId);

//     if (itemIndex !== -1) {
//       const item = cartItems[itemIndex];
//       item.quantity--;

//       if (item.quantity <= 0) {
//         cartItems.splice(itemIndex, 1);
//       }
//     }

//     // Salva os itens do carrinho atualizados no localStorage
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));

//     updateCartCount();
//   }

//   // Função para atualizar a contagem do carrinho
//   function updateCartCount() {
//     const cartCount = document.querySelector('.cart-count');
//     cartCount.textContent = cartItems.length;
//   }

//   // Event listener para o botão de checkout
//   checkoutBtn.addEventListener('click', () => {
//     let itemsToBuy = [];
//     const itemRows = document.querySelectorAll('.item-row');
//     itemRows.forEach(row => {
//       const itemId = row.getAttribute('item-id');
//       const quantityInput = row.querySelector('.quantity-input');
//       const quantity = parseInt(quantityInput.value, 10);

//       if (quantity > 0) {
//         const obj = {
//           id: itemId,
//           quantity: quantity
//         };
//         itemsToBuy.push(obj);
//       }
//     });

//     // Faz uma requisição POST para o servidor com os itens a serem comprados
//     fetch('http://localhost/myserver.php', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//       },
//       body: JSON.stringify(itemsToBuy)
//     })
//       .then(res => res.json())
//       .then(data => {
//         // Redireciona para o checkout usando a chave pública do Stripe
//         const stripePublicKey = 'SUA_CHAVE_PUBLICA_DO_STRIPE';
//         stripe = Stripe(stripePublicKey);
//         stripe.redirectToCheckout({ sessionId: data.id });
//       });
//   });

//   // Event listener para remover um item do carrinho
//   tbody.addEventListener('click', event => {
//     if (event.target.classList.contains('remove-btn')) {
//       const itemId = event.target.getAttribute('item-id');
//       removeFromCart(itemId);
//     }
//   });
// });
