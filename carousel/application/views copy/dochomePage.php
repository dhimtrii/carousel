<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8"/>
	<title>Doctor Dashboard</title>
	
	<link rel="stylesheet" href="<?php echo base_url()?>styles/layout.css" type="text/css" media="screen" />
	<!--[if lt IE 9]>
	<link rel="stylesheet" href="<?php echo base_url()?>styles/ie.css" type="text/css" media="screen" />
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script type="text/javascript" charset="utf-8" src="<?php echo base_url()?>scripts/jquery-1.8.2.min.js"></script>
	<script src="<?php echo base_url()?>scripts/bin/jsencrypt.min.js"></script>
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
	<link rel="stylesheet" href="<?php echo base_url()?>styles/style.css" type="text/css" media="screen" />
	<script type="text/javascript">
	$(document).ready(function() 
    	{ 
      	  $(".tablesorter").tablesorter(); 
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
	var userid = $("#userid").val();
	var fname = $("#fname").val();
	var lname = $("#lname").val();
	localStorage.setItem("userid", userid);
	localStorage.setItem("fname", fname);
	localStorage.setItem("lname", lname);
	
	$(".nameField").html("Dr. " + localStorage.getItem("fname")+ " " + localStorage.getItem("lname"));
	$(".welcomeNameField").html("Welcome Dr." + localStorage.getItem("fname") + " " + localStorage.getItem("lname"));
    
      $.post("home/getalldocdata", { "docId": localStorage.getItem("userid") },
                        function(data){
                          //alert(data.username); // John
                          var requestList = JSON.stringify(data["request"]);
			  requestList = eval(" (" + requestList + ") ");
			  //alert(JSON.stringify(data["Medication"][0].id));
			  var filesList = JSON.stringify(data["files"]);
			  filesList = eval(" (" + filesList + ") ");
			    populateDocFilesList(filesList);
			    populateRequest(requestList);
			
                        }, "json");
    
	$.post("home/getallpatient", { "userId": localStorage.getItem("userid") },
                        function(data){
                          //alert(data.username); // John
                          var patientList = JSON.stringify(data["patientlist"]);
			  //alert(patientList);
			  patientList = eval(" (" + patientList + ") ");
			  
			    populatePatientList(patientList);
			
                        }, "json");
   
    });
</script>

</head>


