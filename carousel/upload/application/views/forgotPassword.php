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
                   //alert(username);
                   $.post("<?php echo base_url()?>index.php/welcome/login", { "username": username, "password": password },
                        function(data){
                          //alert(data.username); // John
                          //JSON.stringify(data);
                          //console.log(data.time); //  2pm
                          //document.location.href = "<?php echo site_url("home"); ?>";
                          window.location.href = "<?php echo site_url('Home'); ?>";
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
                    <span class="labelBox">E-mail: </span><input class="fr inputBox" type="textbox" id="username" value="dhimtrii"/>
                </div>
                <div class="button auto" id="signIn">Send</div>
                <div class="passDiv auto" id="forgotPass">Log in</div>
                </form>
            </div>
        </div>
    </body>
</html>