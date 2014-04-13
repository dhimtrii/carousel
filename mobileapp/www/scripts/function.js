var inboxMsgURL = "conversation/inbox";
var updateUnreadStatusURL = "";
var imageURL = "";
var contactURL = "conversation/contacts";
var readUnreadCntURL = "";
var unreadCntSelURL = "";
var deleteMsgURL = "";
var forwardMsgURL = "";
var subjectURL = "";
var composeMsgURL = "conversation/compose";
var detailMsgURL = "conversation/detailMsg";
var syncContactURL = "conversation/syncContact";
var messageSubjectArr = {};
var contactsArr = {};
var messageArr = {};

//Global Variables
var recNames = new Array();
var recIds = new Array();
var pageType = 0;
var threadLists = new Array();
var recipientListDom = "";
var crdateCnt = 0;
var msgFromName = "";
var isNewCompose = 0;
var isForward = 0;
var sendPhoto = 0;



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
  
  
  /***************Communication Backbone Starts Here******************/
  
  
  
  
  messageArr.updateUnreadStatus = Backbone.Model.extend({ urlRoot : window.servicePath + updateUnreadStatusURL });
  
  messageArr.Image = Backbone.Model.extend({ urlRoot : window.servicePath + imageURL });
  
  messageArr.readUnreadCnt = Backbone.Model.extend({ urlRoot : window.nodeURL + readUnreadCntURL });
  
  messageArr.readUnreadCntForUser = Backbone.Model.extend({ urlRoot : window.nodeURL + unreadCntSelURL });
  
  
  messageArr.DeleteCommunication = Backbone.Model.extend({ urlRoot : window.nodeURL + deleteMsgURL });
  
  
  messageArr.ForwardCommunication = Backbone.Model.extend({ urlRoot : window.nodeURL + forwardMsgURL });
  
  contactsArr.syncContact = Backbone.Model.extend({ urlRoot : window.servicePath + syncContactURL });
  
  contactsArr.contact = Backbone.Model.extend({ urlRoot : window.servicePath + contactURL });
  
  contactsArr.contactList = Backbone.Collection.extend({ model : contactsArr.contact});
  
  
  /***
  * This is backbone view for displaying the list of physician and care manager based upon patient or physician login
  ***/
  contactsArr.contactListView = Backbone.View.extend({ initialize : function() {
        commCollection = new contactsArr.contactList(this.options.contactCollectionModel);
        this.collection = commCollection;
        this.render();
    },
                                                          
    render : function() {
        contactListCnt = 0;
        $(".recipientListDiv").css("display","block");
        var self = this;
        recipientListDom = "";
        _(this.collection.models).each(function(item) { // in case
            self.appendItem(item);
        }, this);
                                                     $(".recipientListDiv").append(recipientListDom);
        if(contactListCnt == 0){
            $(".recipientListDiv").append("<div class='widthAuto textCenter font12'>There are no contact with this name. Please specify some other name.</div>")
        }
                                                          
    },
                                                        
    appendItem : function(item) {
        this.model = item;
        var userId = item.get("friendId");
        var fName = item.get("firstname");
        var lName = item.get("lastname");
        var fullName = fName+" "+lName;
        var phoneNumber = item.get("phone");
        var profileImage = item.get("profileImagePath");
       
        //List gets sorted once user types in with matching text
        //if (commcontactList.toLowerCase().indexOf(nameList.toLowerCase()) >= 0) {
            recipientListDom = recipientListDom + '<div  id="' + userId + '_' + fullName+'" class="width100 inlineBlock searchList grayBorderBottom pointer">'+
                '<div class="fl inlineFlex" style="width:20%;">'+
                '<div class="fl listImageDiv bgCenter bgNoRepeat inlineFlex overflowhidden grayBG">';
            if(profileImage != null && profileImage != ""){
                recipientListDom = recipientListDom + '<img class="auto faceImageSize" src="data:image/jpg;base64,'+profileImage+'"/>';
            }else{
                recipientListDom = recipientListDom + '<div class="auto faceImageDivSize textCenter bebasLite font18  whiteText shadowNone">'+getDisplayInitialName(fullName)+'</div>';
            }
            recipientListDom = recipientListDom + '</div>'+
                    '</div>'+
                    '<div id="nameHeader" class="userListName fl" style="min-width:200px;width:75%;">'+
                    '<div class="width100 font16" style="line-height:8px;">'+fullName+'</div>'+
                    '<div class="width100 font11 grayText patInfo" id="info_'+userId+'" style="line-height:25px;">'+
                    '<div style="width:30%;" class="fl grayText recTypeInfo">'+phoneNumber+'</div>'+
                    '<div style="width:70%;" class="fr textRight blueText font10 recSpecInfo">Available</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                                                     
                                                     
                contactListCnt = contactListCnt + 1;
                                                          
        //}
    },
  });
  
  
  
  messageSubjectArr.subject = Backbone.Model.extend({ urlRoot : window.servicePath + subjectURL });
  
  messageSubjectArr.subjectsList = Backbone.Collection.extend({ model : messageSubjectArr.subject });
  
  
  /***
  * This is backbone view for displaying all the existing subjects in a autopopulated list based upon the matching text user has entered
  ***/
  messageSubjectArr.subjectsListView = Backbone.View.extend({ initialize : function() {
        specCollection = new messageSubjectArr.subjectsList(this.options.subCollectionModel);
                                                          
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

  messageArr.commposeMessage = Backbone.Model.extend({ urlRoot : window.nodeURL + composeMsgURL });
  
  

  messageArr.detailMessage = Backbone.Model.extend({ urlRoot : window.nodeURL + detailMsgURL });
  
  
  messageArr.detailMsgList = Backbone.Collection.extend({ model : messageArr.detailMessage });
  
  
  /***
   * This is backbone view for displaying the message page for a particular thread
   * The recipient name is displayed in short name format with distinction of user with status "Out of office"
   * Also based upon the context user and resolution different view is displayed
   ***/
  messageArr.detailMsgListView = Backbone.View
  .extend({ el : $("#contentPatientCommunicationCompose"), // attaches `this.el` to an existing
    // element.
    initialize : function() {
        reviewsCollection = new messageArr.detailMsgList(this.options.inboxCollection);
        msgBodyText = "";
        this.collection = reviewsCollection;
        this.render();
    },
          
    render : function() {
        var self = this;
        var ind;
        crdateCnt = 0;
        _(this.collection.models).each(function(item) { 
                self.appendItem(item);
        }, this);
        /*$("#bottomOfDiv").remove();
        $("#msgNewBody").html(msgBodyText);
        removeSpinner();
        setTimeout(function() {
            scrollToLast();
            isDetailedCommunication = 1;
        }, 300);
          
        $("#contentConversation").niceScroll({cursorcolor:"#FFF"});*/
    },
          
    appendItem : function(item) {
        this.model = item;
        var msgId = item.get('messageId');
        var msgDetail = item.get('msgDetail');
        var msgFrom = item.get('fromUser');
        var msgBody = item.get('msgText');
        var sentTime = item.get('sentDate');
        var readTime = item.get('sentDate');
        var attachment = item.get('attachmentPath');
        var msgListId = item.get("msgListId");
        storage.setItem("conversationListId", msgListId);
        //only once the execution to be made to get the thread information
        if(crdateCnt == 0){
            shortNameRecipient = new Array();
            var thread = item.get("msgThread");
            var recNameList = getRecepientList(msgDetail, msgFrom, 0);
            //shortNameList = getShortName(shortNameRecipient.join(","));
            $("#toListBlock").html(recNameList);
            var image = item.get('attachmentPath');
            crdateCnt = 1;
        }
        //sentTime = getInboxDate(sentTime, 1);
        //var toName = shortNameList.split(",");
        var sentRead = '';
        var readTimes = "";
        //Display the read on time if the communication recipient is not more than one and if the message is read by the recipient
        /*if(toName.length == 1){
            if(readTime != null && readTime != "" && readTime != "null"){
                readTimes = getInboxDate(readTime, 1);
            }
        }*/
        var imageDetail = "";
          
        createMsgBody(msgBody, attachment, sentTime, readTimes, msgFrom, msgFromName, imageDetail);
    }
          
  });
  
  messageArr.inboxMsg = Backbone.Model.extend({ urlRoot : window.nodeURL + inboxMsgURL });
  
  messageArr.inboxMsgList = Backbone.Collection.extend({ model : messageArr.inboxMsg });
  
  
  /***
  * This is the backbone view for loading the inbox for patient/doctor based upon the information received.
  * Based on the role the read and unread count is displayed
  ***/
  messageArr.inboxMsgListView = Backbone.View
  .extend({ el : $("#contentPatientCommunication"), // attaches `this.el` to an existing
          // element.
    initialize : function() {
        reviewsCollection = new messageArr.inboxMsgList(this.options.inboxCollection);
        msgBodyText = "";
        inboxCollections = reviewsCollection;
        this.collection = reviewsCollection;
        this.render();
    },
          
    render : function() {
        var self = this;
        var readUnreadCnt = "";
        threadLists = new Array();
        $("#contentInbox").html("");
        _(this.collection.models).each(function(item) { // in case
            self.appendItem(item);
        }, this);
        
        removeSpinner();
        $("#contentInbox ").niceScroll({cursorcolor:"#FFF"});
        if(threadLists.length <= 0){
          $("#contentInbox").html("");
        }
    },
          
    appendItem : function(item) {
        this.model = item;
        var msgId = item.get("msgListId");
        var msgBody = item.get("lastMessage");
        var dateTime = item.get("sentDate");
        time = getInboxDate(dateTime, 0);
        var msgDetail = item.get("msgDetail");
        var isread = item.get("isread");
        var msgfromId = item.get("fromUser");
        var recNameList = getRecepientList(msgDetail, msgfromId, 0);
        //var recNameListDom = getRecListDom(recNameList);
        var thread = item.get("msgThread");
        var unreadCnt = item.get("unreadCnt");
        if(msgBody == "" || msgBody == null){
          msgBody = "Attachment";
        }
        threadLists.push(thread);
        storage.setItem("threadListArray", threadLists);
        //var subject = item.get("msgsubject");
        var subjectText = "";
        createInboxDom(thread, subjectText, time, msgBody, recNameList, isread, unreadCnt);
    }
          
 });
  
/*******************************Communication Backbone Ends Here*************************************/
  
  
});

/****************************************Communication Starts Here***********************************/

/***
* This function is used to fetch all the threads associated with the logged in user from web-service.
* It also varies for physician where this loads all the threads sent/received by the selected user and 
* also the logged in user is also in the recipient list.
***/
function getInboxMsgList() {
    threadLists = new Array();
    var inboxMsgModel = new messageArr.inboxMsg({});
    inboxListSuccess = function() {
        inboxMsgist = JSON.stringify(inboxMsgModel.get("inboxMessages"));
        if(inboxMsgist != '"NO_CONTENT"'){
            inboxMsgist = eval(" (" + inboxMsgist + ") ");
            new messageArr.inboxMsgListView({ inboxCollection : inboxMsgist });
        }else{
            removeSpinner();
            $("#contentPatientCommunication").html('<div class="textCenter auto width100" style="margin-top:30px;">There are no messages in your inbox.</div>');
        }
        
    };
    
    inboxListError = function() {
	    openErrorModal(errorTitle, serverErrorMessage);
    };
    
    var inboxJSON = {"userid":storage.getItem("userId")};
    //alert(JSON.stringify(inboxJSON));
    
    inboxMsgModel.fetch({ type : postMethod, success : inboxListSuccess, error : inboxListError, data : JSON.stringify(inboxJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}


/***
* This function is used to fetch all the messages for a particular thread from web-service.
***/
function getDetailMsgList() {
    collection = "";
    
    var inboxModel = new messageArr.detailMessage({});
    inboxListSuccess = function() {
        inboxDetailsList = JSON.stringify(inboxModel.get("messagesDetailList")[0].messages);
        inboxDetailsList = eval(" (" + inboxDetailsList + ") ");
        
       
        //spliceFromPushThread(storage.getItem("msgThread"));
        new messageArr.detailMsgListView({ inboxCollection : inboxDetailsList });
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
function igetAllContactList() {
    
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
function getRecepientList(msdDetail, msgfromId, isPush){
    var toName;
    var toId;
    if(isPush == 0){
        msdDetail = msdDetail.split(",");
        toName = msdDetail[0];
        toId = msdDetail[1];
        msgFromName = msdDetail[2];
    }else{
        toName = msgToName;
        toId = msgto;
    }
    
    toName = toName.split("|");
    toId = toId.split("|");
    var ind;
    if((toId.indexOf(storage.getItem("userId"))) >= 0){
        var indX = toId.indexOf(storage.getItem("userId"));
        toName[indX] = msgFromName;
        toId[indX] = msgfromId;
    }
    toId = toId.join(",");
    toName = toName.join(", ");
    storage.setItem("toIds", toId);
    storage.setItem("toNames", toName);
    return toName;
}


/***
 * This function is used to filter the recipient short name string and remove "Generic patient"
 * Parameter toNameList is passed and after filtering the array the converted into string and returned
 **/
function getRecListDom(toNameList){
    var extraCnt = 0;
    var count = 0;
    var maxCnt = 2;
    if(screenWidth < 768){
        maxCnt = 0;
    }
    var toIdList = storage.getItem("toIds").split(",");
    toNameList = toNameList.split(",");
    var toListDiv = "";
    if(pageType == 2 || pageType == 1){
        if(toIdList.length > 1){
            toListDiv = toListDiv + '<div class="font18 fl inboxRecPaneSize">';
        }else{
            toListDiv = toListDiv + '<div class="font187 fl width100">';
        }
    }
    for(var j=0; j<toIdList.length; j++) {
        if(count < maxCnt){
            toListDiv = toListDiv+''+toNameList[j]+', ';
        }else if(count == maxCnt){
            toListDiv = toListDiv+''+toNameList[j];
        }else{
            extraCnt = extraCnt + 1;
        }
        count++;
    }
    
    if(toListDiv.substr(toListDiv.length-2) == ", "){
        toListDiv = toListDiv.substring(0, toListDiv.length - 2);
    }
    if(pageType == 2 || pageType == 1){
        if(extraCnt >= 1){
            toListDiv = toListDiv + '..</div>';
            toListDiv = toListDiv + '<div class="font13 fl" style="margin-top:5px;">+' +extraCnt+ ' Others</div>';
        }else{
            toListDiv = toListDiv + '</div>';
        }
    }else{
        if(extraCnt >= 1){
            toListDiv = toListDiv + '..+' +extraCnt;
        }
    }
    $(".addedCount").text(" ("+toIdList.length+")");
    return toListDiv;
    
}


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
                       alert("1");
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
$("#continuSendMessage").live('touchstart', function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    //if($(this).hasClass("sendButtonActive")){
        isMinimized = 1;
        isAttachment = 0;
        var oldCommThread = "";
        commnThread = "";
        isDetailedCommunication = 1;
                              
        oldCommThread = storage.getItem("msgThread");
        if(isNewCompose == 1 && isForward == 1){
            storage.setItem("msgThread", "");
            commnThread = randString(e);
        }
        $(this).removeClass("addButtonInactive").addClass("addButtonActive");
        preCompose(oldCommThread);
    //}
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
 * This function is used for validationg while composing a message
 * Initially the send button is disabled and it gets enabled nce all the necessary input field are filled
 * Basically it checks if recipient and message input fields are filled properly
 ***/
function composeValidation(){
    storage.setItem("validationType", 0);
    var checkBlank = 0;
    if(storage.getItem("toIds") == ""){
        storage.setItem("validationType", 1);
        checkBlank = 1;
    }else{
        if(storage.getItem("roleid") == 5){
            if(storage.getItem("toIds").split(",").length == 1 && storage.getItem("toIds") == 1){
                storage.setItem("validationType", 1);
                checkBlank = 1;
            }
        }
    }
    var msgBody = "";
    if(isNewCompose == 1 || isForward == 1){
        msgBody = trim($("#composeBody").val());
    }else{
        msgBody = trim($("#sendMsgBody").val());
    }

    if(sendPhoto != 1){
        if(msgBody == ""){
            storage.setItem("validationType", 2);
            checkBlank = 1;
        }
    }
    if(checkBlank == 0){
        $(".sendMessage").removeClass("sendButtonInActive").addClass("sendButtonActive");
        isValidCommunication = 1;
    }else{
        $(".sendMessage").removeClass("sendButtonActive").addClass("sendButtonInActive");
        isValidCommunication = 0;
    }
    return checkBlank;
}


/***
 *
 *
 ***/
function preCompose(oldCommThread){
    var commThread;
    var conversationListId = "";
    var toIdsList;
    var toIdsListName;
    var isComposeValid = composeValidation();
    var attachment = "";
    //if(isValidCommunication == 1){
        autoMsgCnt = 0;
        isAutoMsg = 0;
        isValidCommunication = 0;
        if(storage.getItem("msgThread") == ""){
            commThread = commnThread;
        }else{
            commThread = storage.getItem("msgThread");
            conversationListId = storage.getItem("conversationListId");
        }
        if(sendPhoto == 1){
            storage.setItem("tempOldThread", oldCommThread);
            storage.setItem("tempThread", commThread);
            var options = new FileUploadOptions();
            
            options.fileKey="uploadedFile";
            options.fileName=getImageName()+".jpg";
            options.mimeType="image/jpg";
            var params = new Object();
            
            options.params = params;
            options.headers={pubKey:storage.getItem(pubKey)};
            options.chunkedMode = false;
            
            var uri = encodeURI(window.servicePath + fileUploadURL);
            var ft = new FileTransfer();
            storage.setItem("ismodalPopped", 1);
            sendPhoto = 0;
            ft.upload(imageURl, uri, win, fail, options);
        }else{
            var role = "";
            sendMessage(commThread, oldCommThread, conversationListId, attachment, storage.getItem("toIds"), storage.getItem("toNames"), storage.getItem("userId"), LoggedInUserName, role);
        }
   // }
    
    setTimeout(function() {
               $(".sendMessage").removeClass("addButtonActive").addClass("addButtonInactive");
               },100);
}


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
    var msgBody = "";
    if(isNewCompose == 1){
        msgBody = $("#composeBody").val();
    }else{
        msgBody = $("#sendMsgBody").val();
    }
    toIdList = toIdList.split(",").join("|");
    toNameList = toNameList.split(", ").join("|");
    //if(isForward == 0){
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
        composeMailModel = new messageArr.commposeMessage({});
   /* }else{
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
        //composeMailModel = new commsubject.forwardMail({});
        
    }*/
    $("#composeBody").val("");
        alert(JSON.stringify(composeJSON));
    composeMailSuccess = function() {
            $(".sendMessage").removeClass("addButtonActive").addClass("addButtonInactive");
            //Condition for normal and forwarded communication

            storage.setItem("conversationListId", conversationListId);
            storage.setItem("msgThread", commThread);
            shortNameRecipient = new Array();
        
            //Condition for new and old communication
            if(isNewCompose == 1 || isForward == 1){
                pageCount = 3;
                showHideMsgIcon();
                threadLists.unshift(commThread);
                setTimeout(function() {
                    gotoPath("#patient_continue_communication");
                    getDetailMsgList();
                },500);
            }else{
                var senderId = senderID;
                var date  = new Date();
                var month = parseInt(date.getMonth())+1;
                if(month < 10){
                    month = "0"+month;
                }
                var sentTime = date.getFullYear()+"-"+ month+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
                sentTime = createdDateTime(sentTime, 0);
                createMsgBody(msgBody, attachment, sentTime, "", senderId, LoggedInUserName, "");
                
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
    loadDetailMsg(id, newThreadId);
});



/***
 *
 *
 ***/
function loadDetailMsg(id, newThreadId){
    showSpinner();
    //closeRightSlideMenu();
    isValidCommunication = 0;
    var length = threadLists.length;
    if(newThreadId != undefined){
        showSpinner();
        $("#msgNewBody").html("");
        if(storage.getItem("isLeftSwipe") == 1){
            gotoPathRight('#detailMsgPage');
        }else if(storage.getItem("isLeftSwipe") == 2){
            gotoPathLeft('#detailMsgPage');
        }else{
            gotoPath('#detailMsgPage');
        }
        setTimeout(function(){
                   storage.setItem("msgThread", newThreadId);
                   showHideoptions();
                   }, 100);
    }
}


/***
 *
 *
 ***/
$('#detailMsgPage').live('pageshow', function(e) {
    e.preventDefault();
    $(this).addClass('ui-page-active');
    getDetailMsgList();
});



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
$("#composeMsgPage").live('pageshow', function(event) {
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


$(".message").live('touchstart', function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    e.preventDefault();
    $(".menu").removeClass("menuActive").addClass("menuInactive");
    $(this).removeClass("menuInactive").addClass("menuActive");
    gotoPath("#messagePage");
});



/***
 * This event gets invoked when inbox page is displayed the main content screen height is calculated dynamically and displayed
 * From body height the header height is substracted and content size is calculated
 ***/
$('#messagePage').live('pageshow', function(event) {
    $(this).addClass('ui-page-active');
    pageType = 1;
    threadLists = new Array();
    getInboxMsgList();
});



function createInboxDom(threadname, subjectText, time, msgBody, recNameListDom, isread, unreadCount){
    var status;
    var msgBodyText = "";
    msgBodyText = msgBodyText+'<div id="'+threadname+'" class="threadList width100 heightAuto grayBorderBottom pointer inlineBlock">'+
                                '<div class="inboxRecPane width100 inlineBlock">'+
                                    '<div class="fl userListNameSize overflowhidden overflowElipsis">'+
                                            ''+recNameListDom+'</div>'+
                                    '<div id="timeSpan_'+threadname+'" class="grayText font11 fl textRight inboxTime inboxTimePos">23 Feb</div>';
    if(parseInt(unreadCount) > 0){
        msgBodyText = msgBodyText+'<div id="alertSpan_'+threadname+'" class="msgAlert msgAlertPos fr whiteText font11">'+unreadCount+'</div>';
    }
    msgBodyText = msgBodyText+'</div><div class="width100 fl inlineBlock">'+
                                    '<div class="subjectPane fl inlineBlock heightAuto">'+
                                        //'<div class="fl inlineBlock width100 font13 latoLight blueText overflowhidden overflowElipsis">'+subjectText+'</div>'+
                                        '<div id="textSpan_'+threadname+'" class="fl inlineBlock width100 font14 latoLight blueText overflowhidden overflowElipsis">msgBody msgBody msgBody msgBody msgBody msgBody msgBody msgBody msgBody msgBody msgBody msgBody msgBody msgBody msgBody</div>'+
                                    '</div>'+
                                    '<div class="inboxNextPane fr inlineBlock">'+
                                        '<div class="dripicons fr font24 shadowNone grayText inlineBlock inboxArrow">&#xe015;</div>'+
                                    '</div>'+
                                '</div></div>';
    $("#contentInbox").append(msgBodyText);
}



/***
 * This is a common function used to display the message in the detailed message page based on sender and receiver.
 * Input parameters are msgText, attachment, sentTime, readTime, isFwd, senderId, senderName.
 * Message body DOM is created and returned
 ***/
function createMsgBody(msgBody, attachment, sentTime, readTime, senderId, senderName, imageDetail){
    var link = "";
    var cnt = 0;
    var msgText = "";
    var msgBodyHTML = "";
    var borderCss = "";
    if(msgBody != null && msgBody != ""){
        msgText = msgBody;
        borderCss = "grayBorderBottom";
    }
    
    if(msgText.indexOf("I am out till") < 0){
        msgText = '<div style="margin-left:15px;">'+msgText+'</div>';
    }
    
    
    var displayName = senderName;
    //If the attchment is not null or blank display it in the message body
    if(attachment != "" && attachment != null){
        
        var imageLinkName = getDisplayName(senderName);
        var link = attachment;
        attachment = attachment.split("/");
        var cnt = attachment.length;
        var imageLink = "";
        
        //Display of attachement style in message body for current logged in user and other participient messages
        if(senderId != storage.getItem("userId")){
            msgText = msgText + '<div class="width100 fl" style="margin-top:10px;padding-bottom: 2px; margin-left: 0px; padding-left: 0%;">'+
            '<div class="width100 inlineBlock imageclick '+borderCss+'" id="'+link+'">'+
            '<div class="dripicons font30 blackText textCenter fl" style="width:20%;">&#xe019;</div>'+
            '<div class="fl font18" style="width:65%;text-align:left;">'+imageLinkName+'</div>'+
            '</div><br/>'+msgText+'</div>';
        }else{
            msgText = msgText + '<div class="width100 fr" style="margin-top:10px;padding-bottom: 2px; margin-right: 0px; padding-right: 0%;">'+
            '<div class="width100 inlineBlock imageclick '+borderCss+'" id="'+link+'">'+
            '<div class="dripicons font30 blackText textCenter fr" style="width:20%;">&#xe019;</div>'+
            '<div class="fr font16" style="width:65%;text-align:right;">'+imageLinkName+'</div>'+
            '</div><br/>'+msgText+'</div>';
        }
    }
    //Display of message body for current logged in user and other participient messages
    if(msgText.indexOf("I am out till") < 0){
        if(senderId != storage.getItem("userId")){
            msgBodyHTML = msgBodyHTML+'<div class="heightAuto inlineBlock relative fl messageLine messageLineSize cssMsgBG latoLight">'+
            ''+msgText+''+
            '<div class="fl detailImageDiv bgCenter grayBG bgNoRepeat inlineFlex absolute detailImageDivLeft overflowhidden">';
            if(imageDetail != null && imageDetail != ""){
                msgBodyHTML = msgBodyHTML+'<img class="auto userIcon"  src="data:image/png;base64,'+imageDetail+'"/>';
            }else{
                msgBodyHTML = msgBodyHTML+'<div class="auto userIcon whiteText bebasLite font11 textCenter">'+getDisplayInitialName(displayName)+'</div>';
            }
            msgBodyHTML = msgBodyHTML+'</div>'+
            '<div class="fl timeInfoDiv bgCenter width100 bgNoRepeat inlineFlex absolute font10 leftZero">'+
            '<div class="fl timeInfoDivLeft grayText"> '+getDisplayInitialName(displayName)+' at '+sentTime+'</div>';
            if(readTime != ""){
                msgBodyHTML = msgBodyHTML+'<div class="grayText fr textRight" style="margin-right:3px;width:40%;">Seen at '+readTime+'</div>';
            }
            msgBodyHTML = msgBodyHTML+'</div>'+
            '</div>';
        }else{
            msgBodyHTML = msgBodyHTML+'<div class="heightAuto inlineBlock relative fr messageLine messageLineSize cssMsgBGMe latoLight">'+
            ''+msgText+''+
            '<div class="fr detailImageDiv bgCenter grayBG bgNoRepeat inlineFlex absolute detailImageDivRight overflowhidden">';
            if(imageDetail != null && imageDetail != ""){
                msgBodyHTML = msgBodyHTML+'<img class="auto userIcon"  src="data:image/png;base64,'+imageDetail+'"/>';
            }else{
                msgBodyHTML = msgBodyHTML+'<div class="auto userIcon whiteText bebasLite font11 textCenter">'+getDisplayInitialName(displayName)+'</div>';
            }
            msgBodyHTML = msgBodyHTML+'</div>'+
            '<div class="fl timeInfoDiv bgCenter width100 bgNoRepeat inlineFlex absolute font10 leftZero">';
            if(readTime != ""){
                msgBodyHTML = msgBodyHTML+'<div class="grayText fl textLeft" style="margin-left:3px;width:40%;">Seen at '+readTime+'</div>';
            }
            msgBodyHTML = msgBodyHTML+'<div class="grayText fr timeInfoDivRight textRight"> You at '+sentTime+'</div>'+
            '</div>'+
            '</div>';
        }
    }else{
        msgText = msgText.replace('I am', senderName+' is');
        msgBodyHTML = msgBodyHTML + '<div class="heightAuto inlineBlock relative latoLight width100 grayText"><div class="textCenter auto" style="border-radius:3px;height:25px;line-height:25px;min-width:220px;max-width:280px;margin-top:15px;margin-bottom:15px;border:1px solid #919BAC;">'+msgText+'</div></div>';
    }
    $("#msgNewBody").append(msgBodyHTML);
}





$(".friends").live('touchstart', function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    e.preventDefault();
    $(".menu").removeClass("menuActive").addClass("menuInactive");
    $(this).removeClass("menuInactive").addClass("menuActive");
    gotoPath("#friendsPage");
    displayContacts();
});



function displayContacts(){
    var contactModel = new contactsArr.contact({});
    contactListSuccess = function() {
		contactDetailsList = JSON.stringify(contactModel.get("contacts"));
		contactDetailsList = eval(" (" + contactDetailsList + ") ");
        new contactsArr.contactListView({ contactCollectionModel : contactDetailsList });
    };
    
    contactListError = function() {
	    openErrorModal(errorTitle, serverErrorMessage);
    };
    
    var contactJSON = { "userid" : storage.getItem("userId") };
    
    contactModel.fetch({ type : postMethod, success : contactListSuccess, error : contactListError, data : JSON.stringify(contactJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}



function syncContact(){
    var syncContactModel = new contactsArr.syncContact({});
    syncContactListSuccess = function() {
		syncContactDetailsList = JSON.stringify(syncContactModel.get("users"));
        
		syncContactDetailsList = eval(" (" + syncContactDetailsList + ") ");
    };
    
    syncContactListError = function() {
	    openErrorModal(errorTitle, serverErrorMessage);
    };
    
    var contactJSON = { "userid" : storage.getItem("userId"), "nameArray": nameArr.join(","), "phoneNumberArr": phoneNumberArr.join(",") };
    
    syncContactModel.fetch({ type : postMethod, success : syncContactListSuccess, error : syncContactListError, data : JSON.stringify(contactJSON), contentType : requestHeader, headers : { pubKey : storage.getItem(pubKey) }, processData : true });
}



$(".backToMenu").live('touchstart', function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    e.preventDefault();
    $(".menu").removeClass("menuActive").addClass("menuInactive");
    gotoPath("#homePage");
});



$(".optionMenuDiv").live('touchstart', function(e){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    e.preventDefault();
    if($(".attchmentOptionDiv").hasClass("none")){
        $(".attchmentOptionDiv").removeClass("none").addClass("block");
    }else{
        $(".attchmentOptionDiv").removeClass("block").addClass("none");                 
    }
});