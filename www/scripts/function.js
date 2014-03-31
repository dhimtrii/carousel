/***************Node Code*********/
window.servicePath = "http://10.1.7.142/demoProject/index.php/api/";
    //window.servicePath = "http://10.1.7.142:8080/webservices/";
window.nodeURL = "http://10.1.7.139:9090/";
var urlLogin = "User/login";
var urlRegister = "User/register";

var fileUploadURL = "file/push";
var updateSettingsUrl = "user/updateSettings";
var msgThreadValue = "";
var patientName = "";
var threadLists = new Array();
var pushThreadLists = new Array();
var shortNameRecipient = new Array();
var iPhone = "iPhone";
var iPhoneSimulator = "iPhone Simulator";
var iPad = "iPad";
var iPod = "iPod touch";
var iPhone5 = "iOS";
var timeArr = new Array();
var divId = 0;
var contactListCnt = 0;
var subjectCnt = 0;
var isEmptyMsg = 0;
localStorage.setItem("isLoggedClicked", 0);
var isAttachment = 0;
var className = "";
var pageCount = 0;
var msgReadTime;
var autoMsgCnt = 0;
var isAutoMsg = 0;
var sendMsgBody = "";
var isNewCompose = 0;
var isValidCommunication = 0;
var LoggedInUserName = "";
var isOldPatient = 0;
var shortNameList = "";
var isUserTobedeleted = 0;
var zoomScale = 0;


var loginFailed = 0;
var lastUsername = "";
var resetPasswordFailed = 0;
var lastUsernameResetPassword = "";
var storage = window.localStorage;
var serverErrorMessage = "This application requires WIFI/Cellular internet connectivity. Please connect to internet for using the application.";

var errorTitle = "Error";
var successTitle = "Success";
var warningTitle = "Warning";
var confirmationTitle = "Confirmation";



var deleteComm = "Are you sure you want to archive the message?";

var selectedDate = new Date();
var currentDate = new Date();
var commcontactDetailsList = "";
var patientList = "";
var inboxDetailsList = "";
var requestHeader = "application/json";
var pubKey = "pubKey";
var patientId = "patientId";
var postMethod = "POST";
var okButton = "OK";
var statusObj = "status";
var hashObj = "#";
var isMondayObj = "isMonday", isTuesdayObj = "isTuesday", isWednesdayObj = "isWednesday", isThursdayObj = "isThursday", isFridayObj = "isFriday", isSaturdayObj = "isSaturday", isSundayObj = "isSunday";
var falseObj = "false", trueObj = "true";
var mornConfTime = "morningConfigureTime", noonConfTime = "noonConfigureTime", evenConfigTime = "eveningConfigureTime";
var cnt = 0;
var dates;
var content = '';
var toIds = new Array();
var toNames = new Array();
var senderPatientArray = new Array();
var inboxArray = new Array();
var messagesArray = new Array();
var dayName;
var collection;
var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
var shortMonthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
var managedDevices = ["iPhone", "Android","iPad", "iPod"];
var intRegex = /^\d+$/;
var logoutTimeObj = "logoutTime", isDefaultLogoutObj = "isDefaultLogout";
var lockoutTimeObj = "lockoutTime", isDefaultLockoutObj = "isDefaultLockout";
var User = "";
var Lock = "";
var backPath;
var cmID;
var nameList;
var commCollection;
var detailPage;
var inboxPage;
var contentBefore = '';
var contentAfter = '';
var contentAtTime = '';
var checkTime;
var inboxCollections;
var crdateCnt;
var confirmPin;
var newPinPage;
var subjectVal = "";
var openCnt = 1;
var oldMedHour;
var prevMedCnt;
var currMedCnt;
var nextMedCnt;
var maxPrevCharacter;
var maxNextCharacter;
var nowCurrDate;
var contVital = "";
var options = "";
var imageURl = "";
var imageName = "";
var threadId = "";
var isForward;
var isAddRecipient;
var isZoomed;
var options;
var orig = 0;
var imageWidth = 0;
var imageHeight = 0;
var imgTempWidth = 0;
var imgTempHeight = 0;
var title = "";
var detail = "";
var sendPhoto = 0;
var pinLockField = 1;
var msgBodyText = "";
var focussed = 0;
var isTobeMinimized = 0;
var isRecipientFieldFocus = 0;
var isDetailedCommunication = 0;
var isMinimized = 0;
var myDate;
var morning;
var noon;
var evening;
var currTime;
var expand;
var specialityId;
var specCollection;
var calCheck;
var msgBodyText = "";
var medCnt;
var application = {};
var medication = {};
var vitals = {};
var commsubject = {};
var commcontacts = {};
var communication = {};
var inbox = {};
var pinLock = {};
var userInfoDet = {};
var settings = {};

var screenWidth = parseInt(screen.width);



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
 * This event gets invoked when patient selects navigation menu from his application's home page
 *
 ***/
$(".menu").live('touchstart', function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    $(".menu").removeClass("menuActive").addClass("menuInactive");
    $(this).removeClass("menuInactive").addClass("menuActive");
});


/***
 * This event gets invoked when user clicks on the back button on the top right corner of all pages
 * based upon the role of the user their respective home page gets displayed
 ***/
$(".backHome").live('touchstart', function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
});
/************Home Menu Ends Here******************/



/***
 * This function is used to call the web-service to retrieve
 * the unread count of the messages for the current logged in user.
 * Logged in user id and is passed to the web-service.
 * The count is updated if it is more than zero to all the respective section
 ***/
function getReadUnreadCnt() {
	
    var readUnreadCntModel = new communication.readUnreadCnt({});
    readUnreadCntSuccess = function() {
        
    	readUnreadCntList = JSON.stringify(readUnreadCntModel.get("readCount"));
        storage.setItem("readCnt", readUnreadCntList);
        unReadUnreadCntList = JSON.stringify(readUnreadCntModel.get("unreadCount"));
        storage.setItem("unreadCnt", unReadUnreadCntList);
        if(parseInt(storage.getItem("unreadCnt")) > 0){
            unreadCnt = '('+storage.getItem("unreadCnt")+')';
            $("#msgesCnt").html(unreadCnt);
            $(".rightAlertIcon").css("display", "block");
            $("#notificationsChat").html(storage.getItem("unreadCnt"));
        }else{
            $(".rightAlertIcon").css("display", "none");
        }
    };
    
    readUnreadCntError = function() {
	    //openErrorModal(errorTitle, serverErrorMessage);
    };
    
    var readUnreadCntJSON = { "userid":storage.getItem("userId"), "pubKey" : storage.getItem(pubKey) };
    
    readUnreadCntModel.fetch({ type : postMethod, success : readUnreadCntSuccess, error : readUnreadCntError, data : JSON.stringify(readUnreadCntJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}



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
    User = Backbone.Model.extend({ urlRoot : "http://192.168.2.1/demoProject/index.php/api/User/login" });
    var myUser = new User({});
    var fetchSuccess = function() {
        //If the authentication ley has "ER-020001" then login is considered as successfull login else invalid message is shown to the user
        //if (myUser.get(pubKey).indexOf("ER-020001") == -1) {
            $(".loginDiv").css("display", "block");
            $(".error").html("");
            window.userLoggedIn = true;
            storage.setItem("userId", myUser.get("user").uid);
            storage.setItem("username", username);
            storage.setItem("password", password);
            storage.setItem("fName", myUser.get("user").firstname);
            storage.setItem("lName", myUser.get("user").lastname);
            //storage.setItem("status", myUser.get("user").status);
            
            //If the lock code is not null or empty then boolean status for locking the application is set
            if(myUser.get("lockcode") != "" || myUser.get("lockcode") != null){
                storage.setItem("PIN", myUser.get("lockcode"));
                storage.setItem("isAppLocked", true);
            }
            loadInitialPage();
            $("#welcomeName").html("Hi "+storage.getItem("fName"));
            
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
                //var errorMessages = "Please login again to the application";
                //openErrorModal(errorTitle, errorMessages);
                //$("#login_submit").removeClass("linkboxActive").addClass("linkboxInactive");
            };
                               
            var deviceTypeId = selectDeviceType();
            //var credentials = { userName : username.toLowerCase(), password : password, "deviceToken":"aaaaaaaaa", "deviceType":deviceTypeId };
            var userJSON = { "username" : username.toLowerCase(), "password" : password2, "email": email, "mobile": mobileno };
                               
            myUser.fetch({ type : postMethod, success : fetchSuccess, error : fetchError, data : JSON.stringify(userJSON), contentType : requestHeader, processData : true, async : true });
        }
    }
});