<body>

	<header id="header">
		<hgroup>
			<h1 class="site_title"><a href="index.html">My Health Analytics</a></h1>
			<h2 class="section_title" onclick="openDocDash()">Dashboard</h2>
			<div style="position:absolute;top:10px;right:10px;padding: 10px 15px;cursor:pointer;" id="logout" class="medicationSaveButton blueButton">Log out</div>
		</hgroup>
	</header> <!-- end of header bar -->
	
	<section id="secondary_bar">
		<div class="user">
			<p class="namefield">Dr. Vinod Gupta</p>
			<!-- <a class="logout_user" href="#" title="Logout">Logout</a> -->
		</div>
		<div class="breadcrumbs_container">
		</div>
	</section><!-- end of secondary bar -->
	
	<aside id="sidebar" class="column">
		<form class="quick_search">
			<input type="text" id="contactsListForm" value="Quick Search" onkeyup="populatePatlists()" onfocus="if(!this._haschanged){this.value=''};this._haschanged=true;">
		</form>
		<hr/>
		<div id="patientList">
		</div>
	</aside><!-- end of sidebar -->
	
	<section id="main" class="column mainDiv">
	<div id="docDashboard">
		<h4 class="welcomeNameField alert_info">Welcome Dr. Vinod Gupta</h4>
		
		<article class="module width_full stats">
			<header class="textCenter"><h3>Shared Files</h3><img src="../images/collapse.png" id="patient_stats_div "class="fr collapse" style="margin-top:9px;margin-right:10px;"/></header>
			<div class="module_content overflow patient_stats_div">
				<div id="files" style="border-top:none !important;width: 94% !important;"></div>
			</div>
		</article><!-- end of stats article -->
		
		
		
		<div class="clear"></div>
		
		<article class="module width_full appointments">
			<header class="textCenter"><h3>Sharing Request</h3><img src="../images/collapse.png" id="patient_appt_div "class="fr collapse" style="margin-top:9px;margin-right:10px;"/></header>
				<div id="tab1" class="tab_content patient_appointment overflow block dashboardTab patient_appt_div friend_request" style="width:95% !important;">
			
			</div>
		</article><!-- end of post new article -->
		
		
		
		
		
		<div class="spacer"></div>
	</div>
	<div id="mainPat">
		<!--<h4 class="alert_info">Andrew Smithson</h4>
		
		<article class="module width_full stats">
			<header><h3>Health Stats</h3><img src="../images/collapse.png" id="patient_stats_div "class="fr collapse" style="margin-top:9px;margin-right:10px;"/></header>
			<div class="module_content overflow patient_stats_div">
				<article class="stats_graph">
					<img src="http://chart.apis.google.com/chart?chxr=0,0,3000&chxt=y&chs=520x140&cht=lc&chco=76A4FB,80C65A&chd=s:Tdjpsvyvttmiihgmnrst,OTbdcfhhggcTUTTUadfk&chls=2|2&chma=40,20,20,30" width="520" height="140" alt="" />
				</article>
				
				<article class="stats_overview">
					<div class="overview_today">
						
					</div>
					<div class="overview_previous">
						
					</div>
				</article>
				<div class="clear"></div>
			</div>
		</article>--><!-- end of stats article -->
		
		<article class="nonediv none module width_3_quarter medication">
		<header><h3 class="tabs_involved">Medications</h3><img src="../images/collapse.png" id="patient_med_div "class="fr collapse" style="margin-top:9px;margin-right:10px;"/></header>

		<div class="overflow dashboardTab patient_med_div">
			<div id="tab1" class="tab_content patient_medication" id="patient_medication">
			
			</div>
			
			
			
		</div><!-- end of .tab_container -->
		
		</article><!-- end of content manager article -->
		
		<article class="nonediv none module width_quarter messages">
			<header><h3>Messages</h3><img src="../images/collapse.png" id="patient_msg_div "class="fr collapse" style="margin-top:-35px;margin-right:10px;"/></header>
			<div class="message_list patient_msg_div">
				<div class="module_content">
					<!--<div class="message"><p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor.</p>
					<p><strong>John Doe</strong></p></div>
					<div class="message"><p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor.</p>
					<p><strong>John Doe</strong></p></div>
					<div class="message"><p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor.</p>
					<p><strong>John Doe</strong></p></div>
					<div class="message"><p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor.</p>
					<p><strong>John Doe</strong></p></div>
					<div class="message"><p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor.</p>
					<p><strong>John Doe</strong></p></div>-->
				</div>
			</div>
			<footer>
				<form class="post_message">
					<!--<input type="text" value="Message" onfocus="if(!this._haschanged){this.value=''};this._haschanged=true;">
					<input type="submit" class="btn_post_message" value=""/>-->
				</form>
			</footer>
		</article><!-- end of messages article -->
		
		<div class="clear"></div>
		
		<article class="nonediv none module width_full appointments">
			<header><h3>Appointments</h3><img src="../images/collapse.png" id="patient_appt_div "class="fr collapse" style="margin-top:9px;margin-right:10px;"/></header>
				<div id="tab1" class="tab_content patient_appointment overflow block dashboardTab patient_appt_div" id="patient_appointment"">
			
			</div>
		</article><!-- end of post new article -->
		
		
		<div class="clear"></div>
		
		<article class="nonediv none module width_full appointments">
			<header><h3>Vitals</h3><img src="../images/collapse.png" id="patient_vit_div "class="fr collapse" style="margin-top:9px;margin-right:10px;"/></header>
				<div id="tab1" class="tab_content patient_Vitaloverflow block dashboardTab patient_vit_div" id="patient_vital" style="height:200px; width:100%;">
					<div id="_div" class="fl fullMedActnDiv" style="display:block !important;">
						<div class="answerMedPrev">
							<span class="fl font14" style="margin-left:2%;margin-top:5px;font-size:20px;">Temperature</span>
						</div>
					
						<div id="_text" class="fl" style="width:100%;height:auto;display:inline-block;margin-left:10px;">
							<span style="color:red;font-size:20px;margin-left:10px;">102</span> degree
						</div>
					</div>
					<div id="_div" class="fl fullMedActnDiv" style="display:block !important;">
						<div class="answerMedPrev">
							<span class="fl font14" style="margin-left:2%;margin-top:5px;font-size:20px;">Weight</span>
						</div>
					
						<div id="_text" class="fl" style="width:100%;height:auto;display:inline-block;margin-left:10px;">
							<span style="color:green;font-size:20px;margin-left:10px;">220</span> lbs
						</div>
					</div>
			</div>
		</article><!-- end of post new article -->
		
		
		<div class="clear"></div>
		
		<article class="nonediv none module width_full appointments">
			<header><h3>Patient Vaccination</h3><img src="../images/collapse.png" id="patient_vaccn_div "class="fr collapse" style="margin-top:9px;margin-right:10px;"/></header>
				<div id="tab1" class="tab_content patient_vaccination patient_vaccn_div overflow block dashboardTab" id="patient_vaccination" style="width:100%;">
			
			</div>
		</article><!-- end of post new article -->
		
		
		
		<div class="spacer"></div>
	</div>
	</section>
	
	<div id="galleryDiv" class="galleryDiv">
            <div id="image" class="imageDiv"></div>
            
            <div id="closeGallery" style="position:fixed; z-index:9999999999;right:14%;top:18%;">
                <img src="http://localhost/xampp/sitess/myHealthAnalytics/images/icon_close.png" alt="files"/>
            </div>
        </div>
	
	<input type="hidden" id="userid" value="<?php echo $this->session->userdata('userid'); ?>" />
	<input type="hidden" id="fname" value="<?php echo $this->session->userdata('firstname'); ?>" />
	<input type="hidden" id="lname" value="<?php echo $this->session->userdata('lastname'); ?>" />


</body>

</html>