function classToggle()
{
    var x = document.getElementById('navid');
    if (x.style.display == 'none') {
        x.style.display ='inherit';
    } else {
        x.style.display = 'none';
    }
}
 // HERO SLIDER
 var menu = [];
 jQuery('.swiper-slide').each( function(index){
     menu.push( jQuery(this).find('.slide-inner').attr("data-text") );
 });
 var interleaveOffset = 0.5;
 var swiperOptions = {
     loop: true,
     speed: 1000,
     parallax: true,
     autoplay: {
         delay: 6500,
         disableOnInteraction: false,
     },
     watchSlidesProgress: true,
     pagination: {
         el: '.swiper-pagination',
         clickable: true,
     },

     navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
     },

     on: {
         progress: function() {
             var swiper = this;
             for (var i = 0; i < swiper.slides.length; i++) {
                 var slideProgress = swiper.slides[i].progress;
                 var innerOffset = swiper.width * interleaveOffset;
                 var innerTranslate = slideProgress * innerOffset;
                 swiper.slides[i].querySelector(".slide-inner").style.transform =
                 "translate3d(" + innerTranslate + "px, 0, 0)";
             }      
         },

         touchStart: function() {
           var swiper = this;
           for (var i = 0; i < swiper.slides.length; i++) {
             swiper.slides[i].style.transition = "";
           }
         },

         setTransition: function(speed) {
             var swiper = this;
             for (var i = 0; i < swiper.slides.length; i++) {
                 swiper.slides[i].style.transition = speed + "ms";
                 swiper.slides[i].querySelector(".slide-inner").style.transition =
                 speed + "ms";
             }
         }
     }
 };

 var swiper = new Swiper(".swiper-container", swiperOptions);

 // DATA BACKGROUND IMAGE
 var sliderBgSetting = $(".slide-bg-image");
 sliderBgSetting.each(function(indx){
     if ($(this).attr("data-background")){
         $(this).css("background-image", "url(" + $(this).data("background") + ")");
     }
 });

 function DownloadFile(fileName) {
    //Set the File URL.
    var url =fileName;

    //Create XMLHTTP Request.
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "blob";
    req.onload = function () {
        //Convert the Byte Data to BLOB object.
        var blob = new Blob([req.response], { type: "application/octetstream" });

        //Check the Browser type and download the File.
        var isIE = false || !!document.documentMode;
        if (isIE) {
            window.navigator.msSaveBlob(blob, fileName);
        } else {
            var url = window.URL || window.webkitURL;
            link = url.createObjectURL(blob);
            var a = document.createElement("a");
            a.setAttribute("download", fileName);
            a.setAttribute("href", link);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };
    req.send();
};