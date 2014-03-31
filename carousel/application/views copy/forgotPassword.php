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
                    <span class="labelBox">E-mail: </span><input class="fr inputBox" type="textbox" id="email" value=""/>
                </div>
                <div class="button auto" id="forgotPass" onclick="forgotPass()">Send</div>
                <div class="passDiv auto" id="signIn"><a href="../">Log in</a></div>
                </form>
            </div>
        </div>
    </body>
</html>