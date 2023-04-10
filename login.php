<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style_header.css">
    <link rel="stylesheet" href="login.css">
    <link rel="stylesheet" href="style_footer.css">
    <title>Fripman</title>
    <link rel="icon" href="loggo_tansparent.png">
</head>

<body>

    <?php
    include 'header.php';
    ?>

    <main>
        <div class="login-box">
            <h2>Login</h2>
            <form>
                <div class="user-box">
                    <input type="text" name="" required="">
                    <label>Username</label>
                </div>
                <div class="user-box">
                    <input type="password" name="" required="">
                    <label>Password</label>
                </div>
                <a href="#">
                    Submit
                </a>
            </form>
        </div>
    </main>
    <?php
    include 'footer.php';
    ?>

</body>

</html>