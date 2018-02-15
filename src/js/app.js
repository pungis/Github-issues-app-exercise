import 'jquery';






require ('../css/style.scss');


$( document ).ready(function() {
  $('.cls-1').on('click', function() {
    $(this).toggleClass("active");
});

});



