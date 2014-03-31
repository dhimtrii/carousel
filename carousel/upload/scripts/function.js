var urlAddress = "http://192.168.1.3/xampp/sitess/myhealthanalytics";
var postMethod = "POST";
var errorTitle = "Error";
var successTitle = "Success";
var moreButtonClicked = false;
var selectedDate = new Date();
var appointmentDetailsList = "";
var specialityDetailsList = "";
var requestHeader = "application/json;charset=utf-8";
var pubKey = "pubKey";
var patientId = "patientId";
var okButton = "OK";
var statusObj = "status";
var User;
var intRegex = /^\d+$/;
var contentVaccn = "";
var hashObj = "#";
var selDate;
var isValidMed;
var isNumberError;
var errorFreqTime = "Please select medication time.\n";

var application = {};
var appointment = {};
var medication = {};
var action = {};
var vitals = {};
var exercise = {};
var state = {};
var stateList = {};
var pinLock = {};
var medication = {};


var deleteVitMsg = "Do you want to delete this Vital information?\n";
var deleteMedMsg = "Do you want to delete this Medicaiton information?\n";
var deleteActMsg = "Do you want to delete this Action information?\n";
var deleteApptMsg = "Do you want to delete this Appointmant information?\n";
var deleteVaccnMsg = "Do you want to delete this Vaccination information?\n";

var medTimeDaySelected = { isMondayObj : false, isTuesdayObj : false, isWednesdayObj : false, isThursdayObj : false, isFridayObj : false, isSaturdayObj : false, isSundayObj : false };
var medicationTimes = new Array();

var falseObj = "false", trueObj = "true";

var nonSelectedDayColor = "#CCCCCC";

var errorStratEndDate = "End date should not be prior to Start date.\n";

var todayDate = new Date();
var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
var shortMonthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];


$(document).ready(function(){
   
   /*$("#apptView").live("click", function(){
                   alert("1");
                   $.post("index.php/welcome/login", { "patientId": 1, "date": "2013-07-25" },
                        function(data){
                          //alert(data.username); // John
                          alert(JSON.stringify(data));
                          //console.log(data.time); //  2pm
                          //window.location.href = "<?php echo site_url('Home'); ?>";
                        }, "json");
                
   });*/
   
   
   
   
   
   
   
   
   $("#medView").live("click", function(){
    openPatientMed();
    openDashboardMed();
      $.post("home/getalldata", { "patientId": 5, "date": "2013-07-25" },
                        function(data){
                          var medicationDetailsList = JSON.stringify(data["Medication"]);
			  medicationDetailsList = eval(" (" + medicationDetailsList + ") ");
			    populatemedication(medicationDetailsList);
			
                        }, "json");
   });
   
   
   $("#apptView").live("click", function(){
    openPatientAppt();
    //openDashboardAppt();
     $.post("home/getalldata", { "patientId": 5, "date": "2013-07-25" },
                        function(data){
			  var appointmentDetailsList = JSON.stringify(data["Appointment"]);
			  appointmentDetailsList = eval(" (" + appointmentDetailsList + ") ");
			    populateAppointment(appointmentDetailsList);
			
                        }, "json");
   });
   
   
   $("#uploadView").live("click", function(){
      window.location.href = "upload";
                        
     
   });
   $("#filesView").live("click", function(){
      window.location.href = "viewfile";
      /*$.post("viewFile/files", { "patientId": 5 },
                        function(data){
			  var filesList = JSON.stringify(data["files"]);
                          alert(filesList);
                          window.location.href = "viewFile";
			  filesList = eval(" (" + filesList + ") ");
                                       setTimeout(function() {
                                     populateFilesList(filesList)
                                     }, 500);
			
                        }, "json"); */                
     
   });

   
    
});



function populateFilesList(filesList){
   var i;
      var contentFile = "";
    for(i=0;i < filesList.length;i++){
      contentFile = contentFile + '<div style="width:100%;float:left;border-bottom:1px solid;padding-top:10px;padding-bottom:10px;padding-left:5%;">'+
                                 '<div class="openModal" id="'+filesList[i].filename+'_'+filesList[i].id+'" style="width:80%;height:200px;">'+
                                    ' <img class="imageShare" id="'+filesList[i].id+'" style="width:60%;height:200px;" src="'+urlAddress+'/files/'+filesList[i].filename+'" alt="files"/>'+
                                 '<div class="fr">Doctor Name: <select id="selectDoc" class="selectDoc"></select>'+
                                 '<div style="background-color:green;" id="shareDoc" class="button">Share</div>'+
                                 '</div>'+
                                 '</div>'+
                                 '<span style="font-weight:bold;font-size:16px;">'+filesList[i].title+'</span>'+
                                 '</div>';
    }
    
    $("#files").html(contentFile);
    var doctorList;
   $.post("home/getalldoctor", { "patientId": 5 },
                        function(data){
                          //var medicationDetailsList = JSON.stringify(data["Doctor"]);
			doctorList = JSON.stringify(data["doctor"]);
			  doctorList = eval(" (" + doctorList + ") ");
			populateDoctor(doctorList);
                        }, "json");
}


function populateDocFilesList(filesList){
   var i;
      var contentFile = "";
    for(i=0;i < filesList.length;i++){
      contentFile = contentFile + '<div style="width:100%;float:left;border-bottom:1px solid;padding-top:10px;padding-bottom:10px;padding-left:5%;">'+
                                 '<div class="openModal" id="'+filesList[i].filename+'_'+filesList[i].id+'" style="width:50%;height:200px;border:1px solid;">'+
                                    ' <img class="imageShare" id="'+filesList[i].id+'" style="width:100%;height:200px;" src="'+urlAddress+'/files/'+filesList[i].filename+'" alt="files"/>'+
                                 '</div>'+
                                 '<span style="font-weight:bold;font-size:16px;">'+filesList[i].title+'</span>'+
                                 '</div>';
    }
    
    $("#files").html(contentFile);
    
}


$(".openModal").live("click", function(){
   $('body').append('<div class="mask" id="addMedMask"></div>');
        $("#addMedMask").fadeIn(300);
        $('#addMedMask').css("zIndex", 99999999);
        $('#addMedMask').css("opacity", 0.8);
        $('#galleryDiv').css("display", "block");
        var fNameId = $(this).attr('id');
        var fName = fNameId.substr(0, fNameId.indexOf("_"));
        var id = fNameId.substr(fNameId.indexOf("_") + 1);
        $("#image").html('<img class="imgShare" id="'+id+'" style="width:100%;height:100%;" src="'+urlAddress+'/files/'+fName+'" alt="files"/>');
   var doctorList;
   $.post("home/getalldoctor", { "patientId": 5 },
                        function(data){
                          //var medicationDetailsList = JSON.stringify(data["Doctor"]);
			doctorList = JSON.stringify(data["doctor"]);
			  doctorList = eval(" (" + doctorList + ") ");
			populateDoctor(doctorList);
                        }, "json");
      
        
});


$("#closeGallery").live("click", function(){
   $('#addMedMask').fadeOut();
        $('#addMedMask').remove();
        $('#galleryDiv').css("display", "none");
});


$("#logout").live("click", function(){
   window.location.href = "../";
});



function populateDoctor(doctorList){
   var options;
        var i;
        
        for(i=0;i < doctorList.length;i++){
            options = options + '<option value="'+doctorList[i].uid+'">'+doctorList[i].firstname+' '+doctorList[i].lastname+'</option>';
         }
         $(".selectDoc").html(options);
}




function openPatientUpload(){
   $(".mainDiv").html('<article class="module width_3_quarter"><header><h3 class="tabs_involved">Upload File</h3><ul class="tabs"></ul></header><div class="tab_container"><div id="tab1" class="tab_content patient_medication overflow" id="patient_medication">'+
                      '<form method="post" action="" id="upload_file">'+
                        '<label for="title">Title</label>'+
                        '<input type="text" name="title" id="title" value="" />'+
                        '<label for="userfile">File</label>'+
                        '<input type="file" name="userfile" id="userfile" size="20" />'+
                        '<input type="submit" name="submit" id="submit" />'+
                        '</form></div></article>');
   
   
}


function openDashboardMed(){
    //var disDate = getDisplayDateMonth(todatDate);
    //$("#medicationDateContent").html(disDate);
    
 
    medActnTable("medicines", "MedActn", "");
}


function medActnTable(name, shortName, abbr) {
    contentBefore = "";
    contentAtTime = "";
    contentAfter = "";
    var date = new Date();
    var currTime = date.getHours();
    var cont = '<div id="beforeMedTime" style="width:100%;height:auto;"></div>'+
    '<div id="atMedTime" style="width:100%;height:auto;"></div>'+
    '<div id="afterMedTime" style="width:100%;height:auto;"></div>';
    $(".patient_medication").html(cont);
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
            contentBefore = contentBefore+'<div id="'+i+'_div" class="fl prevMed"><div class="answerMedPrev"><span class="fl font14" style="margin-left:2%;margin-top:5px;">'+idTime+'</span><div id="wrongAnsPrev" class="fr wrongAns" onclick="saveMissedDetails('+i+','+false+', 0)"><img class="fr iconClose" src="../../images/icon_redcross.png" width="20px" height="20px"></div><div id="correctAns" class="fr correctAns" onclick="saveMissedDetails('+i+','+true+', 0)"><img class="fr iconClose" src="../../images/icon_right.png" width="20px" height="20px"></div></div><div id="'+i+'_text" class="fl" style="width:100%;height:auto;display:inline-block;"></div></div>';
        }else if(i == currTime){
            contentAtTime = contentAtTime+'<div id="'+i+'_div" class="fl fullMedActnDiv currMedActn"><div class="answerMed"><span class="fl font14" style="margin-left:2%;margin-top:5px;color:#fff;">'+idTime+'</span><div id="wrongAns" class="fr wrongAns" onclick="saveMissedDetails('+i+','+false+', 0)"><img class="fr iconClose" src="../../images/icon_redcross.png" width="20px" height="20px"></div><div id="correctAns" class="fr correctAns" onclick="saveMissedDetails('+i+','+true+', 0)"><img class="fr iconClose" src="../../images/icon_right.png" width="20px" height="20px"></div></div><div id="'+i+'_text" class="fl" style="width:100%;height:auto;display:inline-block;"></div></div>';
        }else{
            contentAfter = contentAfter+'<div id="'+i+'_div" class="fl fullMedActnDiv"><div class="answerMedNext"><span class="fl font14" style="margin-left:2%;margin-top:5px;">'+idTime+'</span><div id="wrongAnsNext" class="fr wrongAns none" onclick="showRefillRequest()"><img class="fr iconClose" src="../../images/pill_bottle.png" width="17px" height="20px"></div></div><div id="'+i+'_text" class="fl" style="width:100%;height:auto;display:inline-block;"></div></div>';
        }
        $("#"+i+"_text").html("");
    }
    $("#beforeMedTime").html(contentBefore);
    $("#atMedTime").html(contentAtTime);
    $("#afterMedTime").html(contentAfter);
}



