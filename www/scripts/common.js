/********************Common Functions Starts here******************************/



/***
* This function is used to fill the thread array.
* Input parameter thread name is passed and it is inserted into the array
***/
function inserIntoThreadArray(threadName){
    if(pushThreadLists.indexOf(threadName) < 0){
        pushThreadLists.push(threadName);
        storage.setItem("threadListArray", pushThreadLists);
    }
}


/***
* This function is used to remove an item from the thread array.
* Input parameter thread name is passed and it is removed from the array using splice
***/
function spliceFromPushThread(threadName){
    pushThreadLists.splice(pushThreadLists.indexOf(threadName),1);
}



/***
 
***/
function getDisplayDateFormat(divDate) {
    divDate = new Date(divDate);
    var month = divDate.getMonth() + 1;
    var year = divDate.getFullYear();
    var day = divDate.getDate();
    var dates = appendZero(month)+"/" + appendZero(day) + "/" + year;
    return dates;
}


/***
* This function is used to get the local time format from UTC timestamp.
* UTC time stamp is passed as input parameter and local time in format month, DD is returned.
***/
function getDisplayDateMonth(divDate){
    divDate = new Date(divDate);
    var month = divDate.getMonth() + 1;
    var day = divDate.getDate();
    var monthName = shortMonthNames[month - 1];
    var dayText = "";
    dayText = monthName + " " + appendZero(day);
    return dayText;
}


/***
* This function is used to get the previous date for the current selected date.
* Selected date is passed as input parameter and next date is returned
***/
function getNextDate(currntDate){
    currntDate = new Date(currntDate);
    var month = currntDate.getMonth();
    var year = currntDate.getFullYear();
    var day = currntDate.getDate();
    var offset = 1; // Tomorow
    var future_date = new Date(year, month , day+offset);
    nowCurrDate = future_date;
    return future_date;
}


/***
* This function is used to get the next date for the current selected date
* Selected date is passed as input parameter and previous date is returned
***/
function getPrevDate(currntDate){
    currntDate = new Date(currntDate);
    var month = currntDate.getMonth();
    var year = currntDate.getFullYear();
    var day = parseInt(currntDate.getDate());
    var offset = 1; // Tomorow
    var prev_date = new Date(year, month , day-offset);
    nowCurrDate = prev_date;
    return prev_date;
}



/***
* This function is to gettime format in twelve hours.
* time is passed as input parameter and after converting it to twelve hour format time is returned
***/
function getTwelveHours(time){
    var hour = parseInt(time.substr(0, time.indexOf(":")));
    var type = "am";
    if(hour > 12){
        hour = appendZero(hour - 12);
        type = "pm";
    }else if(hour == 12){
        hour = 12;
        type = "pm";
    }else{
        hour = appendZero(hour);
    }
    var min = parseInt(time.substr(time.indexOf(":")+1));
    var newTime = hour+":"+appendZero(min)+" "+type;
    return newTime;
}


/***
* This function is used to get the local time format from UTC timestamp.
* UTC time stamp and id are passed as input parameters and local time in format YYYY-MM-DD/YYYY-MM-DD HH:mm:ss
* is returned based on the id.
***/
function gethDateFormatWithHyphen(time, id){
    var crMonth = time.getMonth() + 1;
    var crDate = time.getDate();
    var crYear = time.getFullYear();
    var crHour = time.getHours();
    var crMinute = time.getMinutes();
    var crSeconds = time.getSeconds();
    var newDate = crYear+"-"+appendZero(crMonth)+"-"+appendZero(crDate)+" "+appendZero(crHour)+":"+appendZero(crMinute);
    if(id != 1){
        newDate = newDate + ":" + appendZero(crSeconds);
    }
    return newDate;
}


/***
* This function is used to append zero to values based on the condition whether it is greated than zero
* Input parameter value is passed as the parameter and after appending zero based on condition the value is returned.
***/
function appendZero(val){
    val = parseInt(val);
    if (val < 10) {
        val = "0" + val;
    } else {
        val = val;
    }
    return val;
}


