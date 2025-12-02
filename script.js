// Nav Bar
// ---------------------- SEARCH OVERLAY ----------------------
const searchButton = document.querySelector('.search-btn');
const searchOverlay = document.getElementById('searchOverlay');
const searchBg = document.getElementById('searchBg');

if (searchButton) {
  searchButton.addEventListener('click', (e) => {
    e.stopPropagation();
    searchOverlay.classList.add('active');
    searchBg.classList.add('active');
  });
}

document.addEventListener('click', (event) => {
  if (!searchOverlay.contains(event.target) && !searchButton?.contains(event.target)) {
    searchOverlay.classList.remove('active');
    searchBg.classList.remove('active');
  }
});

// ---------------------- DESKTOP SIDEBAR ----------------------
const gridBtn = document.querySelector('.grid-icon');
const sidebarMenu = document.getElementById('sidebarMenu');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarClose = document.getElementById('sidebarClose');

function openDesktopSidebar() {
  sidebarMenu.classList.add('active');
  sidebarOverlay.classList.add('active');
}

function closeDesktopSidebar() {
  sidebarMenu.classList.remove('active');
  sidebarOverlay.classList.remove('active');
}

gridBtn.addEventListener('click', () => {
  // Desktop only (width > 1000px)
  if (window.innerWidth > 1000) {
    openDesktopSidebar();
  }
});

sidebarClose.addEventListener('click', closeDesktopSidebar);
sidebarOverlay.addEventListener('click', closeDesktopSidebar);

// ---------------------- MOBILE SIDEBAR ----------------------
const mobileSidebar = document.getElementById("mobileSidebar");
const closeMobileSidebar = document.getElementById("closeSidebar");
const dropdownItems = document.querySelectorAll(".dropdown-item");

// OPEN MOBILE SIDEBAR
gridBtn.addEventListener("click", () => {
  if (window.innerWidth <= 1000) {
    mobileSidebar.classList.add("active");
    gridBtn.classList.add("hide");   // Hide icon content on mobile
  }
});

// CLOSE MOBILE SIDEBAR
closeMobileSidebar.addEventListener("click", () => {
  mobileSidebar.classList.remove("active");
  gridBtn.classList.remove("hide");  // Show icon content again
});

// DROPDOWN FUNCTIONALITY IN MOBILE SIDEBAR
dropdownItems.forEach(item => {
    item.addEventListener("click", () => {

        // Close other dropdowns
        dropdownItems.forEach(d => {
            if (d !== item) d.classList.remove("active");
        });

        // Toggle current one
        item.classList.toggle("active");
    });
});


// Footer Slider
// Wait for DOM
$(function() {
  // initialize slick
  $('.slider').slick({
    slidesToShow: 5,        // visible slides
    slidesToScroll: 1,      // number slides to scroll per change
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1800,
    speed: 600,
    centerMode: false,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 900, settings:  { slidesToShow: 3 } },
      { breakpoint: 600, settings:  { slidesToShow: 2 } },
      { breakpoint: 420, settings:  { slidesToShow: 1 } }
    ]
  });
});


// Product Card Slider
$(document).ready(function () {
  function initProductSlider() {
    (function($){
      $(function(){

        var $slider = $('.product-cards');
        if (!$slider.length) return; // nothing to do

        // Define settings dynamically
        function sliderSettings(width) {
          if (width <= 455) {
            return {
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 2500,
              arrows: false,
              dots: true,
              centerMode: true,
              centerPadding: '30px',
              adaptiveHeight: true
            };
          } else if (width <= 992) {
            return {
              slidesToShow: 2,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 2500,
              arrows: false,
              dots: true,
              centerMode: true,
              centerPadding: '40px',
              adaptiveHeight: true
            };
          }
          return null;
        }

        // Initialize or destroy
        function updateSlider() {
          var w = $(window).width();
          var settings = sliderSettings(w);

          if (settings) {
            if (!$slider.hasClass('slick-initialized')) {
              $slider.slick(settings);
            }
          } else {
            if ($slider.hasClass('slick-initialized')) {
              $slider.slick('unslick');
            }
          }
        }

        // Initialize on load
        updateSlider();

        // Reinitialize on resize (debounced)
        var resizeTimer;
        $(window).on('resize', function(){
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(updateSlider, 200);
        });

      });
    })(jQuery);

  }
  initProductSlider();
  $(window).on('resize', function () {
    initProductSlider();
  });
});


// Shop Details
const tabs = document.querySelectorAll(".Shop-tab");
const contents = document.querySelectorAll(".Shop-tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    
    // Remove active classes
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));
    
    // Add active class to clicked tab
    tab.classList.add("active");

    // Show matching content
    document.getElementById(tab.getAttribute("data-tab")).classList.add("active");
  });
});


// Video Section Functionality
const playButton = document.getElementById("playButton");
const videoModal = document.getElementById("VideoModal");
const closeVideo = document.getElementById("closeVideo");
const youTubeVideo = document.getElementById("YouTubeVideo");

playButton.addEventListener("click", () => {
  youTubeVideo.src = "https://www.youtube.com/embed/HQfF5XRVXjU?autoplay=1";
  videoModal.style.display = "flex";
});

closeVideo.addEventListener("click", () => {
  youTubeVideo.src = "";
  videoModal.style.display = "none";
});

// Optional: Close modal when clicking outside video
videoModal.addEventListener("click", (e) => {
  if (e.target === videoModal) {
    youTubeVideo.src = "";
    videoModal.style.display = "none";
  }
});


// Stats Section
const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
  const percent = circle.getAttribute('data-percent');
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  const progressCircle = circle.querySelectorAll('circle')[1];
  progressCircle.style.strokeDashoffset = offset;
});


// Testimonial Slider
document.addEventListener("DOMContentLoaded", () => {
  const slidesEl = document.querySelector(".slides");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("dots");
  const slideCount = slides.length;
  let index = 0;
  let isAnimating = false;

  // build dots
  slides.forEach((_, i) => {
    const d = document.createElement("div");
    d.classList.add("dot");
    if (i === 0) d.classList.add("active");
    d.dataset.index = i;
    dotsContainer.appendChild(d);
    d.addEventListener("click", (e) => {
      goToSlide(parseInt(e.currentTarget.dataset.index, 10));
    });
  });

  const dots = Array.from(document.querySelectorAll(".dot"));

  function updateUI() {
    // translate slides container
    slidesEl.style.transform = `translateX(-${index * 100}%)`;
    // update dots
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function goToSlide(i) {
    if (isAnimating || i === index) return;
    isAnimating = true;
    index = (i + slideCount) % slideCount;
    updateUI();
    // wait for transition end
    setTimeout(() => { isAnimating = false; }, 650);
  }

  prevBtn.addEventListener("click", () => {
    goToSlide(index - 1);
  });
  nextBtn.addEventListener("click", () => {
    goToSlide(index + 1);
  });

  // keyboard left / right
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
  });

  // OPTIONAL: autoplay (comment/uncomment as needed)
  let autoplayInterval = null;
  function startAutoplay() {
    autoplayInterval = setInterval(() => goToSlide(index + 1), 5000);
  }
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // pause on hover
  const wrapper = document.querySelector(".slides-wrapper");
  wrapper.addEventListener("mouseenter", stopAutoplay);
  wrapper.addEventListener("mouseleave", startAutoplay);

  startAutoplay(); // remove this line to disable autoplay
});


// News and FAQss 
const faqs = document.querySelectorAll(".faq-item");
faqs.forEach(faq => {
  faq.querySelector(".faq-question").addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});


