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
		<script src="js/modernizr.custom.js"></script>
	<![endif]-->
	<!-- graph Library-->
	<script src="<?php echo base_url()?>js/highcharts.js"></script>
	<script src="<?php echo base_url()?>js/modules/exporting.js"></script>
	<!-- graph Library-->
	<script src="<?php echo base_url()?>scripts/displayfunctions.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/function.js" type="text/javascript"></script>
	<script type="text/javascript" language="javascript" src="<?php echo base_url()?>scripts/jquery.dropdownPlain.js"></script>
	<script type="text/javascript">
		
		$(document).ready(function(){
			localStorage.setItem("isPatHome", 1);
		    $(".collapse").each(function(){
			    var id = $(this).attr('id');
			    $("."+id).css("height", "0px");
		    });
		    $(".patient_stats_div").css("height", "400px");
		    
		    var patid = $("#patientid").val();
		    var userid = $("#userid").val();
		    
		    var fname = $("#fname").val();
		    var lname = $("#lname").val();
		    var pincode = $("#pincode").val();
		    
		    localStorage.setItem("patientid", patid);
		    localStorage.setItem("fname", fname);
		    localStorage.setItem("lname", lname);
		    localStorage.setItem("pincode", pincode);
		    $(".nameField").html(localStorage.getItem("fname")+ " " + localStorage.getItem("lname"));
		    $.post("home/getuserdata", { "patientId": localStorage.getItem("userid") },
				    function(data){
				      
				      var userData = JSON.stringify(data["userinfo"]);
				      userData = eval(" (" + userData + ") ");
				      populatePersonalInfo(userData);
				      updateSettingsData();
					
		    }, "json");
		    $(".welcomeNameField").html("Welcome " + localStorage.getItem("fname") + " " + localStorage.getItem("lname"));
			   
		    for(var i=1; i<=4; i++){
			    //alert(i);
			   $.post("home/getallgraphdata", { "patientId": localStorage.getItem("patientid"), 'id': i },
				    function(data){
				      
				      var graphData = JSON.stringify(data["vitals"]);
				      if(graphData != "false"){
					    var graphData = eval(" (" + graphData + ") ");
				       
					    populateGraph(graphData);
					    
					    
					    ///getSettingsdata(localStorage.getItem("patientid"));
				      }
				    
				    
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
			    var highRange1 = new Array();
			    var lowRange1 = new Array();
			    var highRange2 = new Array();
			    var lowRange2 = new Array();
			    var highRange3 = new Array();
			    var lowRange3 = new Array();
			    var highRange4 = new Array();
			    var lowRange4 = new Array();
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
					    attr1Axis.push(parseInt(graphData[i].attrvalue1));
					    date1Axis.push(date);
					    highRange1.push(110);
					    lowRange1.push(70);
				    //}
				    if(val == 1 || val == 2){
					    if(graphData[i].attributename2 != ""){
						    attr2Axis.push(parseInt(graphData[i].attrvalue2));
						    highRange2.push(110);
						    lowRange2.push(70);
						    //date2Axis.push(attr2Axis);
					    }
				    }
				    if(val == 1){
					    if(graphData[i].attributename3 != ""){
						    attr3Axis.push(parseInt(graphData[i].attrvalue3));
						    highRange3.push(110);
						    lowRange3.push(70);
						    //date3Axis.push(attr3Axis);
					    }
					    if(graphData[i].attributename4 != ""){
						    attr4Axis.push(parseInt(graphData[i].attrvalue4));
						    highRange4.push(110);
						    lowRange4.push(70);
						    //date4Axis.push(attr4Axis);
					    }
				    }
				    
			    }
			    //alert(attr1Axis);
			    //alert(attr2Axis);
			    //alert(attr4Axis);
			    //alert("1--"+date1Axis);
			    var titles;
			    
			    if(graphData[i].attributename1 == ""){
				    titles = title;
			    }else{
				    titles = graphData[i].attributename1;
			    }
			    
			    
			    if(val > 0){
				    $("#graph").append('<div id="'+val+''+graphData[i].attributename1+'Chart" style="width: 100%; height: 300px;"></div>');
				    
				    
			    
				    $('#'+val+''+graphData[i].attributename1+'Chart').highcharts({
						    title: {
							text: title,
							x: -20 //center
						    },
						    subtitle: {
							text: '',
							x: -20
						    },
						    xAxis: {
							categories: date1Axis
						    },
						    yAxis: {
							title: {
							    text: titles
							},
							plotLines: [{
							    value: 0,
							    width: 1,
							    color: '#808080'
							}]
						    },
						    tooltip: {
							valueSuffix: '¡C'
						    },
						    legend: {
							layout: 'vertical',
							align: 'right',
							verticalAlign: 'middle',
							borderWidth: 0
						    },
						    series: [{
							name: titles,
							data: attr1Axis
						    },
						    {
							name: "high Range",
							data: highRange1
						    },
						    {
							name: "Low Range",
							data: lowRange1
						    }]
						});
				    
				    if(val == 1 || val == 2){
					    $("#graph").append('<div id="'+val+''+graphData[i].attributename2+'Chart" style="width: 100%; height: 300px;"></div>');
					    $('#'+val+''+graphData[i].attributename2+'Chart').highcharts({
						    title: {
							text: title,
							x: -20 //center
						    },
						    subtitle: {
							text: '',
							x: -20
						    },
						    xAxis: {
							categories: date1Axis
						    },
						    yAxis: {
							title: {
							    text: graphData[i].attributename2
							},
							plotLines: [{
							    value: 0,
							    width: 1,
							    color: '#808080'
							}]
						    },
						    tooltip: {
							valueSuffix: '¡C'
						    },
						    legend: {
							layout: 'vertical',
							align: 'right',
							verticalAlign: 'middle',
							borderWidth: 0
						    },
						    series: [{
							name: graphData[i].attributename2,
							data: attr2Axis
						    },
						    {
							name: "high Range",
							data: highRange2
						    },
						    {
							name: "Low Range",
							data: lowRange2
						    }]
						});
				    }
				    
				    if(val == 1){
					    $("#graph").append('<div id="'+val+'TriglyChart" style="width: 100%; height: 300px;"></div>');
					    $("#graph").append('<div id="'+val+'TotalChart" style="width: 100%; height: 300px;"></div>');
					    $('#1TriglyChart').highcharts({
						    title: {
							text: title,
							x: -20 //center
						    },
						    subtitle: {
							text: '',
							x: -20
						    },
						    xAxis: {
							categories: date1Axis
						    },
						    yAxis: {
							title: {
							    text: 'Trigly'
							},
							plotLines: [{
							    value: 0,
							    width: 1,
							    color: '#808080'
							}]
						    },
						    tooltip: {
							valueSuffix: '¡C'
						    },
						    legend: {
							layout: 'vertical',
							align: 'right',
							verticalAlign: 'middle',
							borderWidth: 0
						    },
						    series: [{
							name: 'Trigly',
							data: attr3Axis
						    },
						    {
							name: "high Range",
							data: highRange3
						    },
						    {
							name: "Low Range",
							data: lowRange3
						    }]
						});
					    
					    $('#1TotalChart').highcharts({
						    title: {
							text: title,
							x: -20 //center
						    },
						    subtitle: {
							text: '',
							x: -20
						    },
						    xAxis: {
							categories: date1Axis
						    },
						    yAxis: {
							title: {
							    text: 'Total'
							},
							plotLines: [{
							    value: 0,
							    width: 1,
							    color: '#808080'
							}]
						    },
						    tooltip: {
							valueSuffix: '¡C'
						    },
						    legend: {
							layout: 'vertical',
							align: 'right',
							verticalAlign: 'middle',
							borderWidth: 0
						    },
						    series: [{
							name: 'Total',
							data: attr4Axis
						    },
						    {
							name: "high Range",
							data: highRange4
						    },
						    {
							name: "Low Range",
							data: lowRange4
						    }]
						});
				    }
			    }
		    }
	       
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
							<li id="home" class="active home"><a href="#">Dashboard</a></li>
							<?php if($this->session->userdata('role') == 1){ ?>
							<li id="medication" class="medication"><a href="#">Medication</a></li>
							<li id="exercise" class="exercise"><a href="#">Exercise</a></li>
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
			<div class="main" style="color:#000 !important;">
				<!-- cols -->
				<section class="cols" style="text-align:center;padding-bottom: 30px !important;padding-top: 10px;font-size:18px;">

					<h3>Dashboard</h3>

				</section>
				<section class="post" id="patient_graph" style="margin-top:110px;">
					<article class="module width_full stats">
						<!--<header><h3>Personal Information</h3></header>-->
						<div class="module_content overflow" id="personalInfo" style="border:none !important;height:auto !important;">
							<div class="infoDiv">
								<div style="width:25%;float:left;">Name: </div><div id="name" style="width:75%;float:left;">  </div>
							</div>
							<div class="infoDiv">
								<div style="width:25%;float:left;;">Disease: </div><div id="disease" style="width:75%;float:left;">  </div>
							</div>
							<div class="infoDiv">
								<div style="width:25%;float:left;;;">DOB: </div><div id="dob" style="width:75%;float:left;">  </div>
								
							</div>
							<div class="infoDiv">
								<div style="width:25%;float:left;;;">Gender: </div><div id="gender" style="width:75%;float:left;">  </div>
							
							</div>
							<div class="infoDiv">
								<div style="width:25%;float:left;;;">Address: </div><div id="address" style="width:75%;float:left;">  </div>
							</div>
							<div class="infoDiv">
								<div style="width:25%;float:left;;;">Email: </div><div id="email" style="width:75%;float:left;">  </div>
							</div>
							<div class="infoDiv">
								<div style="width:25%;float:left;;;">Telephone No: </div><div id="tel" style="width:75%;float:left;">  </div>
							</div>
							
						</div>
					</article>
				</section>
				<!-- end of cols -->
				<section class="post" id="patient_graph">
					<article class="module width_full stats">
						<header><h3>Health Statistics</h3><img src="../images/expand.png" id="patient_files_div "class="fr collapse" style="margin-top:9px;margin-right:10px;"/></header>
						<div class="module_content overflow patient_stats_div" id="graph" style="margin-top:10px;">
				
				
						</div>
					<div class="cl">&nbsp;</div>
					</article><!-- end of content manager article -->
				</section>


				<!--<section class="post" id="patient_graph" style="margin-top:110px;">
					<article class="module width_full stats">
						<header><h3>Uploaded Files</h3><img src="../images/expand.png" id="patient_files_div "class="fr collapse" style="margin-top:9px;margin-right:10px;"/></header>
						<div class="module_content overflow patient_files_div" id="files" style="border:none !important;">
							
							
						</div>
					</article>
				</section>-->
				
				

				
			</div>
			<textarea class="none" id="privKey" rows="15" cols="65"><?php echo $this->session->userdata('privKey'); ?></textarea>
			<textarea id="pubkey" class="none" rows="15" cols="65" placeholder="Leave blank for library to populate the public key from the private key."></textarea>
			<input type="hidden" id="patientid" value="<?php echo $this->session->userdata('pid'); ?>" />
			<input type="hidden" id="userid" value="<?php echo $this->session->userdata('userid'); ?>" />
			<input type="hidden" id="fname" value="<?php echo $this->session->userdata('firstname'); ?>" />
			<input type="hidden" id="lname" value="<?php echo $this->session->userdata('lastname'); ?>" />
			<input type="hidden" id="pincode" value="<?php echo $this->session->userdata('pincode'); ?>" />
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
	
	<div id="galleryDiv" class="galleryDiv">
            <div id="image" class="imageDiv"></div>
            
            <div id="closeGallery" style="position:fixed; z-index:9999999999;right:14%;top:18%;">
                <img src="http://localhost/xampp/sitess/myHealthAnalytics/images/icon_close.png" alt="files"/>
            </div>
        </div>
</body>
</html>