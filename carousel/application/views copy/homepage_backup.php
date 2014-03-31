<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8"/>
	<title>Patient Dashboard</title>
	
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
	<!-- graph Library-->
	<script src="<?php echo base_url()?>js/highcharts.js"></script>
	<script src="<?php echo base_url()?>js/modules/exporting.js"></script>
	<!-- graph Library-->
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
	$(".collapse").each(function(){
		var id = $(this).attr('id');
		$("."+id).css("height", "10px");
	});
	$(".patient_stats_div").css("height", "400px");
     
	       
	for(var i=1; i<=4; i++){
		//alert(i);
	       $.post("home/getallgraphdata", { "patientId": 5, 'id':i },
                        function(data){
                          
			  var graphData = JSON.stringify(data["vitals"]);
			  var graphData = eval(" (" + graphData + ") ");
			   
			   populateGraph(graphData);
			   
			
			
                        }, "json");
	}
	       
	       
	       
	function populateGraph(graphData){
		
		var date1Axis = new Array();
		var date2Axis = new Array();
		var date3Axis = new Array();
		var date4Axis = new Array();
		var attr1Axis = new Array();
		var attr2Axis = new Array();
		var attr3Axis = new Array();
		var attr4Axis = new Array();
		var title = "";
		var val;
		for ( var i in graphData) {
			title = graphData[i].name;
			val = parseInt(graphData[i].vid);
			var date = graphData[i].createddate;
			date = date.split("-");
			date = date.join("/");
			//alert(date);
			//alert(new Date(date));
			//if(graphData[i].attributename1 != ""){
				attr1Axis = [new Date(date), graphData[i].attrvalue1];
				date1Axis.push(attr1Axis);
			//}
			if(val == 1 || val == 2){
				if(graphData[i].attributename2 != ""){
					attr2Axis = [new Date(date), graphData[i].attrvalue2];
					date2Axis.push(attr2Axis);
				}
			}
			if(val == 1){
				if(graphData[i].attributename3 != ""){
					attr3Axis = [new Date(date), graphData[i].attrvalue3];
					date3Axis.push(attr3Axis);
				}
				if(graphData[i].attributename4 != ""){
					attr4Axis = [new Date(date), graphData[i].attrvalue4];
					date4Axis.push(attr4Axis);
				}
			}
			
		}
		//alert(date1Axis);
		//alert(date2Axis);
		//alert(date3Axis);
		//alert(date4Axis);
		
		if(val > 0){
			$("#graph").append('<div id="'+val+'Chart" style="width: 100%; height: 300px;"></div>')
			//alert("1-"+val);
			if(val == 3 || val == 4){
			
				$('#'+val+'Chart').jqChart({
					title: { text: 'Spline Chart' },
					tooltips: { type: 'shared' },
					animation: { duration: 1 },
					axes: [
						{
						    location: 'bottom',
						    type: 'dateTime',
						    labels: { stringFormat: 'm/d/yy' }
						}
					    ],
					series: [
							{
							    type: 'line',
							    title: 'Series 1',
							    strokeStyle: '#418CF0',
							    lineWidth: 2,
							    data: date1Axis
							}
						    ]
				});
			}else if(val == 2){
				
				$('#'+val+'Chart').jqChart({
					title: { text: 'Spline Chart' },
					tooltips: { type: 'shared' },
					animation: { duration: 1 },
					axes: [
						{
						    location: 'bottom',
						    type: 'dateTime',
						    labels: { stringFormat: 'm/d/yy' }
						}
					    ],
					series: [
							{
							    type: 'line',
							    title: 'Series 1',
							    strokeStyle: '#418CF0',
							    lineWidth: 2,
							    data: date1Axis
							},
							{
							    type: 'line',
							    title: 'Series 2',
							    strokeStyle: '#FCB441',
							    lineWidth: 2,
							    data: date2Axis
							}
						    ]
				});
			}else{
				$('#'+val+'Chart').jqChart({
					title: { text: 'Spline Chart' },
					tooltips: { type: 'shared' },
					animation: { duration: 1 },
					axes: [
						{
						    location: 'bottom',
						    type: 'dateTime',
						    labels: { stringFormat: 'm/d/yy' }
						}
					    ],
					series: [
							{
							    type: 'line',
							    title: 'Series 1',
							    strokeStyle: '#418CF0',
							    lineWidth: 2,
							    data: date1Axis
							},
							{
							    type: 'line',
							    title: 'Series 2',
							    strokeStyle: '#FCB441',
							    lineWidth: 2,
							    data: date2Axis
							},
							{
							    type: 'line',
							    title: 'Series 2',
							    strokeStyle: '#FCB441',
							    lineWidth: 2,
							    data: date3Axis
							},
							{
							    type: 'line',
							    title: 'Series 2',
							    strokeStyle: '#FCB441',
							    lineWidth: 2,
							    data: date4Axis
							}
						    ]
				});
			}
		}
	}
   
    });
