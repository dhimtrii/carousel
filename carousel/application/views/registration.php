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
	<!-- Multiselect plugin api-->
	<script src="<?php echo base_url()?>scripts/displayfunctions.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/function.js" type="text/javascript"></script>
	
	<script>
	
		function viewDocInfo(){
			var role = $("#role").val();
			if(role == 1){
			   $(".role").css("display", "none");
			}else{
			   $(".role").css("display", "block");      
			}
		     }
            $(document).ready( function() {
		viewDocInfo();
		$('.dobfield').scroller({ 
                                          preset : 'date', 
                                          theme : 'android', 
                                          display : 'modal', 
                                          mode : 'scroller',
                                          dateOrder: 'yyyy-mm-dd' 
                                          });
	    
                   $.post("<?php echo base_url()?>index.php/registration/getcountry", {  },
                        function(data){
                          
                          data = JSON.stringify(data["country"]);
			  data = eval(" (" + data + ") ");
                          var i;
                          var options = "";
                          for(i=0;i < data.length;i++){
                            options = options + '<option value="'+data[i].code+'">'+data[i].name+'</option>';
                          }
                          //alert(options);
                          $("#country").html(options);
                        }, "json");
		   
		   $.post("<?php echo base_url()?>index.php/registration/populateSpeciality", {  },
                        function(data){
                          
                          data = JSON.stringify(data["speciality"]);
			  data = eval(" (" + data + ") ");
                          var i;
                          var options = "";
                          for(i=0;i < data.length;i++){
                            options = options + '<option value="'+data[i].spId+'">'+data[i].spname+'</option>';
                          }
                           //alert(options);
                           $("#speciality").html(options);
			   $('.multiselect').multiselect({
				buttonText: function(options, select) {
				  if (options.length == 0) {
				    return this.nonSelectedText + ' <b class="caret"></b>';
				  }
				  else {
				    if (options.length > this.numberDisplayed) {
				      return options.length + ' ' + this.nSelectedText + ' <b class="caret"></b>';
				    }
				    else {
				      var selected = '';
				      options.each(function() {
					var label = ($(this).attr('label') !== undefined) ? $(this).attr('label') : $(this).html();
			   
					selected += label + ', ';
				      });
				      return selected.substr(0, selected.length - 2) + ' <b class="caret"></b>';
				    }
				  }
				}
			  });
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
					<div class="rightBodyPortion fr" style="height:auto !important";>
						<form>
						    <div class="userNameBox auto">
							<span class="labelBox">First Name: </span><input class="fr inputBox required" type="textbox" id="fName" value="akhilesh"/>
						    </div>
						    <div class="passwordBox auto">
							<span class="labelBox">Last Name:</span> <input class="fr inputBox required" type="textbox" id="lName" value="Lakshmi"/>
						    </div>
						    <div class="passwordBox auto">
							<span class="labelBox">Gender:</span>
							<select class="fr inputBox selectBox required" id="gender">
							    <!--<option value=""></option>-->
							    <option value="M">Male</option>
							    <option value="F">Female</option>
							</select>
						    </div>
						    <div class="passwordBox auto">
							<span class="labelBox">DOB:</span> <input class="fr inputBox required dobfield" type="textbox" id="dob"  value="12/07/2013" readonly/>
						    </div>
						    <div class="userNameBox auto">
							<span class="labelBox">E-mail: </span><input class="fr inputBox required" type="textbox" id="email" value="asdf@gmail.com"/>
						    </div>
						    <div class="passwordBox auto">
							<span class="labelBox">Username:</span> <input class="fr inputBox required" type="textbox" id="username" value="akki"/>
						    </div>
						    <div class="userNameBox auto">
							<span class="labelBox">Password: </span><input class="fr inputBox required" type="password" id="password1" value="1234"/>
						    </div>
						    <div class="passwordBox auto">
							<span class="labelBox">Confirm Password:</span> <input class="fr inputBox required" type="password" id="password2" value="1234"/>
						    </div>
						    <div class="passwordBox auto">
							<span class="labelBox">Role:</span>
							<select class="fr inputBox selectBox required" id="role" onchange="viewDocInfo()">
							    <!--<option value=""></option>-->
							    <option value="1">Patient</option>
							    <option value="2">Doctor</option>
							</select>
						    </div>
						    <div class="userNameBox auto role">
							<span class="labelBox">education: </span>
							<select class="multiselect fr inputBox" id="speciality" multiple="multiple" style="min-width:160px;">
							</select>
						    </div>
						    <div class="userNameBox auto role">
							<span class="labelBox">Registration No.: </span><input class="fr inputBox" type="textbox" id="registration" value="1234"/>
						    </div>
						    <div class="userNameBox auto">
							<span class="labelBox">City: </span><input class="fr inputBox required" type="textbox" id="city" value="Pune"/>
						    </div>
						    <div class="passwordBox auto">
							<span class="labelBox">State:</span> <input class="fr inputBox required" type="textbox" id="state" value="Maharastra"/>
						    </div>
						    <div class="userNameBox auto">
							<span class="labelBox">Country: </span><select class="fr inputBox selectBox required" id="country"></select>
						    </div>
						    <div class="passwordBox auto">
							<span class="labelBox">Telephone:</span> <input class="fr inputBox required" type="text" id="telephone" value="12345"/>
						    </div>
						    <div class="passwordBox auto">
							<span class="labelBox">Promo code:</span> <input class="fr inputBox required" type="text" id="promo" value="123456"/>
						    </div>
						    <div style="width:100%;display: inline-block;"><div class="underline medicationSaveButton blueButton" style="margin-top:30px !important;" id="register">Register</div></div>
						    <div class="passDiv auto" id="forgotPass"><a href="../">Log in</a></div>
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
					
					<p class="copy">Copyright &copy; 2012<span>| www.myhealthanalytics.com</p>
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