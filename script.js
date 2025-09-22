document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80, 
          behavior: 'smooth'
        });
      }
    });
  });

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2
  });

  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    observer.observe(section);
  });

  // كود النص المتحرك
  const professions = [
    "رئيس حسابات",
    "مدير مالي",
    "محلل مالي",
    "مراجع حسابات"
  ];
  let professionIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const animatedTextElement = document.querySelector('.animated-text');

  function typeProfession() {
    const currentProfession = professions[professionIndex];
    if (isDeleting) {
      animatedTextElement.textContent = currentProfession.substring(0, charIndex - 1);
      charIndex--;
    } else {
      animatedTextElement.textContent = currentProfession.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentProfession.length + 1) {
      setTimeout(() => isDeleting = true, 1000); // انتظر ثانية قبل البدء في المسح
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      professionIndex = (professionIndex + 1) % professions.length;
      setTimeout(typeProfession, 500); // انتظر نصف ثانية قبل كتابة الكلمة التالية
    } else {
      const typingSpeed = isDeleting ? 75 : 150; // سرعة المسح أسرع من الكتابة
      setTimeout(typeProfession, typingSpeed);
    }
  }

  typeProfession(); // ابدأ وظيفة الكتابة

});
// JavaScript for the typing and erasing effect
document.addEventListener('DOMContentLoaded', function() {
    const typedTextSpan = document.getElementById('typed-text');
    
    // The words that will appear one after another
    const textArray = ["رئيس حسابات", "محلل مالي", "مراجع حسابات", "وائل عثمان"];
    
    // Speed settings (in milliseconds)
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 1500; // Pause before erasing

    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, pauseTime);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, deletingSpeed);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) {
                textArrayIndex = 0; // Loop back to the beginning
            }
            setTimeout(type, typingSpeed + 500); // Wait a bit before starting to type again
        }
    }

    // Start the typing effect when the page loads
    setTimeout(type, pauseTime);
});
