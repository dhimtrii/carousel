<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8"/>
	<title>Appointments</title>
	
	<link rel="stylesheet" href="<?php echo base_url()?>styles/layout.css" type="text/css" media="screen" />
	<!--[if lt IE 9]>
	<link rel="stylesheet" href="<?php echo base_url()?>styles/ie.css" type="text/css" media="screen" />
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script type="text/javascript" charset="utf-8" src="<?php echo base_url()?>scripts/jquery-1.8.2.min.js"></script>
	<script src="<?php echo base_url()?>scripts/bin/jsencrypt.min.js"></script>
	<script src="<?php echo base_url()?>scripts/hideshow.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/mobiscroll.js" type="text/javascript"></script>
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
	   $('.datetimepicker').scroller({
                                  preset: 'datetime',
                                  theme: 'android',
                                  display: 'modal',
                                  mode: 'scroller'
                                  });
   	 } 
	);
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
    $(function(){
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
	       
	if(localStorage.getItem("edit") == "1"){
		var apptId = localStorage.getItem("editApptId");
		$.post("appointment/viewsel", { "id": apptId },
                        function(data){
                          var apptData = JSON.stringify(data["appointment"]);
                          //alert(apptData);
			  apptData = eval(" (" + apptData + ") ");
			    populateEditAppointment(apptData);
			
                        }, "json");
	}
    });
</script>

</head>


<body>

	<header id="header">
		<hgroup>
			<h1 class="site_title"><a href="index.html">My Health Analytics</a></h1>
			<h2 class="section_title">Appointments</h2>
		</hgroup>
	</header> <!-- end of header bar -->
	
	<section id="secondary_bar">
		<div class="user">
			<p>John Doe (<a href="#">3 Messages</a>)</p>
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
		
		<article class="module width_full appointments">
			<header>
				<h3 id="" style="width:90%;text-align:center;">Add Appointment</h3>
			</header>
			<div id="tab1" class="tab_content patient_appointment block" id="patient_appointment"">
				<div id="datepicker" style="border-bottom:1px solid;text-align:center;width:100%;padding-bottom: 3px;">
					</div>
				</div>
				<div data-role="content" class="patient_appointment overflow" style="height:520px !important;width:850px !important;">
					<div id="addAppointmentDiv" style="">
						<label class="hiddenLabel none" id="inputErrorMsg"></label>
						<div style="display:block;padding-top:1%;" class="AppointmentOperation fr">
						    <div class="saveAppointmentOperation">
							<a style="padding: 8px 20px; margin-right: 10px;color:#000 !important;" class="grayButton cancelMedication" onclick="cancelPatientAppointment()"> Cancel </a>
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
						<div class="fl inputLabel">From*: </div>
						<div class="fr width60">
						    <input type="text" id="fromDate" class="datetimepicker width80 required" value="" readonly/>
						</div>
					    </div>
					    <br/>
					    <div class="fieldDiv none dateVisible" id="toDateDiv">
						<div class="fl inputLabel none dateVisible">To*: </div>
						<div class="fr width60 none dateVisible">
						    <input type="text" id="toDate" class="datetimepicker width100 none required dateVisible" value="" readonly />
						</div>
						<br/>
					    </div>
					    <!--<div class="fieldDiv">
						<div class="fl inputLabel">Reminder1*: </div>
						<div class="fr width60">
						    <input type="tel" class="width30 required" id="reminder1Data" value="" />
						    <select class="width50" data-theme="a" name="select-choice-1" id="reminder1">
							<option value="H">Hours</option>
							<option value="D">Days</option>
						    </select>
						</div>
					    </div>
					    <br/>
					    <div class="fieldDiv">
						<div class="fl inputLabel">Reminder2*: </div>
						<div class="fr width60">
						    <input type="tel" class="width30 required" id="reminder2Data" value="" />
						    <select class="width50" data-theme="a" name="select-choice-1" id="reminder2">
							<option value="H">Hours</option>
							<option value="D">Days</option>
						    </select>
						</div>
					    </div>
					    <br/>
					    <div class="fieldDiv">
						<div class="fl inputLabel">Frequency*: </div>
						<div class="fr width60">
						    <div data-role="fieldcontain" data-theme="a">
							<select data-theme="a" name="select-choice-1" id="frequency" class=" required">
							    <option value="Daily">Daily</option>
							    <option value="Weekly">Weekly</option>
							    <option value="Monthly">Monthly</option>
							</select>
						    </div>
						</div>
					    </div>-->
					    <br/>
					    <div class="fieldDiv">
						<div class="fl inputLabel">Description: </div>
						<div class="fr width60">
						    <input class="width80" type="text" id="descriptionData"/>
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
			</div>
		</article><!-- end of post new article -->
		
		
		
		<div class="spacer"></div>
		</div>
	</section>


</body>

</html>