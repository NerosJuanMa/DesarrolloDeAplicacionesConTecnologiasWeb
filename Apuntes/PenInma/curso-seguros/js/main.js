// Curso de Seguros - JavaScript Principal
class CursoSeguros {
    constructor() {
        this.currentModule = 1;
        this.currentTopic = 1;
        this.userProgress = this.loadProgress();
        this.testResults = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateProgressBar();
        this.loadCurrentPage();
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.attachNavigationEvents();
            this.attachTestEvents();
            this.setupSmoothScrolling();
        });
    }

    // Gestión de navegación
    navigateTo(module, topic = 1) {
        this.currentModule = module;
        this.currentTopic = topic;
        this.saveProgress();
        this.updateProgressBar();
        
        const url = this.getModuleUrl(module, topic);
        if (url) {
            window.location.href = url;
        }
    }

    getModuleUrl(module, topic) {
        const urlMap = {
            0: 'index.html',
            1: {
                1: 'modulos/modulo1-1.html',
                2: 'modulos/modulo1-2.html',
                3: 'modulos/modulo1-3.html',
                4: 'modulos/modulo1-4.html',
                5: 'modulos/modulo1-5.html',
                6: 'modulos/modulo1-6.html',
                7: 'modulos/modulo1-7.html',
                8: 'modulos/modulo1-8.html',
                9: 'modulos/modulo1-9.html'
            },
            2: {
                1: 'modulos/modulo2-1.html',
                2: 'modulos/modulo2-2.html',
                3: 'modulos/modulo2-3.html',
                4: 'modulos/modulo2-4.html',
                5: 'modulos/modulo2-5.html',
                6: 'modulos/modulo2-6.html'
            },
            3: {
                1: 'modulos/modulo3-1.html',
                2: 'modulos/modulo3-2.html',
                3: 'modulos/modulo3-3.html',
                4: 'modulos/modulo3-4.html',
                5: 'modulos/modulo3-5.html',
                6: 'modulos/modulo3-6.html',
                7: 'modulos/modulo3-7.html',
                8: 'modulos/modulo3-8.html',
                9: 'modulos/modulo3-9.html',
                10: 'modulos/modulo3-10.html',
                11: 'modulos/modulo3-11.html'
            },
            4: {
                1: 'modulos/modulo4-1.html',
                2: 'modulos/modulo4-2.html',
                3: 'modulos/modulo4-3.html',
                4: 'modulos/modulo4-4.html',
                5: 'modulos/modulo4-5.html'
            }
        };

        if (module === 0) return urlMap[0];
        return urlMap[module] && urlMap[module][topic] ? urlMap[module][topic] : null;
    }

    // Sistema de progreso
    updateProgressBar() {
        const progressBar = document.querySelector('.progress-fill');
        if (progressBar) {
            const totalTopics = 31; // Total de temas
            const completedTopics = Object.keys(this.userProgress.completed || {}).length;
            const progress = (completedTopics / totalTopics) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }

    markTopicComplete(module, topic) {
        if (!this.userProgress.completed) {
            this.userProgress.completed = {};
        }
        this.userProgress.completed[`${module}-${topic}`] = true;
        this.saveProgress();
        this.updateProgressBar();
    }

    // Gestión de localStorage
    saveProgress() {
        localStorage.setItem('curso-seguros-progress', JSON.stringify(this.userProgress));
    }

    loadProgress() {
        const saved = localStorage.getItem('curso-seguros-progress');
        return saved ? JSON.parse(saved) : { completed: {}, testScores: {} };
    }

    // Sistema de tests
    initializeTest(questions) {
        this.currentTest = {
            questions: questions,
            answers: {},
            currentQuestion: 0,
            score: 0
        };
        this.renderTest();
    }

    renderTest() {
        const testContainer = document.querySelector('.test-container');
        if (!testContainer || !this.currentTest) return;

        const question = this.currentTest.questions[this.currentTest.currentQuestion];
        const questionNumber = this.currentTest.currentQuestion + 1;
        const totalQuestions = this.currentTest.questions.length;

        testContainer.innerHTML = `
            <div class="test-header">
                <h3>Pregunta ${questionNumber} de ${totalQuestions}</h3>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(questionNumber / totalQuestions) * 100}%"></div>
                </div>
            </div>
            <div class="question">
                <h4>${question.question}</h4>
                <ul class="options">
                    ${question.options.map((option, index) => 
                        `<li data-option="${index}" onclick="curso.selectOption(${index})">${option}</li>`
                    ).join('')}
                </ul>
            </div>
            <div class="test-controls">
                <button class="btn btn-primary" onclick="curso.previousQuestion()" ${questionNumber === 1 ? 'disabled' : ''}>
                    Anterior
                </button>
                <button class="btn btn-success" onclick="curso.nextQuestion()" id="nextBtn" disabled>
                    ${questionNumber === totalQuestions ? 'Finalizar Test' : 'Siguiente'}
                </button>
            </div>
        `;
    }

    selectOption(optionIndex) {
        // Limpiar selecciones anteriores
        document.querySelectorAll('.options li').forEach(li => li.classList.remove('selected'));
        
        // Marcar la opción seleccionada
        document.querySelector(`[data-option="${optionIndex}"]`).classList.add('selected');
        
        // Guardar la respuesta
        this.currentTest.answers[this.currentTest.currentQuestion] = optionIndex;
        
        // Habilitar el botón siguiente
        document.getElementById('nextBtn').disabled = false;
    }

    nextQuestion() {
        if (this.currentTest.currentQuestion < this.currentTest.questions.length - 1) {
            this.currentTest.currentQuestion++;
            this.renderTest();
        } else {
            this.finishTest();
        }
    }

    previousQuestion() {
        if (this.currentTest.currentQuestion > 0) {
            this.currentTest.currentQuestion--;
            this.renderTest();
            
            // Si ya había una respuesta seleccionada, mostrarla
            if (this.currentTest.answers[this.currentTest.currentQuestion] !== undefined) {
                const selectedOption = this.currentTest.answers[this.currentTest.currentQuestion];
                document.querySelector(`[data-option="${selectedOption}"]`).classList.add('selected');
                document.getElementById('nextBtn').disabled = false;
            }
        }
    }

    finishTest() {
        this.calculateScore();
        this.showResults();
    }

    calculateScore() {
        let correct = 0;
        this.currentTest.questions.forEach((question, index) => {
            if (this.currentTest.answers[index] === question.correct) {
                correct++;
            }
        });
        this.currentTest.score = (correct / this.currentTest.questions.length) * 100;
    }

    showResults() {
        const testContainer = document.querySelector('.test-container');
        const score = this.currentTest.score;
        const passed = score >= 70;
        
        let resultClass = passed ? 'success' : 'danger';
        let resultMessage = passed ? 
            '¡Felicitaciones! Has aprobado el test.' : 
            'No has alcanzado la puntuación mínima. Te recomendamos repasar el contenido.';

        testContainer.innerHTML = `
            <div class="test-results ${resultClass}">
                <h3>Resultados del Test</h3>
                <div class="score-display">
                    <div class="score-circle">
                        <span class="score-number">${Math.round(score)}%</span>
                    </div>
                </div>
                <p class="result-message">${resultMessage}</p>
                <div class="test-details">
                    <p><strong>Respuestas correctas:</strong> ${Math.round(score * this.currentTest.questions.length / 100)} de ${this.currentTest.questions.length}</p>
                    <p><strong>Puntuación mínima para aprobar:</strong> 70%</p>
                </div>
                <div class="test-actions">
                    <button class="btn btn-primary" onclick="curso.reviewAnswers()">Revisar Respuestas</button>
                    <button class="btn btn-success" onclick="curso.retakeTest()">Repetir Test</button>
                    ${passed ? '<button class="btn btn-success" onclick="curso.continueToNextModule()">Continuar</button>' : ''}
                </div>
            </div>
        `;

        // Guardar resultado
        this.userProgress.testScores[`module-${this.currentModule}`] = score;
        this.saveProgress();
    }

    reviewAnswers() {
        const testContainer = document.querySelector('.test-container');
        let reviewHTML = '<div class="answer-review"><h3>Revisión de Respuestas</h3>';
        
        this.currentTest.questions.forEach((question, index) => {
            const userAnswer = this.currentTest.answers[index];
            const isCorrect = userAnswer === question.correct;
            
            reviewHTML += `
                <div class="question-review ${isCorrect ? 'correct' : 'incorrect'}">
                    <h4>Pregunta ${index + 1}: ${question.question}</h4>
                    <p><strong>Tu respuesta:</strong> ${question.options[userAnswer] || 'No respondida'}</p>
                    <p><strong>Respuesta correcta:</strong> ${question.options[question.correct]}</p>
                    ${question.explanation ? `<p class="explanation"><strong>Explicación:</strong> ${question.explanation}</p>` : ''}
                </div>
            `;
        });
        
        reviewHTML += `
            <div class="review-actions">
                <button class="btn btn-primary" onclick="curso.retakeTest()">Repetir Test</button>
                <button class="btn btn-success" onclick="curso.continueToNextModule()">Continuar</button>
            </div>
        </div>`;
        
        testContainer.innerHTML = reviewHTML;
    }

    retakeTest() {
        this.currentTest.answers = {};
        this.currentTest.currentQuestion = 0;
        this.currentTest.score = 0;
        this.renderTest();
    }

    continueToNextModule() {
        // Lógica para continuar al siguiente módulo
        const nextModule = this.currentModule + 1;
        if (nextModule <= 4) {
            this.navigateTo(nextModule, 1);
        } else {
            // Curso completado
            this.showCourseCompletion();
        }
    }

    // Funciones de utilidad
    attachNavigationEvents() {
        // Eventos para navegación
        document.querySelectorAll('[data-navigate]').forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('data-navigate');
                const [module, topic] = target.split('-').map(Number);
                this.navigateTo(module, topic);
            });
        });
    }

    attachTestEvents() {
        // Los eventos de test se manejan dinámicamente
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    loadCurrentPage() {
        // Detectar página actual y establecer navegación apropiada
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf('/') + 1);
        
        if (filename.includes('modulo')) {
            const matches = filename.match(/modulo(\d)-(\d+)/);
            if (matches) {
                this.currentModule = parseInt(matches[1]);
                this.currentTopic = parseInt(matches[2]);
            }
        }
    }

    // Funciones para mostrar/ocultar contenido
    toggleContent(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.display = element.style.display === 'none' ? 'block' : 'none';
        }
    }

    // Función para destacar términos importantes
    highlightTerms() {
        const terms = [
            'póliza', 'prima', 'siniestro', 'cobertura', 'exclusión', 
            'franquicia', 'carencia', 'rescate', 'provisión', 'reserva'
        ];
        
        const content = document.querySelector('.main-content');
        if (content) {
            terms.forEach(term => {
                const regex = new RegExp(`\\b${term}\\b`, 'gi');
                content.innerHTML = content.innerHTML.replace(regex, 
                    `<span class="tooltip">${term}<span class="tooltiptext">Término importante en seguros</span></span>`
                );
            });
        }
    }

    // Sistema de búsqueda
    searchContent(query) {
        // Implementar búsqueda en el contenido del curso
        console.log('Buscando:', query);
    }

    showCourseCompletion() {
        const container = document.querySelector('.main-content');
        if (container) {
            container.innerHTML = `
                <div class="course-completion">
                    <h1>¡Felicitaciones!</h1>
                    <h2>Has completado el Curso de Seguros</h2>
                    <div class="completion-stats">
                        <p>Total de módulos completados: 4</p>
                        <p>Total de temas estudiados: 31</p>
                        <p>Puntuación promedio en tests: ${this.getAverageTestScore()}%</p>
                    </div>
                    <div class="certificate-section">
                        <button class="btn btn-success" onclick="curso.generateCertificate()">
                            Generar Certificado
                        </button>
                    </div>
                </div>
            `;
        }
    }

    getAverageTestScore() {
        const scores = Object.values(this.userProgress.testScores || {});
        if (scores.length === 0) return 0;
        const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        return Math.round(average);
    }

    generateCertificate() {
        // Generar certificado de completión
        const certificateWindow = window.open('', '_blank');
        certificateWindow.document.write(`
            <html>
                <head>
                    <title>Certificado de Completión</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                        .certificate { border: 5px solid #2c3e50; padding: 50px; margin: 20px; }
                        h1 { color: #2c3e50; font-size: 3rem; }
                        h2 { color: #27ae60; font-size: 2rem; }
                        .date { margin-top: 30px; color: #666; }
                    </style>
                </head>
                <body>
                    <div class="certificate">
                        <h1>Certificado de Completión</h1>
                        <h2>Curso de Seguros</h2>
                        <p>Se certifica que ha completado satisfactoriamente el curso de seguros.</p>
                        <p class="date">Fecha: ${new Date().toLocaleDateString()}</p>
                        <p>Puntuación promedio: ${this.getAverageTestScore()}%</p>
                    </div>
                </body>
            </html>
        `);
    }
}

