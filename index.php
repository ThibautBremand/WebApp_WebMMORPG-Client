<!DOCTYPE html>
<html>
	<head>
		<!-- PLUGINS -->
		<!-- jQuery -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
		<script>
		   var nickname = "<?php echo $_POST['name']; ?>";
		   var user = "<?php echo $_POST['user']; ?>";
		</script>


		<title>Mini-RPG</title>
		<link rel="stylesheet" type="text/css" href="css/style.css" />
		<!--[if lt IE 9]><script type="text/javascript" src="js/excanvas.compiled.js"></script><![endif]-->

		<script type="text/javascript" src="js/serverConnection.js"></script>

		<script type="text/javascript" src="js/json2.js"></script>
		<script type="text/javascript" src="js/oXHR.js"></script>
		<script type="text/javascript" src="js/classes/Tileset.js"></script>
		<script type="text/javascript" src="js/classes/Map.js"></script>
		<script type="text/javascript" src="js/classes/Character.js"></script>
		<script type="text/javascript" src="js/rpg.js"></script>
	</head>
	<body>
		<canvas id="canvas"></canvas>

		<div id="logs"></div>
	</body>
</html>