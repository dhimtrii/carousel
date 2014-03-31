window.servicePath = "http://10.1.7.142:8080/rest-medrubik/";
var urlLogin = "auth/login";
var urlValidate = "rest/validate";
var urlUpdate = "rest/update";
var urlGetAppointment = "appointment/get";
var urlSaveAppointment = "appointment/save";
var urlDeleteAppointment = "appointment/delete";
var urlEditAppointment = "appointment/edit";
var urlGetSpecialty = "specialtydoctor/get";
var urlGetDosage = "dosetype/get";
var urlGetMedTime = "medtime/get";
var urlGetMedication = "patientmed/get";
var urlGetMedicine = "meds/get";
var urlSaveMedication = "patientmed/save";
var urlDeleteMedication = "patientmed/delete";
var urlEditMedication = "patientmed/edit";
var urlGetVital = "patientvital/get";
var urlGetAction = "action/get";
var urlAddAction = "action/save";
var urlDeleteAction = "action/delete";
var urlGetPct = "caretaker/get";
var urlGetExeType = "exercise/get";
var urlGetStates = "state/get";
var urlAddPCT = "caretaker/save";
var urlEditPCT = "caretaker/edit";
var urlDeletePCT = "caretaker/delete";
var urlCommContactList = "message/getcontact";
var urlCommSubject = "subject/get";
var urlComposeMail = "message/composemsg";
var urlDetalMail = "message/bythread";
var urlUnreadDetalMail = "message/refreshcommunication";
var urlDetalLab = "message/patientvital";
var urlDetalPrescription = "message/patientmed";
var urlReadUnreadCnt = "message/getreadunreadmsgcount";
var urlInboxMsg = "message/byid";
var urlReadUnreadMsg = "message/byuserid";
var urlSaveLock = "patient/lock";
var urlGetLock = "patient/get";
var urlDeleteComm = "message/delete";
var urlForwardComm = "message/delete";
var urlAllCommContactList = "message/getCMDoctorList";
var urlForwardMail = "message/forward";
var loginFailed = 0;
var lastUsername = "";
var resetPasswordFailed = 0;
var lastUsernameResetPassword = "";
var storage = window.localStorage;
var serverErrorMessage = "Please check internet connectivity.";
var successAddAction = "Action added successfully";
var errorAddAction = "Can not add Action. Please try again.";
var successEditAction = "Action updated successfully";
var errorEditAction = "Can not update Action added by CM.";
var errorActName = "Please enter activity name.\n";
var errorActDesc = "Please enter activity description.\n";
var errorActDate = "Please select activity date.\n";
var errorActDateValid = "Please select valid date.\n";
var errorActTime = "Please select activity time.\n";
var errorExeDur = "Please enter exercise duration.\n";
var errorExeDurValid = "Please enter valid exercise duration.\n";
var errorExeFreq = "Please enter exercise frequency.\n";
var errorExeFreqValid = "Please enter valid exercise frequency.\n";
var errorExeTime = "Please select exercise time.\n";
var deleteActMsg = "Are you sure you want to delete ?";
var successDeleteAct = "Action deleted successfully";
var errorDeleteAct = "Can not delete action added by Care Manager.";

var successAddMed = "Medication added successfully";
var successEditMed = "Medication updated successfully";
var errorAddMed = "Can not add medication. Please try again.";
var errorEditMed = "Can not update medication. Please try again";
var errorStartDate = "Please select start date.\n";
var errorEndDate = "Please select end date.\n";
var errorStratEndDate = "End date should not be prior to Start date.\n";
var errorDose = "Please enter dosage.\n";
var errorFreq = "Please enter frequency.\n";
var errorFreqCount = "Please select frequency count.\n";
var errorFreqValid = "Please select valid frequency.\n";
var errorFreqType = "Please select when to take medication.\n";
var errorFreqTime = "Please select medication time.\n";
var errorFreqDays = "Please select day(s).\n";
var deleteMed = "Are you sure you want to delete ?";
var successDeleteMed = "Medication deleted successfully";
var errorDeleteMed = "Can not delete medication added by Care Manager.";
var deleteAppt = "Are you sure you want to delete the Appointment?";
var deleteComm = "Are you sure you want to archive the message?";
var deletePCT = "Are you sure you want to delete the Care Taker?";
var successDeleteAppt = "Appointment deleted successfully";
var errorDeleteAppt = "Can not delete Appointment added by Care Manager.";
var successAddAppt = "Appointment added successfully";
var successEditAppt = "Appointment updated successfully";
var errorAddAppt = "Can not add Appointment. Please try again.";
var errorEditAppt = "Can not update Appointment added by Care Manager.";
var successAddPCT = "PCT added successfully";
var successEditPCT = "PCT updated successfully";
var errorAddPCT = "Can not add PCT. Please try again.";
var errorEditPCT = "Can not update PCT added by Care Manager.";
var successDeletePCT = "PCT deleted successfully";
var errorDeletePCT = "Can not delete PCT.";
var errorTitle = "Error";
var successTitle = "Success";
var moreButtonClicked = false;
var selectedDate = new Date();
var appointmentDetailsList = "";
var specialityDetailsList = "";
var commcontactDetailsList = "";
var inboxDetailsList = "";
var requestHeader = "application/json;charset=utf-8";
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
var appDivlist = new Array();
var dates;
var content = '';
var dateArr = new Array();
var endDateArr = new Array();
var toIds = new Array();
var changeMonth;
var dateMonth;
var dayString;
var dayName;
var collection;
var actionCollection;
var pctCollection;
var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
var shortMonthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
var selectedDayColor = "#666465";
var nonSelectedDayColor = "#CCCCCC";
var medPanelObj = "Medicine";
var actPanelObj = "Action";
var intRegex = /^\d+$/;
var logoutTimeObj = "logoutTime", isDefaultLogoutObj = "isDefaultLogout";
var lockoutTimeObj = "lockoutTime", isDefaultLockoutObj = "isDefaultLockout";
var User = "";
var Lock = "";
var actionTypeId;
var backPath;
var cmID;
var nameList;
var commCollection;
var detailPaage;
var contentBefore = '';
var contentAfter = '';
var contentAtTime = '';
var checkTime;
var msgType = "textMsg";
var inboxCollections;
var alertContent = "";
var specialityList = "";
var DoctorsList = "";
var autoLogin;
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

var myDate;
var morning;
var noon;
var evening;
var currTime;
var expand;
var medTimeDaySelected = { isMondayObj : false, isTuesdayObj : false, isWednesdayObj : false, isThursdayObj : false, isFridayObj : false, isSaturdayObj : false, isSundayObj : false };
var medicationTimes = new Array();
var specialityText;
var specialityId;
var docName;
var specCollection;
var remindMeData1;
var calCheck;
var Fielderror;
var msgBodyText = "";
var unreadMsgId;
var recepntLst = new Array();

var speciality = {};
var application = {};
var appointment = {};
var actionCalendar = {};
var medication = {};
var action = {};
var vitals = {};
var pct = {};
var exercise = {};
var state = {};
var stateList = {};
var commsubject = {};
var commcontacts = {};
var communication = {};
var inbox = {};
var pinLock = {};


/************Home Menu Starts Here******************/

function gotoPath(path) {
    $(".footerButton").removeClass("ui-btn-active");
    //$.mobile.changePage(path, ($.mobile.defaultPageTransition = "none"));
    $.mobile.changePage(path, {
                        transition: "slide",
                        reverse: true
                        });
}

$(".menu").live("tap", function(event){
                
                if($(this).hasClass("highlight")){
                $(this).addClass("menuCss");
                $(this).removeClass("highlight");
                var path = $(this).attr('id');        
                gotoPath("#"+path);
                }else{
                var path = $(this).attr('id');
                $(this).removeClass("menuCss");
                $(this).addClass("highlight");
                var thisDiv = $(this);
                $(".menu").not(thisDiv).each(function(index) {
                                             $(this).addClass("menuCss");
                                             $(this).removeClass("highlight");
                                             });
                gotoPath("#"+path);
                }
                });

$("#backHomePage").live("tap", function(){
                        $("#contactList").css("display","none");
                        $("#delete").remove();
                        $("#forward").remove();
                        $("#topMask").fadeOut(300);
                        $("#topMask").remove();
                        $("#contentPatientCommunication").html("");
                        gotoPath("#appHomePagePortrait");
                        $("#welcomeName").html("Hi, "+storage.getItem("fName"));
                        });


/************Home Menu Ends Here******************/



/************login Ends Here******************/