/***
 * This function is used to validate required fields throught the application.
 * Input parameter type is passed and returns succes .
 ***/
function validateField(type){
    var isValidate = true;
    $(this).removeClass("required");
    $("."+type+"Required").each(function(){
        if($(this).val().trim() == ""){
            $(this).addClass("required");
            isValidate = false;
        }
    });
    return isValidate;
}


function validateEmail(email){
    var isEmailValidate = true;
    
    return isEmailValidate;
}

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
  * This function gets invoked when user is in detail message page and he swipes the page on left and right side.
  * If user swipes in right side next message is displayed and vice-versa
  ***/
  $("#contentPatientCommunicationContinue").swipe( {
        //Generic swipe handler for left directions
        swipeLeft:function(event, direction, distance, duration, fingerCount) {
            nextMessage();
        },
        //Generic swipe handler for right directions
        swipeRight:function(event, direction, distance, duration, fingerCount) {
            prevMessage();
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        scrollSupressionThreshold: 250, // More than this horizontal displacement, and we will suppress scrolling.
        durationThreshold: 1500, // More time than this, and it isn't a swipe.
        horizontalDistanceThreshold: 30,  // Swipe horizontal displacement must be more than this.
        verticalDistanceThreshold: 45,
  });
  
  /***
  * This function gets invoked when the user clicks on the "login" button in the mobile device.
  ***/
  $("#login_submit").live('touchstart', function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    cnt = 0;
    e.preventDefault();
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
  
  
  /***************Communication Backbone Starts Here******************/
  
  communication.updateUnreadStatus = Backbone.Model.extend({ urlRoot : window.servicePath + updateUnreadStatusURL });
  
  communication.Image = Backbone.Model.extend({ urlRoot : window.servicePath + getImageData });
  
  communication.getPatientList = Backbone.Model.extend({ urlRoot : window.servicePath + urlPatientList });
  
  
  communication.prescDet = Backbone.Model.extend({ urlRoot : window.servicePath + urlDetalPrescription });
  
  communication.labsDet = Backbone.Model.extend({ urlRoot : window.servicePath + urlDetalLab });
  
  communication.LabsList = Backbone.Collection.extend({ model : communication.labsDet });
  
  communication.PrescList = Backbone.Collection.extend({ model : communication.prescDet });
  
  communication.readUnreadCnt = Backbone.Model.extend({ urlRoot : window.nodeURL + urlReadUnreadCnt });
  
  communication.readUnreadCntForUser = Backbone.Model.extend({ urlRoot : window.nodeURL + urlReadUnreadCntForUser });
  
 
  communication.DeleteCommunication = Backbone.Model.extend({ urlRoot : window.nodeURL + urlDeleteComm });
  
  
  communication.ForwardCommunication = Backbone.Model.extend({ urlRoot : window.nodeURL + urlForwardComm });
  
  commcontacts.CommcontactMod = Backbone.Model.extend({
                                                      urlRoot : window.servicePath + urlCommContactList 
                                                      });
  
  commcontacts.allCommcontactMod = Backbone.Model.extend({
                                                         urlRoot : window.servicePath + urlAllCommContactList 
                                                         });
  
  commcontacts.CommContactList = Backbone.Collection.extend({ model : commcontacts.CommContact });
  
  
  /***
  * This is backbone view for displaying the list of physician and care manager based upon patient or physician login
  ***/
  commcontacts.CommContactListView = Backbone.View.extend({ initialize : function() {
        commCollection = new medication.MedicationList(this.options.commcontactCollectionModel);
        this.collection = commCollection;
        this.render();
    },
                                                          
    render : function() {
        contactListCnt = 0;
        $("#recipientListDiv").css("display","block");
        var self = this;
        _(this.collection.models).each(function(item) { // in case
            self.appendItem(item);
        }, this);
        $(".findDoc").css("display", "block");
        if(contactListCnt == 0){
            $("#recipientListDiv").append("<div class='widthAuto textCenter font12'>There are no contact with this name. Please specify some other name.</div>")
        }
                                                          
    },
                                                        
    appendItem : function(item) {
        this.model = item;
        var commcontactList = item.get("username");
        var userType = item.get("userType");
        if(userType == "PCT" || userType == "SCT"){
            userType = "T";
        }
        var isooF = item.get("isoof");
        var oofTime = item.get("ooftime");
        if(oofTime != "" && oofTime != null){
            oofTime = getOOFTimeFormat(oofTime);
        }
        var oofHTML = "";
        if(isooF == true){
            oofHTML = oofHTML + "<div class='font10 wid100'>(out till "+oofTime+")</div>";
        }
        var commcontactId = item.get("id");
        var isToBeDisplayed = 0;
        //List gets sorted once user types in with matching text
        if (commcontactList.toLowerCase().indexOf(nameList.toLowerCase()) >= 0) {
            commcontactId = parseInt(commcontactId);
            var CMId = storage.getItem("CMId");
            //For patient login all the caremanger and physician associated with logged in patient except default Care manger gets displayed initially and for physician login all the care manger and doctor except logged in user gets displayed except current logged in user all gets displayed.
            if((toIds.indexOf(commcontactId) < 0 && (commcontactId != CMId) && commcontactId != storage.getItem("userId"))){
                $("#recipientListDiv").append("<div class='contListPat inlineBlock fl toListAdd width100' id='" + commcontactId + "_"+commcontactList+"' style='border-bottom:1px solid #ccc;color:#777;'>"+
                    "<div class='fl toLinkType whiteText widthAuto blackBG font12' style='margin-right:10px !important;'>"+ userType+"</div>"+
                    "<div style='margin-left:10px !important;' class='nameSpanBox inlineBlock wordWrap'> " + commcontactList +" </div>"+
                    oofHTML+"</div>");
                contactListCnt = contactListCnt + 1;
            }
                                                          
        }
    },
  });
  
  
  
  /***
   * This is backbone view for displaying the patient list in a drop down
   * Except the generic patient all the active patient name with their information gets displayed
   ***/
  var patientLists = "";
  communication.patientListView = Backbone.View.extend({ initialize : function() {
        commCollection = new medication.MedicationList(this.options.patientCollectionModel);
        this.collection = commCollection;
        this.render();
    },
                                                          
    render : function() {
        contactListCnt = 0;
        $("#patientListDiv").css("display","block");
        var self = this;
        patientLists = "";
        _(this.collection.models).each(function(item) { // in case
            self.appendItem(item);
        }, this);
        if(contactListCnt == 0){
            $(".contentBlock").html("");
            $(".findPat").css("display", "none");
        }else{
            $(".contentBlock").html("");
            $(".findPat").css("display", "block");
            $("#patientListDiv").html(patientLists);
        }                                                  
    },
                                                          
    appendItem : function(item) {
        this.model = item;
        var userid = item.get("userid");
        var fName = item.get("firstname");
        var lName = item.get("lastname");
        var patListName = fName+" "+lName;
        var hospital = item.get("name");
        var disease = item.get("chiefcomplaint");
        var roleName = item.get("rolename");
        var dob = "";
        if(roleName.toLowerCase().indexOf("patient") == 0){
            dob = item.get("dateofbirth");
        }
        var age = getYears(dob);
        //All the patient name except "Generic Patient" gets displayed initially and name gets sorted once user types in with matching text
        if(patListName != "Generic Patient" && patListName.toLowerCase().indexOf(patientName.toLowerCase()) >= 0) {
            patientLists = patientLists + "<div class='contListPat inlineBlock fl forListAdd width100' id='" + userid + "_"+patListName+"' style='border-bottom:1px solid #ccc;color:#777;'> <div class='toLinkPat decorationNone inlineBlock normal fl font15 width100 bold'>" + patListName +"</div><div class='toLinkPat decorationNone inlineBlock normal fl font13 width100'>" + age + "yrs, "+disease+"</a></div></div>";
            contactListCnt = contactListCnt + 1;
        }
    },
  });
  
  
  
  commsubject.commSubject = Backbone.Model.extend({ urlRoot : window.servicePath + urlCommSubject });
  
  commsubject.commSubjectsList = Backbone.Collection.extend({ model : commsubject.commSubject });
  
  
  /***
  * This is backbone view for displaying all the existing subjects in a autopopulated list based upon the matching text user has entered
  ***/
  commsubject.commSubjectsListView = Backbone.View.extend({ initialize : function() {
        specCollection = new commsubject.commSubjectsList(this.options.subCollectionModel);
                                                          
        this.collection = specCollection;
        this.render();
    },
                                                          
    render : function() {
        subjectCnt = 0;
        var self = this;
        _(this.collection.models).each(function(item) { // in case
            self.appendItem(item);
        }, this);
        if(subjectCnt == 0){
            $(".findSub").css("display", "none");
        }
    },
                                                          
    appendItem : function(item) {
        this.model = item;
        var specNameList = item.get("name");
        var specId = item.get("id");
        //Subject text maching with the input text gets displayed in the subject list while the user types for the subject while creating new communication
        if (specNameList.toLowerCase().indexOf(subjectVal.toLowerCase()) >= 0) {
            $(".findSub").css("display", "block");
            $(".findSub").css("max-height", "200px");
            $("#findSub").append("<p id='" + specId + "' class='subLine widthAuto grayBottomBorder' style='color:#777 important;'>" + specNameList + "</p>");
            subjectCnt = subjectCnt + 1;
        }
                                                          
                                                        
    }, 
 });
  
  commsubject.commposeMail = Backbone.Model.extend({ urlRoot : window.nodeURL + urlComposeMail });
  
  commsubject.forwardMail = Backbone.Model.extend({ urlRoot : window.nodeURL + urlForwardMail });
  
  
  communication.docInboxMsg = Backbone.Model.extend({ urlRoot : window.nodeURL + urlgetDocMail });
  
  communication.docInboxMsgList = Backbone.Collection.extend({ model : communication.docInboxMsg });
  
  
  /***
   * This is backbone view for displaying the dashboard for physician based upon patient or sender
   * In the sender tab all the sender name is displayed and in patient tab all the patient to/for whom the thread is being created
   ***/
  communication.doInboxMsgListView = Backbone.View
  .extend({ el : $("#contentDoctorCommunication"), // attaches `this.el` to an existing
          // element.
     initialize : function() {
        reviewsCollection = new communication.docInboxMsgList(this.options.docInboxCollection);
        msgBodyText = "";
        inboxCollections = reviewsCollection;
        this.collection = reviewsCollection;
        this.render();
    },
          
    render : function() {
        var self = this;
        var readUnreadCnt = "";
        senderPatientArray = new Array();
        _(this.collection.models).each(function(item) { // for each model in a collection
            self.appendItem(item);
        }, this);
        $("#contentDoctorCommunication").html(msgBodyText);
        removeSpinner();
    },
          
    appendItem : function(item) {
        this.model = item;
        var patientid = item.get("userid");
        var patientname = item.get("username");
        var userroleid = item.get("userroleid");
        var patShortName = getDisplayName(patientname);
        var messagecount = item.get("messagecount");
        var isnewMsg = item.get("isnewmessage");
        var fontClass = "normal";
        //Name of the user with new message should be shown in bold font and rest in normal font
        if(isnewMsg == true){
            fontClass = "bold";
        }
        senderPatientArray.push(patientid);
          
        msgBodyText = msgBodyText+'<div class=" width100 threadCntList fl heightAuto inlineBlock font12 blackText shadowNone" data-pancakes="'+patientid+'_'+patientname+'" id="'+patientid+'_'+patientname+'">'+
          '<div class="height100 fl sidePane">'+
          '<div class="width100 fl imagePane"><img src="../../images/communication.svg" class="msgImage" /></div>'+
          '</div>'+
          '<div class="height100 fl contPane">'+
          '<div class="width100 fl namePane">'+
          '<span class="fl nameSpan font18 '+fontClass+'" style="margin-top:3px;" id="'+patientid+'">'+patientname+'</span>'+
          '<input type="hidden" id="urole_'+patientid+'" value="'+userroleid+'" />'+
          '</div>'+
          '</div>'+
          '</div>';
          
          
    }
          
 });
  

  inbox.InboxDetail = Backbone.Model.extend({ urlRoot : window.nodeURL + urlDetalMail });
  
  
  inbox.detailMsgList = Backbone.Collection.extend({ model : inbox.InboxDetail });
  
  
  /***
   * This is backbone view for displaying the message page for a particular thread
   * The recipient name is displayed in short name format with distinction of user with status "Out of office"
   * Also based upon the context user and resolution different view is displayed
   ***/
  inbox.InboxDetailListView = Backbone.View
  .extend({ el : $("#contentPatientCommunicationCompose"), // attaches `this.el` to an existing
    // element.
    initialize : function() {
        inbox.reviewsCollection = new inbox.detailMsgList(this.options.inboxCollection);
        msgBodyText = "";
        inboxCollections = inbox.reviewsCollection;
        this.collection = inbox.reviewsCollection;
        this.render();
    },
          
    render : function() {
        var self = this;
        var ind;
        crdateCnt = 0;
        $("#nameContentComm").html(LoggedInUserName);
        if(storage.getItem("roleid") == 5 && storage.getItem("patName") != ""){
            $("#nameContentComm").html(storage.getItem("patName"));
        }
        _(this.collection.models).each(function(item) { 
                self.appendItem(item);
        }, this);
        $("#bottomOfDiv").remove();
        $("#msgNewBody").html(msgBodyText);
        removeSpinner();
        setTimeout(function() {
            setCommunicationBodyHeight();
            scrollToLast("msgNewBody");
            isDetailedCommunication = 1;
        }, 300);
          
        $("#contentPatientCommunicationContinue").niceScroll({cursorcolor:"#FFF"});
    },
          
    appendItem : function(item) {
        this.model = item;
        var msgId = item.get('id');
        var msgTo = item.get('msgto');
        var isFwd = item.get('isFwd');
        var msgFrom = item.get('msgfrom');
        var senderId = msgFrom.substr(0,msgFrom.indexOf("#"));
        var senderName = msgFrom.substr((msgFrom.indexOf("#") + 1));
        var displayName = getDisplayInitialName(senderName);
        displayName = displayName.toUpperCase();
        var msgBody = item.get('msgbody');
        var sentTime = item.get('senton');
        var readTime = item.get('readon');
        var isFWD = item.get('isFwd');
        var attachment = item.get('attachment');
        var msgfrom = item.get("msgfrom");
        var isSenderOOF = item.get('isoof');
        var msgfromId = msgfrom.substr(0, msgfrom.indexOf("#"));
        msgfrom = msgfrom.substr(msgfrom.indexOf("#") + 1);
        var imageLinkName = getDisplayName(msgfrom);
        var conversationListId = item.get("conversationListId");
        storage.setItem("conversationListId", conversationListId);
        //only once the execution to be made to get the thread information
        if(crdateCnt == 0){
            shortNameRecipient = new Array();
            var msgto = item.get("messageJSON");
            var shortName = getRecepientNameId(msgto, "", msgfrom, msgfromId, 0, 0);
            var thread = item.get("communicationThread");
            var forID = item.get("contextUserId");
            var forName = item.get("contextUsername");
            var conversationdetails = item.get("conversationdetails");
            var oofTime = "";
            $("#forFieldBlock").html(forName);
            $("#forContinueId").val(forID);
            _.each(conversationdetails, function(val, i) {
                 var recipientId = conversationdetails[i].recipient.id;
                 var isOOF = conversationdetails[i].recipient.isOOF;
                 if(parseInt(recipientId) == parseInt(storage.getItem("userId"))){
                   recipientId = senderId;
                   isOOF = isSenderOOF;
                 }
                 displayRecipient(recipientId, isOOF);
            });
            shortNameList = getShortName(shortNameRecipient.join(","));
            var toList = '<div class="selectedList font14 fl" style="float:left;">'+shortNameList+'</div> ';
            $("#toListBlock").html(toList);
            //Display/hide the context user block if context user is not null and based on the device resolution size of the block is displayed.
            if(forID != "" && forID != null){
                $(".forFieldNewHeight").css("display", "block");
                storage.setItem("isContext", 1);
                if(screenWidth < 768){
                    $(".msgBodyNewHeight").css("top", "150px");
                }else{
                    $(".msgBodyNewHeight").css("top", "210px");
                }
            }else{
                $(".forFieldNewHeight").css("display", "none");
                storage.setItem("isContext", 0);
                if(screenWidth < 768){
                    $(".msgBodyNewHeight").css("top", "114px");
                }else{
                    $(".msgBodyNewHeight").css("top", "165px");
                }
            }
            crdateCnt = 1;
        }
        sentTime = getInboxDate(sentTime, 1);
        var toName = shortNameList.split(",");
        var sentRead = '';
        var readTimes = "";
        //Display the read on time if the communication recipient is not more than one and if the message is read by the recipient
        if(toName.length == 1){
            if(readTime != null && readTime != "" && readTime != "null"){
                readTimes = getInboxDate(readTime, 1);
            }
        }		
        
        var msgSubject = item.get('msgsubject');
        var msgSubjectText = getSubjectText(msgSubject);
        $("#Subject").css("margin-top", "3px");
        msgBodyText = msgBodyText + createMsgBody(msgBody, attachment, sentTime, readTimes, isFwd, senderId, msgfrom);
    }
          
  });
  
  communication.inboxMsg = Backbone.Model.extend({ urlRoot : window.nodeURL + urlInboxMsg });
  
  communication.inboxMsgList = Backbone.Collection.extend({ model : communication.inboxMsg });
  
  
  /***
  * This is the backbone view for loading the inbox for patient/doctor based upon the information received.
  * Based on the role the read and unread count is displayed
  ***/
  communication.inboxMsgListView = Backbone.View
  .extend({ el : $("#contentPatientCommunication"), // attaches `this.el` to an existing
          // element.
    initialize : function() {
        reviewsCollection = new communication.inboxMsgList(this.options.inboxCollection);
        msgBodyText = "";
        inboxCollections = reviewsCollection;
        this.collection = reviewsCollection;
        this.render();
    },
          
    render : function() {
        var self = this;
        var readUnreadCnt = "";
        threadLists = new Array();
       
        _(this.collection.models).each(function(item) { // in case
            self.appendItem(item);
        }, this);
        
        removeSpinner();
        if(storage.getItem("isDocInbox") == true || storage.getItem("isDocInbox") == "true"){
            $("#contentDoctorCommunication").append(msgBodyText);
            storage.setItem("threadListArray", threadLists);
        }else{
            $("#contentPatientCommunication").append(msgBodyText);
            storage.setItem("threadListArray", threadLists);
        }
        $("#contentPatientCommunication ").niceScroll({cursorcolor:"#FFF"});
    },
          
    appendItem : function(item) {
        this.model = item;
        var msgId = item.get("id");
        var msgBody = item.get("msgbody");
        var dateTime = item.get("senton");
        time = getInboxDate(dateTime, 0);
        var msgfrom = item.get("msgfrom");
        var msgfromId = msgfrom.substr(0, msgfrom.indexOf("#"));
        msgfrom = msgfrom.substr(msgfrom.indexOf("#") + 1);
        var msgto = item.get("messageJSON");
        var isread = item.get("isread");
        var forId = item.get("contextUserId");
        storage.setItem("forIds", forId);
        var shrotName = getRecepientNameId(msgto, "", msgfrom, msgfromId, 1, 0);
        var shortNameList = getShortName(shrotName);
        var currUser =  storage.getItem("fName")+" "+ storage.getItem("lName");
        var newImageHtml = getNewMsgHtml(isread, msgfrom, currUser, forId);
        var thread = item.get("communicationThread");
        var groupImageHtml = getGroupMsgHtml(isread, msgfrom, currUser);
        if(msgBody == "" || msgBody == null){
          msgBody = "Attachment";
        }
        //If the message body character length is more than 25 show 3 dots after 25 character
        if(msgBody.length > 25){
            msgBody = msgBody.substr(0, 25);
            msgBody = msgBody + "...";
        }
        threadLists.push(thread);
        var toName = storage.getItem("toIds");
        var toId = storage.getItem("toNames");
        var subject = item.get("msgsubject");
        var subjectText = getSubjectText(subject);
        msgBodyText = msgBodyText+'<div class=" width100 threadList font12 heightAuto inlineBlock fl" id="'+thread+'">'+
          '<div class="height100 fl sidePane">'+
            '<div class="width100 fl imagePane" id="imagePane_'+thread+'">'+newImageHtml+'</div>'+
            '<div class="width100 fl imagePane" id="groupImagePane_'+thread+'">'+groupImageHtml+'</div>'+
          '</div>'+
          '<div class="h100 fl contPane">'+
            '<div class="width100 fl namePane">'+
                '<span class="fl bold nameSpan font13">'+shortNameList+'</span>'+
                '<span class="fl timeSpan grayText" id="timeSpan_'+thread+'">'+time+'</span>'+
            '</div>'+
            '<div class="width100 fl subjTextPane">'+
                '<span class="fl subSpan grayText wordWrap font12 bold" style="color:gray !important;">'+subjectText+'</span><br/>'+
            '</div>'+
            '<div class="width100 fl subjTextPane">'+
                '<span class="fl textSpan grayText wordWrap font13" id="textSpan_'+thread+'" style="color:gray !important;">'+msgBody+'</span>'+
                '<input type="hidden" value="'+toId+'" id="recec_'+thread+'"/><input type="hidden" value="'+toName+'" id="recepName_'+thread+'"/><input type="hidden" value="'+shortNameList+'" id="recepNameShort_'+thread+'"/><input type="hidden" value="'+forId+'" id="forid_'+thread+'"/></div>'+
            '</div></div>';
          
        }
          
 });
  
/*******************************Communication Backbone Ends Here*************************************/
  
 
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
  
  
  $(".loginDiv").css("display", "none");
  // Based upon whether user has logged out or minimized application login/unlock screen is displayed
  if(storage.getItem("isAppLoggedOut") != false && storage.getItem("isAppLoggedOut") != 'false' ){
    $(".loginDiv").css("display", "block");
    gotoPath("#appPage");
    
  }else{
    pinLockField = 1;
    gotoPath("#patient_autoLock");
  }
  
  
});

