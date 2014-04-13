/***************Node Code*********/
window.servicePath = "http://127.0.0.1/carousel/carousel/carousel/index.php/api/";
//window.servicePath = "http://10.1.7.142:8080/webservices/";
window.nodeURL = "http://127.0.0.1/carousel/carousel/carousel/index.php/api/";
var urlLogin = "User/login";
var urlRegister = "User/register";
var fileUploadURL = "file/push";
var updateSettingsUrl = "user/updateSettings";
var threadLists = new Array();
var pushThreadLists = new Array();
var iPhone = "iPhone";
var iPhoneSimulator = "iPhone Simulator";
var iPad = "iPad";
var iPod = "iPod touch";
var iPhone5 = "iOS";
localStorage.setItem("isLoggedClicked", 0);
var loginFailed = 0;
var storage = window.localStorage;
var serverErrorMessage = "This application requires WIFI/Cellular internet connectivity. Please connect to internet for using the application.";

var errorTitle = "Error";
var successTitle = "Success";
var warningTitle = "Warning";
var confirmationTitle = "Confirmation";

var requestHeader = "application/json";
var pubKey = "pubKey";
var patientId = "patientId";
var postMethod = "POST";
var okButton = "OK";
var statusObj = "status";
var hashObj = "#";
var collection;
var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
var shortMonthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
var managedDevices = ["iPhone", "Android","iPad", "iPod"];
var intRegex = /^\d+$/;
var logoutTimeObj = "logoutTime", isDefaultLogoutObj = "isDefaultLogout";
var lockoutTimeObj = "lockoutTime", isDefaultLockoutObj = "isDefaultLockout";
var User = "";
var msgBodyText = "";
var user = {};

var screenWidth = parseInt(screen.width);
var pin;



//var socket = io.connect(window.nodeURL);


/************Home Menu Starts Here******************/

/***
 * This function is used for transition between the two pages.
 * The parameter page path is being passed here to navigate to that particular page
 ***/
function gotoPath(path) {
    $.mobile.changePage(path, {
                        transition: "slide",
                        reverse: true
                        });
}

/***
 * This function is used for transition between the two pages from right to left side.
 * The parameter page path is being passed here to navigate to that particular page
 ***/
function gotoPathLeft(path){
    $.mobile.changePage(path, {transition: "slide", allowSamePageTransition: true,
                        reverse: true}, true, true);
}

/***
 * This function is used for transition between the two pages from left to right side.
 * The parameter page path is being passed here to navigate to that particular page
 ***/
function gotoPathRight(path){
    $.mobile.changePage(path, {transition: "slide", allowSamePageTransition: true,
                        reverse: false}, true, true);
}


/***
 * This event gets invoked when user clicks on the back button on the top right corner of all pages
 * based upon the role of the user their respective home page gets displayed
 ***/
$(".backHome").live('touchstart', function(e){
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    });
/************Home Menu Ends Here******************/



/************login/lock functionlity starts Here******************/

/***
 * This function gets invoked when user tries to login into the application
 ***/
function callLigin(){
    var username = $('#login_username').val().trim();
    var password = $('#login_password').val();
    if (username == '' || password == '') {
        $("#login_error_message").html("Please enter the username/password");
        return false;
    } else {
        showSpinner();
        setTimeout(function(){
                   $("#login_error_message").html("");
                   loginFailed = loginFailed + 1;
                   authenticateUser(username, password);
                   },100);
    }
}


/***
 * This function gets invoked to send the user enter username and password which
 * varifies the data and sends the required user information or the incorrent login error information.
 * Parameter username, password is passed in this function. All the user information are stored into the local storage.
 ***/
