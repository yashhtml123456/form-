    // --- Mobile Menu ---
        const menuBtn = document.getElementById('menu-btn');
        const closeBtn = document.getElementById('close-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('-translate-x-full');
        });

        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.add('-translate-x-full');
        });
        
        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('-translate-x-full');
            });
        });


        // --- Image Slider ---
        const slider = document.getElementById('slider');
        const slides = slider.children.length;
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentIndex = 0;
        let slideInterval;

        function goToSlide(index) {
            if (index < 0) {
                index = slides - 1;
            } else if (index >= slides) {
                index = 0;
            }
            slider.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }
        
        function startSlider() {
           slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }

        function stopSlider() {
            clearInterval(slideInterval);
        }

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlider();
            startSlider();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlider();
            startSlider();
        });
        
        startSlider();


        // --- Animated Counter ---
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the #, the faster the count

        const animateCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            
            const updateCount = () => {
                // Calculate the increment
                const inc = Math.ceil(target / speed);
                count += inc;

                if (count < target) {
                    counter.innerText = count;
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };
            requestAnimationFrame(updateCount);
        };
        
        const observerOptions = {
            root: null,
            threshold: 0.5 
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target); // Stop observing after animation
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });