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
	<!-- graph Library-->
	<script src="<?php echo base_url()?>js/highcharts.js"></script>
	<script src="<?php echo base_url()?>js/modules/exporting.js"></script>
	<!-- graph Library-->
	<script src="<?php echo base_url()?>scripts/displayfunctions.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/function.js" type="text/javascript"></script>
	<script type="text/javascript" language="javascript" src="<?php echo base_url()?>scripts/jquery.dropdownPlain.js"></script>
	<script>
	
	</script>
	<script type="text/javascript">
    
    
		$(document).ready(function(){
			$("#selectvitType").val("Graph");
		    $(".nameField").html(localStorage.getItem("fname")+ " " + localStorage.getItem("lname"));
		    showPatVit();
		    $('#datepicker').datepicker({
				showOn: 'button',
				buttonImage: '<?php echo base_url()?>/images/calendar.png',
				buttonImageOnly: true,
				showOtherMonths : true,
				dateFormat: 'yy-mm-dd',
				onSelect : function(dateText, inst) {
                                           getVital(new Date(dateText));
                                           
                                           }, onChangeMonthYear : function(year, month, inst) {
                                           
                                           } });
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
							<li id="appointment" class="appointment"><a href="#">Appointment</a></li>
							<li id="vital" class="active vital"><a href="#">Vitals</a></li>
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

					<h3 style="width:50% !important;text-align:left;">Vitals</h3>
					<a id="addVital" style="padding:8px 20px;" class="medicationSaveButton blueButton" href="javascript:void(0);"> Add </a>

				</section>
				
				<section class="post" id="patient_graph" style="min-height:auto;padding-bottom: 0px;">
					<header>
				
						
							
					</header>
					<div id="tab1" class="tab_content patient_appointment block" id="patient_appointment" style="width:100%;">
						<div class="fl" style="width:50%;margin-top: 30px;margin-bottom: 10px;">
							<div style="width: 280px; font-size: 16px; height: 35px; padding-top: 4px;" class="fl">View type:
								<select style="font-size:16px;" id="selectvitType" class="selectvitType" onchange="showPatVit()">
									<option value="Graph">Graph</option>
									<option value="Data">Data</option>
								</select>
							</div>
							
						</div>   
						
					 </div>
					<div class="cl">&nbsp;</div>
				</section>
				<!-- end of cols -->
				
				<section class="post graph" id="patient_graph" style="display:block;">
					<article class="module width_full stats">
						<header><h3>Vital Statistics</h3></header>
						<div class="module_content overflow patient_stats_div" id="graph" style="margin-top:10px;">
				
				
						</div>
					<div class="cl">&nbsp;</div>
					</article><!-- end of content manager article -->
				</section>
				
				<section class="post data" id="patient_graph" style="min-height:500px;display:none;">
					<header>
				
							
							
							
				
					</header>
					<div class="tab_container" style="min-height:550px;height:610px;">
				
						<div id="tab1" class="tab_content vaccnHeader" id="patient_medication" style="min-height:550px;height:610px;">
							<div style="width:100%;display:inline-block;box-shadow: 0 3px 5px #777;padding-bottom:3px;">
								<img src="<?php echo base_url()?>images/prev_arrow.png" id="leftMenu" class="fl prevArrow" onclick="prevDate('vital')"/>
								<h3 style="width:85%;text-align:center;font-size: 20px;padding-top: 10px;">
									<div id="VitDate"></div><input type="hidden" id="datepicker">
								</h3>
								
								<img src="<?php echo base_url()?>images/next_arrow.png" id="rightMenu" class="fr nextArrow"  onclick="nextDate('vital')"/>
							</div>
							<div data-role="content" id="contentVit" class="patient_medication overflow" style="min-height:550px;height:600px;">
							
							</div>
						</div>
					
					
					<textarea class="none" id="privKey" rows="15" cols="65"><?php echo $this->session->userdata('privKey'); ?></textarea>
					<textarea id="pubkey" class="none" rows="15" cols="65" placeholder="Leave blank for library to populate the public key from the private key."></textarea>
					</div><!-- end of .tab_container -->
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
	
	<div id="addVitDiv" class="overflow addMed none addDiv" style="position:fixed;top:7%;left:20%;width:60%;height:90%;">
		<label class="hiddenLabel none" id="inputErrorMsg"></label>
		<div style="display:block;padding-top:1%;" class="AppointmentOperation fr">
			<div class="saveAppointmentOperation">
				<a style="padding: 8px 15px; margin-right: 10px;color:#FFF !important;" class="grayButton cancelMedication" onclick="resetFields()"> Cancel </a>
				<a onclick="savePatientVital();return false;" style="padding:8px 20px;color:#fff !important;" class="medicationSaveButton blueButton" href="javascript:void(0);"> Save </a>
			</div>
		</div>
		<br/>
		<div id="inputErrorMsg" class="font16" style="width:100%;text-align:center;color:red;"></div>
		<div id="isValidNum" class="font16" style="width:100%;text-align:center;color:red;"></div>
		<br/>
		<div class="" style="width:55%;margin-left:auto;margin-right:auto;margin-top:100px;">
			<div class="fl vitLabel">Vitals: </div>
			<div class="fl width60">
				<select class="w100 font16 required" data-theme="a" name="select-choice-1" id="vitTitile" onchange="changeVital('')">
					<option value=""><---Select your Vital---></option>
					<option value="1">Cholesterol</option>
					<option value="2">Blood Pressure</option>
					<option value="3">Weight</option>
					<option value="4">Height </option>                            
				</select>
			</div>
		</div>
						    
		<input type="hidden" id="vitUpdate" value="0" />
		<input type="hidden" id="vitId" value="" />
		<input type="hidden" id="pvitId" value="" />
		<div class="" style="width:55%;margin-left:auto;margin-right:auto;margin-top:100px;" id="fieldDivDyn">
		</div>
	</div>
	
	<div id="dialogContent" title="Basic dialog" style="width:80%;height:80%;position:fixed;left:10%;top:15%;display:none;border:2px solid;z-index:9999;">
			<div class="headerMap">
				<div class="mapClose">X</div>
			</div>
			<div class="bodyMap">
				
			</div>
		</div>

</body>
</html>