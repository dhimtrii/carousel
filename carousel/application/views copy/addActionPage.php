<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8"/>
	<title>Add Exercise</title>
	
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
	  
	  
		addAction();
		privKey = $('#privkey').html();
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
        $('.column').equalHeight();
    });
    
    $(document).ready(function(){
	$(".nameField").html(localStorage.getItem("fname")+ " " + localStorage.getItem("lname"));
        if(localStorage.getItem("edit") == "1"){
		var actId = localStorage.getItem("editActId");
                $.post("action/getselaction", { "id": actId },
                        function(data){
                          var actnData = JSON.stringify(data["action"]);
			  //alert(actnData);
			  actnData = eval(" (" + actnData + ") ");
			  
			    populateEditAction(actnData);
			
                        }, "json");
	}
    });
</script>

</head>


<body>

	<header id="header">
		<hgroup>
			<h1 class="site_title"><a href="index.html">My Health Analytics</a></h1>
			<h2 class="section_title">Exercise</h2>
		</hgroup>
	</header> <!-- end of header bar -->
	
	<section id="secondary_bar">
		<div class="user">
			<p class="nameField"></p>
			<!-- <a class="logout_user" href="#" title="Logout">Logout</a> -->
		</div>
		<div class="breadcrumbs_container">
		</div>
	</section><!-- end of secondary bar -->
	
	<aside id="sidebar" class="column">
		
		<h3 class="pointer" id="dashBoard">Dashboard</h3>
		
		
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
			<li class="icn_settings pointer" id="settings">Settings</li>
			<li class="icn_settings pointer" id="profile">Profile</li>
			<li class="icn_settings pointer" id="request">Doctors</li>
			<li class="icn_security pointer" id="logout">Logout</li>
		</ul>
		
		<footer>
			<hr />
			
		</footer>
	</aside><!-- end of sidebar -->
	
	<section id="main" class="column mainDiv">
		<div id="aaaaaa" style=padding-left:5%;>
		
		
		
		
		<article class="module width_3_quarter medication" style="width:95% !important;height:auto;margin-bottom:50px;">
			<header>
				
							<h3 id="hexagonMed" style="width:85%;text-align:center;">Add Exercise</h3>
							
				
			</header>

			<div class="tab_container">
				<div id="tab1" class="tab_content" id="patient_medication" style="min-height:690px;height:auto;">
					
					<div data-role="content" id="contentMed" class="patient_medication" style="min-height:690px;height:auto;margin-left: auto;margin-right: auto;width: 80%;">
						<div id="addEditActionForm" class="block float100 scroll">
							<br>
							<div id="actionOpHeader" class="float100">
							    <div id="actionOpName"></div><div style="display:block;padding-top:5%;width:50%;" class="AppointmentOperation fr">
								<a class="grayButton cancelMedication fr" style="color:#000 !important;" id="cancelActionEdit"  onclick="resetFields()"> Reset </a>
								<a id="okActionOp" style="padding:8px 20px;color:#fff !important;" class="medicationSaveButton blueButton fr" href="javascript:void(0);"> Save </a>
							    </div>
							</div>
							<div id="addEditActionContent">
							    <div id="exerciseContent" class="block" style="color:#000 !important;">
								<div class="float100 actionContentTr">
								    <div class="actionLabel">Name:</div>
								    <div class="actionInput">
									<select id="exerciseSelectName" class="actionSelectInput required" data-role="none">
									    <option value="">Select exercise type</option>
									    <option value="1">Yoga</option>
									    <option value="2">Walk</option>
									    <option value="3">Jogging</option>
									</select>
								    </div>
								    <div class="float100 actionContentTr">
									<div class="actionLabel">Duration:</div>
									<div class="actionInput">
									    <input type="tel" id="exerciseDuration" maxlength="3" class="editActionInput required requiredNum"> min
									</div>
								    </div>
								    <div class="float100 actionContentTr">
									<div class="actionLabel">Type:</div>
									<div class="actionInput">
									    <select id="exerciseSelectType" class="actionSelectInput required" data-role="none">
										<option value=""></option>
										<option value="low">Low</option>
										<option value="medium">Medium</option>
										<option value="high">High</option>
									    </select>
									</div>
								    </div>
								    <div class="float100 actionContentTr">
									<div class="actionLabel">From:</div>
									<div class="actionInput">
									    <input type="text" class="actionDate editActionInput required" id="exerciseFromDate" readonly="readonly">
									</div>
								    </div>
								    <div class="float100 actionContentTr">
									<div class="actionLabel">To:</div>
									<div class="actionInput">
									    <input type="text" class="actionDate editActionInput required" id="exerciseToDate" readonly="readonly">
									</div>
								    </div>
								    <div class="float100 actionContentTr">
									<div class="actionLabel">Frequency:</div>
									<div class="actionInput">
									    <input type="tel" id="exerciseFrequency" class="editActionInput required requiredNum" maxlength="1">
									    <div id="exerciseTime">   
									    </div>
									</div>
								    </div>
								    <div class="float100 actionContentTr">
									<div class="actionLabel">Description:</div>
									<div class="actionInput">
										<input type="text" id="exerciseDesc" class="float100 editActionInput" maxlength="50">
							    	        </div>
								    </div>
								    
								</div>
								    
								<input type="hidden" id="actUpdate" value="0" />
								<input type="hidden" id="actId" value="" />
								<textarea class="none" id="privKey" rows="15" cols="65"><?php echo $this->session->userdata('privKey'); ?></textarea>
			<textarea id="pubkey" class="none" rows="15" cols="65" placeholder="Leave blank for library to populate the public key from the private key."></textarea>
			<input type="hidden" id="patientId" value="<?php echo $this->session->userdata('pid'); ?>" />
								</div>
							    </div>
						    </div>
					</div>
				</div>
			
			
			
			</div><!-- end of .tab_container -->
		
		</article><!-- end of content manager article -->
		
		
		<div class="spacer"></div>
		</div>
	</section>


</body>

</html>