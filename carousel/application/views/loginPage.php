<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0" />
	<title>My Health Analytics - personal care</title>
	<link rel="shortcut icon" type="image/x-icon" href="css/images/favicon.ico" />
	<link rel="stylesheet" href="styles/layout.css" type="text/css" media="all" />
	<link rel="stylesheet" href="styles/style.css" type="text/css" media="all" />
	<link href='http://fonts.googleapis.com/css?family=Coda' rel='stylesheet' type='text/css' />
	<link href='http://fonts.googleapis.com/css?family=Jura:400,500,600,300' rel='stylesheet' type='text/css' />

	<script src="scripts/jquery-1.8.0.min.js" type="text/javascript"></script>
        <script type="text/javascript" charset="utf-8" src="scripts/json2.js"></script>
        <script type="text/javascript" charset="utf-8"src="scripts/function.js"></script>
	<script src="scripts/jquery.touchwipe.1.1.1.js" type="text/javascript"></script>
	<script src="scripts/jquery.carouFredSel-5.5.0-packed.js" type="text/javascript"></script>
	<!--[if lt IE 9]>
		<script src="js/modernizr.custom.js"></script>
	<![endif]-->
	<script src="scripts/displayfunctions.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/ajaxfileupload.js"></script>
	<script src="<?php echo base_url()?>scripts/function.js" type="text/javascript"></script>
	
	<script>
            $(document).ready( function() {
               $('#signIn').click( function(e) {
                   e.preventDefault();
                   var username = $("#username").val();
                   var password = $("#password").val();
                    
                   $.post("<?php echo base_url()?>index.php/welcome/login", { "username": username, "password": password },
                        function(data){
                          //if(data[0])
                          if(data.username != false){
				localStorage.setItem("username", username);
				localStorage.setItem("userid", data.username[0].uid);
				localStorage.setItem("role", data.username[0].roleid);
				localStorage.setItem("encPath", data.username[0].encryptpath);
				if(data.username[0].encryptpath == ""){
					$('body').append('<div class="mask" id="addMedMask"></div>');
					$("#addMedMask").fadeIn(300);
					$('#addMedMask').css("zIndex", 999);
					$('#addMedMask').css("opacity", 0.8);
					$("#privKeyUploadDiv").css("display", "block");
				}else{
					//updateSettingsData();
					window.location.href = "<?php echo site_url('home'); ?>";
				}
                            
                          }else{
                            alert("Please enter valid username/password");
                          }
                        }, "json");
                });
	       
	        $('#submit').click(function(e) {
			e.preventDefault();
			var fu1 = document.getElementById("userfile").value;
			
			$.ajaxFileUpload({
			   url         :'<?php echo base_url()?>index.php/upload/private_file/', 
			   secureuri      :false,
			   fileElementId  :'userfile',
			   dataType    : 'json',
			   data        : {},
			   success  : function (data, status)
			   {
				
			      if(fu1 != localStorage.getItem("username")+".pem")
			      {
				 alert("There was some error saving private key");
			      }else{
				alert("Private key has been saved.");
				//updateSettingsData();
				window.location.href = "<?php echo site_url('home'); ?>";
				
			      }
			   }
			});
			return false;
                });
            });
	    
	    
        </script>
</head>
<body>
	<!-- wrapper -->
	<div class="wrapper">
		<!-- header -->
		<header class="header">
			<div class="shell">
				<div class="header-top">
					<h1 id="" style="height:40px;color:#7BFFFF !important;"><a href="#" class="cursive" style="color:#7BFFFF !important;background: url('images/mhm.gif') no-repeat scroll 109px 8px / 50px 30px rgba(0, 0, 0, 0)">MyHealth <span style="margin-left:30px;">Analytics</span></a></h1>
					<nav id="navigation">
						<a href="#" class="nav-btn">Home<span></span></a>
						<ul>
							<li class="home"><a href="#">About us   |</a></li>
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
					<div class="rightBodyPortion fr" style="height:350px !important;">
							<div class="userNameBox auto">
								 <div class="labelBox" style="margin-top:16px !important;">UserName: </div><input class="fr inputBox" type="textbox" id="username" value=""/>
							</div>
							<div class="passwordBox auto">
								<div class="labelBox" style="margin-top:16px !important;">Password:</div> <input class="fr inputBox" type="password" id="password" value=""/>
							</div>
							<input type="hidden" value="<?php echo $this->session->userdata('privKey'); ?>"/>
			
							<div style="width:100%;display: inline-block;"><div style="cursor:pointer;float:right !important;margin-left:60% !important;margin-top:35px;padding: 2% 5%;margin-bottom:25px;margin-right: 50px;" id="signIn" class="underline medicationSaveButton blueButton">Sign In</div></div>
							<div class="signUpDiv auto" id="signUp">Not Signed up yet <span style="color:blue;"> <a href="index.php/registration"> Sign up</a></span></div>
							<div class="passDiv auto" id="forgotPass"><a href="index.php/forgotpassword">Forgot Password</a></div>
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
					
					<p class="copy">Copyright &copy;<span>|</span><a href="" target="_blank">www.myhealthanalytics.com</a></p>
					<div class="cl">&nbsp;</div>
				</div>
			</div>
			<!-- end of shell -->
		</div>
		<!-- footer -->
	</div>
	<!-- end of wrapper -->
	
	<div id="privKeyUploadDiv" class="overflow addMed none addDiv" style="position:fixed;top:7%;left:20%;width:60%;height:90%;">
	    <div style="display:block;padding-top:1%;" class="AppointmentOperation fr">
		  <div class="saveAppointmentOperation">
			<a style="padding:8px 20px;color:#fff !important;" class="medicationSaveButton blueButton" id="submit" href="javascript:void(0);"> Upload </a>
			<a style="padding: 8px 20px; margin-right: 10px;color:#000 !important;" class="grayButton cancelMedication"  onclick="cancelupload()"> Cancel </a>
		  </div>
	    </div>
	    <br/>
	    <div style="width:60%;margin:50px auto;">
		  
		  <h1>Select Private Key</h1>
                  <form method="post" action="" id="upload_file">
			<br/>
			<div class="fieldDiv">
			      <div class="fl inputLabel">File: </div>
			      <div class="fr width60">
				    <input type="file" name="userfile" id="userfile" size="20"/>
			      </div>
			</div>
			
                     
                     
                
                     
                  </form>
                  <h2></h2>
                  <div id="files"></div>
	    </div>
      </div>
</body>
</html>