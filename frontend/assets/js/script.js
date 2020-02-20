document.querySelector('header button').addEventListener("click", function(){
    document.querySelector('.form').classList.toggle('hide')    
})

$(document).ready(function() {
    $("#telefone").focusout(function(){

        var telefone, element;
    
        element = $(this);
    
        element.unmask();
    
        telefone = element.val().replace(/\D/g, '');
    
        if(telefone.length > 10) {
    
            element.mask("(99) 99999-999?9");
    
        } else {
    
            element.mask("(99) 9999-9999?9");
    
        }
    
    }).trigger('focusout');

    $('.owl-doadores').owlCarousel({
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        loop: false,
        dots: true,
        nav: false,
        dataEach: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4,
                dots: true,
                dotsData: false
            }
        }
    });
});