<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0" />
	<title>My Health Analytics - personal care</title>
	<link rel="shortcut icon" type="image/x-icon" href="css/images/favicon.ico" />
	<link rel="stylesheet" href="<?php echo base_url()?>styles/layout.css" type="text/css" media="all" />
	<link rel="stylesheet" href="<?php echo base_url()?>styles/style.css" type="text/css" media="all" />
	<link rel="stylesheet" href="<?php echo base_url()?>styles/datepicker.css" type="text/css" media="screen" />
	<link href='http://fonts.googleapis.com/css?family=Coda' rel='stylesheet' type='text/css' />
	<link href='http://fonts.googleapis.com/css?family=Jura:400,500,600,300' rel='stylesheet' type='text/css' />
	<link rel="stylesheet" href="<?php echo base_url()?>styles/mobiscroll.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo base_url()?>styles/jquery-ui.css" type="text/css" media="all" />
	<script src="<?php echo base_url()?>scripts/jquery-1.8.0.min.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/bin/jsencrypt.min.js"></script>
	<script src="<?php echo base_url()?>scripts/mobiscroll.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/jquery.touchwipe.1.1.1.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/jquery.carouFredSel-5.5.0-packed.js" type="text/javascript"></script>
	<script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/date.format.js"></script>
	<script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/jquery-ui-1.8.18.custom.min.js"></script>
	<script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/jquery-ui-timepicker-addon.js"></script>
	<script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/jquery-ui.js"></script>
	<!--[if lt IE 9]>
		<script src="js/modernizr.custom.js"></script>
	<![endif]-->
	<script src="<?php echo base_url()?>scripts/displayfunctions.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/function.js" type="text/javascript"></script>
	<script type="text/javascript" language="javascript" src="<?php echo base_url()?>scripts/jquery.dropdownPlain.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			$('.datetimepicker').scroller({
                                  preset: 'datetime',
                                  theme: 'android',
                                  display: 'modal',
                                  mode: 'scroller'
                                  });
			$(".nameField").html(localStorage.getItem("fname")+ " " + localStorage.getItem("lname"));
			var date = new Date();
			getApptData(date);
			
			$('#datepicker').datepicker({
				showOn: 'button',
				buttonImage: '<?php echo base_url()?>/images/calendar.png',
				buttonImageOnly: true,
				showOtherMonths : true,
				dateFormat: 'yy-mm-dd',
				onSelect : function(dateText, inst) {
                                           getApptData(new Date(dateText));
                                           
                                           }, onChangeMonthYear : function(year, month, inst) {
                                           
                                           } });
			
			var date = new Date();
			var dformat = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ].join('/') + ' ' + [ date.getHours(), date.getMinutes(), date.getSeconds() ].join(':');
			var i = dformat.slice(0, 10).split('/');
			var monthCur = date.getMonth() + 1;
			var dayCur = date.getDate();
			var crrHour = date.getHours();
			var monthName = shortMonthNames[monthCur - 1];
			$("#hexagonAppt").html("" + monthName + " " + dayCur + "");
			$.post("addappointment/getdoctors", { "patientId": 5 },
				 function(data){
				   var doctorsList = JSON.stringify(data["doctors"]);
				   doctorsList = eval(" (" + doctorsList + ") ");
				     populateDoctors(doctorsList);
				 
				 }, "json");
			
		 /*if(localStorage.getItem("edit") == "1"){
			 var apptId = localStorage.getItem("editApptId");
			 $.post("appointment/viewsel", { "id": apptId },
				 function(data){
				   var apptData = JSON.stringify(data["appointment"]);
				   //alert(apptData);
				   apptData = eval(" (" + apptData + ") ");
				     populateEditAppointment(apptData);
				 
				 }, "json");
		 }*/
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
							<li id="home" class="home"><a href="#">Dashboard</a></li>
							<?php if($this->session->userdata('role') == 1){ ?>
							<li id="medication" class="medication"><a href="#">Medication</a></li>
							<li id="exercise" class="exercise"><a href="#">Lifestyle</a></li>
							<li id="appointment" class="active appointment"><a href="#">Appointment</a></li>
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
		
		<div class="shell">
			<!-- main -->
			<div class="main" style="color:#000;">
				<!-- cols -->
				<section class="cols" style="text-align:center;padding-bottom: 30px !important;padding-top: 10px;font-size:18px;">

					<h3 style="width:50% !important;text-align:left;">Appointment</h3>
					<a id="addAppointment" style="padding:8px 20px;" class="medicationSaveButton blueButton" href="javascript:void(0);"> Add </a>
				</section>
				<!-- end of cols -->
				<section class="post" id="patient_graph" style="min-height:500px;">
					<header>
				
						
							
					</header>
					<div id="tab1" class="tab_content patient_appointment block" id="patient_appointment" style="width:100%;">
						<div style="width:100%;display:inline-block;box-shadow: 0 3px 5px #777;padding-bottom:3px;">
								<img src="<?php echo base_url()?>images/prev_arrow.png" id="leftMenu" class="fl prevArrow" onclick="prevDate('appointment')"/>
								<h3 style="width:85%;text-align:center;font-size: 20px;padding-top: 10px;">
									<div id="hexagonAppt"></div><input type="hidden" id="datepicker">
								</h3>
								<img src="<?php echo base_url()?>images/next_arrow.png" id="rightMenu" class="fr nextArrow"  onclick="nextDate('appointment')"/>
							</div>
						<div data-role="content" id="contentAppt" class="patient_appointment overflow">
							
						</div>
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
					
					<p class="copy"></span><a href="" target="_blank">www.myhealthanalytics.com</a></p>
					<div class="cl">&nbsp;</div>
				</div>
			</div>
			<!-- end of shell -->
		</div>
		<!-- footer -->
	</div>
	<!-- end of wrapper -->
	
	<div id="addApptDiv" class="overflow addMed none addDiv" style="position:fixed;top:7%;left:20%;width:60%;height:90%;">
		<div id="addAppointmentDiv" style="">
			<label class="hiddenLabel none" id="inputErrorMsg"></label>
			<div style="display:block;padding-top:1%;" class="AppointmentOperation fr">
				<div class="saveAppointmentOperation">
					<a style="padding: 8px 20px; margin-right: 10px;color:#000 !important;" class="grayButton cancelMedication"  onclick="resetFields()"> Cancel </a>
					<a onclick="savePatientAppointment();return false;" style="padding:8px 20px;color:#fff !important;" class="medicationSaveButton blueButton" href="javascript:void(0);"> Save </a>
				</div>
			</div>
			<br/>
			<form id="Appt">
				<div class="addApptDiv">
					<div class="fieldDiv">
						<div class="fl inputLabel">Speciality*: </div>
						<div class="fr width60">
							<select class="w100 required" data-theme="a" name="select-choice-1" id="docSpeciality" onchange="setDoctors()">
							</select>
						</div>
						</div>
					</div>
					<br/>
					<div class="fieldDiv">
						<div class="fl inputLabel">Doctor Name*: </div>
						<div class="fr width60">
							<select class="w100 required" data-theme="a" name="select-choice-1" id="docName">
							</select>
						</div>
						</div>
					</div>
					<br/>
					<input type="hidden" id="isUpdate" value="" />
					    
					<div class="fieldDiv">
						<div class="fl inputLabel">Date*: </div>
						<div class="fr width60">
						    <input type="text" id="fromDate" class="datetimepicker w100 required" style="width:95%;" value="" readonly/>
						</div>
					    </div>
					    <br/>
					    <div class="fieldDiv none dateVisible" id="toDateDiv">
						<div class="fl inputLabel none dateVisible">To*: </div>
						<div class="fr width60 none dateVisible">
						    <input type="text" id="toDate" class="datetimepicker w100 none required dateVisible" value="" readonly />
						</div>
						<br/>
					    </div>
					    
					    <br/>
					    <div class="fieldDiv">
						<div class="fl inputLabel">Description: </div>
						<div class="fr width60">
						    <textarea id="descriptionData" rows="5" cols="55"></textarea>
						</div>
					    </div>
					    
					</div>
					</form>
						<input type="hidden" id="apptUpdate" value="0" />
						    <input type="hidden" id="apptId" value="" />
					</div>
				</div>
				<textarea class="none" id="privKey" rows="15" cols="65"><?php echo $this->session->userdata('privKey'); ?></textarea>
			<textarea id="pubkey" class="none" rows="15" cols="65" placeholder="Leave blank for library to populate the public key from the private key."></textarea>
</body>
</html>