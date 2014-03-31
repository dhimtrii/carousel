var dateArr = new Array();
var endDateArr = new Array();
var appDivlist = new Array();
var changeMonth;
var dateMonth;
var dayString;
var actionCollection;
var pctCollection;
var specialityList = "";
var DoctorsList = "";
var selectedDayColor = "#666465";
var nonSelectedDayColor = "#CCCCCC";
var medPanelObj = "Medicine";
var actPanelObj = "Action";
var actionTypeId;
var appointmentDetailsList = "";
var specialityDetailsList = "";
var medTimeDaySelected = { isMondayObj : false, isTuesdayObj : false, isWednesdayObj : false, isThursdayObj : false, isFridayObj : false, isSaturdayObj : false, isSundayObj : false };
var medicationTimes = new Array();
var specialityText;
var docName;
var remindMeData1;
var Fielderror;
var currDateTime;
var cntMedication;
var speciality = {};
var appointment = {};
var actionCalendar = {};
var action = {};
var pct = {};
var exercise = {};
var state = {};
var stateList = {};
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


$(function() {
    
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
            _(this.collection.models).each(function(item) { // in case collection is not empty
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
            currentDates(divDate);
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
  
    appointment.AppointmentListsView = Backbone.View.extend({ el : $("#apptContent"), // attaches `this.el` to an existing
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
	    _(this.collection.models).each(function(item) { // in case collection is not empty
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
        }
    });
  
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
        }
    });
  
  
    /********************Appointment Backbone Ends Here*********************/
  
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
  
    /******************PCT Backbone Starts here************************/
    state.State = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetStates });
  
    pct.addPCT = Backbone.Model.extend({ urlRoot : window.servicePath + urlAddPCT });
  
    pct.editPCT = Backbone.Model.extend({ urlRoot : window.servicePath + urlEditPCT });
  
    pct.deletePCT = Backbone.Model.extend({ urlRoot : window.servicePath + urlDeletePCT });
    
    exercise.Exercise = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetExeType });
  
    state.State = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetStates });
  
    pct.PCT = Backbone.Model.extend({ urlRoot : window.servicePath + urlGetPct });
  
    pct.pctList = Backbone.Collection.extend({ model : pct.PCT });
  
    pct.pctListView = Backbone.View.extend({ el : $("#pctContents"), // attaches `this.el` to an existing
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
        },
	
	clicked : function(e) {
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
});    
/*************Patient Appointment Starts Here**************/

