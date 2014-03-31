<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8"/>
	<title>Medication</title>
	
	<link rel="stylesheet" href="<?php echo base_url()?>styles/layout.css" type="text/css" media="screen" />
	<!--[if lt IE 9]>
	<link rel="stylesheet" href="<?php echo base_url()?>styles/ie.css" type="text/css" media="screen" />
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script type="text/javascript" charset="utf-8" src="<?php echo base_url()?>scripts/jquery-1.8.2.min.js"></script>
	<script src="<?php echo base_url()?>scripts/bin/jsencrypt.min.js"></script>
	<script src="<?php echo base_url()?>scripts/mobiscroll.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/hideshow.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/jquery.tablesorter.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="<?php echo base_url()?>scripts/jquery.equalHeight.js"></script>
        <script type="text/javascript" charset="utf-8" src="<?php echo base_url()?>scripts/json2.js"></script>
        <script type="text/javascript" charset="utf-8" src="<?php echo base_url()?>scripts/underscore-min.js"></script>
        <script type="text/javascript" charset="utf-8" src="<?php echo base_url()?>scripts/backbone-min.js"></script>
	<script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/date.format.js"></script>
	<script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/jquery-ui-1.8.18.custom.min.js"></script>
	<script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/jquery-ui-timepicker-addon.js"></script>
        <script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/function.js"></script>
	<link rel="stylesheet" href="<?php echo base_url()?>styles/datepicker.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo base_url()?>styles/mobiscroll.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo base_url()?>styles/style.css" type="text/css" media="screen" />
	<script type="text/javascript">
	$(document).ready(function() 
    	{ 
      	  $(".tablesorter").tablesorter();
	  
	  addMedication();
	  
	});
	$(document).ready(function() {

	//When page loads...
	$(".tab_content").hide(); //Hide all content
	$("ul.tabs li:first").addClass("active").show(); //Activate first tab
	$(".tab_content:first").show(); //Show first tab content

	//On Click Event
	$("ul.tabs li").click(function() {

		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content").hide(); //Hide all tab content

		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(activeTab).fadeIn(); //Fade in the active ID content
		return false;
	});

});
    </script>
    <script type="text/javascript">
    $(document).ready(function(){
	if(localStorage.getItem("edit") == "1"){
		var medId = localStorage.getItem("editMedId");
		$.post("medication/viewselmed", { "id": medId },
                        function(data){
                          var medData = JSON.stringify(data["medication"]);
                          //alert(medData);
			  medData = eval(" (" + medData + ") ");
			    populateEditMed(medData);
			
                        }, "json");
	}
    });
</script>

</head>


