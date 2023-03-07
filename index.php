<!DOCTYPE html>
<html>

<head>
      <title>Mon site de streaming</title>
      <link rel="stylesheet" href="style.css">
</head>

<body>

      <?php
      include('header.php');
      ?>
      <h1>Stream</h1>
      <!-- Add a placeholder for the Twitch embed -->
      <div id="twitch-embed"></div>

      <!-- Load the Twitch embed script -->
      <script src="https://player.twitch.tv/js/embed/v1.js"></script>

      <!-- Create a Twitch.Player object. This will render within the placeholder div -->
      <script type="text/javascript">
            new Twitch.Player("twitch-embed", {
                  channel: "fripman"
            });
      </script>
      
      <?php
      include('footer.php');
      ?>

</body>