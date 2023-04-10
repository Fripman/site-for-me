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
    <div class="login">
        <div class="login-box">
            <h2>Login</h2>
            <form action="/api/v1/authentification" method="post">
                <div class="user-box">
                    <input id="username" type="text" name="username" required="">
                    <label for="username">Username</label>
                </div>
                <div class="user-box">
                    <input id="password" type="password" name="password" required="">
                    <label for="password">Password</label>
                </div>
                <label for="rememberMe" class="remember-me">
                    <input id="rememberMe" type="checkbox" name="rememberMe">
                    Se souvenir de moi
                </label>
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    </div>
        <?php
        include 'footer.php';
        ?>

</body>

</html>