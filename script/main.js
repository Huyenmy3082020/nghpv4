// ===== CONFIGURATION =====
const galleryImages = [
  { src: "./img/1.jpg", caption: "Khoảnh khắc đáng nhớ 💕" },
  { src: "./img/2.jpg", caption: "Nụ cười rạng rỡ 🌸" },
  { src: "./img/3.png", caption: "Đẹp như hoa 🌷" },
  { src: "./img/4.png", caption: "Kỷ niệm đẹp 💖" },
  { src: "./img/5.png", caption: "Xinh đẹp mỗi ngày ✨" },
  { src: "./img/6.png", caption: "Ánh mắt lung linh 👀" },
  { src: "./img/7.png", caption: "Nét duyên dáng 🌺" },
  { src: "./img/8.png", caption: "Tỏa sáng rực rỡ 🌟" },
  { src: "./img/9.png", caption: "Đáng yêu quá đi 🥰" },
  { src: "./img/10.png", caption: "Khoảnh khắc tuyệt vời 💫" },
  { src: "./img/11.png", caption: "Nụ cười như hoa 🌼" },
  { src: "./img/12.png", caption: "Dễ thương vô cùng 🎀" },
  { src: "./img/13.png", caption: "Xinh xinh xinh 💗" },
  { src: "./img/15.png", caption: "Ngọt ngào 🍬" },
  { src: "./img/16.png", caption: "Rạng ngời 🌈" },
  { src: "./img/17.png", caption: "Đẹp lung linh ✨" },
  { src: "./img/18.jpg", caption: "Kỷ niệm đặc biệt 💝" },
  { src: "./img/19.jpg", caption: "Thật tuyệt vời 🎉" },
  { src: "./img/irene.jpg", caption: "Xinh như Irene 👑" },
];

let currentGalleryIndex = 0;
let galleryInterval;
let playMusic = false;

// ===== TRIGGER MUSIC + ANIMATION =====
window.addEventListener("load", () => {
  Swal.fire({
    title: "🎂 Chúc mừng sinh nhật Hải Phương!",
    html: '<p style="color: #666;">Chị có muốn bật nhạc nền không nhỉ?</p>',
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#ff69b4",
    cancelButtonColor: "#9b59b6",
    confirmButtonText: "🎵 Có, bật nhạc!",
    cancelButtonText: "Không, cảm ơn",
    background: 'linear-gradient(135deg, #fff 0%, #ffe6f0 100%)',
    backdrop: `
      rgba(0,0,0,0.6)
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ctext y='50' font-size='50'%3E💖%3C/text%3E%3C/svg%3E")
      center center
      no-repeat
    `
  }).then((result) => {
    if (result.isConfirmed) {
      playMusic = true;
      document.getElementById("song1").play();
      
      // Switch to romantic music after 1 minute 30 seconds
      setTimeout(switchToRomanticMusic, 90000);
    }
    animationTimeline();
    createFloatingHearts();
  });
});

// ===== SWITCH TO ROMANTIC MUSIC =====
function switchToRomanticMusic() {
  if (!playMusic) return;
  
  const song1 = document.getElementById("song1");
  const song2 = document.getElementById("song2");
  
  // Check if song1 is still playing
  if (song1.paused) return;
  
  // Fade out song1
  let volume = 1;
  const fadeOut = setInterval(() => {
    volume -= 0.1;
    if (volume <= 0) {
      song1.pause();
      song1.volume = 1;
      clearInterval(fadeOut);
      
      // Start song2
      song2.volume = 0;
      song2.play();
      
      // Fade in song2
      let vol2 = 0;
      const fadeIn = setInterval(() => {
        vol2 += 0.1;
        if (vol2 >= 1) {
          song2.volume = 1;
          clearInterval(fadeIn);
        } else {
          song2.volume = vol2;
        }
      }, 100);
    } else {
      song1.volume = volume;
    }
  }, 100);
}