function populatemedication(medData, dates){
   //alert(JSON.stringify(medData));
    var currentDate = new Date();
    hr = currentDate.getHours();
    contentBefore = "";
    contentAfter = "";
    checkTime = 0;
    oldMedHour = new Array();
    medCnt = 0;
    var tdDate = todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate();
    
   if(medData == false){
      
      var content = '<div id="" class="fl fullMedActnDiv font16" style="display:block !important;text-align:center;margin-top:200px;padding-top:30px;">There are no Medication at this allocated</div>';
      $("#contentMed").html(content);
   }else{
      //if(dates == tdDate){
         for(i = 1; i<=24; i++){
            $("#"+i+"_text").html("");
         }
      
      //$("#medCnt").html(medCnt);
            
         var i;
         for(i=0;i < medData.length;i++){
            
             var id = medData[i].id;
               var date = new Date(todayDate);
               var yearCur = date.getFullYear();
               var monthCur = date.getMonth() + 1;
               var dayCur = date.getDate();
               var crrHour = date.getHours();
               var myDate = yearCur + '/' + monthCur + '/' + dayCur;
               for ( var k = 1; k <= 6; k++) {
                 var time;
                 if(k == 1){
                  if(medData[i].time1 != null || medData[i].time1 != ""){
                     time = decrypt(medData[i].time1);
                  }
                 }else if(k == 2){
                  if(medData[i].time2 != null || medData[i].time2 != ""){
                     time = decrypt(medData[i].time2);
                  }
                 }else if(k == 3){
                  if(medData[i].time3 != null || medData[i].time3 != ""){
                     time = decrypt(medData[i].time3);
                  }
                 }else if(k == 4){
                     if(medData[i].time4 != null || medData[i].time4 != ""){
                        time = decrypt(medData[i].time4);
                     }
                 }else if(k == 5){
                  if(medData[i].time5 != null || medData[i].time5 != ""){
                     time = decrypt(medData[i].time5);
                  }
                 }else{
                  if(medData[i].time6 != null || medData[i].time6 != ""){
                     time = decrypt(medData[i].time6);
                  }
                 }
                 
                 var dateTime = myDate + ' ' + time;
                 
                 var missedTime = dateTime;
                 dateTime = new Date(dateTime);
                 var medHour = dateTime.getHours();
                 
                 if (time != null && time != "") {
                     var contentImg = "";
                     var contentMed = "";
                     var medImage = medData[i].medpicture;
                     var isMissed = medData[i].ismissed;
                     
                     medCnt = medCnt + 1;
                     var missedCurrHour = "";
                     var missedCurrDate = "";
                     
                     var medName = "";
                     var nowDate = new Date();
                     //alert(getDateMonth(dateTime)+"=="+getDateMonth(nowDate));
                         
                     
                     $("#"+medHour+"_div").css("display","block");
                     contentMed = contentMed+'<div id="'+medHour+'_list"  class="'+medHour+'_list" style="width:100%;float:left;height:30px;border-bottom: 1px solid #BFBFBF;border-top: 1px solid #F5F5F5;padding-top:8px;padding-bottom:8px;"><div class="fl" style="width:15%;"><img src="http://54.213.19.88/healthanalytics/images/' + medImage + '" ></div><div class="fl" style="width:40%;padding-left:8%;"><span class="medName" style="font-size:18px;margin-top:15px;" data-pancakes="' + id + '_'+medHour+'">' + decrypt(medData[i].name) +'</span></div><div class="fr" style="width:30%;"><img onclick="deleteMedication('+id+')" src="../images/deleteIcon.png" class="fr icons" /><img onclick="editMedication('+id+')" src="../images/editIcon.png" class="fr icons" /></div></div><div class="none '+medHour+'_res" id="'+id+'">'+missedTime+'#'+medData[i].name+'</div><div class="none medtime">'+id+'_'+time+'#'+medHour+'</div></div>';
                     
                     $("#"+medHour+"_text").append(contentMed);
                      //alert(contentMed);
                     
                 }
               }
        // }
      }
   }
}


function populateAppointment(apptData, dates){
    $("#apptContent").html("");
    var content = "";
    var tdDate = todayDate.getFullYear()+"-"+todayDate.getMonth()+"-"+todayDate.getDate();
   if(apptData == false){
      content = content+'<div id="" class="fl fullMedActnDiv" style="display:block !important;">There are no Appointment at this time</div>';
   }else{
      //if(dates == tdDate){
         content = content + '<table width="100%"><tbody id="appointmentTable">';
         for(i=0;i < apptData.length;i++){
           
             var apptId = apptData[i].id;
                 var creationdate = apptData[i].apptdate;
                 var ind = creationdate.indexOf(" ");
                 var appDate;
                 //var s = creationdate.replace(/[ :]/g, "-").split("-"),
                 //appDate = new Date( s[0], s[1], s[2], s[3], s[4], s[5] );
                 creationdate = creationdate.split("-");
                 creationdate = creationdate.join("/");
                 appDate = new Date(creationdate);
                 
                 var month = appDate.getMonth();
                 
                 var year = appDate.getFullYear();
                 var day = appDate.getDate();
                 var crdates;
                 var monthName;
                 crdates = year + "/" + month + "/" + day;
                 /*if (month < 10) {
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
                 }*/
                 if (day < 10) {
                     monthName = shortMonthNames[month - 1] + " 0" + day;
                 } else {
                     monthName = shortMonthNames[month - 1] + " " + day;
                 }
                 //alert(crdates+"--"+getDateMonth(todayDate));
                 //if (crdates == getDateMonth(todayDate)) {
                 var ind = creationdate.indexOf(" ");
                 creationDate = creationdate.substr(0, ind);
                 
                 var ind1 = creationdate.indexOf(":");
                 creationHour = (creationdate.substr(ind + 1, 2));
                 var minutes = (creationdate.substr(ind1 + 1, 2));
                 var day = creationHour < 12 ? 'am' : 'pm';
                 
                 var hrId = creationHour < 13 ? creationHour : creationHour - 12;
                 var apptTime = hrId + ":" + minutes + " " + day;
                 
                 var docName = apptData[i].firstname + " " + apptData[i].lastname;
                 content = content + '<tr style="border-bottom: 1px solid #EFEFEF !important;"><td><div class="apptListDiv"><div id="appointmentTime"><span id="timeImage"><img src="../../images/bluedot.png" alt="" class="footerButtonImage fl"></span><span id="time" class="fl apptDate">' + monthName + '</span><div class="startTimeAppt startTimeApptList fl">' + apptTime + '</div></div><div id="appointmentData" class ="fl"><span id="doctorName" class="fl"><a data-pancakes="' + apptId + '" href="#" style="text-decoration:none;color:#000;">Dr. ' + docName + '</a></span><br><span id="therapy">' + apptData[i].spname + '</span></div><div class="fr" style="width:10%;"><img onclick="deleteAppointment('+apptId+')" src="../images/deleteIcon.png" class="fr icons" /><img onclick="editAppointment('+apptId+')" src="../images/editIcon.png" class="fr icons" /></div></div></a></td></tr>';
                 
                // }
         }
         content = content + '</tbody></table>';
      //}
   }
            
    $("#contentAppt").html(content);
}


function getDateMonth(date){
    var dateFormatNew = date.getFullYear()+"/"+(date.getMonth() + 1)+"/"+date.getDate();
    return dateFormatNew;
}



function openPatientMed(){
    //$(".mainDiv").html('<article class="module width_3_quarter"><header><h3 class="tabs_involved">Medications</h3><ul class="tabs"></ul></header><div class="tab_container"><div id="tab1" class="tab_content patient_medication overflow" id="patient_medication"></div></article>')
    
    window.location.href = "medication";
    
}



function openPatientAppt(){
    //$(".mainDiv").html('<article class="module width_3_quarter"><header><h3 class="tabs_involved">Appointment</h3><ul class="tabs"></ul></header><div class="tab_container" style="height:500px;"><div id="tab1" class="tab_content overflow" id="patient_appointment">'+
	//	       '<div id="datepicker"></div><div data-role="content" class="patient_appointment"></div></article>');
    //openCalender();

   window.location.href = "appointment";
}


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
                                           //initAppoint(month);
                                           dateMonth = month;
                                           } });
               var date = new Date();
               var dformat = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ].join('/') + ' ' + [ date.getHours(), date.getMinutes(), date.getSeconds() ].join(':');
               var i = dformat.slice(0, 10).split('/');
               var monthCur = date.getMonth() + 1;
               var dayCur = date.getDate();
               var crrHour = date.getHours();
               var monthName = shortMonthNames[monthCur - 1];
               //$("#hexagonAppt").html("<center>" + monthName + " " + dayCur + "</center>");
               //initAppoint(monthCur);
               }, 200);
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


function populatemProfile(profileInfo){
   
}




function populateVaccination(vaccinationlist, date){
   $("#apptContent").html("");
   var content = "";
   var tdDate = todayDate.getFullYear()+"-"+todayDate.getMonth()+"-"+todayDate.getDate();
   if(vaccinationlist == false){
      content = content+'<div id="" class="fl fullMedActnDiv" style="display:block !important;">There are no vaccination at this time</div>';
   }else{
      //if(date == tdDate){
         
       
       content = content + '<table width="100%"><tbody id="appointmentTable" class="font16" style="border-bottom:1px solid;">';
       content = content + '<tr><td style="text-align:center;font-size:20px;font-weight:bold;background-color:#B5E5EF;border-bottom:1px solid;border-left:1px solid;">Vaccination Name</td><td style="text-align:center;font-size:20px;font-weight:bold;background-color:#B5E5EF;border-bottom:1px solid;border-left:1px solid;">Scheduled Date</td><td style="text-align:center;font-size:20px;font-weight:bold;background-color:#B5E5EF;border-bottom:1px solid;border-left:1px solid;">Date Taken</td><td style="text-align:center;font-size:20px;font-weight:bold;background-color:#B5E5EF;border-bottom:1px solid;border-left:1px solid;border-right:1px solid;">Action</td>';
       for(i=0;i < vaccinationlist.length;i++){
           var apptId = vaccinationlist[i].id;
               var dateTaken = vaccinationlist[i].datetaken;
               if(dateTaken == null){
                  dateTaken = "NA";
               }
               
               content = content + '<tr style="border-bottom:1px solid;"><td style="text-align:center;border-bottom:1px solid;border-left:1px solid;">'+decrypt(vaccinationlist[i].vaccnName)+'</td><td style="text-align:center;border-bottom:1px solid;border-left:1px solid;">'+vaccinationlist[i].scheduledDate+'</td><td style="text-align:center;border-bottom:1px solid;border-left:1px solid;">'+dateTaken+'</td><td style="text-align:center;border-bottom:1px solid;border-left:1px solid;border-right:1px solid;"><img onclick="deleteVaccination('+apptId+')" src="../images/deleteIcon.png" class="fr icons" /><img onclick="editVaccination('+apptId+')" src="../images/editIcon.png" class="fr icons" /></td>';
               
              
       }
       content = content + '</tbody></table>';
       localStorage.setItem("vaccnCont", vaccinationlist);
      /*}else{
         for(i=0;i < vaccinationlist.length;i++){
           var apptId = vaccinationlist[i].id;
               var dateTaken = vaccinationlist[i].datetaken;
               if(dateTaken == null){
                  dateTaken = "NA";
               }
            content = content+'<div id="" class="fl fullMedActnDiv" style="display:block !important;">'+decrypt(vaccinationlist[i].vaccnName)+'</div>';
         }
         
      }*/
   }
    //alert(content);
            
    $(".patient_vaccination").html(content);
}


