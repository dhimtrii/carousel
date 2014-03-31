//var urlAddress = "http://54.213.19.88/myhealthanalytics/";
var urlAddress = "http://54.213.19.88/myhealthanalytics";
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
      $.post("home/getalldata", { "patientId": localStorage.getItem("patientid"), "date": "2013-07-25" },
                        function(data){
                          var medicationDetailsList = JSON.stringify(data["Medication"]);
			  medicationDetailsList = eval(" (" + medicationDetailsList + ") ");
			    populatemedication(medicationDetailsList);
			
                        }, "json");
   });
   
   
   $("#apptView").live("click", function(){
    openPatientAppt();
    //openDashboardAppt();
     $.post("home/getalldata", { "patientId": localStorage.getItem("patientid"), "date": "2013-07-25" },
                        function(data){
			  var appointmentDetailsList = JSON.stringify(data["Appointment"]);
			  appointmentDetailsList = eval(" (" + appointmentDetailsList + ") ");
			    populateAppointment(appointmentDetailsList);
			
                        }, "json");
   });
   
   
   $("#uploadView").live("click", function(){
      window.location.href = "upload";
                        
     
   });
   /*$("#document").live("click", function(){
      window.location.href = "viewfile";
      $.post("viewFile/files", { "patientId": 5 },
                        function(data){
			  var filesList = JSON.stringify(data["files"]);
                          alert(filesList);
                          window.location.href = "viewFile";
			  filesList = eval(" (" + filesList + ") ");
                                       setTimeout(function() {
                                     populateFilesList(filesList)
                                     }, 500);
			
                        }, "json");                
     
   });*/ 

   
    
});



function showPatDoc(){
   $(".backToFolder").css("display", "none");
   var patDocId = $("#selectPatDoc").val();
   $.post("viewfile/fileswithdate", { "userid": localStorage.getItem("userid"), "sharedid": patDocId },
                        function(data){
			  var filesList = JSON.stringify(data["filesDate"]);
                          
			  filesList = eval(" (" + filesList + ") ");
			  localStorage.setItem("homePage", 0);
                                       setTimeout(function() {
                                     populateFilesDate(filesList);
                                     }, 500);
			
                        }, "json");
}


$(".folderDate").live("click", function(){
   $(".backToFolder").css("display", "block");
   var date = $(this).attr("id");
   var patDocId = $("#selectPatDoc").val();
   $.post("viewfile/files", { "userid": localStorage.getItem("userid"), "sharedid": patDocId, "date":date },
                        function(data){
			  var filesList = JSON.stringify(data["files"]);
                          
			  filesList = eval(" (" + filesList + ") ");
			  localStorage.setItem("homePage", 0);
                                       setTimeout(function() {
                                     populateFilesList(filesList, patDocId)
                                     }, 500);
			
                        }, "json");
});




function populateFilesDate(filesList){
   //alert(JSON.stringify(filesList));
   var i;
    var content = "";
      content = content + '<div class="CSS_Table_Example" style="width:99.5%;height:auto;margin-top:10px;word-wrap:break-word;">';
       for(i=0;i < filesList.length;i++){
          
         content = content + '<div style="width:150px;float:left;margin-left:50px;margin-top:20px;" class="folderDate" id="'+filesList[i].uploaddate+'"><div class="folderDiv"></div><div style="width:100%;text-align:center;font-weight: bold;">'+filesList[i].uploaddate+'</div></div>';
             
              
       }
       
    content = content + '</div>';
    
    $("#files").html(content);
    
   
}



function populateFilesList(filesList, docId){
   var i;
    var content = "";
      content = content + '<div class="CSS_Table_Example" style="width:99.5%;height:auto;margin-top:10px;"><table width="100%"><tbody id="appointmentTable" class="font16" style="border-bottom:1px solid;">';
      if(localStorage.getItem("homePage") == 0){
       content = content + '<tr><td>Document Name</td><td>Uploaded Date</td><td>Type</td><td>Shared</td>';
      }else{
         content = content + '<tr><td>Document Name</td><td>Uploaded Date</td><td>Type</td>';
      }
       for(i=0;i < filesList.length;i++){
         if(localStorage.getItem("homePage") == 0){
            if(docId == filesList[i].shareduid){
               content = content + '<tr><td><span  class="openModal imageShare" id="'+filesList[i].filename+'" style="cursor:pointer;width:400px;font-weight:bold;font-size:16px;">'+filesList[i].title+'</span></td><td>'+filesList[i].uploaddate+'</td><td>'+filesList[i].type+'</td><td><input type="checkbox" class="shareCheckbox fr" style="width:30px !important;margin-right: 40%;" id="'+filesList[i].id+'" checked/></td></tr>';
            }else{
               content = content + '<tr><td><span  class="openModal imageShare" id="'+filesList[i].filename+'" style="cursor:pointer;width:400px;font-weight:bold;font-size:16px;">'+filesList[i].title+'</span></td><td>'+filesList[i].uploaddate+'</td><td>'+filesList[i].type+'</td><td style><input type="checkbox" class="shareCheckbox fr" style="width:30px !important;margin-right: 40%;" id="'+filesList[i].id+'" /></td></tr>';
            }
         }else{   
            content = content + '<tr><td><span  class="openModal imageShare" id="'+filesList[i].filename+'" style="cursor:pointer;width:400px;font-weight:bold;font-size:16px;">'+filesList[i].title+'</span></td><td>'+filesList[i].uploaddate+'</td><td>'+filesList[i].type+'</td></tr>';
         }     
              
       }
       content = content + '</tbody></table></div>';
    
    
    $("#files").html(content);
    
   
}


function populateDocFilesList(filesList){
   
   var i;
      var content = "";
      if(filesList != false){
         content = content + '<div class="CSS_Table_Example" style="width:99.5%;height:auto;margin-top:10px;"><table width="100%"><tbody id="appointmentTable" class="font16" style="border-bottom:1px solid;">';
         content = content + '<tr><td>Document Name</td><td>Uploaded Date</td><td>Type</td>';
         
          for(i=0;i < filesList.length;i++){
            content = content + '<tr><td><span  class="openModal imageShare" id="'+filesList[i].filename+'" style="cursor:pointer;width:400px;font-weight:bold;font-size:16px;">'+filesList[i].title+'</span></td><td>'+filesList[i].uploaddate+'</td><td>'+filesList[i].type+'</td></tr>';
                 
                 
          }
          content = content + '</tbody></table></div>';
      }else{
         contentFile = contentFile + '<p style="font-size:18px;width:100%;" class="fl"><b>There are no files shared.</b></p>';
      }
      
    
    $("#patientSharedInfo").html(content);
    
}


$(".openModal").live("click", function(){
   $('body').append('<div class="mask" id="addMedMask"></div>');
   $("#addMedMask").fadeIn(300);
   $('#addMedMask').css("zIndex", 99999999);
   $('#addMedMask').css("opacity", 0.8);
   $('#galleryDiv').css("display", "block");
   var fName = $(this).attr('id');
   var ind = fName.indexOf(".");
   var ext = fName.substr((ind + 1));
       
   /*if(ext == "pdf"){
      $("#image").html('<object data="https://s3.amazonaws.com/bucketdhiman1234/'+fName+'" type="application/pdf" width="100%" height="100%"><p>Alternative text - include a link <a href="myfile.pdf">to the PDF!</a></p></object>');
   }else if(ext == "doc"){
      $("#image").html('<img class="imgShare" id="id" style="width:100%;height:100%;" src="https://s3.amazonaws.com/bucketdhiman1234/'+fName+'" alt="files"/>');
   }*/
   
   /*if(ext == "jpg" || ext == "png" || ext == "gif"){
      $("#image").html('<object data="https://127.0.0.1/files/'+fName+'" type="application/pdf" width="100%" height="100%"><p>Alternative text - include a link <a href="myfile.pdf">to the PDF!</a></p></object>');
   }else if(ext == "pdf"){
      $("#image").html('<object data="https://s3.amazonaws.com/bucketdhiman1234/'+fName+'" type="application/pdf" width="100%" height="100%"><p>Alternative text - include a link <a href="myfile.pdf">to the PDF!</a></p></object>');
   }else if(ext == "doc"){
      $("#image").html('<img class="imgShare" id="id" style="width:100%;height:100%;" src="https://s3.amazonaws.com/bucketdhiman1234/'+fName+'" alt="files"/>');
   }*/
   //$("#image").html('<object data="http://54.213.19.88/myhealthanalytics/files/'+fName+'"  width="100%" height="100%"><p>Alternative link <a href="myfile.pdf">to the '+ext+'!</a></p></object>');
        
   $("#image").html('<object data="https://s3.amazonaws.com/bucketdhiman1234/'+fName+'" type="application/pdf" width="100%" height="100%"><p>Alternative text - include a link <a href="myfile.pdf">to the PDF!</a></p></object>');
        
         
      
        
});


$("#closeGallery").live("click", function(){
   $('#addMedMask').fadeOut();
        $('#addMedMask').remove();
        $('#galleryDiv').css("display", "none");
});


$("#logout").live("click", function(){
   window.location.href = "../";
});