/***
* This function is used to get some particular date format when a message composed or replied.
* UTC Time and specific id is paased as input parameter and specific date format is returned after
* appending today with the time.
***/
function createdDateTime(time){
    time = getConvertibleDate(time);//Make date JQuery convertible format
    time = new Date(time);
    var sntTime = Date.parse(time);
    var sntHour = time.getHours();
    var sntMin = time.getMinutes();
    var displayTime = getTwelveHours(sntHour+":"+sntMin);
    displayDate = "Today "+displayTime;
    
    
    return displayDate;
}


/***
* This function is used to get some particular date format for inbox and detailed message based on the
* no of days that particular message has been in action. UTC Time and specific id is paased as input parameters
* and specific date format is returned.
***/
function getInboxDate(time, id){
    time = getConvertibleDate(time);//Make date JQuery convertible format
    time = new Date(time+" UTC");
    var sntTime = Date.parse(time);
    var sntHour = time.getHours();
    var sntMin = time.getMinutes();
    var sntYear = time.getFullYear();
    var sntMonth = time.getMonth() + 1;
    var sntDay = time.getDate();
    var sntDate = sntYear+"-"+sntMonth+"-"+sntDay;
    var today = new Date();
    var crntTime = Date.parse(today);
    var crntYear = today.getFullYear();
    var crntMonth = today.getMonth() + 1;
    var crntDay = today.getDate();
    var crntDate = crntYear+"-"+crntMonth+"-"+crntDay;
    var prevDate = parseInt(crntDay);
    var prevWeek = new Date();
    prevWeek.setDate(prevWeek.getDate()-7);
    prevWeek = new Date(prevWeek);
    var prevMonth = new Date();
    prevMonth.setDate(prevMonth.getDate()-prevDate);
    prevMonth = new Date(prevMonth);
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
        sentYear = sntYear.substr(2);
        displayDate = appendZero(sentMonth)+"/"+appendZero(sentDay);
    }else{
        var monthName = shortMonthNames[parseInt(sntMonth)];
        sentYear = sntYear.substr(2);
        displayDate = appendZero(sentMonth)+"/"+appendZero(sentDay)+"/"+sentYear;
    }
    return displayDate;
    
}



/***
* This function is used to get the color code based on the id passed as parameter received from the
* web-service. The color code distinguishes the vital conditions. Based on the id, specific color
* code css class is returned.
***/
function getColorCode(id){
    var cssClass = "";
    if(id == 0 || id == 4){
        cssClass = "red";
    }else if(id == 1 || id == 3){
        cssClass = "yellow";
    }else{
        cssClass = "blue";
    }
    return cssClass;
}
               
               
/***
* This function is used to get the time in particular format
* Input parameter date is passed and format YYYY-MM-DD is returned
***/
function currentDates(divDate) {
    divDate = new Date(divDate);
    var month = divDate.getMonth() + 1;
    var year = divDate.getFullYear();
    var day = divDate.getDate();
    dates = year + "-" + appendZero(month) + "-" + appendZero(day);
    return dates;
}




/***
* This function is used to get the local date from UTC time stamp for vitals.
* UTC timespamp for vital is passed and local time format YYYY-MM-DD is returned.
***/
function getVitalDate(vDate){
    var month = vDate.getMonth() + 1;
    var year = vDate.getFullYear();
    var day = vDate.getDate();
    var Hour = vDate.getHours();
    var Min = vDate.getMinutes();
    var dates;
    if(currentDates(vDate) != currentDates(currentDate)){
        dates = appendZero(month) + "/" + appendZero(day);
    }else{
        dates = appendZero(Hour) + "/" + appendZero(Min);
    }
    return dates;
}


/***
* This function is used to trim the blank space from a string 
* Input parameter string is passed empty spaces from front and end of the string is removed and string is returned
***/
function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}


