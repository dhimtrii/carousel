<html>
    <head>
        <script type="text/javascript" charset="utf-8" src="<?php echo base_url()?>scripts/jquery-1.8.2.min.js"></script>
        <script type="text/javascript" charset="utf-8" src="<?php echo base_url()?>scripts/json2.js"></script>
        <script type="text/javascript" charset="utf-8" src="<?php echo base_url()?>scripts/underscore-min.js"></script>
        <script type="text/javascript" charset="utf-8" src="<?php echo base_url()?>scripts/backbone-min.js"></script>
        <script type="text/javascript" charset="utf-8"src="<?php echo base_url()?>scripts/function.js"></script>
        <link rel="stylesheet" href="<?php echo base_url()?>styles/style.css"></link>
        <script>
            $(document).ready( function() {
               $('#signIn').click( function(e) {
                   e.preventDefault();
                   var username = $("#username").val();
                   var password = $("#password").val();
                    
                   $.post("<?php echo base_url()?>index.php/welcome/login", { "username": username, "password": password },
                        function(data){
                          //if(data[0])
                          if(data.username != false){
                            window.location.href = "<?php echo site_url('home'); ?>";
                          }else{
                            alert("Please enter valid username/password");
                          }
                        }, "json");
                });
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
            <div class="rightBodyPortion fr">
                <form>
                <div class="userNameBox auto">
                    <span class="labelBox">UserName: </span><input class="fr inputBox" type="textbox" id="username" value="andrews"/>
                </div>
                <div class="passwordBox auto">
                    <span class="labelBox">Password:</span> <input class="fr inputBox" type="password" id="password" value="password"/>
                </div>
                                <input type="hidden" value="<?php echo $this->session->userdata('privKey'); ?>"/>

                <div class="button auto" id="signIn">Sign In</div>
                <div class="signUpDiv auto" id="signUp">Not Signed up yet <span style="color:blue;"> <a href="index.php/registration"> Sign up</a></span></div>
                <div class="passDiv auto" id="forgotPass"><a href="index.php/forgotpassword">Forgot Password</a></div>
                </form>
            </div>
        </div>
    </body>
</html>