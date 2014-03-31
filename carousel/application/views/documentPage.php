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
	 <script type="text/javascript" language="javascript" src="<?php echo base_url()?>scripts/jquery.dropdownPlain.js"></script>
         
         
   <script>
       $(document).ready(function() {
	    var doctorList;
	 $(".nameField").html(localStorage.getItem("fname")+ " " + localStorage.getItem("lname"));
	 $(".backToFolder").css("display", "none");
	 if(localStorage.getItem("role") == 1){
	    $.post("home/getalldoctor", { "patientId": localStorage.getItem("userid") },
                        function(data){
                          //var medicationDetailsList = JSON.stringify(data["Doctor"]);
			doctorList = JSON.stringify(data["doctor"]);
			  doctorList = eval(" (" + doctorList + ") ");
			populatePatientDoctor(doctorList);
                        }, "json");
	 }else{
            $.post("home/getallpatient", { "userId": localStorage.getItem("userid") },
                        function(data){
                          //var medicationDetailsList = JSON.stringify(data["Doctor"]);
			doctorList = JSON.stringify(data["patient"]);
			  doctorList = eval(" (" + doctorList + ") ");
			populatePatientDoctor(doctorList);
                        }, "json");
	 }
	    
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
		     resetFields();
                  }
               });
               return false;
            });
         });
       
       function getDirectory()
      {
      strFile = $("#userfile").val();//document.FileForm.filename.value;
      intPos = strFile.lastIndexOf("\\");
      strDirectory = strFile.substring(0, intPos);
      //alert(strFile);
      //document.FileForm.Directory.value = strDirectory;
      }
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
							<li id="vaccination" class="Vaccination"><a href="#">Vaccination</a></li>
							<?php } ?>
							<li id="document" class="active document"><a href="#">Documents</a></li>
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

					<h3 style="width:50% !important;text-align:left;">Documents</h3>
					<a id="uploadDocument" style="padding:8px 20px;" class="medicationSaveButton blueButton" href="javascript:void(0);"> Upload </a>
				</section>
				<!-- end of cols -->
				<section class="post" id="patient_graph" style="min-height:500px;">
					<header>
				
						
				    		
					</header>
					<div id="tab1" class="tab_content patient_appointment block" id="patient_appointment" style="width:100%;">
						<?php if($this->session->userdata('role') == 2){ ?>
						      <div class="fl" style="width:50%;margin-top: 30px;margin-bottom: 10px;">
								  <div style="width: 250px; font-size: 16px; height: 35px; padding-top: 4px;" class="fl">Patient Name:
								     <select style="font-size:16px;" id="selectPatDoc" class="selectPatDoc" onchange="showPatDoc()"></select></div>
								  <div style="float:left;padding: 2% 3.5%;cursor:pointer;" class="share medicationSaveButton blueButton">Share</div>
								  <div style="float:left;padding: 2% 3.5%;cursor:pointer;" class="medicationSaveButton blueButton" onclick="shareUnshareDoc()">Unshare</div>
								  
								  </div>
						      <div class="backToFolder" style="cursor:pointer;" onclick="showPatDoc()">Back</div>
							 <div id="files"></div>
						      </div>
						<?php }else{ ?>
						      <div class="fl" style="width:50%;margin-top: 30px;margin-bottom: 10px;">
								  <div style="width: 250px; font-size: 16px; height: 35px; padding-top: 4px;" class="fl">Doctor Name:
								     <select style="font-size:16px;" id="selectPatDoc" class="selectPatDoc" onchange="showPatDoc()"></select></div>
								  <div style="float:left;padding: 2% 3.5%;cursor:pointer;" class="share medicationSaveButton blueButton">Share</div>
								  <div style="float:left;padding: 2% 3.5%;cursor:pointer;" class="medicationSaveButton blueButton" onclick="shareUnshareDoc()">Unshare</div>
								  </div>
						      <div class="backToFolder" style="cursor:pointer;" onclick="showPatDoc()">Back</div>
							 <div id="files"></div>
						      </div>
						<?php } ?>
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
	
	<div id="galleryDiv" class="galleryDiv">
            <div id="image" class="imageDiv"></div>
            
            <div id="closeGallery" style="position:fixed; z-index:9999999999;right:14%;top:18%;">
                <img src="http://54.213.19.88/myHealthAnalytics/images/icon_close.png" alt="files"/>
            </div>
        </div>
	
      <div id="contUploadDiv" class="overflow addMed none addDiv" style="position:fixed;top:7%;left:20%;width:60%;height:90%;">
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
				    <input type="file" name="userfile" id="userfile" size="20"/>
			      </div>
			</div>
			
                     
                     
                
                     
                  </form>
                  <h2></h2>
                  <div id="files"></div>
	    </div>
      </div>
      
      <div id="enterComment" class="overflow addMed none addDiv" style="position:fixed;top:7%;left:20%;width:60%;height:90%;">
		<div data-role="content" id="contComent" class="overflow" style="height:600px;display:block;">
			<div id="addVaccn" class="width80 auto">
			      <div style="display:block;margin-top:30px;" class="medicationOperation"> 
				    <div class="saveMedicationOperation">
					  <a class="grayButton cancelMedication" href="javascript:void(0);"  onclick="resetsFields()"> Cancel </a>
					  <a style="padding:8px 20px;" class="medicationSaveButton blueButton" id="shareDoc" href="javascript:void(0);"> Save </a>
				    </div> 
			      </div> 
			      <br/>
							
							    
			      <div class="fieldDiv">
				    <div class="fl inputLabel">Comments: </div>
				    <div class="fr width60">
					  <textarea rows="7" cols="26" id="shareComment" class="font16 requiredVaccn vaccn"></textarea>
				    </div>
			      </div>
							    
			</div>
		  </div>
		  
	    </div>
      
      
      <textarea class="none" id="privKey" rows="15" cols="65"><?php echo $this->session->userdata('privKey'); ?></textarea>
      <textarea id="pubkey" class="none" rows="15" cols="65" placeholder="Leave blank for library to populate the public key from the private key."></textarea>
      
      
</body>
</html>