function getMedData(date){
   selDate = date;
   var dformat = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ].join('/') + ' ' + [ date.getHours(), date.getMinutes(), date.getSeconds() ].join(':');
               var i = dformat.slice(0, 10).split('/');
               var monthCur = date.getMonth() + 1;
               var dayCur = date.getDate();
               var crrHour = date.getHours();
	       var yearCur = date.getFullYear();
               var monthName = shortMonthNames[monthCur - 1];
               $("#hexagonMed").html("" + monthName + " " + dayCur + "");
	       var getDateFormat = yearCur+"-"+monthCur+"-"+dayCur;
               openDashboardMed();
                $.post("medication/view", { "patientId": 5, "date": getDateFormat },
                        function(data){
                          var medicationDetailsList = JSON.stringify(data["medication"]);
			  medicationDetailsList = eval(" (" + medicationDetailsList + ") ");
			    populatemedication(medicationDetailsList, getDateFormat);
			
                        }, "json");
}


function getActData(date){
   selDate = date;
   var dformat = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ].join('/') + ' ' + [ date.getHours(), date.getMinutes(), date.getSeconds() ].join(':');
               var i = dformat.slice(0, 10).split('/');
               var monthCur = date.getMonth() + 1;
               var dayCur = date.getDate();
               var crrHour = date.getHours();
               var yearCur = date.getFullYear();
               var monthName = shortMonthNames[monthCur - 1];
               $("#hexagonMed").html("" + monthName + " " + dayCur + "");
               var getDateFormat = yearCur+"-"+monthCur+"-"+dayCur;
	       openDashboardMed();
                $.post("action/viewaction", { "patientId": 5, "date": getDateFormat },
                        function(data){
                          var actnData = JSON.stringify(data["action"]);
			  actnData = eval(" (" + actnData + ") ");
			    populateAction(actnData);
			
                        }, "json");
}


function getApptData(date){
   selDate = date;
   var dformat = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ].join('/') + ' ' + [ date.getHours(), date.getMinutes(), date.getSeconds() ].join(':');
               var i = dformat.slice(0, 10).split('/');
               var monthCur = date.getMonth() + 1;
               var dayCur = date.getDate();
               var crrHour = date.getHours();
               var monthName = shortMonthNames[monthCur - 1];
               var yearCur = date.getFullYear();
               var getDateFormat = yearCur+"-"+monthCur+"-"+dayCur;
               
               $("#hexagonAppt").html("" + monthName + " " + dayCur + "");
               $.post("appointment/view", { "patientId": 5, "date": getDateFormat },
                        function(data){
			  var appointmentDetailsList = JSON.stringify(data["appointment"]);
			  appointmentDetailsList = eval(" (" + appointmentDetailsList + ") ");
                          //alert(JSON.stringify(appointmentDetailsList));
			    populateAppointment(appointmentDetailsList);
			
                        }, "json");
}


function prevDate(type){
    
    var prevDate = selDate;
    prevDate = getPrevDate(prevDate);
    selDate = prevDate;
    var disDate = getDisplayDateMonth(selDate);
    if(type == 'action'){
        $("#actionDateContent").html(disDate);
        medActnTable("medicines", "Actn", "");
        setTimeout(function() {
                   getActData(selDate);
                   }, 200)
    }else if(type == 'medication'){
        medActnTable("medicines", "Med", "");
        
        $("#medicationDateContent").html(disDate);
        setTimeout(function() {
                   getMedData(selDate);
                   }, 200);
    }else{
        $("#medicationDateContent").html(disDate);
        setTimeout(function() {
                   getApptData(selDate);
                   }, 200)
    }
}

function nextDate(type){
    
    var nextDate = selDate;
    nextDate = getNextDate(nextDate);
    selDate = nextDate;
    //alert(selDate);
    var disDate = getDisplayDateMonth(selDate);
    if(type == 'action'){
        $("#actionDateContent").html(disDate);
        medActnTable("medicines", "Actn", "");
        setTimeout(function() {
                   getActData(selDate);
                   }, 200)
    }else if(type == 'medication'){
        medActnTable("medicines", "Med", "");
        
        $("#medicationDateContent").html(disDate);
        setTimeout(function() {
                   getMedData(selDate);
                   }, 200);
    }else{
        $("#medicationDateContent").html(disDate);
        setTimeout(function() {
                   getApptData(selDate);
                   }, 200)
    }
    
    
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
    nowCurrDate = future_date;
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
    //alert(prev_date);
    nowCurrDate = prev_date;
    return prev_date;
}


function getDisplayDateMonth(divDate){
    var month = divDate.getMonth() + 1;
    var year = divDate.getFullYear();
    var day = divDate.getDate();
    day = appendZero(day);
    var monthName = shortMonthNames[month - 1];
    var dayText = "";
    
    dayText = monthName + " " + day + " " + year;
    
    return dayText;
}   


function appendZero(val){
    val = parseInt(val);
    if (val < 10) {
        val = "0" + val;
    } else {
        val = val;
    }
    return val;
}




/*******************Add Medication****************************/


function addMedication(){
    $("#medNameEdit").css("display", "none");
    $("#cancelEditMed").css("display", "none");
    $("#cancelAddMed").show();
    $("#medicineSelectDiv").show();
    $("#patientMedicationId").val("");
    //$("#medOpName").html("Add Medication");
    $("#editSaveMedication").html("Save");
    $("#medicationDoseEdit").val("");
    $("#medicationFreqEdit").val("");
    $("#medicationNoteEdit").val("");
    
    $("#medicineSelectDiv").html('<input type="textbox" id="medicineSelect" data-role="none" />');
    
    var doseType = $("<select id='medicationDosageTypeSelect' data-role='none' />");
    /*for ( var i in medication.dosageTypeList) {
     $('<option />', { value : medication.dosageTypeList[i].id, text : medication.dosageTypeList[i].name }).appendTo(doseType);
     }*/
    var options = '<option value="1">tea Spoon</option>'+
    '<option value="2">Tabs</option>'+
    '<option value="3">Caps</option>'+
    '<option value="4">Pills</option>';
    $("#dosageTypeDiv").html(doseType);
    $("#medicationDosageTypeSelect").html(options);
    
    /*var medTime = $("<select id='frequencyTypeSelect' multiple='multiple'/>");
    for ( var i in medication.medicationTimeList) {
     $('<option />', { value : medication.medicationTimeList[i].id, text : medication.medicationTimeList[i].name }).appendTo(medTime);
     }
    
    var optionsfreq = '<option value="1">Times a day</option>';
    '<option value="2">Times a week</option>'+
    '<option value="3">Times a month</option>'+
    '<option value="4">Before breakfast</option>'
    '<option value="5">After breakfast</option>'+
    '<option value="6">Before lunch</option>'+
    '<option value="7">After lunch</option>'+
    '<option value="8">Before dinner</option>'+
    '<option value="9">After dinner</option>';
    
    $("#frequencyType").html(medTime);
    $("#frequencyTypeSelect").html(optionsfreq);*/
    
    var currDate = new Date();
    month = (currDate.getMonth() + 1) < 10 ? '0' + (currDate.getMonth() + 1) : (currDate.getMonth() + 1);
    date = (currDate.getDate()) < 10 ? '0' + (currDate.getDate()) : (currDate.getDate());
    currDate = currDate.getFullYear() + "-" + month + "-" + date;
    //$("#medicationFromDateEdit").val(currDate);
    
    var cont = $("#medication_edit").html();
    $("#addMedicaitonDiv").append(cont);
    //expand = false;
    //slideDiv("headerMedicine");
    $('.dateInput').scroller({ 
                                          preset : 'date', 
                                          theme : 'android', 
                                          display : 'modal', 
                                          mode : 'scroller',
                                          dateOrder: 'yyyy-mm-dd' 
                                          });
    //$("#medicationToDateEdit").val(currDate);
    $('.dateInput').scroller({ 
                                        preset : 'date', 
                                        theme : 'android', 
                                        display : 'modal', 
                                        mode : 'scroller',
                                        dateOrder: 'yyyy-mm-dd' 
                                        });
    
}


function isValideMedication() {
    
}



