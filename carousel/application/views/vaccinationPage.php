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
	
	<script src="<?php echo base_url()?>scripts/jquery-1.8.0.min.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/bin/jsencrypt.min.js"></script>
	<script src="<?php echo base_url()?>scripts/mobiscroll.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/jquery.touchwipe.1.1.1.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/jquery.carouFredSel-5.5.0-packed.js" type="text/javascript"></script>
	<script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/date.format.js"></script>
	<script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/jquery-ui-1.8.18.custom.min.js"></script>
	<script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/jquery-ui-timepicker-addon.js"></script>
	<!--[if lt IE 9]>
		<script src="<?php echo base_url()?>scripts/modernizr.custom.js"></script>
	<![endif]-->
	<script src="<?php echo base_url()?>scripts/displayfunctions.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/function.js" type="text/javascript"></script>
	<script type="text/javascript" language="javascript" src="<?php echo base_url()?>scripts/jquery.dropdownPlain.js"></script>
	<script>
		$(document).ready(function(){
			$(".nameField").html(localStorage.getItem("fname")+ " " + localStorage.getItem("lname"));
			$("#vaccnHeader").css("color", "#5D7F7B");
			getVaccination();
			
			$('.timepicker').scroller({
				preset: 'date',
				theme: 'android',
				display: 'modal',
				mode: 'scroller'
			});
			localStorage.setItem("isChild", 0);
			
			if(localStorage.getItem("edit") == "1"){
				var vaccnId = localStorage.getItem("editVaccnId");
				$.post("vaccination/viewselvaccn", { "id": vaccnId },
					function(data){
					  var vccnData = JSON.stringify(data["vaccination"]);
					  //alert(vitData);
					  vccnData = eval(" (" + vccnData + ") ");
					    populateEditVaccination(vccnData);
					
					}, "json");
			}
		})
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
							<li id="vital" class="vital"><a href="#">Vitals</a></li>
							<li id="vaccination" class="active Vaccination"><a href="#">Vaccination</a></li>
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
			<div class="main">
				<!-- cols -->
				<section class="cols" style="text-align:center;padding-bottom: 30px !important;padding-top: 10px;font-size:18px;">

					<h3 style="width:50% !important;text-align:left;">Vaccination</h3>
					<a id="addVaccination" style="padding:8px 20px;" class="medicationSaveButton blueButton" href="javascript:void(0);"> Add </a>

				</section>
				<!-- end of cols -->
				<section class="post" id="patient_graph" style="min-height:500px;">
					<header>
						<h3 class="subHeader">
						<span class="vaccnViewHeader fl textCenter underline" id="vaccnHeader" style="width:50%;cursor:pointer;">Vaccination</span>
						<span class="vaccnViewHeader fl textCenter underline" id="vaccnChildHeader" style="width:50%;cursor:pointer;">Child Vaccination</span>
						</h3>			
						
					</header>
		
					<div class="tab_container">
						<div id="tab1" class="tab_content" id="patient_medication" style="height:550px;display:inline-block;width:100%;">
							<div style="width:100%;display:inline-flex;border-bottom:2px solid;padding-bottom:3px;margin-top:10px;">
								<!--<img src="<?php echo base_url()?>images/prev_arrow.png" id="leftMenu" class="fl prevArrow" onclick="prevDate('appointment')"/>
								<h3 id="VaccnDate" style="width:85%;text-align:center;"></h3>
								<img src="<?php echo base_url()?>images/next_arrow.png" id="rightMenu" class="fr nextArrow"  onclick="nextDate('appointment')"/>-->
							</div>
							<div data-role="content" id="contentVaccn" class="patient_vaccination overflow" style="height:550px;">
							
							</div>
						</div>
						
						<div id="tab2" class="tab_content vaccnHeader" id="patient_medication" style="height:550px;display:none;">
							<div class="vaccnHeader" style="width:100%;display:inline-block;border-bottom:2px solid;padding-bottom:3px;margin-top:10px;">
								<img src="<?php echo base_url()?>images/prev_arrow.png" id="leftMenu" class="fl prevArrow" onclick="prevChild()"/>
								<h3 id="childNameContent" style="width:91%;text-align:center; color:#000;font-size: 20px;padding-top: 10px;"></h3>
								<img src="<?php echo base_url()?>images/next_arrow.png" id="rightMenu" class="fr nextArrow"  onclick="nextChild()"/>
							</div>
							<div data-role="content" id="contentChildVaccn" class="patient_vaccination patient_medication overflow" style="height:550px;margin-top:10px;">
							
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
	
	
	<div id="addVaccnStatusDiv" class="fixed none apptMedAddDiv addDiv" style="position:fixed;top:7%;left:20%;width:60%;height:50%;display:none;z-index:9999999999;background-color:#fff;color:#000;">
                <div id="addVaccn">
                   
		    
		    <div style="display:block;margin-top:30px;" class="medicationOperation"> 
			<div class="saveMedicationOperation">
				<a onclick="savePatientVaccinationStatus(0);return false;" class="grayButton cancelMedication" id="cancelVaccn" href="javascript:void(0);"> No </a>
				<a onclick="savePatientVaccinationStatus(1);return false;" style="padding:8px 20px;" class="medicationSaveButton blueButton" href="javascript:void(0);"> Yes </a>
			</div> 
		    </div> 
                    
                    <div style="display:block;padding-top:100px;" class="vaccnField">    
                        <div class="fieldDiv">
                            <div class="fl w100" style="text-align:center;font-size:20px;">
                                Have you taken <span style="font-weight:bold;" id="vacname"></span> on <span style="font-weight:bold;" id="vacdate"></span>?
                            </div>
                        </div>
                        <input type="hidden" id="vnId" vlue="" />
                        
                    </div>
                </div>
                
            </div>
	
	
	<div id="addVaccnDiv" class="overflow addMed none addDiv" style="position:fixed;top:7%;left:20%;width:60%;height:90%;">
		<div data-role="content" id="contentAddVaccn" class="overflow" style="height:600px;display:block;">
						<div id="addVaccn" class="width80 auto">
							<div style="display:block;margin-top:30px;" class="medicationOperation"> 
							    
							    <div class="saveMedicationOperation">
								<a class="grayButton cancelMedication" id="cancelVaccn" href="javascript:void(0);"  onclick="resetFields()"> Cancel </a>
								<a onclick="savePatientVaccination();return false;" style="padding:8px 20px;" class="medicationSaveButton blueButton" href="javascript:void(0);"> Save </a>
							    </div> 
							</div> 
							<br/>
							<div id="inputErrorMsg" class="font16" style="width:100%;text-align:center;color:red;"></div>
							<br/>
							<div style="display:block;padding-top:100px;" class="vaccnField">    
							    <div class="fieldDiv">
								<div class="fl inputLabel">Vaccination: </div>
								<div class="fr width60">
								    
								    <input type="text" id="vaccnTitile" class="width100 font16 requiredVaccn vaccn" value=""/>
								</div>
							    </div>
							    
							    <div class="fieldDiv">
								<div class="fl inputLabel">Date Scheduled: </div>
								<div class="fr width60">
								    <input type="text" id="scdlTime" class="timepicker width100 font16 requiredVaccn vaccn" value="" readonly/>
								</div>
							    </div>
							    
							    <div class="fieldDiv">
								<div class="fl inputLabel">Description: </div>
								<div class="fr width60">
								   <textarea rows="7" cols="26" id="vaccnDesc" class="font16 requiredVaccn vaccn"></textarea>
								</div>
							    </div>
							    
							</div>
						</div>
						<input type="hidden" id="isVaccnUpdate" vlue="" />
						<input type="hidden" id="vaccnId" vlue="" />
						<input type="hidden" id="vId" vlue="" />
					</div>
					
					<div data-role="content" id="contentAddChildVaccn" class="overflow" style="height:600px;display:none;">
						<div id="addVaccn" class="width80 auto">
							<div style="display:block;margin-top:30px;" class="medicationOperation"> 
							    
							    <div class="saveMedicationOperation">
								<a class="grayButton cancelMedication" id="cancelVaccn" href="javascript:void(0);" onclick="resetFields()"> Cancel </a>
								<a onclick="saveChildVaccination();return false;" id="saveChildVaccn" style="padding:8px 20px;" class="medicationSaveButton blueButton" href="javascript:void(0);"> Save </a>
							    </div> 
							</div> 
							<br/>
							<div id="inputErrorMsg" class="font16" style="width:100%;text-align:center;color:red;"></div>
							<br/>
							<div style="display:block;padding-top:100px;" class="vaccnField">    
							    <div class="fieldDiv">
								<div class="fl inputLabel">Child Name: </div>
								<div class="fr width60">
								    
								    <input type="text" id="childName" class="width100 font16 requiredChildVaccn chldVaccn" value=""/>
								</div>
							    </div>
							    
							    <div class="fieldDiv">
								<div class="fl inputLabel">DOB: </div>
								<div class="fr width60">
								    <input type="text" id="dobTime" class="timepicker width100 font16 requiredChildVaccn chldVaccn" value="" readonly/>
								</div>
							    </div>
							    
							    
							</div>
						</div>
						<input type="hidden" id="isChildVaccnUpdate" vlue="" />
						<input type="hidden" id="childVaccnId" vlue="" />
						<input type="hidden" id="cvId" vlue="" />
					</div>
				</div>							
	</div> 
</body>
</html>