// ===== FADE OUT MUSIC =====
function fadeOutMusic() {
  if (!playMusic) return;
  
  const song1 = document.getElementById("song1");
  const song2 = document.getElementById("song2");
  const activeSong = !song1.paused ? song1 : song2;
  
  let volume = activeSong.volume;
  const fadeOut = setInterval(() => {
    volume -= 0.05;
    if (volume <= 0) {
      activeSong.pause();
      activeSong.volume = 1;
      clearInterval(fadeOut);
    } else {
      activeSong.volume = volume;
    }
  }, 100);
}

// ===== FADE IN MUSIC =====
function fadeInMusic() {
  if (!playMusic) return;
  
  const song2 = document.getElementById("song2");
  
  song2.volume = 0;
  song2.play();
  
  let volume = 0;
  const fadeIn = setInterval(() => {
    volume += 0.05;
    if (volume >= 1) {
      song2.volume = 1;
      clearInterval(fadeIn);
    } else {
      song2.volume = volume;
    }
  }, 100);
}

// ===== CREATE FLOATING HEARTS =====
function createFloatingHearts() {
  const container = document.getElementById('floatingHearts');
  const hearts = ['💖', '💕', '💗', '💝', '💓', '💘', '❤️', '🩷'];
  
  setInterval(() => {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    container.appendChild(heart);
    
    setTimeout(() => heart.remove(), 7000);
  }, 500);
}

