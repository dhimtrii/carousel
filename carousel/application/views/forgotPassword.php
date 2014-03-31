<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0" />
	<title>My Health Analytics - personal care</title>
	<link rel="shortcut icon" type="image/x-icon" href="css/images/favicon.ico" />
	<link rel="stylesheet" href="<?php echo base_url()?>styles/layout.css" type="text/css" media="all" />
	<link rel="stylesheet" href="<?php echo base_url()?>styles/style.css" type="text/css" media="all" />
	<link href='http://fonts.googleapis.com/css?family=Coda' rel='stylesheet' type='text/css' />
	<link href='http://fonts.googleapis.com/css?family=Jura:400,500,600,300' rel='stylesheet' type='text/css' />

	<script src="<?php echo base_url()?>scripts/jquery-1.8.0.min.js" type="text/javascript"></script>
        <script type="text/javascript" charset="utf-8" src="<?php echo base_url()?>scripts/json2.js"></script>
        <script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/function.js"></script>
	<script src="<?php echo base_url()?>scripts/jquery.touchwipe.1.1.1.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/jquery.carouFredSel-5.5.0-packed.js" type="text/javascript"></script>
	<!--[if lt IE 9]>
		<script src="<?php echo base_url()?>scripts/modernizr.custom.js"></script>
	<![endif]-->
	<script src="<?php echo base_url()?>scripts/displayfunctions.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/function.js" type="text/javascript"></script>
	
	<script>
            
        </script>
</head>
<body>
	<!-- wrapper -->
	<div class="wrapper">
		<!-- header -->
		<header class="header">
			<div class="shell">
				<div class="header-top">
					<h1 id="" style="height:40px;color:#7BFFFF !important;"><a href="#" class="cursive" style="color:#7BFFFF !important;background: url('images/mhm.gif') no-repeat scroll 116px 8px / 50px 30px rgba(0, 0, 0, 0)">My Health <span style="margin-left:30px;">Analytics</span></a></h1>
					<nav id="navigation">
						<a href="#" class="nav-btn">Home<span></span></a>
						<ul>
							<li class="home"><a href="#">About us</a></li>
							<li class="medication"><a href="#">Contact Us</a></li>
						</ul>
					</nav>
					<div class="cl">&nbsp;</div>
				</div>
				<div class="slider">
					<div id="bg"></div>
					
				</div>
			</div>
		</header>
		<!-- end of header -->
		<!-- shell -->
		<div class="shell">
			<!-- main -->
			<div class="main">
				<!-- cols -->
				<section class="cols" style="text-align:center;padding-bottom: 30px !important;padding-top: 10px;font-size:18px;">

					<h3></h3>

				</section>
				<!-- end of cols -->
				<section class="post" id="patient_graph" style="min-height:500px;">
					<div class="rightBodyPortion fr">
						<form>
							<div class="userNameBox auto">
								 <span class="labelBox">E-mail: </span><input class="fr inputBox" type="textbox" id="email" value=""/>
							</div>
							
			
							<div style="cursor:pointer;float:right !important;margin-left:60% !important;margin-top:35px;padding: 2% 5%;margin-bottom:25px;margin-right: 50px;" id="forgot" onclick="forgotPass()" class="underline medicationSaveButton blueButton">Send</div>
							<div class="signUpDiv auto" id="signUp">Not Signed up yet <span style="color:blue;"> <a href="index.php/registration"> Sign up</a></span></div>
							<div class="passDiv auto" id="forgotPass"><a href="../">Sign in</a></div>
						</form>
					</div>
					<div class="cl">&nbsp;</div>
				</section>


				
			</div>
			<!-- end of main -->
		</div>
		<!-- end of shell -->	
		<!-- footer -->
		<div id="footer">
			<!-- shell -->
			<div class="shell">
				<!-- end of footer-cols -->
				<div class="footer-bottom">
					
					<p class="copy">Copyright &copy; 2012<span>|</span>Design by: <a href="http://chocotemplates.com" target="_blank">www.ChocoTemplates.com</a></p>
					<div class="cl">&nbsp;</div>
				</div>
			</div>
			<!-- end of shell -->
		</div>
		<!-- footer -->
	</div>
	<!-- end of wrapper -->
</body>
</html>