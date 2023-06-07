<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>#PorMarciaFrança</title>
    <script src="https://kit.fontawesome.com/d6daf39dc5.js" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <section id="header">
            <a href="#"><img src="img/MarciaFrancaArmazem.png" class="logo" alt=""></a>
        <div>
            <ul id="navbar">
                <li><a class="active" href="index.html">Home</a></li>
                <li><a onclick="showShop()" class="shopBtn" href="shop.php">Shop</a></li>
                <li><a href="about.html">Sobre</a></li>
                <li><a href="contact.html">Contatos</a></li>
                <li id="lg-bag"><a onclick="showCart()" class="cartBtn" href="shop.php"><i class="fa-solid fa-bag-shopping"></i></a></li>
                <a href="#" id="close"><i class="far fa-times"></i></a>
            </ul>
        </div>
        <div id="mobile">
            <a href="shop.php"><i class="fa-solid fa-bag-shopping"></i></a>
            <i id="bar" class="fas fa-outdent"></i>
        </div>
    </section>

    <section id="hero">
        <h4>Negociar em oferta</h4>
        <h2>Ofertas super valiosas</h2>
        <h1>Em todos os produtos</h1>
        <p>Economize mais & com até 70% de desconto!</p>
        <button onclick="" href="shop.php">Compre Agora</button>
    </section>

    <div id="footer">
        <?php include 'footer.php'; ?>
    </div>

    <script src="script.js"></script>
</body>

</html>