function authenticateUser(username, password) {
    User = Backbone.Model.extend({ urlRoot : "http://127.0.0.1/carousel/carousel/carousel/index.php/api/User/login" });
    var myUser = new User({});
    var fetchSuccess = function() {
        //If the authentication ley has "ER-020001" then login is considered as successfull login else invalid message is shown to the user
        //if (myUser.get(pubKey).indexOf("ER-020001") == -1) {
        $(".loginDiv").css("display", "block");
        $(".error").html("");
        window.userLoggedIn = true;
        storage.setItem("userId", myUser.get("user")[0].uid);
        storage.setItem("username", username);
        storage.setItem("password", password);
        storage.setItem("fName", myUser.get("user")[0].firstname);
        storage.setItem("lName", myUser.get("user")[0].lastname);
        //storage.setItem("status", myUser.get("user").status);
        
        //If the lock code is not null or empty then boolean status for locking the application is set
        if(myUser.get("user")[0].lockcode != "" || myUser.get("user").lockcode != null){
            storage.setItem("PIN", myUser.get("user")[0].lockcode);
            storage.setItem("isAppLocked", true);
        }
        storage.setItem("isAppLoggedOut", false);
        loadInitialPage();
        $("#welcomeName").html("Hi "+storage.getItem("fName"));
        LoggedInUserName = storage.getItem("fName")+" "+storage.getItem("lName");
	    /*} else {
         
         removeSpinner();
         $("#login_error_message").html("Invalid username/password");
         return false;
         }*/
        
        $("#login_submit").removeClass("linkboxActive").addClass("linkboxInactive");
    };
    
    var fetchError = function() {
        removeSpinner();
        //var errorMessages = "Please login again to the application";
        //openErrorModal(errorTitle, errorMessages);
        //$("#login_submit").removeClass("linkboxActive").addClass("linkboxInactive");
    };
    
    //var deviceTypeId = selectDeviceType();
    var username = $('#login_username').val().trim();
    var password = $('#login_password').val();
    var credentials = { "username" : username.toLowerCase(), "password" : password, "deviceToken":"aaaaaaaaa", "deviceType":"1" };
    //var credentials = { userName : username.toLowerCase(), password : password, "deviceToken":storage.getItem("deviceToken"), "deviceType":deviceTypeId };
    
    myUser.fetch({ type : postMethod, success : fetchSuccess, error : fetchError, data : JSON.stringify(credentials), contentType : requestHeader, processData : true, async : true });
}


/***
 * After the homepage for patient gets displayed this function gets invoked.
 ***/
$('#appHomePagePortrait').live('pageshow', function(event) {
        storage.setItem("isAPN", 0);
        getReadUnreadCnt();//Gets the read/unread count for user
        removeSpinner();
});


/***
 * This function gets called when user opens the applications and tries to unlock.
 * This function is called on clicking of every unlock keypad button.
 * On successfull pin validation it redirects user to login validation and wed-service.
 ***/
$('.lockKey').live('touchstart', function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    e.preventDefault();
    $(this).addClass("grayBG");
    if(value != "" && value != "CLR"){
        var value = $(this).text();
        $("#pin"+pinLockField).val(value);
        $("#pin"+pinLockField).addClass("blueBG");
        pin = pin+""+parseInt(value);
        if(pinLockField == 4){
            switch(true){
                case (parseInt(pin) == parseInt(storage.getItem("PIN"))):
                   clearContent();
                   showSpinner();
                   setTimeout(function() {
                        loadInitialPage();
                        pinLockField = 0;
                   }, 100);
                   break;
                default:
                   $(".inputWrapper").effect( "shake", { times: 2, distance: 10}, 500 );
                   pin = "";
                   pinLockField = 0;
                   $(".pin").val("");
            }
            $(".pin").removeClass("blueBG");
        }
        pinLockField = pinLockField + 1;
    }
    setTimeout(function() {
        $('.lockKey').removeClass("grayBG");
    },100);
});


/***
 * This function gets when user clicks on the clear button on the unlock keypad.
 * This resets all the pincode input fields
 ***/
$("#lockKeyClr").live('touchstart', function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    e.preventDefault();
    $(".pin").each(function(){
        $(this).val("");
        pin = "";
        pinLockField = 1;
    });
});


function loadInitialPage(){
    gotoPath("#homePage");
}


/***
 * This function gets when user clicks on the forgot password button in the login page.
 * This redirects user to the forgot password page
 ***/
$("#lockKeyClr").live('touchstart', function(e){
    gotoPath("#forgotPassPage");
});



/***
 * This function gets when user clicks on the sign up button in the login page.
 * This redirects user to the registration page
 ***/
$("#register").live('touchstart', function(e){
    gotoPath("#registrationPage");
});


/***
 * This function gets when user clicks on the sign up button in the login page.
 * This redirects user to the registration page
 ***/
