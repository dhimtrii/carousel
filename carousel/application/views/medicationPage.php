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
		<script src="<?php echo base_url()?>scripts/modernizr.custom.js"></script>
	<![endif]-->
	<script src="<?php echo base_url()?>scripts/displayfunctions.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/function.js" type="text/javascript"></script>
	<script type="text/javascript" language="javascript" src="<?php echo base_url()?>scripts/jquery.dropdownPlain.js"></script>
	<script>
		$(document).ready(function(){
			localStorage.setItem("isPatHome", 0);
			$('#medicationFromDateEdit').scroller({ 
                                              preset : 'date', 
                                              theme : 'android', 
                                              display : 'modal', 
                                              mode : 'scroller' 
                                              });
			$('#medicationToDateEdit').scroller({ 
                                              preset : 'date', 
                                              theme : 'android', 
                                              display : 'modal', 
                                              mode : 'scroller' 
                                              });
			$(".nameField").html(localStorage.getItem("fname")+ " " + localStorage.getItem("lname"));
			var date = new Date();
			       
			getMedData(date);
			$('#datepicker').datepicker({
				showOn: 'button',
				buttonImage: '<?php echo base_url()?>/images/calendar.png',
				buttonImageOnly: true,
				showOtherMonths : true,
				dateFormat: 'yy-mm-dd',
				onSelect : function(dateText, inst) {
                                           getMedData(new Date(dateText));
                                           
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
							<li id="medication" class="active medication"><a href="#">Medication</a></li>
							<li id="exercise" class="exercise"><a href="#">Lifestyle</a></li>
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
		
		<div class="shell">
			<!-- main -->
			<div class="main" style="color:#000;">
				<!-- cols -->
				<section class="cols" style="text-align:center;padding-bottom: 30px !important;padding-top: 10px;font-size:18px;">

					<h3 style="width:50% !important;text-align:left;">Medication</h3>
					<a id="addMedication" style="padding:8px 20px;" class="medicationSaveButton blueButton" href="javascript:void(0);"> Add </a>

				</section>
				<!-- end of cols -->
				<section class="post" id="patient_graph" style="min-height:550px;height:auto;">
					<header>
				
						
							
				
					</header>
		
					<div class="tab_container vaccnHeader" style="min-height:550px;height:auto;">
						<div style="width:100%;display:inline-block;box-shadow: 0 3px 5px #777;padding-bottom:3px;">
								<img src="<?php echo base_url()?>images/prev_arrow.png" id="leftMenu" class="fl prevArrow" onclick="prevDate('medication')"/>
								<h3 style="width:90%;text-align:center;font-size:22px;padding-top:10px;">
									<div id="hexagonMed"></div><input type="hidden" id="datepicker">
								</h3>
								<img src="<?php echo base_url()?>images/next_arrow.png" id="rightMenu" class="fr nextArrow"  onclick="nextDate('medication')"/>
							</div>
						<div id="tab1" class="tab_content" id="patient_medication">
							
							<div data-role="content" id="contentMed" class="patient_medication overflow" style="height:545px;">
							
							</div>
						</div>
					</div>
					<div class="cl">&nbsp;</div>
					
					
							
							
						
					
				</section>


				<textarea class="none" id="privKey" rows="15" cols="65"><?php echo $this->session->userdata('privKey'); ?></textarea>
				<textarea id="pubkey" class="none" rows="15" cols="65" placeholder="Leave blank for library to populate the public key from the private key."></textarea>
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
	
	<div id="dialogMedContent" title="Basic dialog" style="width:80%;height:80%;position:fixed;left:10%;top:15%;display:none;border:2px solid;z-index:9999;">
			<div class="headerMap">
				<div class="fr medDetailClose">X</div>
			</div>
			<div class="bodyMap">
				<iframe id="frame" name="iframe" style="display:none; width:100%;height:100%;"></iframe>
			</div>
		</div>
	
	<div id="addMedDiv" class="overflow addMed none addDiv" style="position:fixed;top:7%;left:20%;width:60%;height:90%;">
								<!-- Edit medication -->
								<div data-role="page" id="medication_edit">
								    <div data-role="content" id="medication_edit_content">
									<div id="medicationHeaderEdit" class="float100"> 
									    <div id="medOpName"></div> 
									    <div style="display:block;padding-top:5%;width:50%;" class="AppointmentOperation fr">
										
										<a class="grayButton cancelMedication" id="cancelAddMed"  onclick="resetFields()"> Cancel </a>
										<a id="editSaveMedication" style="padding:8px 20px;" class="medicationSaveButton blueButton" href="javascript:void(0);"> Save </a>
										
									    </div>
									</div>
									
									<br/>
									<div id="inputErrorMsg" class="font16" style="width:100%;text-align:center;color:red;"></div>
									<div id="isValidNum" class="font16" style="width:100%;text-align:center;color:red;"></div>
									<div class="float100 medTr">
											<div class="editMedLabel">Name* : </div> <div class="medInput"><input type="text" id="medName" data-role="none" value="" class="font16 required"/></div> 
										    </div>
									<input type="hidden" id="medicationTimeId"> <!-- 4#5 type like before breakfast etc-->
									    <input type="hidden" id="medicationDays"><!-- false#true#false#false#false#false -->
										<input type="hidden" id="medicationTimes"> <!-- like 10:30pm#14:00pm##### -->
										    <div class="float100 medTr">
											<div class="editMedLabel">From* : </div>
											<div class="medInput">
											    <input type="text" id="medicationFromDateEdit" readonly="readonly" class="dateInput font16 required" value=""/> 
											</div>
										    </div>
										    <div class="float100 medTr"><div class="editMedLabel">To* : </div><div class="medInput font16"><input type="text" name="toDate" id="medicationToDateEdit" readonly="readonly" class="dateInput font16 required" value=""/> </div></div>
										    <div class="float100 medTr">
											<div class="editMedLabel"> Dosage* :</div>
											<div class="medInput"> 
											    <div id="medDosageInput"><input type="tel" id="medicationDoseEdit" data-role="none" class="font16 required requiredNum"/></div> 
											    <div id="dosageTypeDiv"></div>
											</div>
										    </div>
										    <div class="float100 medTr">
											<div class="editMedLabel"> Frequency* : </div> <div class="medInput"><input type="text" class="font16 required frequencyPicker" id="medicationFreqEdit" data-role="none">
											<div id="exerciseTime">   
											</div>
											</div>
										    </div>
										    <div id="frequencyDetails">
											<div class="frequencyDetailContainer">
											    
											    
											    <div id="frequencyOperation"><a class="blueButton" id="okFrequency" onclick="okFrequency()">-</a></div>
											    <div id="frequencyCount" style="margin-top:0px;">
												
												    <div id="frequencyKeyboard">
													<div class="frequencyKeyboardRow">
													    <div id="freqKey1" class="frequencyKey">1</div>
													    <div id="freqKey2" class="frequencyKey">2</div>
													    <div id="freqKey3" class="frequencyKey">3</div>
													</div>
													
													<div class="frequencyKeyboardRow">
													    <div id="freqKeyBlank" class="frequencyKey">&nbsp;</div>
													    <div id="freqKey0" class="frequencyKey">0</div>
													    <div id="freqKeyClr" class="frequencyKey">CLR</div>
													</div>
												    </div>
											    </div>
											    
											    <div id="freqTimePicker">
												    
											    </div>
												
												
										    </div>
										    <div class="float100 medTr">
											<div class="editMedLabel">Note : </div> <div class="medInput"><textarea class="font16" id="medicationNoteEdit" data-role="none" rows="6" cols="30"/></textarea></div> 
										    </div>
										    
										    <input type="hidden" id="isMedUpdate" vlue="" />
										<input type="hidden" id="medId" vlue="" />
										<input type="hidden" id="mId" vlue="" />
										    </div>
								</div>
								
								
						</div> 
</body>
</html>