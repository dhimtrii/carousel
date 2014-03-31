<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8"/>
	<title>Add Vaccination</title>
	
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
	  $('.timepicker').scroller({
                preset: 'date',
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
    $(document).ready(function(){
	$(".nameField").html(localStorage.getItem("fname")+ " " + localStorage.getItem("lname"));
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
    });
</script>

</head>


<body>

	<header id="header">
		<hgroup>
			<h1 class="site_title"><a href="index.html">My Health Analytics</a></h1>
			<h2 class="section_title">Vaccination</h2>
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
		
		
		
		<article class="module width_3_quarter medication" style="width:95% !important;height:600px;">
			<header>
				<h3 id="hexagonMed" style="width:85%;text-align:center;">
					<span class="vaccnHeader fl textCenter underline" id="vaccnHeader" style="width:49%;cursor:pointer;">Add Vaccination</span>
					<span class="vaccnHeader fl textCenter underline" id="vaccnChildHeader" style="width:49%;cursor:pointer;">Add Child Vaccination</span>
				</h3>
							
				
			</header>

			<div class="tab_container" style="height:600px;">
				<div id="tab1" class="tab_content" id="patient_medication" style="height:600px;">
					
					<div data-role="content" id="contentAddVaccn" class="patient_medication overflow" style="height:600px;display:block;">
						<div id="addVaccn" class="width80 auto">
							<div style="display:block;margin-top:30px;" class="medicationOperation"> 
							    
							    <div class="saveMedicationOperation">
								<a onclick="return false;" class="grayButton cancelMedication" id="cancelVaccn" href="javascript:void(0);"  onclick="resetFields()"> Reset </a>
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
								    <!--<select class="width100" data-theme="a" name="select-choice-1" id="vaccnTitile">
									<option value="1">HEPATITIS B </option>
									<option value="2">POLIO</option>
									<option value="3">TUBERCULOSIS</option>
									<option value="4">POLIO MEASLES </option>
									<option value="5">DIPHTHERIA PERTUSIS TETANUS POLIO</option>
									<option value="6">DIPHTHERIA PERTUSIS TETANUS POLIO</option>
								    </select>-->
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
					
					<div data-role="content" id="contentAddChildVaccn" class="patient_medication overflow" style="height:600px;display:none;">
						<div id="addVaccn" class="width80 auto">
							<div style="display:block;margin-top:30px;" class="medicationOperation"> 
							    
							    <div class="saveMedicationOperation">
								<a onclick="return false;" class="grayButton cancelMedication" id="cancelVaccn" href="javascript:void(0);" onclick="closeVaccination()"> Cancel </a>
								<a onclick="saveChildVaccination();return false;" id="saveChildVaccn" style="padding:8px 20px;display:none;" class="medicationSaveButton blueButton" href="javascript:void(0);"> Save </a>
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
			<textarea class="none" id="privKey" rows="15" cols="65"><?php echo $this->session->userdata('privKey'); ?></textarea>
			<textarea id="pubkey" class="none" rows="15" cols="65" placeholder="Leave blank for library to populate the public key from the private key."></textarea>
			
			
			</div><!-- end of .tab_container -->
		
		</article><!-- end of content manager article -->
		
		
		<div class="spacer"></div>
		</div>
	</section>


</body>

</html>