$("#registration_submit").live('touchstart', function(e){
    if(isValidate == true){
        var username = $("#username").val();
        var email = $("#email").val();
        var password1 = $("#password1").val();
        var password2 = $("#password2").val();
        var mobileNo = $("#mobile").val();
        if(password1 == password2 || validateEmail == true){
            User = Backbone.Model.extend({ urlRoot : "http://10.1.7.142/myhealthanalytics/index.php/api/example/user" });
            var myUser = new User({});
            var fetchSuccess = function() {

            };
                               
            var fetchError = function() {
                removeSpinner();
                
            };
                               
            var deviceTypeId = selectDeviceType();
            //var credentials = { userName : username.toLowerCase(), password : password, "deviceToken":"aaaaaaaaa", "deviceType":deviceTypeId };
            var userJSON = { "username" : username.toLowerCase(), "password" : password2, "email": email, "mobile": mobileno };
                               
            myUser.fetch({ type : postMethod, success : fetchSuccess, error : fetchError, data : JSON.stringify(userJSON), contentType : requestHeader, processData : true, async : true });
        }
    }
});




/************Login/lock functionality Ends Here******************/

/***
 * This function gets invoked when a message is received in node server using push message.
 * This retrieves all the required information from node server and based on the current page the user is in,
 * seperate functions gets called to display the message.
 ***/
//socket.on('updatechat', function (msgDetails) {

//});


$(function() {
  
    /***
     * This function gets invoked when the user clicks on the "login" button in the mobile device.
     ***/
    $("#login_submit").live('touchstart', function(e){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        e.preventDefault();
        cnt = 0;
        callLigin();//Login function is called
                        
    });
  
  
    /***
     * This function gets invoked when the user clicks on the "GO" button in the mobile device.
     ***/
    $(".loginInput").live("keypress", function(evt){
        //For "Go" button in the mobile keypad its keycode is 13
        if (evt.keyCode === 13) {
            cnt = 0;
            evt.preventDefault();
            callLigin();//Login function is called
        }
    });
  
  
  
    /***
     * This function gets invoked when user clicks on the reset password link
     ***/
    $("#reset_password_submit").click(function(event) {
        event.preventDefault();
        $("#reset_password_message").removeClass("none").addClass("block");
        var username = $('#reset_password_username').val().trim();
        var ssn = $('#reset_password_SSN').val().trim();
        var answer = $('#reset_password_answer').val().trim();
        if (username == "" || ssn == "" || answer == "") {
            $("#reset_password_account_blocked").removeClass("block").addClass("none");
            $("#invalid_field_error").removeClass("block").addClass("none");
            $("#successfully_sent").removeClass("block").addClass("none");
            $("#mandatory_field_error").removeClass("none").addClass("block");
            return false;
        } else {
            $("#mandatory_field_error").removeClass("block").addClass("none");
            $("#invalid_field_error").removeClass("block").addClass("none");
            if (resetPasswordFailed >= 3) {
                $("#account_blocked").removeClass("none").addClass("block");
                return false;
            }
            resetPasswordFailed = resetPasswordFailed + 1;
            var userInfo = { userName : username, ssn : ssn, answer : answer, attemp_count : resetPasswordFailed };
                                    
            var myResetPassword = new ResetPassword();
                                
            var fetchSuccess = function() {
                // validating response , on successful response
                // display proper message
                if (myResetPassword.get(statusObj) == trueObj) {
                    $('#reset_password_submit').attr("disabled", true);
                    $("#successfully_sent").removeClass("none").addClass("block");
                } else if (myResetPassword.get(statusObj) == falseObj) {
                    if (resetPasswordFailed >= 3) {
                        $("#reset_password_account_blocked").removeClass("none").addClass("block");
                        return false;
                    } else {
                        $("#invalid_field_error").removeClass("none").addClass("block");
                    }
                    if (lastUsernameResetPassword == "" || lastUsernameResetPassword != username) {
                        // if user entered new username set
                        // count to 1
                        lastUsernameResetPassword = username;
                        resetPasswordFailed = 1;
                    }
                    return false;
                } else if (myResetPassword.get(statusObj) == "blocked") {
                    $("#reset_password_account_blocked").removeClass("none").addClass("block");
                }
                return false;
            };
                                    
            var fetchError = function() {
                openErrorModal(errorTitle, serverErrorMessage);
            };
                                    
            myResetPassword.fetch({ type : postMethod, success : fetchSuccess, error : fetchError, data : JSON.stringify(userInfo), contentType : requestHeader, processData : true });
        }
    });
  
    $.fn.clickable = function() {
  
        var start = function(e) {
  
        };
        this.bind("click", start);
    };
  
  
    //$(".loginDiv").css("display", "none");
    //alert(storage.getItem("isAppLoggedOut"));
    // Based upon whether user has logged out or minimized application login/unlock screen is displayed
    if(storage.getItem("isAppLoggedOut") != false && storage.getItem("isAppLoggedOut") != 'false' ){
        $(".loginDiv").css("display", "block");
        gotoPath("#appPage");
    }else{
        pinLockField = 1;
        gotoPath("#appPage");
        //gotoPath("#patient_autoLock");
    }
  
  
});



