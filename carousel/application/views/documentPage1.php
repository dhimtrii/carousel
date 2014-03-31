<!doctype html>
<html>
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
         <script src="<?php echo base_url()?>scripts/ajaxfileupload.js"></script>
         
         
   <script>
       $(document).ready(function() {
	    var doctorList;
	 $(".nameField").html(localStorage.getItem("fname")+ " " + localStorage.getItem("lname"));
            $.post("home/getalldoctor", { "patientId": localStorage.getItem("patientid") },
                        function(data){
                          //var medicationDetailsList = JSON.stringify(data["Doctor"]);
			doctorList = JSON.stringify(data["doctor"]);
			  doctorList = eval(" (" + doctorList + ") ");
			populateDoctor(doctorList);
                        }, "json");
	    
	    $(".nameField").html(localStorage.getItem("fname")+ " " + localStorage.getItem("lname"));
            $('#submit').click(function(e) {
               e.preventDefault();
               $.ajaxFileUpload({
                  url         :'<?php echo base_url()?>index.php/upload/upload_file/', 
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
					<h1 id="" style="height:40px;color:#7BFFFF !important;"><a class="cursive" href="#" style="color:#7BFFFF !important;background: url('<?php echo base_url()?>images/mhm.gif') no-repeat scroll 114px 7px / 50px 30px rgba(0, 0, 0, 0)">My Health <span style="margin-left:30px;">Analytics</span></a></h1>
					<nav id="navigation">
						<a href="#" class="nav-btn">Home<span></span></a>
						<ul>
							<li id="home" class="home"><a href="#">Dashboard</a></li>
							<li id="medication" class="medication"><a href="#">Medication</a></li>
							<li id="exercise" class="exercise"><a href="#">Exercise</a></li>
							<li id="appointment" class="appointment"><a href="#">Appointment</a></li>
							<li id="vital" class="vital"><a href="#">Vitals</a></li>
							<li id="vaccination" class="Vaccination"><a href="#">Vaccination</a></li>
							<li id="document" class="active document"><a href="#">Documents</a></li>
							<li id="settings" class="settings"><a href="#">Settings</a></li>
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
		<aside class="fl" style="width:12%;">
			<ul class="leftNav">
				<li id="settings" class="settings"><a href="">Settings</a></li>
				<li id="profile" class="profile"><a href="">Profile</a></li>
				<li id="doctors" class="doctors"><a href="">Doctors</a></li>
				<li id="logout" class="logout"><a href="">Logout</a></li>
			</ul>
		</aside>
		<div class="shell">
			<!-- main -->
			<div class="main">
				<!-- cols -->
				<section class="cols" style="text-align:center;padding-bottom: 30px !important;padding-top: 10px;font-size:18px;">

					<h3 style="width:88% !important;">Documents</h3>
					<a id="uploadDocument" style="padding:8px 20px;" class="medicationSaveButton blueButton" href="javascript:void(0);"> Upload </a>
				</section>
				<!-- end of cols -->
				<section class="post" id="patient_graph" style="min-height:500px;">
					<header>
				
						
							
					</header>
					<div id="tab1" class="tab_content patient_appointment block" id="patient_appointment" style="width:100%;">
						
						<div class="fr" style="width:100%;margin-top: 30px;margin-bottom: 10px;">
							    <div style="width: 300px; font-size: 16px; height: 35px; padding-top: 4px;" class="fl">Doctor Name:
							       <select style="font-size:16px;" id="selectPatDoc" class="selectPatDoc" onchange="showPatDoc()"></select></div>
							    <div style="float:right;padding: 1% 2.5%;" id="share" class="medicationSaveButton blueButton">Share</div>
							    </div>   
						   <div id="files"></div>
						</div>
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
					
					<p class="copy">Copyright &copy; 2012<span>|</span>Design by: <a href="http://chocotemplates.com" target="_blank">www.ChocoTemplates.com</a></p>
					<div class="cl">&nbsp;</div>
				</div>
			</div>
			<!-- end of shell -->
		</div>
		<!-- footer -->
	</div>
	<!-- end of wrapper -->
	
      <div id="contUploadDiv" class="overflow addMed none" style="position:fixed;top:7%;left:20%;width:60%;height:90%;">
	    <div style="display:block;padding-top:1%;" class="AppointmentOperation fr">
		  <div class="saveAppointmentOperation">
			<a style="padding: 8px 20px; margin-right: 10px;color:#000 !important;" class="grayButton cancelMedication"  onclick="resetFields()"> Cancel </a>
			<a style="padding:8px 20px;color:#fff !important;" class="medicationSaveButton blueButton" id="submit" href="javascript:void(0);"> Upload </a>
		  </div>
	    </div>
	    <br/>
	    <div style="width:60%;margin:50px auto;">
		  
		  <h1>Upload File</h1>
                  <form method="post" action="" id="upload_file">
			<div class="fieldDiv">
			      <div class="fl inputLabel">Title: </div>
			      <div class="fr width60">
				    <input class="width80" type="text" name="title" id="title"/>
			      </div>
			</div>
                     
			<br/>
			<div class="fieldDiv">
			      <div class="fl inputLabel">File: </div>
			      <div class="fr width60">
				    <input type="file" name="userfile" id="userfile" size="20" />
			      </div>
			</div>
                     
                     
                
                     
                  </form>
                  <h2></h2>
                  <div id="files"></div>
	    </div>
      </div>
      
      <div id="enterComment" class="overflow addMed none" style="position:fixed;top:7%;left:20%;width:60%;height:90%;">
	    <div style="display:block;padding-top:1%;" class="AppointmentOperation fr">
		  <div class="saveAppointmentOperation">
			<a style="padding: 8px 20px; margin-right: 10px;color:#000 !important;" class="grayButton cancelMedication"  onclick="resetFields()"> Cancel </a>
			<a style="padding:8px 20px;color:#fff !important;" class="medicationSaveButton blueButton" id="shareDoc" href="javascript:void(0);"> Share </a>
		  </div>
	    </div>
	    <br/>
	    <div style="width:60%;margin:50px auto;">
		 
			<div class="fieldDiv">
			      <div class="fl inputLabel">Title: </div>
			      <div class="fr width60">
				    
				    <textarea id="shareComment"  class="width80" rows="5" cols="25"></textarea>
			      </div>
			</div>
                     
			
                     
                     
                
                     
                  </form>
                  <h2></h2>
                  <div id="files"></div>
	    </div>
      </div> 
      <textarea class="none" id="privKey" rows="15" cols="65"><?php echo $this->session->userdata('privKey'); ?></textarea>
      <textarea id="pubkey" class="none" rows="15" cols="65" placeholder="Leave blank for library to populate the public key from the private key."></textarea>
</body>
</html>