<body>

	<header id="header">
		<hgroup>
			<h1 class="site_title"><a href="index.html">My Health Analytics</a></h1>
			<h2 class="section_title">Medication</h2>
		</hgroup>
	</header> <!-- end of header bar -->
	
	<section id="secondary_bar">
		<div class="user">
			<p>Andrew Smithson</p>
			<!-- <a class="logout_user" href="#" title="Logout">Logout</a> -->
		</div>
		<div class="breadcrumbs_container">
		</div>
	</section><!-- end of secondary bar -->
	
	<aside id="sidebar" class="column">
		<form class="quick_search">
			<input type="text" value="Quick Search" onfocus="if(!this._haschanged){this.value=''};this._haschanged=true;">
		</form>
		<hr/>
		<h3 id="dashBoard">Dashboard</h3>
		
		
		<h3>Medication</h3>
		<ul class="toggle">
			<li class="icn_add_user pointer" id="medView">View medication</li>
			<li class="icn_view_users pointer" id="addMed">Add Medicine</li>
		</ul>
		<h3>Appointment</h3>
		<ul class="toggle">
			<li class="icn_folder pointer" id="apptView">View Appointment</li>
			<li class="icn_photo pointer" id="addAppt">Add Appointment</a></li>
		</ul>
		<h3 id="apptView">Vitals</h3>
		<ul class="toggle">
			<li class="icn_settings pointer" id="vitView">View Vitals</li>
			<li class="icn_security pointer" id="vitAdd">Add Vitals</li>
		</ul>
		<h3>Actions</h3>
		<ul class="toggle">
			<li class="icn_settings pointer" id="exeView">View Exercise</li>
			<li class="icn_security pointer" id="exeAdd">Add Exercise</li>
		</ul>
		<h3>Vaccination</h3>
		<ul class="toggle">
			<li class="icn_settings pointer" id="vaccnView">View Vaccination</li>
			<li class="icn_security pointer" id="vaccnAdd">Add Vaccination</li>
		</ul>
		<h3>Documents</h3>
		<ul class="toggle">
			<li class="icn_settings pointer"id="uploadView">Upload Documents</li>
			<li class="icn_security pointer" id="filesView">View Documents</li>
		</ul>
		<h3>Settings</h3>
		<ul class="toggle">
			<li class="icn_settings pointer" id="request">Doctors</li>
			<li class="icn_security pointer" id="logout">Logout</li>
		</ul>
		
		<footer>
			<hr />
			
		</footer>
	</aside><!-- end of sidebar -->
	
	<section id="main" class="column mainDiv">
		<div id="aaaaaa" style=padding-left:5%;>
		
		
		
		<article class="module width_3_quarter medication" style="width:95% !important;">
			<header>
				
							<h3 id="hexagonMed" style="width:85%;text-align:center;">Add Medication</h3>
				
			</header>

			<div class="tab_container" style="height:650px;">
				<div id="tab1" class="tab_content" id="patient_medication" style="height:640px;">
					
					<div data-role="content" id="contentMed" class="patient_medication overflow" style="height:640px;">
						<!-- Edit medication -->
						<div data-role="page" id="medication_edit">
						    <div data-role="content" id="medication_edit_content">
							<div id="medicationHeaderEdit" class="float100"> 
							    <div id="medOpName"></div> 
							    <div style="display:block;padding-top:5%;width:50%;" class="AppointmentOperation fr">
								
								<a class="grayButton cancelMedication" id="cancelAddMed"> Cancel </a>
								<a class="grayButton cancelMedication" id="cancelEditMed"> Cancel </a>
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
									    <div id="medDosageInput"><input type="tel" id="medicationDoseEdit" data-role="none" class="font16 required"/></div> 
									    <div id="dosageTypeDiv"></div>
									</div>
								    </div>
								    <div class="float100 medTr">
									<div class="editMedLabel"> Frequency* : </div> <div class="medInput"><input type="text" class="font16 required" id="medicationFreqEdit" readonly="readonly" data-role="none"></div> 
								    </div>
								    <div class="float100 medTr">
									<div class="editMedLabel">Note : </div> <div class="medInput"><textarea class="font16" id="medicationNoteEdit" data-role="none" rows="6" cols="30"/></textarea></div> 
								    </div>
								    <input type="hidden" id="isMedUpdate" vlue="" />
								<input type="hidden" id="medId" vlue="" />
								<input type="hidden" id="mId" vlue="" />
								    </div>
						</div>
						
						<div id="detailsmask"></div>
						<div id="frequencyDetails">
						    <div class="frequencyDetailContainer">
							
							
							<div id="frequencyOperation"><a class="blackButton fl" id="cancelFrequency">X</a> <span>Frequency</span><a class="blueButton" id="okFrequency" onclick="okFrequency()">OK</a></div>
							<div id="frequencyCount" style="margin-top:30px;">
							    
							    <input type="number" id="frequencyValue" onkeypress="return isNumberKey(event)" maxlength="2" readonly><br>
								<div id="frequencyKeyboard">
								    <div class="frequencyKeyboardRow">
									<div id="freqKey1" class="frequencyKey">1</div>
									<div id="freqKey2" class="frequencyKey">2</div>
									<div id="freqKey3" class="frequencyKey">3</div>
								    </div>
								    <div class="frequencyKeyboardRow">
									<div id="freqKey4" class="frequencyKey">4</div>
									<div id="freqKey5" class="frequencyKey">5</div>
									<div id="freqKey6" class="frequencyKey">6</div>
								    </div>
								    <div class="frequencyKeyboardRow">
									<div id="freqKey7" class="frequencyKey">7</div>
									<div id="freqKey8" class="frequencyKey">8</div>
									<div id="freqKey9" class="frequencyKey">9</div>	
								    </div>
								    <div class="frequencyKeyboardRow">
									<div id="freqKeyBlank" class="frequencyKey">&nbsp;</div>
									<div id="freqKey0" class="frequencyKey">0</div>
									<div id="freqKeyClr" class="frequencyKey">CLR</div>
								    </div>
								</div>
								</div>
							
							<!--<div id="frequencyTypeDetails">
							    <div id="frequencyType">
								
							    </div>
							    <div id="freqDayKeyboard">
								<div class="freqDayKeyboardRow">
								    <div id="freqDay1" class="freqDayKey">Mon</div>
								    <div id="freqDay2" class="freqDayKey">Tue</div>
								</div>
								<div class="freqDayKeyboardRow">
								    <div id="freqDay3" class="freqDayKey">Wed</div>
								    <div id="freqDay4" class="freqDayKey">Thurs</div>
								</div>
								<div class="freqDayKeyboardRow">
								    <div id="freqDay5" class="freqDayKey">Fri</div>
								    <div id="freqDay6" class="freqDayKey">Sat</div>
								</div>
								<div class="freqDayKeyboardRow">
								    <div id="freqDay7" class="freqDayKey">Sun</div>
								    <div id="freqDay8" class="freqDayKey">&nbsp;</div>
								</div>
							    </div>-->
							    <div id="freqTimePicker">
								
							    </div>
							    
							    
							</div>
						    </div>
						</div> 
					</div>
				</div>
			
			
			<textarea class="none" id="privKey" rows="15" cols="65"><?php echo $this->session->userdata('privKey'); ?></textarea>
			<textarea id="pubkey" class="none" rows="15" cols="65" placeholder="Leave blank for library to populate the public key from the private key."></textarea>
			</div><!-- end of .tab_container -->
		
		</article><!-- end of content manager article -->
		
		
		<div class="spacer"></div>
		</div>
	</section>


</body>

</html>