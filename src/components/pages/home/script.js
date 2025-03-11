// // Check to see if Media-Queries are supported
// if (window.matchMedia) {
//     // Check if the dark-mode Media-Query matches
//     if(window.matchMedia('(prefers-color-scheme: dark)').matches){
//         $('body').toggleClass('darkmode');
//         $('.toggle-container').toggleClass('darklite');
//         $('.row.bottom img, .navbar a img').toggleClass('d-none');
//     } else {
//       // Light
//     }
//   } else {
//     // Default (when Media-Queries are not supported)
//   }


$('.toggle-container').click(function(){
    $('body').toggleClass('darkmode');
    $('.toggle-container').toggleClass('darklite');
    $('.row.bottom img, .navbar a img').toggleClass('d-none');
});

$(document).ready(function(){
    $('.karosel').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
      });
  });

  lightbox.option({
   'albumLabel': "",
  })

//   document.addEventListener("contextmenu", function(event){
//     event.preventDefault();
//   })