$(document).on("click", "#editSaveMedication", function() {
               Fielderror = 0;
               isNumberError = 0;
               var isUpdate = $("#isMedUpdate").val();
               var id = $("#medId").val();
               var medId = $("#mId").val();
               var mname = encrypt($("#medName").val());
               //alert(mname);
               var fromDate = $("#medicationFromDateEdit").val();
               var dosage = encrypt($("#medicationDoseEdit").val());
               var dosageTypeId = $("#medicationDosageTypeSelect").val();
               var freq = encrypt($("#medicationFreqEdit").val());
               validationField();
               
               if (Fielderror == 0) {
                  $("#inputErrorMsg").html("");
                  isNumeric(dosage, "medicationDoseEdit");
                  if(isNumberError == 0){
                     $("#isValidNum").html("");
                     if(fromDate.indexOf("/") >= 0){
                        fromDate = currentDate(fromDate);    
                     }
                     var toDate = $("#medicationToDateEdit").val();
                     if(toDate.indexOf("/") >= 0){
                        toDate = currentDate(toDate);
                     }
                     var medTimeId = $("#medicationTimeId").val();
                     var comment = encrypt($("#medicationNoteEdit").val());
                  
                     var medTimes = $("#medicationTimes").val().split(hashObj);
                     
                  
                     medicationTimes = new Array();
                     for (i in medTimes) {
                        if (medTimes[i] != "") {
                           medicationTimes[i] = medTimes[i];
                        } else {
                        break;
                        }
                     }
                  
                     for(var k=0; k < medicationTimes.length; k++){
                     
                        if(k == 0){
                           var time1 = encrypt(medicationTimes[0]);
                        }else if(k == 1){
                           var time2 = encrypt(medicationTimes[1]);
                           
                        }else if(k == 2){
                           var time3 = encrypt(medicationTimes[2]);
                           
                        }else if(k == 3){
                           var time4 = encrypt(medicationTimes[3]);
                           
                        }else if(k == 4){
                           var time5 = encrypt(medicationTimes[4]);
                           
                        }else{
                           var time6 = encrypt(medicationTimes[5]);
                           
                        }
                     }
                     //alert("3");
                     var medJson = "";
                     var medModel;
                     if (isUpdate) {
                     medJson = { "id":id, "mid" : medId, "mname" : mname, "comments" : comment, "dosage" : dosage, "dosageTypeid" : dosageTypeId , "frequency" : freq, "medtimeid" : medTimeId, "time1" : time1, "time2" : time2, "time3" : time3, "time4" : time4, "time5" : time5, "time6" : time6, "fromDate" : fromDate, "toDate" : toDate, patientId : 5, "isSunday" : medTimeDaySelected.isSunday, "isMonday" : medTimeDaySelected.isMonday, "isTuesday" : medTimeDaySelected.isTuesday, "isWednesday" : medTimeDaySelected.isWednesday, "isThursday" : medTimeDaySelected.isThursday, "isFriday" : medTimeDaySelected.isFriday, "isSaturday" : medTimeDaySelected.isSaturday };
                     //alert(JSON.stringify(medJson));
                        $.post("addmedication/mededit", medJson,
                              function(data){
                                //alert(data.username); // John
                                //alert(JSON.stringify(data));
                                //console.log(data.time); //  2pm
                                //window.location.href = "<?php echo site_url('Home'); ?>";
                                window.location.href = "medication";
                              }, "json");
                     
                      
                     } else {
                     medJson = { "mname" : mname,  "comments" : comment, "dosage" : dosage, "dosageTypeid" : dosageTypeId , "frequency" : freq, "medtimeid" : medTimeId, "time1" : time1, "time2" : time2, "time3" : time3, "time4" : time4, "time5" : time5, "time6" : time6, "fromDate" : fromDate, "toDate" : toDate, patientId : 5, "isSunday" : medTimeDaySelected.isSunday, "isMonday" : medTimeDaySelected.isMonday, "isTuesday" : medTimeDaySelected.isTuesday, "isWednesday" : medTimeDaySelected.isWednesday, "isThursday" : medTimeDaySelected.isThursday, "isFriday" : medTimeDaySelected.isFriday, "isSaturday" : medTimeDaySelected.isSaturday };
                        $.post("addmedication/medsave", medJson,
                              function(data){
                                //alert(data.username); // John
                                //alert(JSON.stringify(data));
                                //console.log(data.time); //  2pm
                                //window.location.href = "<?php echo site_url('Home'); ?>";
                                window.location.href = "medication";
                              }, "json");
                     }
                  //alert(JSON.stringify(medJson));
                  }
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
   
   $("#frequencyDetails").css("display", "block");
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
   //if (selectedTimeids != null) {
      //if (selectedTimeids.indexOf("1") != -1) {
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
      //}
   //}
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
    
    /*var selectedFreqType = $("#frequencyTypeSelect").val();
    if (selectedFreqType == "" || selectedFreqType == null || selectedFreqType.indexOf("0") != -1) {
        errorMsg += errorFreqType;
    } else if (selectedFreqType.indexOf("2") != -1 || selectedFreqType.indexOf("3") != -1) {
        if (!(medTimeDaySelected.isMonday || medTimeDaySelected.isTuesday || medTimeDaySelected.isWednesday || medTimeDaySelected.isThursday || medTimeDaySelected.isFriday || medTimeDaySelected.isSaturday || medTimeDaySelected.isSunday)) {
            errorMsg += errorFreqDays;
        }
        
    }*/
    
    if (errorMsg == "") {
        return true;
    } else {
        alert(errorMsg);
        return false;
    }
}

//$(document).on("click", "#okFrequency", function() {
function okFrequency(){
   if (isValideFrequency()) {
      /*var selectedTimeids = $("#frequencyTypeSelect").val();
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
      }*/
      var selectedTimeids = new Array();
      var cntMed = parseInt($("#frequencyValue").val());
      if(cntMed > 6){
         cntMed = 6;
      }
      for(var o=0;o<cntMed; o++){
         var time = $("")
      }
      $(".mediTime").each(function(){
         var time = $(this).val();
         selectedTimeids.push(time);
      });
       
       $("#medicationFreqEdit").val(selectedTimeids.length);
               
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
}

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







/*******************Add Medication****************************/






/*******************Add Action****************************/


/********************Add/Edit/Delete Action Starts Here**********************/


function addAction() {
    $('.actionDate').scroller({ 
                              preset : 'date', 
                              theme : 'android', 
                              display : 'modal', 
                              mode : 'scroller' 
                              });
    
    $('#activityTime').scroller({ preset : 'time', theme : 'android', display : 'modal', mode : 'scroller' });
    
    var currDate = getCurrentDate(new Date());
   
    $("#addEditActionForm .actionDate").val(currDate);
}

$(document).on("click", "#cancelActionOp", function() {
    $("#addEditActionForm").removeClass("block").addClass("none");
    $("#addEditActionForm").remove();
});

$(document).on("change", "#actionSelectType", function() {
    $("#exerciseContent").removeClass("none").addClass("block");
               
});

function isValidAction(isUpdate) {
    var errorMsg = "";
    
    
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
    
    if (errorMsg == "") {
        return true;
    } else {
        alert(errorMsg);
        return false;
    }
}


function isValidNumber(parameter) {
    if (parameter.match(/^[0-9]+$/)) {
        return true;
    } else {
        return false;
    }
}


function isNumeric(parameter, field) {
   if(parameter != ""){
      if (parameter.match(/^[0-9]+$/)) {
      }else{
           $("#" + field).css("border", "2px solid red");
           $("#isValidNum").html("Please enter numeric values.");
           isNumberError = 1;
       }
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
    var isUpdate = $("#actUpdate").val();
    //alert(isUpdate);
    var id = $("#actId").val();;
    var actId = $("#patientActionId").val();
               
    if (isValidAction(isUpdate)) {
        var addActionJson;
        var actionModel = "";
               
        actionType = "exe";
        
      
        
        actionName = $("#exerciseSelectName").val();
        //alert(actionName);
        actionDesc = encrypt($("#exerciseDesc").val());
        actionDuration = encrypt($("#exerciseDuration").val());
        actionSubType = encrypt($("#exerciseSelectType").val());
        actionFromDate = currentDate($("#exerciseFromDate").val());
        
        actionToDate = currentDate($("#exerciseToDate").val());
        
        
        actionFreq = encrypt($("#exerciseFrequency").val());
               
        exerciseTimeArray = new Array();
        totalExeTime = $(".exeTime").length;
        for ( var i = 0; i < 5; i++) {
            if (totalExeTime > i) {
               exerciseTimeArray[i] = encrypt($(".exeTime").eq(i).val());
            } else {
               exerciseTimeArray[i] = "";
            }
        }
        if (isUpdate == 1) {
            addActionJson = { "id" : id, patientId : 5, "type" : actionType, "exerciseId" : actionName, "description" : actionDesc, "duration" : actionDuration, "exType" : actionSubType, "fromDate" : actionFromDate, "toDate" : actionToDate, "frequency" : actionFreq, "time1" : exerciseTimeArray[0], "time2" : exerciseTimeArray[1], "time3" : exerciseTimeArray[2], "time4" : exerciseTimeArray[3], "time5" : exerciseTimeArray[4] };
            $.post("addaction/editaction", addActionJson,
                        function(data){
                          //alert(data.username); // John
                          //alert(JSON.stringify(data));
                          //console.log(data.time); //  2pm
                          //window.location.href = "<?php echo site_url('Home'); ?>";
                          window.location.href = "action";
                        }, "json");
        } else {
         
            addActionJson = { patientId : 5, "type" : actionType, "exerciseId" : actionName, "description" : actionDesc, "duration" : actionDuration, "exType" : actionSubType, "fromDate" : actionFromDate, "toDate" : actionToDate, "frequency" : actionFreq, "time1" : exerciseTimeArray[0], "time2" : exerciseTimeArray[1], "time3" : exerciseTimeArray[2], "time4" : exerciseTimeArray[3], "time5" : exerciseTimeArray[4] };
            $.post("addaction/saveaction", addActionJson,
                        function(data){
                          //alert(data.username); // John
                          //alert(JSON.stringify(data));
                          //console.log(data.time); //  2pm
                          //window.location.href = "<?php echo site_url('Home'); ?>";
                          window.location.href = "action";
                        }, "json");
               
        }
   
               
      //alert(JSON.stringify(addActionJson));
      
      
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
               
    $("#exerciseContent").removeClass("none").addClass("block");
               
    // Set the default values
    $("#addEditActionForm #exerciseSelectName").val(actionTypeId);
    $("#addEditActionForm #exerciseDuration").val(exerciseObj.get("subType2").split(" ")[0]);
    $("#addEditActionForm #exerciseSelectType").val(exerciseObj.get("actionType"));
    var fromDate = exerciseObj.get("fromDate");
               
    if(fromDate.indexOf("-") >= 0){
        fromDate = fromDate.split("-").join("/");
        fromDate = getDisplayDateFormat(fromDate);
    }
    $("#addEditActionForm #exerciseFromDate").val();
    var toDate = exerciseObj.get("toDate");
    if(toDate.indexOf("-") >= 0){
        toDate = toDate.split("-").join("/");
        toDate = getDisplayDateFormat(toDate);
    }
    $("#addEditActionForm #exerciseToDate").val();
               
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
               
    $('.actionDate').scroller({ preset : 'date', theme : 'android', display : 'modal', mode : 'scroller' });
               
               
});

$("#cancelActionEdit").live("tap", function() {
    $("#actionContent").removeClass("none").addClass("block");
    $("#addEditActionForm").removeClass("block").addClass("none");
    $("#addEditActionForm").remove();
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


function cancelPatientAction() {
    $("#medication_edit_content").remove();
    closeMask();
    $('#addActionDiv').css("display", "none");
    $(".dateVisible").css("display", "none");
}


function getCurrentDate(today) {
    month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    date = (today.getDate()) < 10 ? '0' + (today.getDate()) : (today.getDate());
    return (today.getFullYear() + "-" + month + "-" + date);
}


/********************Add/Edit/Delete Action Ends Here**********************/



/*******************Add Vaccinaton****************************/



function savePatientVaccination(){
    Fielderror = 0;
    var isUpdate = $("#isVaccnUpdate").val();
    var id = $("#vaccnId").val();
    var vName = encrypt($("#vaccnTitile").val());
    var date = currentDate($("#scdlTime").val());
    var description = encrypt($("#vaccnDesc").val());
    var vId = $("#vId").val();
    var vaccnJson = "";
    validationField();
               
    if (Fielderror == 0) {
      if(isUpdate == 1){
        vaccnJson = { "id":id, patientId : 5, "vncId" : vId, "vName":vName, "date" : date, "description" : description };
        //alert(JSON.stringify(vaccnJson));
        $.post("addvaccination/editdata", vaccnJson,
                          function(data){
                            //alert(data.username); // John
                            //alert(JSON.stringify(data));
                            //console.log(data.time); //  2pm
                            //window.location.href = "<?php echo site_url('Home'); ?>";
                             window.location.href = "vaccination";
                          }, "json");
      }else{
        vaccnJson = { patientId : 5, "vncId" : vId, "vName":vName, "date" : "2013-08-12", "description" : description };
        //alert(JSON.stringify(vaccnJson));
        $.post("addvaccination/savedata", vaccnJson,
                          function(data){
                            //alert(data.username); // John
                            //alert(JSON.stringify(data));
                            //console.log(data.time); //  2pm
                            //window.location.href = "<?php echo site_url('Home'); ?>";
                             window.location.href = "vaccination";
                          }, "json");
      }
    }
    
    
    
}


function closeVaccination(){
    closeMask();
    $('#addVaccnDiv').css("display", "none");
    $(".dateVisible").css("display", "none");
}




/*function populateVaccination(vaccnData){
   contentVaccn = "";
    var i;
        
   for(i=0;i < vaccnData.length;i++){
         var id = medData[i].id;
          var scheduledDate = item.get("scheduledDate");
          var vaccnName = item.get("vaccnName");
          var datetaken = item.get("datetaken");
          var statusVaccn = "";
          if(datetaken == null || datetaken == "" || datetaken == "null"){
            datetaken = "NA";
            statusVaccn = "Pending";
          }else{
            statusVaccn = "Completed";
          }
          
                    
          contentVaccn = contentVaccn+'<div id="1_div" class="fl fullMedActnDiv currentVit" style="display:block !important;">'+
                        '<div class="" style="padding-top:5px;">'+
                        '<span class="fl font22" style="margin-left:2%;margin-top:5px;color:#000;"><span class="">'+vaccnName+'</span> <span class="font18" style="color:#4B4B4B;">'+scheduledDate+'</span></span>'+
                        '</div>'+
                        '<div id="1_text" class="fl" style="width:100%;height:auto;display:inline-block;">'+
                        '<div class="fl" style="width:30%;height: auto;margin: 15px 9px 12px 2%">'+
                        '<div class="w100 font18" style="padding-bottom: 3px;color:#4B4B4B;">Status</div>'+
                        '<span class="red font22">'+statusVaccn+'</span>'+
                        '</div>'+
                        '<div class="fr" style="width:30%;height: 40px;margin: 15px 9px 12px 2%;">'+
                        '<div class="w100 font18" style="padding-bottom: 3px;color:#4B4B4B;">Date Taken</div>'+
                        '<span class="red font22">'+datetaken+'</span>'+
                        '</div>'+
                        '</div>'+
                        '</div>';
   }
   $("#contentVaccn").html(contentVaccn);
}*/


/*******************Add Vaccinaton****************************/




function populateAction(actnData, dates){
    var currentDate = new Date();
    hr = currentDate.getHours();
    contentBefore = "";
    contentAfter = "";
    checkTime = 0;
    oldMedHour = new Array();
    medCnt = 0;
    
   for(i = 1; i<=24; i++){
        $("#"+i+"_text").html("");
   }
   var tdDate = todayDate.getFullYear()+"-"+todayDate.getMonth()+"-"+todayDate.getDate();
   if(actnData == false){
      content = content+'<div id="" class="fl fullMedActnDiv" style="display:block !important;">There are no Action at this time</div>';
   }else{
      //if(dates == tdDate){
    
         //$("#medCnt").html(medCnt);
               
         var i;
         for(i=0;i < actnData.length;i++){
             var id = actnData[i].id;
               var date = new Date(todayDate);
               var yearCur = date.getFullYear();
               var monthCur = date.getMonth() + 1;
               var dayCur = date.getDate();
               var crrHour = date.getHours();
               var myDate = yearCur + '/' + monthCur + '/' + dayCur;
               for ( var k = 1; k <= 5; k++) {
                 var time;
                 if(k == 1){
                     time = decrypt(actnData[i].time1);
                 }else if(k == 2){
                     time = decrypt(actnData[i].time2);
                 }else if(k == 3){
                     time = decrypt(actnData[i].time3);
                 }else if(k == 4){
                     time = decrypt(actnData[i].time4);
                 }else {
                     time = decrypt(actnData[i].time5);
                 }
                 
                 var dateTime = myDate + ' ' + time;
                 
                 var missedTime = dateTime;
                 dateTime = new Date(dateTime);
                 var medHour = dateTime.getHours();
                 
                 if (time != null && time != "") {
                     var contentImg = "";
                     var contentMed = "";
                     var medImage = actnData[i].medpicture;
                     var isMissed = actnData[i].ismissed;
                     
                     medCnt = medCnt + 1;
                     var missedCurrHour = "";
                     var missedCurrDate = "";
                     
                     var medName = "";
                     var nowDate = new Date();
                     //alert(getDateMonth(dateTime)+"=="+getDateMonth(nowDate));
                         
                     
                     $("#"+medHour+"_div").css("display","block");
                     contentMed = contentMed+'<div id="'+medHour+'_list"  class="'+medHour+'_list" style="width:100%;float:left;height:30px;border-bottom: 1px solid #BFBFBF;border-top: 1px solid #F5F5F5;padding-top:8px;padding-bottom:8px;"><div class="fl" style="width:15%;"><img src="http://54.213.19.88/healthanalytics/images/' + medImage + '" ></div><div class="fl" style="width:40%;padding-left:8%;"><span class="medName" style="font-size:18px;margin-top:15px;" data-pancakes="' + id + '_'+medHour+'">' + actnData[i].name +'</span></div><div class="fr" style="width:30%;"><img onclick="deleteAction('+id+')" src="../images/deleteIcon.png" class="fr icons" /><img onclick="editAction('+id+')" src="../images/editIcon.png" class="fr icons" /></div><div class="none '+medHour+'_res" id="'+id+'">'+missedTime+'#'+actnData[i].name+'</div><div class="none medtime">'+id+'_'+time+'#'+medHour+'</div></div>';
                     
                     $("#"+medHour+"_text").append(contentMed);
                        
                     
                 }
               }
         }
     // }
   }
}






$("#register").live("click", function(){
      Fielderror = 0;
      emailError = 0;
      passError = 0;
      validation();
      var fname = $("#fName").val();
      var lname = $("#lName").val();
      var gender = $("#gender").val();
      var dob = $("#dob").val();
      var email = $("#email").val();
      ValidateEmail(email);
      var username = $("#username").val();
      var pass = $("#password1").val();
      var pass1 = $("#password2").val();
      if(pass != pass1){
         passError = 1;
         $(this).css("border", "2px solid red");
      }
      var city = $("#city").val();
      var state = $("#state").val();
      var country = $("#country").val();
      var tel = $("#telephone").val();
      //alert(Fielderror+"--"+emailError+"--"+passError);
      if(Fielderror == 0 && emailError == 0 && passError == 0){
         var crypt = new JSEncrypt();
         var privateKey = crypt.getPrivateKey();
         var publicKey = crypt.getPublicKey();
         //alert(privateKey+"--"+publicKey);
                             
         $.post("registration/registerUser", { "fname":fname, "lname": lname, "gender": gender, "dob": dob, "email": email, "username": username, "password": pass1, "city": city, "state": state, "country": country, "tel": tel, "privKey": privateKey, "pubKey":publicKey },
                           function(data){
                             
                             //window.location.href = "viewFile";
                             // Create the encryption object.
                              
                           
                           }, "json");
      }
      
   });


function ValidateEmail(inputText){  
   /*var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
   if(inputText.match(mailformat)){  
      $("#email").css("border", "2px solid red");
      emailError = 1; 
   }  
   else{  
      alert("You have entered an invalid email address!");  
      $("#email").css("border", "none");  
      return false;
      emailError = 0;
   }
   */
}  

function validation(){
   $(".required").each(function() {
                        //if ($(this).css("display") != "none") {
                        var value = $(this).val();
                        if (value == "") {
                        $(this).css("border", "2px solid red");
                        //$("#inputErrorMsg").css("display", "block");
                        //$("#inputErrorMsg").html("Please fill all the required fields marked with *.");
                        Fielderror = 1;
                        }else{
                           $(this).css("border", "none");
                        }
                        //}
                        });
}



var privKey;
function encrypt(value){
    /*var crypt = new JSEncrypt();
    
    // Set the private.
    crypt.setPrivateKey($('#privKey').val());
   
    // If no public key is set then set it here...
    var pubkey = $('#pubkey').val();
    
    if (pubkey) {
      
        crypt.setPublicKey($('#pubkey').val());
        
    }
    else {
      
        $('#pubkey').val(crypt.getPublicKey());
        
    }
    
    //alert($('#pubkey').val());
    var crValue = crypt.encrypt(value);
    //$('#input').val('');
    //alert(crValue);
    return crValue;*/
    return value;
    
}


function decrypt(value){
    /*var crypt = new JSEncrypt();
    
    // Set the private.
    crypt.setPrivateKey($('#privKey').val());

    // If no public key is set then set it here...
    var pubkey = $('#pubkey').val();
    if (pubkey) {
        crypt.setPublicKey($('#pubkey').val());
    }
    else {
        $('#pubkey').val(crypt.getPublicKey());
    }
    
    var crValue = crypt.decrypt(value);
    //$('#input').val('');
    //alert(crValue);
    return crValue;*/
    return value;
    
}



$(".collapse").live("click", function(){
   var id = $(this).attr("id");
   var imgId = $(this).attr("src");
   
   openDashboardMed();
    //openDashboardAppt();
   var date = new Date();
   var dformat = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ].join('/') + ' ' + [ date.getHours(), date.getMinutes(), date.getSeconds() ].join(':');
   var i = dformat.slice(0, 10).split('/');
   var monthCur = date.getMonth() + 1;
   var dayCur = date.getDate();
   var crrHour = date.getHours();
   var yearCur = date.getFullYear();
   var monthName = shortMonthNames[monthCur - 1];
   var getDateFormat = yearCur+"-"+monthCur+"-"+dayCur;
               
   if(imgId == "../images/expand.png"){
      
      $(this).attr("src", "../images/collapse.png");
      $("."+id).animate({"height": "300px"}, { duration: "fast" });
      if(id.indexOf("patient_vaccn_div") >= 0){
         $.post("home/getalldata", { "patientId": 5, "date": getDateFormat, "type":"vaccn" },
                        function(data){
                          
			  var vaccinationList = JSON.stringify(data["vaccination"]);
			  vaccinationList = eval(" (" + vaccinationList + ") ");
			    
			    populateVaccination(vaccinationList, getDateFormat);
			    
			
                        }, "json");
      }else if(id.indexOf("patient_med_div") >= 0){
         
         $.post("home/getalldata", { "patientId": 5, "date": getDateFormat, "type":"med" },
                        function(data){
                          //alert(data.username); // John
                          var medicationDetailsList = JSON.stringify(data["medication"]);
			  medicationDetailsList = JSON.stringify(data["medication"]);
			  medicationDetailsList = eval(" (" + medicationDetailsList + ") ");
			  
			    populatemedication(medicationDetailsList, getDateFormat);
			   
                        }, "json");
      }else if(id.indexOf("patient_appt_div") >= 0){
         $.post("home/getalldata", { "patientId": 5, "date": getDateFormat, "type":"appt" },
                        function(data){
                          
			  var appointmentDetailsList = JSON.stringify(data["appointment"]);
			  appointmentDetailsList = eval(" (" + appointmentDetailsList + ") ");
			  
			    populateAppointment(appointmentDetailsList, getDateFormat);
			    
			
                        }, "json");
      }else if(id.indexOf("patient_vit_div") >= 0){
         $.post("home/getalldata", { "patientId": 5, "date": getDateFormat, "type":"vit" },
                        function(data){
                          
			  var vitalsList = JSON.stringify(data["vital"]);
			  vitalsList = eval(" (" + vitalsList + ") ");
			  
			    populateVital(vitalsList, getDateFormat);
			    
			    
			
                        }, "json");
      }else{
         
         $.post("home/getalldata", { "patientId": 5, "date": getDateFormat, "type":"files" },
                        function(data){
                          
			    
			    var filesList = JSON.stringify(data["files"]);
			    //alert(filesList);
			   var filesList = eval(" (" + filesList + ") ");
			   
			   populateFilesList(filesList);
			
                        }, "json");
      }
   }else{
      $(this).attr("src", "../images/expand.png");
      $("."+id).animate({"height": "0px"}, { duration: "fast" });
      
   }
});

var doctorList;
function populateDoctors(doctorsList){
   doctorList = doctorsList;
   var specCont = "";
    for ( var i in doctorsList) {
        specCont = specCont + '<option value="'+doctorsList[i].spid+'">'+doctorsList[i].spname+'</option>';
    }
    
    $("#docSpeciality").append(specCont);
}


function setDoctors(){
    var specId = $("#docSpeciality").val();
    var specCont = "";
    for ( var i in doctorList) {
        if(parseInt(specId) == parseInt(doctorList[i].spid)){
            specCont = specCont + '<option value="'+doctorList[i].uid+'">'+doctorList[i].firstname+' '+doctorList[i].lastname+'</option>';
        }
    }
    //alert(specCont);
    $("#docName").append(specCont);
}



function changeVital(val){
                     var cont = "";
                     $("#fieldDivDyn").html("");
      var val = $("#vitTitile").val();
                    // alert(val);
                     if(val == 1){
                     cont = '<div class="float100 actionContentTr">'+
                                '<div class="vitLabel" style="margin-top:15px;">HDL:</div>'+
                                '<div class="actionInput">'+
                                    '<input type="tel" id="hdl" class="editActionInput required" maxlength="3">'+
                                '</div>'+
                            '</div>'+
                            '<div class="float100 actionContentTr">'+
                                '<div class="vitLabel" style="margin-top:15px;">LDL:</div>'+
                                '<div class="actionInput">'+
                                    '<input type="tel" id="ldl" class="editActionInput required" maxlength="3">'+
                                '</div>'+
                            '</div>'+
                            '<div class="float100 actionContentTr">'+
                                '<div class="vitLabel" style="margin-top:15px;">Trigly:</div>'+
                                '<div class="actionInput">'+
                                    '<input type="tel" id="trigly" class="editActionInput required" maxlength="3">'+
                                '</div>'+
                            '</div>'+
                            '<div class="float100 actionContentTr">'+
                                '<div class="vitLabel" style="margin-top:15px;">Total:</div>'+
                                '<div class="actionInput">'+
                                    '<input type="tel" id="total" class="editActionInput required" maxlength="3">'+
                                '</div>'+
                            '</div>';
                     }else if(val == 2){
                        cont = cont + '<div class="float100 actionContentTr">'+
                                    '<div class="vitLabel" style="margin-top:15px;">Systolic:</div>'+
                                    '<div class="actionInput">'+
                                        '<input type="tel" id="systolic" class="editActionInput required" maxlength="3">'+
                                    '</div>'+
                                '</div>'+
                                '<div class="float100 actionContentTr">'+
                                    '<div class="vitLabel" style="margin-top:15px;">Diastolic:</div>'+
                                    '<div class="actionInput">'+
                                        '<input type="tel" id="diastolic" class="editActionInput required" maxlength="3">'+
                                    '</div>'+
                                '</div>';
                     }else if(val == 3){
                        cont = '<div class="float100 actionContentTr">'+
                                    '<div class="vitLabel" style="margin-top:15px;">Weight:</div>'+
                                    '<div class="actionInput">'+
                                        '<input type="tel" id="weight" class="editActionInput required" maxlength="3">'+
                                    '</div>'+
                                '</div>';
                     }else if(val == 4){
                        cont = '<div class="float100 actionContentTr">'+
                                    '<div class="vitLabel" style="margin-top:15px;">Height:</div>'+
                                    '<div class="actionInput">'+
                                        '<input type="tel" id="height" class="editActionInput required" maxlength="3">'+
                                    '</div>'+
                                '</div>';
                     }else{
                     
                     }
                     
                     $("#fieldDivDyn").html(cont);
}

function closeVital(){
    closeMask();
    $('#addVitalDiv').css("display", "none");
    $(".dateVisible").css("display", "none");
}


$("#saveVitals").live("tap", function(){
               var val = $(this).val(); 
                      var val1 = "";
                      var val2 = "";
                      var val3 = "";
                      var val4 = "";
            if(val == 1){
                      val1 = "HDL";
                      val2 = "LDL";
                      val3 = "Trigly";
                      val4 = "Total";
                      }else if(val == 2){
                        val1 = "Systolic";
                      val2 = "Diastolic";
                      
                      }else if(val == 3){
                      val1 = "";
                      }else{
                      val1 = "";
                      }
                      });











function savePatientAppointment() {
    var isUpdateAppt = $("#apptUpdate").val();
    $("#inputErrorMsg").css("display", "none");
    $("#inputErrorMsg").html("");
    $(".required").css("border", "1px solid #000");
    Fielderror = 0;
    validationField();
    var docId = $("#docName").val();
    var docSpecialityId = $("#docSpeciality").val();
    var startDate = $("#fromDate").val();
    if (startDate != "") {
        startDate = new Date(startDate);
        startDate = dateFormat(startDate, "yyyy-mm-dd HH:MM");
        startDate = startDate;
    }
    var today = new Date();
    today = dateFormat(today, "yyyy-mm-dd");
    today = today;
    
    var status = encrypt("1");
    var isdelete = "0";
    //var remindMeData1 = $('#reminder1Data').val();
    
    //isValid(remindMeData1, "reminder1Data");
    //var remindMeType1 = $("#reminder1").val();
    //remindMeData1 = encrypt(remindMeData1 + "" + remindMeType1);
    var remindMeData1 = encrypt("2H");
    //var remindMeData2 = $('#reminder2Data').val();
    //isValid(remindMeData2, "reminder2Data");
    //var remindMeType2 = $("#reminder2").val();
    //remindMeData2 = encrypt(remindMeData2 + "" + remindMeType2);
    var remindMeData2 = encrypt("3H");
    
    //var frequency = encrypt($("#frequency").val());
    var frequency = encrypt("Daily");
    var descriptionData = encrypt($("#descriptionData").val());
    
    var crId = encrypt("5");
    if (Fielderror == 0) {
        var apptJson = "";
        var apptModel;
        
        if(isUpdateAppt == 1){
            var apptId = $("#apptId").val();
            apptJson = { 'id':apptId, patientId : 5, "did" : docId, "spid" : docSpecialityId, "confirmed" : status, "description" : descriptionData, "frequency" : frequency, "reminder1" : remindMeData1, "reminder2" : remindMeData2, "status" : status, "startDate" : startDate, "creationDate" : today, "lastUpdationDate" : today, "createdBy" : crId, "lastUpdatedBy" : crId, "isDeleted" : isdelete };
            $.post("addappointment/editdata", apptJson,
                        function(data){
                          //alert(data.username); // John
                          //alert(JSON.stringify(data));
                          //console.log(data.time); //  2pm
                          //window.location.href = "<?php echo site_url('Home'); ?>";
                          window.location.href = "appointment";
                        }, "json");
        }else{
            apptJson = { patientId : 5, "did" : docId, "spid" : docSpecialityId, "confirmed" : status, "description" : descriptionData, "frequency" : frequency, "reminder1" : remindMeData1, "reminder2" : remindMeData2, "status" : status, "startDate" : startDate, "creationDate" : today, "lastUpdationDate" : today, "createdBy" : crId, "lastUpdatedBy" : crId, "isDeleted" : isdelete };
            $.post("addappointment/savedata", apptJson,
                        function(data){
                          //alert(data.username); // John
                          //alert(JSON.stringify(data));
                          //console.log(data.time); //  2pm
                          //window.location.href = "<?php echo site_url('Home'); ?>";
                          window.location.href = "appointment";
                        }, "json");
        }
            //alert(JSON.stringify(apptJson));
        
        
    }
    
}


function validationField() {
    $(".required").each(function() {
         if ($(this).css("display") != "none") {
            var value = $(this).val();
            if (value == "") {
               $(this).css("border", "2px solid red");
               $("#inputErrorMsg").css("display", "block");
               $("#inputErrorMsg").html("Please fill all the required fields marked with *.");
               Fielderror = 1;
            }else{
               $(this).css("border", "1px solid black");
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



function editVital(vitId){
   localStorage.setItem("edit", 1);
   localStorage.setItem("editId", vitId);
    window.location.href = "addvitals";
}


function editVital1(vitalCollection){
    //window.location.href = "addVitals";
     
   var i;
      var contVital = "";
    for(i=0;i < vitalCollection.length;i++){
      var id = vitalCollection[i].id;
      
         
         var attributename1 = vitalCollection[i].attributename1;
         var attributename2 = vitalCollection[i].attributename2;
         var attributename3 = vitalCollection[i].attributename3;
         var attributename4 = vitalCollection[i].attributename4;
         var attrvalue1 = vitalCollection[i].attrvalue1;
         var attrvalue2 = vitalCollection[i].attrvalue2;
         var attrvalue3 = vitalCollection[i].attrvalue3;
         var attrvalue4 = vitalCollection[i].attrvalue4;
         var createddate = vitalCollection[i].createddate;
         var val = vitalCollection[i].noofvalues;
         var vitalName = vitalCollection[i].name;
         var lastUpdated = vitalCollection[i].createddate;
         var vid = vitalCollection[i].vid;
         var pvtid = vitalCollection[i].pvtid;
         
         changeVital(val);
         $('#addVitalDiv').css("display", "block");
         
         //alert(val);
         var attrVal1 = "";
         var attrVal2 = "";
         var attrVal3 = "";
         var attrVal4 = "";
         if(vid == 1){
             $("#hdl").val(attrvalue1);
             $("#ldl").val(attrvalue2);
             $("#trigly").val(attrvalue3);
             $("#total").val(attrvalue4);
         }else if(vid == 2){
             
             $("#systolic").val(attrvalue1);
             $("#diastolic").val(attrvalue2);
             
         }else if(vid == 3){
            
             $("#weight").val(attrvalue1);
              //$("#height").val(attrvalue1);
         }else{
             
             $("#height").val(attrVal1);
         }
         $("#vitUpdate").val("1");
         $("#vitId").val(id);
         $("#pvitId").val(id);
      
    }
}

var ischeck = 0

function isvalidVital(val){
   $(".required").each(function(){
      if ($(this).css("display") != "none") {
         var value = $(this).val();
         if (value == "") {
            //$(this).css("border", "2px solid red");
            //$("#inputErrorMsg").css("display", "block");
            //$("#inputErrorMsg").html("Please fill all the required fields marked with *.");
            ischeck = 1;
         }else{
            ischeck = 0;
            var value = $(this).val();
            
            if(isValidNumber(value) == false){
               
               //$("#inputErrorMsg").css("display", "block");
               //$("#inputErrorMsg").html("Please fill all the required fields marked with *.");
               ischeck = 1;
            }else{
               ischeck = 0;
            }
         }
         
         if(ischeck == 0){
            $(this).css("border", "2px solid black");
         }else{
            $(this).css("border", "2px solid red");
         }
      }
      
   })
   
}


function savePatientVital(){
   ischeck = 0;
    var val = $("#vitTitile").val();
   var isUpdate = $("#vitUpdate").val();
    var id = $("#vitId").val();
    var pvtid = $("#pvitId").val();
    isvalidVital(val);
    var val1 = "";
    var val2 = "";
    var val3 = "";
    var val4 = "";
    var attrVal1 = "";
    var attrVal2 = "";
    var attrVal3 = "";
    var attrVal4 = "";
    if(val == 1){
        val1 = encrypt("HDL");
        val2 = encrypt("LDL");
        val3 = encrypt("Trigly");
        val4 = encrypt("Total");
        attrVal1 = $("#hdl").val();
        attrVal2 = $("#ldl").val();
        attrVal3 = $("#trigly").val();
        attrVal4 = $("#total").val();
        attrVal1 = encrypt($("#hdl").val());
        attrVal2 = encrypt($("#ldl").val());
        attrVal3 = encrypt($("#trigly").val());
        attrVal4 = encrypt($("#total").val());
    }else if(val == 2){
        val1 = encrypt("Systolic");
        val2 = encrypt("Diastolic");
        attrVal1 = encrypt($("#systolic").val());
        attrVal2 = encrypt($("#diastolic").val());
                      
    }else if(val == 3){
        val1 = "";
        attrVal1 = encrypt($("#weight").val());
    }else{
        val1 = "";
        attrVal1 = encrypt($("#height").val());
    }
    
    
    
    var vitalModel = "";
    var vitalJson = "";
    if(ischeck == 0){                  
    if(isUpdate == 1){
        vitalJson = { "id":id, "pvtid":pvtid, patientId : 5, "vtlId" : val, "cnt":val, "val1":val1, "val2":val2, "val3":val3, "val4":val4, "attrVal1":attrVal1, "attrVal2":attrVal2, "attrVal3":attrVal3, "attrVal4":attrVal4, "date" : "2013-08-12" };
        $.post("addvitals/editdata", vitalJson,
                        function(data){
                          //alert(data.username); // John
                          //alert(JSON.stringify(data));
                          //console.log(data.time); //  2pm
                          //window.location.href = "<?php echo site_url('Home'); ?>";
                          window.location.href = "vitals";
                        }, "json");
        //alert(JSON.stringify(vaccnJson));
    }else{
        vitalJson = { patientId : 5, "vtlId" : val, "cnt":val, "val1":val1, "val2":val2, "val3":val3, "val4":val4, "attrVal1":attrVal1, "attrVal2":attrVal2, "attrVal3":attrVal3, "attrVal4":attrVal4, "date" : "2013-08-12" };
        $.post("addvitals/savedata", vitalJson,
                        function(data){
                          //alert(data.username); // John
                          //alert(JSON.stringify(data));
                          //console.log(data.time); //  2pm
                          //window.location.href = "<?php echo site_url('Home'); ?>";
                          window.location.href = "vitals";
                        }, "json");
    }
    }
                      //alert(JSON.stringify(vitalJson));
                      
                      
    
}
           
        

function currentDates(divDate) {
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
           

function getVitalDate(vDate){
    var month = vDate.getMonth() + 1;
    var year = vDate.getFullYear();
    var day = vDate.getDate();
    var Hour = vDate.getHours();
    var Min = vDate.getMinutes();
    var dates;
    if(currentDates(vDate) != currentDates(currentDate)){
        
        if (month < 10) {
            if (day < 10) {
                dates = "0" + month + "/0" + day;
            } else {
                dates = "0" + month + "/" + day;
            }
            
        } else {
            if (day < 10) {
                dates = month + "/0" + day;
            } else {
                dates = month + "/" + day;
            }
        }
    }else{
        if (Hour < 10) {
            if (Min < 10) {
                dates = "0" + Hour + ":0" + Min;
            } else {
                dates = "0" + Hour + ":" + Min;
            }
            
        } else {
            if (Min < 10) {
                dates = Hour + ":0" + Min;
            } else {
                dates = Hour + ":" + Min;
            }
        }
    }
    return dates;
}


var vitalCollection = "";
function populateVital(vitData, dates){
   var i;
      var contVital = "";
   var tdDate = todayDate.getFullYear()+"-"+todayDate.getMonth()+"-"+todayDate.getDate();
   if(vitData == false){
      contVital = contVital+'<div id="" class="fl fullMedActnDiv" style="display:block !important;">There are no Medication at this time</div>';
   }else{
      //if(dates == tdDate){
         for(i=0;i < vitData.length;i++){
           var id = vitData[i].id;
               var attributename1 = decrypt(vitData[i].attributename1);
               var attributename2 = decrypt(vitData[i].attributename2);
               var attributename3 = decrypt(vitData[i].attributename3);
               var attributename4 = decrypt(vitData[i].attributename4);
               var attrvalue1 = decrypt(vitData[i].attrvalue1);
               var attrvalue2 = decrypt(vitData[i].attrvalue2);
               var attrvalue3 = decrypt(vitData[i].attrvalue3);
               var attrvalue4 = decrypt(vitData[i].attrvalue4);
               var createddate = vitData[i].createddate;
               var attrCnt = vitData[i].noofvalues;
               var vitalName = vitData[i].name;
               var lastUpdated = vitData[i].createddate;
               
               //alert("1-"+attrvalue1);
               contVital = contVital + '<div id="1_div" class="fl fullMedActnDiv currentVit" style="display:block !important;">'+
                                            '<div class="pad0">'+
                                               '<span class="fl font20 vitalName" style="font-size:22px;"><span class="">'+vitalName+'</span> <span class="font18" style="color:#434447;font-size:18px;">'+lastUpdated+'</span></span>'+
               
                                            '</div>'+
                                            '<div class="fr" style="width:10%;"><img onclick="deleteVital('+id+')" src="../images/deleteIcon.png" class="fr icons" /><img onclick="editVital('+id+')" src="../images/editIcon.png" class="fr icons" /></div>'+
                                            '<div id="1_text" class="fl vitAttrDiv w100">';
               
               var contNext;
               var mod;
               var j;
               for(j=0; j<attrCnt;j++){
               /*var attNme = "attributename"+(j+1);
               var attVal = "attrvalue"+(j+1);
               var attNme = vitData[i].attNme;*/
               
               //var attVal = vitData[i].attVal;
               var attVal;
               var attNme;
               if(j == 1){
                 attNme = decrypt(vitData[i].attributename1);
                 attVal = decrypt(vitData[i].attrvalue1);
               }else if(j == 2){
                 attNme = decrypt(vitData[i].attributename2);
                 attVal = decrypt(vitData[i].attrvalue2);
               }else if (j == 3){
                 attNme = decrypt(vitData[i].attributename3);
                 attVal = decrypt(vitData[i].attrvalue3);
               }else{
                 attNme = decrypt(vitData[i].attributename4);
                 attVal = decrypt(vitData[i].attrvalue4);
               }
               //alert("2-"+attVal);
               if(attVal != "" && attVal != null){
                      mod = (j+1)%2;
                      
                      
                      if(mod == 0){
                      
                      contVital = contVital + '<div id="1_text" class="fl w100 attrVal">'+
                                                  '<div class="fr attrValDiv">'+
                                                     '<div class="attrDiv" style="width:35%;font-size:20px;">'+attNme+'</div>'+
                                                     '<span class="font22" style="font-size:18px;">'+attVal+'</span>'+
                                                  '</div>';
                          contNext = '</div>';
                      }else{
                      
                      contNext =  '<div class="fl attrValDiv">'+
                                      '<div class="attrDiv" style="width:35%;font-size:20px;">'+attNme+'</div>'+
                                      '<span class="font22" style="font-size:18px;">'+attVal+'</span>'+
                                   '</div></div>';
                      contVital = contVital + contNext;
                      }
               }      
               }   
               if(mod == 0){
               
               contVital = contVital + contNext;
               }
               contVital = contVital + '</div></div>';
               
               
         }
      //}
   }
    $("#contentVit").html(contVital);
}





function editAction(actId){
   localStorage.setItem("edit", 1);
   localStorage.setItem("editActId", actId);
    window.location.href = "addaction";
}



function populateEditAction(actnData){
   var i;
   for(i=0; i<actnData.length; i++){
      var id = actnData[i].id;
      var fromDate = getDisplayDateFormat(actnData[i].fromdate);
      var toDate = getDisplayDateFormat(actnData[i].todate);
      var type = actnData[i].type;
      var description = decrypt(actnData[i].description);
      var duration = decrypt(actnData[i].duration);
      var frequency = decrypt(actnData[i].frequency);
      var time1 = decrypt(actnData[i].time1);
      var time2 = decrypt(actnData[i].time2);
      var time3 = decrypt(actnData[i].time3);
      var time4 = decrypt(actnData[i].time4);
      var time5 = decrypt(actnData[i].time5);
      var eid = actnData[i].eid;
      
      $('.actionDate').scroller({ 
                              preset : 'date', 
                              theme : 'android', 
                              display : 'modal', 
                              mode : 'scroller' 
                              });
      
      $('#activityTime').scroller({ preset : 'time', theme : 'android', display : 'modal', mode : 'scroller' });
      
      if (intRegex.test(frequency)) {
        frequency = frequency <= 5 ? frequency : 5;
        var timePicker = "";
        for ( var i = 0; i < frequency; i++) {
            if(i == 0){
               timePicker += "<div><input class = 'exeTime' type='text' value='"+time1+"' readonly='readonly'></div>";
            }else if(i == 1){
               timePicker += "<div><input class = 'exeTime' type='text' value='"+time2+"' readonly='readonly'></div>";
            }else if(i == 2){
               timePicker += "<div><input class = 'exeTime' type='text' value='"+time3+"' readonly='readonly'></div>";
            }else if(i == 3){
               timePicker += "<div><input class = 'exeTime' type='text' value='"+time4+"' readonly='readonly'></div>";
            }else{
               timePicker += "<div><input class = 'exeTime' type='text' value='"+time5+"' readonly='readonly'></div>";
            }
        }
        $("#exerciseTime").html(timePicker);
        $('.exeTime').scroller({ preset : 'time', theme : 'android', display : 'modal', mode : 'scroller' });
    }
    
    $("#exerciseSelectName").val(eid);
    $("#exerciseDuration").val(duration);
    $("#exerciseSelectType").val(type);
    $("#exerciseFromDate").val(fromDate);
    $("#exerciseToDate").val(toDate);
    $("#exerciseFrequency").val(frequency);
    $("#exerciseDesc").val(description);
    $("#actUpdate").val("1");
    $("#actId").val(id);        
   }
}


function editAppointment(apptId){
   //alert(apptId);
   localStorage.setItem("edit", 1);
   localStorage.setItem("editApptId", apptId);
    window.location.href = "addappointment";
}

function populateEditAppointment(apptData){
   var i;
   for(i=0; i<apptData.length; i++){
      var apptId = apptData[i].id;
      var docId = apptData[i].doctorId;
      var apptdate = apptData[i].apptdate;
      apptdate = getApptDisplayDateFormat(apptdate);
      var spId = apptData[i].specialtyid;
      var description = decrypt(apptData[i].description);
      
      $("#docSpeciality").val(spId);
    
      setDoctors();
    
      //alert(docId);
      $("#apptId").val(apptId);
      $("#apptUpdate").val("1");
      $("#docName").val(docId);
      $("#fromDate").val(apptdate);
      $("#descriptionData").val(description);
      $('.datetimepicker').scroller({
                                    preset: 'datetime',
                                    theme: 'android',
                                    display: 'modal',
                                    mode: 'scroller'
                                    });
   }
}


function getApptDisplayDateFormat(divDate) {
    divDate = divDate.split("-");
    divDate = divDate.join("/");
    divDate = new Date(divDate);
    var month = divDate.getMonth() + 1;
    var year = divDate.getFullYear();
    var day = divDate.getDate();
    var hours = divDate.getHours();
    var mins = divDate.getMinutes();
    if(hours < 12){
        if(hours < 10){
            hours = "0"+hours;
        }
    }else{
        hours = hours - 12;
        if(hours < 10){
            hours = "0"+hours;
        }
    }
    if(mins < 10){
        mins = "0"+mins;
    }
    if (month < 10) {
	    if (day < 10) {
            dates = "0" + month + "/0" + day + "/" + year + " " + hours + ":" + mins;
	    } else {
            dates = "0" + month + "/" + day + "/" + year + " " + hours + ":" + mins;
	    }
        
    } else {
	    if (day < 10) {
            dates = "" + month + "/0" + day + "/" + year + " " + hours + ":" + mins;
	    } else {
            dates = "" + month + "/" + day + "/" + year + " " + hours + ":" + mins;
	    }
    }
    return dates;
}
  
  
  
function editVaccination(vaccnId){
   //alert(vaccnId);
   localStorage.setItem("edit", 1);
   localStorage.setItem("editVaccnId", vaccnId);
    window.location.href = "addvaccination";   
}


function populateEditVaccination(vaccnData){
   var i;
   for(i=0; i<vaccnData.length; i++){
    var vaccnName = decrypt(vaccnData[i].vaccnName);
    var description = decrypt(vaccnData[i].description);
    var vId = vaccnData[i].vid;
    var vaccnId = vaccnData[i].id;
    //alert("2");
    
    var scheduledDate = getDisplayDateFormat(vaccnData[i].scheduledDate);
    var datetaken = vaccnData[i].datetaken;
    
    
    $("#vaccnId").val(vaccnId);
    $("#vId").val(vId);
    $("#isVaccnUpdate").val("1");
    $("#vaccnTitile").val(vaccnName);
    $("#scdlTime").val(scheduledDate);
    $("#vaccnDesc").val(description);
    $('#scdlTime').scroller({
                                  preset: 'date',
                                  theme: 'android',
                                  display: 'modal',
                                  mode: 'scroller'
                                  });
   }
}


function editMedication(medId){
   localStorage.setItem("edit", 1);
   localStorage.setItem("editMedId", medId);
    window.location.href = "addmedication";   
}


function populateEditMed(medData){
   var i;
   for(i=0; i<medData.length; i++){
         var medName = decrypt(medData[i].name);
        
        var freq = decrypt(medData[i].frequency);
        
        var description = decrypt(medData[i].comments);
        var dosage = decrypt(medData[i].dosage);
        var dosageType = medData[i].dosagetypeid;
        var fromDate = medData[i].fromdate;
        var toDate = medData[i].todate;
        var medTime = medData[i].medtimeid;
        var mId = medData[i].mid;
        var id = medData[i].id;
        
        //e.preventDefault();
        var fromDate = medData[i].fromdate;
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
        var toDate = medData[i].todate;
        if(toDate.indexOf("-") >= 0){
            toDate = toDate.split("-").join("/");
            toDate = getDisplayDateFormat(toDate);
        }
        var time;
        var timePickerContent = "";
        //alert(medData[i].time2);
        for ( var k = 0; k < parseInt(freq); k++) {
               if(k == 0){
                  time = decrypt(medData[i].time1);
               }else if(k == 1){
                  time = decrypt(medData[i].time2);
               }else if(k == 2){
                  time = decrypt(medData[i].time3);
               }else if(k == 3){
                  time = decrypt(medData[i].time4);
               }else if(k == 4){
                  time = decrypt(medData[i].time5);
               }else if(k == 5){
                  time = decrypt(medData[i].time6);
               }
               //alert(time);
               timePickerContent += "<div><input class = 'mediTime' value='"+time+"' type='text' readonly='readonly'></div>";
            
         }
               
         $("#freqTimePicker").html(timePickerContent);
         $("#freqTimePicker").css("display", "block");
         $('.mediTime').scroller({ 
                                       preset : 'time', 
                                       theme : 'android', 
                                       display : 'modal', 
                                       mode : 'scroller' 
                                       });
         
        $("#medicationToDateEdit").val(toDate);
        $('#medicationToDateEdit').scroller({ 
                                            preset : 'date', 
                                            theme : 'android', 
                                            display : 'modal', 
                                            mode : 'scroller' 
                                            });
        
        $("#medName").val(medName);
        $("#medicationFreqEdit").val(freq);
        $("#medicationNoteEdit").val(description);
        $("#medicationDoseEdit").val(dosage);
        $("#dosageTypeDiv").val(dosageType);
        $("#medicationFromDateEdit").val(fromDate);
        $("#medicationToDateEdit").val(toDate);
        $("#frequencyType").val(medTime);
        $("#frequencyValue").val(freq);
        $("#isMedUpdate").val("1");
        $("#medId").val(id);
        $("#mId").val(mId);
        okFrequency();
   }
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


$("#exeView").live("click", function(){
   window.location.href = "action";
});

$("#vitView").live("click", function(){
   window.location.href = "vitals";
});

$("#apptView").live("click", function(){
   window.location.href = "appointment";
});

$("#medView").live("click", function(){
   window.location.href = "medication";
});

$("#vaccnView").live("click", function(){
   window.location.href = "vaccination";
});

$("#dashBoard").live("click", function(){
   window.location.href = "home";
});

$("#exeAdd").live("click", function(){
   $("#actUpdate").val("0")
   localStorage.setItem("edit", 0);
   localStorage.setItem("editActId", "");
   window.location.href = "addaction";
});

$("#addAppt").live("click", function(){
   localStorage.setItem("edit", 0);
   localStorage.setItem("editApptId", "");
   window.location.href = "addappointment";
});

$("#addMed").live("click", function(){
   localStorage.setItem("edit", 0);
   localStorage.setItem("editMedId", "");
   window.location.href = "addmedication";
});

$("#vitAdd").live("click", function(){
   localStorage.setItem("edit", 0);
   localStorage.setItem("editId", "");
   window.location.href = "addvitals";
});

$("#vaccnAdd").live("click", function(){
   localStorage.setItem("edit", 0);
   localStorage.setItem("editVaccnId", "");
   window.location.href = "addvaccination";
});

$("#request").live("click", function(){
   window.location.href = "request";
});


var patList;

function populatePatientList(patientList){
   var i;
      var contPat = "";
    localStorage.setItem("patientlist", patientList);
    patList = patientList;
    for(i=0;i < patientList.length;i++){
      var id = patientList[i].uid;
      var patientid = patientList[i].patientid;
      var fname = patientList[i].firstname;
      var lname = patientList[i].lastname;
      contPat = contPat + '<p style="font-size:16px;"  id="'+patientid+'" class="openPatDashboard">'+fname+' '+lname+'</p>';
    }
    
    $("#patientList").html(contPat);
}


function populatePatlists(){
   var nameList = $("#contactsListForm").val();
   $("#patientList").html("");
   
    var contPat = "";
    var patientList = patList;
    //alert(JSON.stringify(patientList));
    for(i=0;i < patientList.length;i++){
      var id = patientList[i].uid;
      var patientid = patientList[i].patientid;
      var fname = patientList[i].firstname;
      var lname = patientList[i].lastname;
      var name = fname+' '+lname;
      var checkName = name.toLowerCase();
      //alert(checkName.indexOf(nameList));
      if(checkName.indexOf(nameList) >= 0){
         contPat = contPat + '<p style="font-size:16px;" id="'+patientid+'" class="openPatDashboard">'+name+'</p>';
      }
    }
    
    $("#patientList").html(contPat);
}


$(".openPatDashboard").live("click", function(){
   $("#mainPat").css("display", "block");
   //$("#docDashboard").css("display", "none");
   var patientid = $(this).attr('id');
     openDashboardMed();
    //openDashboardAppt();
      $.post("home/getalldata", { "patientId": patientid, "date": "2013-07-25" },
                        function(data){
                          //alert(data.username); // John
                          var medicationDetailsList = JSON.stringify(data["medication"]);
			  //medicationDetailsList = JSON.stringify(data["medication"]);
			  medicationDetailsList = eval(" (" + medicationDetailsList + ") ");
			  //alert(JSON.stringify(data["Medication"][0].id));
			  var appointmentDetailsList = JSON.stringify(data["appointment"]);
			  appointmentDetailsList = eval(" (" + appointmentDetailsList + ") ");
			  var vitalsList = JSON.stringify(data["vitals"]);
			  vitalsList = eval(" (" + vitalsList + ") ");
			  var vaccinationList = JSON.stringify(data["vaccination"]);
			  vaccinationList = eval(" (" + vaccinationList + ") ");
			    populatemedication(medicationDetailsList);
			    populateAppointment(appointmentDetailsList);
			    populateVitals(appointmentDetailsList);
			    populateVaccination(vaccinationList);
			
                        }, "json");

});




function populateRequest(requestList){
   var i;
      var contPat = "";
    for(i=0;i < requestList.length;i++){
      var id = requestList[i].id;
      var fname = requestList[i].firstname;
      var lname = requestList[i].lastname;
      
      contPat = contPat + '<div id="'+id+'" style="width:90%;margin-left:auto;margin-right:auto;">'+
                           '<p style="font-size:18px;width:60%;" class="fl">Friend request from <b>'+fname+' '+lname+'</b></p>'+
                           '<a class="medicationSaveButton blueButton fl"style="margin-top:10px;" href="javascript:void(0);" onclick="acceptReq('+id+')"> Accept </a>'+
                           '</div>';
    }
    $(".friend_request").html(contPat);
}


function acceptReq(id){
   
      $.post("home/acceptreq", { "id": id },
                        function(data){
                          //alert(data.username); // John
                          $("#"+id).remove();
			
                        }, "json");
}


function openDocDash(){
   window.location.href = "home";
}



function populateDoctorsDiv(doctorsData){
   var i;
      var contPat = "";
    for(i=0;i < doctorsData.length;i++){
      var id = doctorsData[i].uid;
      var fname = doctorsData[i].firstname;
      var lname = doctorsData[i].lastname;
      var speciality = doctorsData[i].spname;
      
      contPat = contPat + '<div id="'+id+'" style="width:90%;margin-left:auto;margin-right:auto;">'+
                           '<p style="font-size:18px;width:60%;" class="fl"> <b>'+fname+' '+lname+'</b><br/>'+speciality+'</p>'+
                           '<a class="medicationSaveButton blueButton fl"style="margin-top:10px;" href="javascript:void(0);" onclick="sendReq('+id+')"> Send Request </a>'+
                           '</div>';
    }
    $("#contentRequest").html(contPat);

}


function sendReq(id){
   $.post("request/sendreq", { "id": id },
                        function(data){
                          //alert(data.username); // John
                          $("#"+id).remove();
			
                        }, "json");
}



$("#shareDoc").live("click", function(){
   var id = $(".imgShare").attr("id");
   var docId = $("#selectDoc").val();
   
   if(docId != "" && docId != null){
      $.post("home/sharedoc", { "id": id, "docId": docId },
                        function(data){
                          //alert(data.username); // John
                          $("#"+id).remove();
			
                        }, "json");
   }else{
      alert("Please select a doctor to share document with");
   }
})





/***********************Delete Goes here******************/


function deleteAction(actId){
   if (confirm(deleteActMsg)) {
      $.post("addaction/actndelete", { "id":actId },
             function(data){
               window.location.href = "action";
			
      }, "json");
   }
}


function deleteMedication(medId) {
   if (confirm(deleteMedMsg)) {
      $.post("addmedication/meddelete", { "id":actId },
             function(data){
               window.location.href = "medication";
			
      }, "json");                     
   }
}



function deleteAppointment(apptId) {
   if (confirm(deleteApptMsg)) {
      $.post("addappointment/apptdelete", { "id":apptId },
             function(data){
               window.location.href = "appointment";
			
      }, "json");                      
   }
}



function deleteVaccination(vaccnId) {deletedata
   if (confirm(deleteVaccnMsg)) {
      if (confirm(deleteApptMsg)) {
      $.post("addappointment/apptdelete", { "id":apptId },
             function(data){
               window.location.href = "vaccination";
			
      }, "json");                      
   }                   
   }
}


function deleteVitals(vitId){
      if (confirm(deleteVitMsg)) {
                        
      }
}