/***
 *
 *
 ***/
$(document).on("click", "#settingLink", function() {
               gotoPath("#patient_setting");
               $("#moreDiv").animate({ height : '0%' }, 200, function() {
                                     $("#moreDiv").fadeOut(300);
                                     });
               });


/***
 * This event gets invoked when user clicks on the logout button
 ***/
$(".patient_logout").live('touchstart', function(e){
                          var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                          cancelUpload();
                          storage.setItem("isLoggedClicked", 1);
                          gotoPath('#appPage');
                          });



/***
 * This event gets invoked when user applciation login page is displayed
 *
 ***/
$("#appPage").live('pageshow', function(event) {
    event.preventDefault();
    if(storage.getItem("isLoggedClicked") == 1){
        storage.setItem("unreadCnt", 0);
        userLogout();//Logout function gets called for logged out clicked
    }
});


/***
 * This function is used to call web-service to save user logout data and delete token information
 * All the local storage value is deleted on successful log-out
 ***/
function userLogout(){
    var status = Backbone.Model.extend({ urlRoot : window.servicePath + urlSendLogoutStatus });
    
    var logoutUser = new status({});
    
    $("#settingsModal").animate({ bottom : '-190px' }, 200, function() {
                                var fetchSuccess = function() {
                                setTimeout(function() {
                                           removeSpinner();
                                           clearPage();
                                           docInboxPage = 1;
                                           inboxPage = 1;
                                           $("#moreDiv").fadeOut(300);
                                           $("#configureDiv").fadeOut(300);
                                           storage.setItem("username", "");
                                           storage.getItem("password", "");
                                           window.clearTimeout(application.timeoutVar);
                                           window.clearTimeout(application.lockTimeoutVar);
                                           storage.setItem("isAppLoggedOut", true);
                                           storage.setItem("isAppLocked", false);
                                           $(".loginDiv").css("display", "block");
                                           $("#patient").removeClass("activeBlue");
                                           clearInputField();
                                           }, 100);
                                };
                                
                                var fetchError = function() {
                                openErrorModal(errorTitle, serverErrorMessage);
                                };
                                
                                var logoutJSON = {"userid":storage.getItem("userId"), "username": LoggedInUserName,"pubKey":storage.getItem(pubKey),"deviceToken":storage.getItem("deviceToken")};
                                
                                
                                logoutUser.fetch({ type : postMethod, success : fetchSuccess, error : fetchError, data : JSON.stringify(logoutJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
                                
                                });
}


/***
 * This function gets called when user clicks on update password button
 ***/
$("#change_password_submit").live('touchstart', function(e){
                                  if(e.type == "touchstart"){
                                  var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                                  }
                                  $(".inputField").blur();
                                  changeUserPassword();
                                  });


/***
 * This function gets for updating password button with all the validations and web-service call
 ***/
function changeUserPassword(){
    
    var status = Backbone.Model.extend({ urlRoot : window.servicePath + urlUpdatePassword });
    
    var myChangePassword = new status({});
    storage.setItem("isChangedpass", 0);
    var oldPassword = $('#change_password_old').val();
    var newPassword = $('#change_password_new').val();
    var reNewPassword = $('#change_password_confirm_new').val();
    if (oldPassword == "" || newPassword == "" || reNewPassword == "") {
        var messg = "Please fill all the fields";
        openErrorModal(warningTitle, messg);
        return false;
    } else if (newPassword != reNewPassword) {
        var messg = "Password mismatch";
        openErrorModal(warningTitle, messg);
        return false;
    } else {
        
        if(reNewPassword.length < 8){
            var messg = "Please enter minimum 8 characters";
            openErrorModal(warningTitle, messg);
        }else{
            
            
            var fetchSuccess = function() {
                if (myChangePassword.get(statusObj) == true) {
                    $(".inputField").val("");
                    var messg = "Password successfully changed. Please login again with new password.";
                    openErrorModal(successTitle, messg);
                    storage.setItem("isChangedpass", 1);
                    
                    
                } else {
                    var messg = "Please enter correct password";
                    openErrorModal(errorTitle, messg);
                    return false;
                }
            };
            
            var fetchError = function() {
                openErrorModal(errorTitle, serverErrorMessage);
            };
            
            var changePasswordInfo = { "username" : storage.getItem("username"), "oldPassword" : oldPassword, "newPassword" : newPassword };
            
            myChangePassword.fetch({ type : postMethod, success : fetchSuccess, error : fetchError, data : JSON.stringify(changePasswordInfo), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
        }
    }
}


/***
 * This function gets called when user clicks on change password option from optional menu
 ***/
$(".changePassword").live("touchstart", function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    e.preventDefault();
    $(".inputField").val("");
    gotoPath('#change_password');
});


/***
 * This function gets called when change password page is displayed
 ***/
$("#change_password").live('pageshow', function(event) {
    event.preventDefault();
});



$(".options").live("touchstart", function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    e.preventDefault();
    gotoPath('#optionPage');
});


$(".backToOption").live("touchstart", function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    e.preventDefault();
    gotoPath('#optionPage');
});


/***
 *
 *
 ***/
$(document).on("pageshow", "#patient_setting", function() {
    if (application.isDefaultLogout) {
        $("#defaultLogout").attr("checked", true).checkboxradio("refresh");
        $("#logoutTime").removeAttr("disabled");
        $("#logoutTime").val(application.logoutTime / 3600000);
    } else {
        $("#logoutTime").attr("disabled", true);
    }
});



$(".changePin").live("touchstart", function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    e.preventDefault();
    gotoPath('#changePinPage');
});



/***
 * This function gets called when user clicks on change pincode and confirm change pincode.
 * on change pincode submit it redirects to confirm change pincode page
 ***/
$(".setPinLock").live("touchstart", function(){
    pin = "";
    $(".setPin").each(function(){
        var pins = $(this).val();
        pin = pin+""+pins;
    });
    var pinLength = pin.length;
    if(pinLength < 4) {
        var messg = "Please enter four digit pin";
        openErrorModal(warningTitle, messg);
        pin = "";
    } else {
        if(newPinPage == 0){
            storage.setItem("newPin", pin);
            newPinPage = 1;
            gotoPath("#patient_autoLock_Setting");
            confirmPin = "";
            $(".setPin").val("");
            $("#settingsOptionBack").css("display", "block");
            $("#setPinLock").html('Save');
            $("#lockText").html("Confirm Unlock Password");
        }else{
            if(parseInt(pin) != parseInt(storage.getItem("newPin"))){
                $(".setPin").val("");
                var messg = "Please enter same pin";
                openErrorModal(warningTitle, messg);
            }else{
                var lockJSON = { "userid" : storage.getItem("userId"), "lockcode" : pin};
                
                var pinLockModel = new pinLock.PinLock({});
            
                pinLockSuccess = function() {
                    lockDetails = JSON.stringify(pinLockModel.get("status"));
                    storage.setItem("PIN", pin);
                    storage.setItem("isAppLocked", true);
                    storage.setItem("newPin", "");
                    $(".setPin").val("");
                    newPinPage = 0;
                    var messg = "Lock has been set.";
                    openErrorModal(successTitle, messg);
                    conditionalFirstPage();
                };
                      
                pinLockError = function() {
                    openErrorModal(errorTitle, serverErrorMessage);
                };
                      
                pinLockModel.fetch({ type : postMethod, success : pinLockSuccess, error : pinLockError, data : JSON.stringify(lockJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
                      
            }
        }
    }
});


/***
 * This function gets called when user clicks on change pincode option from optional menu
 ***/
$(".patient_lock_Setting").live("tap", function(){
    newPinPage = 0;
    setTimeout(function() {
        gotoPath("#patient_autoLock_Setting");
        cancelUpload();
        pin = "";
        $(".setPin").val("");
        $("#setPinLock").html('Confirm');
        $("#lockText").html("Set Unlock Password");
        $("#settingsBack").css("display", "none");
        $(".footer").css("display", "block");
        $(".communicationFooterDiv").css("display", "block");
    }, 400);
                            
});


/***
 * This function gets called when change pincode page is displayed
 ***/
$(document).on("pageshow", "#patient_autoLock", function() {
    pin = "";
    $("#errorPassword").html("");
    $("#applicationPassword").val("");
    removeSpinner();
});




/*************************Back Button Functions Starts Here*******************/
/***
 *
 *
 ***/
$("#settingsOptionBack").live("click", function() {
    newPinPage = 0;
    gotoPath("#patient_autoLock_Setting");
    pin = "";
    $(".setPin").val("");
    $("#setPinLock").html('Confirm');
    $("#lockText").html("Set Unlock Password");
    $("#settingsOptionBack").css("display", "none");
});


/***
 *
 *
 ***/
$("#settingsBack").live("click", function() {
    gotoPath("#patient_option");
});



/*************************Back Button Functions Ends Here*******************/




/***
 *
 *
 ***/
function closeModal(){
    removeMask();
    $('#infoModal').css("display", "none");
    $('#infoModal').find(":jqmData(role='content')").html("");
}


/***
 * This function is used to get the device id based upon the device platform
 ***/
function selectDeviceType(){
    var deviceTypeId;
    if(device.platform == "iOS"){
        deviceTypeId = 1;
    }else{
        deviceTypeId = managedDevices.indexOf(device.platform) + 1;
        
    }
    return deviceTypeId;
}


/***
 * This function is used to display all the warnings, error and success messages in a modal popup window.
 ***/
function openErrorModal(title, detail){
    showMask();
    $("#errorAlert").html(title);
    $("#errorAlertDetail").html(detail);
    $("#errorModal").css("display", "block");
    $(".composeBody").blur();
    $(".totextField").blur();
    isEmptyMsg = 1;
}


/***
 * This function is used when user clicks on the close button in the confirmation modal box
 *
 ***/
$(".closeErrorModal").live('touchstart', function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    removeMask();
    $("#errorModal").css("display", "none");
    $("#errorAlert").html("");
    $("#errorAlertDetail").html("");
                           
    if(storage.getItem("isChangedpass") == 1){
        setTimeout(function() {
            storage.setItem("unreadCnt", 0);
            gotoPath('#appPage');
            userLogout();
            storage.setItem("isChangedpass", 0);
        },50);
    }
                           
    closeContSubPopup();
    $("#toField").val("");
    isRecipientFieldFocus =  0;
});


/***
 * This function is used to display all the Confirmation messages in a modal popup window.
 ***/
function openConfirmationAlert(title, detail){
    showMask();
    $("#confirmAlert").html(title);
    $("#confirmAlertDetail").html(detail);
    $("#confirmModal").css("display", "block");
    setTimeout( function() {
        $(".inputField").not("#forField").attr("disabled", true);
        $("#mailSubject").blur();
    }, 100 );
}






/***
 * This function is used to close the confirmation modal
 ***/
function closeConfirmationModal(){
    $("#confirmAlert").html("");
    $("#confirmAlertDetail").html("");
    $("#confirmModal").css("display", "none");
    $("#forField").val("");
    removeMask();
}


/***
 * This function is invoked when user clicks on the settings option from option page
 **/
$(".patient_general_Setting").live("tap", function(e){
        $(".page, .headerDiv, .subHeaderComm, .contentDiv").animate({left: "0px"}, "fast");
        cancelUpload();
        gotoPath('#general_settings');
});

/***
 * This function gets invoked when user navigates to the general settings page
 ***/
$('#general_settings').live('pageshow', function(event) {
                            $('#offlineStatus').val('no').slider('refresh');
                            if(storage.getItem("isOOF") == "true"){
                            $('#offlineStatus').val('yes').slider('refresh');
                            $('#oofTime').val(getInputTimeFormat(storage.getItem("oofTime")));
                            $(".offlineStatusDiv").animate({ height : '50px' }, 200, function() {
                                                           });
                            }
                            var now = new Date();
                            $('.dateTimePicker').scroller({
                                                          preset : 'datetime',
                                                          theme : 'ios',
                                                          display : 'modal',
                                                          minDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()),
                                                          mode : 'scroller'
                                                          });
                            
                            $('.timePicker').scroller({
                                                      preset : 'time',
                                                      theme : 'ios',
                                                      display : 'modal',
                                                      minDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()),
                                                      mode : 'scroller'
                                                      });
                            });


/***
 * This function is used to call the web-service to retrieve
 * the unread count of the messages for the current logged in user.
 * Logged in user id and is passed to the web-service.
 * The count is updated if it is more than zero to all the respective section
 ***/
$(".updateUserSettings").live("touchstart", function(e){
                              var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                              var isOOFStatus = false;
                              var oofTime = "";
                              var isValidatedOOF = true;
                              var updateSettingsModel = new settings.updateSettings({});
                              updateSettingsSuccess = function() {
                              updateSettingsInfo = updateSettingsModel.get("status");
                              storage.setItem("isOOF", isOOFStatus);
                              storage.setItem("oofTime", oofTime);
                              var successSettingdMsg = "Out of office status has not been set";
                              if(isOOFStatus == "true" || isOOFStatus == true){
                              successSettingdMsg = "Out of office status has been set";
                              }else{
                              
                              }
                              openErrorModal(successTitle, successSettingdMsg);
                              };
                              
                              updateSettingsError = function() {
                              //openErrorModal(errorTitle, serverErrorMessage);
                              };
                              var isOOF = $("#offlineStatus").val();
                              if(isOOF == "yes"){
                              isOOFStatus = true;
                              oofTime = $("#oofTime").val();
                              if(oofTime != "" && oofTime != null){
                              oofTime = new Date(oofTime);
                              oofTime = getSaveTimeFormat(oofTime);
                              }else{
                              isValidatedOOF = false;
                              var errorSettingdMsg = "Please enter proper time";
                              openErrorModal(errorTitle, errorSettingdMsg);
                              //$('.slider').val('no').slider('refresh');
                              
                              }
                              }
                              if(isValidatedOOF == true){
                              var updateSettingsJSON = { "userid":storage.getItem("userId"), "isoof":isOOFStatus ,"ooftime":oofTime };
                              
                              updateSettingsModel.fetch({ type : postMethod, success : updateSettingsSuccess, error : updateSettingsError, data : JSON.stringify(updateSettingsJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
                              }
                              
                              
                              
                              
                              
                              });


/***
 * This function is used to reset the settings slider in the settings page.
 * Also based on the "Yes"/"No" value input date field is displayeds
 **/
$(".resetUserSettings").live("touchstart", function(e){
                             var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                             $('.slider').val('no').slider('refresh');
                             $(".switchStatusDiv").animate({ height : '0px' }, 200, function() {
                                                           $(".switchStatusDiv").children().val("");
                                                           });
                             });


/***
 * This function is invoked when user slides the slider in the settings page.
 * based on the "Yes"/"No" value input date field is displayed
 **/
$('.slider').live('change', function(){
                  var sliderId = $(this).attr("id");
                  var sliderval = $(this).val();
                  if(sliderval == "yes"){
                  $("."+sliderId+"Div").animate({ height : '50px' }, 200, function() {
                                                });
                  }else{
                  $("."+sliderId+"Div").animate({ height : '0px' }, 200, function() {
                                                $("."+sliderId+"Div").children().val("");
                                                });
                  }
                  });




$(".rightSlideMenu").live("tap", function(){
    if($(".page").css("left") == "0px"){
        $(".slidePanel").css("z-index", 8);
        $(".rightSlidePanel").css("z-index", 9);
        $(this).removeClass("whiteBG").addClass("redBG");
        $(this).children().removeClass("blackText").addClass("whiteText");
        $(".page, .headerDiv").animate({left: "-251.5px"}, "fast");
    }else{
        $(this).removeClass("redBG").addClass("whiteBG");
        $(this).children().removeClass("whiteText").addClass("blackText");
        $(".page, .headerDiv").animate({left: "0px"}, "fast");
    }
                          
});



/*$(".leftSlideMenu").live("tap", function(){
    if($(".page").css("left") == "0px"){
        $(".slidePanel").css("z-index", 8);
        $(".leftSlidePanel").css("z-index", 9);
        $(this).removeClass("whiteBG").addClass("redBG");
        $(this).children().removeClass("blackText").addClass("whiteText");
        $(".page, .headerDiv").animate({left: "250.5px"}, "fast");
    }else{
        $(this).removeClass("redBG").addClass("whiteBG");
        $(this).children().removeClass("whiteText").addClass("blackText");
        $(".page, .headerDiv").animate({left: "0px"}, "fast");
    }
                         
});*/

