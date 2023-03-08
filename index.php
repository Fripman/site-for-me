<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>

<body>

    <?php
    include 'header.php';
    ?>

    <div class="stream">

        <iframe src="https://player.twitch.tv/?channel=fripman&parent=fripman.fripman.fr" frameborder="0" allowfullscreen="true" scrolling="no" height="800" width="80%"></iframe>

        <iframe id="chat_embed" src="https://www.twitch.tv/embed/fripman/chat?parent=fripman.fripman.fr" height="800" width="20%"></iframe>
    </div>

    <?php
    include 'footer.php';
    ?>

</body>

</html>