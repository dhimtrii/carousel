var startTouchX = null;
var startTouchY = null;
var moveTouchX = null;
var moveTouchY = null;
var startPositionX = null;
var startPositionY = null;
var endPositionX = null;
var distance = 0;
var timeValue = 0;
var isCaliperSet = false;
var oldDistancevalue = 0;
var isVertivalCaliper = true;


$("ducument").ready(function(){
                    
    /*$("#attchment_details").css("display", "block");
    $("#attchment_details").css("top", "1%");
    $("#attchment_details").css("height", "98%");
    $("#attchment_details").css("left", "1%");
    $("#attchment_details").css("width", "98%");
    $("#headerMedDetailClose").css("display", "block");
    $("#headerMedDetailClose").css("top", "0.5%");
    var margin = (parseInt($("body").css("height")) - parseInt($(".zoomImage").css("height")))/2;
    $(".zoomImage").css("margin-top", margin+"px");*/
    $(".setEcaliper").text("Calibrate");
    resetCaliper();
});


/***************************Horizontal Caliper***********************/
$(".rightArrow").live("touchstart", function(event){
    event.preventDefault();
    var e = event.originalEvent;
    startPositionX = e.targetTouches[0].pageX - parseInt($(".rightBar").css("left"));
});

$(".rightArrow").live("touchmove", function(event){
        event.preventDefault();
        var e = event.originalEvent;
        moveTouchX = e.targetTouches[0].pageX;
        $("#movex").text(moveTouchX);
        var left = moveTouchX - startPositionX;
        if(left >= (parseInt($(".leftBar").css("left")) + parseInt($(".leftBar").width()))){
            $(".rightBar").css({left: (left)});
            if(isCaliperSet == true){
                distanceValue = parseInt($(".rightBar").css("left")) - (parseInt($(".leftBar").css("left")) + parseInt($(".leftBar").width()));
                var newtimeValue = (timeValue/oldDistancevalue)*distanceValue;
                      console.log(timeValue+"--"+oldDistancevalue+"--"+distanceValue+"--"+newtimeValue.toFixed(1));
                newtimeValue = newtimeValue.toFixed(1);
                $(".caliperDistance").text(newtimeValue +" ms");
            }
        }
});

$(".leftArrow").live("touchstart",function(event){
    event.preventDefault();
    var e = event.originalEvent;
    startPositionX = e.targetTouches[0].pageX - parseInt($(".leftBar").css("left"));
    distance = parseInt($(".rightBar").css("left")) - parseInt($(".leftBar").css("left"));
});

$(".leftArrow").live("touchmove", function(event){
    event.preventDefault();
    var e = event.originalEvent;
    moveTouchX = e.targetTouches[0].pageX;
    moveTouchY = e.targetTouches[0].pageY;
    $("#movex").text(moveTouchX);
    $("#movey").text(moveTouchY);
    $("#getvalue").val(moveTouchX);
    var left = moveTouchX - startPositionX;
                     console.log(left);
    if(left >= -20){
        var caliperHeight = parseInt($(".verticalCaliperbar").height());
        $(".leftBar").css({top: (moveTouchY - caliperHeight), left: (left)});
        $(".rightBar").css({top: (moveTouchY - caliperHeight), left: (left + distance)});
    }
});
/***************************Horizontal Caliper***********************/


/***************************Horizontal Caliper***********************/
$(".bottomArrow").live("touchstart", function(event){
    event.preventDefault();
    var e = event.originalEvent;
    startPositionY = e.targetTouches[0].pageY - parseInt($(".bottomBar").css("top"));
});

$(".bottomArrow").live("touchmove", function(event){
    event.preventDefault();
    var e = event.originalEvent;
    moveTouchY = e.targetTouches[0].pageY;
    var top = moveTouchY - startPositionY;
    if(top >= (parseInt($(".topBar").css("top")) + parseInt($(".topBar").height()))){
        $(".bottomBar").css({top: (top)});
        if(isCaliperSet == true){
            distanceValue = parseInt($(".bottomBar").css("top")) - (parseInt($(".topBar").css("top")) + parseInt($(".topBar").height()));
            var newtimeValue = (timeValue/oldDistancevalue)*distanceValue;
                       console.log(timeValue+"--"+oldDistancevalue+"--"+distanceValue+"--"+newtimeValue.toFixed(1));
            newtimeValue = newtimeValue.toFixed(1);
            $(".caliperDistance").text(newtimeValue +" ms");
        }
    }
});