/***
* This function is used to trim the blank space from front of a string
* Input parameter string is passed empty spaces from front of the string is removed and string is returned
***/
function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}


/***
 * This function is used to trim the blank space from end of a string
 * Input parameter string is passed empty spaces from end of the string is removed and string is returned
***/
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}


/***
 
***/
function replaceAll(txt, replace, with_this) {
    return txt.replace(new RegExp(replace, 'g'),with_this);
}


/***
* This function is used to capitalize a string
* Input parameter text is passed and after converting it to capitalize format text is returned
***/
function capitalize(text){
    return text[0].toUpperCase() + text.slice(1);
}


/***
* This function is used to get the vital reading from the vital JSON object
* Input parametes vitalName and attribute name is passed and based on the input parametres vital code is returned
***/
function getVitalReading(vitalName, attrName){
    o = 0;
    m = 0;
    
    var code;
    _.each(vitals.vitalReadingList, function(val, o) {
        if(vitals.vitalReadingList[o].vital.name == vitalName){
           var vitalAttr = vitals.vitalReadingList[o].vital.vitalAttributeList;
           _.each(vitalAttr, function(val, m) {
                  if(attrName == vitals.vitalReadingList[o].pvDataList[m].attributename){
                  code =  vitals.vitalReadingList[o].pvDataList[m].vitalArrowCode;
                  }
                  });
        }
    });
    return code;
}


/***
* This function is used to get the vital color code.
* Input parameter value is passed and from the color code array the color is picked and a HTML dom is created and returned
***/
function getArrowColorCode(value){
    var imageArray = ['vitalRedDownArrow', 'vitalYellowDownArrow', 'vitalBlueDownArrow', 'vitalBlueUpArrow', 'vitalYellowUpArrow'];
    var imageName = '';
    if(value < 5)
        imageName = '<img src="../../images/'+imageArray[value]+'.png" alt="arr" />';
    return imageName;
    
}


/***
* Convert the mobiscroll input field time into timet format to be sent to web-services for updating. 
* Input parameter in time(format mm/DD/YYYY HH:MM am) recived from time input field and converts into format YYYY-mm-DD HH:MM am
***/
function getSaveTimeFormat(time){
    var crMonth = time.getMonth() + 1;
    var crDate = time.getDate();
    var crYear = time.getFullYear();
    var crHour = time.getHours();
    var crMinute = time.getMinutes();
    var crSeconds = time.getSeconds();
    var amPmTime = getTwelveHours(crHour+":"+crMinute);
    var newDate = crYear+"-"+appendZero(crMonth)+"-"+appendZero(crDate)+" "+amPmTime;
    return newDate;
}


/***
* Convert the UTC time received from web-services into mobiscroll input time field format. 
* Input parameter in time(format YYYY-mm-DD HH:MM:ss) recived from time input field and converts into format mm/DD/YYYY HH:MM am
***/
function getInputTimeFormat(time){
    time = getConvertibleDate(time);//Make date JQuery convertible format
    time = new Date(time+" UTC");
    var crMonth = time.getMonth() + 1;
    var crDate = time.getDate();
    var crYear = time.getFullYear();
    var crHour = time.getHours();
    var crMinute = time.getMinutes();
    var amPmTime = getTwelveHours(crHour+":"+crMinute);
    var newDate = appendZero(crMonth)+"/"+appendZero(crDate)+"/"+crYear+" "+amPmTime;
    return newDate;
}


/***
* Convert the UTC time received from web-services into mobiscroll input time field format. 
* Input parameter in time(format YYYY-mm-DD HH:MM:ss) recived from time input field and converts into format DD Mon, YYYY HH:MM am
***/
function getOOFTimeFormat(time){
    time = getConvertibleDate(time);//Make date JQuery convertible format
    time = new Date(time+" UTC");
    var crMonth = time.getMonth() + 1;
    var crDate = time.getDate();
    var crYear = time.getFullYear();
    var crHour = time.getHours();
    var crMinute = time.getMinutes();
    var amPmTime = getTwelveHours(crHour+":"+crMinute);
    var crMonth = shortMonthNames[parseInt(crMonth)];
    var newDate = crMonth+" "+appendZero(crDate)+" "+crYear+", "+amPmTime;
    return newDate;
}


