<html>
    <head>
        <script type="text/javascript" charset="utf-8" src="<?php echo base_url()?>scripts/jquery-1.8.2.min.js"></script>
        <script type="text/javascript" charset="utf-8" src="<?php echo base_url()?>scripts/json2.js"></script>
	<script src="<?php echo base_url()?>scripts/mobiscroll.js" type="text/javascript"></script>
        <script type="text/javascript" charset="utf-8" src="<?php echo base_url()?>scripts/underscore-min.js"></script>
        <script type="text/javascript" charset="utf-8" src="<?php echo base_url()?>scripts/backbone-min.js"></script>
        <script src="<?php echo base_url()?>scripts/bin/jsencrypt.min.js"></script>
        <script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/function.js"></script>
	<link rel="stylesheet" href="<?php echo base_url()?>styles/mobiscroll.css" type="text/css" media="screen" />
        <link rel="stylesheet" href="<?php echo base_url()?>styles/style.css"></link>
	<script>
            $(document).ready( function() {
		$('.dobfield').scroller({ 
                                          preset : 'date', 
                                          theme : 'android', 
                                          display : 'modal', 
                                          mode : 'scroller',
                                          dateOrder: 'yyyy-mm-dd' 
                                          });
	    });
	</script>
        <script>
            $(document).ready( function() {
                   $.post("<?php echo base_url()?>index.php/registration/getcountry", {  },
                        function(data){
                          
                          data = JSON.stringify(data["country"]);
			  data = eval(" (" + data + ") ");
                          var i;
                          var options = "";
                          for(i=0;i < data.length;i++){
                            options = options + '<option value="'+data[i].code+'">'+data[i].name+'</option>';
                          }
                          //alert(options);
                          $("#country").html(options);
                        }, "json");
            });
        </script>
    </head>
    <body>
        <div style="width:100%;height:100%">
            <div class="headerLogoPortion textCenter font25 inlineBlock">
                <span> My Health Analytics</span>
            </div>
            <div class="leftBodyPortion fl">
            </div>
            <div class="rightBodyPortionRegistration fr">
                <form>
                <div class="userNameBox auto">
                    <span class="labelBox">First Name: </span><input class="fr inputBox required" type="textbox" id="fName" value="test"/>
                </div>
                <div class="passwordBox auto">
                    <span class="labelBox">Last Name:</span> <input class="fr inputBox required" type="textbox" id="lName" value="test"/>
                </div>
                <div class="passwordBox auto">
                    <span class="labelBox">Gender:</span>
                    <select class="fr inputBox required" id="gender">
                        <!--<option value=""></option>-->
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>
                <div class="passwordBox auto">
                    <span class="labelBox">DOB:</span> <input class="fr inputBox required dobfield" type="textbox" id="dob"  value="2013-050-06" readonly/>
                </div>
                <div class="userNameBox auto">
                    <span class="labelBox">E-mail: </span><input class="fr inputBox required" type="textbox" id="email" value="dhimtrii@gmail.com"/>
                </div>
                <div class="passwordBox auto">
                    <span class="labelBox">Username:</span> <input class="fr inputBox required" type="textbox" id="username" value="dhimtrii"/>
                </div>
                <div class="userNameBox auto">
                    <span class="labelBox">Password: </span><input class="fr inputBox required" type="password" id="password1" value="cloaeup"/>
                </div>
                <div class="passwordBox auto">
                    <span class="labelBox">Confirm Password:</span> <input class="fr inputBox required" type="password" id="password2" value="closeup"/>
                </div>
                <div class="userNameBox auto">
                    <span class="labelBox">City: </span><input class="fr inputBox required" type="textbox" id="city" value="pune"/>
                </div>
                <div class="passwordBox auto">
                    <span class="labelBox">State:</span> <input class="fr inputBox required" type="textbox" id="state" value="maharastra"/>
                </div>
                <div class="userNameBox auto">
                    <span class="labelBox">Country: </span><select class="fr inputBox required" id="country"></select>
                </div>
                <div class="passwordBox auto">
                    <span class="labelBox">Telephone:</span> <input class="fr inputBox required" type="password" id="telephone" value="123456"/>
                </div>
                <div class="button auto" id="register">Register</div>
                <div class="passDiv auto" id="forgotPass"><a href="">Log in</a></div>
                </form>
            </div>
        </div>
    </body>
</html>