// ===== GALLERY FUNCTIONS =====
function initGallery() {
  const dotsContainer = document.getElementById('galleryDots');
  
  // Clear existing dots
  dotsContainer.innerHTML = '';
  
  // Create dots
  galleryImages.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.className = `gallery-dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  // Navigation buttons
  document.getElementById('prevBtn').addEventListener('click', prevSlide);
  document.getElementById('nextBtn').addEventListener('click', nextSlide);
  
  // Reset to first slide
  currentGalleryIndex = 0;
  const images = document.querySelectorAll('.gallery-img');
  images.forEach((img, i) => {
    img.classList.toggle('active', i === 0);
  });
  
  // Auto slideshow - 1.5 seconds per image
  startAutoSlideshow();
}

function goToSlide(index) {
  const images = document.querySelectorAll('.gallery-img');
  const dots = document.querySelectorAll('.gallery-dot');
  const caption = document.getElementById('galleryCaption');
  
  if (images.length === 0) return;
  
  images[currentGalleryIndex].classList.remove('active');
  if (dots[currentGalleryIndex]) dots[currentGalleryIndex].classList.remove('active');
  
  currentGalleryIndex = index;
  if (currentGalleryIndex >= images.length) currentGalleryIndex = 0;
  if (currentGalleryIndex < 0) currentGalleryIndex = images.length - 1;
  
  images[currentGalleryIndex].classList.add('active');
  if (dots[currentGalleryIndex]) dots[currentGalleryIndex].classList.add('active');
  caption.textContent = galleryImages[currentGalleryIndex].caption;
}

function nextSlide() {
  goToSlide(currentGalleryIndex + 1);
}

function prevSlide() {
  goToSlide(currentGalleryIndex - 1);
}

function startAutoSlideshow() {
  stopAutoSlideshow();
  galleryInterval = setInterval(nextSlide, 2000);
}

function stopAutoSlideshow() {
  if (galleryInterval) {
    clearInterval(galleryInterval);
  }
}

// ===== ANIMATION TIMELINE =====
const animationTimeline = () => {
  // Split chars for animation
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  // Timeline
  const tl = new TimelineMax();

  tl.to(".container", 0.6, {
    visibility: "visible",
  })
    .from(".one", 0.7, {
      opacity: 0,
      y: 10,
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=3.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=3"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0,
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0,
    })
    .staggerTo(
      ".hbd-chatbox span",
      1.5,
      {
        visibility: "visible",
      },
      0.05
    )
    .to(
      ".fake-btn",
      0.1,
      {
        backgroundColor: "rgb(127, 206, 248)",
      },
      "+=4"
    )
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150,
      },
      "+=1"
    )
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0,
      },
      "+=1.5"
    )
    .to(
      ".idea-5 span",
      0.7,
      {
        rotation: 90,
        x: 8,
      },
      "+=1.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0,
      },
      "+=2"
    )
    .staggerFromTo(
      ".baloons img",
      2.5,
      {
        opacity: 0.9,
        y: 1400,
      },
      {
        opacity: 1,
        y: -1000,
      },
      0.2
    )
    .from(
      ".profile-picture",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45,
      },
      "-=2"
    )
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0,
    })
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5),
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150,
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut,
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg",
      },
      "party"
    )
    .staggerTo(
      ".eight svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4,
      },
      0.3
    )
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1",
    })
    // ===== GALLERY SECTION =====
    .to(".gallery-section", 0.1, {
      visibility: "visible",
    })
    .to(".gallery-section", 1, {
      opacity: 1,
      ease: Power2.easeOut,
      onStart: initGallery,
    })
    // Wait for all 17 images (17 * 2s = 34s, so use 35s)
    .to(".gallery-section", 0.5, {
      opacity: 0,
      visibility: "hidden",
      onComplete: stopAutoSlideshow,
    }, "+=35")
    // ===== FINAL SECTION - ĐỘNG LỰC TRIẾT LÝ (ĐÃ ĐỔI LÊN TRƯỚC) =====
    .to(".nine", 0.1, {
      visibility: "visible",
    })
    .from(".final-container", 1, {
      scale: 0.8,
      opacity: 0,
      y: 50,
      ease: Power2.easeOut,
    })
    .to(".final-text-3", 1, {
      opacity: 1,
      y: 0,
      scale: 1,
      ease: Power2.easeOut,
    })
    .to(".final-text-3.highlight", 1, {
      opacity: 1,
      y: 0,
      scale: 1,
      ease: Elastic.easeOut.config(1, 0.5),
    }, "-=0.3")
    // Stay on philosophy section for 10 seconds total
    .to(".nine", 0.5, {
      opacity: 0,
      visibility: "hidden",
      onComplete: fadeOutMusic,
    }, "+=10")
    // Dark screen transition for 5 seconds
    .to(".container", 0.5, {
      opacity: 0,
    })
    .to(".container", 0.1, {}, "+=5") // Wait 5 seconds in darkness
    .to(".container", 0.5, {
      opacity: 1,
      onStart: fadeInMusic,
    })
    // ===== LETTER SECTION - LÁ THƯ TÂM SỰ =====
    .to(".letter-section", 0.1, {
      visibility: "visible",
    })
    .to(".letter-section", 1, {
      opacity: 1,
      ease: Power2.easeOut,
    })
    .from(".letter-paper", 1.2, {
      scale: 0.8,
      rotationX: -30,
      opacity: 0,
      ease: Back.easeOut.config(1.7),
    })
    .to(".letter-greeting", 0.8, {
      opacity: 1,
      ease: Power2.easeOut,
    })
    .staggerTo(".letter-line", 1, {
      opacity: 1,
      x: 0,
      ease: Power2.easeOut,
    }, 0.8)
    .to(".letter-closing", 0.6, {
      opacity: 1,
      ease: Power2.easeOut,
    }, "-=0.3")
    .to(".letter-signature", 0.5, {
      opacity: 1,
      scale: 1.2,
      ease: Elastic.easeOut.config(1, 0.5),
    }, "-=0.2");

  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    stopAutoSlideshow();
    currentGalleryIndex = 0;
    
    // Reset music - play hpbd first, then switch after 1 minute
    if (playMusic) {
      document.getElementById("song2").pause();
      document.getElementById("song2").currentTime = 0;
      document.getElementById("song1").currentTime = 0;
      document.getElementById("song1").volume = 1;
      document.getElementById("song1").play();
      
      // Switch to romantic music after 1 minute 30 seconds
      setTimeout(switchToRomanticMusic, 90000);
    }
    
    // Reset all animated elements
    document.querySelectorAll('.final-text-3').forEach(el => {
      el.style.opacity = '0';
    });
    document.querySelectorAll('.letter-greeting, .letter-line, .letter-closing').forEach(el => {
      el.style.opacity = '0';
    });
    
    tl.restart();
  });
};
