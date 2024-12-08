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