</script>

</head>


<body>

	<header id="header">
		<hgroup>
			<h1 class="site_title"><a href="index.html">My Health Analytics</a></h1>
			<h2 class="section_title">Dashboard</h2>
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
		<!--<form class="quick_search">
			<input type="text" value="Quick Search" onfocus="if(!this._haschanged){this.value=''};this._haschanged=true;">
		</form>-->
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
		<div id="aaaaaa">
		<h4 class="alert_info">Welcome Andrew Smithson</h4>
		
		
		<article class="module width_full stats">
			<header><h3>Health Stats</h3><img src="../images/collapse.png" id="patient_stats_div "class="fr collapse" style="margin-top:9px;margin-right:10px;"/></header>
			<div class="module_content overflow patient_stats_div" id="graph">
				
				
			</div>
		</article>
		
		<article class="module width_full stats">
			<header><h3>Health Stats</h3><img src="../images/expand.png" id="patient_files_div "class="fr collapse" style="margin-top:9px;margin-right:10px;"/></header>
			<div class="module_content overflow patient_files_div" id="files">
				
				
			</div>
		</article><!-- end of stats article -->
		
		<div class="module width_full" style="display:inline-block;">
			<article class="width_half medication">
				<header><h3 class="tabs_involved">Medications</h3><img src="../images/expand.png" id="patient_med_div "class="fr collapse" style="margin-top:9px;margin-right:10px;"/></header>
	
				
					<div id="tab1" class="tab_content patient_medication overflow dashboardTab patient_med_div tabDiv" id="patient_medication">
						<div data-role="content" id="contentMed" class="patient_medication overflow">
							
							</div>
					</div>
					
					
					
				<!-- end of .tab_container -->
			
			</article><!-- end of content manager article -->
		
			<article class="width_half appointments" style="float:right;">
				<header><h3>Appointments</h3><img src="../images/expand.png" id="patient_appt_div" class="fr collapse" style="margin-top:-35px;margin-right:10px;"/></header>
					<div id="tab1" class="tab_content patient_appointment overflow block dashboardTab patient_appt_div tabDiv" id="patient_appointment" style="width:100%;">
						<div data-role="content" id="contentAppt" class="patient_appointment overflow">
						
					</div>
				</div>
			</article><!-- end of post new article -->
		
		</div>
		<div class="clear"></div>
		
		<div class="module width_full" style="display:inline-block;">
			<article class="width_half appointments">
				<header><h3>Vitals</h3><img src="../images/expand.png" id="patient_vit_div "class="fr collapse" style="margin-top:-35px;margin-right:10px;"/></header>
					<div id="tab1" class="tab_content patient_Vitaloverflow block dashboardTab patient_vit_div tabDiv" id="patient_vital" style="height:200px; width:100%;">
						<div data-role="content" id="contentVit" class="patient_medication overflow">
						
						</div>
				</div>
			</article><!-- end of post new article -->
			
			
			
			
			<!--<article class="module width_full appointments">
				<header><h3>Patient Action</h3><img src="../images/collapse.png" id="patient_act_div "class="fr collapse" style="margin-top:9px;margin-right:10px;"/></header>
					<div id="tab1" class="tab_content patient_vaccination patient_act_div overflow block dashboardTab" id="patient_action" style="width:100%;">
						<div data-role="content" id="contentMed" class="patient_medication overflow">
						
						</div>
				</div>
			</article>
			
			<div class="clear"></div>-->
			
			<article class="width_half appointments" style="float:right;">
				<header><h3>Patient Vaccination</h3><img src="../images/expand.png" id="patient_vaccn_div "class="fr collapse" style="margin-top:-35px;margin-right:10px;"/></header>
					<div id="tab1" class="tab_content patient_vaccination patient_vaccn_div overflow block dashboardTab tabDiv" id="patient_vaccination" style="width:100%;">
				
				</div>
			</article><!-- end of post new article -->
		</div>
		
		
		
		<div class="spacer"></div>
		<textarea class="none" id="privKey" rows="15" cols="65"><?php echo $this->session->userdata('privKey'); ?></textarea>
			<textarea id="pubkey" class="none" rows="15" cols="65" placeholder="Leave blank for library to populate the public key from the private key."></textarea>
		</div>
	</section>


</body>

</html>