/***
 * This function is used to get the short name for a user/recipient(First name + first letter of last name)
 * Input parameter name is passed and shortname format is returned
 ***/
function getDisplayName(name){
    name = trim(name);
    //If the name consists of only firstname or both firstname and lastname
    if(name.indexOf(" ") > 0){
        name = name.substr(0, (name.indexOf(" ")+2));
    }
    return name;
}


/***
 * This function is used to get the initial name for a user/recipient(first letter of first name + first letter of last name)
 * Input parameter name is passed and initial name format is returned
 ***/
function getDisplayInitialName(name){
    name = trim(name);
    var senderName = "";
    //If the name consists of only firstname or both firstname and lastname
    if(name.indexOf(" ") > 0){
        senderName = name.substr(0,1)+""+name.substr((name.indexOf(" ")+1), 1);
    }else{
        senderName = name.substr(0,2);
    }
    return senderName;
}

/***
* This function is used to make date readable for JQuery conversion
* Input parameter time is passed and after removing the "." and replacing "-" with "/" date is returned
***/
function getConvertibleDate(time){
    //If the time has "-" then it is replaced by "/" for JQuery conversion
    if(time.indexOf("-") >= 0){
        time = time.split("-");
        time = time.join("/");
    }
        //If the time has "." then it is replaced for JQuery conversion
    if(time.indexOf(".") >= 0){
        time = time.substr(0, time.indexOf("."));
    }
    return time;
}



/***
 * This function is used to calculate the age from date of birth
 * Input parameter date(DOB) is passed and based on the current date age is calculated and returned
 ***/
function getYears(date)
{
    date = date.split("-");
    date = date.join("/");
    var d1 = new Date(date); //from date yyyy-MM-dd
    var d2 = new Date(); //to date yyyy-MM-dd (taken currentdate)
    var Months = d2.getMonth() - d1.getMonth();
    var Years = d2.getFullYear() - d1.getFullYear();
    var Days = d2.getDate() - d1.getDate();
    Months = (d2.getMonth() + 12 * d2.getFullYear()) -
    (d1.getMonth() + 12 * d1.getFullYear());
    var MonthOverflow = 0;
    if (Months - (Years * 12) < 0)
        MonthOverFlow = -1;
    else
        MonthOverFlow = 1;
    if (MonthOverFlow < 0)
        Years = Years - 1; Months = Months - (Years * 12);
    var LastDayOfMonth = new Date(d2.getFullYear(),
                                  d2.getMonth() + 1, 0, 23, 59, 59);
    LastDayOfMonth = LastDayOfMonth.getDate();
    if (MonthOverFlow < 0 && (d1.getDate() > d2.getDate())) {
        Days = LastDayOfMonth + (d2.getDate() - d1.getDate()) - 1;
    }
    else
        Days = d2.getDate() - d1.getDate();
    if (Days < 0)
        Months = Months - 1;
    var l = new Date(d2.getFullYear(), d2.getMonth(), 0);
    var l1 = new Date(d1.getFullYear(), d1.getMonth() + 1, 0);
    if (Days < 0)
        {
        if (l1 > l)
            Days = l1.getDate() + Days;
        else
            Days = l.getDate() + Days;
        }
    return Years;
}



/***
*
*
***/
function removeMask(){
    $("#sentMask").fadeOut(300);
    $("#sentMask").remove();
    $(".loader").remove();
}


/***
*
*
***/
function showMask(){
    $('body').append('<div class="mask" id="sentMask"></div>');
    $("#sentMask").fadeIn(300);
    $('#sentMask').css("zIndex", 9999);
    $('#sentMask').css("opacity", 0.8);
}

/********************Common Functions ends here******************************/