function getReadUnreadCnt() {
	
    var readUnreadCntModel = new communication.readUnreadCnt({});
    readUnreadCntSuccess = function() {
    	readUnreadCntList = JSON.stringify(readUnreadCntModel.get("readandunreadmsgcount"));
    	//alert(readUnreadCntList);
    	communication.readUnreadCntList = eval(" (" + readUnreadCntList + ") ");
    };
    
    readUnreadCntError = function() {
	    alert(serverErrorMessage);
    };
    
    var readUnreadCntJSON = { "userId":storage.getItem("userId") };
    
    readUnreadCntModel.fetch({ type : postMethod, success : readUnreadCntSuccess, error : readUnreadCntError, data : JSON.stringify(readUnreadCntJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}

function initAlarm(date){
    var alarmModel = new action.Alarm({});
    alarmListSuccess = function() {
	    alarmDetailsList = JSON.stringify(alarmModel.get("action"));
	    if (!medication.medicationTimeList) {
            getMedicationTime();
	    }
        
	    alarmDetailsList = eval(" (" + alarmDetailsList + ") ");
	    new action.AlarmListView({ alarmCollection : alarmDetailsList });
    };
    
    alarmListError = function() {
	    alert(serverErrorMessage);
    };
    
    var aralarmJSON = { patientId : storage.getItem(patientId), "date" : date };
    
    alarmModel.fetch({ type : postMethod, success : alarmListSuccess, error : alarmListError, data : JSON.stringify(aralarmJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
}


function getLock(patientid) {
    Lock = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetLock });
    var PIN = new Lock({});
    var fetchSuccess = function() {
        if(PIN.get("patient").lockcode != "" || PIN.get("patient").lockcode != null){
            storage.setItem("PIN", PIN.get("patient").lockcode);
            storage.setItem("isAppLocked", true);
        }
    };
    
    var fetchError = function() {
	    alert(serverErrorMessage);
    };
    
    var idJSON = {"patientId":patientid};
    
    PIN.fetch({ type : postMethod, success : fetchSuccess, error : fetchError, data : JSON.stringify(idJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
}




function authenticateUser(username, password) {
    User = Backbone.Model.extend({ urlRoot : window.servicePath + urlLogin });
    var myUser = new User({});
    var fetchSuccess = function() {
	    // validating response , if credentials are
	    // valid, forward to the next page
	    if (myUser.get(pubKey).indexOf("ER-020001") == -1) {
            
            // successfull login
            // save user information in local storage
            window.userLoggedIn = true;
            storage.setItem(patientId, myUser.get(patientId));
            storage.setItem("userId", myUser.get("user").id);
            storage.setItem("username", username);
            storage.setItem("password", password);
            storage.setItem("fName", myUser.get("user").firstName);
            storage.setItem("lName", myUser.get("user").lastName);
            storage.setItem(pubKey, myUser.get(pubKey));
            storage.setItem("roleid", myUser.get("user").role.id);
            storage.setItem("isAppLoggedOut", false);
            getLock(storage.getItem(patientId));
            //initAlarm(currentDate(new Date()));
            if(storage.getItem("loggedInFirstTime") != null || storage.getItem("loggedInFirstTime") == "false"){
                
                var orientation="portrait";
                if(window.orientation == -90 || window.orientation == 90) orientation = "landscape";
                if(orientation == "landscape"){
                    backPath = "appHomePageLandscape";
                    gotoPath("#appHomePageLandscape");
                }else{
                    backPath = "appHomePagePortrait";
                    gotoPath("#appHomePagePortrait");
                }
                gotoPath("#appHomePagePortrait");
            }else{
                if(storage.getItem("PIN") == "null"){
                    gotoPath("#patient_autoLock_Setting");
                    pin = "";
                    $(".setPin").val("");
                    $("#confirmLock").remove();
                    $("#headerPatientSetting").append('<div id="setPinLock" class="ui-btn-right composeButton width70" style="right:10px;bottom:10px !important;">Confirm</div>');
                    $("#lockText").html("Set Unlock Password");
                    $("#settingsBack").css("display", "none");
                    $(".footer").css("display", "none");
                    $(".communicationFooterDiv").css("display", "none");
                }else{
                    var orientation="portrait";
                    if(window.orientation == -90 || window.orientation == 90) orientation = "landscape";
                    if(orientation == "landscape"){
                        backPath = "appHomePageLandscape";
                        gotoPath("#appHomePageLandscape");
                    }else{
                        backPath = "appHomePagePortrait";
                        gotoPath("#appHomePagePortrait");
                    }
                    gotoPath("#appHomePagePortrait");
                }
            }
            application.isDefaultLogout = storage.getItem(isDefaultLogoutObj);
            if (application.isDefaultLogout == "true") {
                application.logoutTime = storage.getItem(logoutTimeObj);
                window.setTimeout("logoutFromApp()", application.logoutTime);
            } else {
                application.isDefaultLogout = false;
                storage.setItem(isDefaultLogoutObj, false);
            }
            $("#welcomeName").html("Hi "+storage.getItem("fName"));
            
	    } else {
            $("#login_invalid_error_message").removeClass("none").addClass("block");
            return false;
	    }
    };
    
    var fetchError = function() {
	    alert(serverErrorMessage);
    };
    
    var credentials = { userName : username, password : password };
    
    myUser.fetch({ type : postMethod, success : fetchSuccess, error : fetchError, data : JSON.stringify(credentials), contentType : requestHeader, processData : true, async : false });
}

function defaultLogin() {
    application.username = storage.getItem("username");
    if (application.username != null && application.username != "") {
	    application.password = storage.getItem("password");
	    authenticateUser(application.username, application.password);
    }
}



$('#appHomePagePortrait').live('pageshow', function(event) {
                               
                               initAlarm(currentDate(new Date()));
                               
                               });


/************Login Ends Here******************/


/*************Patient Appointment Starts Here**************/

function initAppoint(month) {
    collection = "";
    var date = new Date();
    dateMonth = date.getMonth() + 1;
    
    var appointmentModel = new appointment.Appointment({});
    
    appointmentListSuccess = function() {
	    appointmentDetailsList = JSON.stringify(appointmentModel.get("appointment"));
        //alert(appointmentDetailsList);
	    appointmentDetailsList = eval(" (" + appointmentDetailsList + ") ");
	    new appointment.AppointmentListCalView({ apptCollection : appointmentDetailsList });
    };
    
    appointmentListError = function() {
	    alert(serverErrorMessage);
    };
    
    // var today = new Date();
    
    var appointmentJSON = { "patientid" : storage.getItem(patientId), "month" : month };
    
    
    appointmentModel.fetch({ type : postMethod, success : appointmentListSuccess, error : appointmentListError, data : JSON.stringify(appointmentJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}

$('#patient_appointment').live('pageshow', function(event) {
                               backPath = "patient_appointment";
                               cnt = 0;
                               expand = false;
                               openCalender();
                               
                               });

function openCalender() {
    setTimeout(function() {
               $('#datepicker').datepicker({ showOtherMonths : true, dayNamesMin : [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ], onSelect : function(dateText, inst) {
                                           
                                           $("#content").html("");
                                           var divDate = new Date(dateText);
                                           
                                           currentDate(divDate);
                                           
                                           $("#apptContent").html("");
                                           var apptDetailsView = new appointment.AppointmentListsView();
                                           }, onChangeMonthYear : function(year, month, inst) {
                                           $("#apptContent").html("");
                                           changeMonth = 1;
                                           initAppoint(month);
                                           dateMonth = month;
                                           } });
               var date = new Date();
               var dformat = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ].join('/') + ' ' + [ date.getHours(), date.getMinutes(), date.getSeconds() ].join(':');
               var i = dformat.slice(0, 10).split('/');
               var monthCur = date.getMonth() + 1;
               var dayCur = date.getDate();
               var crrHour = date.getHours();
               var monthName = shortMonthNames[monthCur - 1];
               $("#hexagonAppt").html("<center>" + monthName + " " + dayCur + "</center>");
               initAppoint(monthCur);
               }, 200);
}

$('#appointment_details').live('pagebeforeshow', function() {
                               cnt = 0;
                               var appointmentDetailsContainer = $('#appointment_details').find(":jqmData(role='content')");
                               var apptId = storage.getItem("apptId");
                               appointmentModel = collection.get(apptId);
                               var apptDetailsView = new appointment.AppointmentDetailsView({ model : appointmentModel, viewContainer : appointmentDetailsContainer });
                               apptDetailsView.render();
                               });


function highLight() {
    $(".imgAppt").remove();
    $(".ui-state-default").each(function() {
                                if (changeMonth == 0) {
                                var d = new Date();
                                var n = d.getMonth() + 1;
                                var dateMonths;
                                if (parseInt($(this).text()) < 10) {
                                dateMonths = n + "-0" + $(this).text();
                                } else {
                                dateMonths = n + "-" + $(this).text();
                                }
                                } else {
                                var dateMonths = dateMonth + "-" + $(this).text();
                                }
                                for ( var k = 0; k < dateArr.length; k++) {
                                
                                if (dateMonths == dateArr[k]) {
                                if (!$(this).parent().hasClass('ui-state-disabled')) {
                                if (endDateArr[k] != "NA") {
                                $(this).parent().append("<img src='../../images/bluedot.png' class='imgAppt' style='z-index:9999;position:absolute;float: left;margin-left: -17px;margin-top:1px;'>");
                                } else {
                                if (!$(this).hasClass('ui-state-active')) {
                                
                                $(this).addClass('ui-state-need');
                                }
                                }
                                }
                                }
                                }
                                
                                });
    
}


/*************Patient Appointment Ends Here**************/


/*************Patient Action Starts Here**************/


function initAction(date) {
    var actionModel = new action.Action({});
    
    actionListSuccess = function() {
	    $("#addAction").addClass("block").removeClass("none");
	    actionDetailsList = JSON.stringify(actionModel.get("action"));
	    if (!medication.medicationTimeList) {
            getMedicationTime();
	    }
	    actionDetailsList = eval(" (" + actionDetailsList + ") ");
	    new action.ActionListView({ actionCollection : actionDetailsList });
    };
    
    actionListError = function() {
	    alert(serverErrorMessage);
    };
    
    var actionJSON = { patientId : storage.getItem(patientId), "date" : date };
    
    actionModel.fetch({ type : postMethod, success : actionListSuccess, error : actionListError, data : JSON.stringify(actionJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
}


$('#patient_action').live('pageshow', function(event) {
                          backPath = "patient_action";
                          if (!action.isEditAction) {
                          pageName = 'patient_action';
                          
                          cnt = 0;
                          var disDate = getDisplayDateMonth(action.selectedDate);
                          $("#actionsDateContent").html(disDate);
                          setTimeout(function() {
                                     initAction(getCurrentDate(action.selectedDate));
                                     }, 200);
                          calCheck = 0;
                          $("#actionsDateContent").live("click", function() {
                                                        openNewCalenderMedActn('hexagonActn');
                                                        });
                          $("#prevAction").off();
                          $("#prevAction").live("tap", function(){
                                                var prevDate = action.selectedDate;
                                                prevDate = getPrevDate(prevDate);
                                                action.selectedDate = prevDate;
                                                
                                                var disDate = getDisplayDateMonth(action.selectedDate);
                                                $("#actionsDateContent").html(disDate);
                                                setTimeout(function() {
                                                           initAction(getCurrentDate(action.selectedDate));
                                                           }, 200);
                                                });
                          $("#nextAction").off();
                          $("#nextAction").live("tap", function(){
                                                var nextDate = action.selectedDate;
                                                nextDate = getNextDate(nextDate);
                                                action.selectedDate = nextDate;
                                                
                                                var disDate = getDisplayDateMonth(action.selectedDate);
                                                $("#actionsDateContent").html(disDate);
                                                setTimeout(function() {
                                                           initAction(getCurrentDate(action.selectedDate));
                                                           }, 200);
                                                });
                          }
                          });


$('#patient_action_details').live('pagebeforeshow', function() {
                                  cnt = 0;
                                  var actionDetailsContainer = $('#patient_action_details').find(":jqmData(role='actionDetailContent')");
                                  var actionId = storage.getItem("actnId");
                                  actionModel = actionCollection.get(actionId);
                                  if (actionModel.get("type") == "act" || (actionModel.get("type") == "exe" && actionModel.get("createdBy") == storage.getItem("userId"))) {
                                  $("#editAction").addClass("block").removeClass("none");
                                  } else {
                                  $("#deleteAction").addClass("none").removeClass("block");
                                  }
                                  
                                  if (actionModel.get("type") == "act" || actionModel.get("type") == "exe") {
                                  $("#editAction").addClass("block").removeClass("none");
                                  } else {
                                  $("#editAction").addClass("none").removeClass("block");
                                  }
                                  
                                  var actnDetailsView = new action.actionDetailsView({ model : actionModel, viewContainer : actionDetailsContainer });
                                  actnDetailsView.render();
                                  });

/*************Patient Action Ends Here**************/



/*************Patient Medication Starts Here**************/

function getDosageType() {
    var dosageTypeModel = new medication.DosageType({});
    
    dosageTypeListSuccess = function() {
	    dosageTypeDetailsList = JSON.stringify(dosageTypeModel.get("dosetype"));
	    medication.dosageTypeList = eval(" (" + dosageTypeDetailsList + ") ");
    };
    
    dosageTypeListError = function() {
	    alert(serverErrorMessage);
    };
    
    dosageTypeModel.fetch({ type : postMethod, success : dosageTypeListSuccess, error : dosageTypeListError, contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}

function getMedicationTime() {
    var medicationTimeModel = new medication.MedicationTime({});
    
    medicationTimeListSuccess = function() {
	    medicationTimeDetailsList = JSON.stringify(medicationTimeModel.get("medtime"));
	    medication.medicationTimeList = eval(" (" + medicationTimeDetailsList + ") ");
    };
    
    medicationTimeListError = function() {
	    alert(serverErrorMessage);
    };
    
    medicationTimeModel.fetch({ type : postMethod, success : medicationTimeListSuccess, error : medicationTimeListError, contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}

function getMedicinesList() {
    var medicineModel = new medication.Medicine({});
    
    medicineListSuccess = function() {
	    medicineDetailsList = JSON.stringify(medicineModel.get("meds"));
	    medication.medicineList = eval(" (" + medicineDetailsList + ") ");
    };
    
    medicineListError = function() {
	    alert(serverErrorMessage);
    };
    
    medicineModel.fetch({ type : postMethod, success : medicineListSuccess, error : medicineListError, contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}

function initMed(date) {
    prevMedCnt = 0;
    currMedCnt = 0;
    nextMedCnt = 0;
    maxPrevCharacter = "";
    maxNextCharacter = "";
    $(".medName").html("");
    var medicationModel = new medication.Medication({});
    
    medicationListSuccess = function() {
	    if (!medication.dosageTypeList) {
            getDosageType();
	    }
        
	    if (!medication.medicationTimeList) {
            getMedicationTime();
	    }
        
	    if (!medication.medicineList) {
            getMedicinesList();
	    }
        
	    medicationDetailsList = JSON.stringify(medicationModel.get("patientmed"));
        //alert(medicationDetailsList);
	    medicationDetailsList = eval(" (" + medicationDetailsList + ") ");
	    new medication.MedicationListView({ medCollection : medicationDetailsList });
    };
    
    medicationListError = function() {
	    alert(serverErrorMessage);
    };
    
    //var today = date;
    //month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    //date = (today.getDate()) < 10 ? '0' + (today.getDate()) : (today.getDate());
    var medicationJSON = { patientId : storage.getItem(patientId), "date" : date };
    
    medicationModel.fetch({ type : postMethod, success : medicationListSuccess, error : medicationListError, data : JSON.stringify(medicationJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
}

$("#patient_medicine").live('pageshow', function() {
    backPath = "patient_medicine";
    expand = false;
    var disDate = getDisplayDateMonth(medication.selectedDate);
    $("#medicationDateContent").html(disDate);
    setTimeout(function() {
        initMed(getCurrentDate(medication.selectedDate));
    }, 200);
    calCheck = 0;
    $("#medicationDateContent").live("click", function() {
            openNewCalenderMedActn('hexagonMed');
    });
 
    medActnTable("medicines", "MedActn", "");
                            
    $("#prevMedication").live("tap", function(){
            var prevDate = medication.selectedDate;
            prevDate = getPrevDate(prevDate);
            medication.selectedDate = prevDate;
                                                      
            var disDate = getDisplayDateMonth(medication.selectedDate);
            $("#medicationDateContent").html(disDate);
            setTimeout(function() {
                    initMed(getCurrentDate(medication.selectedDate));
            }, 200);
    });
    $("#nextMedication").live("tap", function(){
            var nextDate = medication.selectedDate;
            nextDate = getNextDate(nextDate);
            medication.selectedDate = nextDate;
                                                      
            var disDate = getDisplayDateMonth(medication.selectedDate);
            $("#medicationDateContent").html(disDate);
            setTimeout(function() {
                       initMed(getCurrentDate(medication.selectedDate));
            }, 200);
    });
});


function medActnTable(name, shortName, abbr) {
    contentBefore = "";
    contentAtTime = "";
    contentAfter = "";
    var date = new Date();
    var currTime = date.getHours();
    var cont = '<div id="beforeMedTime" style="width:100%;height:auto;"></div>'+
    '<div id="atMedTime" style="width:100%;height:auto;"></div>'+
    '<div id="afterMedTime" style="width:100%;height:auto;"></div>';
    $("#medicationContent").html(cont);
    var i;
    var idTime;
    for(i = 1; i<=24; i++){
        if(i > 12){
            idTime = i - 12;
            idTime = idTime+":00 pm";
        }else if(i == 12){
            idTime = i;
            idTime = idTime+":00 pm";
        }else{
            idTime = i;
            idTime = idTime+":00 am";
        }
        $("#beforeMedTime").html("");
        $("#atMedTime").html("");
        $("#afterMedTime").html("");
        
        if(i < currTime){
            contentBefore = contentBefore+'<div id="'+i+'_div" class="fl prevMed"><div class="answerMedPrev"><span class="fl font14" style="margin-left:2%;margin-top:5px;">'+idTime+'</span><div id="wrongAnsPrev" class="fr wrongAns"><img class="fr iconClose" src="../../images/icon_redcross.png" width="20px" height="20px"></div><div id="correctAns" class="fr correctAns"><img class="fr iconClose" src="../../images/icon_right.png" width="20px" height="20px"></div></div><div id="'+i+'_text" class="fl" style="width:100%;height:auto;display:inline-block;"></div></div>';
        }else if(i == currTime){
            contentAtTime = contentAtTime+'<div id="'+i+'_div" class="fl fullMedActnDiv currMedActn"><div class="answerMed"><span class="fl font14" style="margin-left:2%;margin-top:5px;color:#fff;">'+idTime+'</span><div id="wrongAns" class="fr wrongAns"><img class="fr iconClose" src="../../images/icon_redcross.png" width="20px" height="20px"></div><div id="correctAns" class="fr correctAns"><img class="fr iconClose" src="../../images/icon_right.png" width="20px" height="20px"></div></div><div id="'+i+'_text" class="fl" style="width:100%;height:auto;display:inline-block;"></div></div>';
        }else{
            contentAfter = contentAfter+'<div id="'+i+'_div" class="fl fullMedActnDiv"><div class="answerMedNext"><span class="fl font14" style="margin-left:2%;margin-top:5px;">'+idTime+'</span><div id="wrongAnsNext" class="fr wrongAns none" onclick="showRefillRequest()"><img class="fr iconClose" src="../../images/pill_bottle.png" width="17px" height="20px"></div></div><div id="'+i+'_text" class="fl" style="width:100%;height:auto;display:inline-block;"></div></div>';
        }
        $("#"+i+"_text").html("");
    }
    $("#beforeMedTime").html(contentBefore);
    $("#atMedTime").html(contentAtTime);
    $("#afterMedTime").html(contentAfter);
}


function showRefillRequest(){
    closeDetMedDiv();
    setTimeout(function() {
               gotoPath("#patient_medicine_refill");
    }, 200);
}

function closeDetMedDiv(){
    $('#patient_medication_details').css("display", "none");
    $('#headerMedDetailClose').css("display", "none");
    $("#detInboxMask").fadeOut(300);  
    $("#detInboxMask").remove();
    $('#patient_medication_details').find(":jqmData(role='content')").html("");
}


$("#patient_medicine_refill").live('pageshow', function() {
        backPath = "patient_medicine";
        new medication.MedicationRefillList({ medCollection : medicationDetailsList });                    
});

/*$('#patient_medication_details').live('pagebeforeshow', function() {
                                      cnt = 0;
                                      var medicationDetailsContainer = $('#patient_medication_details').find(":jqmData(role='content')");
                                      var medicationId = storage.getItem("medicationId");
                                      medicationModel = medication.medicationtList.get(medicationId);
                                      var medDetailsView = new medication.MedicationDetailsView({ model : medicationModel, viewContainer : medicationDetailsContainer });
                                      medDetailsView.render();
                                      });*/

/*************Patient Medication Ends Here**************/



$(function() {
  $("#login_submit").live("tap", function(event) {
                          cnt = 0;
                          event.preventDefault();
                          var username = $('#login_username').val().trim();
                          var password = $('#login_password').val();
                          if (username == '' || password == '') {
                          $("#login_invalid_error_message").removeClass("block").addClass("none");
                          $("#account_blocked").removeClass("block").addClass("none");
                          $("#login_error_message").removeClass("none").addClass("block");
                          return false;
                          } else {
                          $("#login_invalid_error_message").removeClass("block").addClass("none");
                          $("#account_blocked").removeClass("block").addClass("none");
                          $("#login_error_message").removeClass("block").addClass("none");
                          
                          loginFailed = loginFailed + 1;
                          authenticateUser(username, password);
                          }
                          });
  
  $("#login_link").click(function(event) {
                         gotoPath('#login');
                         });
  
  
  
  /********************Appointment Backbone Starts Here*********************/
  
  changeMonth = 0;
  
  appointment.prevApptTime = "";
  
  appointment.Appointment = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetAppointment, defaults : { duration : "" } });
  
  appointment.AddAppointment = Backbone.Model.extend({ urlRoot : window.servicePath + urlSaveAppointment });
  
  appointment.Deleteappointment = Backbone.Model.extend({ urlRoot : window.servicePath + urlDeleteAppointment });
  
  appointment.EditAppointment = Backbone.Model.extend({ urlRoot : window.servicePath + urlEditAppointment });
  
  appointment.AppointmentList = Backbone.Collection.extend({ model : appointment.Appointment });
  
  appointment.AppointmentListCalView = Backbone.View.extend({ el : $("#appointmentList"), // attaches `this.el` to an existing
                                                            // element.
                                                            events : { "click a" : "clicked" },
                                                            
                                                            initialize : function() {
                                                            if (collection == "") {
                                                            reviewsCollection = new appointment.AppointmentList(this.options.apptCollection);
                                                            this.collection = reviewsCollection;
                                                            collection = reviewsCollection;
                                                            
                                                            } else {
                                                            this.collection = collection;
                                                            }
                                                            this.render();
                                                            
                                                            },
                                                            
                                                            render : function() {
                                                            var self = this;
                                                            _(this.collection.models).each(function(item) { // in case
                                                                                           // collection
                                                                                           // is not
                                                                                           // empty
                                                                                           self.appendItem(item);
                                                                                           }, this);
                                                            dateArr = removeDuplicate(dateArr);
                                                            
                                                            setTimeout(highLight, 200);
                                                            
                                                            },
                                                            
                                                            appendItem : function(item) {
                                                            this.model = item;
                                                            var apptId = item.get("id");
                                                            var creationdate = item.get('startdate');
                                                            apptEndndate = item.get('enddate');
                                                            var appDate;
                                                            var s = creationdate.replace(/[ :]/g, "-").split("-"),
                                                            appDate = new Date(s[0], s[1], s[2], s[3], s[4], s[5]);
                                                            var month = appDate.getMonth();
                                                            var year = appDate.getFullYear();
                                                            var day = appDate.getDate();
                                                            if (day < 10) {
                                                            day = "0" + day;
                                                            } else {
                                                            day = day;
                                                            }
                                                            var arrDate;
                                                            if (month < 10) {
                                                            // dates = year+"-0"+month+"-"+day;
                                                            arrDate = month + "-" + day;
                                                            } else {
                                                            // dates = year+"-"+month+"-"+day;
                                                            arrDate = month + "-" + day;
                                                            }
                                                            
                                                            var divDate = new Date();
                                                            currentDate(divDate);
                                                            dateArr.push(arrDate);
                                                            if (apptEndndate == "") {
                                                            endDateArr.push("NA");
                                                            } else {
                                                            endDateArr.push(apptEndndate);
                                                            }
                                                            var d = new Date();
                                                            var n = d.getMonth();
                                                            
                                                            var d = new Date();
                                                            var yyyy = d.getFullYear().toString();
                                                            var mm = (d.getMonth() + 1).toString(); // getMonth() is
                                                            // zero-based
                                                            var dd = d.getDate().toString();
                                                            var today = yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
                                                            if (mm == dateMonth) {
                                                            if (today == dates) {
                                                            setTimeout(function() {
                                                                       var apptDetailsView = new appointment.AppointmentListsView();
                                                                       }, 500);
                                                            }
                                                            }
                                                            
                                                            },
                                                            
                                                            clicked : function(e) {
                                                            e.preventDefault();
                                                            },
                                                            
                                                            });
  
  appointment.AppointmentListsView = Backbone.View
  .extend({ el : $("#apptContent"), // attaches `this.el` to an existing
          // element.
          events : { "click a" : "clicked" },
          
          initialize : function() {
          this.collection = collection;
          this.render();
          },
          
          render : function() {
          var self = this;
          $("#apptContent").html("");
          content = "";
          content = content + '<table width="100%"><tbody id="appointmentTable">';
          _(this.collection.models).each(function(item) { // in case
                                         // collection
                                         // is not
                                         // empty
                                         self.appendItem(item);
                                         }, this);
          content = content + '</tbody></table>';
          
          $("#apptContent").html(content);
          
          setTimeout(highLight, 200);
          
          },
          
          appendItem : function(item) {
          this.model = item;
          var apptId = item.get("id");
          var creationdate = item.get('startdate');
          var ind = creationdate.indexOf(" ");
          var appDate;
          var s = creationdate.replace(/[ :]/g, "-").split("-"),
          appDate = new Date( s[0], s[1], s[2], s[3], s[4], s[5] );
          var month = appDate.getMonth();
          
          var year = appDate.getFullYear();
          var day = appDate.getDate();
          var crdates;
          var monthName;
          if (month < 10) {
          if (day < 10) {
          crdates = year + "-0" + month + "-0" + day;
          } else {
          crdates = year + "-0" + month + "-" + day;
          }
          } else {
          if (day < 10) {
          crdates = year + "-" + month + "-0" + day;
          } else {
          crdates = year + "-" + month + "-" + day;
          }
          }
          if (day < 10) {
          monthName = shortMonthNames[month - 1] + " 0" + day;
          } else {
          monthName = shortMonthNames[month - 1] + " " + day;
          }
          if (crdates == dates) {
          var ind = creationdate.indexOf(" ");
          creationDate = creationdate.substr(0, ind);
          
          var ind1 = creationdate.indexOf(":");
          creationHour = (creationdate.substr(ind + 1, 2));
          var minutes = (creationdate.substr(ind1 + 1, 2));
          var day = creationHour < 12 ? 'am' : 'pm';
          
          var hrId = creationHour < 13 ? creationHour : creationHour - 12;
          var apptTime = hrId + ":" + minutes + " " + day;
          
          var docName = item.get("doctor").firstName + " " + item.get("doctor").lastName;
          content = content + '<tr style="border-bottom: 1px solid #EFEFEF !important;"><td><div class="apptListDiv"><div id="appointmentTime"><span id="timeImage"><img src="../../images/bluedot.png" alt="" class="footerButtonImage fl"></span><span id="time" class="fl apptDate">' + monthName + '</span><div class="startTimeAppt startTimeApptList fl">' + apptTime + '</div></div><div id="appointmentData" class ="fl"><span id="doctorName" class="fl"><a data-pancakes="' + apptId + '" href="#" style="text-decoration:none;color:#000;">Dr. ' + docName + '</a></span><br><span id="therapy">' + item
          .get("specialty").name + '</span></div></div></a></td></tr>';
          
          }
          
          },
          
          clicked : function(e) {
          e.preventDefault();
          var apptId = $(e.target).data('pancakes');
          storage.setItem("apptId", apptId);
          backPath = "patient_appointment";
          gotoPath('#appointment_details');
          },
          
          });
  
  appointment.AppointmentDetailsView = Backbone.View.extend({
                                                            // since this template will render inside a div, we don't need to
                                                            // specify a tagname
                                                            initialize : function() {
                                                            this.template = _.template($('#appointment_details_template').html());
                                                            },
                                                            
                                                            render : function() {
                                                            var container = this.options.viewContainer, activity = this.model;
                                                            var creationdate = activity.get('startdate');
                                                            var endndate = activity.get('enddate');
                                                            var appDate, appEndDate;
                                                            var s = creationdate.replace(/[ :]/g, "-").split("-"),
                                                            appDate = new Date( s[0], s[1], s[2], s[3], s[4], s[5] );
                                                            var s = endndate.replace(/[ :]/g, "-").split("-"),
                                                            appEndDate = new Date( s[0], s[1], s[2], s[3], s[4], s[5] );
                                                            var month = appDate.getMonth();
                                                            var year = appDate.getFullYear();
                                                            var startTimeHr = appDate.getHours() < 10 ? '0' + appDate.getHours() : appDate.getHours();
                                                            var startTimeMnt = appDate.getMinutes() < 10 ? '0' + appDate.getMinutes() : appDate.getMinutes();
                                                            var endtTimeHr = appEndDate.getHours() < 10 ? '0' + appEndDate.getHours() : appEndDate.getHours();
                                                            var endtTimemnt = appEndDate.getMinutes() < 10 ? '0' + appEndDate.getMinutes() : appEndDate.getMinutes();
                                                            var weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
                                                            dayName = weekday[appDate.getDay()];
                                                            dayString = dayName + ", " + monthNames[month] + ", " + year + "<br/> from " + startTimeHr + ":" + startTimeMnt + " to " + endtTimeHr + ":" + endtTimemnt;
                                                            activity.set("day", dayName);
                                                            activity.set("month", shortMonthNames[month - 1] + " " + appDate.getDate());
                                                            activity.set("year", year);
                                                            activity.set("start", startTimeHr + ":" + startTimeMnt);
                                                            if(endndate != "" && endndate != null){
                                                            activity.set("end", endtTimeHr + ":" + endtTimemnt);
                                                            }else{
                                                            activity.set("end", "NA");
                                                            }
                                                            remindMeData1 = activity.get('reminder1');
                                                            var remindMetype1 = remindMeData1.substr(remindMeData1.indexOf("#") + 1);
                                                            if (remindMetype1 == "H") {
                                                            remindMetype1 = "Hours";
                                                            } else {
                                                            remindMetype1 = "Days";
                                                            }
                                                            remindMeData1 = remindMeData1.substr(0, remindMeData1.indexOf("#")) + " " + remindMetype1;
                                                            
                                                            renderedContent = this.template(this.model.toJSON());
                                                            container.html(renderedContent);
                                                            container.trigger('create');
                                                            return this;
                                                            } });
  
  actionCalendar.ActionDateModel = Backbone.Model.extend({ defaults : { actionDate : (new Date()).toString('dddd, MMMM , yyyy'), } });
  actionCalendar.ActionDateView = Backbone.View.extend({ initialize : function() {
                                                       this.template = _.template($('#action_date_template').html());
                                                       this.model = new actionCalendar.ActionDateModel();
                                                       },
                                                       
                                                       render : function() {
                                                       var d = new Date();
                                                       var date = d.getDate();
                                                       var m = monthNames[d.getMonth()];
                                                       var year = d.getFullYear();
                                                       this.model.set("actionDate", m + " " + date + ", " + year);
                                                       var renderedContent = this.template(this.model.toJSON());
                                                       return this;
                                                       } });
  
  
  /********************Appointment Backbone Ends Here*********************/
  
  
  /********************Action Backbone Starts Here*********************/
  pinLock.PinLock = Backbone.Model.extend({ urlRoot : window.servicePath + urlSaveLock });
  
  //pinLock.getPinLock = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetLock });
  
  action.Alarm = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetAction });
  
  action.AlarmList = Backbone.Collection.extend({ model : action.Alarm });
  
  action.Action = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetAction });
  
  action.ActionList = Backbone.Collection.extend({ model : action.Action });
  
  action.AddAction = Backbone.Model.extend({ urlRoot : window.servicePath + urlAddAction });
  
  action.DeleteAction = Backbone.Model.extend({ urlRoot : window.servicePath + urlDeleteAction });
  
  action.selectedDate = new Date();
  
  action.isEditAction = false;
  
  action.AlarmListView = Backbone.View.extend({ el : $("#appHomePagePortrait"), events : { },
                                              
                                              initialize : function() {
                                              action.actionList = new action.AlarmList(this.options.alarmCollection);
                                              this.collection = action.actionList;
                                              actionCollection = action.actionList;
                                              this.render();
                                              },
                                              
                                              render : function() {
                                              self = this;
                                              _(this.collection.models).each(function(item) {
                                                                             self.appendItem(item);
                                                                             }, this);
                                              
                                              
                                              $("#show-case").html(alertContent);
                                              $('.imgs:gt(0)').hide();
                                              setTimeout(function() {
                                                         setInterval(function() {
                                                                     $(".imgs:first-child").fadeOut(3000).next(".imgs").fadeIn(3000).end().appendTo("#show-case")
                                                                     }, 4000);
                                                         }, 1000);
                                              return this;
                                              },
                                              
                                              appendItem : function(item) {
                                              this.model = item;
                                              var id = item.get("id");
                                              var date = new Date();
                                              var dformat = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ].join('/') + ' ' + [ date.getHours(), date.getMinutes(), date.getSeconds() ].join(':');
                                              var i = dformat.slice(0, 10).split('/');
                                              var yearCur = date.getFullYear();
                                              var monthCur = date.getMonth() + 1;
                                              var dayCur = date.getDate();
                                              var crrHour = date.getHours();
                                              var monthName = shortMonthNames[monthCur - 1];
                                              myDate = yearCur + '/' + monthCur + '/' + dayCur;
                                              timeArray = item.get("timeArray");
                                              timeArray = timeArray.split(",");
                                              for ( var i = 0 in timeArray) {
                                              time = timeArray[i];
                                              if (time != null && time != "") {
                                              var time2 = Date.parse(myDate + ' ' + time);
                                              var ind = time.indexOf(":");
                                              var substrng = time.substr(ind, 4);
                                              var timeId = time.replace(substrng, "_").toLowerCase();
                                              type = "";
                                              img = "../../images/icon_activity.png";
                                              subType1 = item.get('subType1');
                                              subType2 = item.get("subType2");
                                              if (item.get("type") == "exe") {
                                              //subType1 = exercise.exerciseList[(parseInt(subType1) - 1)].name;
                                              type = "Exercise";
                                              img = "../../images/icon_walk.png";
                                              subType2 = subType2 + " min";
                                              } else if (item.get("type") == "act") {
                                              type = "Action";
                                              img = "../../images/icon_activity.png";
                                              subType2 = "";
                                              } else if (item.get("type") == "appt") {
                                              type = "Appointment";
                                              img = "../../images/icon_calender.png";
                                              subType1 = "With " + subType1;
                                              } else if (item.get("type") == "need") {
                                              type = "Need";
                                              img = "../../images/icon_calender.png";
                                              subType1 = "With " + subType1;
                                              } else if (item.get("type") == "med") {
                                              type = "Medication";
                                              img = "../../images/icon_pills.png";
                                              } else if (item.get("type") == "vit") {
                                              type = "Vital";
                                              }
                                              
                                              
                                              var currTime = Date.parse(new Date());
                                              if(time2 > currTime){
                                              alertContent  = alertContent+'<li class="imgs">You have '+type+' at '+time+'</li>';      
                                              }
                                              
                                              }
                                              }
                                              },
                                              
                                              });
  
  action.ActionListView = Backbone.View.extend({ el : $("#actionContent"), events : { "click .actionName" : "clickedAction" },
                                               
                                               initialize : function() {
                                               action.actionList = new action.ActionList(this.options.actionCollection);
                                               this.collection = action.actionList;
                                               actionCollection = action.actionList;
                                               this.render();
                                               },
                                               
                                               render : function() {
                                               var currentDate = action.selectedDate;
                                               hr = currentDate.getHours();
                                               var cont = '<div id="beforeTime" style="width:100%;height:auto;"></div>'+
                                               '<div id="afterTime" style="width:100%;height:auto;"></div>';
                                               $("#actionContent").html(cont);
                                               contentBefore = "";
                                               contentAfter = "";
                                               self = this;
                                               _(this.collection.models).each(function(item) {
                                                                              self.appendItem(item);
                                                                              }, this);
                                               
                                               
                                               $("#beforeTime").html(contentBefore);
                                               $("#afterTime").html(contentAfter);
                                               return this;
                                               },
                                               
                                               appendItem : function(item) {
                                               this.model = item;
                                               //alert(JSON.stringify(item));
                                               var id = item.get("id");
                                               var date = new Date();
                                               //if (name == "action") {
                                               //  date = new Date(action.selectedDate);
                                               //}
                                               var dformat = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ].join('/') + ' ' + [ date.getHours(), date.getMinutes(), date.getSeconds() ].join(':');
                                               var i = dformat.slice(0, 10).split('/');
                                               var yearCur = date.getFullYear();
                                               var monthCur = date.getMonth() + 1;
                                               var dayCur = date.getDate();
                                               var crrHour = date.getHours();
                                               var monthName = shortMonthNames[monthCur - 1];
                                               myDate = yearCur + '/' + monthCur + '/' + dayCur;
                                               timeArray = item.get("timeArray");
                                               timeArray = timeArray.split(",");
                                               for ( var i = 0 in timeArray) {
                                               time = timeArray[i];
                                               if (time != null && time != "") {
                                               var time2 = Date.parse(myDate + ' ' + time);
                                               var ind = time.indexOf(":");
                                               var substrng = time.substr(ind, 4);
                                               var timeId = time.replace(substrng, "_").toLowerCase();
                                               type = "";
                                               img = "../../images/icon_activity.png";
                                               subType1 = item.get('subType1');
                                               subType2 = item.get("subType2");
                                               if (item.get("type") == "exe") {
                                               //subType1 = exercise.exerciseList[(parseInt(subType1) - 1)].name;
                                               type = "Exercise";
                                               img = "../../images/icon_walk.png";
                                               subType2 = subType2 + " min";
                                               } else if (item.get("type") == "act") {
                                               type = "Action";
                                               img = "../../images/icon_activity.png";
                                               subType2 = "";
                                               } else if (item.get("type") == "appt") {
                                               type = "Appointment";
                                               img = "../../images/icon_calender.png";
                                               subType1 = "With " + subType1;
                                               } else if (item.get("type") == "need") {
                                               type = "Need";
                                               img = "../../images/icon_calender.png";
                                               subType1 = "With " + subType1;
                                               } else if (item.get("type") == "med") {
                                               type = "Medication";
                                               img = "../../images/icon_pills.png";
                                               } else if (item.get("type") == "vit") {
                                               type = "Vital";
                                               }
                                               
                                               //actionName = '<div class="actionBlock"><div class="actionBlockImage"><img src="' + img + '" width="20px" height="20px"></div><div class="actionBlockContent"><span class="actionName" data-pancakes="' + id + '">' + type + ' <br/>' + subType1 + '  ' + subType2 + '</span></div></div>';
                                               
                                               var currTime = Date.parse(new Date());
                                               if(time2 < currTime){
                                               contentBefore = contentBefore+'<div class="actionBlock" style="width:49%;float:left;border-bottom: 2px solid #EFEFEF !important;border-left: 2px solid #EFEFEF !important;"><div class="actionBlockImage"><img src="' + img + '" width="20px" height="20px"></div><div class="actionBlockContent"><span class="actionName" data-pancakes="' + id + '">' + type + ' <br/>' + subType1 + '  ' + subType2 + '</span></div></div>';
                                               }else{
                                               contentAfter = contentAfter+'<div class="actionBlock" style="width:100%;border-bottom: 2px solid #EFEFEF !important;"><div class="actionBlockImage"><img src="' + img + '" width="20px" height="20px"></div><div class="actionBlockContent"><span class="actionName" data-pancakes="' + id + '">' + type + ' <br/>' + subType1 + '  ' + subType2 + '</span></div></div>';
                                               }
                                               //alert(time2+"-"+currTime);
                                               
                                               }
                                               }
                                               },
                                               
                                               clickedAction : function(e) {
                                               e.preventDefault();
                                               var actnId = $(e.target).data('pancakes');
                                               storage.setItem("actnId", actnId);
                                               backPath = "patient_action";
                                               gotoPath('#patient_action_details');
                                               }, });
  
  action.actionDetailsView = Backbone.View.extend({ initialize : function() {
                                                  this.template = _.template($('#action_details_template').html());
                                                  },
                                                  
                                                  render : function() {
                                                  var container = this.options.viewContainer;
                                                  activity = this.model;
                                                  var type = activity.get('type');
                                                  var weekday = new Array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
                                                  var title1, title2, title3, title4, title5, title6, title7, title8, title9, title10;
                                                  if (type == "med") {
                                                  
                                                  title1 = "Medicine Name";
                                                  title2 = "Dosage";
                                                  title3 = "Time";
                                                  title4 = "Frequency";
                                                  title5 = "Reminder 1";
                                                  title6 = "Reminder 2";
                                                  title7 = "Duration";
                                                  title8 = "Days";
                                                  title8 = "Days";
                                                  title9 = "Description";
                                                  title10 = "period";
                                                  var days = activity.get('medDays');
                                                  days = days.replace(/false/g, "0");
                                                  days = days.replace(/true/g, "1");
                                                  days = days.split("#");
                                                  var dayCnt = 0;
                                                  var medDays = new Array();
                                                  for ( var i = 0; i < days.length; i++) {
                                                  if (days[i] == 1) {
                                                  medDays.push(weekday[i]);
                                                  dayCnt = 1;
                                                  
                                                  }
                                                  }
                                                  if (dayCnt = 1) {
                                                  medDays = medDays.toString();
                                                  activity.set("medDays", medDays);
                                                  } else {
                                                  activity.set("medDays", "NA");
                                                  }
                                                  
                                                  var freqDet = activity.get("actionType").split("#");
                                                  var freqn = new Array();
                                                  var freqCnt = freqDet.length;
                                                  if (freqCnt > 0) {
                                                  for ( var t = 0; t < freqDet.length; t++) {
                                                  freqn.push(medication.medicationTimeList[freqDet[t]].name);
                                                  }
                                                  freqn = freqn.toString();
                                                  activity.set("actionType", freqn);
                                                  } else {
                                                  activity.set("actionType", "NA");
                                                  }
                                                  
                                                  } else if (type == "vit") {
                                                  title1 = "Vital Name";
                                                  title2 = "Frequency";
                                                  title3 = "Time";
                                                  } else if (type == "exe") {
                                                  actionTypeId = activity.get("subType1");
                                                  title1 = "Exercise Name";
                                                  title2 = "Duration";
                                                  title3 = "Time";
                                                  title4 = "Frequency";
                                                  title7 = "Duration";
                                                  title9 = "Description";
                                                  title10 = "Intensity";
                                                  // activity.set("subType1", exercise.exerciseList[(activity.get("subType1") - 1)].name);
                                                  activity.set("subType2", activity.get("subType2") + " min");
                                                  } else if (type == "act") {
                                                  title1 = "Activity Name";
                                                  title2 = "Description";
                                                  title3 = "Time";
                                                  } else {
                                                  title1 = "Doctor Name";
                                                  title3 = "Time";
                                                  title4 = "Frequency";
                                                  title5 = "Reminder 1";
                                                  title6 = "Reminder 2";
                                                  title7 = "Duration";
                                                  title9 = "Description";
                                                  var reminder1 = getReminder(activity.get('remidner1'));
                                                  var reminder2 = getReminder(activity.get('remidner2'));
                                                  activity.set("remidner1", reminder1);
                                                  activity.set("remidner2", reminder2);
                                                  }
                                                  
                                                  if (type == "appt") {
                                                  var from = activity.get('fromDate');
                                                  var to = activity.get('toDate');
                                                  var fromDate = new Date(from).getFullYear() + "-" + new Date(from).getMonth() + "-" + new Date(from).getDay();
                                                  var toDate;
                                                  if (to != "") {
                                                  toDate = new Date(to).getFullYear() + "-" + new Date(to).getMonth() + "-" + new Date(to).getDay();
                                                  } else {
                                                  toDate = "NA";
                                                  }
                                                  activity.set("fromDate", fromDate);
                                                  activity.set("toDate", toDate);
                                                  }
                                                  
                                                  activity.set("title1", title1);
                                                  activity.set("title2", title2);
                                                  activity.set("title3", title3);
                                                  activity.set("title4", title4);
                                                  activity.set("title5", title5);
                                                  activity.set("title6", title6);
                                                  activity.set("title7", title7);
                                                  activity.set("title8", title8);
                                                  activity.set("title9", title9);
                                                  activity.set("title10", title10);
                                                  
                                                  renderedContent = this.template(this.model.toJSON());
                                                  container.html(renderedContent);
                                                  container.trigger('create');
                                                  return this;
                                                  } }); 
  
  
  /********************Action Backbone Ends Here*********************/
  
  
  
  /********************Medication Backbone Starts Here*********************/
  var medCnt;
  
  medication.medicationImg = "../../images/icon_pills.png";
  
  medication.selectedDate = new Date();
  
  medication.DosageType = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetDosage });
  
  medication.MedicationTime = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetMedTime });
  
  medication.Medication = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetMedication });
  
  medication.Medicine = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetMedicine });
  
  exercise.Exercise = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetExeType });
  
  state.State = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetStates });
  
  medication.AddMedication = Backbone.Model.extend({ urlRoot : window.servicePath + urlSaveMedication });
  
  medication.DeleteMedication = Backbone.Model.extend({ urlRoot : window.servicePath + urlDeleteMedication });
  
  medication.EditMedication = Backbone.Model.extend({ urlRoot : window.servicePath + urlEditMedication });
  
  medication.MedicationList = Backbone.Collection.extend({ model : medication.Medication });
  
  medication.MedicationListView = Backbone.View
  .extend({ el : $("#medicationContent"), events : { "click .medName" : "getMedicationDetails" }, initialize : function() {
          medication.medicationtList = new medication.MedicationList(this.options.medCollection);
          this.collection = medication.medicationtList;
          this.render();
          },
          
          render : function() {
          var currentDate = new Date();
          hr = currentDate.getHours();
          //var cont = '<div id="beforeMedTime" style="width:100%;height:auto;"></div>'+
          //'<div id="afterMedTime" style="width:100%;height:auto;"></div>';
          //$("#medicationContent").html(cont);
          contentBefore = "";
          contentAfter = "";
          checkTime = 0;
          oldMedHour = new Array();
          medCnt = 0;
          self = this;
          for(i = 1; i<=24; i++){
          $("#"+i+"_text").html("");
          }
          _(this.collection.models).each(function(item) {
                                         self.appendItem(item);
                                         }, this);
          //$("#beforeMedTime").html(contentBefore);
          //$("#afterMedTime").html(contentAfter);
          $("#medCnt").html(medCnt);
          return this;
          },
          
          appendItem : function(item) {
          this.model = item;
          
          var id = item.get("id");
          
          var date = new Date();
          var dformat = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ].join('/') + ' ' + [ date.getHours(), date.getMinutes(), date.getSeconds() ].join(':');
          var i = dformat.slice(0, 10).split('/');
          var yearCur = date.getFullYear();
          var monthCur = date.getMonth() + 1;
          var dayCur = date.getDate();
          var crrHour = date.getHours();
          var monthName = shortMonthNames[monthCur - 1];
          
          myDate = yearCur + '/' + monthCur + '/' + dayCur;
          for ( var i = 1; i <= 6; i++) {
          var time = "time" + i;
          
          time = item.get(time);
          var dateTime = myDate + ' ' + time;
         
          dateTime = dateTime.split("-");
          dateTime = dateTime.join("/");
          dateTime = new Date(dateTime);
          
          var medHour = dateTime.getHours();
          if (time != null && time != "") {
          
          var contentImg = "";
          var contentMed = "";
          var medImage = item.get("medication").medPicture;
          var isMissed = item.get("ismissed");
          var refillAlert = item.get("isrefillalert");
          var refillDate = item.get("refilldate");
          refillDate = new Date(refillDate);
          var diffDays = refillDate.getTime() - date.getTime();
          diffDays = diffDays / (1000 * 3600 * 24);
          var refillClass = "none";
          if(diffDays < 3){
                $("#refill_"+medHour).css("display", "block");
                var refillClass = "block";
          }
          medCnt = medCnt + 1;
          
          var medName = "";
          if(medHour < crrHour){
          if(isMissed == true){
            //if(oldMedHour.indexOf(medHour) < 0){
                oldMedHour.push(medHour);
                $("#"+medHour+"_div").css("display","block");
                contentMed = contentMed+'<div style="width:100%;float:left;height:30px;border-bottom: 1px solid #BFBFBF;border-top: 1px solid #F5F5F5;padding-top:8px;padding-bottom:8px;"><div class="fl" style="width:15%;"><img src="../../images/' + medImage + '" ></div><div class="fl" style="width:60%;padding-left:8%;"><span class="medName" style="font-size:18px;margin-top:15px;" data-pancakes="' + id + '">' + item
                    .get("medication").name +'</span></div><div class="fl '+refillClass+'" style="width:15%;" onclick="showRefillRequest()"><img src="../../images/pill_bottle.png" class="fr" /></div></div>';
                    
            $("#"+medHour+"_text").append(contentMed);
          }
          }else if(medHour == crrHour){
                $("#"+medHour+"_div").css("display","block");
                contentMed = contentMed+'<div style="width:100%;float:left;height:30px;border-bottom: 1px solid #BFBFBF;border-top: 1px solid #F5F5F5;padding-top:8px;padding-bottom:8px;"><div class="fl" style="width:15%;"><img src="../../images/' + medImage + '" ></div><div class="fl" style="width:60%;padding-left:8%;"><span class="medName" style="font-size:18px;margin-top:15px;" data-pancakes="' + id + '">' + item
                    .get("medication").name +'</span></div><div class="fl '+refillClass+'" style="width:10%;" onclick="showRefillRequest()"><img src="../../images/pill_bottle.png" class="fr" /></div></div>';
          
                $("#"+medHour+"_text").append(contentMed);
          }else{
                $("#"+medHour+"_div").css("display","block");
                maxNextCharacter = $("#"+medHour+"_text").text();
          
                if(maxNextCharacter.length > 21){
                    if(maxNextCharacter.length < 25){
                        medName = "...";
                    }else {
                        medName = "";
                    }
                }else{
                    medName = item.get("medication").name;
                }
                if(maxNextCharacter.length == 0){
                    contentMed = contentMed+'<span class="medNameNxt" style="font-size:18px;">' + medName +'</span>';
                }else{
                    if(medName != ""){
                        contentMed = contentMed+'<span class="medNameNxt" style="font-size:18px;">, ' + medName +'</span>';
                    }
                }
                $("#"+medHour+"_text").append(contentMed);
          }
          }
          }
          },
          
          getMedicationDetails : function(e) {
          e.preventDefault();
          var medicationId = $(e.target).data('pancakes');
          storage.setItem("medicationId", medicationId);
          backPath = "patient_medicine";
          $('#medicationContent').append('<div class="mask" id="detInboxMask" style="top:77px !important;"></div>');
          $("#detInboxMask").fadeIn(300);
          $('#detInboxMask').css("zIndex", 99999999);
          $('#detInboxMask').css("opacity", 0.8);
          $('#patient_medication_details').css("display", "block");
          $('#headerMedDetailClose').css("display", "block");
          var medicationDetailsContainer = $('#patient_medication_details').find(":jqmData(role='content')");
          var medicationId = storage.getItem("medicationId");
          medicationModel = medication.medicationtList.get(medicationId);
          var medDetailsView = new medication.MedicationDetailsView({ model : medicationModel, viewContainer : medicationDetailsContainer });
          medDetailsView.render();
          }
          
          });
  
  medication.MedicationDetailsView = Backbone.View.extend({ initialize : function() {
                                                          this.template = _.template($('#medication_details_template').html());
                                                          },
                                                          
                                                          render : function() {
                                                          var container = this.options.viewContainer;
                                                          activity = this.model;
                                                          var refillDate = activity.get("refilldate");
                                                          var date = new Date();
                                                          refillDate = new Date(refillDate);
                                                          var diffDays = refillDate.getTime() - date.getTime();
                                                          diffDays = diffDays / (1000 * 3600 * 24);
                                                          if(diffDays > 1){
                                                          diffDays = 2;
                                                          }else{
                                                          diffDays = 1;
                                                          } 
                                                          activity.set("newRefillDate", diffDays);
                                                          
                                                          renderedContent = this.template(this.model.toJSON());
                                                          
                                                          container.html(renderedContent);
                                                          container.trigger('create');
                                                          return this;
                                                          } });
  
  var contentMedRefill;
  
  medication.MedicationRefillList = Backbone.View
  .extend({ el : $("#medicationRefillContents"), events : {  }, initialize : function() {
          medication.medicationtList = new medication.MedicationList(this.options.medCollection);
            this.collection = medication.medicationtList;
            this.render();
          },
          
          render : function() {
            var currentDate = new Date();
            hr = currentDate.getHours();
            //var cont = '<div id="beforeMedTime" style="width:100%;height:auto;"></div>'+
            //'<div id="afterMedTime" style="width:100%;height:auto;"></div>';
            //$("#medicationContent").html(cont);
            contentBefore = "";
            contentAfter = "";
            checkTime = 0;
            oldMedHour = new Array();
            medCnt = 0;
            self = this;
            contentMedRefill = "";
                _(this.collection.models).each(function(item) {
                                         self.appendItem(item);
                                         }, this);
            
            $("#medCnt").html(medCnt);
            $("#medRifillList").html(contentMedRefill);
            return this;
          },
          
          appendItem : function(item) {
            this.model = item;
          
            var id = item.get("id");
          
            var date = new Date();
            var dformat = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ].join('/') + ' ' + [ date.getHours(), date.getMinutes(), date.getSeconds() ].join(':');
            var i = dformat.slice(0, 10).split('/');
            var yearCur = date.getFullYear();
            var monthCur = date.getMonth() + 1;
            var dayCur = date.getDate();
            var crrHour = date.getHours();
            var monthName = shortMonthNames[monthCur - 1];
          
            myDate = yearCur + '/' + monthCur + '/' + dayCur;
            for ( var i = 1; i <= 6; i++) {
                var time = "time" + i;
          
                time = item.get(time);
                var dateTime = myDate + ' ' + time;
          
                dateTime = dateTime.split("-");
                dateTime = dateTime.join("/");
                dateTime = new Date(dateTime);
          
                var medHour = dateTime.getHours();
                if (time != null && time != "") {
                    var medImage = item.get("medication").medPicture;
                    var isMissed = item.get("ismissed");
                    var isRefillAlert = item.get("isrefillalert");
                    var refillDate = item.get("refilldate");
                    refillDate = new Date(refillDate);
                    var diffDays = refillDate.getTime() - date.getTime();
                    diffDays = diffDays / (1000 * 3600 * 24);
                    if(diffDays > 1){
                        diffDays = 2;
                    }else{
                        diffDays = 1;
                    }
                    medCnt = medCnt + 1;
          
                    var medName = "";
                    if(isRefillAlert == true){
                        contentMedRefill = contentMedRefill+'<div style="width:100%;float:left;height:30px;border-bottom: 1px solid #BFBFBF;border-top: 1px solid #F5F5F5;padding-top:8px;padding-bottom:8px;"><div class="fl" style="width:15%;"><img src="../../images/' + medImage + '" ></div><div class="fl" style="width:70%;padding-left:15%;"><span class="medName" style="font-size:18px;margin-top:15px;" data-pancakes="' + id + '">' + item
                            .get("medication").name +'</span></br><span style="color:red">' + diffDays + ' days</span></div></div>';
          
                        
                    }
          
                }
            }
          }
          
          
          
          });
  

  
  /********************Medication Backbone Ends Here*********************/
  
  
  /***************Communication Backbone Starts Here******************/
  communication.prescDet = Backbone.Model.extend({ urlRoot : window.servicePath + urlDetalPrescription });
  
  communication.labsDet = Backbone.Model.extend({ urlRoot : window.servicePath + urlDetalLab });
  
  communication.LabsList = Backbone.Collection.extend({ model : communication.labsDet });
  
  communication.PrescList = Backbone.Collection.extend({ model : communication.prescDet });
  
  communication.readUnreadCnt = Backbone.Model.extend({ urlRoot : window.servicePath + urlReadUnreadCnt });
  
  communication.DeleteCommunication = Backbone.Model.extend({ urlRoot : window.servicePath + urlDeleteComm });
  
  communication.ForwardCommunication = Backbone.Model.extend({ urlRoot : window.servicePath + urlForwardComm });
  
  commcontacts.CommcontactMod = Backbone.Model.extend({
                                                      urlRoot : window.servicePath + urlCommContactList 
                                                      });
  
  commcontacts.allCommcontactMod = Backbone.Model.extend({
                                                      urlRoot : window.servicePath + urlAllCommContactList 
                                                      });
  
  commcontacts.CommContactList = Backbone.Collection.extend({ model : commcontacts.CommContact });
  
  commcontacts.CommContactListView = Backbone.View.extend({ initialize : function() {
                                                          commCollection = new medication.MedicationList(this.options.commcontactCollectionModel);
                                                          this.collection = commCollection;
                                                          this.render();
                                                          },
                                                          
                                                          render : function() {
                                                          var self = this;
                                                          _(this.collection.models).each(function(item) { // in case
                                                                                         self.appendItem(item);
                                                                                         }, this);
                                                          
                                                          },
                                                          
                                                          appendItem : function(item) {
                                                          this.model = item;
                                                          //alert(JSON.stringify(item));
                                                          var commcontactList = item.get("username");
                                                          var userType = item.get("userType");
                                                          if(userType == "PCT" || userType == "SCT"){
                                                            userType = "T";
                                                          }
                                                          
                                                          var commcontactId = item.get("id");
                                                          if (commcontactList.toLowerCase().indexOf(nameList.toLowerCase()) >= 0) {
                                                          commcontactId = parseInt(commcontactId);
                                                          
                                                          if(toIds.indexOf(commcontactId) < 0){
                                                          
                                                          $("#listDiv").append("<div class='contList fl'><div class='fl toLinkType'>"+ userType+"</div>  <div class='toLink'><a id='" + commcontactId + "' class='toListAdd fl black'>" + commcontactList + "</a></div></div>");
                                                          
                                                          }
                                                          }
                                                          }, });
  
  commsubject.commSubject = Backbone.Model.extend({ urlRoot : window.servicePath + urlCommSubject });
  
  commsubject.commSubjectsList = Backbone.Collection.extend({ model : commsubject.commSubject });
  
  commsubject.commSubjectsListView = Backbone.View.extend({ initialize : function() {
                                                          specCollection = new commsubject.commSubjectsList(this.options.subCollectionModel);
                                                          
                                                          this.collection = specCollection;
                                                          this.render();
                                                          },
                                                          
                                                          render : function() {
                                                          var self = this;
                                                          _(this.collection.models).each(function(item) { // in case
                                                                                         self.appendItem(item);
                                                                                         }, this);
                                                          
                                                          },
                                                          
                                                          appendItem : function(item) {
                                                          this.model = item;
                                                          var specNameList = item.get("name");
                                                          
                                                          var specId = item.get("id");
                                                          
                                                          if (specNameList.toLowerCase().indexOf(subjectVal.toLowerCase()) >= 0) {
                                                          $("#findSub").append("<p id='" + specId + "' class='subLine' onclick='setSubject(" + specId + ")'>" + specNameList + "</p>");
                                                          }
                                                          
                                                          }, 
                                                          });
  
  commsubject.commposeMail = Backbone.Model.extend({ urlRoot : window.servicePath + urlComposeMail });
  
  commsubject.forwardMail = Backbone.Model.extend({ urlRoot : window.servicePath + urlForwardMail });
  
  communication.labsPrescView = Backbone.View.extend({ initialize : function() {
                                                     if(storage.getItem("labPrescId") == "1"){
                                                     labPrescCollection = new communication.PrescList(this.options.labsPrescCollection);
                                                     }else{
                                                     labPrescCollection = new communication.LabsList(this.options.labsPrescCollection);
                                                     }
                                                     this.collection = labPrescCollection;
                                                     this.render();
                                                     },
                                                     
                                                     render : function() {
                                                     var self = this;
                                                     $(".chooseLabPresc").html("");
                                                     _(this.collection.models).each(function(item) { // in case
                                                                                    self.appendItem(item);
                                                                                    }, this);
                                                     $("#prescLabDiv").css("display", "block");
                                                     
                                                     },
                                                     
                                                     appendItem : function(item) {
                                                     this.model = item;
                                                     //alert(JSON.stringify(item));
                                                     var labPrescId = item.get("id");
                                                     var labPrescName = item.get("name");
                                                     
                                                     var content = '<input type="checkbox" class="vitalColl" name="vehicle" value="'+labPrescId+'">'+labPrescName+'<br>';
                                                     // alert(content);
                                                     $(".chooseLabPresc").append(content);
                                                     
                                                     }, });
  
  inbox.InboxDetail = Backbone.Model.extend({ urlRoot : window.servicePath + urlDetalMail });
  
  inbox.detailMsgList = Backbone.Collection.extend({ model : inbox.InboxDetail });
  
  
  inbox.InboxDetailListView = Backbone.View
  .extend({ el : $("#contentPatientCommunicationCompose"), // attaches `this.el` to an existing
          // element.
          events : { "click a" : "clicked" },
          
          initialize : function() {
          inbox.reviewsCollection = new inbox.detailMsgList(this.options.inboxCollection);
          msgBodyText = "";
          inboxCollections = inbox.reviewsCollection;
          this.collection = inbox.reviewsCollection;
          this.render();
          },
          
          render : function() {
          var self = this;
          $("#msgBody").html("");
          var ind;
          var toName;
          var toList = "";
          $("#toListDiv").html("");
          var className = "";
          className = "oldmsg";
          if(recepient.length > 1){
          var groupImage = '<img src="../../images/icon_users.png" style="width:15px;height:12px;margin-right:2px;margin-top:8px;" class="fl" />';
          className = "newMsg";
          }else{
          var groupImage = '';
          className = "oldMsg";
          
          }
          toList = toList+" "+groupImage;
          for(var i=0; i<recepient.length; i++) {
          toName = recepient[i].substr(recepient[i].indexOf("@") + 1);
          ind = recepient[i].substr(0, recepient[i].indexOf("@"));
          if(i > 2){
          //toList = toList+"<br/>";
          }
          if(i == (recepient.length - 1)){
          toList = toList+'<div class="selectedList font14 fl" style="float:left;" id="'+ind+'">'+toName+'</div>';
          }else{
          toList = toList+'<div class="selectedList font14 fl" style="float:left;" id="'+ind+'">'+toName+',</div> ';
          }
          }
          
          $("#toListDiv").append(toList);
          crdateCnt = 0;
          _(this.collection.models).each(function(item) { // in case
                                         // collection
                                         // is not
                                         // empty
                                         self.appendItem(item);
                                         }, this);
          var bottom = $('.subjectField').position().top+$('.subjectField').outerHeight(true);
          
          $("#contentPatientCommunicationCompose").css("top", (bottom + 5));
          $("#msgBody").html(msgBodyText);
          },
          
          appendItem : function(item) {
          this.model = item;
          //alert(JSON.stringify(item));
          var msgId = item.get('id');
          var msgTo = item.get('msgto');
          var receiverId = msgTo.substr(0,msgTo.indexOf("#"));
          var receiverName = msgTo.substr((msgTo.indexOf("#") + 1), msgTo.indexOf(" "));
          var msgFrom = item.get('msgfrom');
          var senderId = msgFrom.substr(0,msgFrom.indexOf("#"));
          var senderName = msgFrom.substr((msgFrom.indexOf("#") + 1), msgFrom.indexOf(" "));
          var displayName = senderName.substr(0,1)+""+senderName.substr((senderName.indexOf(" ")+1), 1);
          displayName = displayName.toUpperCase();
          var msgBody = item.get('msgbody');
          var labs = item.get('labs');
          var prescription = item.get('prescription');
          var sentTime = item.get('senton');
          if(crdateCnt == 0){
          var createdTime = getMonthDateFormat(sentTime);
          $("#createdDate").html('<span style="text-align:left;color:#777;margin-top:9px;width:100%;" class="font10 fr">'+createdTime+'</span>');
          crdateCnt = 1;
          }
          
          sentTime = getInboxDate(sentTime, 1);
          var msgSubject = item.get('msgsubject');
          var msgSubjectID = msgSubject.substr(0,msgSubject.indexOf("#"));
          var msgSubjectText = msgSubject.substr(msgSubject.indexOf("#")+1);
          $("#Subject").html('<span class="font14 mailSubject" style="padding-top:4px;">'+msgSubjectText+'</span><input type="hidden" id="mailSubject" value="'+msgSubjectText+'"/>');
          $("#Subject").css("margin-top", "3px");
          var msgText = "";
          if(msgBody != null && msgBody != ""){
          msgText = msgBody;
          }else if(labs != null){
          msgText = '<a href="" id="labs_'+msgId+'" class="labsPrescDiv">View Labs</a>';
          }else{
          msgText = '<a href="" id="presc_'+msgId+'" class="labsPrescDiv">View Prescription</a>';
          }
          if(senderId != storage.getItem("userId")){
          msgBodyText = msgBodyText+'<span style="float:left;text-align:center;width:100%;font-size:10px;color:#777;">'+sentTime+'</span><div style="width:79%;display:inline-block;margin-bottom:9px;">'+
          '<span class="fl nameDiv nameDivLeft">'+displayName+'</span>'+
          '<div class="fl chatBox yellowBG">'+msgText+'</div></div><br/>';
          }else{
          msgBodyText = msgBodyText+'<span style="float:right;text-align:center;width:100%;font-size:10px;color:#777;">'+sentTime+'</span><div style="width:79%; float: right;display:inline-block;margin-bottom:9px;">'+
          '<span class="fr nameDiv nameDivRight">me</span>'+
          '<div class="fr chatBox blueBG">'+msgText+'</div></div><br/>';
          }
          
          
          },
          
          clicked : function(e) {
          e.preventDefault();
          },
          
		  });
  
  
  inbox.inboxLabPrescDetailsView = Backbone.View
  .extend({ initialize : function() {
          reviewsCollection = this.model;
          prescLabText = "";
          this.collection = reviewsCollection;
          this.render();
		  },
          
		  render : function() {
          var self = this;
          $("#prescLabDet").html("");
          
          self.appendItem();
          
          $("#prescLabDet").html(prescLabText);
          $("#prescLabDetailDiv").css("display", "block");
          $('body').append('<div class="mask" id="commMask"></div>');
          $("#commMask").fadeIn(300);
          $('#commMask').css("zIndex", 999999);
          $('#commMask').css("opacity", 0.6);
		  },
          
		  appendItem : function() {
          item = this.model;
          var labs = item.get('labs');
          
          var prescription = item.get('prescription');
          //alert(JSON.stringify(prescription));
          if(labs != null){
          prescLabText = prescLabText+'<table>';
          _.each(labs, function(val, i) {
                 var vitalList = labs[i].vital;
                 var recordDate = labs[i].recordedDate;
                 
                 if(recordDate.indexOf("-") >= 0){
                 recordDate = recordDate.split("-").join("/");
                 }
                 recordDate = new Date(recordDate);
                 var month = recordDate.getMonth();
                 var startday = recordDate.getDate();
                 
                 var monthName = shortMonthNames[month];
                 var updateDay = monthName + " " + startday;
                 if (vitalList.noOfValues > 1) {
                 prescLabText = prescLabText + '<tr style="border-bottom: 1px solid #EFEFEF !important;"><td><div class="fl" id="cholestrol" style ="padding-top:5px;"><span class="fl" id="cholestrolHeading" style="font-weight:bold;font-size:16px;">' + vitalList.name + '</span></div><br><br>';
                 _.each(vitalList.vitalAttributes, function(val, j) {
                        var values = 'value'+(j + 1);
                        //alert(labs[i].values);
                        if (j == 0) {
                        prescLabText = prescLabText + '<div class="fl" ><span class="fl" style="font-weight:bold;font-size:12px;color:#939393;">' + vitalList.vitalAttributes[j].id.name + '</span><br><span style="display:block;font-weight:bold;font-size:14px;color:#3473B4;margin-top: 2px;margin-bottom : 3px;">' + labs[i].value1 + '</span></div>';
                        } else {
                        prescLabText = prescLabText + '<div class="fl" style="margin-left:40px;"><span class="fl" id="cholestroltotalInfo" style="font-weight:bold;font-size:12px;color:#939393;">' + vitalList.vitalAttributes[j].id.name + '</span><br><span id="cholestroltotalData" style="display:block;font-weight:bold;font-size:14px;color:#3473B4;margin-top: 2px;margin-bottom : 3px;">' + labs[i].value1 + '</span></div>';
                        }
                        });
                 prescLabText = prescLabText + '<div class="float100" style ="padding:5px 0;"><span id="sodiumLastUpatedInfo" class="footerButtonImage fr" style="font-size:12px;color:#939393;">Last updated on ' + updateDay + '</span></div></td></tr>';
                 } else {
                 prescLabText = prescLabText + '<tr style="border-bottom: 1px solid #EFEFEF !important;"><td><div id="sodiumInfo" class="fl" style="padding-top:5px;"><span id="sodiumHeading" class="fl" style="font-weight:bold;font-size:16px;">' + vitalList.name + '</span><br>';
                 _.each(vitalList.vitalAttributes, function(val, l) {
                        prescLabText = prescLabText + '<span style="display:block;font-weight:bold;font-size:14px;color:#3473B4;margin-top: 2px;margin-bottom : 3px;">' + labs[i].value1 + '</span></div>';
                        });
                 prescLabText = prescLabText + '<div class="float100" style ="padding:5px 0;"><span id="sodiumLastUpatedInfo" class="footerButtonImage fr" style="font-size:12px;color:#939393;">Last updated on ' + updateDay + '</span></div></td></tr>';
                 }
                 });
          prescLabText = prescLabText + '</table>';
          }else{
          _.each(prescription, function(val, i) {
                 prescLabText = prescLabText+'<div class="chooseLabPresc" id="prescLabDet">'+
                 '<div class="w100"><span class="fntbld">Medicine Title:</span> <span>'+prescription[i].medication.name+'</span></div>'+
                 '<div class="w100"><span class="fntbld">Date:</span> <span>'+prescription[i].fromDate+'</span> to <span>'+prescription[i].toDate+'</span></div>'+
                 '<div class="w100"><span class="fntbld">Time:</span> <span>'+prescription[i].time1+'</span> <span>'+prescription[i].time2+'</span> <span>'+prescription[i].time3+'</span> <span>'+prescription[i].time4+'</span> <span>'+prescription[i].time5+'</span> <span>'+prescription[i].time6+'</span></div>'+
                 '<div class="w100"><span class="fntbld">Dosage:</span> <span>'+prescription[i].dosage+' '+prescription[i].dosageType.name+'</span></div>'+
                 '<div class="w100"><span class="fntbld">Frequency:</span> <span>'+prescription[i].frequency+' times</span></div></div>';
                 });
          }
          
          
		  },
          
		  clicked : function(e) {
          e.preventDefault();
		  },
          
		  });
  
  
  inbox.InboxUnreadDetail = Backbone.Model.extend({ urlRoot : window.servicePath + urlUnreadDetalMail });
  
  inbox.unreadDetailMsgList = Backbone.Collection.extend({ model : inbox.InboxUnreadDetail });
  
  
  inbox.InboxUnreadDetailListView = Backbone.View
  .extend({ el : $("#contentPatientCommunicationCompose"), // attaches `this.el` to an existing
          // element.
          events : { "click a" : "clicked" },
          
          initialize : function() {
          reviewsCollection = new inbox.unreadDetailMsgList(this.options.inboxCollection);
          msgBodyText = "";
          inboxCollections = reviewsCollection;
          this.collection = reviewsCollection;
          this.render();
          },
          
          render : function() {
          var self = this;
          _(this.collection.models).each(function(item) { // in case
                                         self.appendItem(item);
                                         }, this);
          
          $("#msgBody").append(msgBodyText);
          if(msgBodyText.length > 0){
          $("#bottomOfDiv").remove();
          var height = $("#msgBody").css("height");
          $("#msgBody").append('<div id="bottomOfDiv" style="position:absolute;top:'+height+';"></div>');
          document.getElementById('bottomOfDiv').scrollIntoView(true);
          }
          },
          
          appendItem : function(item) {
          this.model = item;
          var msgId = item.get('id');
          if(unreadMsgId != msgId){
          unreadMsgId = msgId;
          var msgFrom = item.get('msgfrom');
          var senderId = msgFrom.substr(0,msgFrom.indexOf("#"));
          var senderName = msgFrom.substr((msgFrom.indexOf("#") + 1), msgFrom.indexOf(" "));
          var displayName = senderName.substr(0,1)+""+senderName.substr((senderName.indexOf(" ")+1), 1);
          displayName = displayName.toUpperCase();
          var msgBody = item.get('msgbody');
          var labs = item.get('labs');
          var sentTime = item.get('senton');
          sentTime = getInboxDate(sentTime, 1);
          var msgText = "";
          if(msgBody != null && msgBody != ""){
          msgText = msgBody;
          }else if(labs != null){
          msgText = '<a href="" id="labs_'+msgId+'" class="labsPrescDiv">View Labs</a>';
          }else{
          msgText = '<a href="" id="presc_'+msgId+'" class="labsPrescDiv">View Prescription</a>';
          }
          
          if(senderId != storage.getItem("userId")){
          msgBodyText = msgBodyText+'<span style="float:left;text-align:center;width:100%;font-size:10px;">'+sentTime+'</span><div style="width:79%;display:inline-block;margin-bottom:9px;">'+
          '<span class="fl nameDiv nameDivLeft">'+displayName+'</span>'+
          '<div class="fl chatBox yellowBG">'+msgText+'</div></div><br/>';
          }else{
          //msgBodyText = msgBodyText+'<span style="float:right;text-align:left;width:80%;font-size:10px;">'+sentTime+'</span><div style="width:90%; float: right;margin-right: 9%;display:inline-block;margin-bottom:9px;">'+
          //'<span class="fr nameDiv nameDivRight">Me</span>'+
          //'<div class="fr chatBox blueBG top5">'+msgText+'</div></div><br/>';
          }
          }
          
          
          },
          
          clicked : function(e) {
          e.preventDefault();
          },
          
		  });
  
  communication.readUnreadMsg = Backbone.Model.extend({ urlRoot : window.servicePath + urlReadUnreadMsg });
  
  communication.inboxMsg = Backbone.Model.extend({ urlRoot : window.servicePath + urlInboxMsg });
  
  communication.inboxMsgList = Backbone.Collection.extend({ model : communication.inboxMsg });
  
  communication.inboxMsgListView = Backbone.View
  .extend({ el : $("#contentPatientCommunication"), // attaches `this.el` to an existing
          // element.
          events : { "click a" : "clicked" },
          
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
          for ( var i in communication.readUnreadCntList) {
          if(i == 1){
          readUnreadCnt = '<span class="unreadCntSpan">'+communication.readUnreadCntList[i]+'</span> unread   '+readUnreadCnt;
          if(parseInt(communication.readUnreadCntList[i]) > 0){
          $("#notifications").css("display", "block");
          }else{
          $("#notifications").css("display", "none");
          }
          $("#notifications").html(communication.readUnreadCntList[i]);
          }else{
          readUnreadCnt = readUnreadCnt+'<span style="margin-left:15px;font-size:16px;">'+communication.readUnreadCntList[i]+'</span> read ';
          }
          }
          
          var name = storage.getItem("fName")+" "+storage.getItem("lName");
          $("#nameField").html(name);
          $("#readUnreadCntField").html(readUnreadCnt);
          _(this.collection.models).each(function(item) { // in case
                                         self.appendItem(item);
                                         }, this);
          
          $("#contentPatientCommunication").html(msgBodyText);
          },
          
          appendItem : function(item) {
          //this.model = item;
          var msgId = item.get("id");
          var msgBody = item.get("msgbody");
          var date = item.get("senton");
          var time = date.substr((date.indexOf(" ") + 1),5);
          time = getInboxDate(date, 0);
          //time = getTwelveHours(time);
          var subject = item.get("msgsubject");
          var subjectId = subject.substr(0,subject.indexOf("#"));
          var subjectText = subject.substr(subject.indexOf("#") + 1);
          var msgfrom = item.get("msgfrom");
          var msgto = item.get("msgto");
          var lName = storage.getItem("lName");
          lName = lName.substr(0, (lName.indexOf(" ")+2));
          var currentUser = storage.getItem("fName")+" "+lName;
          currentUser = storage.getItem("userId")+"@"+currentUser;
          recepient = msgto.substring(0, msgto.length - 1);
          recepient = recepient.split("#");
          //alert(recepient);
          var status;
          var className;
          var newImage;
          className = "oldMsg";
          newImage = '';
          for ( var i in communication.readUnreadMsgList) {
          if(communication.readUnreadMsgList[i].id  == msgId){
          status = communication.readUnreadMsgList[i].isread;
          if(status == false){
          var newImage = '<img src="../../images/icon_blue.png" class="blueImage" />';
          className = "newMsg";
          }
          }
          }
          var ind;
          var thread = item.get("communicationThread");
          var recepList = new Array();
          if((msgto.indexOf(storage.getItem("userId"))) < 0){
          for(var i=0; i<recepient.length; i++) {
          recepient[i] = recepient[i].substr(0, (recepient[i].indexOf(" ")+2));
          ind = recepient[i].substr(recepient[i].indexOf("@") + 1);
          
          recepList.push(ind);
          }
          
          }else{
          for(var i=0; i<recepient.length; i++) {
          msgfrom = msgfrom.substr(0, (msgfrom.indexOf(" ")+2));
          
          recepient[i] = recepient[i].substr(0, (recepient[i].indexOf(" ")+2));
          
          if(recepient[i] == currentUser){
          msgfrom = msgfrom.replace("#", "@");
          recepient[i] = msgfrom;
          }
          ind = recepient[i].substr(recepient[i].indexOf("@") + 1);
          recepList.push(ind);
          }
          }
          var userCnt = recepList.length;
          recepList = recepList.join(", ");
          var recepIds = recepient.join(",");
          if(msgBody == "" || msgBody == null){
          msgBody = "Labs/Prescription";
          }
          if(userCnt > 1){
          if(className == "oldMsg"){
          var groupImage = '<img src="../../images/icon_users.png" class="groupImage"/>';
          className = "newMsg";
          }else{
          var groupImage = '<img src="../../images/icon_users.png" class="groupImage" />';
          className = "newMsg";
          }
          }else{
          var groupImage = '';
          if(className != "newMsg"){
          className = "oldMsg";
          }
          
          }
          if(msgBody.length > 25){
          msgBody = msgBody.substr(0, 25);
          msgBody = msgBody + "...";
          
          }
          
          msgBodyText = msgBodyText+'<div class=" w100 threadList font12" id="'+thread+'">'+
          '<div class="h100 fl sidePane">'+
          '<div class="w100 fl imagePane">'+newImage+'</div>'+
          '<div class="w100 fl imagePane">'+groupImage+'</div>'+
          '</div>'+
          '<div class="h100 fl contPane '+className+'">'+
          '<div class="w100 fl namePane">'+
          '<span class="fl bold nameSpan">'+recepList+'</span>'+
          '<span class="fl timeSpan">'+time+'</span>'+
          '</div>'+
          '<div class="w100 fl subjTextPane">'+
          '<span class="fl subSpan">'+subjectText+'</span><br/>'+
          '</div>'+
          '<div class="w100 fl subjTextPane">'+
          '<span class="fl textSpan">'+msgBody+'</span>'+
          '</div><input type="hidden" value="'+recepIds+'" id="recec_'+thread+'"/>'+
          '</div></div>';
          
          
          },
          
          clicked : function(e) {
          e.preventDefault();
          },
          
          });
  /***************Communication Backbone Ends Here********************/
  
  /******************vitals Backbone Starts here************************/
  
  vitals.prevApptTime = "";
  
  vitals.Vitals = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetVital });
  
  vitals.VitalsList = Backbone.Collection.extend({ model : vitals.Vitals });
  
  var vitalsCollection;
  vitals.VitalsListView = Backbone.View
  .extend({ el : $("#appointmentList"), // attaches `this.el` to an existing
          // element.
          events : { "click a" : "clicked" },
          
          initialize : function() {
          reviewsCollection = new vitals.VitalsList(this.options.vitalCollection);
          this.collection = reviewsCollection;
          this.render();
          },
          
          render : function() {
          var self = this;
          _(this.collection.models).each(function(item) { // in case
                                         // collection
                                         // is not
                                         // empty
                                         self.appendItem(item);
                                         }, this);
          },
          
          appendItem : function(item) {
          this.model = item;
          var vitalList = item.get('vital');
          var recordDate = item.get('recordedDate');
          if(recordDate.indexOf("-") >= 0){
          recordDate = recordDate.split("-").join("/");
          }
          recordDate = new Date(recordDate);
          var month = recordDate.getMonth();
          var startday = recordDate.getDate();
          
          var monthName = shortMonthNames[month];
          var updateDay = monthName + " " + startday;
          
          var cont = "";
          if (vitalList.noOfValues > 1) {
          cont = cont + '<tr style="border-bottom: 1px solid #EFEFEF !important;"><td><div class="fl" id="cholestrol" style ="padding-top:5px;"><span class="fl" id="cholestrolHeading" style="font-weight:bold;font-size:16px;">' + vitalList.name + '</span></div><br><br>';
          _
          .each(vitalList.vitalAttributes, function(val, j) {
                if (j == 0) {
                cont = cont + '<div class="fl" ><span class="fl" style="font-weight:bold;font-size:12px;color:#939393;">' + vitalList.vitalAttributes[j].id.name + '</span><br><span style="display:block;font-weight:bold;font-size:24px;color:#3473B4;margin-top: 2px;margin-bottom : 3px;">' + item
                .get("value" + (j + 1)) + '</span></div>';
                } else {
                cont = cont + '<div class="fl" style="margin-left:40px;"><span class="fl" id="cholestroltotalInfo" style="font-weight:bold;font-size:12px;color:#939393;">' + vitalList.vitalAttributes[j].id.name + '</span><br><span id="cholestroltotalData" style="display:block;font-weight:bold;font-size:24px;color:#3473B4;margin-top: 2px;margin-bottom : 3px;">' + item
                .get("value" + (j + 1)) + '</span></div>';
                }
                });
          cont = cont + '<div class="float100" style ="padding:5px 0;"><span id="sodiumLastUpatedInfo" class="footerButtonImage fr" style="font-size:12px;color:#939393;">Last updated on ' + updateDay + '</span></div></td></tr>';
          } else {
          cont = cont + '<tr style="border-bottom: 1px solid #EFEFEF !important;"><td><div id="sodiumInfo" class="fl" style="padding-top:5px;"><span id="sodiumHeading" class="fl" style="font-weight:bold;font-size:16px;">' + vitalList.name + '</span><br>';
          _.each(vitalList.vitalAttributes, function(val, l) {
                 cont = cont + '<span style="display:block;font-weight:bold;font-size:24px;color:#3473B4;margin-top: 2px;margin-bottom : 3px;">' + item.get("value1") + '</span></div>';
                 });
          cont = cont + '<div class="float100" style ="padding:5px 0;"><span id="sodiumLastUpatedInfo" class="footerButtonImage fr" style="font-size:12px;color:#939393;">Last updated on ' + updateDay + '</span></div></td></tr>';
          }
          
          $("#vitalTable").append(cont);
          
          },
          
          clicked : function(e) {
          e.preventDefault();
          },
          
          });
  
  
  /******************vitals Backbone Ends here************************/
  
  
  
  /******************PCT Backbone Starts here************************/
  state.State = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetStates });
  
  pct.addPCT = Backbone.Model.extend({ urlRoot : window.servicePath + urlAddPCT });
  
  pct.editPCT = Backbone.Model.extend({ urlRoot : window.servicePath + urlEditPCT });
  
  pct.deletePCT = Backbone.Model.extend({ urlRoot : window.servicePath + urlDeletePCT });
  
  pct.PCT = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetPct });
  
  pct.pctList = Backbone.Collection.extend({ model : pct.PCT });
  
  pct.pctListView = Backbone.View
  .extend({ el : $("#pctContents"), // attaches `this.el` to an existing
          // element.
          events : { "click a" : "clicked" },
          
          initialize : function() {
          pct.pctList1 = new pct.pctList(this.options.pctCollection);
          this.collection = pct.pctList1;
          pctCollection = pct.pctList1;
          this.render();
          },
          
          render : function() {
          var self = this;
          _(this.collection.models).each(function(item) {
                                         self.appendItem(item);
                                         }, this);
          },
          
          appendItem : function(item) {
          this.model = item;
          var ctId = item.get("id");
          var cont = "";
          cont = cont + '<div class="apptListDiv"><div id="appointmentData" class ="left"><span id="doctorName" class="left"><a data-pancakes="' + ctId + '" href="#" style="text-decoration:none;color:#000;">' + item.get("careTakerId").firstName + ' ' + item.get("careTakerId").lastName + '</a></span></div>';
          
          var careTkrType = "";
          if (item.get("isPrimary") == true) {
          careTkrType += "Primary";
          } else {
          careTkrType += "Secondary";
          }
          
          cont += '<div id="ctSubContent" class="float100"> <div id="pctType" class="float50">Type : ' + careTkrType + '</div><div id="pctContact" class="float50"> Contact No :' + item.get("careTakerId").phone + '</div> </div></div>';
          
          $("#pctContents").append(cont);
          }, clicked : function(e) {
          e.preventDefault();
          var ctId = $(e.target).data('pancakes');
          storage.setItem("ctId", ctId);
          backPath = "patient_PCT";
          gotoPath('#patient_PCT_detail');
          },
          
          });
  
  pct.pctListDetailView = Backbone.View.extend({ initialize : function() {
                                               this.template = _.template($('#pct_details_template').html());
                                               },
                                               
                                               render : function() {
                                               var container = this.options.viewContainer;
                                               activity = this.model;
                                               renderedContent = this.template(this.model.toJSON());
                                               
                                               renderedContent = this.template(this.model.toJSON());
                                               container.html(renderedContent);
                                               container.trigger('create');
                                               return this;
                                               },
                                               
                                               });
  
  
  /******************PCT Backbone Ends here************************/
  
  
  /**********************Speciality Backbone Starts Here*****************/
  
  speciality.Speciality = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetSpecialty });
  
  speciality.SpecialityList = Backbone.Collection.extend({ model : speciality.Speciality });
  
  speciality.SpecialityListView = Backbone.View.extend({ initialize : function() {
                                                       specCollection = new medication.MedicationList(this.options.specCollectionModel);
                                                       this.collection = specCollection;
                                                       this.render();
                                                       },
                                                       
                                                       render : function() {
                                                       var self = this;
                                                       specialityList = "";
                                                       specialityList = specialityList+'<option value="">Select Speciality</option>';
                                                       _(this.collection.models).each(function(item) { // in case
                                                                                      self.appendItem(item);
                                                                                      }, this);
                                                       $("#docSpecialityText").html(specialityList);
                                                       },
                                                       
                                                       appendItem : function(item) {
                                                       this.model = item;
                                                       var specNameList = item.get("specialties");
                                                       _.each(specNameList, function(val, i) {
                                                              var specName = specNameList[i].name;
                                                              var specId = specNameList[i].id;
                                                              specialityList = specialityList+'<option value="'+specId+'">'+specName+'</option>';
                                                              });
                                                       }, 
                                                       });
  
  speciality.doctorDetailsView = Backbone.View.extend({ initialize : function() {
                                                      specCollection = new medication.MedicationList(this.options.specCollectionModel);
                                                      this.collection = specCollection;
                                                      this.render();
                                                      }, render : function() {
                                                      var self = this;
                                                      DoctorsList = "";
                                                      DoctorsList = DoctorsList+'<option value="">Select Doctor Name</option>';
                                                      _(this.collection.models).each(function(item) { // in case
                                                                                     self.appendItem(item);
                                                                                     }, this);
                                                      $("#docName").html(DoctorsList);
                                                      
                                                      },
                                                      
                                                      appendItem : function(item) {
                                                      var doctor = item.get("doctors");
                                                      _.each(doctor, function(val, i) {
                                                             var physician = doctor[i].physician;
                                                             _.each(physician, function(val, j) {
                                                                    if (physician[j].specialty.id == specialityId) {
                                                                    var name = doctor[i].firstName + " " + doctor[i].lastName;
                                                                    var docId = doctor[i].id;
                                                                    DoctorsList = DoctorsList+'<option value="'+docId+'">'+name+'</option>';
                                                                    }
                                                                    });
                                                             });
                                                      }
                                                      });
  
  /**********************Speciality Backbone Ends Here*****************/
  
  
  var ResetPassword = Backbone.Model.extend({ urlRoot : window.servicePath + urlValidate });
  
  var ChangePassword = Backbone.Model.extend({ urlRoot : window.servicePath + urlUpdate });
  
  
  
  
  $("#forgot_link").click(function(event) {
                          resetPasswordFailed = 0;
                          lastUsernameResetPassword = "";
                          
                          $("#reset_password_message").removeClass("block").addClass("none");
                          gotoPath('#forgot_password');
                          });
  
  $("#contact_link").click(function(event) {
                           backPath = "contactPage";
                           gotoPath('#contactPage');
                           });
  
  $('#login').live('pageshow', function(event) {
                   loginFailed = 0;
                   lastUsername = "";
                   // hide all the error messages when login div is loaded
                   $("#login_invalid_error_message").removeClass("block").addClass("none");
                   $("#account_blocked").removeClass("block").addClass("none");
                   $("#login_error_message").removeClass("block").addClass("none");
                   });
  
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
                                    alert(serverErrorMessage);
                                    };
                                    
                                    myResetPassword.fetch({ type : postMethod, success : fetchSuccess, error : fetchError, data : JSON.stringify(userInfo), contentType : requestHeader, processData : true });
                                    }
                                    });
  
  
  
  
  
  
  
  
  
  $.fn.clickable = function() {
  
  var start = function(e) {
  
  };
  this.bind("click", start);
  };
  storage.setItem("isAppLocked", false);
  if(storage.getItem("isAppLoggedOut") == null || storage.getItem("isAppLoggedOut") == "true"){
  gotoPath("#appPage");
  }else{
  if (storage.getItem("isAppLocked") == null || storage.getItem("isAppLocked") != "true"){
  defaultLogin();
  }else{
  gotoPath("#patient_autoLock");
  }
  }
  
  });

