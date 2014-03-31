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

	<script src="<?php echo base_url()?>scripts/jquery-1.8.0.min.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/bin/jsencrypt.min.js"></script>
	<script src="<?php echo base_url()?>scripts/mobiscroll.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/jquery.touchwipe.1.1.1.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/jquery.carouFredSel-5.5.0-packed.js" type="text/javascript"></script>
	<script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/date.format.js"></script>
	<script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/jquery-ui-1.8.18.custom.min.js"></script>
	<script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/jquery-ui-timepicker-addon.js"></script>
	<!--[if lt IE 9]>
		<script src="js/modernizr.custom.js"></script>
	<![endif]-->
	<script src="<?php echo base_url()?>scripts/displayfunctions.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/function.js" type="text/javascript"></script>
	<script type="text/javascript" language="javascript" src="<?php echo base_url()?>scripts/jquery.dropdownPlain.js"></script>
	<script>
	
	$(document).ready(function(){
		getSettingsData();
		
	    
		$('#userfile').change(function(e) {
		  
			e.preventDefault();
			$.ajaxFileUpload({
			   url         :'<?php echo base_url()?>index.php/upload/check_file/', 
			   secureuri      :false,
			   fileElementId  :'userfile',
			   dataType    : 'json',
			   data        : {
			      'title'           : $('#title').val()
			   },
			   success  : function (data, status)
			   {
				 //alert(JSON.stringify(data));
			      if(data.status != 'error')
			      {
				 //$('#files').html('<p>Reloading files...</p>');
				 //refresh_files();
				 $('#title').val('');
			      }
			      alert("Files uploaded successfully");
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

					<h3 style="width:50% !important;text-align:left;">Encryption settings</h3>

				</section>
				<!-- end of cols -->
				<section class="post" id="patient_graph" style="min-height:500px;">
					<div class="tab_container" style="height:700px;">
				<div id="tab1" class="tab_content" id="patient_medication" style="height:700px;">
					
					<div data-role="content" id="contentaddVit" class="patient_medication overflow" style="height:700px !important;margin-left: auto;margin-right: auto;width: 80%;">
						<label class="hiddenLabel none" id="inputErrorMsg"></label>
						<div style="display:block;padding-top:1%;" class="AppointmentOperation fr">
						    <div class="saveAppointmentOperation">
							<a style="padding: 8px 20px; margin-right: 10px;color:#FFF !important;" class="grayButton cancelMedication" onclick="resetFields()"> Reset </a>
							<a onclick="updateSettings();return false;" style="padding:8px 20px;color:#fff !important;" class="medicationSaveButton blueButton" href="javascript:void(0);"> Save </a>
						    </div>
						</div>
						<br/>
						
						<?php if($this->session->userdata('role') == 1){ ?>
						<div class="encDiv">
							<div class="fl encLabel">Vitals: </div>
							<div class="fl" style="width:30px;display: inline-flex;margin-top:5px;">
							   <input type="checkbox" id="encVit" class="encryptCheckbox" /> 
							</div>
						</div>
						
						<div class="encDiv">
							<div class="fl encLabel">Vaccination: </div>
							<div class="fl" style="width:30px;display: inline-flex;margin-top:5px;">
							   <input type="checkbox" id="encVaccn" class="encryptCheckbox" /> 
							</div>
						</div>
						
						<div class="encDiv">
							<div class="fl encLabel">Appointment: </div>
							<div class="fl" style="width:30px;display: inline-flex;margin-top:5px;">
							   <input type="checkbox" id="encAppt" class="encryptCheckbox" /> 
							</div>
						</div>
						
						<div class="encDiv">
							<div class="fl encLabel">Medication: </div>
							<div class="fl" style="width:30px;display: inline-flex;margin-top:5px;">
							   <input type="checkbox" id="encMed" class="encryptCheckbox" /> 
							</div>
						</div>
						
						<div class="encDiv">
							<div class="fl encLabel">Exercise: </div>
							<div class="fl" style="width:30px;display: inline-flex;margin-top:5px;">
							   <input type="checkbox" id="encExe" class="encryptCheckbox" /> 
							</div>
						</div>
						<?php } ?>
						
						<div class="encDiv">
							<div class="fl encLabel">Document: </div>
							<div class="fl" style="width:30px;display: inline-flex;margin-top:5px;">
							   <input type="checkbox" id="encDoc" class="encryptCheckbox" /> 
							</div>
						</div>
						
						<div class="encDiv">
							<div class="fl encLabel">Path: </div>
							<div class="fl" style="width:auto;display: inline-flex;margin-top:5px;">
							   <input type="text" id="keyPath" class="encryptCheckbox" style="width:110px;margin-left:8px  !important;"/> 
							</div>
						</div>
						
						<form method="post" action="" id="upload_file">
							<div class="encDiv">
							      <div class="fl inputLabel">Private Key: </div>
							      <div class="fr width60">
								    <a onclick="generateKey()" style="margin-left:55px;padding:8px 20px;color:#fff !important;float:left;" class="medicationSaveButton blueButton" href="javascript:void(0);"> Generate </a>
							      </div>
							</div>
						     
						     
						
						     
						  </form>
						    
						<input type="hidden" id="vitUpdate" value="0" />
						<input type="hidden" id="vitId" value="" />
						<input type="hidden" id="pvitId" value="" />
						
					</div>
					<textarea class="none" id="privKey" rows="15" cols="65"><?php echo $this->session->userdata('privKey'); ?></textarea>
			<textarea id="pubkey" class="none" rows="15" cols="65" placeholder="Leave blank for library to populate the public key from the private key."></textarea>
				</div>
			
			
			
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
</body>
</html>