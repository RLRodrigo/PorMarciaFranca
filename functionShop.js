function showShop() {
  const shopSection = document.querySelector('.shop');
  const cartSection = document.querySelector('.cart');
  shopSection.style.display = 'block';
  cartSection.style.display = 'none';
}

function showCart() {
  const shopSection = document.querySelector('.shop');
  const cartSection = document.querySelector('.cart');
  shopSection.style.display = 'none';
  cartSection.style.display = 'block';
}

window.addEventListener('DOMContentLoaded', () => {
  const shopBtn = document.querySelector('.shopBtn');
  const cartBtn = document.querySelector('.cartBtn');
  const itemContainer = document.querySelector('.item-container');
  const tbody = document.querySelector('.tbody');
  const checkoutBtn = document.querySelector('.checkout-btn');

  shopBtn.addEventListener('click', showShop);
  cartBtn.addEventListener('click', showCart);

  const cartItems = [];

  function showMessage(message) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
    }, 2000);
  }

  itemContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-btn')) {
      const item = event.target.parentElement;
      const itemId = item.getAttribute('data-id');
      const itemImg = item.querySelector('img').getAttribute('src');
      const itemTitle = item.querySelector('h3').textContent;
      const itemPrice = item.querySelector('.price').textContent;

      const existingItem = cartItems.find((cartItem) => cartItem.id === itemId);

      if (existingItem) {
        existingItem.quantity++;
        const quantityInput = tbody.querySelector(`[item-id="${itemId}"] .quantity-input`);
        quantityInput.value = existingItem.quantity;
      } else {
        const tr = document.createElement('tr');
        tr.classList.add('item-row', 'responsive-row');
        tr.setAttribute('item-id', itemId);
        tr.innerHTML = `
          <td class="item-img"><img class="img-small" src="${itemImg}" alt="${itemTitle}"></td>
          <td>${itemTitle}</td>
          <td>${itemPrice}</td>
          <td><input type="number" class="quantity-input" value="1" min="1"></td>
          <td><button class="rm-btn">Remove</button></td>
        `;

        tbody.insertBefore(tr, tbody.lastElementChild);
        cartItems.push({
          id: itemId,
          quantity: 1
        });
      }

      updateTotal();
      showMessage('Item adicionado ao carrinho');
    }
  });

  tbody.addEventListener('click', (event) => {
    if (event.target.classList.contains('rm-btn')) {
      const row = event.target.parentElement.parentElement;
      const itemId = row.getAttribute('item-id');
      row.remove();

      const itemIndex = cartItems.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
      }

      updateTotal();
    }
  });

  tbody.addEventListener('change', (event) => {
    if (event.target.classList.contains('quantity-input')) {
      const row = event.target.parentElement.parentElement;
      const itemId = row.getAttribute('item-id');
      const quantity = parseInt(event.target.value);

      const item = cartItems.find((item) => item.id === itemId);
      if (item) {
        item.quantity = quantity;
        updateTotal();
      }
    }
  });

  function updateTotal() {
    let total = 0;
    const rows = document.querySelectorAll('.item-row');
    rows.forEach((row) => {
      const price = parseFloat(row.children[2].textContent.replace('$', ''));
      const quantity = parseInt(row.children[3].querySelector('.quantity-input').value);
      total += price * quantity;
    });

    const totalRow = document.querySelector('.totalRow td');
    totalRow.textContent = `Total: $${total.toFixed(2)}`;

    checkoutBtn.disabled = total === 0;
  }

  checkoutBtn.addEventListener('click', () => {
    const itemsToBuy = [];
    const itemRows = document.querySelectorAll('.item-row');
    itemRows.forEach((row) => {
      const itemId = row.getAttribute('item-id');
      const quantity = row.querySelector('.quantity-input').value;

      itemsToBuy.push({
        id: itemId,
        quantity: quantity
      });
    });

    fetch('http://localhost:8080/myserver.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(itemsToBuy)
    })
      .then((res) => res.json())
      .then((data) => {
        // Substitua 'INSERT_YOUR_OWN_STRIPE_PUBLIC_KEY_HERE' pela sua chave pública do Stripe
        stripe = Stripe('pk_live_51NGT5ZDm9pmPr7iPZzdfSPAhUlKwVC6Tf0QA1xgOSmTBYgytEaocYkEQQ6Bgwcc6pVSdpsZQymXqio73h3SERaYv00hx7oh3zt');
        stripe.redirectToCheckout({ sessionId: data.id });
      })
      .catch((error) => {
        console.log('Erro ao processar o pedido:', error);
      });
  });
});
