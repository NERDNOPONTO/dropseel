// Script para a página de vendas do eBook DROPSELL

document.addEventListener('DOMContentLoaded', function() {
    // Inicialização do slider de depoimentos
    initTestimonialsSlider();
    
    // Inicialização do FAQ expansível
    initFaqAccordion();
    
    // Inicialização dos efeitos de scroll
    initScrollEffects();
    
    // Inicialização dos botões de navegação
    initNavigationButtons();
});

// Slider de Depoimentos
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const slides = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slider || !slides.length || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Configuração inicial
    updateSliderPosition();
    
    // Evento para o botão anterior
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSliderPosition();
    });
    
    // Evento para o botão próximo
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSliderPosition();
    });
    
    // Atualiza a posição do slider
    function updateSliderPosition() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.style.transform = 'translateX(0)';
                slide.style.opacity = '1';
            } else {
                const offset = index < currentSlide ? -100 : 100;
                slide.style.transform = `translateX(${offset}%)`;
                slide.style.opacity = '0';
            }
        });
    }
    
    // Auto-rotação do slider a cada 5 segundos
    setInterval(function() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSliderPosition();
    }, 5000);
}

// FAQ Accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alterna o estado do item atual
            item.classList.toggle('active');
        });
    });
    
    // Abre o primeiro item por padrão
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
}

// Efeitos de Scroll
function initScrollEffects() {
    // Animação de fade-in para elementos ao rolar a página
    const elementsToAnimate = document.querySelectorAll('.problem-item, .method-step, .module, .bonus-item');
    
    // Função para verificar se um elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Função para animar elementos visíveis
    function animateVisibleElements() {
        elementsToAnimate.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configuração inicial dos elementos
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Verificar elementos visíveis no carregamento inicial
    animateVisibleElements();
    
    // Verificar elementos visíveis ao rolar a página
    window.addEventListener('scroll', animateVisibleElements);
    
    // Efeito de navbar fixa com mudança de estilo ao rolar
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Botões de Navegação
function initNavigationButtons() {
    // Scroll suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para a altura da navbar
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Botão de voltar ao topo
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '20px';
    scrollToTopBtn.style.right = '20px';
    scrollToTopBtn.style.width = '50px';
    scrollToTopBtn.style.height = '50px';
    scrollToTopBtn.style.borderRadius = '50%';
    scrollToTopBtn.style.backgroundColor = 'var(--primary-color)';
    scrollToTopBtn.style.color = 'var(--secondary-color)';
    scrollToTopBtn.style.border = 'none';
    scrollToTopBtn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    scrollToTopBtn.style.cursor = 'pointer';
    scrollToTopBtn.style.display = 'none';
    scrollToTopBtn.style.zIndex = '999';
    scrollToTopBtn.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.display = 'block';
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 500) {
                    scrollToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });
}

// Contador regressivo para criar senso de urgência
function initCountdown() {
    const countdownElement = document.createElement('div');
    countdownElement.className = 'countdown';
    countdownElement.style.backgroundColor = 'var(--secondary-color)';
    countdownElement.style.color = 'var(--light-color)';
    countdownElement.style.padding = '10px';
    countdownElement.style.textAlign = 'center';
    countdownElement.style.fontWeight = 'bold';
    
    const pricingSection = document.querySelector('.pricing');
    if (pricingSection) {
        pricingSection.querySelector('.container').insertBefore(countdownElement, pricingSection.querySelector('.pricing-card'));
    }
    
    // Define o tempo final (24 horas a partir de agora)
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);
    
    function updateCountdown() {
        const now = new Date();
        const timeLeft = endTime - now;
        
        if (timeLeft <= 0) {
            countdownElement.innerHTML = 'A oferta expirou!';
            return;
        }
        
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `<span style="font-size: 1.2rem;">OFERTA ESPECIAL TERMINA EM:</span> <br>
            <span style="font-size: 1.5rem; color: var(--primary-color);">${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</span>`;
    }
    
    // Atualiza o contador a cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Inicializa o contador regressivo
initCountdown();
