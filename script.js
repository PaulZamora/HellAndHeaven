// Inicializa el índice de la página actual
let currentPage = 0;
const totalPages = document.querySelectorAll('.page').length;

// Textos descriptivos para cada página
const descriptions = [
    "Hell and Heaven",
    "Prologo",
    "Introduccion",
    "Reino de las bestias",
    "Reino de los Homosapiens",
    "Reino de las Maquinas"
];

// Textos de párrafo para cada página
const paragraphs = [
    "Una historia desde las entrañas de la locura de latinoamerica",
    "'Fin...' Eran las palabras que se oían era el inicio de todo… la oscuridad envolvía al mundo, no había existencia, no existía ruido, todo se había ido, esto era lo que pensaba el joven mientras miraba a través de las llamas que se le presentaban ante sus ojos, nunca pensó en volver a amar solo pensaba en volver atrás y tratar de que todo lo que había ocurrido nunca hubiera pasado, sin embargo sabía que la decisión estaba tomada y no se podía dar marcha atrás, una lágrima rodaba por su mejía que se evapora mientras caía y finalmente grito “está hecho!!!…” el metal se fundía, el diamante se agrietaba, la sangre fluia todo el esfuerzo había sido en vano ... .Porque el fin comenzaba.(tomo X, párrafo 2)",
    "Antes de que se conociera algo sobre los hechos, la vida en el mundo carecía de rumbo y no poseía un objetivo más que la supervivencia del más apto para domar la rigidez de la vida que presentaba tan solo el hecho de existir era un gran reto, el nacer implicaba un plato más en la mesa y menos porción para los demás, significaba más restricciones y sacrificios a alguien que ya se le podría decir muerto en vida, era una época oscura donde los ríos se iluminaban con el rojo de la sangre y los llantos de las madres eran trasladados con el viento y un olor a putrefacción se sentía en el ambiente.Los 3 reinos conocidos seguían cada cual un rumbo diferente pero con un solo objetivo prevalecer sobre los demás",
    "Los reinos se conformaban así: Se encontraba primeramente el reino más antiguo y uno de los más temidos el reino de las bestias los cuales mencionan a los antiguos gigantes domadores de dragones, a las bestias salvajes que su sed de sangre y alimento nunca era saciado y estaban por supuesto las bestias antiguas veneradas en el reino por su conocimiento del vasto mundo que controlaban y dominaban a las demás como reyes por su conocimiento en la magia y la fortaleza que los caracterizaba.",
    "El reino de los conocidos monos sin pelo o reino de los homos: traicioneros, hábiles para aprender y con alto sentido de instinto que permite su supervivencia en las zonas más extremas, débiles comparados con la fuerza de las bestias pero compensaba esto con el factor que los hacía más temible...su número que llegaban más allá de la vista más hábil de cualquiera de las bestias simplemente incontables estos hacían doblar la defensa más fuerte o el hechizo más mortífero, el crujir del acero y el chispear de metal con metal eran las canciones que se oían en sus reuniones de miles en sus fortalezas",
    "Finalmente estaba el reino más joven pero más oscuro el reino de las máquinas una metrópolis de metales que hacía que cualquier bestia u homo imposible de alcanzar; Su alto conocimiento en la tecnología perfeccionada mato el factor que las hizo débiles en un tiempo ...su alma, las máquinas incapaces de sentir dolor, compasión o amor logro el crecimiento exponencial en las armas capaces para atacar o defenderse centradas en el objetivo y desarrollo de su especie buscando cada dia mejorar cada detalle que las componía lograron realizar la proeza que no pudieron los homos, dominar los cielos factor que hizo limitarse en recursos y cantidad.Así se conformaban los reinos que habitaban la tierra de BEHUTE  pero no se lograron interceptar hasta que el gran acontecimiento pasó. Algo cambiará que haría que la vida de cada reino se cruzará, que las historias dejarán de ser una leyenda  y ser una realidad."
];

// Función para actualizar el contenido y el texto descriptivo
function updatePages() {
    document.querySelectorAll('.page').forEach((page, index) => {
        if (index === currentPage) {
            gsap.to(page, {
                duration: 0.7,
                opacity: 1,
                rotationY: 0,
                transformStyle: 'preserve-3d',
                ease: 'power2.out'
            });
        } else {
            gsap.to(page, {
                duration: 0.7,
                opacity: 0,
                rotationY: index > currentPage ? 90 : -90,
                transformStyle: 'preserve-3d',
                ease: 'power2.out'
            });
        }
    });

    document.getElementById('pageNumber').textContent = currentPage + 1;
    typeText(descriptions[currentPage]);
    updateParagraph(paragraphs[currentPage]);

    // Iniciar la lectura del texto
    speakText(paragraphs[currentPage]);
}

// Función para simular la escritura de máquina
function typeText(text) {
    const textBox = document.getElementById('textBox');
    textBox.innerHTML = ''; // Limpiar el texto previo
    let index = 0;
    function type() {
        if (index < text.length) {
            textBox.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 50); // Ajusta la velocidad de escritura aquí
        }
    }
    type();
}

// Función para actualizar el párrafo con efecto de máquina de escribir
function updateParagraph(text) {
    const paragraph = document.getElementById('paragraph');
    paragraph.innerHTML = ''; // Limpiar el párrafo previo
    let index = 0;
    function type() {
        if (index < text.length) {
            paragraph.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 50); // Ajusta la velocidad de escritura aquí
        }
    }
    type();
}

// Función para leer el texto en voz alta, fragmentado si es necesario
function speakText(text) {
    const synth = window.speechSynthesis;
    const utteranceQueue = [];

    // Dividir el texto en fragmentos más pequeños (200 caracteres por ejemplo)
    const maxLength = 200;
    for (let i = 0; i < text.length; i += maxLength) {
        const utterThis = new SpeechSynthesisUtterance(text.slice(i, i + maxLength));
        utterThis.lang = 'es-ES'; // Idioma español

        // Añadir cada fragmento a la cola de reproducción
        utteranceQueue.push(utterThis);
    }

    // Reproducir cada fragmento en secuencia
    function speakNext() {
        if (utteranceQueue.length > 0) {
            const nextUtterance = utteranceQueue.shift();
            synth.speak(nextUtterance);
            nextUtterance.onend = speakNext; // Reproduce el siguiente fragmento cuando termine
        }
    }

    speakNext(); // Inicia la reproducción
}

// Función para mostrar el video y ocultar la imagen
function showVideo(videoSrc, imgElement) {
    const page = imgElement.closest('.page');
    const video = page.querySelector('.video');
    imgElement.style.display = 'none'; // Ocultar la imagen
    video.style.display = 'block'; // Mostrar el video
    video.play(); // Reproducir el video automáticamente
}

// Función para pasar a la siguiente página
function nextPage() {
    if (currentPage < totalPages - 1) {
        currentPage++;
        updatePages();
    }
}

// Función para volver a la página anterior
function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        updatePages();
    }
}

// Manejo de eventos de teclado
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        nextPage();
    } else if (event.key === 'ArrowLeft') {
        prevPage();
    }
});

// Configuración de gestos con Hammer.js
const mc = new Hammer(document.querySelector('.flipbook'));

mc.on('swipeleft', function() {
    nextPage();
});

mc.on('swiperight', function() {
    prevPage();
});

// Configuración de los botones de navegación
document.getElementById('nextButton').addEventListener('click', nextPage);
document.getElementById('prevButton').addEventListener('click', prevPage);

// Inicializa la vista de las páginas
updatePages();