function initAppoint(month) {
    collection = "";
    var date = new Date();
    dateMonth = selectedDate.getMonth() + 1;
    
    var appointmentModel = new appointment.Appointment({});
    
    appointmentListSuccess = function() {
	    appointmentDetailsList = JSON.stringify(appointmentModel.get("appointment"));
	    appointmentDetailsList = eval(" (" + appointmentDetailsList + ") ");
	    new appointment.AppointmentListCalView({ apptCollection : appointmentDetailsList });
    };
    
    appointmentListError = function() {
	    openErrorModal(errorTitle, serverErrorMessage);
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
            currentDates(divDate);
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


function initSpecialityDoctor() {
    
    var specialityModel = new speciality.Speciality({});
    specialityListSuccess = function() {
        specialityDetailsList = JSON.stringify(specialityModel.get("specialtydoctor"));
        specialityDetailsList = eval(" (" + specialityDetailsList + ") ");
        populateSpeciality();
    };
    
    specialityListError = function() {
        openErrorModal(errorTitle, serverErrorMessage);
    };
    
    var specialityJSON = { patientId : storage.getItem(patientId) };
    
    specialityModel.fetch({ type : postMethod, success : specialityListSuccess, error : specialityListError, data : JSON.stringify(specialityJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}

$("#deleteAppointment").live("click", function() {
                             if (confirm(deleteAppt)) {
                             var deleteAppointmentModel = new appointment.Deleteappointment({});
                             deleteAppointmentSuccess = function() {
                             deleteAppointmentDetails = JSON.stringify(deleteAppointmentModel.get(statusObj));
                             if (deleteAppointmentDetails == trueObj) {
                             
                             
                             openErrorModal(successTitle, successDeleteAppt);
                             hideCommOption();
                             backPath = "patient_appointment";
                             gotoPath("#patient_appointment");
                             } else {
                             
                             
                             openErrorModal(errorTitle, errorDeleteAppt);
                             }
                             };
                             
                             deleteAppointmentError = function() {
                             openErrorModal(errorTitle, serverErrorMessage);
                             };
                             
                             var deleteAppointmentJSON = { "patientAppointmentId" : appointmentModel.get("id"), patientId : storage.getItem(patientId) };
                             
                             deleteAppointmentModel.fetch({ type : postMethod, success : deleteAppointmentSuccess, error : deleteAppointmentError, data : JSON.stringify(deleteAppointmentJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
                             }
                             });


function populateSpeciality() {
    new speciality.SpecialityListView({ specCollectionModel : specialityDetailsList });  
}


$("#docSpecialityText").live("change", function(){
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


function isValid(val, field) {
    if (isNaN(val)) {
        //$("#" + field).css("border", "2px solid red");
        $("#inputErrorMsg").css("display", "block");
        $("#inputErrorMsg").html("Please Enter valid Number for the fields marked in red.");
        Fielderror = 1;
    }
}


function createForm() {
	var content = '<div id="addAppointmentDiv" style="">' + '<label class="hiddenLabel none" id="inputErrorMsg"></label>' + '<div style="display:block;padding-top:5%;" class="AppointmentOperation fr">' + '<div class="saveAppointmentOperation"><a style="padding: 8px 20px; margin-right: 10px;" class="grayButton cancelMedication" onclick="cancelPatientAppointment()"> Cancel </a> <a onclick="savePatientAppointment();return false;" style="padding:8px 20px;" class="medicationSaveButton blueButton" href="javascript:void(0);"> Save </a> </div>' + '</div>' + '<br/>' + '<form id="Appt">' + '<div class="addApptDiv">' + '<div class="fieldDiv">' + '<div class="fl inputLabel">Speciality*: </div>' + '<div class="fr width60" id="docSpecialityTextDiv">' + '<select id="docSpecialityText" data-role="none" class="required"></select>' + '</div>' + '</div>' + '</div>' + '<br/>' + '<input type="hidden" id="docSpecialityId" value="" />' + '<div class="fieldDiv">' + '<div class="fl inputLabel">Doctor Name*: </div>' + '<div class="fr width60" id="docNameDiv">' + '<select id="docName" data-role="none" class="required"></select>' + '</div>' + '</div>' + '</div>' + '<br/>' + '<input type="hidden" id="docId" value="" />' + '<input type="hidden" id="isUpdate" value="" />' + '<div class="fieldDiv">' + '<div class="fl inputLabel">Appointment: </div>' + '<div class="fr width60">' + '<input type="checkbox" id="appointmentNeed" value="">' + '</div>' + '</div>' + '<br/>' + '<div class="fieldDiv">' + '<div class="fl inputLabel">From*: </div>' + '<div class="fr width60">' + '<input type="text" id="fromDate" class="datetimepicker width100 required" value="" readonly/>' + '</div>' + '</div>' + '<br/>' + '<div class="fieldDiv none dateVisible" id="toDateDiv">' + '<div class="fl inputLabel none dateVisible">To*: </div>' + '<div class="fr width60 none dateVisible">' + '<input type="text" id="toDate" class="datetimepicker width100 none required dateVisible" value="" readonly />' + '</div>' + '<br/>' + '</div>' + '<div class="fieldDiv">' + '<div class="fl inputLabel">Reminder1*: </div>' + '<div class="fr width60">' + '<input type="tel" class="width40 required" id="reminder1Data" value="" />' + '<select class="width50" data-theme="a" name="select-choice-1" id="reminder1">' + '<option value="H">Hours</option>' + '<option value="D">Days</option>' + '</select>' + '</div>' + '</div>' + '<br/>' + '<div class="fieldDiv">' + '<div class="fl inputLabel">Reminder2*: </div>' + '<div class="fr width60">' + '<input type="tel" class="width40 required" id="reminder2Data" value="" />' + '<select class="width50" data-theme="a" name="select-choice-1" id="reminder2">' + '<option value="H">Hours</option>' + '<option value="D">Days</option>' + '</select>' + '</div>' + '</div>' + '<br/>' + '<div class="fieldDiv">' + '<div class="fl inputLabel">Frequency*: </div>' + '<div class="fr width60">' + '<div data-role="fieldcontain" data-theme="a">' + '<select data-theme="a" name="select-choice-1" id="frequency" class=" required">' + '<option value="Daily">Daily</option>' + '<option value="Weekly">Weekly</option>' + '<option value="Monthly">Monthly</option>' + '</select>' + '</div>' + '</div>' + '</div>' + '<br/>' + '<div class="fieldDiv">' + '<div class="fl inputLabel">Description: </div>' + '<div class="fr width60">' + '<input class="width100" type="text" id="descriptionData"/>' + '</div>' + '</div>' + '</div>' + '</form>' + '</div>';
    
	return content;
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
            }
        }
    });
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
        
        apptSuccess = function() {
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
            
        };
        
        apptError = function() {
            openErrorModal(errorTitle, serverErrorMessage);
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
	    openErrorModal(errorTitle, serverErrorMessage);
    };
    
    var actionJSON = { patientId : storage.getItem(patientId), "date" : date };
    
    actionModel.fetch({ type : postMethod, success : actionListSuccess, error : actionListError, data : JSON.stringify(actionJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
}


$('#patient_action').live('pageshow', function(event) {
    backPath = "patient_action";
    if (!action.isEditAction) {
        pageName = 'patient_action';
        cnt = 0;
        var disDate = getDisplayDateMonth(currentDate);
        $("#actionsDateContent").html(disDate);
        setTimeout(function() {
            initAction(getCurrentDate(action.selectedDate));
        }, 200);
        calCheck = 0;
        $("#actionsDateContent").live("click", function() {
            openNewCalenderMedActn('hexagonActn');
        });
        $("#prevAction").off();
        $("#prevAction").live("click", function(){
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
        $("#nextAction").live("click", function(){
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


function getlabsPresc(id) {
	var labsPrescModel;
	if(id == 1){
        labsPrescModel = new communication.prescDet({});
	}else{
        labsPrescModel = new communication.labsDet({});
	}
    
    labsPrescListSuccess = function() {
        labsPrescDetailsList = JSON.stringify(labsPrescModel.get("patientId"));
        labsPrescDetailsList = eval(" (" + labsPrescDetailsList + ") ");
        new communication.labsPrescView({ labsPrescCollection : labsPrescDetailsList });
    };
    
    labsPrescListError = function() {
	    openErrorModal(errorTitle, serverErrorMessage);
    };
    
    var inputJSON = { "patientId" : storage.getItem(patientId) };
    
    labsPrescModel.fetch({ type : postMethod, success : labsPrescListSuccess, error : labsPrescListError, data : JSON.stringify(inputJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}


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
	    openErrorModal(errorTitle, serverErrorMessage);
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

$(document).on("click", "#backToPCTList", function() {
    backPath = "patient_PCT";
    gotoPath("#patient_PCT");
});



/********************Add/Edit/Delete PCT Starts Here**********************/

function getStatesList() {
    var stateseModel = new state.State({});
    
    statesListSuccess = function() {
        statesDetailsList = JSON.stringify(stateseModel.get("state"));
        state.statesList = eval(" (" + statesDetailsList + ") ");
        stateList = state.statesList;
    };
    
    statesListError = function() {
        openErrorModal(errorTitle, serverErrorMessage);
    };
    
    stateseModel.fetch({ type : postMethod, success : statesListSuccess, error : statesListError, contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}

$("#deletePCT").live("click", function() {
    if (confirm(deletePCT)) {
                     var deletePCTModel = new pct.deletePCT({});
                     deletePCTSuccess = function() {
                     deletePCTDetails = JSON.stringify(deletePCTModel.get(statusObj));
                     if (deletePCTDetails == '"' + trueObj + '"') {
                     openErrorModal(successTitle, successDeletePCT);
                     } else {
                     openErrorModal(errorTitle, errorDeletePCT);
                     }
                     getPCTView();
                     
                     };
                     
                     deletePCTError = function() {
                     openErrorModal(errorTitle, serverErrorMessage);
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
                openErrorModal(successTitle, successAddPCT);
            } else {
                openErrorModal(successTitle, successEditPCT);
            }
            getPCTView();
            
        } else {
            if ($("#isUpdate").val() == "0") {
                
                var messg = "Problem saving pin lock";
                openErrorModal(errorTitle, errorAddPCT);
            } else {
                openErrorModal(errorTitle, errorEditPCT);
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
        openErrorModal(errorTitle, serverErrorMessage);
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


/********************Add/Edit/Delete Medication Starts Here**********************/

function getDosageType() {
    var dosageTypeModel = new medication.DosageType({});
    
    dosageTypeListSuccess = function() {
	    dosageTypeDetailsList = JSON.stringify(dosageTypeModel.get("dosetype"));
	    medication.dosageTypeList = eval(" (" + dosageTypeDetailsList + ") ");
    };
    
    dosageTypeListError = function() {
	    openErrorModal(errorTitle, serverErrorMessage);
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
	    openErrorModal(errorTitle, serverErrorMessage);
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
	    openErrorModal(errorTitle, serverErrorMessage);
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
        
	    medicationDetailsList = JSON.stringify(medicationModel.get("getPatientDayViewDetails"));
        
	    medicationDetailsList = eval(" (" + medicationDetailsList + ") ");
	    new medication.MedicationListView({ medCollection : medicationDetailsList });
    };
    
    medicationListError = function() {
	    openErrorModal(errorTitle, serverErrorMessage);
    };
    
    
    var medicationJSON = { "date" : date.toString(), "patientid" : storage.getItem(patientId) };
    
    
    
    medicationModel.fetch({ type : postMethod, success : medicationListSuccess, error : medicationListError, data : JSON.stringify(medicationJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
}

$(document).on("click", "#editMedication", function(e) {
    var cont = $("#medication_edit").html();
    $("#headerMedDetail").append(cont);
    $("#medNameEdit").show();
    $("#cancelEditMed").show();
    $("#cancelAddMed").css("display", "none");
    $("#medicineSelectDiv").css("display", "none");
    $("#medOpName").html("Edit Medication");
    $("#editSaveMedication").html("Save");
               
    medId = $("#patientMedicationId").val();
    medicationModel = medication.medicationtList.get(medId);
    $("#medNameEdit").html(medicationModel.get("medication").name);
    $("#medicationDoseEdit").val(medicationModel.get("dosage"));
            
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
        openErrorModal(errorTitle, errorMsg);
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
            fromDate = currentDates(fromDate);    
        }
        var toDate = $("#medicationToDateEdit").val();
        if(toDate.indexOf("/") >= 0){
            toDate = currentDates(toDate);
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
                        openErrorModal(successTitle, successAddMed);
                    } else {
                        openErrorModal(successTitle, successEditMed);
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
                        openErrorModal(errorTitle, errorAddMed);
                    } else {
                        openErrorModal(errorTitle, errorEditMed);
                    }
               }
            };
               
               medError = function() {
               openErrorModal(errorTitle, serverErrorMessage);
               };
               
               medModel.fetch({ type : postMethod, success : medSuccess, error : medError, data : JSON.stringify(medJson), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true, async : false });
               }
               });

$(document).on("click", "#medicationFreqEdit", function() {
    showMask();
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
    removeLoading();
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
        openErrorModal(errorTitle, errorMsg);
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
        removeLoading();
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

$("#addMedication").live("click", function() {
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


$(document).on("click", "#cancelEditMed", function() {
    cnt = 0;
    expand = true;
    $("#medication_edit_content").remove();
    slideDiv("headerMedDetail");
    backPath = "patient_medicine";
    gotoPath('#patient_medicine');
});


/********************Add/Edit/Delete Medication Ends Here**********************/



/********************Common Functions Starts here******************************/

/******************************************************
 
 *******************************************************/
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




/******************************************************
 
*******************************************************/
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

/******************************************************
 
 *******************************************************/
function strToJson(str) {
    eval("var x = " + str + ";");
    return JSON.stringify(x);
}



/******************************************************
 This function is used to get the local time format from UTC timestamp.
 UTC time stamp is passed as parameter and local time in format YYYY-MM-DD is returned.
 *******************************************************/
function getDateMonth(date){
    var dateFormatNew = date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate();
    return dateFormatNew;
}


/******************************************************
 This function is used to get the local time format from UTC timestamp.
 UTC time stamp is passed as parameter and local time in format MM-DD, YYYY, HH:mm.
 *******************************************************/
function getMonthDateFormat(time){
    if(time.indexOf(".") >= 0){
        time = time.substr(0, time.indexOf("."));
    }
    time = time.split("-");
    time = time.join("/");
    time = new Date(time);
    var crMonth = time.getMonth();
    var crDate = time.getDate();
    var crYear = time.getFullYear();
    var crHour = time.getHours();
    var crMinute = time.getMinutes();
    crMonth = shortMonthNames[crMonth];
    var newDate = crMonth+" "+crDate+", "+crYear+", "+crHour+":"+crMinute;
    return newDate;
}


/********************Common Functions ends here******************************/






/******************************************************
 
 *******************************************************/
function getReminder(reminder) {
    if (reminder.search("#H")) {
        reminder = reminder.replace("#H", " Hours");
    } else {
        reminder = reminder.replace("#D", " Days");
    }
    return reminder;
}


/******************************************************
 
 *******************************************************/
function fadeIn(id) {
    $("#" + id).fadeIn(300);
}


/******************************************************
 
 *******************************************************/
function fadeOut(id) {
    $("#" + id).fadeOut(300);
}


/******************************************************
 
 *******************************************************/
function remove(id) {
    $("#" + id).remove();
}



/******************************************************
 
 *******************************************************/
$("#chngPwdBackbtn").live("click", function() {
    backPath = backPath.replace("#", "");
    gotoPath("#"+backPath);
});



/******************************************************
 
 *******************************************************/
$(".patient_Exit").live("click", function(){
    document.addEventListener('pause', function () { console.log('pause');
    var status = Backbone.Model.extend({ urlRoot : "http://10.1.7.142:8080/rest-medrubik/patient/setstatus" });
    var devStatusModel = new status({});
    devStatusSuccess = function() {
        //devStatusList = JSON.stringify(devStatusModel.get("users"));
        //devStatusList = eval(" (" + devStatusList + ") ");
    };
                                                  
    devStatusError = function() {
        openErrorModal(errorTitle, serverErrorMessage);
    };
                                                  
    var devStatusJSON = {"userid":"5","status":"false","role":"1","token":"anotherdevicetoken","loginstatus":"true","device":"iPhone"};
                                                  
    devStatusModel.fetch({ type : postMethod, success : devStatusSuccess, error : devStatusError, data : JSON.stringify(devStatusJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
                                                  }, false);   
}); 
  
  
  /***************************************
   This event is used to navigate to the forgot password page.
   This event is not in use for current build, So commented
  ******************************************
  $("#forgot_link").click(function(event) {
        resetPasswordFailed = 0;
        lastUsernameResetPassword = "";
        $("#reset_password_message").removeClass("block").addClass("none");
        gotoPath('#forgot_password');
  });*/
  
  
  /***************************************
   This event is used to navigate to the Contacts page.
   This event is not in use for current build, So commented
   ******************************************
  $("#contact_link").click(function(event) {
        backPath = "contactPage";
        gotoPath('#contactPage');
  });*/
  
  
  /******************************************************
   
   *******************************************************/
  $('#login').live('pageshow', function(event) {
    loginFailed = 0;
    lastUsername = "";
    // hide all the error messages when login div is loaded
    $("#login_error_message").html("");
  });
  
  
  
  
  
/******************************************************
   
*******************************************************/
$("#login_link").click(function(event) {
    gotoPath('#login');
});


/******************************************************
 
 *******************************************************/
$("#unlockApplication").live("click", function(event) {
    var pwd = $("#applicationPassword").val();
    if (pwd == "") {
        $("#errorPassword").html("Please enter pin");
    } else if (pwd == storage.getItem("PIN")) {
        defaultLogin();
    } else {
        $("#errorPassword").html("Invalid pin");
    }
});




function defaultLogin() {
    application.username = storage.getItem("username");
    if (application.username != null && application.username != "") {
	    application.password = storage.getItem("password");
	    authenticateUser(application.username, application.password);
    }
}
