$(function(){

    $(".settings").live("click", function(){
       if($(this).hasClass("hover")){
            $(this).removeClass("hover");
            $(".select").removeClass("hover");
            $(".select").css('visibility', 'hidden');
       }else{
        $(this).addClass("hover");
        $('ul:first',this).css('visibility', 'visible');
        $(".select").css('visibility', 'visible');
        $(".select").css('visibility', 'visible');
       }
    
    });
    
    $("ul.dropdown li ul li:has(ul)").find("a:first").append(" &raquo; ");
    
    $(".submenu").live("click", function(){
        
        $(".select").removeClass("hover");
        $(".select").css('visibility', 'hidden');
        var id = $(this).attr('id');
        //alert(id);
        if(id == "profile"){
            window.location.href = "profile";
        }else if(id == "settings"){
            window.location.href = "settings";
        }else if(id == "request"){
            window.location.href = "request";
        }else{
            window.location.href = "../";
        }
    })
    
    /*$(".wrapper:not(.submenu)").live("click", function(event){
        
            $(".select").removeClass("hover");
            $(".select").css('visibility', 'hidden');
        
        
    });*/

});