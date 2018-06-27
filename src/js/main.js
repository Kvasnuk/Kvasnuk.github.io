jQuery(document).ready(function(){
    $('#news-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        centerMode: true,
        arrows:false,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite:true
    });
})