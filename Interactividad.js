document.getElementById("generar_pdf").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
    });

    // Crear un contenedor temporal
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'relative';
    tempContainer.style.width = '100%';

    // Clonar el main para no modificar el DOM original
    const mainClone = document.querySelector('main').cloneNode(true);
    mainClone.style.position = 'static';

    // Resetear posiciones de elementos hijos
    const titles = mainClone.querySelectorAll('h1, h2, h3, h4, h5, h6, span');
    titles.forEach(title => {
        title.style.position = 'static';
        title.style.transform = 'none';
        title.style.top = 'auto';
        title.style.left = 'auto';
        title.style.paddingBottom = '10px'; // Añadir padding bottom de 2px
    });

    tempContainer.appendChild(mainClone);
    document.body.appendChild(tempContainer);

    html2canvas(tempContainer, { 
        scale: 3,
        useCORS: true,
        logging: false,
        allowTaint: true 
    }).then((canvasMain) => {
        // Remover el contenedor temporal
        document.body.removeChild(tempContainer);

        const mainImgData = canvasMain.toDataURL("image/png");

        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvasMain.height * imgWidth) / canvasMain.width;

        // Ajustar el tamaño de la página PDF
        pdf.internal.pageSize.height = imgHeight;

        // Añadir main al PDF
        pdf.addImage(mainImgData, "PNG", 0, 0, imgWidth, imgHeight);

        pdf.save("simulacion_horizontal.pdf");
    });
});
// Espera a que el documento esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el botón "Volver Arriba"
    const volverArribaBtn = document.getElementById("volver-arriba");

    // Agrega un evento de clic al botón
    volverArribaBtn.addEventListener("click", function() {
        // Desplazamiento suave hacia arriba
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Esto hace que el desplazamiento sea suave
        });
    });
});

//sección para validar los campos y no permitir caracteres especiales

// Selecciona todos los inputs dentro de la sección "tipo_aportes"
const inputs = document.querySelectorAll('.tipo_aportes input');

// Recorre cada input y agrega el evento de validación
inputs.forEach((input) => {
  input.addEventListener('input', (event) => {
    const value = event.target.value;

    // Si el valor contiene caracteres no válidos
    if (/[^0-9]/.test(value)) {
      alert("Por favor, ingresa solo números sin puntos, comas ni caracteres especiales.");
      
      // Elimina los caracteres inválidos
      event.target.value = value.replace(/[^0-9]/g, '');
    }
  });
});

// Función para procesar la simulación
function procesarSimulacion() {
  let camposValidos = true; // Bandera para verificar todos los campos

  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      camposValidos = false;
      alert(`El campo ${input.placeholder} no puede estar vacío.`);
    }
  });

  if (camposValidos) {
    // Aquí va la lógica para procesar la simulación
    console.log("Todos los campos son válidos. Procesando simulación...");
  } else {
    console.log("Por favor, completa todos los campos antes de continuar.");
  }
}

// Botón para procesar la simulación
const botonSimulacion = document.getElementById('btn-simulacion');
botonSimulacion.addEventListener('click', procesarSimulacion);