function populatePatientDoctor(doctorList){
   var options;
        var i;
        for(i=0;i < doctorList.length;i++){
            options = options + '<option value="'+doctorList[i].uid+'">'+doctorList[i].firstname+' '+doctorList[i].lastname+'</option>';
         }
         $(".selectPatDoc").html(options);
         
         showPatDoc();
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
            contentBefore = contentBefore+'<div id="'+i+'_div" class="fl prevMed"><div class="answerMedPrev"><span class="fl font14" style="margin-left:2%;margin-top:5px;font-size: 18px;">'+idTime+'</span><div id="wrongAnsPrev" class="fr wrongAns" onclick="saveMissedDetails('+i+','+false+', 0)"><img class="fr iconClose" src="../../images/icon_redcross.png" width="20px" height="20px"></div><div id="correctAns" class="fr correctAns" onclick="saveMissedDetails('+i+','+true+', 0)"><img class="fr iconClose" src="../../images/icon_right.png" width="20px" height="20px"></div></div><div id="'+i+'_text" class="fl" style="width:100%;height:auto;display:inline-block;"></div></div>';
        }else if(i == currTime){
            contentAtTime = contentAtTime+'<div id="'+i+'_div" class="fl fullMedActnDiv currMedActn"><div class="answerMed"><span class="fl font14" style="margin-left:2%;margin-top:5px;font-size: 18px;">'+idTime+'</span><div id="wrongAns" class="fr wrongAns" onclick="saveMissedDetails('+i+','+false+', 0)"><img class="fr iconClose" src="../../images/icon_redcross.png" width="20px" height="20px"></div><div id="correctAns" class="fr correctAns" onclick="saveMissedDetails('+i+','+true+', 0)"><img class="fr iconClose" src="../../images/icon_right.png" width="20px" height="20px"></div></div><div id="'+i+'_text" class="fl" style="width:100%;height:auto;display:inline-block;"></div></div>';
        }else{
            contentAfter = contentAfter+'<div id="'+i+'_div" class="fl fullMedActnDiv"><div class="answerMedNext"><span class="fl font14" style="margin-left:2%;margin-top:5px;font-size: 18px;">'+idTime+'</span><div id="wrongAnsNext" class="fr wrongAns none" onclick="showRefillRequest()"><img class="fr iconClose" src="../../images/pill_bottle.png" width="17px" height="20px"></div></div><div id="'+i+'_text" class="fl medDivs" style="width:100%;height:auto;display:inline-block;"></div></div>';
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
             var isencrypted = medData[i].isencrypted;
            localStorage.setItem("isDecrypt", isencrypted);
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
                 
                 var disTime = time;
                 
                 var dateTime = myDate + ' ' + time;
                 
                 var missedTime = dateTime;
                 dateTime = new Date(dateTime);
                 var medHour = dateTime.getHours();
                 
                 if (time != null && time != "") {
                     var contentImg = "";
                     var contentMed = "";
                     //var medImage = medData[i].medpicture;
                     var medImage = "capsule.png";
                     var isMissed = medData[i].ismissed;
                     var desc = decrypt(medData[i].comments);
                     
                     medCnt = medCnt + 1;
                     var missedCurrHour = "";
                     var missedCurrDate = "";
                     
                     var medName = "";
                     var nowDate = new Date();
                     //alert(getDateMonth(dateTime)+"=="+getDateMonth(nowDate));
                         
                     
                     $("#"+medHour+"_div").css("display","block");
                     if(localStorage.getItem("isPatHome") == 1){
                        //contentMed = contentMed+'<div id="'+medHour+'_list"  class="'+medHour+'_list" style="width:80%;float:left;height:30px;border-bottom: 1px solid #777777;border-top: 1px solid #F5F5F5;padding-top:3px;padding-bottom:20px;padding-left:20%;font-size:16px;">Medication <b>'+decrypt(medData[i].name)+'</b> at '+disTime+'</div>';
                        contentMed = contentMed+'<div id="'+medHour+'_list"  class="'+medHour+'_list" style="width:100%;float:left;height:30px;border-bottom: 1px solid #E8E8E8;border-top: 1px solid #F5F5F5;padding-top:3px;padding-bottom:15px;"><div class="fl" style="width:15%;"><img src="http://54.213.19.88/myhealthanalytics/images/capsule.png" ></div><div class="fl" style="width:70%;padding-left:8%;height: 100%;padding-top: 10px;"><div class="medName" style="font-size:18px;margin-top:15px;" data-pancakes="' + id + '_'+medHour+'">Medication <b>'+decrypt(medData[i].name)+'</b> at '+disTime+'</span></div></div>';//<div class="fr" style="width:30%;"><img onclick="deleteMedication('+id+')" src="../images/deleteIcon.png" class="fr icons" /><img onclick="editMedication('+id+')" src="../images/editIcon.png" class="fr icons" /></div></div><div class="none '+medHour+'_res" id="'+id+'">'+missedTime+'#'+medData[i].name+'</div><div class="none medtime">'+id+'_'+time+'#'+medHour+'</div></div>';
                     }else{
                        contentMed = contentMed+'<div id="'+medHour+'_list"  class="'+medHour+'_list" style="width:65%;float:left;height:30px;border-bottom: 1px solid #E8E8E8;border-top: 1px solid #F5F5F5;padding-top:3px;padding-bottom:15px;"><div class="fl" style="width:15%;"><img src="http://54.213.19.88/myhealthanalytics/images/capsule.png" ></div><div class="fl" style="width:70%;padding-left:5%;height: 100%;padding-top: 10px;"><span class="medName" style="font-size:18px;margin-top:15px;width:400px;" data-pancakes="' + id + '_'+medHour+'">';
                        contentMed = contentMed + '<form style="width:200px; float:left;" name="frmsearchBrand" id="frmsearchBrand" target="iframe" method="post" action="http://www.medguideindia.com/search_brand.php">'+
                                                   '<input id="search_brandHID" type="hidden" value="Glace" name="search_brandHID"/>'+
                                                   ' <div style="float:left; width:200px;">Medication <b><span style="cursor:pointer;" id="Submit" onclick="chk_brand()">'+decrypt(medData[i].name)+'</span></b></div>'+
                                               '</form>';
                        contentMed = contentMed + '<div style="float;left;"> at '+disTime+'</div></div></div><div class="fr" style="width:30%;"><img onclick="deleteMedication('+id+')" src="../images/deleteIcon.png" class="fr icons" /><img onclick="editMedication('+id+')" src="../images/editIcon.png" class="fr icons" /></div></div><div class="none '+medHour+'_res" id="'+id+'">'+missedTime+'#'+medData[i].name+'</div><div class="none medtime">'+id+'_'+time+'#'+medHour+'</div></div>';
                        contentMed = contentMed+'<div id="'+medHour+'_desc"  class="'+medHour+'_list" style="width:80%;float:left;height:30px;border-bottom: 1px solid #777;border-top: 1px solid #F5F5F5;padding-top:3px;padding-bottom:15px;padding-left:20%;font-size:16px;">'+desc+'</div>';
                     }
                        //contentMed = contentMed+'<div id="'+medHour+'_list"  class="'+medHour+'_list" style="width:100%;float:left;height:30px;border-bottom: 1px solid #E8E8E8;border-top: 1px solid #F5F5F5;padding-top:3px;padding-bottom:15px;"><div class="fl" style="width:15%;"><img src="http://127.0.0.1/xampp/sitess/myhealthanalytics/images/capsule.png" ></div><div class="fl" style="width:40%;padding-left:8%;height: 100%;padding-top: 10px;"><span class="medName" style="font-size:18px;margin-top:15px;" data-pancakes="' + id + '_'+medHour+'">' + decrypt(medData[i].name) +'</span></div><div class="fr" style="width:30%;"><img onclick="deleteMedication('+id+')" src="../images/deleteIcon.png" class="fr icons" /><img onclick="editMedication('+id+')" src="../images/editIcon.png" class="fr icons" /></div></div><div class="none '+medHour+'_res" id="'+id+'">'+missedTime+'#'+medData[i].name+'</div><div class="none medtime">'+id+'_'+time+'#'+medHour+'</div></div>';
                        //contentMed = contentMed+'<div id="'+medHour+'_desc"  class="'+medHour+'_list" style="width:80%;float:left;height:30px;border-bottom: 1px solid #777;border-top: 1px solid #F5F5F5;padding-top:3px;padding-bottom:15px;padding-left:20%;font-size:16px;">'+desc+'</div>';
                     
                     $("#"+medHour+"_text").append(contentMed);
                      //alert(contentMed);
                     
                 }
               }
        // }
      }
   }
}

function chk_brand(){
   showAddDivMask();
   document.getElementById("dialogMedContent").style.display="block";
   document.getElementById("frame").style.display="block";
   //window.location.href = "http://www.medguideindia.com/search_brand.php";
   document.getElementById('frame').src = "http://www.medguideindia.com/search_brand.php";
}


