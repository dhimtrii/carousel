<!doctype html>
<html>
<head>
      <link rel="stylesheet" href="<?php echo base_url()?>styles/layout.css" type="text/css" media="screen" />

   <!--[if lt IE 9]>
	<link rel="stylesheet" href="<?php echo base_url()?>styles/ie.css" type="text/css" media="screen" />
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<link rel="stylesheet" href="<?php echo base_url()?>styles/datepicker.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo base_url()?>styles/style.css" type="text/css" media="screen" />
         <script type="text/javascript" charset="utf-8" src="<?php echo base_url()?>scripts/jquery-1.8.2.min.js"></script>
	<script src="<?php echo base_url()?>scripts/hideshow.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/mobiscroll.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>scripts/jquery.tablesorter.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="<?php echo base_url()?>scripts/jquery.equalHeight.js"></script>
	<script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/jquery-ui-1.8.18.custom.min.js"></script>
        <script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/function.js"></script>
	<link rel="stylesheet" href="<?php echo base_url()?>styles/mobiscroll.css" type="text/css" media="screen" />
         <script src="<?php echo base_url()?>scripts/ajaxfileupload.js"></script>
         
   <script>
	    $(document).ready( function() {
		  $(".nameField").html(localStorage.getItem("fname")+ " " + localStorage.getItem("lname"));
                   $.post("<?php echo base_url()?>index.php/registration/getcountry", {  },
                        function(data){
                          
                          data = JSON.stringify(data["country"]);
			  data = eval(" (" + data + ") ");
                          var i;
                          var options = "";
                          for(i=0;i < data.length;i++){
                            options = options + '<option value="'+data[i].cid+'">'+data[i].name+'</option>';
                          }
                          //alert(options);
                          $("#country").html(options);
                        }, "json");
            });
   </script>
   <script>
	    
        $(function() {
            $.post("profile/getprofileinfo", { "userId": localStorage.getItem("patientid") },
                        function(data){
                          var profileInfo = JSON.stringify(data["profile"]);
			  profileInfo = eval(" (" + profileInfo + ") ");
			    populatemProfile(profileInfo);
			
                        }, "json");
   
         });
   </script>
   <style>
        h1, h2 { font-family: Arial, sans-serif; font-size: 25px; }
        h2 { font-size: 20px; }
         
        label { font-family: Verdana, sans-serif; font-size: 12px; display: block; }
        input { padding: 3px 5px; width: 250px; margin: 0 0 10px; }
        input[type="file"] { padding-left: 0; }
        input[type="submit"] { width: auto; }
         
        #files { font-family: Verdana, sans-serif; font-size: 11px; }
        #files strong { font-size: 13px; }
        #files a { float: right; margin: 0 0 5px 10px; }
        #files ul { list-style: none; padding-left: 0; }
        #files li { width: 280px; font-size: 12px; padding: 5px 0; border-bottom: 1px solid #CCC; }
   </style>
   
   <script type="text/javascript">
	$(document).ready(function() 
    	{ 
      	  //$(".tablesorter").tablesorter(); 
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
	
	$('.dobfield').scroller({ 
                                          preset : 'date', 
                                          theme : 'android', 
                                          display : 'modal', 
                                          mode : 'scroller',
                                          dateOrder: 'yyyy-mm-dd' 
                                          });

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
			<li class="icn_settings" id="vaccnView">View Vaccination</li>
			<li class="icn_security" id="vaccnAdd">Add Vaccination</li>
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
		
		
		<article class="module width_full stats">
			<div class="profileDiv">
			      <div style="width:80%;margin:auto;">
			      <form style="width:100%;">
			      <div class="profileBox auto">
				  <span class="proflabelBox">First Name: </span><input class="fr inputBox required" type="textbox" id="fName" value=""/>
			      </div>
			      <div class="profileBox auto">
				  <span class="proflabelBox">Last Name:</span> <input class="fr inputBox required" type="textbox" id="lName" value=""/>
			      </div>
			      <div class="profileBox auto">
				  <span class="proflabelBox">Gender:</span>
				  <select class="fr inputBox required" id="gender">
				      <!--<option value=""></option>-->
				      <option value="M">Male</option>
				      <option value="F">Female</option>
				  </select>
			      </div>
			      <div class="profileBox auto">
				  <span class="proflabelBox">DOB:</span> <input class="fr inputBox required dobfield" type="textbox" id="dob"  value="" readonly/>
			      </div>
			      <div class="profileBox auto">
				  <span class="proflabelBox">E-mail: </span><input class="fr inputBox required" type="textbox" id="email" value=""/>
			      </div>
			      <div class="profileBox auto">
				  <span class="proflabelBox">Username:</span> <input class="fr inputBox required" type="textbox" id="username" value=""/>
			      </div>
			      <div class="profileBox auto">
				  <div id="changePassword" class="inputBox textCenter underline blue pointer" style="width:100%;border:none;">Click here to change password</div>
			      </div>
			      
			      <div class="profileBox auto none passBox">
				  <span class="proflabelBox">Password: </span><input class="fr inputBox required" type="password" id="password1" value=""/>
			      </div>
			      <div class="profileBox auto none passBox">
				  <span class="proflabelBox">Confirm Password:</span> <input class="fr inputBox required" type="password" id="password2" value=""/>
			      </div>
			      <div class="profileBox auto">
				  <span class="proflabelBox">Address1: </span><input class="fr inputBox required" type="textbox" id="address1" value=""/>
			      </div>
			      <div class="profileBox auto">
				  <span class="proflabelBox">Address2: </span><input class="fr inputBox" type="textbox" id="address2" value=""/>
			      </div>
			      <div class="profileBox auto">
				  <span class="proflabelBox">City: </span><input class="fr inputBox required" type="textbox" id="city" value=""/>
			      </div>
			      <div class="profileBox auto">
				  <span class="proflabelBox">State:</span> <input class="fr inputBox required" type="textbox" id="state" value=""/>
			      </div>
			      <div class="profileBox auto">
				  <span class="proflabelBox">Country: </span><select class="fr inputBox required" id="country"></select>
			      </div>
			      <div class="profileBox auto">
				  <span class="proflabelBox">Telephone:</span> <input class="fr inputBox required" type="textbox" id="telephone" value=""/>
			      </div>
			      <input class="fr inputBox required" type="hidden" id="stateid" value=""/>
			      <input class="fr inputBox required" type="hidden" id="userid" value=""/>
			      <div class="blueButton auto" style="cursor: pointer;" id="updateProfile">Update</div>
			      </form>
			</div>
			</div>
                  </article>
            </section>
</body>
</html>