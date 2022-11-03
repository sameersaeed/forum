document.getElementById('confirm').onkeyup=function(){
    if($("#password").val() != $("#confirm").val()) {
        $("#password").css({
            'border-color': "red",
            'border-width': '3px'
        });
        $("#confirm").css({
            'border-color': "red",
            'border-width': '3px'
        });
    }
    else{
        $("#password").css({
            'border-color': "green",
            'border-width': '3px'
        });
        $("#confirm").css({
            'border-color': "green",
            'border-width': '3px'
        });
    }
}