function populateAppointment(apptData, dates){
    $("#apptContent").html("");
    var content = "";
    var tdDate = todayDate.getFullYear()+"-"+todayDate.getMonth()+"-"+todayDate.getDate();
   if(apptData == false){
      content = content+'<div id="" class="fl fullMedActnDiv" style="display:block !important;text-align:center;">There are no Appointment at this time</div>';
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
                 if(localStorage.getItem("isPatHome") == 1){
                        content = content + '<tr style="border-bottom: 1px solid #EFEFEF !important;"><td><div class="apptListDiv"><div id="" style="width:10%;"><span id="timeImage"><img src="../../images/bluedot.png" alt="" class="footerButtonImage fl"></span></div></span>Appointment with <b>Dr.'+docName+'</b> at <b>'+apptTime+'</b></span></div></div>';//<div class="fr" style="width:10%;padding-top: 5px;"><img onclick="deleteAppointment('+apptId+')" src="../images/deleteIcon.png" class="fr icons" /><img onclick="editAppointment('+apptId+')" src="../images/editIcon.png" class="fr icons" /></div></div></a></td></tr>';
                  }else{
                        content = content + '<tr style="border-bottom: 1px solid #EFEFEF !important;"><td><div class="apptListDiv"><div id="appointmentTime"><span id="timeImage"><img src="../../images/bluedot.png" alt="" class="footerButtonImage fl"></span><span id="time" class="fl apptDate">' + monthName + '</span><div class="startTimeAppt startTimeApptList fl">' + apptTime + '</div></div><div id="appointmentData" class ="fl" style="padding-top:10px;"><span id="doctorName" class="fl"><a data-pancakes="' + apptId + '" href="#" style="text-decoration:none;color:#000;">Dr. ' + docName + '</a></span><br><span id="therapy">' + apptData[i].spname + '</span></div><div class="fr" style="width:10%;padding-top: 5px;"><img onclick="deleteAppointment('+apptId+')" src="../images/deleteIcon.png" class="fr icons" /><img onclick="editAppointment('+apptId+')" src="../images/editIcon.png" class="fr icons" /></div></div></a></td></tr>';
                  }
                 //content = content + '<tr style="border-bottom: 1px solid #EFEFEF !important;"><td><div class="apptListDiv"><div id="appointmentTime"><span id="timeImage"><img src="../../images/bluedot.png" alt="" class="footerButtonImage fl"></span><span id="time" class="fl apptDate">' + monthName + '</span><div class="startTimeAppt startTimeApptList fl">' + apptTime + '</div></div><div id="appointmentData" class ="fl" style="padding-top:10px;"><span id="doctorName" class="fl"><a data-pancakes="' + apptId + '" href="#" style="text-decoration:none;color:#000;">Dr. ' + docName + '</a></span><br><span id="therapy">' + apptData[i].spname + '</span></div><div class="fr" style="width:10%;padding-top: 5px;"><img onclick="deleteAppointment('+apptId+')" src="../images/deleteIcon.png" class="fr icons" /><img onclick="editAppointment('+apptId+')" src="../images/editIcon.png" class="fr icons" /></div></div></a></td></tr>';
                 
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
   var i;
   for(i=0;i < profileInfo.length;i++){
      $("#fName").val(profileInfo[i].firstname);
      $("#lName").val(profileInfo[i].lastname);
      $("#gender").val(profileInfo[i].gender);
      $("#username").val(profileInfo[i].username);
      $("#password1").val(profileInfo[i].password);
      $("#password2").val(profileInfo[i].password);
      $("#dob").val(profileInfo[i].dateofbirth);
      $("#email").val(profileInfo[i].email);
      $("#address1").val(profileInfo[i].address1);
      $("#address2").val(profileInfo[i].address2);
      $("#city").val(profileInfo[i].city);
      $("#stateid").val(profileInfo[i].sid);
      $("#state").val(profileInfo[i].statename);
      $("#country").val(profileInfo[i].code);
      $("#telephone").val(profileInfo[i].phone);
      $("#userid").val(profileInfo[i].uid);
   }
}

var password;
$("#changePassword").live("click", function(){
   if($(this).text() == "Click here to change password"){
      password = $("#password2").val();
      $(".passBox").css("display", "block");
      $(this).text("Cancel changing password");
      $(".passBox").val("");
      
   }else{
      $("#password1").val(password);
      $("#password2").val(password);
      $(this).text("Click here to change password");
      $(".passBox").css("display", "none");
   }
});


$("#updateProfile").live("click", function(){
      Fielderror = 0;
      var firstname = $("#fName").val();
      var lastname = $("#lName").val();
      var gender = $("#gender").val();
      var username = $("#username").val();
      var password1 = $("#password1").val();
      var password2 = $("#password2").val();
      var dateofbirth = $("#dob").val();
      var email = $("#email").val();
      var address1 = $("#address1").val();
      var address2 = $("#address2").val();
      var city = $("#city").val();
      var statename = $("#state").val();
      var stateid = $("#stateid").val();
      var country = $("#country").val();
      var phone = $("#telephone").val();
      var userid = $("#userid").val();
      var emailValidate = emailValidation(email);
      //alert(Fielderror);
      if(Fielderror == 0){
         
         if(emailValidate == 1){
            $("#email").css("border", "1px solid black");
            
            if(password1 == password2){
               
               $.post("profile/updateprofile", { "userid": localStorage.getItem("patientid"), "firstname": firstname, "lastname": lastname,  "gender": gender, "username": username, "password": password2, "dateofbirth": dateofbirth, "email": email, "address1": address1, "address2": address2, "city": city, "stateid": stateid, "statename": statename, "country": country, "phone": phone},
                                 function(data){
                                   alert("Your profile has been saved successfully");
                                 window.location.href = "profile";
                                 }, "json");
            }else{
               $("#password1").css("border", "2px solid red");
               $("#password2").css("border", "2px solid red");
            }
         }else{
            $("#email").css("border", "2px solid red");
         }
      }
});




function populateVaccination(vaccinationlist, date){
   $("#apptContent").html("");
   var content = "";
   var tdDate = todayDate.getFullYear()+"-"+todayDate.getMonth()+"-"+todayDate.getDate();
   if(vaccinationlist == false){
      content = content+'<div id="" class="fl fullMedActnDiv font16" style="display:block !important;text-align:center;margin-top:200px;padding-top:30px;">There are no vaccination at this allocated</div>';
   }else{
      //if(date == tdDate){
         
       
       content = content + '<div class="CSS_Table_Example" style="width:99.5%;height:auto;margin-top:10px;"><table width="100%"><tbody id="appointmentTable" class="font16" style="border-bottom:1px solid;">';
       content = content + '<tr><td>Vaccination Name</td><td>Scheduled Date</td><td>Date Taken</td><td>Action</td>';
       for(i=0;i < vaccinationlist.length;i++){
            var apptId = vaccinationlist[i].id;
            var isencrypted = vaccinationlist[i].isencrypted;
            localStorage.setItem("isDecrypt", isencrypted);
            var dateTaken = vaccinationlist[i].datetaken;
            if(dateTaken != null){
               content = content + '<tr><td>'+decrypt(vaccinationlist[i].vaccnName)+'</td><td>'+vaccinationlist[i].scheduledDate+'</td><td>'+dateTaken+'</td><td><img onclick="deleteVaccination('+apptId+')" src="../images/deleteIcon.png" class="fr icons" /></td>';
            }else{
               dateTaken = "NA";
               content = content + '<tr><td>'+decrypt(vaccinationlist[i].vaccnName)+'</td><td>'+vaccinationlist[i].scheduledDate+'</td><td>'+dateTaken+'</td><td><img onclick="deleteVaccination('+apptId+')" src="../images/deleteIcon.png" class="fr icons" /><img onclick="editVaccination('+apptId+', \''+decrypt(vaccinationlist[i].vaccnName)+'\', \''+vaccinationlist[i].scheduledDate+'\')" src="../images/editIcon.png" class="fr icons" /></td>';
            }
               
               
               
              
       }
       content = content + '</tbody></table></div>';
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
    
            
    $("#contentVaccn").html(content);
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
                  $('#datepicker').datepicker('setDate', getDateFormat);
               openDashboardMed();
                $.post("medication/view", { "patientId": localStorage.getItem("patientid"), "date": getDateFormat },
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
               $("#actionDateContent").html("" + monthName + " " + dayCur + "");
               var getDateFormat = yearCur+"-"+monthCur+"-"+dayCur;
               $('#datepicker').datepicker('setDate', getDateFormat);
	       openDashboardMed();
                $.post("action/viewaction", { "patientId": localStorage.getItem("patientid"), "date": getDateFormat },
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
               $('#datepicker').datepicker('setDate', getDateFormat);
               $("#hexagonAppt").html("" + monthName + " " + dayCur + "");
               $.post("appointment/view", { "patientId": localStorage.getItem("patientid"), "date": getDateFormat },
                        function(data){
			  var appointmentDetailsList = JSON.stringify(data["appointment"]);
			  appointmentDetailsList = eval(" (" + appointmentDetailsList + ") ");
                          //alert(JSON.stringify(appointmentDetailsList));
			    populateAppointment(appointmentDetailsList);
			
                        }, "json");
}


function getVital(date){
   selDate = date;
   var dformat = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ].join('/') + ' ' + [ date.getHours(), date.getMinutes(), date.getSeconds() ].join(':');
               var i = dformat.slice(0, 10).split('/');
               var monthCur = date.getMonth() + 1;
               var dayCur = date.getDate();
               var crrHour = date.getHours();
               var monthName = shortMonthNames[monthCur - 1];
               var yearCur = date.getFullYear();
               var getDateFormat = yearCur+"-"+monthCur+"-"+dayCur;
               $('#datepicker').datepicker('setDate', getDateFormat);
               $("#VitDate").html("" + monthName + " " + dayCur + "");
                $.post("vitals/viewvital", { "patientId": localStorage.getItem("patientid"), date: getDateFormat},
                        function(data){
                          var vitalData = JSON.stringify(data["vital"]);
			  vitalData = eval(" (" + vitalData + ") ");
			    populateVital(vitalData);
			
                        }, "json");
}


function prevDate(type){
    
    var prevDate = selDate;
    prevDate = getPrevDate(prevDate);
    selDate = prevDate;
    var disDate = getDisplayDateMonth(selDate);
    if(type == 'action'){
        //$("#actionDateContent").html(disDate);
        medActnTable("medicines", "Actn", "");
        setTimeout(function() {
                   getActData(selDate);
                   }, 200)
    }else if(type == 'medication'){
        medActnTable("medicines", "Med", "");
        
        //$("#medicationDateContent").html(disDate);
        setTimeout(function() {
                   getMedData(selDate);
                   }, 200);
    }else if(type == 'vital'){
        //$("#VitDate").html(disDate);
        setTimeout(function() {
                   getVital(selDate);
                   }, 200);
    }else{
       // $("#medicationDateContent").html(disDate);
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
       // $("#actionDateContent").html(disDate);
        medActnTable("medicines", "Actn", "");
        setTimeout(function() {
                   getActData(selDate);
                   }, 200)
    }else if(type == 'medication'){
        medActnTable("medicines", "Med", "");
        
        //$("#medicationDateContent").html(disDate);
        setTimeout(function() {
                   getMedData(selDate);
                   }, 200);
    }else if(type == 'vital'){
        //$("#VitDate").html(disDate);
        setTimeout(function() {
                   getVital(selDate);
                   }, 200);
    }else{
        //$("#medicationDateContent").html(disDate);
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
    
    var doseType = '<select id="medicationDosageTypeSelect">'+
    '<option value="1">tea Spoon</option>'+
    '<option value="2">Tabs</option>'+
    '<option value="3">Caps</option>'+
    '<option value="4">Pills</option></select>';
    $("#dosageTypeDiv").html(doseType);
    //$("#medicationDosageTypeSelect").html(options);
    
    
    
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
               FieldError = 0;
               isNumbercheck = 0;
               
               var isEncrypt = parseInt(localStorage.getItem("encAppt"));
               
               localStorage.setItem("isEncrypt", isEncrypt);
               
               var isUpdate = $("#isMedUpdate").val();
               var id = $("#medId").val();
               var medId = $("#mId").val();
               var mname = encrypt($("#medName").val());
               //alert(mname);
               var fromDate = $("#medicationFromDateEdit").val();
               var dosage = encrypt($("#medicationDoseEdit").val());
               var dosageTypeId = $("#medicationDosageTypeSelect").val();
               var freq = encrypt($("#medicationFreqEdit").val());
               validation();
               
               if (FieldError == 0) {
                  $("#inputErrorMsg").html("");
                  isValidNumeric();
                  if(isNumbercheck == 0){
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
                  
                     
                     
                     medicationTimes = new Array();
                     $(".exeTime").each(function(){
                        var time = $(this).val();
                        medicationTimes.push(time);
                     });
                  
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
                     medJson = { "id":id, "mid" : medId, "mname" : mname, "comments" : comment, "dosage" : dosage, "dosageTypeid" : dosageTypeId , "frequency" : freq, "medtimeid" : medTimeId, "time1" : time1, "time2" : time2, "time3" : time3, "time4" : time4, "time5" : time5, "time6" : time6, "fromDate" : fromDate, "toDate" : toDate, patientId : localStorage.getItem("patientid"), "isSunday" : medTimeDaySelected.isSunday, "isMonday" : medTimeDaySelected.isMonday, "isTuesday" : medTimeDaySelected.isTuesday, "isWednesday" : medTimeDaySelected.isWednesday, "isThursday" : medTimeDaySelected.isThursday, "isFriday" : medTimeDaySelected.isFriday, "isSaturday" : medTimeDaySelected.isSaturday, "isEncrypt":isEncrypt };
                     //alert(JSON.stringify(medJson));
                        $.post("addmedication/mededit", medJson,
                              function(data){
                                
                                window.location.href = "medication";
                              }, "json");
                     
                      
                     } else {
                     medJson = { "mname" : mname,  "comments" : comment, "dosage" : dosage, "dosageTypeid" : dosageTypeId , "frequency" : freq, "medtimeid" : medTimeId, "time1" : time1, "time2" : time2, "time3" : time3, "time4" : time4, "time5" : time5, "time6" : time6, "fromDate" : fromDate, "toDate" : toDate, patientId : localStorage.getItem("patientid"), "isSunday" : medTimeDaySelected.isSunday, "isMonday" : medTimeDaySelected.isMonday, "isTuesday" : medTimeDaySelected.isTuesday, "isWednesday" : medTimeDaySelected.isWednesday, "isThursday" : medTimeDaySelected.isThursday, "isFriday" : medTimeDaySelected.isFriday, "isSaturday" : medTimeDaySelected.isSaturday, "isEncrypt":isEncrypt };
                        $.post("addmedication/medsave", medJson,
                              function(data){
                                
                                window.location.href = "medication";
                              }, "json");
                     }
                  //alert(JSON.stringify(medJson));
                  }
               }
         });

/*$(document).on("click", "#medicationFreqEdit", function() {
    
   if ($("#patientMedicationId").val() != "") {
      
      $("#frequencyValue").val($("#medicationFreqEdit").val());
      var selectedMedTime = $("#medicationTimeId").val().split(hashObj);
      $("#frequencyTypeSelect").val(selectedMedTime);
               
      if (selectedMedTime.indexOf("0") == -1 && selectedMedTime.indexOf("1") == -1) {
         $("#freqDayKeyboard").css("display", "block");
      } else {
         $("#freqDayKeyboard").css("display", "none");
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
});*/

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
      if ($("#medicationFreqEdit").val().length < 2) {
         $("#medicationFreqEdit").val($(this).html().trim());
      }
   }
   var selectedTimeids = $("#frequencyTypeSelect").val();
   
         var frequncyCount = $(this).html();
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
    
    
    
    if (errorMsg == "") {
        return true;
    } else {
        alert(errorMsg);
        return false;
    }
}

function okFrequency(){
   
   if (isValideFrequency()) {
      var selectedTimeids = new Array();
      var cntMed = parseInt($("#frequencyValue").val());
      
      for(var o=0;o<cntMed; o++){
         var time = $("")
      }
      $(".mediTime").each(function(){
         var time = $(this).val();
         selectedTimeids.push(time);
      });
      selectedTimeids = selectedTimeids.join("#");
       
       $("#medicationFreqEdit").val(selectedTimeids.length);
               
      return selectedTimeids;
   }
}


/*******************Add Medication****************************/






/*******************Add Action****************************/


/********************Add/Edit/Delete Action Starts Here**********************/


function addAction() {
   $("#exerciseDesc").val("");
   $(".exeTime").remove();
    $('.actionDate').scroller({ 
                              preset : 'date', 
                              theme : 'android', 
                              display : 'modal', 
                              mode : 'scroller' 
                              });
    
    $('#activityTime').scroller({ preset : 'time', theme : 'android', display : 'modal', mode : 'scroller' });
    
    var currDate = getCurrentDate(new Date());
   
    //$("#addEditActionForm .actionDate").val(currDate);
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
var actionName = "";
var actionDesc = "";
var actionDate = "";
var actionType = "";
var actionName = "";
var actionDesc = "";
var actionDuration = "";
var actionSubType = "";
var actionFromDate = "";
var actionToDate = "";
var actionFreq = "";
var exerciseTimeArray;
$(document).on("click", "#okActionOp", function() {
   FieldError = 0;
    isNumbercheck = 0;
    var isEncrypt = parseInt(localStorage.getItem("encExe"));
               
    
               
    localStorage.setItem("isEncrypt", isEncrypt);
    
    $(".required").css("border", "1px solid black");
    
    var isUpdate = $("#actUpdate").val();
    //alert(isUpdate);
    var id = $("#actId").val();;
    var actId = $("#patientActionId").val();
    
    validation();
               
    if(FieldError == 0){
      isValidNumeric();
      if(isNumbercheck == 0){
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
                addActionJson = { "id" : id, patientId : localStorage.getItem("patientid"), "type" : actionType, "exerciseId" : actionName, "description" : actionDesc, "duration" : actionDuration, "exType" : actionSubType, "fromDate" : actionFromDate, "toDate" : actionToDate, "frequency" : actionFreq, "time1" : exerciseTimeArray[0], "time2" : exerciseTimeArray[1], "time3" : exerciseTimeArray[2], "time4" : exerciseTimeArray[3], "time5" : exerciseTimeArray[4], "isEncrypt":isEncrypt };
                $.post("addaction/editaction", addActionJson,
                            function(data){
                              
                              window.location.href = "action";
                            }, "json");
            } else {
             
                addActionJson = { patientId : localStorage.getItem("patientid"), "type" : actionType, "exerciseId" : actionName, "description" : actionDesc, "duration" : actionDuration, "exType" : actionSubType, "fromDate" : actionFromDate, "toDate" : actionToDate, "frequency" : actionFreq, "time1" : exerciseTimeArray[0], "time2" : exerciseTimeArray[1], "time3" : exerciseTimeArray[2], "time4" : exerciseTimeArray[3], "time5" : exerciseTimeArray[4], "isEncrypt":isEncrypt };
                $.post("addaction/saveaction", addActionJson,
                            function(data){
                              
                              window.location.href = "action";
                            }, "json");
                   
            }
   
               
        }
    }
});

