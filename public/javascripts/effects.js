window.onload = function() {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/twilight");
    editor.getSession().setMode("ace/mode/javascript");
    
    $('#about-anchor').click(function(){
        $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top
            }, 900);
            return false;
    });
};