/****************************************Communication Starts Here***********************************/

/***
* This function is used to fetch all the threads associated with the logged in user from web-service.
* It also varies for physician where this loads all the threads sent/received by the selected user and 
* also the logged in user is also in the recipient list.
***/
function getInboxMsgList(patId, docId) {
    threadLists = new Array();
    var inboxMsgModel = new communication.inboxMsg({});
    inboxListSuccess = function() {
        inboxMsgist = JSON.stringify(inboxMsgModel.get("message"));
        if(inboxMsgist != '"NO_CONTENT"'){
            inboxMsgist = eval(" (" + inboxMsgist + ") ");
            new communication.inboxMsgListView({ inboxCollection : inboxMsgist });
        }else{
            removeSpinner();
            $("#contentPatientCommunication").html('<div class="textCenter auto width100" style="margin-top:30px;">There are no messages in your inbox.</div>');
        }
        
    };
    
    inboxListError = function() {
	    openErrorModal(errorTitle, serverErrorMessage);
    };
    
    var inboxJSON = {"userid":docId};
    
    
    inboxMsgModel.fetch({ type : postMethod, success : inboxListSuccess, error : inboxListError, data : JSON.stringify(inboxJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}


/***
* This function is used to fetch all the messages for a particular thread from web-service.
***/
function getDetailMsgList() {
    collection = "";
    
    var inboxModel = new inbox.InboxDetail({});
    inboxListSuccess = function() {
        inboxDetailsList = JSON.stringify(inboxModel.get("message"));
        inboxDetailsList = eval(" (" + inboxDetailsList + ") ");
        
        getReadUnreadCnt();
        if(storage.getItem("roleid") == 5){
            getReadUnreadCntForUser(storage.getItem("patid"));
        }
       
        spliceFromPushThread(storage.getItem("msgThread"));
        new inbox.InboxDetailListView({ inboxCollection : inboxDetailsList });
    };
    
    inboxListError = function() {
        openErrorModal(errorTitle, serverErrorMessage);
    };
    
    var today = new Date();
    var thread = storage.getItem("msgThread");
    var inboxJSON = {"thread":thread,"recpientid":parseInt(storage.getItem("userId")), "pubKey" : storage.getItem(pubKey)};
    
    inboxModel.fetch({ type : postMethod, success : inboxListSuccess, error : inboxListError, data : JSON.stringify(inboxJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}



/***
* This function is used to fetch all the associated care manager and physician
* list for a patient from web-service.
***/
function initCommunicationContactList() {
    
    var commcontactsModel = new commcontacts.CommcontactMod({});
    commcontactListSuccess = function() {
		commcontactDetailsList = JSON.stringify(commcontactsModel.get("users"));
        
		commcontactDetailsList = eval(" (" + commcontactDetailsList + ") ");
    };
    
    commcontactListError = function() {
	    openErrorModal(errorTitle, serverErrorMessage);
    };
    
    var commcontactJSON = { "userid" : storage.getItem(patientId) };
    
    commcontactsModel.fetch({ type : postMethod, success : commcontactListSuccess, error : commcontactListError, data : JSON.stringify(commcontactJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}


/***
 * This event gets invoked when inbox page is displayed the main content screen height is calculated dynamically and displayed
 * From body height the header height is substracted and content size is calculated
 ***/
$('#inboxPage').live('pageshow', function(event) {
    $(this).addClass('ui-page-active');
    
});


/***
* This function is used to display the conditional
* fields for compose as physician/patient and conditional
* height of header for iPhone and iPad.
***/
function setComposeField(){
    $(".leftText").css("display", "block");
    $("#rightMenu").css("display", "block");
    $(".forFld").css("display", "none");
    if(screenWidth < 768){
        $(".subjectField").css("top", "72px");
        $(".contentMsg").css("top", "115px");
        $(".findSub").css("top", "115px");
    }else{
        $(".subjectField").css("top", "95px");
        $(".contentMsg").css("top", "115px");
        $(".findSub").css("top", "140px");
    }
    if(parseInt(storage.getItem("roleid")) == 5 && (parseInt(storage.getItem("urole")) == 5 || parseInt(storage.getItem("urole")) == 2)){
       $(".forFld").css("display", "block");
        if(screenWidth < 768){
            $(".subjectField").css("top", "104px");
            $(".contentMsg").css("top", "155px");
            $(".findSub").css("top", "145px");
        }else{
            $(".subjectField").css("top", "136px");
            $(".contentMsg").css("top", "200px");
            $(".findSub").css("top", "180px");
        }
    }
}


/***
* This function is used to display the conditional
* fields for composing a generic message as physician/patient and conditional
* height of header for iPhone and iPad.
***/
function setCommonCompose(){
    $(".rightText").css("display", "block");
    $(".forFld").css("display", "block");
    if(screenWidth < 768){
        $(".subjectField").css("top", "104px");
        $(".contentMsg").css("top", "155px");
    }else{
        $(".subjectField").css("top", "143px");
        $(".contentMsg").css("top", "200px");
    }
}


/***
* This function is used to display the loader spinner when a page loads.
***/
function showSpinner(){
    $(".circularGHeight").removeClass("none");
    $(".circularGHeight").addClass("block"); 
    
}


/***
* This function is used to remove the loader spinner after a page loads.
***/
function removeSpinner(){
    $(".circularGHeight").removeClass("block");
    $(".circularGHeight").addClass("none");
}


/***
 * This event gets invoked when user clicks on the new compose icon.
 * Based upon physician/patient login and based upon the resolution of the device different view is displayed
 ***/
$(".newMessage").live('touchstart', function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    toIds = new Array();
    toNames = new Array();
    setTimeout(function() {
        gotoPath("#patient_communication_compose");
    }, 100);
    isForward = 0;
    isAddRecipient = 1;
});


/***
 * This event gets invoked when new communication/forward screen is displayed
 * Based upon new/forward communiation different view is displayed
 ***/
$('#composePage').live('pageshow', function(event) {
    
});


/***
 *
 *
 ***/
$(".toListAdd").live('tap', function(e){
    storage.setItem("validationType", 0);
    var id = $(this).attr('id');
    var rId = id.substr(0, id.indexOf("_"));
    var rName = id.substr(id.indexOf("_")+1);
    isRecipientFieldFocus = 1;
    isUserTobedeleted = 1;
    rId = parseInt(rId);
    if(toIds.indexOf(parseInt(rId)) < 0){
        toIds.push(rId);
        toNames.push(trim(rName));
        fillRecipientName(rId, rName);
    }else{
        storage.setItem("validationType", 1);              
        var messg = "This recepient has already been added";
        openErrorModal(successTitle, messg);
    }
    
    var length = toIds.length;
    if(storage.getItem("isDocInbox") == "true"){
        length = length - 1;
    }else{
        if(storage.getItem("urole") == 1){
            length = length - 1;                  
        }
    }
    var cntRec = 3;
    if(screenWidth < 768){
        cntRec = 7;
    }
    if((length % cntRec) == 0){
        var oldDivId = divId;
        $("#toList").scrollTop( 35 * divId );
        divId = divId + 1;
        $('<div id="toListDiv'+divId+'" class="widthAuto fl" style="height:25px;padding-left:20px;"></div>' ).insertAfter( "#toListDiv"+oldDivId );
        
    }
    storage.setItem("toIds", toIds.join(","));
    storage.setItem("toNames", toNames.join(", "));
    closeContSubPopup();
    composeValidation();
    $("#toField").focus();
});



/***
 *
 *
 ***/
$(".recipientClose").live("click", function (e) {
    $(this).parent().parent().css("background", "#48C6F0");
    $(this).parent().parent().remove();
    var id = $(this).parent().parent().attr('id');
    id = parseInt(id);
    for(var i = toIds.length - 1; i >= 0; i--) {
        if(parseInt(toIds[i]) === id) {
            toIds.splice(i, 1);
            toNames.splice(i, 1);
        }
    }
    var length = toIds.length;
    if(storage.getItem("isDocInbox") == "true"){
        length = length - 1;
    }else{
        if(storage.getItem("urole") == 1){
            length = length - 1;                  
        }
    }
    if(length == 0){
       $('#toField').attr('placeholder', 'None');                   
    }
    var cntRec = 3;
    if(screenWidth < 768){
        cntRec = 7;
    }
                          
    if((length % cntRec) == (cntRec - 1)){
        $('#toListDiv'+divId).remove();
        divId = divId - 1;
        $("#toList").scrollTop( 35 * divId );
                          
    }
    composeValidation();
});


/***
 *
 *
 ***/
function populateContactList(){
    nameList = $("#toField").val();
    $("#recipientListDiv").html("");
    $(".findDoc").css("display", "block");
    if(screenWidth < 768){
        $(".findDocHeight").css("top", "77px");
    }else{
        $(".findDocHeight").css("top", "105px");
    }
    if(isAddRecipient == 1){
        if(screenWidth < 768){
            $(".findDocHeight").css("top", "115px");
        }else{
            $(".findDocHeight").css("top", "150px");
        }
    }
    new commcontacts.CommContactListView({ commcontactCollectionModel : commcontactDetailsList });
}


/***
 *
 *
 ***/
$("#toField").live('focus', function(e){ 
    closePatSubPopup();
    closeSubPopup();
    populateContactList();
    focussed = 1;
});


/***
* This function gets invoked when clicked outside the patient, recipient and subject list in compose page
* If clicked outside all the opened list gets closed
***/
$(".body").live('touchstart', function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    //Condition to check the clicked div attribute
    if ($(e.target).attr('class') == 'findDiv') {
        return;
    }else{
        closePatSubPopup();
        closeContSubPopup();
        closeSubPopup();
    }
});


/***
* This function is used to close Patient auto-populated list
***/
function closeContSubPopup(){
    $(".findDoc").css("display", "none");
}


/***
* This function is used to create a unique string from the current event
* Input parameter event is passed and it creates a unique string and returns the output
***/
function randString(event){
	var n = 16;
	var text = '';
	console.log(event.timeStamp);
	var possible = event.timeStamp+'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
    for(var i=0; i < n; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    console.log(text);
    return text;
}

/***
* This function is used to capture and upload a file in mobile devices
* The image is uploaded as URL format with some basic settings for the image
***/
function getImage() {
    cancelUpload();
    sendPhoto = 1;
    isAttachment = 1;
    navigator.camera.getPicture(uploadPhoto, fail, { correctOrientation: true, quality: 50, allowEdit: false, targetWidth:screen.width,targetHeight:screen.height, destinationType: Camera.DestinationType.FILE_URI });
    
}


/***
* This function is used to upload a file from local drive in mobile devices
* The image is uploaded as URL format with some basic settings for the image
***/
function uploadFile(){
    cancelUpload();
    sendPhoto = 1;
    isAttachment = 1;
    navigator.camera.getPicture(uploadPhoto,
                                function(message) { 

                                sendPhoto = 0; },
                                { quality: 50,
                                allowEdit : true,
                                destinationType: navigator.camera.DestinationType.FILE_URI,
                                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY });
}


/***
*
*
***/
function uploadPhoto(imageURI) {
    $(".headerDivComm").css("position","fixed");
    $(".subHeaderComm").css("position","fixed");
    cancelUpload();
    var ext = imageURI.substr(imageURI.indexOf(".")+1);
    if(ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "gif"){
        imageURl = imageURI;
        imageName = getImageName()+".jpg";
        sendPhoto = 1;
        $("#attcFilehDiv").css("background-color", "#E5E1E2");
        if(isNewCompose == 1){
            $("#attchDiv").html(imageName+'<div class="fr removeAttch pointer">X</div>');
            
        }else{
            $("#attcFilehDiv").html(imageName+'<div class="fr removeAttch pointer">X</div>');
            
        }
        var isValid = composeValidation();
    }else{
        var messg = "This format of file is not valid for upload";
        openErrorModal(errorTitle, messg);
    }
}

/***
 *
 *
 ***/
$(".removeAttch").live('touchstart', function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    sendPhoto = 0;
    $(".attchDiv").html("");
    $("#attcFilehDiv").css("background-color", "none");
    var isValid = composeValidation();
});



var toName;
var commnThread;
/***
 *
 *
 ***/
$("#sendMessage").live('touchstart', function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    $(this).removeClass("addButtonInactive").addClass("addButtonActive");
    var oldCommThread = "";
    commnThread = "";
    if(parseInt(isForward) == 1){
        oldCommThread = msgThreadValue;
        storage.setItem("msgThread", "")          
    }
    if(storage.getItem("msgThread") == ""){
        commnThread = randString(e);
    }
    preCompose(oldCommThread);
});

/***
 *
 *
 ***/
$(".composeBody").live("keyup", function(evt){
    var oldCommThread = "";
    commnThread = "";
    var isValid = composeValidation(); 
    if (evt.keyCode === 13 && isValid == 0) {
        if(isForward == 1){
            oldCommThread = msgThreadValue;
            storage.setItem("msgThread", "")          
        }
        commnThread = randString(evt);
        preCompose(oldCommThread);
    }                  
});


/***
 *
 *
 ***/
$("#sendMsgBody").live("tap", function(evt){
    $(this).focus();
    setCommunicationBodyHeight();
    scrollToLast("msgNewBody");
    isDetailedCommunication = 1;
});


/***
 *
 *
 ***/
$(".loginInput").live("tap", function(evt){
    $(this).focus();
});


/***
 *
 *
 ***/
function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    sendMessage(storage.getItem("tempThread"), storage.getItem("tempOldThread"), storage.getItem("conversationListId"), r.response, storage.getItem("toIds"), storage.getItem("toNames"), storage.getItem("userId"), LoggedInUserName, storage.getItem("roleid"));
    
}


/***
 *
 *
 ***/
function fail(error) {
    sendPhoto = 1;
    var isComposeValid = composeValidation();
    removeMask();
}


/***
 * This function is used to send communication information to the web-service for saving in the database
 *
 ***/
function sendMessage(commThread, oldCommThread, conversationListId, attachment, toIdList, toNameList, senderID, senderName, senderRoleId){
    var composeJSON = "";
    var composeMailModel;
    var subject = "";
    var forid = "";
    var forName = "";
    var msgBody = "";
    if(isNewCompose == 1 && isAddRecipient != 1 && isAutoMsg != 1){
        subject = $("#mailSubject").val();
        msgBody = $("#composeBody").val();
        forid = $("#forId").val();
        forName = $("#forName").val();
    }else{
        subject = $("#mailSubjectContinue").val();
        if(isAutoMsg == 0){
            msgBody = $("#sendMsgBody").val();
        }else{
            msgBody = sendMsgBody;
        }
        forid = $("#forContinueId").val();
        forName = $("#forFieldBlock").text();
    }
    if(storage.getItem("roleid") == 5){
        if(forid != "" && forid != null){
            var sendTo = toIdList.split(",");
            var sendToNames = toNameList.split(",");
                
            for(var i=0;i<sendTo.length;i++){
                if(sendTo[i] == 1){
                    sendTo.shift();
                    sendToNames.shift();
                }
            }
                
            var ind = sendToNames[0].indexOf(" ");
            if(ind == 0){
                var newName = sendToNames[0].substr(ind+1);
                sendToNames[0] = newName;
            }
            toIdList = sendTo.join(",");
            toNameList = sendToNames.join(",");
        }
    }
    if(isForward == 0 && isAddRecipient == 0){
        composeJSON = {
                "createdby":senderID,
                "msgBody":msgBody,
                "msgFrom":senderID,
                "msgTo":toIdList,
                "msgSubject":subject,
                "thread":commThread,
                "sendername":senderName,
                "role":senderRoleId,
                "tonames":toNameList,
                "msgListId":conversationListId,
                "attachment":attachment
        }
        composeMailModel = new commsubject.commposeMail({});
    }else{
        if(isForward == 1){
            subject = "FWD: "+subject;
        }
        conversationListId = storage.getItem("conversationListId");
        composeJSON = {
                "msgFrom":senderID,
                "msgTo":toIdList,
                "thread":oldCommThread,
                "msgSubject":subject,
                "newThread":commThread,
                "msgBody":msgBody,
                "msgListId":conversationListId,
                "sendername":senderName,
                "role":senderRoleId,
                "tonames":toNameList,
                "attachment":attachment
        }
        composeMailModel = new commsubject.forwardMail({});
        
    }
    clearInputField();
    $("#composeBody").val("");
        //alert(JSON.stringify(composeJSON));
    composeMailSuccess = function() {
        if(isAutoMsg == 0){
            $(".forward").css("display", "block");
            $(".sendMessage").removeClass("addButtonActive").addClass("addButtonInactive");
            //Condition for normal and forwarded communication
            var conversationlistid = composeMailModel.get('message').conversationlistid.id;
            storage.setItem("conversationListId", conversationlistid);
            storage.setItem("msgThread", commThread);
            shortNameRecipient = new Array();
            
            if(isNewCompose == 1 || isForward == 1 || isAddRecipient == 1){
                $(".toNewField").html("");
                var recipientTemplate = $("#ViewRecipientTemplate").html();
                $(".toContinueField").html(recipientTemplate);
            }
            //Condition for new and old communication
            if(isNewCompose == 1 || isForward == 1){
                pageCount = 3;
                showHideMsgIcon();
                if(storage.getItem("roleid") == 1){
                    $("#nameContentComm").html(LoggedInUserName);
                    threadLists.unshift(commThread);
                }else{
                    if(storage.getItem("patName") != ""){
                        threadLists.unshift(commThread);
                    }
                }
                setTimeout(function() {
                    gotoPath("#patient_continue_communication");
                    getDetailMsgList();
                },500);
            }else{
                var msgId = composeMailModel.get('message').id;
                var senderId = composeMailModel.get('message').from.id;
                var msgBody = composeMailModel.get('message').body;
                var date  = new Date();
                var month = parseInt(date.getMonth())+1;
                if(month < 10){
                    month = "0"+month;
                }
                var sentTime = date.getFullYear()+"-"+ month+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
                sentTime = createdDateTime(sentTime, 0);
                var msgText = createMsgBody(msgBody, attachment, sentTime, "", false, senderId, LoggedInUserName);
                $("#msgNewBody").append(msgText);
            }
            
            
            var tempbody = composeMailModel.get('message');
            var tempdevices = composeMailModel.get('oofStatusList');
            
            var recipientIds = storage.getItem("toIds").split(",");
            var recipientName = storage.getItem("toNames").split(",");
            
            /****To be removed**************/
            /*if(isAddRecipient == 1){
            for (var j = 0; j<=recipientName.length - 1; j++) {
                shortNameRecipient.push(getDisplayName(recipientName[j]));
            }
            var shortNameList = getShortName(shortNameRecipient.join(","));
            var toList = '<div class="selectedList font14 fl" style="float:left;">'+shortNameList+'</div> ';
            $("#toListBlock").html(toList);
            }*/
            /****To be removed**************/
            var recepId = recipientIds;
            
            for (var i = 0; i<=tempdevices.length - 1; i++) {
                var isOOF = tempdevices[i].isoof;
                var oofUserID = parseInt(tempdevices[i].userId);
                displayRecipient(oofUserID, isOOF);
                var forUserId = "";
                if(tempbody.conversationlistid.user != null){
                    forUserId = tempbody.conversationlistid.user.id;
                }
                oofUserID = oofUserID.toString();
                var oofTime = "";
                if(isOOF == true || isOOF == 'true'){
                    oofTime = tempdevices[i].ooftime;
                    oofTime = getOOFTimeFormat(oofTime);
                    if((recepId.indexOf("1") >= 0 && recepId.length == 2) || recepId.length == 1){
                        isAutoMsg = 1;
                        var senderIDIndex = recipientIds.indexOf(oofUserID);
                        var senderName = recipientName[senderIDIndex];
                        recipientName[senderIDIndex] = LoggedInUserName;
                        recipientIds[senderIDIndex] = storage.getItem("userId");
                        recipientName = recipientName.join(", ");
                        recipientIds = recipientIds.join(",");
                        sendMsgBody = "I am out till "+oofTime;
                        senderRoleId = 5;
                        sendMessage(commThread, "", storage.getItem("conversationListId"), "", recipientIds, recipientName, oofUserID, senderName, senderRoleId);
                    }
                }
            }
            
            if(isNewCompose != 1 && isForward != 1){
                var shortNameList = getShortName(shortNameRecipient.join(","));
                var toList = '<div class="selectedList font14 fl" style="float:left;">'+shortNameList+'</div> ';
                $("#toListBlock").html(toList);
            }
            isForward = 0;
            removeMask();
            $(".composeBody").val("");
            $("#sendMsgBody").val("");
            isNewCompose = 0;
            detailPage = 0;
            inboxPage = 1;
            docInboxPage = 1;
            isAddRecipient = 0;
            $("#attchDiv").html("");
            $("#attcFilehDiv").html("");
            $("#attcFilehDiv").css("background-color", "#fff");
            scrollToLast("msgNewBody");
            $(".sendField").css("position","fixed");
        }
    };
    
    composeMailError = function() {
        openErrorModal(errorTitle, serverErrorMessage);
        removeMask();
    };
    
    composeMailModel.fetch({ type : postMethod, success : composeMailSuccess, error : composeMailError, data : JSON.stringify(composeJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
}



/***
* This event gets invoked when user clicks on the image link in the message detail page
* Image loader popup is displayed
***/
$(".imageclick").live("tap",function(){
     showMask();
    $('#attchment_details').css("display", "block");
    $('#attchment_details').css("top", "1%");
    $('#attchment_details').css("height", "98%");
    $('#attchment_details').css("left", "1%");
    $('#attchment_details').css("width", "98%");
    $('#headerMedDetailClose').css("display", "block");
    $('#headerMedDetailClose').css("top", "0.5%");
    $('#sentMask').css("opacity", 0.95);
    $('#scroller').html('<p class="loader fixed textCenter width100">Please Wait while loading....</p>');
    storage.setItem("imageSize", "100%");
    isZoomed = 0;                      
    var path = $(this).attr('id');
                      
    setTimeout(function() {
        openImage(path);
    },200);
});




/***
* This function is used to get the image data as base64 encoded data from the web-service and display as image
* Input parameter image path is passed and it retrieves the image information
* The original size of the image is retained and displayed with bringing the image to the center of the screen
***/
function openImage(path){
    var imageModel = new communication.Image({});
    
    imageListSuccess = function() {
        imageDetailsList = imageModel.get("image");
        $('#scroller').html('<img src="data:image/jpg;base64,'+imageDetailsList+'" id="wrapper" class="zoomImage" alt="image" />');
        setTimeout(function() {
           var marginTop = (parseInt($("body").css("height")) - parseInt($(".zoomImage").css("height")))/2;
           $("#wrapper").css("margin-top", marginTop+"px");
           var marginLeft = (parseInt($("body").css("width")) - parseInt($(".zoomImage").css("width")))/2;
           $("#wrapper").css("margin-left", marginLeft+"px");
                   
           $(".topBar").css("top", "100px");
           $(".bottomBar").css("top", "200px");
           $(".leftBar").css("left", "100px");
           $(".rightBar").css("left", "200px");
           $(".viewEcaliper").css("display", "block");
           $(".setEcaliper").css("display", "none");
           $(".ecaliper").css("display", "none");
           $(".caliperDistance").text("");
           $(".setEcaliper").text("Calibrate");
           isCaliperSet = false;
           setTimeout(function() {
              $(".cancelEcaliper").css("display", "none");
              $(".rotateEcaliper").css("display", "block");
           },200);
        },200);
    };
    
    imageListError = function(error) {
        openErrorModal(errorTitle, serverErrorMessage);
        $("#topMask").fadeOut(300);
        $("#topMask").remove();
        $(".loader").remove();
    };
    
    var imageJSON = {"attachment":path};
    
    imageModel.fetch({ type : postMethod, success : imageListSuccess, error : imageListError, data : JSON.stringify(imageJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
}


/***
 *
 *
 ***/
function nextMessage(){
    storage.setItem("isLeftSwipe", 1);
    var id = storage.getItem("msgThread");
    
    var threadInd = threadLists.indexOf(id);
    var newThreadId = threadLists[threadInd+1];
    commonThreadOption(id, newThreadId);
}


/***
 *
 *
 ***/
function prevMessage(){
    storage.setItem("isLeftSwipe", 2);
    var id = storage.getItem("msgThread");
    var threadInd = threadLists.indexOf(id);
    var newThreadId = threadLists[threadInd-1];
    commonThreadOption(id, newThreadId);
}


/***
 *
 *
 ***/
$(".threadList").live('tap', function(e){
    storage.setItem("isLeftSwipe", 0);
    var id = $(this).attr("id");
    var threadInd = threadLists.indexOf(id);
    var newThreadId = threadLists[threadInd];
    commonThreadOption(id, newThreadId);
});


/***
 *
 *
 ***/
$('#patient_continue_communication').live('pageshow', function(event) {
    $(this).addClass('ui-page-active');
    $("#uploadOverlay").css("display", "none");
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
$(".patient_change_password").live("touchstart", function(e){ 
    if(e.type == "touchstart"){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    }
    $(".inputField").val("");
    cancelUpload();
    gotoPath('#change_password');
});


/***
* This function gets called when change password page is displayed
***/
$("#change_password").live('pageshow', function(event) {
    event.preventDefault();                                     
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


/***
*
*
***/
$(document).on("change", "#defaultLogout", function(event) {
    if (this.checked) {
        $("#logoutTime").removeAttr("disabled");
        setLogoutTime(application.logoutTime / 3600000);
               
    } else {
        application.isDefaultLogout = false;
        $("#logoutTime").attr("disabled", true);
        storage.setItem(isDefaultLogoutObj, false);
        window.clearTimeout(application.timeoutVar);
    }
});


/***
*
*
***/
$(document).on("change", "#logoutTime", function(event) {
    if (isValidNumber($(this).val()))
        setLogoutTime($(this).val());
    else
        var messg = "Please enter valid hour time";
        openErrorModal(warningTitle, messg);
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


var pin;

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
* This event gets invoked when the compose page is displayed
*
***/
$("#patient_communication_compose").live('pageshow', function(event) {
    if(storage.getItem("isAPN") == 1){
       storage.setItem("isAPN", 0);
    }
});


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
*
*
***/
function highLightErrorField(classVal){
    $("."+classVal).click();
    $("."+classVal).trigger("tap");
    $("."+classVal).focus().select();
}


/***
*
*
***/
function removeHighLightField(){
    $(".inputField").blur();
}


/***
* This function is used to animate down the settings/communication menu that animates from the bottom wwhen clicked on the screen.
***/
$(".commPage").live('touchstart', function(e){ 
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    if ($(e.target).attr('id') == 'uploadOption' || $(e.target).attr('id') == 'downArrows') {
        return;
    } else {
        cancelUpload();
        
    }
            
});



/***
*
*
***/
$(".closePopup").live("click", function(){
    closePatSubPopup();
});



/***
* This event gets invoked when user clicks on the time settings link in the options page
***/
$("#patient_time_Setting").live("click", function() {
    gotoPath('#configureDiv');
});




/***
* This event gets invoked when user clicks on the close icon in the information modal
***/
$(".headerInfoClose").live("touchstart", function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    cancelUpload();                       
    $(".infoModal").css("display", "none");
    removeMask();
});

/***
* This event gets invoked when recipient field is blurred
* on clicking on any recipient name from the list the recipient field remains focussed else if clicked outside field gets blurred
***/
$("#toField").live("blur", function(){
    if(isRecipientFieldFocus == 1){
        $("#toField").val("");
        $("#toField").click();
        $("#toField").tap();
        $("#toField").select();
        $("#toField").trigger( "focus" );
    }else{
        closeContSubPopup();
        $("#toField").val("");
    }
    isRecipientFieldFocus = 0;
    focussed = 0;
});


/***
* This function is invoked when user clicks outside the message input text area in the continue communication page. Focus is removed
* Also this function gets invoked when user clecks on the send button. On clicking send button focus on the text area is retained
***/
$("#sendMsgBody").live("blur", function (e) {
    if(isDetailedCommunication == 1){
        if(isAttachment == 0){
            if(isMinimized == 1){
                $("#sendMsgBody").click();
                $("#sendMsgBody").tap();
                $("#sendMsgBody").select();
                $("#sendMsgBody").trigger( "focus" );
                isMinimized = 0;
            }
            
        }
        
        isDetailedCommunication = 0;
    }
    setTimeout(function(){
        setCommunicationBodyHeight();
        scrollToLast("msgBody");
    },200);
});


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


/*
* onOffline Function
* Handle the offline event when triggered
*/
function onOffline() {
    /*showMask();
    $("#lostConnection").css("display", "block");
    $( "#lostConnection" ).fadeTo( "slow" , 1, function() {
        // Animation complete.
    });*/
}



/*
* online Function
* Handle the online event when triggered
*/
function online() {
  removeMask();
  $("#lostConnection").css("display","none");
    $( "#lostConnection" ).fadeTo( "slow" , 0, function() {
        // Animation complete.
    });
}



/***
* This function is used to scroll a div to its bottom for continue communication page
***/
function scrollToLast(divId){
    $("#bottomOfDiv").remove();
    var height = $("#"+divId).css("height");
    $("#"+divId).append('<div id="bottomOfDiv" style="position:absolute;top:'+height+';"></div>');
    document.getElementById('bottomOfDiv').scrollIntoView(true);
}



/***
* This function is used to find out the communication body height dynamically when the
* virtual keyboard pops up and gets hidden  and based on the context user
***/
function setCommunicationBodyHeight(){
    var bodyHeight = parseInt($("body").css("height"));
    var headerHeight = parseInt($(".headerDivComm").css("height"));
    var subHeaderHeight = parseInt($(".subHeaderComm").css("height"));
    var toheightHeight = parseInt($(".toContinueField").css("height"));
    var sendFieldHeight = parseInt($(".sendField").css("height"));
    var msgBodyHeight;
    if(storage.getItem("isContext") == 1){
        var forHeight = parseInt($(".forContinueField").css("height"));
        msgBodyHeight = bodyHeight - (headerHeight + subHeaderHeight + toheightHeight + sendFieldHeight + forHeight);
    }else{
        msgBodyHeight = bodyHeight - (headerHeight + subHeaderHeight + toheightHeight + sendFieldHeight);
    }
    msgBodyHeight = msgBodyHeight + "px";
    $(".msgBodyNewHeight").css("height", msgBodyHeight);
}



/***
* This function is used to find out the communication body height dynamically when the
* virtual keyboard pops up and gets hidden  and based on the context user for forward communication
***/
function setComposeBodyHeight(){
    var bodyHeight = parseInt($("body").css("height"));
    var headerHeight = parseInt($(".headerDivComm").css("height"));
    var subHeaderHeight = parseInt($(".toNewField").css("height"));
    var toheightHeight = parseInt($(".subjectNewField").css("height"));
    var msgBodyHeight;
    if(storage.getItem("isContext") != 1){
        msgBodyHeight = bodyHeight - (headerHeight + subHeaderHeight + toheightHeight);
    }else{
        var forHeight = parseInt($(".forNewField").css("height"));
        msgBodyHeight = bodyHeight - (headerHeight + subHeaderHeight + toheightHeight + forHeight);
    }
    msgBodyHeight = msgBodyHeight;
    $(".composeMsgField").css("height", msgBodyHeight + "px");
    var attachHeight = parseInt($("#composeAttachDiv").css("height"));
    var textAreaHt = msgBodyHeight - attachHeight;
    $("#composeBody").css("height", msgBodyHeight + "px");
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


/***
* This function is used to filter the recipient short name string and remove "Generic patient"
* Parameter toNameList is passed and after filtering the array the converted into string and returned
**/
function getShortName(toNameList){
    var toShortname = new Array();
    var toIdList = storage.getItem("toIds").split(",");
    toNameList = toNameList.split(",");
    for(var j=0; j<toIdList.length; j++) {
            //if(toIdList[j] != 1){
        if(toNameList[j] != "Generic P"){
            toShortname.push(toNameList[j]);
        }
    }
    toShortname = toShortname.join(",");
    return toShortname;
}


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

$(".leftSlideMenu").live("tap", function(){
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
        
});



$(".addUser").live("tap", function(){
        $(".addUserDiv").css("display", "block");
        $(".addUserDiv").animate({ height: "100%" }, "medium", function() {
        });
});


$(".cancelUser").live("tap", function(){
    $(".addUserDiv").animate({ height: "0%" }, "medium", function() {
        $(".addUserDiv").css("display", "none");
    });
        
});


$(".menuSlider").live("click", function(){
                      var id = $(this).attr('id');
                      $("."+id+"Option").css("display", "block");
                      });