$(document).on("change", ".frequencyPicker", function() {
    $("#exerciseTime").html("");
    var freqVal = $(this).val();
    if (intRegex.test(freqVal)) {
        freqVal = freqVal <= 5 ? freqVal : 5;
        var timePicker = "";
        for ( var i = 0; i < freqVal; i++) {
            timePicker += "<div><img src='../../images/icon_walk.png'/><input class = 'exeTime required' type='text' value=''  style='margin-left:20%;width:30%;' readonly='readonly' placeholder='Time'></div>";
        }
        $("#exerciseTime").html(timePicker);
        $('.exeTime').scroller({ preset : 'time', theme : 'android', display : 'modal', mode : 'scroller' });
    }
    $('.column').equalHeight();
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


function validationVaccn(){
   $(".requiredVaccn").each(function() {
      
      if ($(this).css("display") != "none") {
         var value = $(this).val();
         
         if(value == "") {
            $(this).css("border", "2px solid red");
            //$("#inputErrorMsg").css("display", "block");
            //$("#inputErrorMsg").html("Please fill all the required fields marked with *.");
            FieldError = 1;
         }else{
            $(this).css("border", "1px solid black");
         }
      }
   });
}



function savePatientVaccination(){
    FieldError = 0;
    
    var isEncrypt = parseInt(localStorage.getItem("encVaccn"));
    
    localStorage.setItem("isEncrypt", isEncrypt);
    var isUpdate = $("#isVaccnUpdate").val();
    var id = $("#vaccnId").val();
    var vName = encrypt($("#vaccnTitile").val());
    var date = currentDate($("#scdlTime").val());
    var description = encrypt($("#vaccnDesc").val());
    var vId = $("#vId").val();
    var vaccnJson = "";
    validationVaccn();

    if(FieldError == 0){
      if(isUpdate == 1){
        vaccnJson = { "id":id, patientId : localStorage.getItem("patientid"), "vncId" : vId, "vName":vName, "date" : date, "description" : description, "isEncrypt":isEncrypt };
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
        vaccnJson = { patientId : localStorage.getItem("patientid"), "vncId" : vId, "vName":vName, "date" : "2013-08-12", "description" : description, "isEncrypt":isEncrypt };
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


function populatePersonalInfo(userInfo){
   var i;
   for(i=0;i < userInfo.length;i++){
      var uId = userInfo[i].uid;
      var firstname = userInfo[i].firstname;
      var lastname = userInfo[i].lastname;
      var gender = userInfo[i].gender;
      if(gender == "M"){
         gender = "Male";
      }else{
         gender = "Female";
      }
      var address = userInfo[i].address1+" "+userInfo[i].address1;+" "+userInfo[i].address1;;
      var uId = userInfo[i].uid;
      var uId = userInfo[i].uid;
      var email = userInfo[i].email;
      var disease = userInfo[i].disease;
      var dob = userInfo[i].dateofbirth;
      var phone = userInfo[i].phone;
      $("#name").html(firstname+" "+lastname);
      $("#disease").html(disease);
      $("#dob").html(dob);
      $("#gender").html(gender);
      $("#address").html(address);
      $("#email").html(email);
      $("#tel").html(phone);
             
   }
}


function populateDocPersonalInfo(userInfo){
   var i;
   for(i=0;i < userInfo.length;i++){
      var uId = userInfo[i].uid;
      var firstname = userInfo[i].firstname;
      var lastname = userInfo[i].lastname;
      var gender = userInfo[i].gender;
      if(gender == "M"){
         gender = "Male";
      }else{
         gender = "Female";
      }
      var address = userInfo[i].address1+" "+userInfo[i].address1;+" "+userInfo[i].address1;;
      var uId = userInfo[i].uid;
      var uId = userInfo[i].uid;
      var email = userInfo[i].email;
      var disease = userInfo[i].education+" "+userInfo[i].spname;
      var dob = userInfo[i].dateofbirth;
      var phone = userInfo[i].phone;
      $("#docName").html(firstname+" "+lastname);
      $("#docSpeciality").html(disease);
      $("#docDob").html(dob);
      $("#docGender").html(gender);
      $("#docAddress").html(address);
      $("#docEmail").html(email);
      $("#docTel").html(phone);
             
   }
}


/*******************Add Vaccinaton****************************/




function populateAction(actnData, dates){
    var currentDate = new Date();
    hr = currentDate.getHours();
    contentBefore = "";
    contentAfter = "";
    checkTime = 0;
    content = "";
    oldMedHour = new Array();
    medCnt = 0;
    
   for(i = 1; i<=24; i++){
        //$("#"+i+"_text").html("");
   }
   var tdDate = todayDate.getFullYear()+"-"+todayDate.getMonth()+"-"+todayDate.getDate();
   if(actnData == false){
      content = content+'<div id="" class="fl fullMedActnDiv" style="display:block !important; text-align:center;font-size:20px;">There are no Action at this time</div>';
      $("#contentMed").html(content);
   }else{
      //if(dates == tdDate){
    
         //$("#medCnt").html(medCnt);
               
         var i;
         for(i=0;i < actnData.length;i++){
             var id = actnData[i].id;
             var isencrypted = actnData[i].isencrypted;
          localStorage.setItem("isDecrypt", isencrypted);
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
                 
                 var disTime = time;
                 var dateTime = myDate + ' ' + time;
                 
                 var missedTime = dateTime;
                 dateTime = new Date(dateTime);
                 var medHour = dateTime.getHours();
                 
                 if (time != null && time != "") {
                     var contentImg = "";
                     var contentMed = "";
                     var medImage = actnData[i].medpicture;
                     var isMissed = actnData[i].ismissed;
                     var desc = decrypt(actnData[i].description);
                     
                     medCnt = medCnt + 1;
                     var missedCurrHour = "";
                     var missedCurrDate = "";
                     
                     var medName = "";
                     var nowDate = new Date();
                     //alert(getDateMonth(dateTime)+"=="+getDateMonth(nowDate));
                         
                     
                     $("#"+medHour+"_div").css("display","block");
                     //alert(localStorage.getItem("isPatHome"));
                     if(localStorage.getItem("isPatHome") == 1){
                        contentMed = contentMed+'<div id="'+medHour+'_list"  class="'+medHour+'_list" style="width:80%;float:left;height:30px;border-bottom: 1px solid #777777;border-top: 1px solid #F5F5F5;padding-top:3px;padding-bottom:20px;padding-left:20%;font-size:16px;"><b>'+actnData[i].name+'</b> at '+disTime+'</div>';
                     }else{
                        contentMed = contentMed+'<div id="'+medHour+'_list"  class="'+medHour+'_list" style="width:100%;float:left;height:30px;border-bottom: 1px solid #E8E8E8;border-top: 1px solid #F5F5F5;padding-top:3px;padding-bottom:20px;"><div class="fl" style="width:15%;"><img src="http://54.213.19.88/myhealthanalytics/images/exercise.png" ></div><div class="fl" style="width:40%;padding-left:5%;padding-top:10px;"><span class="medName" style="font-size:18px;margin-top:15px;" data-pancakes="' + id + '_'+medHour+'">You have to perform <b>'+actnData[i].name+'</b> at '+disTime+'</span></div><div class="fr" style="width:30%;"><img onclick="deleteAction('+id+')" src="../images/deleteIcon.png" class="fr icons" /><img onclick="editAction('+id+')" src="../images/editIcon.png" class="fr icons" /></div><div class="none '+medHour+'_res" id="'+id+'">'+missedTime+'#'+actnData[i].name+'</div><div class="none medtime">'+id+'_'+time+'#'+medHour+'</div></div>';
                        contentMed = contentMed+'<div id="'+medHour+'_desc"  class="'+medHour+'_list" style="width:80%;float:left;height:30px;border-bottom: 1px solid #777777;border-top: 1px solid #F5F5F5;padding-top:3px;padding-bottom:20px;padding-left:20%;font-size:16px;">'+desc+'</div>';
                     }
                     
                     $("#"+medHour+"_text").append(contentMed);
                        
                     
                 }
               }
         }
     // }
   }
}


function viewDocInfo(){
   var role = $("#role").val();
   if(role == 1){
      $(".role").css("display", "none");
   }else{
      $(".role").css("display", "block");      
   }
}



$("#register").live("click", function(){
      FieldError = 0;
      emailError = 0;
      passError = 0;
      validation();
      //alert(FieldError);
      var fname = $("#fName").val();
      var lname = $("#lName").val();
      var gender = $("#gender").val();
      var dob = $("#dob").val();
      dob = new Date(dob);
      var dobDate = dob.getFullYear()+"-"+(dob.getMonth() + 1)+"-"+dob.getDate();
      
      var email = $("#email").val();
      ValidateEmail(email);
      var username = $("#username").val();
      var pass = $("#password1").val();
      var pass1 = $("#password2").val();
      
      if(pass != pass1){
         passError = 1;
         $(this).css("border", "2px solid red");
      }
      var role = $("#role").val();
      var education = "";
      var registration = "";
      var docError = 0;
      if(role == 2){
         if($("#registration").val() == "" || idSelArr.length <= 0){
            docError = 1;
         }else{
            registration = $("#registration").val();
            education = idSelArr.join("_");
         }
      }
      
      var city = $("#city").val();
      var state = $("#state").val();
      var country = $("#country").val();
      var tel = $("#telephone").val();
      var promo = $("#promo").val();
      //alert(FieldError+"--"+emailError+"--"+passError);
      if(FieldError == 0 && emailError == 0 && passError == 0 && docError == 0){
         var crypt = new JSEncrypt();
         var privateKey = crypt.getPrivateKey();
         var publicKey = crypt.getPublicKey();
         //alert(privateKey+"--"+publicKey);
         
                             
         $.post("registration/registerUser", { "fname":fname, "lname": lname, "gender": gender, "dob": dobDate, "email": email, "username": username, "password": pass1, "role":role, "education":education, "registration":registration, "city": city, "state": state, "country": country, "tel": tel, "promo":promo, "privKey": privateKey, "pubKey":publicKey },
                           function(data){
                           //alert(JSON.stringify(data));
                             if(data.status == 4){
                                 $("#promo").val("");
                                 alert("Please enter a valid promo code");
                             }else if(data.status == 3){
                                 $("#username").val("");
                                 alert("This username has already been used. Please select a different username.");
                             }else if(data.status == 2){
                                 $("#email").val("");
                                 alert("This email address has already been used. Please select a different email address.");
                             }else{
                                 window.location.href = "getfile";
                             }
                             //window.location.href = "getfile";
                             // Create the encryption object.
                              
                           
                           }, "json");
         
      }
      
      
   });


function generateKey(){
   var crypt = new JSEncrypt();
   var privateKey = crypt.getPrivateKey();
   var publicKey = crypt.getPublicKey();
   var username = localStorage.getItem("username");
   var userid = localStorage.getItem("userid");
   //alert(userid+"--"+username+"--"+privateKey);
   
   $.post("registration/generateKey", { "uid":userid, "username": username, "privKey": privateKey, "pubKey":publicKey },
                           function(data){
                             //alert("1");
                             window.location = "http://54.213.19.88/myhealthanalytics/index.php/getfile/getfiles?file="+localStorage.getItem("username")+".pem";
                             alert("New private key has been generated");
                           }, "json");
      
}


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
      
      if ($(this).css("display") != "none") {
         var value = $(this).val();
         
         if(value == "") {
            $(this).css("border", "2px solid red");
            //alert($(this).attr("id"));
            //$("#inputErrorMsg").css("display", "block");
            //$("#inputErrorMsg").html("Please fill all the required fields marked with *.");
            FieldError = 1;
         }else{
            $(this).css("border", "1px solid black");
         }
      }
   });
}


function isValidNumeric() {
    $(".requiredNum").each(function() {
        if ($(this).css("display") != "none") {
            var value = $(this).val();
            
            if (value.match(/^[0-9]+$/)) {
            }else{
                $(this).css("border", "2px solid red");
                //$("#isValidNum").html("Please enter numeric values.");
                isNumbercheck = 1;
            }
        }
    });
}


var privKey;
function encrypt(value){
   /*if(localStorage.getItem("isEncrypt") == "1"){
      var crypt = new JSEncrypt();
      
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
      return crValue;
   }else{*/
      return value;
   //}
    
}


function decrypt(value){
   /*if(localStorage.getItem("isDecrypt") == "1"){
      var crypt = new JSEncrypt();
      
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
      return crValue;
   }else{*/
      return value;
   //}
    
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
   localStorage.setItem("homePage", 1);
               
   if(imgId == "../images/expand.png"){
      
      $(this).attr("src", "../images/collapse.png");
      $("."+id).animate({"height": "300px"}, { duration: "fast" });
      if(id.indexOf("patient_vaccn_div") >= 0){
         $.post("home/getalldata", { "patientId": localStorage.getItem("patientid"), "date": getDateFormat, "type":"vaccn" },
                        function(data){
                          
			  var vaccinationList = JSON.stringify(data["vaccination"]);
			  vaccinationList = eval(" (" + vaccinationList + ") ");
			    
			    populateVaccination(vaccinationList, getDateFormat);
			    
			
                        }, "json");
      }else if(id.indexOf("patient_med_div") >= 0){
         
         $.post("home/getalldata", { "patientId": localStorage.getItem("patientid"), "date": getDateFormat, "type":"med" },
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
         
         $.post("home/getalldata", { "patientId": localStorage.getItem("patientid"), "date": getDateFormat, "type":"files" },
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
   $("#docSpeciality").html("");
   doctorList = doctorsList;
   var specCont = "";
   specCont = specCont + '<option value="">Select speciality</option>';
    for ( var i in doctorsList) {
        specCont = specCont + '<option value="'+doctorsList[i].spid+'">'+doctorsList[i].spname+'</option>';
    }
    
    $("#docSpeciality").append(specCont);
}


function setDoctors(){
   $("#docName").html("");
    var specId = $("#docSpeciality").val();
    var specCont = "";
    specCont = specCont + '<option value="">Select doctor</option>';
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
      
      if(val == ""){
         var val = $("#vitTitile").val();
      }
      // alert(val);
      if(val == 1){
         //alert("1");
         cont = '<div class="float100 actionContentTr">'+
               '<div class="vitLabel vitLabelFld" style="margin-top:15px;">HDL:</div>'+
               '<div class="actionInput">'+
                  '<input type="tel" id="hdl" class="editActionInput required requiredNum vitFld" maxlength="3"> mg/dl'+
               '</div>'+
               '</div>'+
               '<div class="float100 actionContentTr">'+
                  '<div class="vitLabel vitLabelFld" style="margin-top:15px;">LDL:</div>'+
                     '<div class="actionInput">'+
                        '<input type="tel" id="ldl" class="editActionInput required requiredNum vitFld" maxlength="3"> mg/dl'+
                     '</div>'+
                  '</div>'+
                  '<div class="float100 actionContentTr">'+
                     '<div class="vitLabel vitLabelFld" style="margin-top:15px;">Trigly:</div>'+
                     '<div class="actionInput">'+
                        '<input type="tel" id="trigly" class="editActionInput required requiredNum vitFld" maxlength="3"> mg/dl'+
                     '</div>'+
                  '</div>'+
                  '<div class="float100 actionContentTr">'+
                     '<div class="vitLabel vitLabelFld" style="margin-top:15px;">Total:</div>'+
                     '<div class="actionInput">'+
                        '<input type="tel" id="total" class="editActionInput required requiredNum vitFld" maxlength="3"> mg/dl'+
                     '</div>'+
                  '</div>';
      }else if(val == 2){
         cont = cont + '<div class="float100 actionContentTr">'+
                           '<div class="vitLabel vitLabelFld" style="margin-top:15px;">Systolic:</div>'+
                           '<div class="actionInput">'+
                              '<input type="tel" id="systolic" class="editActionInput required requiredNum vitFld" maxlength="3"> mmGH'+
                           '</div>'+
                        '</div>'+
                        '<div class="float100 actionContentTr">'+
                           '<div class="vitLabel vitLabelFld" style="margin-top:15px;">Diastolic:</div>'+
                           '<div class="actionInput">'+
                              '<input type="tel" id="diastolic" class="editActionInput required requiredNum vitFld" maxlength="3"> mmGH'+
                           '</div>'+
                        '</div>';
      }else if(val == 3){
         cont = '<div class="float100 actionContentTr">'+
                  '<div class="vitLabel" style="margin-top:15px;">Weight:</div>'+
                  '<div class="actionInput">'+
                     '<input type="tel" id="weight" class="editActionInput required requiredNum vitFld" maxlength="3"> Kg'+
                  '</div>'+
               '</div>';
      }else if(val == 4){
         cont = '<div class="float100 actionContentTr">'+
                  '<div class="vitLabel" style="margin-top:15px;">Height:</div>'+
                  '<div class="actionInput">'+
                     '<input type="tel" id="height" class="editActionInput required requiredNum vitFld" maxlength="3"> cm'+
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
    var isEncrypt = parseInt(localStorage.getItem("encAppt"));
    
    localStorage.setItem("isEncrypt", isEncrypt);
    $(".required").css("border", "1px solid #000");
    
    FieldError = 0;
    validation();
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
    if (FieldError == 0) {
        var apptJson = "";
        var apptModel;
        
        if(isUpdateAppt == 1){
            var apptId = $("#apptId").val();
            apptJson = { 'id':apptId, patientId : localStorage.getItem("patientid"), "did" : docId, "spid" : docSpecialityId, "confirmed" : status, "description" : descriptionData, "frequency" : frequency, "reminder1" : remindMeData1, "reminder2" : remindMeData2, "status" : status, "startDate" : startDate, "creationDate" : today, "lastUpdationDate" : today, "createdBy" : crId, "lastUpdatedBy" : crId, "isDeleted" : isdelete, "isEncrypt":isEncrypt };
            $.post("addappointment/editdata", apptJson,
                        function(data){
                          //alert(data.username); // John
                          //alert(JSON.stringify(data));
                          //console.log(data.time); //  2pm
                          //window.location.href = "<?php echo site_url('Home'); ?>";
                          window.location.href = "appointment";
                        }, "json");
        }else{
            apptJson = { patientId : localStorage.getItem("patientid"), "did" : docId, "spid" : docSpecialityId, "confirmed" : status, "description" : descriptionData, "frequency" : frequency, "reminder1" : remindMeData1, "reminder2" : remindMeData2, "status" : status, "startDate" : startDate, "creationDate" : today, "lastUpdationDate" : today, "createdBy" : crId, "lastUpdatedBy" : crId, "isDeleted" : isdelete, "isEncrypt":isEncrypt };
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
   showAddDivMask();
   //var cont = $("#contentaddVit").html();
   //$('body').append('<div data-role="content" id="addVitDiv" class="overflow addMed" style="position:fixed;top:7%;left:20%;width:60%;height:90%;"></div>');
   $("#addVitDiv").css("display", "block");
}


function editVital1(vitalCollection){
    //window.location.href = "addVitals";
     
   var i;
      var contVital = "";
    for(i=0;i < vitalCollection.length;i++){
      var id = vitalCollection[i].id;
      
      var isencrypted = vitalCollection[i].isencrypted;
      localStorage.setItem("isDecrypt", isencrypted);
      
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

         changeVital(vid);
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
      if(isencrypted == "1"){
        $('#encryptVit').prop('checked', true);
      }else{
          $('#encryptVit').prop('checked', false);
      }
    }
}

//var ischeck = 0



function savePatientVital(){
   FieldError = 0;
    isNumbercheck = 0;
    var isEncrypt = parseInt(localStorage.getItem("encVit"));
    
    
    
    localStorage.setItem("isEncrypt", isEncrypt);
    
    var val = $("#vitTitile").val();
   var isUpdate = $("#vitUpdate").val();
    var id = $("#vitId").val();
    var pvtid = $("#pvitId").val();
    
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
    
    validation();
    
    var date = new Date();
          var dformat = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ].join('/') + ' ' + [ date.getHours(), date.getMinutes(), date.getSeconds() ].join(':');
                  var i = dformat.slice(0, 10).split('/');
                  var monthCur = date.getMonth() + 1;
                  var dayCur = date.getDate();
                  var crrHour = date.getHours();
                  var yearCur = date.getFullYear();
                  var monthName = shortMonthNames[monthCur - 1];
                  $("#hexagonMed").html("" + monthName + " " + dayCur + "");
                  var getDateFormat = yearCur+"-"+monthCur+"-"+dayCur;

    if(FieldError == 0){
      isValidNumeric();
      var vitalModel = "";
      var vitalJson = "";
      if(isNumbercheck == 0){                  
         if(isUpdate == 1){
             vitalJson = { "id":id, "pvtid":pvtid, patientId : localStorage.getItem("patientid"), "vtlId" : val, "cnt":val, "val1":val1, "val2":val2, "val3":val3, "val4":val4, "attrVal1":attrVal1, "attrVal2":attrVal2, "attrVal3":attrVal3, "attrVal4":attrVal4, "date" : getDateFormat, "isEncrypt":isEncrypt };
             $.post("addvitals/editdata", vitalJson,
                             function(data){
                               
                               window.location.href = "vitals";
                             }, "json");
             //alert(JSON.stringify(vaccnJson));
         }else{
             vitalJson = { patientId : localStorage.getItem("patientid"), "vtlId" : val, "cnt":val, "val1":val1, "val2":val2, "val3":val3, "val4":val4, "attrVal1":attrVal1, "attrVal2":attrVal2, "attrVal3":attrVal3, "attrVal4":attrVal4, "date" : getDateFormat, "isEncrypt":isEncrypt };
             $.post("addvitals/savedata", vitalJson,
                             function(data){
                               
                               window.location.href = "vitals";
                             }, "json");
         }
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
      contVital = contVital+'<div id="" class="fl fullMedActnDiv" style="display:block !important;Font-size:20px;text-align:center;">There are no Vitals at this time</div>';
   }else{
      //if(dates == tdDate){
         for(i=0;i < vitData.length;i++){
           var id = vitData[i].id;
           var isencrypted = vitData[i].isencrypted;
          localStorage.setItem("isDecrypt", isencrypted);
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
               
               
               var searchText = "";
               var unit = ""
               if(vitalName == "Cholesterol"){
                  searchText = searchText + 'Cardiologist_in_'+localStorage.getItem("pincode");
                  unit = "mg/l";
               }else if(vitalName == "Blood Pressure"){
                  searchText = searchText + 'Physician_in_'+localStorage.getItem("pincode");
                  unit = "mmHg";
               }else if(vitalName == "Weight"){
                  searchText = searchText + 'Neurologist_in_'+localStorage.getItem("pincode");
                  unit = "kg";
               }else{
                  searchText = searchText + 'Dentist_in_'+localStorage.getItem("pincode");
                  unit = "mm";
               }
               
               contVital = contVital + '<div id="1_div" class="fl fullMedActnDiv currentVit" style="display:block !important;">'+
                                            '<div class="pad0 vitTitleHeader">'+
                                               '<span class="fl font20 vitalName" style="font-size:22px;"><span class="">'+vitalName+'</span> <span class="underline font16 openMap" style="cursor:pointer;margin-left:20px;color:#fff" id="'+searchText+'">View Doctors</span></span>'+
               
                                            
                                            '<div class="fr" style="width:100px;"><img onclick="deleteVital('+id+')" src="../images/deleteIcon.png" class="fr icons" /><img onclick="editVital('+id+')" src="../images/editIcon.png" class="fr icons" /></div>'+
                                            '</div>'+
                                            '<div id="1_text" class="fl vitAttrDiv w100" style="text-align:center;padding-top:8px;">';
               //alert(contVital)
               var contNext;
               var mod;
               var j;
               //alert(vitalName+"--"+attrCnt)
               for(j=1; j<=attrCnt;j++){
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
                  
                       //alert(mod+"--"+attNme);
                      
                      //if(mod == 0){
                      
                           contVital = contVital + '<div class="fl attrValDiv">'+
                                                     '<div class="attrDiv" style="width:100%;font-size:20px;">'+attNme+'</div>'+
                                                     '<span class="font22" style="font-size:18px;">'+attVal+' '+unit+'</span>'+
                                                  '</div>';
                           contNext = '</div>';
                      
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
   showAddDivMask();
   $("#addExerciseDiv").css("display", "block");
   addAction();
   var actId = localStorage.getItem("editActId");
   $.post("action/getselaction", { "id": actId },
      function(data){
         var actnData = JSON.stringify(data["action"]);
	 //alert(actnData);
	 actnData = eval(" (" + actnData + ") ");
					  
	 populateEditAction(actnData);
					
   }, "json");
}



function populateEditAction(actnData){
   var i;
   for(i=0; i<actnData.length; i++){
      var id = actnData[i].id;
      var isencrypted = actnData[i].isencrypted;
          localStorage.setItem("isDecrypt", isencrypted);
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
    if(isencrypted == "1"){
      $('#encryptActn').prop('checked', true);
    }else{
      $('#encryptActn').prop('checked', false);
    }
    $(".requiredActn").css("border", "1px solid black");
    
   }
}


function editAppointment(apptId){
   //alert(apptId);
   localStorage.setItem("edit", 1);
   localStorage.setItem("editApptId", apptId);
   showAddDivMask();
   //var cont = $("#addApptCont").html();
   //$('body').append('<div data-role="content" id="addApptDiv" class="overflow addMed" style="position:fixed;top:7%;left:20%;width:60%;height:90%;"></div>');
   $("#addApptDiv").css("display", "block");
   var apptId = localStorage.getItem("editApptId");
   $.post("appointment/viewsel", { "id": apptId },
      function(data){
	 var apptData = JSON.stringify(data["appointment"]);
	 //alert(apptData);
	 apptData = eval(" (" + apptData + ") ");
	 populateEditAppointment(apptData);
				 
   }, "json");
}

function populateEditAppointment(apptData){
   var i;
   for(i=0; i<apptData.length; i++){
      var apptId = apptData[i].id;
      var isencrypted = apptData[i].isencrypted;
          localStorage.setItem("isDecrypt", isencrypted);
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
      
      if(isencrypted == "1"){
         $('#encryptAppt').prop('checked', true);
      }else{
         $('#encryptAppt').prop('checked', false);
      }
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
  
  
  
function editVaccination(vaccnId, vname, vndate){
   //alert(vaccnId+"-"+vname+"-"+vndate);
   localStorage.setItem("edit", 1);
   localStorage.setItem("editVaccnId", vaccnId);
   localStorage.setItem("isChildVaccn", 0);
   showAddDivMask();
   $('#addVaccnStatusDiv').css("display", "block");
   var vaccnId = localStorage.getItem("editVaccnId");
   
   populateEditVaccination(vaccnId, vname, vndate);
					
        
}


function editChildVaccination(vaccnId, vname, vndate){
   //alert(vaccnId);
   localStorage.setItem("edit", 1);
   localStorage.setItem("editVaccnId", vaccnId);
   localStorage.setItem("isChildVaccn", 1);
   showAddDivMask();
   $('#addVaccnStatusDiv').css("display", "block");
   var vaccnId = localStorage.getItem("editVaccnId");
   
   populateEditVaccination(vaccnId, vname, vndate);
	  
}


function populateEditVaccination(vnid, vname, vndate){
   
      $("#vnId").val(vnid);
      $("#vacname").html(vname);
      $("#vacdate").html(vndate);
    
}



/*function populateEditVaccination(vaccnData){
   var i;
   for(i=0; i<vaccnData.length; i++){
      var isencrypted = vaccnData[i].isencrypted;
          localStorage.setItem("isDecrypt", isencrypted);
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
    
    if(isencrypted == "1"){
        $('#encryptVaccn').prop('checked', true);
    }else{
        $('#encryptVaccn').prop('checked', false);
    }
    $(".requiredVaccn").css("border", "1px solid black");
   }
}*/




function editMedication(medId){
   localStorage.setItem("edit", 1);
   localStorage.setItem("editMedId", medId);
   showAddDivMask();
   $("#addMedDiv").css("display", "block");
   addMedication();
   var medId = localStorage.getItem("editMedId");
   $.post("medication/viewselmed", { "id": medId },
      function(data){
	 var medData = JSON.stringify(data["medication"]);
	 medData = eval(" (" + medData + ") ");
	 populateEditMed(medData);
				
   }, "json");
}


function populateEditMed(medData){
   var i;
   for(i=0; i<medData.length; i++){
      var isencrypted = medData[i].isencrypted;
          localStorage.setItem("isDecrypt", isencrypted);
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
               timePickerContent += "<div><input class = 'exeTime required' type='text' value='"+time+"'  style='margin-left:20%;width:30%;' readonly='readonly' placeholder='Time'></div>";
            
         }
               
         $("#exerciseTime").html(timePickerContent);
         $("#freqTimePicker").css("display", "block");
         $('.exeTime').scroller({ 
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
        //alert(isencrypted);
        if(isencrypted == "1"){
            $('#encryptMed').prop('checked', true);
        }else{
            $('#encryptMed').prop('checked', false);
        }
        $(".requiredMed").css("border", "1px solid black");
        //okFrequency();
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


$("#exercise").live("click", function(){
   window.location.href = "action";
});

$("#profile").live("click", function(){
   //window.location.href = "profile";
});

$("#document").live("click", function(){
   window.location.href = "document";
});

$("#settings").live("click", function(){
   window.location.href = "settings";
});

$("#vital").live("click", function(){
   window.location.href = "vitals";
});

$("#appointment").live("click", function(){
   window.location.href = "appointment";
});

$("#medication").live("click", function(){
   window.location.href = "medication";
});

$("#vaccination").live("click", function(){
   window.location.href = "vaccination";
});

$("#home").live("click", function(){
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
      contPat = contPat + '<option  value="'+patientid+'">'+fname+' '+lname+'</option>';
      
    }
    
    $("#patientList").html(contPat);
}


function showPatInformation(id){
   var patientId = $("#patientList").val();
   if(id == 1){
      $.post("home/getalldocdata", { "docId": localStorage.getItem("userid"), "patientId":patientId },
	 function(data){
	    //alert(data.username); // John
	    
	    //alert(JSON.stringify(data["Medication"][0].id));
            $(".patientDiv").css("display", "none");
            $("#patientInfo").css("display", "block");
            $(".patDiv").removeClass("activeBG");
            $(".patInfoDiv").addClass("activeBG");
            var patInfo = JSON.stringify(data["userinfo"]);
            //alert(patInfo);
            patInfo = eval(" (" + patInfo + ") ");
            populatePersonalInfo(patInfo);
       }, "json");
   }else if(id == 2){
      $(".patientDiv").css("display", "none");
      $("#graph").css("display", "block");
      $(".patDiv").removeClass("activeBG");
      $(".graphDiv").addClass("activeBG");
      localStorage.setItem("patientid", patientId);
      localStorage.setItem("type", "Graph");
      localStorage.setItem("isDocDashboard", 1)
      showPatVit();
   }else{
      $.post("home/getalldocdata", { "docId": localStorage.getItem("userid"), "patientId":patientId },
	 function(data){
	    //alert(data.username); // John
	    
	    //alert(JSON.stringify(data["Medication"][0].id));
            $(".patientDiv").css("display", "none");
            $("#patientSharedInfo").css("display", "block");
            $(".patDiv").removeClass("activeBG");
            $(".filesDiv").addClass("activeBG");
            var filesList = JSON.stringify(data["files"]);
            filesList = eval(" (" + filesList + ") ");   
            populateDocFilesList(filesList);
      }, "json");
   }
	    
				    
     
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
   /*$("#mainPat").css("display", "block");
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
			
                        }, "json");*/

});




function populateRequest(requestList){
   var i;
      var contPat = "";
      if(requestList.length > 0){
    for(i=0;i < requestList.length;i++){
      var id = requestList[i].id;
      var fname = requestList[i].firstname;
      var lname = requestList[i].lastname;
      
      contPat = contPat + '<div id="'+id+'" style="width:60%;margin-left:30px;">'+
                           '<p style="font-size:18px;width:auto;border-bottom:1px solid #777;" class="fl">Friend request from <b>'+fname+' '+lname+'</b></p>'+
                           '<a class="medicationSaveButton blueButton fl"style="margin-top:10px;margin-left:30px;" href="javascript:void(0);" onclick="acceptReq('+id+')"> Accept </a>'+
                           '</div>';
    }
      }else{
         contPat = contPat + '<div id="'+id+'" style="width:90%;padding-left:30px;">'+
                           '<p style="font-size:18px;width:100%;" class="fl"><b>There are no pending request.</b></p>'+
                           '</div>';
      }
    $("#friend_request").html(contPat);
}


function acceptReq(id){
   
      $.post("home/acceptreq", { "id": id },
                        function(data){
                          //alert(data.username); // John
                          $("#"+id).remove();
			$.post("home/getrequestdata", { "userId": localStorage.getItem("userid") },
				    function(data){
				      //alert(data.username); // John
				      var patientList = JSON.stringify(data["request"]);
				      //alert(patientList);
				      patientList = eval(" (" + patientList + ") ");
				      
					populateRequest(patientList);
					showPatInformation(1);
				    }, "json");
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



$(".share").live("click", function(){
   var idArr = new Array();
   $('.shareCheckbox').each(function(){
      if($(this).is(':checked') == true){
         var id = $(this).attr("id");
         idArr.push(id);
      }
   });
   if(idArr.length > 0){
      showAddDivMask();
      
      $("#enterComment").css("display", "block");
   }else{
      alert("Please select a file to share.");
   }
});

$("#shareDoc").live("click", function(){
   var shareCom = $("#shareComment").val();
   var idArr = new Array();
   var idUnshrdArr = new Array();
   var chckedArr = new Array();
   $('.shareCheckbox').each(function(){
      if($(this).is(':checked') == true){
         var id = $(this).attr("id");
         idArr.push(id);
      }else{
         var id = $(this).attr("id");
         idUnshrdArr.push(id);
      }
   });
   if(shareCom == ""){
      alert("PLease enter comment.");
   }else{
   var docId = $("#selectPatDoc").val();
   
   if(docId != "" && docId != null){
      $.post("home/sharedoc", { "id": idArr, "unshrdId":idUnshrdArr, "docId": docId, "shareCom":shareCom },
                        function(data){
                         resetsFields();
			
                        }, "json");
   }else{
      alert("Please select a doctor to share document with");
   }
   }
})

function shareUnshareDoc(){
   var idArr = new Array();
   var idUnshrdArr = new Array();
   var chckedArr = new Array();
   $('.shareCheckbox').each(function(){
      if($(this).is(':checked') == false){
         
         var id = $(this).attr("id");
         idUnshrdArr.push(id);
      }
   });
   
   var docId = $("#selectPatDoc").val();
   
   if(docId != "" && docId != null){
      $.post("home/unsharedoc", { "unshrdId":idUnshrdArr, "docId": docId },
                        function(data){
                         resetsFields();
			
                        }, "json");
   }else{
      alert("Please select a doctor to share document with");
   }
   
}





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



function forgotPass(){
   var email = $("#email").val();
   
   if(email == ""){
        alert("Please enter an valid email");
    }
    var validEmail = emailValidation(email);
    
    if(validEmail == 1){
      $.post("forgotpassword/forgotpass", { "email":email },
             function(data){
               var confirm = data["confirm"];
               if(confirm == "1"){
                  alert("Your password has been sent in your registered email address.");
			
               }else{
                  alert("This email address is not registered. Please enter registered email address.");
               }
      }, "json");
    }
}


function emailValidation($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if( !emailReg.test( $email ) ) {
        alert("Please enter an valid email");
        return 0;
    } else {
        return 1;
    }
}


function cancelupload(){
   window.location.href = "index.php/home";
}


$(".vaccnHeader").live("click", function(){
   if($(this).attr('id') == "vaccnChildHeader"){
      $("#contentAddVaccn").css("display", "none");
      $("#contentAddChildVaccn").css("display", "block");
      $("#saveVaccn").css("display", "none");
      $("#saveChildVaccn").css("display", "block");
      $(".vaccn").css("display", "none");
      $(".childVaccn").css("display", "block");
   }else{
      $("#contentAddVaccn").css("display", "block");
      $("#contentAddChildVaccn").css("display", "none");
      $("#saveVaccn").css("display", "block");
      $("#saveChildVaccn").css("display", "none");
      $(".vaccn").css("display", "block");
      $(".childVaccn").css("display", "none");
   }
});


function validationChildVaccn(){
   $(".requiredChildVaccn").each(function() {
      
      if ($(this).css("display") != "none") {
         var value = $(this).val();
         
         if(value == "") {
            $(this).css("border", "2px solid red");
            //$("#inputErrorMsg").css("display", "block");
            //$("#inputErrorMsg").html("Please fill all the required fields marked with *.");
            FieldError = 1;
         }else{
            $(this).css("border", "1px solid black");
         }
      }
   });
}


function saveChildVaccination(){
    FieldError = 0;
    isUpdate = 0;
    //var isChecked = $('#encryptVaccn').is(':checked');
    localStorage.setItem("isEncrypt", 0);
    /*var isEncrypt;
    if(isChecked = true){
        isEncrypt = 1;
    }else{
        isEncrypt = 0;
    }*/
    
    var isUpdate = $("#isChildVaccnUpdate").val();
    var id = $("#childVaccnId").val();
    var childName = encrypt($("#childName").val());
    var childDOB = currentDate($("#dobTime").val());
    
    var childVId = $("#cvId").val();
    var childVaccnJson = "";
    var childVaccnModel;
    validationChildVaccn();
    if(FieldError == 0){
      
        //if(isUpdate == 1){
            
            childVaccnJson = { "id":id, patientId : localStorage.getItem("patientid"), "childName" : childName, "childDOB":childDOB };
            //alert(JSON.stringify(childVaccnJson));
            $.post("addvaccination/childvaccn", childVaccnJson,
                          function(data){
                            
                             window.location.href = "vaccination";
                          }, "json");
            
        //}else{
            
            /*childVaccnJson = { patientId : storage.getItem("patientId"), "childName" : childName, "childDOB":childDOB };
            $.post("addvaccination/editdata", vaccnJson,
                          function(data){
                            //alert(data.username); // John
                            //alert(JSON.stringify(data));
                            //console.log(data.time); //  2pm
                            //window.location.href = "<?php echo site_url('Home'); ?>";
                             window.location.href = "vaccination";
                          }, "json");*/
        //}
         //alert(JSON.stringify(childVaccnJson));
      
    }
}


$(".vaccnViewHeader").live("click", function(){
   if($(this).attr('id') == "vaccnChildHeader"){
      $("#tab1").css("display", "none");
      $("#tab2").css("display", "block");
      getChildVaccination();
      $("#vaccnChildHeader").css("color", "#5D7F7B");
      $("#vaccnHeader").css("color", "#000000");
      localStorage.setItem("isChild", 1);
   }else{
      $("#tab1").css("display", "inline-block");
      $("#tab2").css("display", "none");
      getVaccination();
      $("#vaccnHeader").css("color", "#5D7F7B");
      $("#vaccnChildHeader").css("color", "#000000");
      localStorage.setItem("isChild", 0);
   }
});


function populateChildVaccination(vaccinationlist, date){
   $("#apptContent").html("");
   var content = "";
   var tdDate = todayDate.getFullYear()+"-"+todayDate.getMonth()+"-"+todayDate.getDate();
   if(vaccinationlist == false){
      content = content+'<div id="" class="fl fullMedActnDiv font16" style="display:block !important;text-align:center;margin-top:200px;padding-top:30px;">There are no vaaccination at this allocated</div>';
   }else{
      //if(date == tdDate){
         
       
       content = content + '<div class="CSS_Table_Example" style="width:99.5%;height:auto;margin-top:10px;"><table width="100%"><tbody id="appointmentTable" class="font16" style="border-bottom:1px solid;">';
       content = content + '<tr><td>Vaccination Name</td><td>Scheduled Date</td><td>Date Taken</td><td>Action</td>';
       for(i=0;i < vaccinationlist.length;i++){
            var chldid = vaccinationlist[i].chldid;
            var childName = vaccinationlist[i].childName;
            
            $("#childNameContent").text(childName);
            localStorage.setItem("chdlVaccnId", chldid);
            var apptId = vaccinationlist[i].id;
            //var isencrypted = vaccinationlist[i].isencrypted;
            localStorage.setItem("isDecrypt", 0);
            var dateTaken = vaccinationlist[i].datetaken;
            if(dateTaken != null){
               content = content + '<tr><td>'+decrypt(vaccinationlist[i].vaccnName)+'</td><td>'+vaccinationlist[i].scheduledDate+'</td><td>'+dateTaken+'</td><td><img onclick="deleteChildVaccination('+apptId+')" src="../images/deleteIcon.png" class="fr icons" /></td>';
            }else{
               dateTaken = "NA";
               content = content + '<tr><td>'+decrypt(vaccinationlist[i].vaccnName)+'</td><td>'+vaccinationlist[i].scheduledDate+'</td><td>'+dateTaken+'</td><td><img onclick="deleteChildVaccination('+apptId+')" src="../images/deleteIcon.png" class="fr icons" /><img onclick="editChildVaccination('+apptId+', \''+decrypt(vaccinationlist[i].vaccnName)+'\', \''+vaccinationlist[i].scheduledDate+'\')" src="../images/editIcon.png" class="fr icons" /></td>';
            }
               
              
       }
       content = content + '</tbody></table></div>';
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
            
    $("#contentChildVaccn").html(content);
}



function getVaccination(){
   var date = new Date();
               var dformat = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ].join('/') + ' ' + [ date.getHours(), date.getMinutes(), date.getSeconds() ].join(':');
               var i = dformat.slice(0, 10).split('/');
               var monthCur = date.getMonth() + 1;
               var dayCur = date.getDate();
               var crrHour = date.getHours();
               var monthName = shortMonthNames[monthCur - 1];
               $("#hexagonMed").html("" + monthName + " " + dayCur + "");
	       openDashboardMed();
                $.post("vaccination/viewvaccn", { "patientId": localStorage.getItem("patientid") },
                        function(data){
                          var vaccinationDetailsList = JSON.stringify(data["vaccination"]);
			  vaccinationDetailsList = eval(" (" + vaccinationDetailsList + ") ");
			    populateVaccination(vaccinationDetailsList);
			
                        }, "json");
}

function getChildVaccination(id){
   $.post("addvaccination/childvaccn", { "id": id, "patientId" : 5, "childName":"", "childDOB":"" },
         function(data){
               var vaccinationDetailsList = JSON.stringify(data["childVaccination"]);
	       vaccinationDetailsList = eval(" (" + vaccinationDetailsList + ") ");
               //alert(JSON.stringify(vaccinationDetailsList));
	       populateChildVaccination(vaccinationDetailsList);
			
   }, "json");
}


function nextChild(){
    var chldId = parseInt(localStorage.getItem("chdlVaccnId"));
    //chldId = chldId + 1;
    initNextPrevChildVaccination(chldId, 1);
}

function prevChild(){
    var chldId = parseInt(localStorage.getItem("chdlVaccnId"));
    //chldId = chldId - 1;
    initNextPrevChildVaccination(chldId, 0)
}


function initNextPrevChildVaccination(id, nextprev){
    $.post("addvaccination/nextprevchildvaccn", { "id": id, "patientId" : localStorage.getItem("patientid"), "nextprev":nextprev },
         function(data){
               var vaccinationDetailsList = JSON.stringify(data["childVaccination"]);
	       vaccinationDetailsList = eval(" (" + vaccinationDetailsList + ") ");
               //alert(JSON.stringify(vaccinationDetailsList));
	       populateChildVaccination(vaccinationDetailsList);
			
   }, "json");
    
   
}


$(".openMap").live("click", function(){
//function openMap(searchtext){
   var searchtext = $(this).attr('id');
   searchtext = searchtext.split("_");
   searchtext = searchtext.join(" ");
   $('body').append('<div class="mask" id="detInboxMask"></div>');
   $("#detInboxMask").fadeIn(300);
   $('#detInboxMask').css("zIndex", 999);
   $('#detInboxMask').css("opacity", 0.8);
   $("#dialogContent").css("display", "block");
   //alert(searchtext);
   $(".bodyMap").html('<iframe  style="width:100%;height:100%;" src="http://maps.google.com/maps?q='+searchtext+'&output=embed"></iframe>');
});

$(".mapClose").live("click", function(){
   $("#dialogContent").css("display", "none");
   $("#detInboxMask").fadeOut(300);
   $('#detInboxMask').remove();
});


$(".medDetailClose").live("click", function(){
   $("#dialogMedContent").css("display", "none");
   $("#addMedMask").fadeOut(300);
   $('#addMedMask').remove();
});


$("#viewmap").live("click", function(){
//function openMap(searchtext){
   var searchtext = "";
   searchtext = searchtext + $("#selectLifestyleActivity").val();
   searchtext = searchtext + ' in 411001';
   $('body').append('<div class="mask" id="detInboxMask"></div>');
   $("#detInboxMask").fadeIn(300);
   $('#detInboxMask').css("zIndex", 999);
   $('#detInboxMask').css("opacity", 0.8);
   $("#dialogsearchContent").css("display", "block");
   //alert('http://maps.google.com/maps?q='+searchtext);
   $(".bodyMap").html('<iframe  style="width:100%;height:100%;" src="http://maps.google.com/maps?q='+searchtext+'&output=embed"></iframe>');
});

$(".viewMapClose").live("click", function(){
   $("#dialogsearchContent").css("display", "none");
   $("#detInboxMask").fadeOut(300);
   $('#detInboxMask').remove();
});



function saveVaccnStatus(){
   var date = new Date();
   var dformat = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ].join('/') + ' ' + [ date.getHours(), date.getMinutes(), date.getSeconds() ].join(':');
   var i = dformat.slice(0, 10).split('/');
   var monthCur = date.getMonth() + 1;
   var dayCur = date.getDate();
   var crrHour = date.getHours();
   var yearCur = date.getFullYear();
   var monthName = shortMonthNames[monthCur - 1];
   var getDateFormat = yearCur+"-"+monthCur+"-"+dayCur;
   $.post("addvaccination/saveVaccnStatus", { "id": id, "patientId" : localStorage.getItem("patientid"), "date":getDateFormat },
         function(data){
               var vaccinationDetailsList = JSON.stringify(data["childVaccination"]);
	       vaccinationDetailsList = eval(" (" + vaccinationDetailsList + ") ");
               //alert(JSON.stringify(vaccinationDetailsList));
	       populateChildVaccination(vaccinationDetailsList);
			
   }, "json");
}


function resetFields(){
   $(".mask").remove();
   $(".addDiv").css("display", "none");
   $(".required").val("");
   $(".requiredVaccn").val("");
   $(".requiredChildVaccn").val("");
}

function resetsFields(){
   $(".mask").remove();
   $(".addDiv").css("display", "none");
   $("#shareComment").val("");
   $(".requiredVaccn").val("");
   $(".requiredChildVaccn").val("");
}



function getSettingsData(){
   $.post("settings/viewsettings", { "patientId" : localStorage.getItem("userid") },
         function(data){
               var settingsList = JSON.stringify(data["settings"]);
               //alert(JSON.stringify(settingsList));
	       settingsList = eval(" (" + settingsList + ") ");
               
	       populateSettings(settingsList);
			
   }, "json");
}


function populateSettings(settingsList){
   var i;
   for(i=0;i < settingsList.length;i++){
      var encVit = parseInt(settingsList[i].encryptvit);
      var encVaccn = parseInt(settingsList[i].encryptvaccn);
      var encAppt = parseInt(settingsList[i].encryptappt);
      var encMed = parseInt(settingsList[i].encryptmed);
      var encExe = parseInt(settingsList[i].encryptexe);
      var encdoc = parseInt(settingsList[i].encryptdoc);
      var encpath = settingsList[i].encryptpath;
      //alert(encpath);
      if(encVit == 1){
         $('#encVit').prop('checked', true);
      }
      if(encVaccn == 1){
         $('#encVaccn').prop('checked', true);
      }
      if(encAppt == 1){
         $('#encAppt').prop('checked', true);
      }
      if(encMed == 1){
         $('#encMed').prop('checked', true);
      }
      if(encExe == 1){
         $('#encExe').prop('checked', true);
      }
      if(encDoc == 1){
         $('#encDoc').prop('checked', true);
      }
      if(encpath == ""){
         $("#keyPath").val("");
      }else{
         $("#keyPath").val(encpath);
      }
   }
   
   localStorage.setItem("encVit", encVit);
   localStorage.setItem("encVaccn", encVaccn);
   localStorage.setItem("encAppt", encAppt);
   localStorage.setItem("encMed", encMed);
   localStorage.setItem("encExe", encExe);
   
}


function updateSettings(){
   var encArray = new Array();
   if(localStorage.getItem("role") == 1){
      $('.encryptCheckbox').each(function(){
         var isChecked = $(this).is(':checked');
                     
         var isEncrypt;
         if(isChecked == true){
            isEncrypt = 1;
         }else{
            isEncrypt = 0;
         }
         encArray.push(isEncrypt);
      });
      
      localStorage.setItem("encVit", encArray[0]);
      localStorage.setItem("encVaccn", encArray[1]);
      localStorage.setItem("encAppt", encArray[2]);
      localStorage.setItem("encMed", encArray[3]);
      localStorage.setItem("encExe", encArray[4]);
      localStorage.setItem("encDoc", encArray[5]);
   }else{
      $('.encryptCheckbox').each(function(){
         var isChecked = $(this).is(':checked');
                     
         var isEncrypt;
         if(isChecked == true){
            isEncrypt = 1;
         }else{
            isEncrypt = 0;
         }
         encArray.push(isEncrypt);
      });
      localStorage.setItem("encVit", 0);
      localStorage.setItem("encVaccn", 0);
      localStorage.setItem("encAppt", 0);
      localStorage.setItem("encMed", 0);
      localStorage.setItem("encExe", 0);
      localStorage.setItem("encDoc", encArray[0]);
   }
   
   var path = $("#keyPath").val();
   localStorage.setItem("encPath", path);
   
   
   
   $.post("settings/updatesettings", { "id": localStorage.getItem("userid"), "encvit": localStorage.getItem("encVit"), "encvaccn": localStorage.getItem("encVaccn"), "encappt": localStorage.getItem("encAppt"), "encmed": localStorage.getItem("encMed"), "encexe": localStorage.getItem("encExe"), "encdoc": localStorage.getItem("encDoc"), "path": localStorage.getItem("encPath")},
         function(data){
              alert("Settings updated successfully"); 
			
   }, "json");
}

function updateSettingsData(){
		localStorage.setItem("encVit", 1);
		localStorage.setItem("encVaccn", 1);
		localStorage.setItem("encAppt", 1);
		localStorage.setItem("encMed", 1);
		localStorage.setItem("encExe", 1);
		localStorage.setItem("encDoc", 1);
		$.post("settings/updatesettings", { "id": localStorage.getItem("userid"), "encvit": 1, "encvaccn": 1, "encappt": 1, "encmed": 1, "encexe": 1, "encdoc": 1, "path": localStorage.getItem("encPath")},
	        function(data){
				 
						       
			}, "json");
		
	    }
            
            
function getSettingsdata(patientid){
   $.post("settings/viewsettings", { "patientId" : localStorage.getItem("patientid") },
         function(data){
               var settingsList = JSON.stringify(data["settings"]);
               //alert(JSON.stringify(settingsList));
	       settingsList = eval(" (" + settingsList + ") ");
               
	       for(i=0;i < settingsList.length;i++){
                  var encVit = parseInt(settingsList[i].encryptvit);
                  var encVaccn = parseInt(settingsList[i].encryptvaccn);
                  var encAppt = parseInt(settingsList[i].encryptappt);
                  var encMed = parseInt(settingsList[i].encryptmed);
                  var encExe = parseInt(settingsList[i].encryptexe);
                  localStorage.setItem("encVit", encVit);
                  localStorage.setItem("encVaccn", encVaccn);
                  localStorage.setItem("encAppt", encAppt);
                  localStorage.setItem("encMed", encMed);
                  localStorage.setItem("encExe", encExe);
               }
			
   }, "json");
}


function showAddDivMask(){
   $('body').append('<div class="mask" id="addMedMask"></div>');
   $("#addMedMask").fadeIn(300);
   $('#addMedMask').css("zIndex", 999);
   $('#addMedMask').css("opacity", 0.8);
}

$("#addMedication").live("click", function(){
   showAddDivMask();
   //var cont = $("#addMedCont").html();
   //$('body').append('<div data-role="content" id="addMedDiv" class="overflow addMed" style="position:fixed;top:7%;left:20%;width:60%;height:90%;"></div>');
   addMedication();
   $("#addMedDiv").css("display", "block");
});

$("#addAppointment").live("click", function(){
   showAddDivMask();
   //var cont = $("#addApptCont").html();
   //$('body').append('<div data-role="content" id="addApptDiv" class="overflow addMed" style="position:fixed;top:7%;left:20%;width:60%;height:90%;"></div>');
   $("#addApptDiv").css("display", "block");
});

$("#addExercise").live("click", function(){
   showAddDivMask();
   //var cont = $("#addExerciseCont").html();
   //$('body').append('<div data-role="content" id="addExerciseDiv" class="overflow addMed" style="position:fixed;top:7%;left:20%;width:60%;height:90%;"></div>');
   $("#addExerciseDiv").css("display", "block");
   addAction();
});



$("#addVaccination").live("click", function(){
   showAddDivMask();
   //var cont = $("#addCVaccnCont").html();
   //$('body').append('<div data-role="content" id="addCVaccnDiv" class="overflow addMed" style="position:fixed;top:7%;left:20%;width:60%;height:90%;"></div>');
   $("#addVaccnDiv").css("display", "block");
   if(localStorage.getItem("isChild") == 1){
      $("#contentAddChildVaccn").css("display", "block");
      $("#contentAddVaccn").css("display", "none");
   }else{
      $("#contentAddVaccn").css("display", "block");
      $("#contentAddChildVaccn").css("display", "none");
   }
});


$("#addVital").live("click", function(){
   showAddDivMask();
   $(".vitFld").css("display", "none");
   $(".vitLabelFld").css("display", "none");
   //var cont = $("#contentaddVit").html();
   //$('body').append('<div data-role="content" id="addVitDiv" class="overflow addMed" style="position:fixed;top:7%;left:20%;width:60%;height:90%;"></div>');
   $("#addVitDiv").css("display", "block");
});


$("#uploadDocument").live("click", function(){
   showAddDivMask();
   //var cont = $("#contentUpload").html();
   //$('body').append('<div data-role="content" id="contUploadDiv" class="overflow addMed" style="position:fixed;top:7%;left:20%;width:60%;height:90%;"></div>');
   //$("#contUploadDiv").html(cont);
   $("#contUploadDiv").css("display", "block");
});

$("#test").live("click", function(){
   document.getElementById("search_brand").value = "Glace";
   document.getElementById("Submit").click();
});


function showPatVit(){
   if(localStorage.getItem("isDocDashboard") == 1){
      var type = localStorage.getItem("type");
   }else{
      var type = $("#selectvitType").val();
   }
   if(type == "Graph"){
      $(".graph").css("display", "block");
      $(".data").css("display", "none");
      for(var i=1; i<=4; i++){
	 
	 $.post("home/getallgraphdata", { "patientId": localStorage.getItem("patientid"), 'id': i },
	 function(data){
				      
	    var graphData = JSON.stringify(data["vitals"]);
            
	    if(graphData != "false"){
	       var graphData = eval(" (" + graphData + ") ");
				       
	       populateGraph(graphData);
					    
					    
	       
	    }else{
               $("#graph").html('<p style="font-size:18px;width:100%;" class="fl"><b>There are no health statistics.</b></p>');
            }
		getSettingsdata(localStorage.getItem("patientid"));		    
				    
	 }, "json");
      }
			   
			   
			   
		    
	       
   }else{
      $(".graph").css("display", "none");
      $(".data").css("display", "block");
      var date = new Date();
		    getVital(date);
		    
		    if(localStorage.getItem("edit") == "1"){
				var vitId = localStorage.getItem("editId");
				$.post("vitals/viewselvital", { "id": vitId },
					function(data){
					  var vitData = JSON.stringify(data["vital"]);
					  //alert(vitData);
					  vitData = eval(" (" + vitData + ") ");
					    editVital1(vitData);
					
					}, "json");
		    }
   }
}


function savePatientVaccinationStatus(val){
   var vid = $("#vnId").val();
   if(localStorage.getItem("isChildVaccn") == 1){
      $.post("vaccination/savevaccnstatus", { "vid": vid, "status": val, "type": 1},
		  function(data){
			window.location.href="vaccination";
					
		  }, "json");
   }else{
      $.post("vaccination/savevaccnstatus", { "vid": vid, "status": val, "type": 0 },
                     function(data){
                           window.location.href="vaccination";
                                           
                     }, "json");
   }
   resetFields();
}


function populateGraph(graphData){
			    
			    var date1Axis = new Array();
			    var date2Axis = new Array();
			    var date3Axis = new Array();
			    var date4Axis = new Array();
			    var attr1Axis = new Array();
			    var attr2Axis = new Array();
			    var attr3Axis = new Array();
			    var attr4Axis = new Array();
                            var highRange1 = new Array();
			    var lowRange1 = new Array();
			    var highRange2 = new Array();
			    var lowRange2 = new Array();
			    var highRange3 = new Array();
			    var lowRange3 = new Array();
			    var highRange4 = new Array();
			    var lowRange4 = new Array();
			    var title = "";
			    var val;
			    for ( var i in graphData) {
				    title = graphData[i].name;
				    val = parseInt(graphData[i].vid);
				    var date = graphData[i].createddate;
				    date = date.split("-");
				    date = date.join("/");
				    //alert(date);
				    //alert(new Date(date));
				    //if(graphData[i].attributename1 != ""){
					    attr1Axis.push(parseInt(graphData[i].attrvalue1));
					    date1Axis.push(date);
					    highRange1.push(110);
					    lowRange1.push(70);
				    //}
				    if(val == 1 || val == 2){
					    if(graphData[i].attributename2 != ""){
						   attr2Axis.push(parseInt(graphData[i].attrvalue2));
                                                   highRange2.push(110);
                                                   lowRange2.push(70);   
						    //date2Axis.push(attr2Axis);
					    }
				    }
				    if(val == 1){
					    if(graphData[i].attributename3 != ""){
						   attr3Axis.push(parseInt(graphData[i].attrvalue3));
                                                   highRange3.push(110);
                                                   lowRange3.push(70);   
						    //date3Axis.push(attr3Axis);
					    }
					    if(graphData[i].attributename4 != ""){
						    attr4Axis.push(parseInt(graphData[i].attrvalue4));
                                                   highRange4.push(110);
                                                   lowRange4.push(70);
						    //date4Axis.push(attr4Axis);
					    }
				    }
				    
			    }
			    //alert(attr1Axis);
			    //alert(attr2Axis);
			    //alert(attr4Axis);
			    //alert("1--"+date1Axis);
			    var titles;
			    
			    if(graphData[i].attributename1 == ""){
				    titles = title;
			    }else{
				    titles = graphData[i].attributename1;
			    }
			    
			    
			    if(val > 0){
				    $("#graph").append('<div id="'+val+''+graphData[i].attributename1+'Chart" style="width: 100%; height: 300px;"></div>');
				    
				    
			    
				    $('#'+val+''+graphData[i].attributename1+'Chart').highcharts({
						    title: {
							text: title,
							x: -20 //center
						    },
						    subtitle: {
							text: '',
							x: -20
						    },
						    xAxis: {
							categories: date1Axis
						    },
						    yAxis: {
							title: {
							    text: titles
							},
							plotLines: [{
							    value: 0,
							    width: 1,
							    color: '#808080'
							}]
						    },
						    tooltip: {
							valueSuffix: '¡C'
						    },
						    legend: {
							layout: 'vertical',
							align: 'right',
							verticalAlign: 'middle',
							borderWidth: 0
						    },
						    series: [{
							name: titles,
							data: attr1Axis
						    },
						    {
							name: "high Range",
							data: highRange1
						    },
						    {
							name: "Low Range",
							data: lowRange1
						    }]
						});
				    
				    if(val == 1 || val == 2){
					    $("#graph").append('<div id="'+val+''+graphData[i].attributename2+'Chart" style="width: 100%; height: 300px;"></div>');
					    $('#'+val+''+graphData[i].attributename2+'Chart').highcharts({
						    title: {
							text: title,
							x: -20 //center
						    },
						    subtitle: {
							text: '',
							x: -20
						    },
						    xAxis: {
							categories: date1Axis
						    },
						    yAxis: {
							title: {
							    text: graphData[i].attributename2
							},
							plotLines: [{
							    value: 0,
							    width: 1,
							    color: '#808080'
							}]
						    },
						    tooltip: {
							valueSuffix: '¡C'
						    },
						    legend: {
							layout: 'vertical',
							align: 'right',
							verticalAlign: 'middle',
							borderWidth: 0
						    },
						    series: [{
							name: graphData[i].attributename2,
							data: attr2Axis
						    },
						    {
							name: "high Range",
							data: highRange2
						    },
						    {
							name: "Low Range",
							data: lowRange2
						    }]
						});
				    }
				    
				    if(val == 1){
					    $("#graph").append('<div id="'+val+'TriglyChart" style="width: 100%; height: 300px;"></div>');
					    $("#graph").append('<div id="'+val+'TotalChart" style="width: 100%; height: 300px;"></div>');
					    $('#1TriglyChart').highcharts({
						    title: {
							text: title,
							x: -20 //center
						    },
						    subtitle: {
							text: '',
							x: -20
						    },
						    xAxis: {
							categories: date1Axis
						    },
						    yAxis: {
							title: {
							    text: 'Trigly'
							},
							plotLines: [{
							    value: 0,
							    width: 1,
							    color: '#808080'
							}]
						    },
						    tooltip: {
							valueSuffix: '¡C'
						    },
						    legend: {
							layout: 'vertical',
							align: 'right',
							verticalAlign: 'middle',
							borderWidth: 0
						    },
						    series: [{
							name: 'Trigly',
							data: attr3Axis
						    },
						    {
							name: "high Range",
							data: highRange3
						    },
						    {
							name: "Low Range",
							data: lowRange3
						    }]
						});
					    
					    $('#1TotalChart').highcharts({
						    title: {
							text: title,
							x: -20 //center
						    },
						    subtitle: {
							text: '',
							x: -20
						    },
						    xAxis: {
							categories: date1Axis
						    },
						    yAxis: {
							title: {
							    text: 'Total'
							},
							plotLines: [{
							    value: 0,
							    width: 1,
							    color: '#808080'
							}]
						    },
						    tooltip: {
							valueSuffix: '¡C'
						    },
						    legend: {
							layout: 'vertical',
							align: 'right',
							verticalAlign: 'middle',
							borderWidth: 0
						    },
						    series: [{
							name: 'Total',
							data: attr4Axis
						    },
						    {
							name: "high Range",
							data: highRange4
						    },
						    {
							name: "Low Range",
							data: lowRange4
						    }]
						});
				    }
			    }
		    }