// Inicializar el curso
const curso = new CursoSeguros();

// Datos de tests para cada módulo
const testData = {
    module1: [
        {
            question: "¿Qué documento regula la relación contractual entre asegurador y asegurado?",
            options: [
                "El contrato de seguro",
                "La póliza de seguros", 
                "Las condiciones generales",
                "El certificado de seguro"
            ],
            correct: 1,
            explanation: "La póliza de seguros es el documento que materializa el contrato de seguro."
        },
        {
            question: "¿Cuál es la función principal de las bases técnicas?",
            options: [
                "Establecer las coberturas",
                "Determinar las primas y cálculos actuariales",
                "Regular las exclusiones", 
                "Definir los siniestros"
            ],
            correct: 1,
            explanation: "Las bases técnicas contienen los cálculos actuariales y métodos para determinar las primas."
        },
        {
            question: "¿Qué representa la suma asegurada?",
            options: [
                "La prima a pagar",
                "El límite máximo de indemnización",
                "El valor real del bien",
                "La franquicia aplicable"
            ],
            correct: 1,
            explanation: "La suma asegurada es el límite máximo que pagará la aseguradora en caso de siniestro."
        }
    ],
    module2: [
        {
            question: "En el seguro de incendios, ¿cuál es una cobertura básica?",
            options: [
                "Daños por agua",
                "Robo con fuerza",
                "Incendio y explosión",
                "Responsabilidad civil"
            ],
            correct: 2,
            explanation: "El incendio y explosión son coberturas básicas del seguro de incendios."
        },
        {
            question: "¿Qué factor NO influye en la tarificación del seguro de robo?",
            options: [
                "Ubicación del inmueble",
                "Sistemas de seguridad",
                "Color de las paredes",
                "Valor de los bienes"
            ],
            correct: 2,
            explanation: "El color de las paredes no es un factor de riesgo relevante para el seguro de robo."
        }
    ],
    module3: [
        {
            question: "¿Qué cubre la responsabilidad civil general?",
            options: [
                "Solo daños materiales",
                "Solo daños personales", 
                "Daños materiales y personales a terceros",
                "Daños propios exclusivamente"
            ],
            correct: 2,
            explanation: "La RC general cubre tanto daños materiales como personales causados a terceros."
        },
        {
            question: "En el seguro de automóviles, ¿cuál es obligatorio?",
            options: [
                "Todo riesgo",
                "Responsabilidad civil",
                "Robo e incendio",
                "Lunas"
            ],
            correct: 1,
            explanation: "La responsabilidad civil es la única cobertura obligatoria en el seguro de autos."
        }
    ],
    module4: [
        {
            question: "¿Cuál es la diferencia principal entre seguro de vida y accidentes?",
            options: [
                "El importe de la prima",
                "La causa de la muerte o invalidez",
                "La duración del contrato",
                "Los beneficiarios"
            ],
            correct: 1,
            explanation: "El seguro de accidentes solo cubre muerte o invalidez por accidente, mientras que vida cubre cualquier causa."
        },
        {
            question: "¿Qué función tiene el Consorcio de Compensación de Seguros?",
            options: [
                "Supervisar las aseguradoras",
                "Cubrir riesgos extraordinarios",
                "Fijar las primas",
                "Resolver conflictos"
            ],
            correct: 1,
            explanation: "El Consorcio cubre riesgos extraordinarios como catástrofes naturales y terrorismo."
        }
    ]
};

// Función para inicializar test de módulo específico
function initModuleTest(moduleNumber) {
    const questions = testData[`module${moduleNumber}`];
    if (questions) {
        curso.initializeTest(questions);
    }
}