$(".topArrow").live("touchstart",function(event){
    event.preventDefault();
    var e = event.originalEvent;
    startPositionY = e.targetTouches[0].pageY - parseInt($(".topBar").css("top"));
    distance = parseInt($(".bottomBar").css("top")) - parseInt($(".topBar").css("top"));
});

$(".topArrow").live("touchmove", function(event){
    event.preventDefault();
    var e = event.originalEvent;
    moveTouchX = e.targetTouches[0].pageX;
    moveTouchY = e.targetTouches[0].pageY;
    $(".caliperDistance").val(moveTouchX);
    var top = moveTouchY - startPositionY;
    if(top >= -20){
        var caliperWidth = parseInt($(".horizontalCaliperbar").width());
        $(".topBar").css({top: (top), left: (moveTouchX - caliperWidth)});
        $(".bottomBar").css({top: (top + distance), left: (moveTouchX + distance - caliperWidth)});
    }
});
/***************************Horizontal Caliper***********************/


$(".viewEcaliper").live("tap", function(){
     isCaliperSet = false;
     isVertivalCaliper = true;
     $(this).css("display", "none");
     if($(".horizontalCaliperDiv").css("display") == "block"){
         $(".verticalCaliperBar").css("display", "block");
     }else{
         $(".horizontalCaliperBar").css("display", "block");               
     }
     $(".rotateEcaliper").css("display", "none");
     $(".cancelEcaliper").css("display", "block");
    setTimeout(function() {
        $(".setEcaliper").css("display", "block");
    },200);
                        
});

$(".setEcaliper").live("tap", function(){
    if(isVertivalCaliper == true){
        distanceValue = parseInt($(".rightBar").css("left")) - (parseInt($(".leftBar").css("left")) + parseInt($(".leftBar").width()));
    }else{
        distanceValue = parseInt($(".bottomBar").css("top")) - (parseInt($(".topBar").css("top")) + parseInt($(".topBar").height()));
    }
    $(".setEcaliper").text("Recalibrate");
    oldDistancevalue = distanceValue;
    timeValue = 5;
    $(".caliperDistance").text(timeValue +" ms");
    isCaliperSet = true;
});


$(".cancelEcaliper").live("tap", function(){
    resetCaliper();
});

$(".rotateEcaliper").live("tap", function(){
    if($(".horizontalCaliperDiv").css("display") == "none"){
        isVertivalCaliper = true;
        $(".verticalCaliperDiv").css("display", "none");
        $(".horizontalCaliperDiv").css("display", "block");
                          //$(".verticalCaliperBar").css("display", "inline-flex");
    }else{
        isVertivalCaliper = false;
        $(".horizontalCaliperDiv").css("display", "none");
        $(".verticalCaliperDiv").css("display", "block");
                          //$(".horizontalCaliperBar").css("display", "inline-flex");
    }
    
});


function resetCaliper(){
    $(".topBar").css("top", "100px");
    $(".bottomBar").css("top", "150px");
    $(".leftBar").css("left", "100px");
    $(".rightBar").css("left", "150px");
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
}



/***
 *
 *
 ***/
function closeDetMedDiv(){
    $('#patient_medication_details').css("display", "none");
    $('#headerMedDetailClose').css("display", "none");
    removeMask();
    $('#scroller').html('');
    $(".caliperBar").css("display", "none");
    $("#cancelEcaliper").css("display", "none");
}





$(".arrow_box").live("touchstart", function(event){
    event.preventDefault();
    var e = event.originalEvent;
    startPositionY = e.targetTouches[0].pageY - parseInt($(".arrow_box").css("top"));
    var offset = $(".rightSlidePanel").offset();
    startPositionX = parseInt(offset.left);
    endPositionX = startPositionX + 35;
                     
});


$(".arrow_box").live("touchmove", function(event){
    event.preventDefault();
    var e = event.originalEvent;
    moveTouchY = e.targetTouches[0].pageY;
    moveTouchX = e.targetTouches[0].pageX;
    var top = moveTouchY - startPositionY;
    $("#login_username").val(startPositionX+"--"+moveTouchX+"--"+endPositionX);
    if(moveTouchX > startPositionX && moveTouchX < endPositionX){
        $(".arrow_box").css({top: (top)});
    }
});
