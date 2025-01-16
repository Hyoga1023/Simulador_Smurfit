// Espera a que el documento esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
  // Función para generar PDF
  const generarPdfBtn = document.getElementById("generar_pdf");
  if (generarPdfBtn) {
      generarPdfBtn.addEventListener("click", () => {
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
              title.style.paddingBottom = '10px';
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
  }

  // Botón Volver Arriba
  const volverArribaBtn = document.getElementById("volver-arriba");
  if (volverArribaBtn) {
      volverArribaBtn.addEventListener("click", function() {
          window.scrollTo({
              top: 0,
              behavior: "smooth"
          });
      });
  }

  // Validación de campos numéricos
  const inputs = document.querySelectorAll('.tipo_aportes input');
  if (inputs.length > 0) {
      inputs.forEach((input) => {
          input.addEventListener('input', (event) => {
              const value = event.target.value;
              if (/[^0-9]/.test(value)) {
                  alert("Por favor, ingresa solo números sin puntos, comas ni caracteres especiales.");
                  event.target.value = value.replace(/[^0-9]/g, '');
              }
          });
      });
  }

  // Función para procesar la simulación
  function procesarSimulacion() {
      let camposValidos = true;
      inputs.forEach((input) => {
          if (input.value.trim() === '') {
              camposValidos = false;
              alert(`El campo ${input.placeholder} no puede estar vacío.`);
          }
      });

      if (camposValidos) {
          console.log("Todos los campos son válidos. Procesando simulación...");
      } else {
          console.log("Por favor, completa todos los campos antes de continuar.");
      }
  }

  // Botón para procesar la simulación - Corregido el ID
  const botonSimulacion = document.getElementById('procesar-simulacion');
  if (botonSimulacion) {
      botonSimulacion.addEventListener('click', procesarSimulacion);
  } else {
      console.warn("El botón de simulación no se encontró en el DOM");
  }
});