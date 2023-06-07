<?php
include("dbconn.php");

$query = "SELECT * FROM products";
$result = $conn->query($query);
$products = $result->fetch_all(MYSQLI_ASSOC);

// Processar pesquisa
if (isset($_GET['search'])) {
    $searchTerm = $_GET['search'];
    $query = "SELECT * FROM products WHERE title LIKE '%$searchTerm%'";
    $result = $conn->query($query);
    $products = $result->fetch_all(MYSQLI_ASSOC);
}
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>#PorMarciaFranca</title>
    <script src="https://kit.fontawesome.com/d6daf39dc5.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
    <link rel="stylesheet" href="style.css">
    <style>
        .cart {
            display: none;
        }
    </style>
</head>

<body>
    <section id="header">
        <a href="#"><img src="img/MarciaFrancaArmazem.png" class="logo" alt=""></a>
        <div>
            <ul id="navbar">
                <li><a href="index.php">Home</a></li>
                <li><a onclick="showShop()" class="shopBtn" href="#">Shop</a></li>
                <li><a href="about.html">Sobre</a></li>
                <li><a href="contact.html">Contatos</a></li>
                <li id="lg-bag"><a onclick="showCart()" class="cartBtn" href="#"><i class="fa-solid fa-bag-shopping"></i></a></li>
                <a href="#" id="close"><i class="far fa-times"></i></a>
            </ul>
        </div>

        <div id="mobile">
            <a onclick="showCart()" class="cartBtn" href="#"><i class="fa-solid fa-bag-shopping"></i></a>
            <i id="bar" class="fas fa-outdent"></i>
        </div>

    </section>

    <section id="page-header">
        <h2>#PorMarciaFranca</h2>
        <p>“EBENÉZER! - Até aqui nos ajudou o Senhor!”</p>
    </section>

    <section class="shop">
        <div class="search-bar">
            <form action="shop.php" method="GET">
                <h2 class="search-title">Pesquisar Produtos</h2>
                <input type="text" name="search" placeholder="Pesquisar produtos" class="search-input">
                <button type="submit" class="search-btn"><i class="fas fa-search"></i></button>
            </form>
        </div>

        <div class="item-container">
            <?php foreach ($products as $product) { ?>
                <div class="item" data-id="<?php echo $product['id']; ?>">
                    <img src="img/<?php echo $product['image']; ?>" alt="<?php echo $product['title']; ?>">
                    <h3><?php echo $product['title']; ?></h3>
                    <span class="price">$<?php echo $product['price']; ?></span>
                    <button class="btn add-btn">Adicionar ao Carrinho</button>
                </div>
            <?php } ?>
        </div>
    </section>

    <section class="cart">
        <table>
            <thead class="thead">
                <tr>
                    <th colspan='2'>Item</th>
                    <th>Preço</th>
                    <th colspan="2">Quantidade</th>
                </tr>
            </thead>
            <tbody class="tbody">
                <tr class="totalRow">
                    <td colspan="5">Total: $0.00</td>
                </tr>
            </tbody>
        </table>
        <button class="checkout-btn" disabled>Checkout</button>
    </section>

    <script src="functionShop.js"></script>
    <script src="https://js.stripe.com/v3/"></script>
    <script src="script.js"></script>

    <div id="footer">
        <?php include 'footer.php'; ?>
    </div>
</body>

</html>