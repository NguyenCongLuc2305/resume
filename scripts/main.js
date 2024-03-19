(function() {
  "use strict";

  window.addEventListener('load', () => {
    on_page_load()
  });

  /**
   * Function gets called when page is loaded.
   */
  function on_page_load() {
    // Initialize On-scroll Animations
    AOS.init({
      anchorPlacement: 'top-left',
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      disable: 'mobile'
    });
  }

  /**
   * Navbar effects and scrolltop buttons upon scrolling
   */
  const navbar = document.getElementById('header-nav')
  var body = document.getElementsByTagName("body")[0]
  const scrollTop = document.getElementById('scrolltop')
  window.onscroll = () => {
    if (window.scrollY > 0) {
      navbar.classList.add('fixed-top', 'shadow-sm')
      body.style.paddingTop = navbar.offsetHeight + "px"
      scrollTop.style.visibility = "visible";
      scrollTop.style.opacity = 1;
    } else {
      navbar.classList.remove('fixed-top', 'shadow-sm')
      body.style.paddingTop = "0px"
      scrollTop.style.visibility = "hidden";
      scrollTop.style.opacity = 0;
    }
  };

  /**
   * Masonry Grid
   */
  var elem = document.querySelector('.grid');
  if(elem) {
    imagesLoaded(elem, function() {
      new Masonry(elem, {
        itemSelector: '.grid-item',
        percentPosition: true,
        horizontalOrder: true
      });
    })
  }

  /**
   * Big Picture Popup for images and videos
   */
   document.querySelectorAll("[data-bigpicture]").forEach((function(e) {
     e.addEventListener("click", (function(t){
       t.preventDefault();
       const data =JSON.parse(e.dataset.bigpicture)
       BigPicture({
        el: t.target,
        ...data
      })
     })
    )
  }))

  /**
   * Big Picture Popup for Photo Gallary
   */
   document.querySelectorAll(".bp-gallery a").forEach((function(e) {
    var caption = e.querySelector('figcaption')
    var img = e.querySelector('img')
    // set the link present on the item to the caption in full view
    img.dataset.caption = '<a class="link-light" target="_blank" href="' + e.href + '">' + caption.innerHTML + '</a>';
    // window.console.log(caption, img)
     e.addEventListener("click", (function(t){
       t.preventDefault();
       BigPicture({
        el: t.target,
        gallery: '.bp-gallery',
      })
     })
    )
  }))

  // Add your javascript here


  window.addEventListener('scroll', function() {

    var isInViewportCenter = function(elem) {
      var bounding = elem.getBoundingClientRect();
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      var elementTop = bounding.top;
      var elementBottom = bounding.bottom;

      // Tính toán vị trí của phần tử so với vị trí giữa màn hình
      var elementCenter = (elementTop + elementBottom) / 2;
      var viewportCenter = viewportHeight / 2;

      // Kiểm tra nếu phần tử nằm trong khoảng giữa màn hình
      return Math.abs(elementCenter - viewportCenter) < viewportHeight / 4; // Điều chỉnh giá trị 4 cho mức độ nhạy cảm
  };

    var markers = document.querySelectorAll('h2.marker-center');

    markers.forEach(function(marker) {
        
        if (isInViewportCenter(marker)) {
            marker.classList.add('active-divider');
        } 
        // else {
        //     marker.classList.remove('active-divider');
        // }
    });


   // Add class to menu links based on corresponding section positions
   var sections = document.querySelectorAll('.section');
   var menuLinks = document.querySelectorAll('.navbar-nav li a');

   menuLinks.forEach(function(menuLink) {
       var sectionId = menuLink.getAttribute('href').substring(1);
       var section = document.getElementById(sectionId);
       if (isInViewportCenter(section)) {
           menuLink.classList.add('active-menu');
       } else {
           menuLink.classList.remove('active-menu');
       }
   });

});

window.addEventListener('load', function() {
  setTimeout(function() {
      var markers = document.querySelectorAll('h1.marker');
      markers.forEach(function(marker) {
          marker.classList.add('active-divider');
      });
  }, 1000); // Thời gian chờ là 1000ms (1 giây)
});


})();