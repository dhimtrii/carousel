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
	<script src="<?php echo base_url()?>scripts/jquery.tablesorter.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="<?php echo base_url()?>scripts/jquery.equalHeight.js"></script>
	<script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/jquery-ui-1.8.18.custom.min.js"></script>
        <script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/function.js"></script>
         <script src="<?php echo base_url()?>scripts/ajaxfileupload.js"></script>
         
         
   <script>
        $(function() {
            $('#upload_file').submit(function(e) {
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

});
    </script>

</head>
<body>
   
   <header id="header">
		<hgroup>
			<h1 class="site_title"><a href="index.html">My Health Analytics</a></h1>
			<h2 class="section_title">Upload File</h2>
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
		
		<h4 class="alert_info">Welcome John Doe</h4>
		
		<article class="module width_full stats" style="padding: 10%;">
                  <h1>Upload File</h1>
                  <form method="post" action="" id="upload_file">
                     <label for="title">Title</label>
                     <input type="text" name="title" id="title" value="" />
                
                     <label for="userfile">File</label>
                     <input type="file" name="userfile" id="userfile" size="20" />
                
                     <input type="submit" name="submit" id="submit" value="upload"/>
                  </form>
                  <h2></h2>
                  <div id="files"></div>
                  </article>
            </section>
</body>
</html>