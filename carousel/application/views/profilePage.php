<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0" />
	<title>My Health Analytics - personal care</title>
	<link rel="shortcut icon" type="image/x-icon" href="css/images/favicon.ico" />
	<link rel="stylesheet" href="<?php echo base_url()?>styles/layout.css" type="text/css" media="all" />
	<link rel="stylesheet" href="<?php echo base_url()?>styles/style.css" type="text/css" media="all" />
	<link rel="stylesheet" href="<?php echo base_url()?>styles/multiple-select.css" type="text/css" media="all" />
	<link href='http://fonts.googleapis.com/css?family=Coda' rel='stylesheet' type='text/css' />
	<link href='http://fonts.googleapis.com/css?family=Jura:400,500,600,300' rel='stylesheet' type='text/css' />

	<script src="<?php echo base_url()?>scripts/jquery-1.8.0.min.js" type="text/javascript"></script>
        <script type="text/javascript" charset="utf-8" src="<?php echo base_url()?>scripts/json2.js"></script>
	<script src="<?php echo base_url()?>scripts/mobiscroll.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/bin/jsencrypt.min.js"></script>
	<script src="<?php echo base_url()?>scripts/jquery.touchwipe.1.1.1.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/jquery.carouFredSel-5.5.0-packed.js" type="text/javascript"></script>
	<link rel="stylesheet" href="<?php echo base_url()?>styles/mobiscroll.css" type="text/css" media="screen" />
	<script src="<?php echo base_url()?>scripts/jquery.multiple.select.js" type="text/javascript"></script>
	<!--[if lt IE 9]>
		<script src="<?php echo base_url()?>scripts/modernizr.custom.js"></script>
	<![endif]-->
	<!-- Multiselect plugin api-->
	<link rel="stylesheet" href="<?php echo base_url()?>styles/bootstrap-3.0.0.min.css" type="text/css"/>
	<script type="text/javascript" src="<?php echo base_url()?>scripts/bootstrap-3.0.0.min.js"></script>
	<script type="text/javascript" src="<?php echo base_url()?>scripts/bootstrap-multiselect.js"></script>
	<link rel="stylesheet" href="<?php echo base_url()?>styles/bootstrap-multiselect.css" type="text/css"/>
	<script type="text/javascript" language="javascript" src="<?php echo base_url()?>scripts/jquery.dropdownPlain.js"></script>
	<!-- Multiselect plugin api-->
	<script src="<?php echo base_url()?>scripts/displayfunctions.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/function.js" type="text/javascript"></script>
	<script>
	    $(document).ready( function() {
		
		$('.dobfield').scroller({ 
                                          preset : 'date', 
                                          theme : 'android', 
                                          display : 'modal', 
                                          mode : 'scroller',
                                          dateOrder: 'yyyy-mm-dd' 
                                          });
		  $(".nameField").html(localStorage.getItem("fname")+ " " + localStorage.getItem("lname"));
                   $.post("<?php echo base_url()?>index.php/registration/getcountry", {  },
                        function(data){
                          
                          data = JSON.stringify(data["country"]);
			  data = eval(" (" + data + ") ");
                          var i;
                          var options = "";
                          for(i=0;i < data.length;i++){
                            options = options + '<option value="'+data[i].cid+'">'+data[i].name+'</option>';
                          }
                          //alert(options);
                          $("#country").html(options);
                        }, "json");
            });
	</script>
	<script>
	    
        $(function() {
            $.post("profile/getprofileinfo", { "userId": localStorage.getItem("userid") },
                        function(data){
                          var profileInfo = JSON.stringify(data["profile"]);
			  profileInfo = eval(" (" + profileInfo + ") ");
			    populatemProfile(profileInfo);
			
                        }, "json");
   
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
					<h1 id="" style="height:40px;color:#7BFFFF !important;"><a href="#" class="cursive" style="font-size:25px !important;color:#7BFFFF !important;background: url('<?php echo base_url()?>images/mhm.gif') no-repeat scroll 104px 8px / 50px 30px rgba(0, 0, 0, 0)">MyHealth <span style="margin-left:30px;">Analytics</span></a></h1>
					<nav id="navigation">
						<a href="#" class="nav-btn">Home<span></span></a>
						<ul class="dropdown">
							<li id="home" class="home"><a href="#">Dashboard</a></li>
							<?php if($this->session->userdata('role') == 1){ ?>
							<li id="medication" class="medication"><a href="#">Medication</a></li>
							<li id="exercise" class="exercise"><a href="#">Lifestyle</a></li>
							<li id="appointment" class="appointment"><a href="#">Appointment</a></li>
							<li id="vital" class="vital"><a href="#">Vitals</a></li>
							<li id="vaccination" class="Vaccination"><a href="#">Vaccination</a></li>
							<?php } ?>
							<li id="document" class="document"><a href="#">Documents</a></li>
							<li class="active settings" id="dropdownList"><a>Settings</a>
							    <ul style="width:90.5px !important">
							      <li class="select"><a id="profile" class="submenu" href="#">Profile</a></li>
							      <li class="select"><a id="settings" class="submenu" href="#">Settings</a></li>
							      <?php if($this->session->userdata('role') == 1){ ?>
								<li class="select"><a id="request" class="submenu" href="#">Request</a></li>
							      <?php } ?>
							      <li class="select"><a id="logout" class="submenu" href="#">Logout</a></li>
							    </ul>
							</li>
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

					<h3 style="width:50% !important;text-align:left;">Profile</h3>

				</section>
				<!-- end of cols -->
				<section class="post" id="patient_graph" style="min-height:500px;">
					<div class="rightBodyPortion fr" style="height:auto !important";>
						<div class="profileBox auto">
							<span class="proflabelBox">First Name:</span><input class="fr inputBox required" type="textbox" id="fName" value=""/>
						</div>
						<div class="profileBox auto">
							<span class="proflabelBox">Last Name:</span> <input class="fr inputBox required" type="textbox" id="lName" value=""/>
						</div>
						<div class="profileBox auto">
							<span class="proflabelBox">Gender:</span>
							    <select class="fr inputBox required selectheight" id="gender">
								<!--<option value=""></option>-->
								<option value="M">Male</option>
								<option value="F">Female</option>
							</select>
						</div>
						<div class="profileBox auto">
							<span class="proflabelBox">DOB:</span> <input class="fr inputBox required dobfield" type="textbox" id="dob"  value="" readonly/>
						</div>
					</div>
					<div class="rightBodyPortion fr" style="height:auto !important";>
						<div class="profileBox auto">
							<span class="proflabelBox">E-mail: </span><input class="fr inputBox required" type="textbox" id="email" value=""/>
						</div>
						<div class="profileBox auto">
							<span class="proflabelBox">Username:</span> <input class="fr inputBox required" type="textbox" id="username" value=""/>
						</div>
						<div class="profileBox auto">
							<div id="changePassword" class="inputBox textCenter underline blue pointer" style="width:100%;border:none;color:#fff;">Click here to change password</div>
						</div>
							
						<div class="profileBox auto none passBox">
							<span class="proflabelBox">Password: </span><input class="fr inputBox required" type="password" id="password1" value=""/>
						</div>
						<div class="profileBox auto none passBox">
						    <span class="proflabelBox">Confirm Password:</span> <input class="fr inputBox required" type="password" id="password2" value=""/>
						</div>
					</div>
					<div class="rightBodyPortion fr" style="height:auto !important";>
						<div class="profileBox auto">
							<span class="proflabelBox">Address1: </span><input class="fr inputBox required" type="textbox" id="address1" value=""/>
						</div>
						<div class="profileBox auto">
							<span class="proflabelBox">Address2: </span><input class="fr inputBox" type="textbox" id="address2" value=""/>
						</div>
						<div class="profileBox auto">
							<span class="proflabelBox">City: </span><input class="fr inputBox required" type="textbox" id="city" value=""/>
						</div>
						<div class="profileBox auto">
							<span class="proflabelBox">State:</span> <input class="fr inputBox required" type="textbox" id="state" value=""/>
						</div>
						<div class="profileBox auto">
							<span class="proflabelBox">Country: </span><select class="fr inputBox required selectheight" id="country"></select>
						</div>
						<div class="profileBox auto">
							<span class="proflabelBox">Telephone:</span> <input class="fr inputBox required" type="textbox" id="telephone" value=""/>
						</div>
						<input class="fr inputBox required" type="hidden" id="stateid" value=""/>
						<input class="fr inputBox required" type="hidden" id="userid" value=""/>
						<div style="width:100%;display: inline-block;">
							<div class="blueButton auto" style="cursor: pointer;margin-bottom: 15px;margin-top: 23px;margin-right: 50px;" id="updateProfile">
								Update
							</div>
						</div>
					</div>
					<textarea class="none" id="privKey" rows="15" cols="65"><?php echo $this->session->userdata('privKey'); ?></textarea>
					<textarea id="pubkey" class="none" rows="15" cols="65" placeholder="Leave blank for library to populate the public key from the private key."></textarea>
				
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
					
					<p class="copy"></span><a href="" target="_blank">www.myhealthanalytics.com</a></p>
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