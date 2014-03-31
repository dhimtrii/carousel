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
	<script src="<?php echo base_url()?>scripts/jquery.touchwipe.1.1.1.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/jquery.carouFredSel-5.5.0-packed.js" type="text/javascript"></script>
	<script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/jquery-ui-1.8.18.custom.min.js"></script>
	<script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/jquery-ui-timepicker-addon.js"></script>
	<!--[if lt IE 9]>
		<script src="<?php echo base_url()?>scripts/modernizr.custom.js"></script>
	<![endif]-->
	<!-- graph Library-->
	<script src="<?php echo base_url()?>js/highcharts.js"></script>
	<script src="<?php echo base_url()?>js/modules/exporting.js"></script>
	<!-- graph Library-->
	<script src="<?php echo base_url()?>scripts/displayfunctions.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/function.js" type="text/javascript"></script>
	<script type="text/javascript" language="javascript" src="<?php echo base_url()?>scripts/jquery.dropdownPlain.js"></script>
	<script type="text/javascript">
		
		
		$(document).ready(function(){
		    var userid = $("#userid").val();
		    var fname = $("#fname").val();
		    var lname = $("#lname").val();
		    localStorage.setItem("userid", userid);
		    localStorage.setItem("fname", fname);
		    localStorage.setItem("lname", lname);
		    
		    $(".nameField").html("Dr. " + localStorage.getItem("fname")+ " " + localStorage.getItem("lname"));
		    $(".welcomeNameField").html("Welcome Dr." + localStorage.getItem("fname") + " " + localStorage.getItem("lname"));
		
		  
		  
		  $.post("home/getdocdata", { "userId": localStorage.getItem("userid") },
				    function(data){
				      
				      var userData = JSON.stringify(data["userinfo"]);
				      userData = eval(" (" + userData + ") ");
				      populateDocPersonalInfo(userData);
					
		    }, "json");
		  
		  $.post("home/getrequestdata", { "userId": localStorage.getItem("userid") },
				    function(data){
				      //alert(data.username); // John
				      var patientList = JSON.stringify(data["request"]);
				      //alert(patientList);
				      patientList = eval(" (" + patientList + ") ");
				      
					populateRequest(patientList);
					showPatInformation(1);
				    }, "json");
		
		    $.post("home/getallpatient", { "userId": localStorage.getItem("userid") },
				    function(data){
				      //alert(data.username); // John
				      var patientList = JSON.stringify(data["patient"]);
				      //alert(patientList);
				      patientList = eval(" (" + patientList + ") ");
				      
					populatePatientList(patientList);
					showPatInformation(1);
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
					<h1 id="" style="height:40px;color:#7BFFFF !important;"><a class="cursive" href="#" style="color:#7BFFFF !important;background: url('<?php echo base_url()?>images/mhm.gif') no-repeat scroll 109px 8px / 50px 30px rgba(0, 0, 0, 0)">MyHealth <span style="margin-left:30px;">Analytics</span></a></h1>
					<nav id="navigation">
						<a href="#" class="nav-btn">Home<span></span></a>
						<ul class="dropdown">
							<li id="home" class="active home"><a href="#">Dashboard</a></li>
							<?php if($this->session->userdata('role') == 1){ ?>
							<li id="medication" class="medication"><a href="#">Medication</a></li>
							<li id="exercise" class="exercise"><a href="#">Exercise</a></li>
							<li id="appointment" class="appointment"><a href="#">Appointment</a></li>
							<li id="vital" class="vital"><a href="#">Vitals</a></li>
							<li id="vaccination" class="Vaccination"><a href="#">Vaccination</a></li>
							<?php } ?>
							<li id="document" class="document"><a href="#">Documents</a></li>
							<li class="settings" id="dropdownList"><a>Settings</a>
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
		
		<div class="shell" style="min-height:800px;height:auto;">
			<!-- main -->
			<div class="main" style="min-height:800px;height:auto;">
				<!-- cols -->
				<section class="cols" style="text-align:center;padding-bottom: 30px !important;padding-top: 10px;font-size:18px;">

					<h3>Dashboard</h3>

				</section>
				<!-- end of cols -->
				
				
				<section class="post" id="patient_graph" style="margin-top:110px;">
					<article class="module width_full stats">
						<!--<header><h3>Personal Information</h3></header>-->
						
						<div class="module_content overflow" id="personalInfo" style="border:none !important;height:auto !important;">
							<div class="infoDiv">
								<div style="width:25%;float:left;">Name: </div><div id="docName" style="width:75%;float:left;">  </div>
							</div>
							<div class="infoDiv">
								<div style="width:25%;float:left;;">Speciality: </div><div id="docSpeciality" style="width:75%;float:left;">  </div>
							</div>
							<div class="infoDiv">
								<div style="width:25%;float:left;;;">DOB: </div><div id="docDob" style="width:75%;float:left;">  </div>
								
							</div>
							<div class="infoDiv">
								<div style="width:25%;float:left;;;">Gender: </div><div id="docGender" style="width:75%;float:left;">  </div>
							
							</div>
							<div class="infoDiv">
								<div style="width:25%;float:left;;;">Address: </div><div id="docAddress" style="width:75%;float:left;">  </div>
							</div>
							<div class="infoDiv">
								<div style="width:25%;float:left;;;">Email: </div><div id="docEmail" style="width:75%;float:left;">  </div>
							</div>
							<div class="infoDiv">
								<div style="width:25%;float:left;;;">Telephone No: </div><div id="docTel" style="width:75%;float:left;">  </div>
							</div>
							
						</div>
					</article>
				</section>
				
				<section class="post" id="patient_graph" style="height:auto;">
					<article class="module width_full stats">
						<header style="box-shadow:none !important;text-align:left !important; padding-left:30px !important;"><h3>Sharing request</h3></header>
						<div class="module_content overflow patient_files_div" id="friend_request" style="border:none !important;">
							
							
						</div>
					</article>
					
					
				</section>


				<section class="post" id="patient_graph" style="min-height:500px;">
					<header>
				
						
				    		
					</header>
					<div id="tab1" class="tab_content patient_appointment block" id="patient_appointment" style="width:100%;">
						      <div class="fl" style="width:100%;margin-top: 30px;margin-bottom: 10px;">
								  <div style="width: 250px; font-size: 16px; height: 35px; padding-top: 4px;" class="fl">Patient Name:
								     <select style="font-size:16px;" id="patientList" class="selectPatDoc" onchange="showPatInformation(1)"></select></div>
								  
								  
								  </div>
						      
							 <div id="patientInformation" style="width:100%;">
								<div style="width:100%;display:inline-block;text-align:center; border-radius:5px 5px 0px 0px;" class="fl">
									<div style="width:33%;border:1px solid;text-align:center;padding-bottom: 10px;padding-top: 10px;cursor:pointer;border-radius:5px 0px 0px 0px;" class="fl patInfoDiv patDiv" onclick="showPatInformation(1)">
										Patient Information
									</div>
									<div style="width:33%;border:1px solid;text-align:center;padding-bottom: 10px;padding-top: 10px;cursor:pointer;" class="fl graphDiv patDiv" onclick="showPatInformation(2)">
										Health Statistics
									</div>
									<div style="width:33%;border:1px solid;text-align:center;padding-bottom: 10px;padding-top: 10px;cursor:pointer;border-radius:0px 5px 0px 0px;" class="fl filesDiv patDiv" onclick="showPatInformation(3)">
										Shared Files
									</div>
								</div>
								<div class="patientDiv module_content overflow fl" id="patientInfo" style="border:none !important;height:auto !important;display:inline-block;width:100%;">
									<div class="infoDiv">
										<div style="width:25%;float:left;">Name: </div><div id="name" style="width:75%;float:left;">  </div>
									</div>
									<div class="infoDiv">
										<div style="width:25%;float:left;;">Disease: </div><div id="disease" style="width:75%;float:left;">  </div>
									</div>
									<div class="infoDiv">
										<div style="width:25%;float:left;;;">DOB: </div><div id="dob" style="width:75%;float:left;">  </div>
										
									</div>
									<div class="infoDiv">
										<div style="width:25%;float:left;;;">Gender: </div><div id="gender" style="width:75%;float:left;">  </div>
									
									</div>
									<div class="infoDiv">
										<div style="width:25%;float:left;;;">Address: </div><div id="address" style="width:75%;float:left;">  </div>
									</div>
									<div class="infoDiv">
										<div style="width:25%;float:left;;;">Email: </div><div id="email" style="width:75%;float:left;">  </div>
									</div>
									<div class="infoDiv">
										<div style="width:25%;float:left;;;">Telephone No: </div><div id="tel" style="width:75%;float:left;">  </div>
									</div>
									
								</div>
								<div class="patientDiv module_content overflow fl" id="graph" style="display:none;border:none !important;height:auto !important;display:inline-block;width:100%;">
									
									
								</div>
								<div class="patientDiv module_content overflow fl" id="patientSharedInfo" style="display:none;border:none !important;height:auto !important;display:inline-block;width:100%;">
									
									
								</div>
							 </div>
							 
							 
						      </div>
						
					<div class="cl">&nbsp;</div>
				</section>
				
				
				
				
			</div>
			<textarea class="none" id="privKey" rows="15" cols="65"><?php echo $this->session->userdata('privKey'); ?></textarea>
			<textarea id="pubkey" class="none" rows="15" cols="65" placeholder="Leave blank for library to populate the public key from the private key."></textarea>
			<input type="hidden" id="patientid" value="<?php echo $this->session->userdata('pid'); ?>" />
			<input type="hidden" id="userid" value="<?php echo $this->session->userdata('userid'); ?>" />
			<input type="hidden" id="fname" value="<?php echo $this->session->userdata('firstname'); ?>" />
			<input type="hidden" id="lname" value="<?php echo $this->session->userdata('lastname'); ?>" />
			<input type="hidden" id="pincode" value="<?php echo $this->session->userdata('pincode'); ?>" />
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
	
	<div id="galleryDiv" class="galleryDiv">
            <div id="image" class="imageDiv"></div>
            
            <div id="closeGallery" style="position:fixed; z-index:9999999999;right:14%;top:18%;">
                <img src="http://localhost/xampp/sitess/myHealthAnalytics/images/icon_close.png" alt="files"/>
            </div>
        </div>
</body>
</html>