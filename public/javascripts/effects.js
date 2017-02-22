$(document).ready(function(){
    $('#about-anchor').click(function(){
        $('html, body').animate({
                scrollTop: $( $(this).attr('href') ).offset().top
            }, 900);
            return false;
    });
});