function onResume(){
    //alert("1");
}





/************Communication Starts Here****************/

function getInboxMsgList() {
    collection = "";
    
    var inboxMsgModel = new communication.inboxMsg({});
    
    inboxListSuccess = function() {
        inboxMsgist = JSON.stringify(inboxMsgModel.get("users"));
        //alert(inboxMsgist);
        inboxMsgist = eval(" (" + inboxMsgist + ") ");
        new communication.inboxMsgListView({ inboxCollection : inboxMsgist });
    };
    
    inboxListError = function() {
	    //alert(serverErrorMessage);
    };
    
    var inboxJSON = {"id":storage.getItem("userId")};
    
    inboxMsgModel.fetch({ type : postMethod, success : inboxListSuccess, error : inboxListError, data : JSON.stringify(inboxJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}

function getReadUnreadStatus(){
    collection = "";
    
    var readUnreadMsgModel = new communication.readUnreadMsg({});
    
    readUnreadListSuccess = function() {
        readUnreadMsgist = JSON.stringify(readUnreadMsgModel.get("users"));
        //alert(readUnreadMsgist);
        communication.readUnreadMsgList = eval(" (" + readUnreadMsgist + ") ");
        
    };
    
    readUnreadListError = function() {
	    alert(serverErrorMessage);
    };
    
    var readUnreadJSON = {"userId":storage.getItem("userId")};
    
    readUnreadMsgModel.fetch({ type : postMethod, success : readUnreadListSuccess, error : readUnreadListError, data : JSON.stringify(readUnreadJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}


function getCommSubject() {
    var commSubjectModel = new commsubject.commSubject({});
    
    commSubjectSuccess = function() {
        commSubjectList = JSON.stringify(commSubjectModel.get("subject"));
        commsubject.commSubjects = eval(" (" + commSubjectList + ") ");
        
    };
    
    commSubjectError = function() {
	    alert(serverErrorMessage);
    };
    
    commSubjectModel.fetch({ type : postMethod, success : commSubjectSuccess, error : commSubjectError, contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
}


function getlabsPresc(id) {
	var labsPrescModel;
	if(id == 1){
        labsPrescModel = new communication.prescDet({});
	}else{
        labsPrescModel = new communication.labsDet({});
	}
    
    labsPrescListSuccess = function() {
        labsPrescDetailsList = JSON.stringify(labsPrescModel.get("patientId"));
        //alert(labsPrescDetailsList);
        labsPrescDetailsList = eval(" (" + labsPrescDetailsList + ") ");
        new communication.labsPrescView({ labsPrescCollection : labsPrescDetailsList });
    };
    
    labsPrescListError = function() {
	    alert(serverErrorMessage);
    };
    
    var inputJSON = { "patientId" : storage.getItem(patientId) };
    
    labsPrescModel.fetch({ type : postMethod, success : labsPrescListSuccess, error : labsPrescListError, data : JSON.stringify(inputJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}

function getDetailMsgList() {
    collection = "";
    
    var inboxModel = new inbox.InboxDetail({});
    
    inboxListSuccess = function() {
        inboxDetailsList = JSON.stringify(inboxModel.get("message"));
        //alert(inboxDetailsList);
        inboxDetailsList = eval(" (" + inboxDetailsList + ") ");
        new inbox.InboxDetailListView({ inboxCollection : inboxDetailsList });
    };
    
    inboxListError = function() {
        
	    alert(serverErrorMessage);
    };
    
    var today = new Date();
    var thread = storage.getItem("msgThread");
    var inboxJSON = {"thread":thread,"userId":storage.getItem("userId")};
    
    inboxModel.fetch({ type : postMethod, success : inboxListSuccess, error : inboxListError, data : JSON.stringify(inboxJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}

function getUnreadMsgList() {
    collection = "";
    
    var inboxModel = new inbox.InboxUnreadDetail({});
    
    inboxListSuccess = function() {
        inboxDetailsList = JSON.stringify(inboxModel.get("message"));
        //alert(inboxDetailsList);
        inboxDetailsList = eval(" (" + inboxDetailsList + ") ");
        new inbox.InboxUnreadDetailListView({ inboxCollection : inboxDetailsList });
    };
    
    inboxListError = function() {
	    alert(serverErrorMessage);
    };
    
    var today = new Date();
    var thread = storage.getItem("msgThread");
    var inboxJSON = {"thread":thread,"userId":storage.getItem("userId")};
    
    inboxModel.fetch({ type : postMethod, success : inboxListSuccess, error : inboxListError, data : JSON.stringify(inboxJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}

function initCommunicationContactList() {
    
    var commcontactsModel = new commcontacts.CommcontactMod({});
    commcontactListSuccess = function() {
		commcontactDetailsList = JSON.stringify(commcontactsModel.get("users"));
		//alert(commcontactDetailsList);
		commcontactDetailsList = eval(" (" + commcontactDetailsList + ") ");
    };
    
    commcontactListError = function() {
	    alert(serverErrorMessage);
    };
    
    var commcontactJSON = { patientId : storage.getItem(patientId) };
    
    commcontactsModel.fetch({ type : postMethod, success : commcontactListSuccess, error : commcontactListError, data : JSON.stringify(commcontactJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}


function initAllCommunicationContactList() {
    
    var commcontactsModel = new commcontacts.allCommcontactMod({});
    commcontactListSuccess = function() {
		commcontactDetailsList = JSON.stringify(commcontactsModel.get("users"));
		//alert(commcontactDetailsList);
		commcontactDetailsList = eval(" (" + commcontactDetailsList + ") ");
    };
    
    commcontactListError = function() {
	    alert(serverErrorMessage);
    };
    
    var commcontactJSON = { patientId : storage.getItem(patientId) };
    
    commcontactsModel.fetch({ type : postMethod, success : commcontactListSuccess, error : commcontactListError, data : JSON.stringify(commcontactJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}



$("#communicationLink").live("tap", function() {
                             backPath="patient_communication";
                             gotoPath('#patient_communication');
                             $("#moreDiv").animate({ height : '0%' }, 200, function() {
                                                   $("#moreDiv").fadeOut(300);
                                                   });
                             getReadUnreadCnt();
                             
                             getReadUnreadStatus();
                             setTimeout(function() {
                                        getInboxMsgList();
                                        }, 600);
                             
                             });

function populateSubject() {
    subjectVal = $("#mailSubject").val();
    $("#findSub").html("");
    
    if(subjectVal.length > 3){
        $("#findSub").css("display", "block");
        $("#findSub").css("max-height", "200px");
        new commsubject.commSubjectsListView({ subCollectionModel : commsubject.commSubjects });
    }
    
}

$("#contentPatientCommunicationCompose").live("tap", function(){
                                              //$("#mailSubject").val("");
                                              $("#findSub").html("");
                                              $("#findSub").css("display", "none");
                                              });

function setSubject(specId) {
    $("#mailSubject").val($(hashObj + specId).text());
    $("#subId").val(specId);
    specialityId = specId;
    $("#findSub").html("");
    $("#findSub").css("display", "none");
}

$("#newMail").live("tap", function() {
                   toIds = new Array();
                   getCommSubject();
                   initCommunicationContactList();
                   backPath="patient_communication";
                   storage.setItem("msgThread", "");
                   $("#composeBody").val("");
                   $("#Subject").html('<input type="text" class="" id="mailSubject" onkeyup="populateSubject()"/><input type="hidden" id="subId" value=""/>');
                   $("#Subject").css("marginTop", "7px");
                   $("#Subject").css("width", "80%");
                   $("#mailSubject").css("width", "100%");
                   $("#delete").css("display", "none");
                   $("#forward").css("display", "none");
                   $("#delete").remove();
                   $("#forward").remove();
                   $("#createdDate").html("");
                   if(openCnt > 1){
                   $("#Subject").css("margin-top", "0px")
                   $("#mailSubject").css("margin-top", "3px");
                   $("#mailSubject").css("width", "95%");
                   $("#mailSubject").css("height", "15px");
                   
                   }else{
                   openCnt = 2;
                   }
                   setTimeout(function() {
                              gotoPath("#patient_communication_compose");
                              }, 200);
                   
                   var subject = "";
                   
                   
                   //for ( var i in commsubject.commSubjects) {
                   //subject = subject+'<option value="'+commsubject.commSubjects[i].id+'">'+commsubject.commSubjects[i].name+'</option>';
                   //}
                   $("#Subject").append('<div id="findSub" class="findDiv"></div>');
                   $("#sendMessage").css("display", "block");
                   $("#fwdMessage").css("display", "none");
                   $("#toListDiv").html("");
                   $("#msgBody").html("");
                   $("#addToCharacter").css("display","block");
                   $("#toList").css("width", "75%");
                   var name = storage.getItem("fName")+" "+storage.getItem("lName");
                   $("#nameContent").html(name);
                   
                   });


$("#addToCharacter").live('tap', function() {
                          
                          if ($("#contactList").css("display") == "none") {
                          $('body').append('<div class="mask" id="topMask"></div>');
                          $("#topMask").fadeIn(300);
                          $('#topMask').css("opacity", 0.4);
                          $("#contactList").css("display","block");
                          $("#findSub").css("display","none");
                          $("#topMask").live("tap", function(){
                                             $("#contactList").css("display","none");
                                             $("#topMask").fadeOut(300);
                                             $("#topMask").remove();
                                             $("#listDiv").html("");
                                             $("#contactsListForm").val("");
                                             });
                          populateContactList();
                          } else {
                          
                          $("#contactList").css("display","none");
                          $("#topMask").fadeOut(300);
                          $("#topMask").remove();
                          
                          }
                          
                          
                          });

$(".toListAdd").live("tap", function(){
                     
                     var text = $(this).text();
                     var id = $(this).attr('id');
                     
                     if(toIds.indexOf(id) < 0){
                     id = parseInt(id);
                     toIds.push(id);
                     var toCont = '<li class="select2-search-choice selectedList" id="'+id+'">'+
                     '<div id="cnt_'+id+'">'+text+'</div>'+
                     '<a class="select2-search-choice-close" tabindex="-1" href="#"></a>'+
                     '</li>';
                     }else{
                     alert("This recepient has already been added"); 
                     }
                     $("#toListDiv").append(toCont);
                     $("#topMask").fadeOut(300);
                     $("#topMask").remove();
                     $("#contactList").fadeOut(300);
                     $("#listDiv").html("");
                     $("#contactsListForm").val("");
                     
                     });

$(".select2-search-choice-close").live("click", function (e) {
                                       $(this).parent().remove();
                                       var id = $(this).parent().attr('id');
                                       id = parseInt(id);
                                       for(var i = toIds.length - 1; i >= 0; i--) {
                                       if(toIds[i] === id) {
                                       toIds.splice(i, 1);
                                       }
                                       }
                                       
                                       });

function populateContactList(){
	nameList = $("#contactsListForm").val();
	$("#listDiv").html("");
	new commcontacts.CommContactListView({ commcontactCollectionModel : commcontactDetailsList });
	
}

/*$("#contactsListForm").live("tap", function(){
 nameList = $("#contactsListForm").val();
 $("#listDiv").html("");
 new commcontacts.CommContactListView({ commcontactCollectionModel : commcontactDetailsList })                      
 });*/


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

//$("#mailSubject").live("blur", function(){
//  $("#findSub").css("display", "none");
//  });

var toName;
$("#sendMessage").live("click", function(event){
                       var checkBlank = 0;
                       var subject = $("#mailSubject").val();
                       if(subject == ""){
                       checkBlank = 1;
                       alert("Please Enter a subject text.");
                       }
                       toList = new Array();
                       $(".selectedList").each(function(){
                                               var id = $(this).attr("id");
                                               toList.push(id);
                                               });
                       if(toList.length > 0){
                        toList = toList.join();
                       }else{
                        alert("Please enter the recepient");
                        checkBlank = 1;
                       }
                       var commThread;
                       
                       if(storage.getItem("msgThread") == ""){
                       commThread = randString(event);
                       }else{
                       commThread = storage.getItem("msgThread");
                       }
                       var today = currentDate(new Date())+" "+getTimeFormat(new Date());
                       var composeJSON;
                       if(msgType == "textMsg"){
                       var msgBody = $("#composeBody").val();
                       if(msgBody == ""){
                       checkBlank = 1;
                       alert("Please fill the message to be sent.");
                       }else{
                       composeJSON = {
                       "createdby":storage.getItem("userId"),
                       "msgFrom":storage.getItem("userId"),
                       "msgTo":toList, 
                       "msgSubject":subject,
                       "msgBody":msgBody,
                       "communicationThread":commThread,
                       "communicationtime": today
                       }
                       }
                       }else{
                       var value;
                       var labPrescAray = new Array();
                       $(".vitalColl").each(function(){
                                            if($(this).is(':checked') == true){
                                            value = $(this).val();
                                            labPrescAray.push(value);
                                            }else{
                                            
                                            }
                                            });
                       if(labPrescAray.length <= 0){
                       checkBlank = 1;
                       alert("Please select the labs/prescription to be shared.");
                       
                       }else{
                       var labPrescType;
                       var labPrescId;
                       if(storage.getItem("labPrescId") == 1){
                       labPrescType = "P";
                       labPrescId = labPrescAray.join();
                       composeJSON = {
                       "createdby":storage.getItem("userId"),
                       "commType":labPrescType,
                       "patientMedicationId":labPrescId,
                       "msgFrom":storage.getItem("userId"),
                       "msgTo":toList, 
                       "msgSubject":subject,
                       "communicationThread":commThread,
                       "communicationtime": today
                       };
                       }else{
                       labPrescType = "L";
                       labPrescId = labPrescAray.join();
                       composeJSON = {
                       "createdby":storage.getItem("userId"),
                       "commType":labPrescType,
                       "patientVitalId":labPrescId,
                       "msgFrom":storage.getItem("userId"),
                       "msgTo":toList, 
                       "msgSubject":subject,
                       "communicationThread":commThread,
                       "communicationtime": today
                       };
                       }
                       
                       msgType = "textMsg";
                       }
                       }
                       //alert(JSON.stringify(composeJSON));
                       if(checkBlank == 0){
                       $("#composeBody").val("");
                       composeMailModel = new commsubject.commposeMail({});
                       composeMailSuccess = function() {
                       inbox.reviewsCollection = composeMailModel.get("message");
                       response = JSON.stringify(composeMailModel.get("message"));
                       
                       /************For new message****************/
                       if(storage.getItem("msgThread") == "" || storage.getItem("msgThread") == null){
                       var msgto = composeMailModel.get('message').msgto;
                       var sentTime = composeMailModel.get('message').senton;
                       var toList = "";
                       $("#toListDiv").html("");
                       $("#toList").css("width", "85%");
                       var className = "";
                       className = "oldmsg";
                       recepient = msgto.substring(0, msgto.length - 1);
                       recepient = recepient.split("#");
                       
                       for(var i=0; i<recepient.length; i++) {
                       recepient[i] = recepient[i].substr(0, (recepient[i].indexOf(" ")+2));
                       
                       
                       }
                       
                       if(recepient.length > 1){
                       var groupImage = '<img src="../../images/icon_users.png" style="width:15px;height:12px;margin-right:2px;margin-top:8px;" class="fl" />';
                       className = "newMsg";
                       }else{
                       var groupImage = '';
                       className = "oldMsg";
                       }
                       toList = toList+" "+groupImage;
                       for(var i=0; i<recepient.length; i++) {
                       toName = recepient[i].substr(recepient[i].indexOf("@") + 1);
                       ind = recepient[i].substr(0, recepient[i].indexOf("@"));
                       if(i == (recepient.length - 1)){
                       toList = toList+'<div class="selectedList font14 fl" id="'+ind+'">'+toName+'</div>';
                       }else{
                       toList = toList+'<div class="selectedList font14 fl" id="'+ind+'">'+toName+',</div> ';
                       }
                       }
                       
                       $("#toListDiv").append(toList);
                       $("#Subject").html("");
                       $("#Subject").css("marginTop", "10px");
                       $("#Subject").css("width", "52%");
                       $("#toList").css("width", "75%");
                       $("#Subject").css("max-height", "32px");
                       $(".toField").append('<div id="delete" class="fr" style="margin-right:2%;margin-top:3px;display:block;">'+
                                            '<img id="deleteIcon" src="../../images/icon_archive.png" alt="Forward" class="fr" style="height: 24px; width: 22px;"/>'+
                                            '</div>'+
                                            '<div id="forward" class="fr" style="margin-right:6%;margin-top:3px;display:block;">'+
                                            '<img id="forwardIcon" src="../../images/icon_forward.png" alt="Delete" class="fr" style="height: 24px; width: 22px;"/>'+
                                            '</div>');
                       var createdTime = getMonthDateFormat(sentTime);
                       $("#createdDate").html('<span style="text-align:left;color:#777;margin-top:9px;width:100%;" class="font10 fr">'+createdTime+'</span>');
                       var msgSubject = composeMailModel.get('message').msgsubject;
                       var msgSubjectID = msgSubject.substr(0,msgSubject.indexOf("#"));
                       var msgSubjectText = msgSubject.substr(msgSubject.indexOf("#")+1);
                       $("#Subject").html('<span class="font14" style="padding-top:4px;">'+msgSubjectText+'</span><input type="hidden" id="mailSubject" value="'+msgSubjectText+'"/>');
                       $("#Subject").css("margin-top", "3px");
                       
                       }
                       var bottom = $('.subjectField').position().top+$('.subjectField').outerHeight(true);
                       $("#contentPatientCommunicationCompose").css("top", (bottom + 5));
                       /************For new message****************/
                       $("#addToCharacter").css("display", "none");
                       
                       
                       
                       $("#composeBody").val("");
                       var msgId = composeMailModel.get('message').id;
                       var senderId = composeMailModel.get('message').msgfrom.id;
                       var msgBody = composeMailModel.get('message').msgbody;
                       //var sentTime = item.get('senton');
                       var msgText = "";
                       if(msgBody != null && msgBody != ""){
                       msgText = msgBody;
                       }else if(labPrescType == "L"){
                       msgText = '<a href="" id="labs_'+msgId+'" class="labsPrescDiv">View Labs</a>';
                       }else{
                       msgText = '<a href="" id="presc_'+msgId+'" class="labsPrescDiv">View Prescription</a>';
                       }
                       
                       var date  = new Date();
                       var month = parseInt(date.getMonth())+1;
                       if(month < 10){
                       month = "0"+month;
                       }
                       var time = date.getFullYear()+"-"+ month+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
                       
                       
                       time = getInboxDate(time, 1);
                       var msgBodyText = '<span style="float:right;text-align:center;width:100%;font-size:10px;color:#777;">'+time+'</span><div style="width:79%; float: right;display:inline-block;margin-bottom:9px;">'+
                       '<span class="fr nameDiv nameDivRight">me</span>'+
                       '<div class="fr chatBox blueBG">'+msgText+'</div></div><br/>';
                       
                       $("#msgBody").append(msgBodyText);
                       //if (response == trueObj) {
                       $(".vitalColl").attr('checked', false);
                       $("#commMask").fadeOut(300);
                       $("#commMask").remove();
                       $("#prescLabDiv").css("display", "none");
                       storage.setItem("msgThread", commThread);
                       detailPage = 0;
                       msgType = "textMsg";
                       $("#bottomOfDiv").remove();
                       var height = $("#msgBody").css("height");
                       //$("#bottomOfDiv").css("top", height);
                       
                       $("#msgBody").append('<div id="bottomOfDiv" style="position:absolute;top:'+height+';"></div>');
                       document.getElementById('bottomOfDiv').scrollIntoView(true);
                       var refresh = setInterval(function(){
                                                 if(detailPage == 0){
                                                 getUnreadMsgList();
                                                 }else{
                                                 clearInterval(refresh);
                                                 }
                                                 },10000);
                       
                       // } else {
                       //alert(errMsg);
                       //}	 
                       $(".sendField").css("position","fixed");
                       };
                       
                       composeMailError = function() {
                       //alert(serverErrorMessage);
                       };
                       
                       composeMailModel.fetch({ type : postMethod, success : composeMailSuccess, error : composeMailError, data : JSON.stringify(composeJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
                       }
                       });

$("#fwdMessage").live("click", function(event){
                       var checkBlank = 0;
                       var subject = $("#mailSubject").val();
                       toName = new Array();
                       toList = new Array();
                       $(".selectedList").each(function(){
                                               var id = $(this).attr("id");
                                               var name = $("#cnt_"+id).text();
                                               name = name.substr(0, (name.indexOf(" ") + 2));
                                               toName.push(id+"@"+name);
                                               toList.push(id);
                                               });
                       if(toList.length > 0){
                       toList = toList.join();
                       }else{
                       alert("Please enter the recepient");
                       checkBlank = 1;
                       }
                       var commThread;
                       
                       
                       commThread = randString(event);
                       
                       var oldCommThread = storage.getItem("msgThread");
                       storage.setItem("msgThread", "")
                       var today = currentDate(new Date())+" "+getTimeFormat(new Date());
                       var composeJSON;
                       if(msgType == "textMsg"){
                       var msgBody = $("#composeBody").val();
                       if(msgBody == ""){
                       checkBlank = 1;
                       alert("Please fill the message to be sent.");
                       }else{
                       composeJSON = {
                       "createdby":storage.getItem("userId"),
                       "msgFrom":storage.getItem("userId"),
                       "msgTo":toList, 
                       "msgSubject":subject,
                       "body":msgBody,
                       "thread":oldCommThread,
                       "newThread":commThread,
                       "communicationtime": today
                       }
                       }
                       }else{
                       var value;
                       var labPrescAray = new Array();
                       $(".vitalColl").each(function(){
                                            if($(this).is(':checked') == true){
                                            value = $(this).val();
                                            labPrescAray.push(value);
                                            }else{
                                            
                                            }
                                            });
                       if(labPrescAray.length <= 0){
                       checkBlank = 1;
                       alert("Please select the labs/prescription to be shared.");
                       
                       }else{
                       var labPrescType;
                       var labPrescId;
                       if(storage.getItem("labPrescId") == 1){
                       labPrescType = "P";
                       labPrescId = labPrescAray.join();
                       composeJSON = {
                       "createdby":storage.getItem("userId"),
                       "commType":labPrescType,
                       "patientMedicationId":labPrescId,
                       "msgFrom":storage.getItem("userId"),
                       "msgTo":toList, 
                       "msgSubject":subject,
                       "thread":oldCommThread,
                       "newThread":commThread,
                       "communicationtime": today
                       };
                       }else{
                       labPrescType = "L";
                       labPrescId = labPrescAray.join();
                       composeJSON = {
                       "createdby":storage.getItem("userId"),
                       "commType":labPrescType,
                       "patientVitalId":labPrescId,
                       "msgFrom":storage.getItem("userId"),
                       "msgTo":toList, 
                       "msgSubject":subject,
                       "thread":oldCommThread,
                       "newThread":commThread,
                       "communicationtime": today
                       };
                       }
                       
                       msgType = "textMsg";
                       }
                       }
                       //alert(JSON.stringify(composeJSON));
                       if(checkBlank == 0){
                       $("#composeBody").val("");
                       composeMailModel = new commsubject.forwardMail({});
                       composeMailSuccess = function() {
                       inbox.reviewsCollection = composeMailModel.get("message");
                       response = JSON.stringify(composeMailModel.get("message"));
                       /************For new message****************/
                       if(storage.getItem("msgThread") == "" || storage.getItem("msgThread") == null){
                      
                       recepient = toName;
                       $("#sendMessage").css("display", "block");
                       $("#fwdMessage").css("display", "none");
                      
                        backPath="patient_communication";
                        
                        storage.setItem("msgThread", commThread);
                        
                        //$.mobile.changePage($('#patient_communication_compose'));
                        
                        $("#Subject").css("width", "52%");
                        $("#toList").css("width", "75%");
                        $("#toListDiv").html("");
                        $("#addToCharacter").css("display", "none");
                        $("#delete").css("display", "block");
                        $("#forward").css("display", "block");
                        $("#mailSubject").html("");
                        $("#Subject").css("max-height", "32px");
                        $("#sendMessage").css("display", "block");
                        $("#fwdMessage").css("display", "none");
                        //$("#mailSubject").css("height", "10px");
                        openCnt = 2;
                        $("#msgBody").html("");
                        //$("#Subject").css("marginTop", "10px");
                        $("#addToCharacter").css("display","none");
                        var name = storage.getItem("fName")+" "+storage.getItem("lName");
                        $("#nameContent").html(name);
                        detailPage = 0;
                        getDetailMsgList();
                        var refresh = setInterval(function(){
                                                if(detailPage == 0){
                                                getUnreadMsgList();
                                                }else{
                                                clearInterval(refresh);
                                                }
                                                },10000);
                        
                       
                       }
                        $(".sendField").css("position","fixed");
                       };
                       
                       composeMailError = function() {
                       //alert(serverErrorMessage);
                       };
                       
                       composeMailModel.fetch({ type : postMethod, success : composeMailSuccess, error : composeMailError, data : JSON.stringify(composeJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
                       }
                       });


function scrollToBottom(id){
    div_height = $("#"+id).height();
    div_offset = $("#"+id).offset().top;
    window_height = $(window).height();
    $('html,body').animate({
                           scrollTop: div_offset-window_height+div_height
                           },'slow');
}



$(".labsPresc").live("tap", function(){
                     msgType = "labPresc";
                     if($(this).attr('id') == 'Prescription'){
                     storage.setItem("labPrescId", "1");
                     getlabsPresc(1);
                     }else{
                     storage.setItem("labPrescId", "2");
                     getlabsPresc(2);
                     }
                     $('body').append('<div class="mask" id="commMask"></div>');
                     $("#commMask").fadeIn(300);
                     $('#commMask').css("zIndex", 999999);
                     $('#commMask').css("opacity", 0.6);
                     });

$("#cancelLabsPresc").live("tap", function(){
                           msgType = "textMsg";
                           $(".vitalColl").attr('checked', false);
                           $("#commMask").fadeOut(300);
                           $("#commMask").remove();
                           $(".divPrescLab").css("display", "none");
                           });

function getTimeFormat(divDate) {
    divDate = new Date(divDate);
    var timeHr = divDate.getHours() < 10 ? '0' + divDate.getHours() : divDate.getHours();
    var timeMnt = divDate.getMinutes() < 10 ? '0' + divDate.getMinutes() : divDate.getMinutes();
    var dates = timeHr+":"+timeMnt+":00";
    return dates;
}

function showMsgDetail(){
	backPath="patient_communication";
	storage.setItem("msgThread", "thread1");
	$.mobile.changePage($('#patient_communication_compose'));
	detailPage = 0;
	//getDetailMsgList();
	var refresh = setInterval(function(){
                              if(detailPage == 0){
                              //getUnreadMsgList();
                              }else{
                              clearInterval(refresh);
                              }
                              },7000);
}


$(".labsPrescDiv").live("tap", function(){
                        var id = $(this).attr('id');
                        var msgId = id.substr(id.indexOf("_")+1);
                        var msgType = id.substr(0, id.indexOf("_"));
                        //alert(JSON.stringify(inbox.reviewsCollection));
                        var labPrescModel = inbox.reviewsCollection.get(msgId);
                        //alert(JSON.stringify(labPrescModel));
                        new inbox.inboxLabPrescDetailsView({ model : labPrescModel });
                        });


$(".threadList").live("tap", function(){

                      backPath="patient_communication";
                      var id = $(this).attr("id");
                      var receps = $("#recec_"+id).val();
                      recepient = receps.split(",");
                      
                      storage.setItem("msgThread", id);
                      //$.mobile.changePage($('#patient_communication_compose'));
                      gotoPath('#patient_communication_compose');
                      $("#Subject").css("width", "52%");
                      $("#toList").css("width", "75%");
                      $("#toListDiv").html("");
                      $(".toField").append('<div id="delete" class="fr" style="margin-right:2%;margin-top:3px;">'+
                                            '<img id="deleteIcon" src="../../images/icon_archive.png" alt="Forward" class="fr" style="height: 24px; width: 22px;"/>'+
                                           '</div>'+
                                           '<div id="forward" class="fr" style="margin-right:6%;margin-top:3px;">'+
                                           '<img id="forwardIcon" src="../../images/icon_forward.png" alt="Delete" class="fr" style="height: 24px; width: 22px;"/>'+
                                           '</div>');
                      $("#mailSubject").html("");
                      $("#Subject").css("max-height", "32px");
                      $("#sendMessage").css("display", "block");
                      $("#fwdMessage").css("display", "none");
                      //$("#mailSubject").css("height", "10px");
                      openCnt = 2;
                      $("#msgBody").html("");
                      //$("#Subject").css("marginTop", "10px");
                      $("#addToCharacter").css("display","none");
                      var name = storage.getItem("fName")+" "+storage.getItem("lName");
                      $("#nameContent").html(name);
                      detailPage = 0;
                      getDetailMsgList();
                      var refresh = setInterval(function(){
                                                if(detailPage == 0){
                                                getUnreadMsgList();
                                                }else{
                                                clearInterval(refresh);
                                                }
                                                },10000);
                      });

function closeMoreOption(){
    
}



$("#forward").live("tap", function(){
                   initAllCommunicationContactList();
                   backPath="patient_communication";
                   $("#createdDate").html("");
                   $("#delete").css("display", "none");
                   $("#forward").css("display", "none");
                   var id = $(this).attr("id");
                   toIds = new Array();
                   $("#Subject").css("width", "72%");
                   $("#toList").css("width", "75%");
                   $("#toListDiv").html("");
                   var subject = $(".mailSubject").text();
                   $(".mailSubject").prepend("Fwd:");
                   $("#mailSubject").val(subject);
                   $("#Subject").css("max-height", "32px");
                   
                   $("#sendMessage").css("display", "none");
                   $("#fwdMessage").css("display", "block");
                   openCnt = 2;
                   setTimeout(function() {
                              $("#addToCharacter").css("display","block");
                              },200);
                   var name = storage.getItem("fName")+" "+storage.getItem("lName");
                   $("#nameContent").html(name);
                   detailPage = 0;
                   
                   
});



$("#delete").live("tap", function(){
                  if (confirm(deleteComm)) {
                  var deleteCommModel = new communication.DeleteCommunication({});
                  deleteCommSuccess = function() {
                  deleteCommDetails = JSON.stringify(deleteCommModel.get(statusObj));
                  if (deleteCommDetails == trueObj) {
                    //navigator.notification.alert(successDeleteAppt, null, successTitle, okButton);
                    $("#delete").remove();
                    $("#forward").remove();
                    backPath = "patient_communication";
                    gotoPath("#patient_communication");
                    getInboxMsgList();
                  } else {
                    //navigator.notification.alert(errorDeleteAppt, null, errorTitle, okButton);
                  }
                  };
                  
                  deleteCommError = function() {
                  navigator.notification.alert(serverErrorMessage, null, errorTitle, okButton);
                  };
                  
                  var deleteCommJSON = { "communicationThread" : storage.getItem("msgThread") };
                  
                  deleteCommModel.fetch({ type : postMethod, success : deleteCommSuccess, error : deleteCommError, data : JSON.stringify(deleteCommJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
                  }
                   });

/************Communication Ends Here****************/


$("#patient_more").live("tap", function(){
                        backPath="patient_option";
                        $.mobile.changePage($('#patient_option'));
                        });


/******************Communication css Ends here************************/


/******************vitals Starts here************************/

function initVitals() {
    $("#vitalTable").html("");
    var vitalModel = new vitals.Vitals({});
    vitalListSuccess = function() {
	    vitalDetailsList = JSON.stringify(vitalModel.get("patientvital"));
	    vitalDetailsList = eval(" (" + vitalDetailsList + ") ");
	    new vitals.VitalsListView({ vitalCollection : vitalDetailsList });
    };
    
    vitalListError = function() {
	    alert(serverErrorMessage);
    };
    
    var vitalJSON = { patientId : storage.getItem(patientId), };
    
    vitalModel.fetch({ type : postMethod, success : vitalListSuccess, error : vitalListError, data : JSON.stringify(vitalJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}


$('#patient_vital').live('pageshow', function(event) {
                         backPath="patient_vital";
                         cnt = 0;
                         $("#maxMinFooterVital").off();
                         $("#maxMinFooterVital").live('click', function() {
                                                      var footId = $(this).attr('src');
                                                      minimizeFooter(footId, 'Vital');
                                                      });
                         setTimeout(function() {
                                    initVitals();
                                    }, 200);
                         
                         });


/******************vitals Ends here************************/



/******************PCT Starts here************************/

function initPCT() {
    $("#pctTable").html("");
    $("#pctContents").html("");
    var pctModel = new pct.PCT({});
    pctListSuccess = function() {
	    pctDetailsList = JSON.stringify(pctModel.get("caretaker"));
	    getStatesList();
	    pctDetailsList = eval(" (" + pctDetailsList + ") ");
	    new pct.pctListView({ pctCollection : pctDetailsList });
    };
    
    pctListError = function() {
	    alert(serverErrorMessage);
    };
    
    var pctJSON = { patientId : storage.getItem(patientId), };
    
    pctModel.fetch({ type : postMethod, success : pctListSuccess, error : pctListError, data : JSON.stringify(pctJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}


$("#openPatientCT").live("click", function() {
                         backPath="patient_PCT";
                         $.mobile.changePage($('#patient_PCT'));
                         $("#pctContents").html("");
                         setTimeout(function() {
                                    initPCT();
                                    }, 200);
                         $("#moreDiv").animate({ height : '0%' }, 200, function() {
                                               $("#moreDiv").fadeOut(300);
                                               });
                         });

$('#patient_PCT_detail').live('pagebeforeshow', function() {
                              cnt = 0;
                              var pctDetailsContainer = $('#patient_PCT_detail').find(":jqmData(role='pctTableDetail')");
                              var ctId = storage.getItem("ctId");
                              pctModel = pctCollection.get(ctId);
                              var pctDetailsView = new pct.pctListDetailView({ model : pctModel, viewContainer : pctDetailsContainer });
                              pctDetailsView.render();
                              });


/******************PCT Ends here************************/

$(document).on("click", "#settingLink", function() {
               gotoPath("#patient_setting");
               $("#moreDiv").animate({ height : '0%' }, 200, function() {
                                     $("#moreDiv").fadeOut(300);
                                     });
               });


$("#change_password_submit").click(function(event) {
                                   event.preventDefault();
                                   $("#change_password_message").removeClass("none").addClass("block");
                                   $("#mandatory_field_error_change_password").removeClass("block").addClass("none");
                                   $("#password_not_matching_change_password").removeClass("block").addClass("none");
                                   $("#wrong_password_change_password").removeClass("block").addClass("none");
                                   $("#successfully_changed").removeClass("block").addClass("none");
                                   var oldPassword = $('#change_password_old').val();
                                   var newPassword = $('#change_password_new').val();
                                   var reNewPassword = $('#change_password_confirm_new').val();
                                   if (oldPassword == "" || newPassword == "" || reNewPassword == "") {
                                   $("#mandatory_field_error_change_password").removeClass("none").addClass("block");
                                   return false;
                                   } else if (newPassword != reNewPassword) {
                                   $("#password_not_matching_change_password").removeClass("none").addClass("block");
                                   return false;
                                   } else {
                                   var changePasswordInfo = { userName : storage.getItem("username"), user_password : oldPassword, new_password : newPassword };
                                   
                                   var myChangePassword = new ChangePassword();
                                   
                                   var fetchSuccess = function() {
                                   // validating response , on successful response display
                                   // proper message
                                   if (myChangePassword.get(statusObj) == trueObj) {
                                   $("#successfully_changed").removeClass("none").addClass("block");
                                   } else {
                                   // show an error message
                                   $("#wrong_password_change_password").removeClass("none").addClass("block");
                                   return false;
                                   }
                                   };
                                   
                                   var fetchError = function() {
                                   alert(serverErrorMessage);
                                   };
                                   
                                   myChangePassword.fetch({ type : postMethod, success : fetchSuccess, error : fetchError, data : JSON.stringify(changePasswordInfo), contentType : requestHeader, processData : true });
                                   }
                                   });

$(".patient_logout").live("tap", function(event) {
                          $("#moreDiv").fadeOut(300);
                          $("#configureDiv").fadeOut(300);
                          storage.setItem("username", "");
                          storage.getItem("password", "");
                          window.clearTimeout(application.timeoutVar);
                          
                          window.clearTimeout(application.lockTimeoutVar);
                          storage.setItem("isAppLoggedOut", true);
                          gotoPath('#appPage');
                          });



$(".patient_change_password").live("tap", function(event) {
                                   $("#change_password_message").removeClass("block").addClass("none");
                                   $("#moreDiv").fadeOut(300);
                                   
                                   $("#configureDiv").fadeOut(300);
                                   gotoPath('#change_password');
                                   });

$(document).on("pageshow", "#patient_setting", function() {
               if (application.isDefaultLogout) {
               $("#defaultLogout").attr("checked", true).checkboxradio("refresh");
               $("#logoutTime").removeAttr("disabled");
               $("#logoutTime").val(application.logoutTime / 3600000);
               } else {
               $("#logoutTime").attr("disabled", true);
               }
               });

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

$(document).on("change", "#logoutTime", function(event) {
               if (isValidNumber($(this).val()))
               setLogoutTime($(this).val());
               else
               alert("Please enter valid hour time");
               });

/*$("#patient_autoLock_Setting").live("pageshow", function(){
 alert(newPinPage);
 if(newPinPage == 0){
 pin = "";
 $(".setPin").val("");
 $("#confirmLock").remove();
 $("#headerPatientSetting").append('<div id="setPinLock" class="ui-btn-right composeButton" style="right:10px;bottom:10px !important;">New</div>');
 $("#settingsOptionBack").css("display", "none");
 }else{
 
 }
 });*/

$("#setPinLock").live("tap", function(){
                      pin = "";
                      $(".setPin").each(function(){
                                        var pins = $(this).val();
                                        pin = pin+""+pins;
                                        });
                      var pinLength = pin.length;
                      if(pinLength < 4) {
                      alert("Please enter four digit pin");
                      pin = "";
                      } else {
                      newPinPage = 1;
                      gotoPath("#patient_autoLock_Setting");
                      confirmPin = "";
                      $(".setPin").val("");
                      $("#setPinLock").remove();
                      $("#settingsOptionBack").css("display", "block");
                      $("#headerPatientSetting").append('<div id="confirmLock" class="ui-btn-right composeButton width70" style="right:10px;bottom:10px !important;">Save</div>');
                      $("#lockText").html("Confirm Unlock Password");
                      }
                      
                      
                      });

$("#confirmLock").live("tap", function(){
                       
                       confirmPin = "";
                       $(".setPin").each(function(){
                                         var pins = $(this).val();
                                         confirmPin = confirmPin+""+pins;
                                         });
                       if(confirmPin == ""){
                       $("#errorPassword").html("Please enter pin");
                       confirmPin = "";
                       } else if (confirmPin.length < 4) {
                       $("#errorPassword").html("Please enter four digit pin")
                       storage.getItem("loggedInFirstTime", true);
                       confirmPin = "";
                       } else if(pin != confirmPin){
                       $("#errorPassword").html("Please enter same pin");
                       }else{
                       var lockJSON = { "userId" : storage.getItem("userId"), "lockCode" : confirmPin};
                       
                       var pinLockModel = new pinLock.PinLock({});
                       
                       pinLockSuccess = function() {
                       
                       lockDetails = JSON.stringify(pinLockModel.get("status"));
                       storage.setItem("PIN", confirmPin);
                       storage.setItem("isAppLocked", true);
                       alert("Lock has been set.");
                       if(storage.getItem("loggedInFirstTime") != null || storage.getItem("loggedInFirstTime") == "false"){
                       gotoPath("#patient_option");
                       
                       }else{
                       storage.setItem("loggedInFirstTime", false);
                       gotoPath("#appHomePagePortrait"); 
                       }
                       
                       };
                       
                       pinLockError = function() {
                       alert(serverErrorMessage);
                       };
                       
                       pinLockModel.fetch({ type : postMethod, success : pinLockSuccess, error : pinLockError, data : JSON.stringify(lockJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
                       
                       }
                       
                       });

$("#patient_lock_Setting").live("tap", function(){
                                newPinPage = 0;
                                setTimeout(function() {
                                           gotoPath("#patient_autoLock_Setting"); 
                                           pin = "";
                                           $(".setPin").val("");
                                           $("#confirmLock").remove();
                                           $("#headerPatientSetting").append('<div id="setPinLock" class="ui-btn-right composeButton width70" style="right:10px;bottom:10px !important;">Confirm</div>');
                                           $("#lockText").html("Set Unlock Password");
                                           $("#settingsBack").css("display", "none");
                                           $(".footer").css("display", "block");
                                           $(".communicationFooterDiv").css("display", "block");
                                           }, 400);
                                
                                });


$(document).on("pageshow", "#patient_autoLock", function() {
               pin = "";
               $("#errorPassword").html("");
               $("#applicationPassword").val("");
               storage.setItem("isAppLocked", true);
               });
var pin;
$("#unlockApplication").live("tap", function(event) {
                             var pwd = $("#applicationPassword").val();
                             if (pwd == "") {
                             $("#errorPassword").html("Please enter pin");
                             } else if (pwd == storage.getItem("PIN")) {
                             defaultLogin();
                             } else {
                             $("#errorPassword").html("Invalid pin");
                             }
                             });

$(".pin").live("keyup", function(){
               var id = $(this).attr("id"); 
               if(id != "pin4"){
               var value = $(this).val();
               if(value.length == 1){
               var pinId = id.substr(id.indexOf('n')+1);
               $('#pin1').focusout();
               }
               }else{
               $(".pin").each(function(){
                              var pins = $(this).val();
                              pin = pin+""+pins;
                              });
               
               if (pin == "") {
               $("#errorPassword").html("Please enter pin");
               pin = "";
               } else if (pin == storage.getItem("PIN")) {
               defaultLogin();
               } else {
               $("#errorPassword").html("Invalid pin");
               pin = "";
               $(".pin").val("");
               }
               }
               
               });




/****************************Common functions Starts Here************************/

function getReminder(reminder) {
    if (reminder.search("#H")) {
        reminder = reminder.replace("#H", " Hours");
    } else {
        reminder = reminder.replace("#D", " Days");
    }
    return reminder;
}

function fadeIn(id) {
    $("#" + id).fadeIn(300);
}

function fadeOut(id) {
    $("#" + id).fadeOut(300);
}

function remove(id) {
    $("#" + id).remove();
}

function removeDuplicate(arrayName) {
    var newArray = new Array();
    for ( var i = 0; i < arrayName.length; i++) {
        for ( var j = 0; j < newArray.length; j++) {
            
            if (newArray[j] == arrayName[i]) {
                endDateArr.splice(i, 1);
                continue;
            }
        }
        newArray[newArray.length] = arrayName[i];
    }
    return newArray;
    
}

function currentDate(divDate) {
    divDate = new Date(divDate);
    var month = divDate.getMonth() + 1;
    var year = divDate.getFullYear();
    var day = divDate.getDate();
    if (month < 10) {
        if (day < 10) {
            dates = year + "-0" + month + "-0" + day;
        } else {
            dates = year + "-0" + month + "-" + day;
        }
        
    } else {
        if (day < 10) {
            dates = year + "-" + month + "-0" + day;
        } else {
            dates = year + "-" + month + "-" + day;
        }
    }
    return dates;
}

function getDisplayDateFormat(divDate) {
    divDate = new Date(divDate);
    var month = divDate.getMonth() + 1;
    var year = divDate.getFullYear();
    var day = divDate.getDate();
    if (month < 10) {
	    if (day < 10) {
            dates = "0" + month + "/0" + day + "/" + year;
	    } else {
            dates = "0" + month + "/" + day + "/" + year;
	    }
        
    } else {
	    if (day < 10) {
            dates = "" + month + "/0" + day + "/" + year;
	    } else {
            dates = "" + month + "/" + day + "/" + year;
	    }
    }
    return dates;
}

function getDisplayDateMonth(divDate){
    divDate = new Date(divDate);
    var month = divDate.getMonth() + 1;
    var year = divDate.getFullYear();
    var day = divDate.getDate();
    
    var monthName = shortMonthNames[month - 1];
    var dayText = "";
    
    if (day < 10) {
        dayText = monthName + " 0" + day;
    } else {
        dayText = monthName + " " + day;
    }
    return dayText;
}

function getNextDate(currntDate){
    currntDate = new Date(currntDate);
    var month = currntDate.getMonth();
    var year = currntDate.getFullYear();
    var day = currntDate.getDate();
    var offset = 1; // Tomorow
    //alert(day+offset);
    var future_date = new Date(year, month , day+offset);
    //future_date = currentDate(future_date);
    return future_date;
}

function getPrevDate(currntDate){
    currntDate = new Date(currntDate);
    var month = currntDate.getMonth();
    var year = currntDate.getFullYear();
    var day = parseInt(currntDate.getDate());
    var offset = 1; // Tomorow
    
    var prev_date = new Date(year, month , day-offset);
    //prev_date = currentDate(prev_date);
    return prev_date;
}

function getTwelveHours(time){
    var hour = parseInt(time.substr(0, time.indexOf(":")));
    var type = "am";
    if(hour >= 12){
        hour = hour - 12;
        type = "pm";
    }
    var min = parseInt(time.substr(time.indexOf(":")+1));
    
    if(min > 9){
        min = min;
    }else{
        min = "0"+min;
    }
    
    var newTime = hour+":"+min+" "+type;
    return newTime;
}

function getMonthDateFormat(time){
    var crYear = time.substr(0, time.indexOf("-"));
    var rest = time.substr(time.indexOf("-")+1);
    var crMonth = parseInt(rest.substr(0, rest.indexOf("-")));
    rest = rest.substr(rest.indexOf("-")+1);
    var crDate = rest.substr(0, rest.indexOf(" "));
    rest = rest.substr(rest.indexOf(" ")+1);
    var today = rest.indexOf("Today");
    
    if(today >=0){
        time = rest.substr(rest.indexOf("y ")+1);
    }else{
        time = rest.substr(0);
    }
    if(time.indexOf("pm") >= 0){
        time = time.replace("pm", " pm");
    }else{
        time = time.replace("am", " am");
    }
    crMonth = shortMonthNames[crMonth-1];
    var newDate = crMonth+" "+crDate+", "+crYear+", "+time;
    return newDate;
}

function getInboxDate(time, id){
    time = time.split("-");
    time = time.join("/");
    if(id == 1){  
        if(time.indexOf("pm") >= 0){
            time = time.replace("pm", " pm");
        }else{
            time = time.replace("am", " am");
        }
        if(time.indexOf(" Today") >= 0){
            time = time.replace(" Today", "");
        }
    }
    
    time = new Date(time);
    var sntTime = Date.parse(time);
    var sntHour = time.getHours();
    var sntMin = time.getMinutes();
    var sntYear = time.getFullYear();
    var sntMonth = time.getMonth();
    var sntDay = time.getDate();
    var sntDate = sntYear+"-"+sntMonth+"-"+sntDay;
    var today = new Date();
    var crntTime = Date.parse(today);
    var crntYear = today.getFullYear();
    var crntMonth = today.getMonth();
    var crntDay = today.getDate();
    var crntDate = crntYear+"-"+crntMonth+"-"+crntDay;
    var prevDate = parseInt(crntDay);
    var prevWeek = new Date();
    prevWeek.setDate(prevWeek.getDate()-7);
    prevWeek = new Date(prevWeek);
    //prevWeek = Date.parse(prevWeek);
    
    var prevMonth = new Date();
    prevMonth.setDate(prevMonth.getDate()-prevDate);
    prevMonth = new Date(prevMonth);
    //prevMonth = Date.parse(prevMonth);
    
    var displayDate = "";
    var displayTime = getTwelveHours(sntHour+":"+sntMin);
    var sentMonth = sntMonth;
    var sentDay = sntDay;
    var sentYear;
    sntYear = sntYear.toString();
    if(sntDate == crntDate){
        if(id == 0){
            displayDate = displayTime;
        }else{
            displayDate = "Today "+displayTime;
        }
    }else if((time < today) && (time > prevWeek)){
        
        var weekday = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
        var dayName = weekday[parseInt(time.getDay())];
        displayDate = dayName;
        displayDate = displayDate+" "+displayTime;
        
    }else if((time < prevWeek) && (time > prevMonth)){
        
        var monthName = shortMonthNames[parseInt(sntMonth)];
        if(sntMonth > 9){
            sentMonth = "0"+sntMonth;
        }
        if(sntDay > 9){
            sentDay = "0"+sntDay;
        }
        sentYear = sntYear.substr(2);
        //displayDate = monthName+" "+sntDay;
        displayDate = sentMonth+"/"+sentDay+"/"+sentYear;
    }else{
        
        var monthName = shortMonthNames[parseInt(sntMonth)];
        //displayDate = monthName+" "+sntYear;
        if(sntMonth > 9){
            sentMonth = "0"+sntMonth;
        }
        if(sntDay > 9){
            sentDay = "0"+sntDay;
        }
        sentYear = sntYear.substr(2);
        //displayDate = monthName+" "+sntDay;
        displayDate = sentMonth+"/"+sentDay+"/"+sentYear;
    }
    return displayDate;
    
}


/****************************Common functions Ends Here************************/



/*************************Back Button Functions Starts Here********************/

$(document).on("click", "#backApptDetails", function() {
               backPath = "patient_appointment";
               gotoPath("#patient_appointment");
               });

$(document).on("click", "#backActntDetails", function() {
               backPath = "patient_action";
               $("#addAction").addClass("block").removeClass("none");
               action.isEditAction = false;
               gotoPath("#patient_action");
               });

$(document).on("click", "#backMedication", function() {
               backPath = "patient_medicine";
               gotoPath("#patient_medicine");
               });

$(document).on("click", "#backToPCTList", function() {
               backPath = "patient_PCT";
               gotoPath("#patient_PCT");
               });
$("#settingsOptionBack").live("tap", function() {
                              newPinPage = 0;
                              gotoPath("#patient_autoLock_Setting");
                              pin = "";
                              $(".setPin").val("");
                              $("#confirmLock").remove();
                              $("#headerPatientSetting").append('<div id="setPinLock" class="ui-btn-right composeButton width70" style="right:10px;bottom:10px !important;">Confirm</div>');
                              $("#lockText").html("Set Unlock Password");
                              $("#settingsOptionBack").css("display", "none");
                              });

$("#chngPwdBackbtn").live("tap", function() {
                          backPath = backPath.replace("#", "");
                          gotoPath("#"+backPath);
                          });

$("#leftMsgIcon").live("tap", function() {
                       
                       detailPage = 1;
                       backPath = backPath.replace("#", "");
                       getReadUnreadCnt();
                       getReadUnreadStatus();
                       $("#contactList").css("display","none");
                       $("#topMask").fadeOut(300);
                       $("#topMask").remove();
                       $("#delete").remove();
                       $("#forward").remove();
                       $("#composeBody").val("");
                       setTimeout(function() {
                                  gotoPath("#patient_communication");
                                  $("#createdDate").html("");
                                  $("#toListDiv").html("");
                                  $("#Subject").html("");
                                  $("#contentPatientCommunication").html("");
                                  getInboxMsgList();
                                  }, 300);
                       
                       });

$("#settingsBack").live("tap", function() {
                        gotoPath("#patient_option");
                        
                        });



/*************************Back Button Functions Starts Here********************/




/********************Add/Edit/Delete Appointment Starts Here**********************/


function initSpecialityDoctor() {
    
    var specialityModel = new speciality.Speciality({});
    specialityListSuccess = function() {
        specialityDetailsList = JSON.stringify(specialityModel.get("specialtydoctor"));
        specialityDetailsList = eval(" (" + specialityDetailsList + ") ");
        populateSpeciality();
    };
    
    specialityListError = function() {
        alert(serverErrorMessage);
    };
    
    var specialityJSON = { patientId : storage.getItem(patientId) };
    
    specialityModel.fetch({ type : postMethod, success : specialityListSuccess, error : specialityListError, data : JSON.stringify(specialityJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}

$("#deleteAppointment").live("tap", function() {
                             if (confirm(deleteAppt)) {
                             var deleteAppointmentModel = new appointment.Deleteappointment({});
                             deleteAppointmentSuccess = function() {
                             deleteAppointmentDetails = JSON.stringify(deleteAppointmentModel.get(statusObj));
                             if (deleteAppointmentDetails == trueObj) {
                             navigator.notification.alert(successDeleteAppt, null, successTitle, okButton);
                             $("#delete").remove();
                             $("#forward").remove();
                             backPath = "patient_appointment";
                             gotoPath("#patient_appointment");
                             } else {
                             navigator.notification.alert(errorDeleteAppt, null, errorTitle, okButton);
                             }
                             };
                             
                             deleteAppointmentError = function() {
                             navigator.notification.alert(serverErrorMessage, null, errorTitle, okButton);
                             };
                             
                             var deleteAppointmentJSON = { "patientAppointmentId" : appointmentModel.get("id"), patientId : storage.getItem(patientId) };
                             
                             deleteAppointmentModel.fetch({ type : postMethod, success : deleteAppointmentSuccess, error : deleteAppointmentError, data : JSON.stringify(deleteAppointmentJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
                             }
                             });

function getTime(dateTime) {
	var month = (dateTime.getMonth() < 10) ? "0" + (dateTime.getMonth()) : dateTime.getMonth();
	var day = (dateTime.getDate() < 10) ? "0" + (dateTime.getDate()) : dateTime.getDate();
	var timeHr = dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours();
	var timeMnt = dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes();
	timeHr = timeHr < 12 ? timeHr + ":" + timeMnt + " AM" : timeHr + ":" + timeMnt + " PM";
	var date = month + "/" + day + "/" + dateTime.getFullYear() + " " + timeHr;
	return date;
}

function getAppointmentFormatDate(date) {
	if (date != '') {
        var appEndDate;
        var s = date.replace(/[ :]/g, "-").split("-"),
        appEndDate = new Date( s[0], s[1], s[2], s[3], s[4], s[5] );
        var date = getTime(appEndDate);
        if (date.indexOf("PM") >= 0) {
            var hr = parseInt(date.substr((date.indexOf(" ") + 1), 2)) - 12;
            hr = hr < 10 ? "0" + hr : hr;
            var dt = date.substr(0, (date.indexOf(" ")));
            var tm = date.substr(date.indexOf(":"));
            date = dt + " " + hr + "" + tm;
        }
	} else {
        date = "";
	}
	return date;
}

$("#editAppointment").live("click", function() {
                           initSpecialityDoctor();
                           var endDate = getAppointmentFormatDate(appointmentModel.get('enddate'));
                           var startDate = getAppointmentFormatDate(appointmentModel.get('startdate'));
                           var appt = appointmentModel.get('confirmed');
                           
                           var docFName = appointmentModel.get("doctor").firstName;
                           var docLName = appointmentModel.get("doctor").lastName;
                           var docSpeciality = appointmentModel.get("specialty").name;
                           var remindMeData1 = appointmentModel.get('reminder1');
                           var remindMetype1 = remindMeData1.substr(remindMeData1.indexOf(hashObj) + 1);
                           remindMeData1 = parseInt(remindMeData1.substr(0, remindMeData1.indexOf(hashObj)));
                           
                           var remindMeData2 = appointmentModel.get('reminder2');
                           var remindMetype2 = remindMeData2.substr(remindMeData2.indexOf(hashObj) + 1);
                           remindMeData2 = parseInt(remindMeData2.substr(0, remindMeData2.indexOf(hashObj)));
                           var frequency = appointmentModel.get('frequency');
                           
                           var descriptionData = appointmentModel.get('description');
                           
                           var notificationContent = '<div id="notContent" style="height:80%;width:97%;margin-left:auto;margin-right:auto;z-index:9999999;"></div>';
                           $("#headerApptDetail").append(notificationContent);
                           var addContent = createForm();
                           $("#addAppointmentDiv").css("display", "block");
                           $("#notContent").html(addContent);
                           $("#docNameDiv").html(docFName + " " + docLName);
                           $("#isUpdate").val("1");
                           $("#docSpecialityTextDiv").html(docSpeciality);
                           $("#docSpecialityId").val(appointmentModel.get("specialty").id);
                           $("#docId").val(appointmentModel.get("doctor").id);
                           $("#fromDate").val(startDate);
                           $("#toDate").val(endDate);
                           $('#reminder1Data').val(remindMeData1);
                           $('#reminder1').val(remindMetype1);
                           $('#reminder2Data').val(remindMeData2);
                           $('#reminder2').val(remindMetype2);
                           $('#frequency').val(frequency);
                           
                           $("#descriptionData").val(descriptionData);
                           var patientId = $("#patientAppointmentId").val();
                           if (appt == true) {
                           $('#appointmentNeed').attr('checked', 'checked');
                           $(".dateVisible").css("display", "block");
                           } else {
                           $('#appointmentNeed').removeAttr('checked');
                           $(".dateVisible").css("display", "none");
                           }
                           $("#appointmentNeed").live("click", function() {
                                                      if ($('#appointmentNeed').attr('checked') == 'checked') {
                                                      $(".dateVisible").css("display", "block");
                                                      } else {
                                                      $(".dateVisible").css("display", "none");
                                                      }
                                                      });
                           expand = false;
                           slideDiv("headerApptDetail");
                           
                           });

$("#addAppointment").live("click", function() {
                          initSpecialityDoctor();
                          var notificationContent = '<div id="notContent" style="height:80%;width:97%;overflow:auto;margin-left:auto;margin-right:auto;"></div>';
                          $("#headerAppointment").append(notificationContent);
                          var addContent = createForm();
                          
                          $("#addAppointmentDiv").css("visibility", "visible");
                          $("#notContent").html(addContent);
                          $("#isUpdate").val("0");
                          expand = false;
                          slideDiv("headerAppointment");
                          $("#appointmentNeed").live("click", function() {
                                                     if ($('#appointmentNeed').attr('checked') == 'checked') {
                                                     $(".dateVisible").css("display", "block");
                                                     } else {
                                                     $(".dateVisible").css("display", "none");
                                                     }
                                                     });
                          });

function populateSpeciality() {
	new speciality.SpecialityListView({ specCollectionModel : specialityDetailsList });
    
}

//function setSpeciality(specId) {
$("#docSpecialityText").live("change", function(){
                             //$("#docSpecialityText").val($(hashObj + specId).text());
                             //$("#docSpecialityId").val(specId);
                             specialityId = $(this).val();
                             $("#docSpecialityId").val(specialityId);
                             $("#docName").html("");
                             populateDoctor();
                             });

function populateDoctor() {
	new speciality.doctorDetailsView({ specCollectionModel : specialityDetailsList });
}

$("#docName").live("change", function(){
                   $("#docId").val($(this).val());
                   });

function validationField() {
    $(".required").each(function() {
                        if ($(this).css("display") != "none") {
                        var value = $(this).val();
                        if (value == "") {
                        //$(this).css("border", "2px solid red");
                        $("#inputErrorMsg").css("display", "block");
                        $("#inputErrorMsg").html("Please fill all the required fields marked with *.");
                        Fielderror = 1;
                        }
                        }
                        });
}

function isValid(val, field) {
    if (isNaN(val)) {
        //$("#" + field).css("border", "2px solid red");
        $("#inputErrorMsg").css("display", "block");
        $("#inputErrorMsg").html("Please Enter valid Number for the fields marked in red.");
        Fielderror = 1;
    }
}

function savePatientAppointment() {
    $("#inputErrorMsg").css("display", "none");
    $("#inputErrorMsg").html("");
    $(".required").css("border", "1px solid #000");
    Fielderror = 0;
    validationField();
    var docId = $("#docId").val();
    
    var docSpecialityId = $("#docSpecialityId").val();
    var startDate = $("#fromDate").val();
    if (startDate != "") {
        startDate = new Date(startDate);
        startDate = dateFormat(startDate, "yyyy-mm-dd'T'HH:MM:ss.lo");
    }
    
    var today = new Date();
    today = dateFormat(today, "yyyy-mm-dd'T'HH:MM:ss.lo");
    var status;
    if ($("#appointmentNeed").attr('checked') == 'checked') {
        status = true;
        var endDate = $("#toDate").val();
        if (endDate != "") {
            endDate = new Date(endDate);
            endDate = dateFormat(endDate, "yyyy-mm-dd'T'HH:MM:ss.lo");
        }
        
    } else {
        endDate = "";
        status = false;
    }
    var type;
    if (docSpecialityId == 6) {
        type = "L";
    } else {
        type = "N";
    }
    
    var remindMeData1 = $('#reminder1Data').val();
    isValid(remindMeData1, "reminder1Data");
    var remindMeType1 = $("#reminder1").val();
    remindMeData1 = remindMeData1 + "" + remindMeType1;
    var remindMeData2 = $('#reminder2Data').val();
    isValid(remindMeData2, "reminder2Data");
    var remindMeType2 = $("#reminder2").val();
    remindMeData2 = remindMeData2 + "" + remindMeType2;
    var frequency = $("#frequency").val();
    var descriptionData = $("#descriptionData").val();
    if (Fielderror == 0) {
        var apptJson = "";
        var apptModel;
        if (endDate == "") {
            if ($("#isUpdate").val() == "1") {
                apptJson = { patientId : storage.getItem(patientId), "id" : appointmentModel.get("id"), "doctor" : { "id" : docId }, "specialty" : { "id" : docSpecialityId }, "confirmed" : status, "description" : descriptionData, "frequency" : "Daily", "reminder1" : remindMeData1, "reminder2" : remindMeData2, "status" : status, "startDate" : startDate, "creationDate" : today, "lastUpdationDate" : today, "createdBy" : storage
                    .getItem("userId"), "lastUpdatedBy" : storage.getItem("userId"), "isDeleted" : falseObj };
                apptModel = new appointment.EditAppointment({});
            } else {
                apptJson = { patientId : storage.getItem(patientId), "doctor" : { "id" : docId }, "specialty" : { "id" : docSpecialityId }, "type" : type, "confirmed" : status, "description" : descriptionData, "frequency" : "Daily", "reminder1" : remindMeData1, "reminder2" : remindMeData2, "status" : status, "startDate" : startDate, "creationDate" : today, "lastUpdationDate" : today, "createdBy" : storage
                    .getItem("userId"), "lastUpdatedBy" : storage.getItem("userId"), "isDeleted" : falseObj };
                apptModel = new appointment.AddAppointment({});
            }
        } else {
            if ($("#isUpdate").val() == "1") {
                apptJson = { patientId : storage.getItem(patientId), "id" : appointmentModel.get("id"), "doctor" : { "id" : docId }, "specialty" : { "id" : docSpecialityId }, "confirmed" : status, "description" : descriptionData, "frequency" : "Daily", "reminder1" : remindMeData1, "reminder2" : remindMeData2, "status" : status, "startDate" : startDate, "endDate" : endDate, "creationDate" : today, "lastUpdationDate" : today, "createdBy" : storage
                    .getItem("userId"), "lastUpdatedBy" : storage.getItem("userId"), "isDeleted" : falseObj };
                apptModel = new appointment.EditAppointment({});
            } else {
                apptJson = { patientId : storage.getItem(patientId), "doctor" : { "id" : docId }, "specialty" : { "id" : docSpecialityId }, "type" : type, "confirmed" : status, "description" : descriptionData, "frequency" : "Daily", "reminder1" : remindMeData1, "reminder2" : remindMeData2, "status" : status, "startDate" : startDate, "endDate" : endDate, "creationDate" : today, "lastUpdationDate" : today, "createdBy" : storage
                    .getItem("userId"), "lastUpdatedBy" : storage.getItem("userId"), "isDeleted" : falseObj };
                apptModel = new appointment.AddAppointment({});
            }
        }
        //alert(JSON.stringify(apptJson));
        apptSuccess = function() {
            //apptDetails = JSON.stringify(apptModel.get(statusObj));
            //backPath = "patient_appointment";
            //gotoPath("#patient_appointment");
            expand = true;
            if ($("#isUpdate").val() == "0") {
                slideDiv("headerAppointment");
            } else {
                slideDiv("headerApptDetail");
            }
            $(".dateVisible").css("display", "none");
            var date = new Date();
            var month = date.getMonth();
            
            initAppoint(month+1);
            
            gotoPath("#patient_appointment");
            $(".imgappt").remove();
            //initAppoint();
            /*---Status while saving is pending for the webservice. This commented code will be used for that.
             if(apptDetails==trueObj){
             if($("#isUpdate").val() == "0"){
             navigator.notification.alert(successAddAppt, null, successTitle, okButton);
             }else{
             navigator.notification.alert(successEditAppt, null, successTitle, okButton);
             }
             gotoPath("#patient_appointment");
             }else{
             if($("#isUpdate").val() == "0"){
             navigator.notification.alert(errorAddAppt, null, successTitle, okButton);
             }else{
             navigator.notification.alert(errorEditAppt, null, successTitle, okButton);
             }
             }*/
            
            //initAppoint();
        };
        
        apptError = function() {
            alert(serverErrorMessage);
        };
        
        apptModel.fetch({ type : postMethod, success : apptSuccess, error : apptError, data : JSON.stringify(apptJson), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
        
    }
    
}


function cancelPatientAppointment() {
    expand = true;
    if ($("#isUpdate").val() == "0") {
        slideDiv("headerAppointment");
    } else {
        slideDiv("headerApptDetail");
    }
    $(".dateVisible").css("display", "none");
}

function slideDiv(divId) {
    if (expand == false) {
        $(hashObj + divId).animate({ height : '100%' }, 500, function() {
                                   expand = true;
                                   $('.datetimepicker').scroller({ preset : 'datetime', theme : 'android', display : 'modal', mode : 'scroller' });
                                   $(".subHeader").css("left", "0px");
                                   });
    } else {
        $(hashObj + divId).animate({ height : '40px' }, 500, function() {
                                   $("#notContent").remove();
                                   $(".subHeader").css("left", "0px");
                                   expand = false;
                                   });
    }
}

function createForm() {
	var content = '<div id="addAppointmentDiv" style="">' + '<label class="hiddenLabel none" id="inputErrorMsg"></label>' + '<div style="display:block;padding-top:5%;" class="AppointmentOperation fr">' + '<div class="saveAppointmentOperation"><a style="padding: 8px 20px; margin-right: 10px;" class="grayButton cancelMedication" onclick="cancelPatientAppointment()"> Cancel </a> <a onclick="savePatientAppointment();return false;" style="padding:8px 20px;" class="medicationSaveButton blueButton" href="javascript:void(0);"> Save </a> </div>' + '</div>' + '<br/>' + '<form id="Appt">' + '<div class="addApptDiv">' + '<div class="fieldDiv">' + '<div class="fl inputLabel">Speciality*: </div>' + '<div class="fr width60" id="docSpecialityTextDiv">' + '<select id="docSpecialityText" data-role="none" class="required"></select>' + '</div>' + '</div>' + '</div>' + '<br/>' + '<input type="hidden" id="docSpecialityId" value="" />' + '<div class="fieldDiv">' + '<div class="fl inputLabel">Doctor Name*: </div>' + '<div class="fr width60" id="docNameDiv">' + '<select id="docName" data-role="none" class="required"></select>' + '</div>' + '</div>' + '</div>' + '<br/>' + '<input type="hidden" id="docId" value="" />' + '<input type="hidden" id="isUpdate" value="" />' + '<div class="fieldDiv">' + '<div class="fl inputLabel">Appointment: </div>' + '<div class="fr width60">' + '<input type="checkbox" id="appointmentNeed" value="">' + '</div>' + '</div>' + '<br/>' + '<div class="fieldDiv">' + '<div class="fl inputLabel">From*: </div>' + '<div class="fr width60">' + '<input type="text" id="fromDate" class="datetimepicker width100 required" value="" readonly/>' + '</div>' + '</div>' + '<br/>' + '<div class="fieldDiv none dateVisible" id="toDateDiv">' + '<div class="fl inputLabel none dateVisible">To*: </div>' + '<div class="fr width60 none dateVisible">' + '<input type="text" id="toDate" class="datetimepicker width100 none required dateVisible" value="" readonly />' + '</div>' + '<br/>' + '</div>' + '<div class="fieldDiv">' + '<div class="fl inputLabel">Reminder1*: </div>' + '<div class="fr width60">' + '<input type="tel" class="width40 required" id="reminder1Data" value="" />' + '<select class="width50" data-theme="a" name="select-choice-1" id="reminder1">' + '<option value="H">Hours</option>' + '<option value="D">Days</option>' + '</select>' + '</div>' + '</div>' + '<br/>' + '<div class="fieldDiv">' + '<div class="fl inputLabel">Reminder2*: </div>' + '<div class="fr width60">' + '<input type="tel" class="width40 required" id="reminder2Data" value="" />' + '<select class="width50" data-theme="a" name="select-choice-1" id="reminder2">' + '<option value="H">Hours</option>' + '<option value="D">Days</option>' + '</select>' + '</div>' + '</div>' + '<br/>' + '<div class="fieldDiv">' + '<div class="fl inputLabel">Frequency*: </div>' + '<div class="fr width60">' + '<div data-role="fieldcontain" data-theme="a">' + '<select data-theme="a" name="select-choice-1" id="frequency" class=" required">' + '<option value="Daily">Daily</option>' + '<option value="Weekly">Weekly</option>' + '<option value="Monthly">Monthly</option>' + '</select>' + '</div>' + '</div>' + '</div>' + '<br/>' + '<div class="fieldDiv">' + '<div class="fl inputLabel">Description: </div>' + '<div class="fr width60">' + '<input class="width100" type="text" id="descriptionData"/>' + '</div>' + '</div>' + '</div>' + '</form>' + '</div>';
    
	return content;
}



/********************Add/Edit/Delete Appointment Ends Here**********************/



/********************Add/Edit/Delete PCT Starts Here**********************/

function getStatesList() {
    var stateseModel = new state.State({});
    
    statesListSuccess = function() {
        statesDetailsList = JSON.stringify(stateseModel.get("state"));
        state.statesList = eval(" (" + statesDetailsList + ") ");
        stateList = state.statesList;
    };
    
    statesListError = function() {
        alert(serverErrorMessage);
    };
    
    stateseModel.fetch({ type : postMethod, success : statesListSuccess, error : statesListError, contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}

$("#deletePCT").live("click", function() {
                     if (confirm(deletePCT)) {
                     var deletePCTModel = new pct.deletePCT({});
                     deletePCTSuccess = function() {
                     deletePCTDetails = JSON.stringify(deletePCTModel.get(statusObj));
                     if (deletePCTDetails == '"' + trueObj + '"') {
                     
                     navigator.notification.alert(successDeletePCT, null, successTitle, okButton);
                     } else {
                     navigator.notification.alert(errorDeletePCT, null, errorTitle, okButton);
                     }
                     getPCTView();
                     
                     };
                     
                     deletePCTError = function() {
                     alert(serverErrorMessage);
                     };
                     
                     var deletePCTJSON = { "careTakerId" : activity.get("id") };
                     
                     deletePCTModel.fetch({ type : postMethod, success : deletePCTSuccess, error : deletePCTError, data : JSON.stringify(deletePCTJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
                     }
                     });

$("#addPCT").live("click", function() {
                  
                  var notificationContent = '<div id="notContent" style="position:absolute;height:100%;width:97%;overflow:auto;margin-left:auto;margin-right:auto;"></div>';
                  $("#headerPCT").append(notificationContent);
                  var addContent = $("#addEditPCT").html();
                  
                  $("#addEditPCT").css("visibility", "visible");
                  $("#notContent").html(addContent);
                  $("#isPCTUpdate").val("0");
                  $('.timepicker').scroller({ preset : 'time', theme : 'android', display : 'modal', mode : 'scroller' });
                  var contState = "";
                  for ( var i in state.statesList) {
                  contState = contState + '<option value="' + state.statesList[i].id + '">' + state.statesList[i].name + '</option>';
                  
                  }
                  $("#isPCTUpdate").val("0");
                  $("#CTState").append(contState);
                  expand = false;
                  slideDiv("headerPCT");
                  
                  });

$("#editPCT").live("click", function() {
                   
                   var fName = activity.get("careTakerId").firstName;
                   var lName = activity.get("careTakerId").lastName;
                   var relation = activity.get("relation");
                   var relType = activity.get("isPrimary");
                   var from = activity.get("fromTime");
                   var to = activity.get("toTime");
                   var address1 = activity.get("careTakerId").address1;
                   var address2 = activity.get("careTakerId").address2;
                   var city = activity.get("careTakerId").city;
                   var state = activity.get("careTakerId").state.id;
                   var country = activity.get("careTakerId").country.code;
                   var zip = activity.get("careTakerId").zipCode;
                   var cell = activity.get("careTakerId").phone;
                   var home = "";
                   var work = "";
                   var fax = "";
                   var other = "";
                   for ( var j in activity.get("careTakerId").contactNumbers) {
                   if (j == 1) {
                   home = activity.get("careTakerId").contactNumbers[j].contactNumber;
                   } else if (j == 2) {
                   work = activity.get("careTakerId").contactNumbers[j].contactNumber;
                   } else if (j == 3) {
                   fax = activity.get("careTakerId").contactNumbers[j].contactNumber;
                   } else {
                   other = activity.get("careTakerId").contactNumbers[j].contactNumber;
                   }
                   }
                   if (home != undefined && home != "") {
                   home = home.substring(0, 3) + home.substring(4, 7) + home.substring(8, home.length);
                   }
                   
                   if (work != undefined && work != "") {
                   work = work.substring(0, 3) + work.substring(4, 7) + work.substring(8, work.length);
                   }
                   
                   if (fax != undefined && fax != "") {
                   fax = fax.substring(0, 3) + fax.substring(4, 7) + fax.substring(8, fax.length);
                   }
                   
                   if (other != undefined && other != "") {
                   other = other.substring(0, 3) + other.substring(4, 7) + other.substring(8, other.length);
                   }
                   var notificationContent = '<div id="notContent" style="position:absolute;height:100%;width:97%;overflow:auto;margin-left:auto;margin-right:auto;"></div>';
                   $("#headerPCTDetail").append(notificationContent);
                   var addContent = $("#addEditPCT").html();
                   
                   $("#addEditPCT").css("visibility", "visible");
                   $("#notContent").html(addContent);
                   var contState = "";
                   
                   $("#CTFName").val(fName);
                   $("#CTLName").val(lName);
                   $("#CTrelation").val(relation);
                   $("#CTRType").val(String(relType));
                   $("#fromTime").val(from);
                   $("#toTime").val(to);
                   $("#CTAddress1").val(address1);
                   $("#CTAddress2").val(address2);
                   $("#CTCity").val(city);
                   
                   $("#CTCountry").val(country);
                   $("#CTZip").val(zip);
                   $("#CTCell").val(cell);
                   $("#CTHome").val(home);
                   $("#CTWork").val(work);
                   $("#CTFax").val(fax);
                   $("#CTOther").val(other);
                   $("#isPCTUpdate").val("1");
                   $('.timepicker').scroller({ preset : 'time', theme : 'android', display : 'modal', mode : 'scroller' });
                   
                   $("#isPCTUpdate").val("1");
                   for ( var i in stateList) {
                   contState = contState + '<option value="' + stateList[i].id + '">' + stateList[i].name + '</option>';
                   }
                   $("#CTState").append(contState);
                   $("#CTState").val(state);
                   expand = false;
                   slideDiv("headerPCTDetail");
                   
                   });

function savePatientPCT() {
    var fName = $("#CTFName").val();
    var lName = $("#CTLName").val();
    var relation = $("#CTrelation").val();
    var relType = $("#CTRType").val();
    var from = $("#fromTime").val();
    var to = $("#toTime").val();
    var address1 = $("#CTAddress1").val();
    var address2 = $("#CTAddress2").val();
    var city = $("#CTCity").val();
    var state = $("#CTState").val();
    var country = $("#CTCountry").val();
    var zip = $("#CTZip").val();
    var cell = $("#CTCell").val();
    var home = $("#CTHome").val();
    var work = $("#CTWork").val();
    var fax = $("#CTFax").val();
    var other = $("#CTOther").val();
    
    if (home != undefined && home != "") {
        home = home.substring(0, 3) + "-" + home.substring(3, 6) + "-" + home.substring(6, home.length);
    }
    
    if (work != undefined && work != "") {
        work = work.substring(0, 3) + "-" + work.substring(3, 6) + "-" + work.substring(6, work.length);
    }
    
    if (fax != undefined && fax != "") {
        fax = fax.substring(0, 3) + "-" + fax.substring(3, 6) + "-" + fax.substring(6, fax.length);
    }
    
    if (other != undefined && other != "") {
        other = other.substring(0, 3) + "-" + other.substring(3, 6) + "-" + other.substring(6, other.length);
    }
    
    if ($("#isPCTUpdate").val() == "1") {
        pctJson = { "id" : activity.get("id"), "patientId" : storage.getItem(patientId), "firstname" : fName, "lastname" : lName, "relation" : relation, "isPrimary" : relType, "cellNumber" : cell, "address1" : address1, "address2" : address2, "city" : city, "stateId" : state, "countryId" : 1, "zipCode" : zip, "homeContact" : home, "workContact" : work, "faxContact" : fax, "otherContact" : other, "timeFrom" : from, "timeTo" : to };
        pctModel = new pct.editPCT({});
    } else {
        pctJson = { "patientId" : storage.getItem(patientId), "firstname" : fName, "lastname" : lName, "relation" : relation, "isPrimary" : relType, "cellNumber" : cell, "address1" : address1, "address2" : address2, "city" : city, "stateId" : state, "countryId" : 1, "zipCode" : zip, "homeContact" : home, "workContact" : work, "faxContact" : fax, "otherContact" : other, "timeFrom" : from, "timeTo" : to };
        pctModel = new pct.addPCT({});
    }
    
    pctSuccess = function() {
        pctDetails = JSON.stringify(pctModel.get(statusObj));
        if (pctDetails == trueObj) {
            if ($("#isPCTUpdate").val() == "0") {
                alert(successAddPCT);
            } else {
                alert(successEditPCT);
            }
            getPCTView();
            
        } else {
            if ($("#isUpdate").val() == "0") {
                alert(errorAddPCT);
            } else {
                alert(errorEditPCT);
            }
        }
        
        expand = true;
        if ($("#isPCTUpdate").val() == "0") {
            slideDiv("headerPCT");
            $("#headerPCT").animate({ height : '40px' }, 500, function() {
                                    $("#notContent").remove();
                                    $(".subHeader").css("left", "0px");
                                    expand = false;
                                    });
        } else {
            slideDiv("headerPCTDetail");
            $("#headerPCTDetail").animate({ height : '40px' }, 500, function() {
                                          $("#notContent").remove();
                                          $(".subHeader").css("left", "0px");
                                          expand = false;
                                          });
        }
        gotoPath("#patient_PCT");
        
    };
    
    pctError = function() {
        alert(serverErrorMessage);
    };
    
    pctModel.fetch({ type : postMethod, success : pctSuccess, error : pctError, data : JSON.stringify(pctJson), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
}

function cancelPatientPCT() {
    expand = true;
    if ($("#isPCTUpdate").val() == "0") {
        slideDiv("headerPCT");
    } else {
        slideDiv("headerPCTDetail");
    }
}

function getPCTView() {
    initPCT();
    gotoPath("#patient_PCT");
}



/********************Add/Edit/Delete PCT Ends Here**********************/


/********************Add/Edit/Delete Action Starts Here**********************/

function addContent(){
    var cont = getForm();
    
    $("#headerAction").append(cont);
    //$("#actionSelectType").selectmenu();
    //$("#exerciseSelectName").selectmenu();
    //$("#exerciseSelectType").selectmenu();
    $(".editActionInput").val("");
    $("#exerciseTime").html("");
    $("#patientActionId").val("");
    
    //$("#addAction").addClass("none").removeClass("block");
    $("#cancelActionEdit").removeClass("block").addClass("none");
    $("#cancelActionOp").removeClass("none").addClass("block");
    $("#addEditActionForm").removeClass("none").addClass("block");
    
    
    $("#activityContent").removeClass("none").addClass("block");
    $("#exerciseContent").removeClass("block").addClass("none");
    
    $("#editableActionName").removeClass("none").addClass("block");
    $("#nonEditableActionName").removeClass("block").addClass("none");
    $("#actionSelectType").val("1");
    $("#exerciseSelectName").val("1");
    $("#exerciseSelectType").val("low");
    
    $('.actionDate').scroller({ 
                              preset : 'date', 
                              theme : 'android', 
                              display : 'modal', 
                              mode : 'scroller' 
                              });
    
    $('#activityTime').scroller({ preset : 'time', theme : 'android', display : 'modal', mode : 'scroller' });
    
    var currDate = getCurrentDate(new Date());
    if(currDate.indexOf("-") >= 0){
        currDate = currDate.split("-").join("/");
        currDate = getDisplayDateFormat(currDate);
    }
    $("#addEditActionForm .actionDate").val(currDate);
}

$("#addAction").live("tap", function() {
                     
                     
                     addContent();
                     expand = false;
                     slideDiv("headerAction");
                     });

$(document).on("click", "#cancelActionOp", function() {
               $("#addEditActionForm").removeClass("block").addClass("none");
               $("#addEditActionForm").remove();
               expand = true;
               slideDiv("headerAction");
               
               });

$(document).on("change", "#actionSelectType", function() {
               if ($(this).val() == 1) {
               $("#activityContent").removeClass("none").addClass("block");
               $("#exerciseContent").removeClass("block").addClass("none");
               } else if ($(this).val() == 2) {
               $("#activityContent").removeClass("block").addClass("none");
               $("#exerciseContent").removeClass("none").addClass("block");
               }
               });

function isValidAction(isUpdate) {
    var errorMsg = "";
    var isActivity = false;
    if (isUpdate) {
        if (action.actionList.get($("#patientActionId").val()).get("type") == "act") {
            isActivity = true;
        }
    } else {
        if ($("#actionSelectType").val() == 1) {
            isActivity = true;
        }
    }
    
    if (isActivity) {
        if ($("#activityName").val() == "") {
            errorMsg += errorActName;
        }
        
        if ($("#activityDesc").val() == "") {
            errorMsg += errorActDesc;
        }
        
        var actDate = $("#activityDate").val();
        if (actDate == "") {
            errorMsg += errorActDate;
        } else {
            var todayDateObj = new Date();
            todayDateObj.setHours(0, 0, 0, 0);
            var selectedDateObj = new Date(actDate);
            if (todayDateObj.getTime() > selectedDateObj.getTime()) {
                errorMsg += errorActDateValid;
            }
        }
        
        if ($("#activityTime").val() == "") {
            errorMsg += errorActTime;
        }
        
    } else {
        if ($("#exerciseDuration").val() == "") {
            errorMsg += errorExeDur;
        } else if (!isValidNumber($("#exerciseDuration").val())) {
            errorMsg += errorExeDurValid;
        }
        
        var fromDate = new Date($("#exerciseFromDate").val());
        var toDate = new Date($("#exerciseToDate").val());
        if (fromDate.getTime() > toDate.getTime()) {
            errorMsg += errorStratEndDate;
        }
        
        if ($("#exerciseFrequency").val() == "") {
            errorMsg += errorExeFreq;
        } else if (!isValidNumber($("#exerciseFrequency").val())) {
            errorMsg += errorExeFreqValid;
        }
        
        var totalExeTime = $(".exeTime").length;
        for ( var i = 0; i < totalExeTime; i++) {
            if ($(".exeTime").eq(i).val() == "") {
                errorMsg += errorExeTime;
                break;
            }
        }
        
    }
    if (errorMsg == "") {
        return true;
    } else {
        alert(errorMsg);
        return false;
    }
}

var actionType = "";
actionName = "";
actionDesc = "";
actionDate = "";
actionType = "";
actionName = "";
actionDesc = "";
actionDuration = "";
actionSubType = "";
actionFromDate = "";
actionToDate = "";
actionFreq = "";
var exerciseTimeArray;
$(document).on("click", "#okActionOp", function() {
               var isUpdate = true;
               var actId = $("#patientActionId").val();
               if (actId == "" || actId == undefined) {
               isUpdate = false;
               }
               
               var isActivity = false;
               if (isUpdate) {
               if (action.actionList.get($("#patientActionId").val()).get("type") == "act") {
               isActivity = true;
               }
               } else {
               if ($("#actionSelectType").val() == 1) {
               isActivity = true;
               }
               }
               
               if (isValidAction(isUpdate)) {
               var addActionJson;
               var actionModel = "";
               if (isActivity) {
               actionType = "act";
               actionName = $("#activityName").val();
               actionDesc = $("#activityDesc").val();
               actionDate = $("#activityDate").val();
               if(actionDate.indexOf("/") >= 0){
               actionDate = currentDate(actionDate);
               }
               
               if (isUpdate) {
               addActionJson = { "actId" : action.actionList.get($("#patientActionId").val()).get("actionId"), "type" : actionType, "name" : actionName, "date" : actionDate, "time1" : $("#activityTime").val(), "description" : actionDesc, patientId : storage.getItem(patientId) };
               } else {
               addActionJson = { "type" : actionType, "name" : actionName, "date" : actionDate, "time1" : $("#activityTime").val(), "description" : actionDesc, patientId : storage.getItem(patientId) };
               }
               } else {
               actionType = "exe";
               if($("#exerciseSelectName").val() == '' && $("#exerciseSelectName").val() == null){
               actionName = actionTypeId;
               }else{
               actionName = $("#exerciseSelectName").val();
               }
               actionDesc = $("#exerciseDesc").val();
               actionDuration = $("#exerciseDuration").val();
               actionSubType = $("#exerciseSelectType").val();
               actionFromDate = currentDate($("#exerciseFromDate").val());
               if(actionFromDate.indexOf("/") >= 0){
               actionFromDate = currentDate(actionFromDate);
               }
               actionToDate = $("#exerciseToDate").val();
               if(actionToDate.indexOf("/") >= 0){
               actionToDate = currentDate(actionToDate);
               }
               actionFreq = $("#exerciseFrequency").val();
               
               exerciseTimeArray = new Array();
               totalExeTime = $(".exeTime").length;
               for ( var i = 0; i < 5; i++) {
               if (totalExeTime > i) {
               exerciseTimeArray[i] = $(".exeTime").eq(i).val();
               } else {
               exerciseTimeArray[i] = "";
               }
               }
               if (isUpdate) {
               addActionJson = { "exeId" : action.actionList.get($("#patientActionId").val()).get("actionId"), patientId : storage.getItem(patientId), "type" : actionType, "exerciseId" : actionName, "description" : actionDesc, "duration" : actionDuration, "exType" : actionSubType, "fromDate" : actionFromDate, "toDate" : actionToDate, "frequency" : actionFreq, "time1" : exerciseTimeArray[0], "time2" : exerciseTimeArray[1], "time3" : exerciseTimeArray[2], "time4" : exerciseTimeArray[3], "time5" : exerciseTimeArray[4] };
               } else {
               addActionJson = { patientId : storage.getItem(patientId), "type" : actionType, "exerciseId" : actionName, "description" : actionDesc, "duration" : actionDuration, "exType" : actionSubType, "fromDate" : actionFromDate, "toDate" : actionToDate, "frequency" : actionFreq, "time1" : exerciseTimeArray[0], "time2" : exerciseTimeArray[1], "time3" : exerciseTimeArray[2], "time4" : exerciseTimeArray[3], "time5" : exerciseTimeArray[4] };
               
               }
               }
               //alert(JSON.stringify(addActionJson));
               actionModel = new action.AddAction({});
               addActionSuccess = function() {
               response = JSON.stringify(actionModel.get(statusObj));
               if (response == trueObj) {
               if (!isUpdate) {
               succMsg = successAddAction;
               errMeg = errorAddAction;
               } else {
               succMsg = successEditAction;
               errMeg = errorEditAction;
               }
               alert(succMsg);
               $("#actionContent").removeClass("none").addClass("block");
               $(".actionTimeDiv").html("");
               var todaysDate = new Date();
               initAction(getCurrentDate(todaysDate));
               $("#addEditActionForm").remove();
               if (isUpdate) {
               expand = true;
               slideDiv("headerActnDetail");
               }else{
               expand = true;
               slideDiv("headerAction");
               }
               gotoPath("#patient_action");
               } else {
               alert(errMsg);
               }
               };
               
               addActionError = function() {
               alert(serverErrorMessage);
               };
               
               actionModel.fetch({ type : postMethod, success : addActionSuccess, error : addActionError, data : JSON.stringify(addActionJson), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
               }
               });

$(document).on("change", "#exerciseFrequency", function() {
               $("#exerciseTime").html("");
               var freqVal = $("#exerciseFrequency").val();
               if (intRegex.test(freqVal)) {
               freqVal = freqVal <= 5 ? freqVal : 5;
               var timePicker = "";
               for ( var i = 0; i < freqVal; i++) {
               timePicker += "<div><img src='../../images/icon_walk.png'/><input class = 'exeTime' type='text' value='' readonly='readonly'></div>";
               }
               $("#exerciseTime").html(timePicker);
               $('.exeTime').scroller({ preset : 'time', theme : 'android', display : 'modal', mode : 'scroller' });
               }
               });

$(document).on("click", "#editAction", function() {
               var exerciseObj = action.actionList.get($("#patientActionId").val());
               var actionType = exerciseObj.get("type");
               var cont = getForm();
               $("#headerActnDetail").append(cont);
               action.isEditAction = true;
               $("#okActionOp").html("Save");
               $("#nonEditableActionName").removeClass("none").addClass("block");
               $("#editableActionName").removeClass("block").addClass("none");
               $("#cancelActionEdit").removeClass("none").addClass("block");
               $("#cancelActionOp").removeClass("block").addClass("none");
               $("#actionContent").removeClass("block").addClass("none");
               $("#addEditActionForm").removeClass("none").addClass("block");
               //$("#actionSelectType").selectmenu();
               //$("#exerciseSelectName").selectmenu();
               //$("#exerciseSelectType").selectmenu();
               if (actionType == "exe") {
               $("#nonEditableActionName").html("Exercise");
               $("#activityContent").removeClass("block").addClass("none");
               $("#exerciseContent").removeClass("none").addClass("block");
               
               // Set the default values
               $('#actionSelectType').val("2");
               $("#addEditActionForm #exerciseSelectName").val(actionTypeId);
               $("#addEditActionForm #exerciseDuration").val(exerciseObj.get("subType2").split(" ")[0]);
               $("#addEditActionForm #exerciseSelectType").val(exerciseObj.get("actionType"));
               var fromDate = exerciseObj.get("fromDate");
               
               if(fromDate.indexOf("-") >= 0){
               fromDate = fromDate.split("-").join("/");
               fromDate = getDisplayDateFormat(fromDate);
               }
               $("#addEditActionForm #exerciseFromDate").val(fromDate);
               var toDate = exerciseObj.get("toDate");
               if(toDate.indexOf("-") >= 0){
               toDate = toDate.split("-").join("/");
               toDate = getDisplayDateFormat(toDate);
               }
               $("#addEditActionForm #exerciseToDate").val(toDate);
               
               $("#addEditActionForm #exerciseFrequency").val(exerciseObj.get("freq"));
               timePicker = "";
               var exerciseTime = exerciseObj.get("timeArray");
               exerciseTime = exerciseTime.substring(0, exerciseTime.length - 1);
               exerciseTimeArray = exerciseTime.split(",");
               for ( var i in exerciseTimeArray) {
               timePicker += "<div><img src='../../images/icon_walk.png'/><input class = 'exeTime' type='text' value='" + exerciseTimeArray[i] + "' readonly='readonly'></div>";
               }
               $("#exerciseTime").html(timePicker);
               $('.exeTime').scroller({ preset : 'time', theme : 'android', display : 'modal', mode : 'scroller' });
               $("#exerciseDesc").val(exerciseObj.get("description"));
               } else if (actionType == "act") {
               $("#activityContent").removeClass("none").addClass("block");
               $("#exerciseContent").removeClass("block").addClass("none");
               $("#nonEditableActionName").html("Action");
               
               $("#activityName").val(exerciseObj.get("subType1"));
               $("#activityDesc").val(exerciseObj.get("subType2"));
               var activityDate = exerciseObj.get("fromDate");
               if(activityDate.indexOf("-") >= 0){
               activityDate = activityDate.split("-").join("/");
               activityDate = getDisplayDateFormat(activityDate);
               }
               $("#activityDate").val(activityDate);
               $("#activityTime").val(exerciseObj.get("timeArray"));
               $('#activityTime').scroller({ preset : 'time', theme : 'android', display : 'modal', mode : 'scroller' });
               }
               $('.actionDate').scroller({ preset : 'date', theme : 'android', display : 'modal', mode : 'scroller' });
               expand = false;
               slideDiv("headerActnDetail");
               
               
               });

$("#cancelActionEdit").live("tap", function() {
                            $("#actionContent").removeClass("none").addClass("block");
                            $("#addEditActionForm").removeClass("block").addClass("none");
                            $("#addEditActionForm").remove();
                            expand = true;
                            slideDiv("headerActnDetail");
                            });

$("#deleteAction").live("tap", function() {
                        if (confirm(deleteActMsg)) {
                        var deleteActionModel = new action.DeleteAction({});
                        deleteActionSuccess = function() {
                        deleteActionDetails = JSON.stringify(deleteActionModel.get(statusObj));
                        if (deleteActionDetails == trueObj) {
                        navigator.notification.alert(successDeleteAct, null, successTitle, okButton);
                        backPath = "patient_action";
                        gotoPath("#patient_action");
                        } else {
                        navigator.notification.alert(errorDeleteAct, null, errorTitle, okButton);
                        }
                        };
                        
                        deleteActionError = function(response) {
                        navigator.notification.alert(response, null, errorTitle, okButton);
                        };
                        
                        var deleteActionJSON = { "id" : action.actionList.get($("#patientActionId").val()).get("actionId"), "type" : action.actionList.get($("#patientActionId").val()).get("type") };
                        
                        deleteActionModel.fetch({ type : postMethod, success : deleteActionSuccess, error : deleteActionError, data : JSON.stringify(deleteActionJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
                        }
                        });


function getForm(){
	var conts = '<div id="addEditActionForm" class="none float100 scroll"><br><div id="actionOpHeader" class="float100"> <div id="actionOpName"></div><div style="display:block;padding-top:5%;width:50%;" class="AppointmentOperation fr"><a class="grayButton cancelMedication" id="cancelActionOp"> Cancel </a><a class="grayButton cancelMedication" id="cancelActionEdit"> Cancel </a><a id="okActionOp" style="padding:8px 20px;" class="medicationSaveButton blueButton" href="javascript:void(0);"> Save </a></div></div><div id="addEditActionContent"><div class="actionLabel">Action Type:</div><div class="actionInput"><div id="nonEditableActionName" class="none" style="color:#fff;"></div><div id="editableActionName"><select id="actionSelectType" class="actionSelectInput" style="width:90%;" data-role="none"> <option value="1">Activity</option><option value="2">Exercise</option></select></div></div><div id="activityContent" class="none"><div class="float100 actionContentTr"><div class="actionLabel">Name:</div> <div class="actionInput"><input type="text" id="activityName" class="float100 editActionInput" value="test" maxlength="50"></div></div><div class="float100 actionContentTr"><div class="actionLabel">Description:</div> <div class="actionInput"><input type="text" id="activityDesc" class="float100 editActionInput" value="test"  maxlength="70"></div></div><div class="float100 actionContentTr"><div class="actionLabel">Date:</div> <div class="actionInput"><input type="text" class="actionDate editActionInput" id="activityDate" readonly="readonly"></div></div><div class="float100 actionContentTr"><div class="actionLabel">Time:</div> <div class="actionInput"><input type="text" class="actionTime" id="activityTime" value="" readonly="readonly" class="editActionInput"></div></div></div><div id="exerciseContent" class="none"><div class="float100 actionContentTr"><div class="actionLabel">Name:</div> <div class="actionInput"><select id="exerciseSelectName" class="actionSelectInput" data-role="none"> <option value="1">Yoga</option><option value="2">Walk</option><option value="3">Jogging</option></select></div><div class="float100 actionContentTr"><div class="actionLabel">Duration:</div><div class="actionInput"><input type="tel" id="exerciseDuration" maxlength="3" class="editActionInput"> min</div></div><div class="float100 actionContentTr"><div class="actionLabel">Type:</div><div class="actionInput"><select id="exerciseSelectType" class="actionSelectInput" data-role="none"> <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div></div><div class="float100 actionContentTr"><div class="actionLabel">From:</div> <div class="actionInput"><input type="text" class="actionDate editActionInput" id="exerciseFromDate" readonly="readonly"></div></div><div class="float100 actionContentTr"><div class="actionLabel">To:</div><div class="actionInput"><input type="text" class="actionDate editActionInput" id="exerciseToDate" readonly="readonly"></div></div><div class="float100 actionContentTr"><div class="actionLabel">Frequency:</div> <div class="actionInput"><input type="tel" id="exerciseFrequency" class="editActionInput" maxlength="1"><div id="exerciseTime"></div></div></div><div class="float100 actionContentTr"><div class="actionLabel">Description:</div><div class="actionInput"><input type="text" id="exerciseDesc" class="float100 editActionInput" maxlength="50"></div></div></div></div></div></div>';
	return conts;
}


function getCurrentDate(today) {
    month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    date = (today.getDate()) < 10 ? '0' + (today.getDate()) : (today.getDate());
    return (today.getFullYear() + "-" + month + "-" + date);
}


/********************Add/Edit/Delete Action Ends Here**********************/


/********************Add/Edit/Delete Medication Starts Here**********************/



$(document).on("click", "#editMedication", function(e) {
               var cont = $("#medication_edit").html();
               $("#headerMedDetail").append(cont);
               $("#medNameEdit").show();
               $("#cancelEditMed").show();
               $("#cancelAddMed").css("display", "none");
               $("#medicineSelectDiv").css("display", "none");
               //$("#medOpHeader").html("Edit Medication");
               $("#medOpName").html("Edit Medication");
               $("#editSaveMedication").html("Save");
               
               medId = $("#patientMedicationId").val();
               medicationModel = medication.medicationtList.get(medId);
               $("#medNameEdit").html(medicationModel.get("medication").name);
               $("#medicationDoseEdit").val(medicationModel.get("dosage"));
               //cmID = medicationModel.get("cmId");
               //if(cmID != "" && cmID != null){
               //$("#editMedication").css("display", "none");
               //$("#deleteMedication").css("display", "none");
               //}
               
               var doseType = $("<select id='medicationDosageTypeSelect' />");
               for ( var i in medication.dosageTypeList) {
               $('<option />', { value : medication.dosageTypeList[i].id, text : medication.dosageTypeList[i].name }).appendTo(doseType);
               }
               $("#dosageTypeDiv").html(doseType);
               $("#medicationDosageTypeSelect").val(medicationModel.get("dosageType").id);
               
               var medTime = $("<select id='frequencyTypeSelect' multiple='multiple'/>");
               for ( var i in medication.medicationTimeList) {
               $('<option />', { value : medication.medicationTimeList[i].id, text : medication.medicationTimeList[i].name }).appendTo(medTime);
               }
               $("#frequencyType").html(medTime);
               $("#frequencyTypeSelect").val(medicationModel.get("medtimeid").split(hashObj));
               
               $("#medicationFreqEdit").val(medicationModel.get("frequency"));
               $("#medicationNoteEdit").val(medicationModel.get("comments"));
               $("#medicationTimeId").val(medicationModel.get("medtimeid"));
               medDays = medicationModel.get(isMondayObj) + hashObj + medicationModel.get(isTuesdayObj) + hashObj + medicationModel.get(isWednesdayObj) + hashObj + medicationModel.get(isThursdayObj) + hashObj + medicationModel.get(isFridayObj) + hashObj + medicationModel.get(isSaturdayObj) + hashObj + medicationModel
               .get(isSundayObj);
               $("#medicationDays").val(medDays);
               
               medTimeDaySelected.isMonday = medicationModel.get(isMondayObj);
               medTimeDaySelected.isTuesday = medicationModel.get(isTuesdayObj);
               medTimeDaySelected.isWednesday = medicationModel.get(isWednesdayObj);
               medTimeDaySelected.isThursday = medicationModel.get(isThursdayObj);
               medTimeDaySelected.isFriday = medicationModel.get(isFridayObj);
               medTimeDaySelected.isSaturday = medicationModel.get(isSaturdayObj);
               medTimeDaySelected.isSunday = medicationModel.get(isSundayObj);
               
               medTime = "";
               for ( var i = 1; i <= 6; i++) {
               if (medicationModel.get("time" + i) != null) {
               medTime += medicationModel.get("time" + i);
               }
               medTime += hashObj;
               }
               medTime = medTime.substring(0, (medTime.length - 1));
               $("#medicationTimes").val(medTime);
               
               e.preventDefault();
               var fromDate = medicationModel.get("fromDate");
               if(fromDate.indexOf("-") >= 0){
               fromDate = fromDate.split("-").join("/");
               fromDate = getDisplayDateFormat(fromDate);
               }
               $("#medicationFromDateEdit").val(fromDate);
               $('#medicationFromDateEdit').scroller({ 
                                                     preset : 'date', 
                                                     theme : 'android', 
                                                     display : 'modal', 
                                                     mode : 'scroller' 
                                                     });
               var toDate = medicationModel.get("toDate");
               if(toDate.indexOf("-") >= 0){
               toDate = toDate.split("-").join("/");
               toDate = getDisplayDateFormat(toDate);
               }
               $("#medicationToDateEdit").val(toDate);
               $('#medicationToDateEdit').scroller({ 
                                                   preset : 'date', 
                                                   theme : 'android', 
                                                   display : 'modal', 
                                                   mode : 'scroller' 
                                                   });
               
               expand = false;
               slideDiv("headerMedDetail");
               });

function isValideMedication() {
    var errorMsg = "";
    
    var fromDate = $("#medicationFromDateEdit").val();
    var toDate = $("#medicationToDateEdit").val();
    if (fromDate == "") {
        errorMsg = errorStartDate;
    }
    if (toDate == "") {
        errorMsg += errorEndDate;
    }
    
    var fromDateObj = new Date(fromDate);
    var toDateObj = new Date(toDate);
    if (fromDateObj.getTime() > toDateObj.getTime()) {
        errorMsg = errorMsg + errorStratEndDate;
    }
    
    var dosage = $("#medicationDoseEdit").val();
    if (dosage == "") {
        errorMsg += errorDose;
    }
    
    var freq = $("#medicationFreqEdit").val();
    if (freq == "") {
        errorMsg += errorFreq;
    }
    
    if (errorMsg == "") {
        return true;
    } else {
        alert(errorMsg);
        return false;
    }
}

$(document).on("click", "#editSaveMedication", function() {
               var isUpdate = true;
               var medId = $("#patientMedicationId").val();
               if (medId == "" || medId == undefined) {
               isUpdate = false;
               }
               
               if (isValideMedication()) {
               var fromDate = $("#medicationFromDateEdit").val();
               if(fromDate.indexOf("/") >= 0){
               fromDate = currentDate(fromDate);    
               }
               var toDate = $("#medicationToDateEdit").val();
               if(toDate.indexOf("/") >= 0){
               toDate = currentDate(toDate);
               }
               var dosage = $("#medicationDoseEdit").val();
               var dosageTypeId = $("#medicationDosageTypeSelect").val();
               var freq = $("#medicationFreqEdit").val();
               var medTimeId = $("#medicationTimeId").val();
               var comment = $("#medicationNoteEdit").val();
               
               var medTimes = $("#medicationTimes").val().split(hashObj);
               
               medicationTimes = new Array();
               for (i in medTimes) {
               if (medTimes[i] != "") {
               medicationTimes[i] = medTimes[i];
               } else {
               break;
               }
               }
               
               var time1 = medicationTimes[0];
               var time2 = medicationTimes[1];
               var time3 = medicationTimes[2];
               var time4 = medicationTimes[3];
               var time5 = medicationTimes[4];
               var time6 = medicationTimes[5];
               
               var medJson = "";
               var medModel;
               if (isUpdate) {
               medJson = { "id" : medId, "comments" : comment, "dosage" : dosage, "dosageType" : { "id" : dosageTypeId }, "frequency" : freq, "medtimeid" : medTimeId, "time1" : time1, "time2" : time2, "time3" : time3, "time4" : time4, "time5" : time5, "time6" : time6, "fromDate" : fromDate, "toDate" : toDate, patientId : storage
               .getItem(patientId), "isSunday" : medTimeDaySelected.isSunday, "isMonday" : medTimeDaySelected.isMonday, "isTuesday" : medTimeDaySelected.isTuesday, "isWednesday" : medTimeDaySelected.isWednesday, "isThursday" : medTimeDaySelected.isThursday, "isFriday" : medTimeDaySelected.isFriday, "isSaturday" : medTimeDaySelected.isSaturday };
               medModel = new medication.EditMedication({});
               } else {
               medJson = { "medication" : { "id" : $("#medicineSelect").val() }, "comments" : comment, "dosage" : dosage, "dosageType" : { "id" : dosageTypeId }, "frequency" : freq, "medtimeid" : medTimeId, "time1" : time1, "time2" : time2, "time3" : time3, "time4" : time4, "time5" : time5, "time6" : time6, "fromDate" : fromDate, "toDate" : toDate, patientId : storage
               .getItem(patientId), "isSunday" : medTimeDaySelected.isSunday, "isMonday" : medTimeDaySelected.isMonday, "isTuesday" : medTimeDaySelected.isTuesday, "isWednesday" : medTimeDaySelected.isWednesday, "isThursday" : medTimeDaySelected.isThursday, "isFriday" : medTimeDaySelected.isFriday, "isSaturday" : medTimeDaySelected.isSaturday };
               medModel = new medication.AddMedication({});
               }
               
               medSuccess = function() {
               medDetails = JSON.stringify(medModel.get(statusObj));
               if (medDetails == trueObj) {
               if (!isUpdate) {
               alert(successAddMed);
               } else {
               alert(successEditMed);
               }
               if(isUpdate){
               expand = true;
               slideDiv("headerMedDetail");
               }else{
               expand = true;
               slideDiv("headerMedicine");
               }
               $("#medication_edit_content").remove();
               backPath = "patient_medicine";
               gotoPath("#patient_medicine");
               } else {
               if (!isUpdate) {
               alert(errorAddMed);
               } else {
               alert(errorEditMed);
               }
               }
               };
               
               medError = function() {
               alert(serverErrorMessage);
               };
               
               medModel.fetch({ type : postMethod, success : medSuccess, error : medError, data : JSON.stringify(medJson), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
               }
               });

$(document).on("click", "#medicationFreqEdit", function() {
               $('body').append('<div class="mask" id="topMask"></div>');
               $("#topMask").fadeIn(300);
               $('#topMask').css("zIndex", 99999999);
               $('#topMask').css("opacity", 0.6);
               if ($("#patientMedicationId").val() != "") {
               $("#frequencyValue").val($("#medicationFreqEdit").val());
               var selectedMedTime = $("#medicationTimeId").val().split(hashObj);
               $("#frequencyTypeSelect").val(selectedMedTime);
               
               if (selectedMedTime.indexOf("0") == -1 && selectedMedTime.indexOf("1") == -1) {
               $("#freqDayKeyboard").css("display", "block");
               } else {
               $("#freqDayKeyboard").css("display", "none");
               }
               
               var selectedDays = $("#medicationDays").val().split(hashObj);
               if (selectedDays != "") {
               if (selectedDays[0] == falseObj) {
               medTimeDaySelected.isMonday = false;
               setDayColor("freqDay1", nonSelectedDayColor);
               } else {
               medTimeDaySelected.isMonday = true;
               setDayColor("freqDay1", selectedDayColor);
               }
               
               if (selectedDays[1] == falseObj) {
               medTimeDaySelected.isTuesday = false;
               setDayColor("freqDay2", nonSelectedDayColor);
               } else {
               medTimeDaySelected.isTuesday = true;
               setDayColor("freqDay2", selectedDayColor);
               }
               
               if (selectedDays[2] == falseObj) {
               medTimeDaySelected.isWednesday = false;
               setDayColor("freqDay3", nonSelectedDayColor);
               } else {
               medTimeDaySelected.isWednesday = true;
               setDayColor("freqDay3", selectedDayColor);
               }
               
               if (selectedDays[3] == falseObj) {
               medTimeDaySelected.isThursday = false;
               setDayColor("freqDay4", nonSelectedDayColor);
               } else {
               medTimeDaySelected.isThursday = true;
               setDayColor("freqDay4", selectedDayColor);
               }
               
               if (selectedDays[4] == falseObj) {
               medTimeDaySelected.isFriday = false;
               setDayColor("freqDay5", nonSelectedDayColor);
               } else {
               medTimeDaySelected.isFriday = true;
               setDayColor("freqDay5", selectedDayColor);
               }
               
               if (selectedDays[5] == falseObj) {
               medTimeDaySelected.isSaturday = false;
               setDayColor("freqDay6", nonSelectedDayColor);
               } else {
               medTimeDaySelected.isSaturday = true;
               setDayColor("freqDay6", selectedDayColor);
               }
               
               if (selectedDays[6] == falseObj) {
               medTimeDaySelected.isSunday = false;
               setDayColor("freqDay7", nonSelectedDayColor);
               } else {
               medTimeDaySelected.isSunday = true;
               setDayColor("freqDay7", selectedDayColor);
               }
               }
               
               var medTimes = $("#medicationTimes").val().split(hashObj);
               var timePickerContent = "";
               for (i in medTimes) {
               if (medTimes[i] != "") {
               timePickerContent += "<div><input class = 'mediTime' type='text' value='" + medTimes[i] + "' readonly='readonly'></div>";
               } else {
               break;
               }
               }
               if (timePickerContent != "") {
               $("#freqTimePicker").html(timePickerContent);
               $("#freqTimePicker").css("display", "block");
               $('.mediTime').scroller({ preset : 'time', theme : 'android', display : 'modal', mode : 'scroller' });
               }
               } else {
               $("#frequencyTypeSelect").val("0");
               $("#frequencyValue").val("");
               for (i in medTimeDaySelected) {
               medTimeDaySelected[i] = false;
               }
               $("#freqDayKeyboard").css("display", "none");
               $("#freqTimePicker").html("");
               }
               $("#frequencyDetails").show();
               });

$(document).on("change", "#frequencyTypeSelect", function() {
               var selectedFreqTypwId = $(this).val();
               $("#freqTimePicker").html("");
               if (selectedFreqTypwId.indexOf("0") != -1) {
               $("#freqDayKeyboard").css("display", "none");
               $("#freqTimePicker").css("display", "none");
               } else if (selectedFreqTypwId.indexOf("1") != -1) {
               $("#freqDayKeyboard").css("display", "none");
               var noOfTimePicker = $("#frequencyValue").val();
               var timePickerContent = "";
               for ( var i = 0; i < noOfTimePicker; i++) {
               timePickerContent += "<div><input class = 'mediTime' type='text' readonly='readonly'></div>";
               if (i == 5) {
               break;
               }
               }
               $("#freqTimePicker").html(timePickerContent);
               $("#freqTimePicker").css("display", "block");
               $('.mediTime').scroller({ preset : 'time', theme : 'android', display : 'modal', mode : 'scroller' });
               } else if (selectedFreqTypwId.indexOf("2") != -1 || selectedFreqTypwId.indexOf("3") != -1) {
               $("#freqDayKeyboard").css("display", "block");
               $("#freqTimePicker").html("<div><input class = 'mediTime' type='text' readonly='readonly'></div>");
               $("#freqTimePicker").css("display", "block");
               $('.mediTime').scroller({ preset : 'time', theme : 'android', display : 'modal', mode : 'scroller' });
               } else {
               $("#freqDayKeyboard").css("display", "block");
               $("#freqTimePicker").css("display", "none");
               }
               });

$(document).on("click", ".frequencyKey", function() {
               if (this.id == "freqKeyClr") {
               $("#frequencyValue").val("");
               } else {
               if ($("#frequencyValue").val().length < 2) {
               $("#frequencyValue").val($("#frequencyValue").val() + $(this).html().trim());
               }
               }
               var selectedTimeids = $("#frequencyTypeSelect").val();
               if (selectedTimeids != null) {
               if (selectedTimeids.indexOf("1") != -1) {
               var frequncyCount = $("#frequencyValue").val();
               frequncyCount = frequncyCount <= 6 ? frequncyCount : 6;
               var timePickerContent = "";
               if (frequncyCount != "") {
               for ( var i = 0; i < frequncyCount; i++) {
               timePickerContent += "<div><input class = 'mediTime' type='text' readonly='readonly'></div>";
               }
               }
               
               $("#freqTimePicker").html(timePickerContent);
               $("#freqTimePicker").css("display", "block");
               $('.mediTime').scroller({ 
                                       preset : 'time', 
                                       theme : 'android', 
                                       display : 'modal', 
                                       mode : 'scroller' 
                                       });
               }
               }
               });

$(document).on("keypress", "#frequencyValue", function(event) {
               return false;
               });

$(document).on("click", "#cancelFrequency", function() {
               $("#topMask").fadeOut(300);
               $("#topMask").remove();
               $("#frequencyDetails").fadeOut(300);
               return false;
               });

function isValideFrequency() {
    var errorMsg = "";
    
    var freq = $("#frequencyValue").val();
    if (freq == "") {
        errorMsg = errorFreqCount;
    } else if (freq == "0") {
        errorMsg = errorFreqValid;
    }
    
    var medTimeNo = $("#frequencyDetails .mediTime").length;
    for ( var i = 0; i < medTimeNo; i++) {
        if ($("#frequencyDetails .mediTime").eq(i).val() == "") {
            errorMsg += errorFreqTime;
            break;
        }
    }
    
    var selectedFreqType = $("#frequencyTypeSelect").val();
    if (selectedFreqType == "" || selectedFreqType == null || selectedFreqType.indexOf("0") != -1) {
        errorMsg += errorFreqType;
    } else if (selectedFreqType.indexOf("2") != -1 || selectedFreqType.indexOf("3") != -1) {
        if (!(medTimeDaySelected.isMonday || medTimeDaySelected.isTuesday || medTimeDaySelected.isWednesday || medTimeDaySelected.isThursday || medTimeDaySelected.isFriday || medTimeDaySelected.isSaturday || medTimeDaySelected.isSunday)) {
            errorMsg += errorFreqDays;
        }
        
    }
    
    if (errorMsg == "") {
        return true;
    } else {
        alert(errorMsg);
        return false;
    }
}

$(document).on("click", "#okFrequency", function() {
               if (isValideFrequency()) {
               var selectedTimeids = $("#frequencyTypeSelect").val();
               selectedTimeids = "" + selectedTimeids;
               do {
               selectedTimeids = selectedTimeids.replace(",", hashObj);
               } while (selectedTimeids.indexOf(",") !== -1);
               
               if (selectedTimeids == 0) {
               selectedTimeids = "";
               }
               $("#medicationTimeId").val(selectedTimeids);
               
               if (selectedTimeids.indexOf("1") != -1) {
               frequency = $("#frequencyValue").val() >= 6 ? 6 : $("#frequencyValue").val(); // set
               // max
               // time
               // to 6
               } else if (selectedTimeids.indexOf("2") != -1 || selectedTimeids.indexOf("3") != -1) {
               frequency = 1;
               } else {
               frequency = selectedTimeids.split(hashObj).length;
               }
               $("#medicationFreqEdit").val(frequency);
               
               var selectedDay = "";
               if (selectedTimeids.indexOf("1") == -1) {
               for (i in medTimeDaySelected) {
               selectedDay += medTimeDaySelected[i] + hashObj;
               }
               selectedDay = selectedDay.substring(0, (selectedDay.length - 1));
               } else {
               selectedDay = "false#false#false#false#false#false#false";
               for (i in medTimeDaySelected) {
               medTimeDaySelected[i] = false;
               }
               
               }
               $("#medicationDays").val(selectedDay);
               
               /* Handle medication time like 10:30pm etc */
               var selectedTime = "";
               var noOfMedTime = $("#freqTimePicker .mediTime").length;
               for ( var i = 0; i < 6; i++) {
               if (i < noOfMedTime) {
               selectedTime += $("#freqTimePicker .mediTime").eq(i).val() + hashObj;
               } else {
               selectedTime += hashObj;
               }
               }
               selectedTime = selectedTime.substring(0, (selectedTime.length - 1));
               $("#medicationTimes").val(selectedTime);
               $("#topMask").fadeOut(300);
               $("#topMask").remove();
               $("#frequencyDetails").fadeOut(300);
               return false;
               }
               });

$(document).on("click", ".freqDayKey", function() {
               var id = this.id;
               if (id == "freqDay1") {
               if (medTimeDaySelected.isMonday) {
               medTimeDaySelected.isMonday = false;
               setDayColor(id, nonSelectedDayColor);
               } else {
               medTimeDaySelected.isMonday = true;
               setDayColor(id, selectedDayColor);
               }
               } else if (id == "freqDay2") {
               if (medTimeDaySelected.isTuesday) {
               medTimeDaySelected.isTuesday = false;
               setDayColor(id, nonSelectedDayColor);
               } else {
               medTimeDaySelected.isTuesday = true;
               setDayColor(id, selectedDayColor);
               }
               } else if (id == "freqDay3") {
               if (medTimeDaySelected.isWednesday) {
               medTimeDaySelected.isWednesday = false;
               setDayColor(id, nonSelectedDayColor);
               } else {
               medTimeDaySelected.isWednesday = true;
               setDayColor(id, selectedDayColor);
               }
               } else if (id == "freqDay4") {
               if (medTimeDaySelected.isThursday) {
               medTimeDaySelected.isThursday = false;
               setDayColor(id, nonSelectedDayColor);
               } else {
               medTimeDaySelected.isThursday = true;
               setDayColor(id, selectedDayColor);
               }
               } else if (id == "freqDay5") {
               if (medTimeDaySelected.isFriday) {
               medTimeDaySelected.isFriday = false;
               setDayColor(id, nonSelectedDayColor);
               } else {
               medTimeDaySelected.isFriday = true;
               setDayColor(id, selectedDayColor);
               }
               } else if (id == "freqDay6") {
               if (medTimeDaySelected.isSaturday) {
               medTimeDaySelected.isSaturday = false;
               setDayColor(id, nonSelectedDayColor);
               } else {
               medTimeDaySelected.isSaturday = true;
               setDayColor(id, selectedDayColor);
               }
               } else if (id == "freqDay7") {
               if (medTimeDaySelected.isSunday) {
               medTimeDaySelected.isSunday = false;
               setDayColor(id, nonSelectedDayColor);
               } else {
               medTimeDaySelected.isSunday = true;
               setDayColor(id, selectedDayColor);
               }
               }
               });

function setDayColor(id, color) {
    $(hashObj + id).css("background", color);
}

$(document).on("click", "#addMedication", function() {
               $("#medNameEdit").css("display", "none");
               $("#cancelEditMed").css("display", "none");
               $("#cancelAddMed").show();
               $("#medicineSelectDiv").show();
               $("#patientMedicationId").val("");
               //$("#medOpName").html("Add Medication");
               $("#editSaveMedication").html("Add");
               $("#medicationDoseEdit").val("");
               $("#medicationFreqEdit").val("");
               $("#medicationNoteEdit").val("");
               
               var medList = $("<select id='medicineSelect' data-role='none' />");
               for ( var i in medication.medicineList) {
               $('<option />', { value : medication.medicineList[i].id, text : medication.medicineList[i].name }).appendTo(medList);
               }
               $("#medicineSelectDiv").html(medList);
               
               var doseType = $("<select id='medicationDosageTypeSelect' data-role='none' />");
               for ( var i in medication.dosageTypeList) {
               $('<option />', { value : medication.dosageTypeList[i].id, text : medication.dosageTypeList[i].name }).appendTo(doseType);
               }
               $("#dosageTypeDiv").html(doseType);
               
               var medTime = $("<select id='frequencyTypeSelect' multiple='multiple'/>");
               for ( var i in medication.medicationTimeList) {
               $('<option />', { value : medication.medicationTimeList[i].id, text : medication.medicationTimeList[i].name }).appendTo(medTime);
               }
               $("#frequencyType").html(medTime);
               
               var currDate = new Date();
               month = (currDate.getMonth() + 1) < 10 ? '0' + (currDate.getMonth() + 1) : (currDate.getMonth() + 1);
               date = (currDate.getDate()) < 10 ? '0' + (currDate.getDate()) : (currDate.getDate());
               currDate = currDate.getFullYear() + "-" + month + "-" + date;
               $("#medicationFromDateEdit").val(currDate);
               
               var cont = $("#medication_edit").html();
               $("#headerMedicine").append(cont);
               expand = false;
               slideDiv("headerMedicine");
               $('#medicationFromDateEdit').scroller({ 
                                                     preset : 'date', 
                                                     theme : 'android', 
                                                     display : 'modal', 
                                                     mode : 'scroller',
                                                     dateOrder: 'yyyy-mm-dd' 
                                                     });
               //$("#medicationToDateEdit").val(currDate);
               $('#medicationToDateEdit').scroller({ 
                                                   preset : 'date', 
                                                   theme : 'android', 
                                                   display : 'modal', 
                                                   mode : 'scroller',
                                                   dateOrder: 'yyyy-mm-dd' 
                                                   });
               
               });

$(document).on("click", "#cancelAddMed", function() {
               cnt = 0;
               expand = true;
               $("#medication_edit_content").remove();
               slideDiv("headerMedicine");
               backPath = "patient_medicine";
               gotoPath('#patient_medicine');
               });

$(document).on("click", "#cancelEditMed", function() {
               cnt = 0;
               expand = true;
               $("#medication_edit_content").remove();
               slideDiv("headerMedDetail");
               backPath = "patient_medicine";
               gotoPath('#patient_medicine');
               });


/********************Add/Edit/Delete Medication Ends Here**********************/


function isValidNumber(parameter) {
    if (parameter.match(/^[0-9]+$/)) {
        return true;
    } else {
        return false;
    }
}

function logoutFromApp() {
    storage.setItem("isAppLoggedOut", true);
    gotoPath('#appPage');
}


$(document).on('blur', 'input, textarea', function() {
               $.mobile.silentScroll($('div[data-role="header"]').offset().top);
               });


$("#heights").live("tap", function(){
                   document.getElementById('bottomOfDiv').scrollIntoView(true);
                   });



function getImage() {
    navigator.camera.getPicture(uploadPhoto, fail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
    
}


function uploadPhoto(imageURI) {
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.ext = options.fileName.substr(options.fileName.lastIndexOf('.')+1);
    if(options.ext  == "rtf"){
        options.mimeType="text/plain";
    }else{
        options.mimeType="image/jpg";
    }
    
    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";
    
    options.params = params;
    options.chunkedMode = false;
    alert(JSON.stringify(options));
    var ft = new FileTransfer();
    ft.upload(imageURI, "http://10.1.7.142/restserver/index.php/Example/user", win, fail, options);
}

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    alert(r.response);
}

function fail(error) {
    //alert("An error has occurred: Code = " = error.code);
}

function uploadFile(){
    /*navigator.camera.getPicture(uploadPhoto,
                                function(message) { alert('get picture failed'); },
                                { quality: 50, 
                                destinationType: navigator.camera.DestinationType.FILE_URI,
                                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
                                );*/ 
}