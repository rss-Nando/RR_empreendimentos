// script.js - Funcionalidades para o site R&R Empreendimentos

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // ========== FUNCIONALIDADES GERAIS ==========
    
    // Atualiza o ano atual no footer
    function updateCurrentYear() {
        const currentYear = new Date().getFullYear();
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = currentYear;
        }
    }
    
    // ========== ANIMAÇÃO DE REVEAL NAS SEÇÕES ==========
    function initScrollReveal() {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // ========== SMOOTH SCROLL PARA ÂNCORAS ==========
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Ignora âncoras vazias
                if (href === '#' || href === '') return;
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('.cabecalho').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Atualiza a URL sem recarregar a página
                    history.pushState(null, null, href);
                }
            });
        });
    }
    
    // ========== FORMULÁRIO DE CONTATO ==========
    function initContactForm() {
        const form = document.getElementById('contatoForm');
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação dos campos obrigatórios
            const requiredInputs = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#e74c3c';
                    isValid = false;
                    
                    // Adiciona mensagem de erro
                    let errorMsg = input.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-msg')) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-msg';
                        errorMsg.style.color = '#e74c3c';
                        errorMsg.style.fontSize = '0.85rem';
                        errorMsg.style.marginTop = '-15px';
                        errorMsg.style.marginBottom = '15px';
                        errorMsg.textContent = 'Este campo é obrigatório';
                        input.parentNode.insertBefore(errorMsg, input.nextSibling);
                    }
                } else {
                    input.style.borderColor = '#27ae60';
                    
                    // Remove mensagem de erro se existir
                    const errorMsg = input.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-msg')) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (isValid) {
                // Simula envio do formulário
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                const originalWidth = submitButton.offsetWidth;
                
                // Mantém o tamanho do botão
                submitButton.style.minWidth = originalWidth + 'px';
                submitButton.textContent = 'ENVIANDO...';
                submitButton.disabled = true;
                
                // Simula delay de envio
                setTimeout(() => {
                    // Aqui você implementaria o envio real (Fetch API, etc.)
                    
                    // Feedback visual de sucesso
                    alert('Solicitação enviada com sucesso! Entraremos em contato em breve.');
                    
                    // Limpa o formulário
                    form.reset();
                    
                    // Restaura o botão
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.minWidth = '';
                    
                    // Remove estilos de validação
                    requiredInputs.forEach(input => {
                        input.style.borderColor = '#e9ecef';
                        const errorMsg = input.nextElementSibling;
                        if (errorMsg && errorMsg.classList.contains('error-msg')) {
                            errorMsg.remove();
                        }
                    });
                }, 1500);
            } else {
                // Feedback visual para campos inválidos
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
        
        // Remove estilos de validação ao digitar
        form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '#e9ecef';
                    
                    // Remove mensagem de erro
                    const errorMsg = this.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-msg')) {
                        errorMsg.remove();
                    }
                }
            });
        });
    }
    
    // ========== HEADER SCROLL EFFECT ==========
    function initHeaderScrollEffect() {
        const header = document.querySelector('.cabecalho');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                // Rola para baixo
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                // Rola para cima
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // ========== LAZY LOADING PARA IMAGENS ==========
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        
                        img.classList.remove('loading');
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.classList.add('loading');
                imageObserver.observe(img);
            });
        }
    }
    
    // ========== WHATSAPP BUTTON TRACKING ==========
    function initWhatsAppTracking() {
        const whatsappButtons = document.querySelectorAll('a[href*="whatsapp"]');
        
        whatsappButtons.forEach(button => {
            button.addEventListener('click', function() {
                const technicianName = this.textContent.includes('RAMON') ? 'Ramon' :
                                     this.textContent.includes('VICTOR') ? 'Victor' :
                                     this.textContent.includes('FERNANDO') ? 'Fernando' : 'Geral';
                
                // Aqui você pode enviar um evento para o Google Analytics
                console.log(`WhatsApp clicado: ${technicianName}`);
                
                // Ou enviar para um sistema de analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'whatsapp_click', {
                        'event_category': 'Contato',
                        'event_label': technicianName
                    });
                }
            });
        });
    }
    
    // ========== INITIALIZE ALL FUNCTIONS ==========
    function initAll() {
        updateCurrentYear();
        updateEmergencyCounter();
        initScrollReveal();
        initSmoothScroll();
        initContactForm();
        initHeaderScrollEffect();
        initLazyLoading();
        initWhatsAppTracking();
        
        // Atualiza o contador a cada hora
        setInterval(updateEmergencyCounter, 3600000);
    }
    
    // Inicializa tudo quando o DOM estiver pronto
    initAll();
});

// Função para lidar com erros não capturados
window.addEventListener('error', function(e) {
    console.error('Erro detectado:', e.error);
});

// Adiciona classe para suporte a animações CSS
document.documentElement.classList.add('js-enabled');