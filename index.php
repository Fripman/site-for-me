<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style_header.css">
    <link rel="stylesheet" href="style_body.css">
    <link rel="stylesheet" href="style_footer.css">
    <title>Fripman</title>
    <link rel="icon" href="loggo_tansparent.png">
</head>

<body>

    <?php
    include 'header.php';
    ?>

    <div class="stream">

        <div class="stream_video">
            <iframe src="https://player.twitch.tv/?channel=fripman&parent=www.fripman.fr" frameborder="0"
                allowfullscreen="true" scrolling="no" height="100%" width="100%"></iframe>
        </div>

        <div class="stream_chat">
            <iframe id="chat_embed" src="https://www.twitch.tv/embed/fripman/chat?parent=www.fripman.fr" height="99.5%"
                width="99.5%">
            </iframe>
        </div>


    </div>

    <?php
    include 'footer.php';
    ?>

</body>

</html>