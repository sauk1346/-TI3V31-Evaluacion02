// ===== GAMESART - JAVASCRIPT SIMPLIFICADO =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 1. BOTÓN DE ESTADÍSTICAS EN VENTANA PRINCIPAL =====
    function configurarBotonEstadisticas() {
        // Solo ejecutar en la página principal (index.html)
        if (document.querySelector('.table-gaming')) {
            const section = document.querySelector('section.mb-5');
            
            // Crear información adicional oculta
            const infoAdicional = document.createElement('div');
            infoAdicional.id = 'infoAdicional';
            infoAdicional.className = 'mt-4 p-4 bg-info bg-opacity-10 rounded';
            infoAdicional.style.display = 'none';
            infoAdicional.innerHTML = `
                <h4 class="text-info">📊 Estadísticas de Gaming</h4>
                <div class="row">
                    <div class="col-md-4">
                        <div class="stat-card p-3 bg-white rounded shadow-sm">
                            <h5 class="text-primary">2.8 mil millones</h5>
                            <p class="mb-0">Jugadores en el mundo</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="stat-card p-3 bg-white rounded shadow-sm">
                            <h5 class="text-success">$184 mil millones</h5>
                            <p class="mb-0">Ingresos de la industria 2023</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="stat-card p-3 bg-white rounded shadow-sm">
                            <h5 class="text-warning">70%</h5>
                            <p class="mb-0">Juegos que incluyen arte personalizado</p>
                        </div>
                    </div>
                </div>
            `;
            
            // Crear botón toggle
            const btnToggle = document.createElement('button');
            btnToggle.className = 'btn btn-outline-info mt-3';
            btnToggle.innerHTML = '<i class="fas fa-chart-bar"></i> Ver Estadísticas';
            btnToggle.id = 'btnToggleStats';
            
            section.appendChild(btnToggle);
            section.appendChild(infoAdicional);
            
            // Event listener para mostrar/ocultar
            btnToggle.addEventListener('click', function() {
                const info = document.getElementById('infoAdicional');
                const isVisible = info.style.display !== 'none';
                
                if (isVisible) {
                    // Ocultar con animación
                    info.style.transition = 'all 0.3s ease';
                    info.style.opacity = '0';
                    info.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        info.style.display = 'none';
                    }, 300);
                    btnToggle.innerHTML = '<i class="fas fa-chart-bar"></i> Ver Estadísticas';
                    btnToggle.classList.remove('btn-info');
                    btnToggle.classList.add('btn-outline-info');
                } else {
                    // Mostrar con animación
                    info.style.display = 'block';
                    info.style.opacity = '0';
                    info.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        info.style.transition = 'all 0.3s ease';
                        info.style.opacity = '1';
                        info.style.transform = 'translateY(0)';
                    }, 10);
                    btnToggle.innerHTML = '<i class="fas fa-chart-bar"></i> Ocultar Estadísticas';
                    btnToggle.classList.remove('btn-outline-info');
                    btnToggle.classList.add('btn-info');
                }
            });
        }
    }
    
    // ===== 2. FUNCIONALIDAD "LEER MÁS" EN CARDS DE IMÁGENES =====
    function configurarLeerMas() {
        const cards = document.querySelectorAll('.card-text');
        
        if (cards.length === 0) {
            return;
        }
        
        cards.forEach((card, index) => {
            const textoCompleto = card.textContent.trim();
            
            // Aplicar "Leer más" a TODAS las cards, sin importar la longitud
            if (textoCompleto.length > 0) {
                // Definir punto de truncado (máximo 50 caracteres para asegurar que se vea el efecto)
                const puntoTruncado = Math.min(50, textoCompleto.length - 1);
                const textoCorto = textoCompleto.substring(0, puntoTruncado);
                
                // Crear elementos para el texto
                const spanCorto = document.createElement('span');
                spanCorto.className = 'texto-corto';
                spanCorto.textContent = textoCorto + '...';
                
                const spanCompleto = document.createElement('span');
                spanCompleto.className = 'texto-completo';
                spanCompleto.textContent = textoCompleto;
                spanCompleto.style.display = 'none';
                
                // Crear link "Leer más"
                const linkLeerMas = document.createElement('a');
                linkLeerMas.href = '#';
                linkLeerMas.className = 'text-decoration-none ms-2 leer-mas-link';
                linkLeerMas.innerHTML = '<small class="text-primary">Leer más</small>';
                
                // Limpiar contenido original y agregar nuevos elementos
                card.innerHTML = '';
                card.appendChild(spanCorto);
                card.appendChild(linkLeerMas);
                card.appendChild(spanCompleto);
                
                // Event listener para el link
                linkLeerMas.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const textoCortoEl = card.querySelector('.texto-corto');
                    const textoCompletoEl = card.querySelector('.texto-completo');
                    
                    if (textoCompletoEl.style.display === 'none') {
                        // Mostrar texto completo
                        textoCortoEl.style.display = 'none';
                        textoCompletoEl.style.display = 'inline';
                        linkLeerMas.innerHTML = '<small class="text-secondary">Leer menos</small>';
                        
                        // Efecto de aparición suave
                        textoCompletoEl.style.opacity = '0';
                        setTimeout(() => {
                            textoCompletoEl.style.transition = 'opacity 0.3s ease';
                            textoCompletoEl.style.opacity = '1';
                        }, 10);
                    } else {
                        // Mostrar texto corto
                        textoCortoEl.style.display = 'inline';
                        textoCompletoEl.style.display = 'none';
                        linkLeerMas.innerHTML = '<small class="text-primary">Leer más</small>';
                    }
                });
            }
        });
    }
    
    // ===== 3. VALIDACIÓN DE EMAIL =====
    function configurarValidacionEmail() {
        const emailInput = document.getElementById('email');
        
        if (!emailInput) {
            return;
        }

        // Función para validar email
        function validarEmail(email) {
            // Regex para validar formato de email
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                return {
                    valido: false,
                    mensaje: 'Por favor, ingresa tu correo electrónico'
                };
            }
            
            if (!regex.test(email)) {
                return {
                    valido: false,
                    mensaje: 'Por favor, ingresa un correo electrónico válido'
                };
            }
            
            // Validaciones adicionales
            if (email.length > 100) {
                return {
                    valido: false,
                    mensaje: 'El correo electrónico es demasiado largo'
                };
            }
            
            // Verificar dominios comunes
            const dominio = email.split('@')[1];
            const dominiosPermitidos = [
                'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
                'live.com', 'icloud.com', 'protonmail.com', 'mail.com'
            ];
            
            if (!dominiosPermitidos.includes(dominio)) {
                return {
                    valido: true,
                    mensaje: 'Email válido (dominio no común, pero permitido)'
                };
            }
            
            return {
                valido: true,
                mensaje: 'Email válido'
            };
        }
        
        // Crear elemento para mostrar feedback
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'email-feedback';
        feedbackDiv.style.fontSize = '0.875rem';
        feedbackDiv.style.marginTop = '0.25rem';
        emailInput.parentNode.appendChild(feedbackDiv);
        
        // Validación en tiempo real
        emailInput.addEventListener('input', function() {
            const email = this.value.trim();
            const resultado = validarEmail(email);
            
            // Limpiar clases anteriores
            this.classList.remove('is-valid', 'is-invalid');
            feedbackDiv.classList.remove('text-success', 'text-danger');
            
            if (email === '') {
                // Sin entrada
                feedbackDiv.textContent = '';
                return;
            }
            
            if (resultado.valido) {
                // Email válido
                this.classList.add('is-valid');
                feedbackDiv.className = 'email-feedback text-success';
                feedbackDiv.innerHTML = `<i class="fas fa-check-circle me-1"></i>${resultado.mensaje}`;
            } else {
                // Email inválido
                this.classList.add('is-invalid');
                feedbackDiv.className = 'email-feedback text-danger';
                feedbackDiv.innerHTML = `<i class="fas fa-exclamation-circle me-1"></i>${resultado.mensaje}`;
            }
        });
        
        // Validación en el envío del formulario
        const formulario = emailInput.closest('form');
        if (formulario) {
            formulario.addEventListener('submit', function(e) {
                const email = emailInput.value.trim();
                const resultado = validarEmail(email);
                
                if (!resultado.valido) {
                    e.preventDefault();
                    emailInput.focus();
                    
                    // Mostrar mensaje de error más visible
                    const mensajeError = document.createElement('div');
                    mensajeError.className = 'alert alert-danger alert-dismissible fade show mt-3';
                    mensajeError.innerHTML = `
                        <strong>Error en el email:</strong> ${resultado.mensaje}
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    `;
                    
                    // Insertar mensaje después del formulario
                    formulario.parentNode.insertBefore(mensajeError, formulario.nextSibling);
                    
                    // Auto-remover después de 5 segundos
                    setTimeout(() => {
                        if (mensajeError.parentNode) {
                            mensajeError.remove();
                        }
                    }, 5000);
                } else {
                    // Email válido, mostrar mensaje de éxito
                    const mensajeExito = document.createElement('div');
                    mensajeExito.className = 'alert alert-success alert-dismissible fade show mt-3';
                    mensajeExito.innerHTML = `
                        <strong>¡Excelente!</strong> El formulario se enviaría correctamente.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    `;
                    
                    formulario.parentNode.insertBefore(mensajeExito, formulario.nextSibling);
                    
                    // Auto-remover después de 3 segundos
                    setTimeout(() => {
                        if (mensajeExito.parentNode) {
                            mensajeExito.remove();
                        }
                    }, 3000);
                }
            });
        }
    }
    
    // ===== 4. ALTERNAR IMÁGENES AL PASAR EL MOUSE =====
    function configurarImagenesHover() {
        const imagenes = document.querySelectorAll('.card-gaming img');
        
        if (imagenes.length === 0) {
            return;
        }
        
        // Imágenes alternativas - usando la ruta completa como clave
        const imagenesAlternativas = {
            '../images/zelda/fig01.jpg': '../images/zelda/fig01_alt.jpg',
            '../images/zelda/fig02.jpg': '../images/zelda/fig02_alt.jpg', 
            '../images/zelda/fig03.jpg': '../images/zelda/fig03_alt.jpg',
            
            '../images/witcher3/fig01.jpg': '../images/witcher3/fig01_alt.jpg',
            '../images/witcher3/fig02.jpg': '../images/witcher3/fig02_alt.jpg',
            '../images/witcher3/fig03.jpg': '../images/witcher3/fig03_alt.jpg',
            
            '../images/godofwar/fig01.jpg': '../images/godofwar/fig01_alt.jpg',
            '../images/godofwar/fig02.jpg': '../images/godofwar/fig02_alt.jpg',
            '../images/godofwar/fig03.jpg': '../images/godofwar/fig03_alt.jpg'
        };
        
        const coloresAlternativos = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', 
            '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43'
        ];
        
        imagenes.forEach((img, index) => {
            const srcOriginal = img.src;
            let srcAlternativa;
            
            const rutaCompleta = img.getAttribute('src');
            
            if (imagenesAlternativas[rutaCompleta]) {
                srcAlternativa = imagenesAlternativas[rutaCompleta];
            } else {
                // Crear imagen placeholder colorida específica para cada juego
                const color = coloresAlternativos[index % coloresAlternativos.length];
                const titulo = img.alt || 'Gaming Art';
                
                // Determinar el juego basado en la ruta
                let juegoNombre = 'Gaming Art';
                if (rutaCompleta.includes('zelda')) {
                    juegoNombre = 'ZELDA ALT';
                } else if (rutaCompleta.includes('witcher3')) {
                    juegoNombre = 'WITCHER ALT';
                } else if (rutaCompleta.includes('godofwar')) {
                    juegoNombre = 'GOD OF WAR ALT';
                }
                
                srcAlternativa = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="100%25" height="100%25" fill="${color}"/%3E%3Ctext x="50%25" y="35%25" text-anchor="middle" dy=".3em" fill="white" font-size="16" font-weight="bold"%3E${encodeURIComponent(juegoNombre)}%3C/text%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-size="14"%3E${encodeURIComponent(titulo)}%3C/text%3E%3Ctext x="50%25" y="65%25" text-anchor="middle" dy=".3em" fill="white" font-size="12"%3EALTERNATE VIEW%3C/text%3E%3C/svg%3E`;
            }
            
            // Agregar estilos para transición suave
            img.style.transition = 'all 0.4s ease';
            img.style.cursor = 'pointer';
            
            // Event listener para mouseenter (cuando el mouse entra)
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.filter = 'brightness(1.1)';
                this.src = srcAlternativa;
            });
            
            // Event listener para mouseleave (cuando el mouse sale)
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.filter = 'brightness(1)';
                this.src = srcOriginal;
            });
            
            // Manejar errores de carga de imagen
            img.addEventListener('error', function() {
                // Si falla cargar la imagen alternativa, usar placeholder
                if (this.src !== srcOriginal) {
                    const color = coloresAlternativos[index % coloresAlternativos.length];
                    const titulo = this.alt || 'Gaming Art';
                    this.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="100%25" height="100%25" fill="${color}"/%3E%3Ctext x="50%25" y="45%25" text-anchor="middle" dy=".3em" fill="white" font-size="18" font-weight="bold"%3E${encodeURIComponent(titulo)}%3C/text%3E%3Ctext x="50%25" y="60%25" text-anchor="middle" dy=".3em" fill="white" font-size="12"%3EIMAGE NOT FOUND%3C/text%3E%3C/svg%3E`;
                }
            });
            
            // Efecto adicional: parpadeo sutil al cargar
            img.addEventListener('load', function() {
                this.style.opacity = '0.7';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 150);
            });
        });
    }
    
    // ===== INICIALIZACIÓN =====
    configurarBotonEstadisticas();
    configurarLeerMas();
    configurarValidacionEmail();
    configurarImagenesHover();
});