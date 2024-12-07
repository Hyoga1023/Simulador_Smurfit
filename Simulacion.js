document.addEventListener('DOMContentLoaded', function() {
    // Elementos de entrada de datos del cliente
    const clientInputs = {
        cedula: document.getElementById('cedula'),
        nombre: document.getElementById('nombre'),
        fecha: document.getElementById('fecha')
    };

    // Elementos para mostrar datos del cliente
    const clientDisplays = {
        cedula: document.getElementById('cedula-mostrar'),
        nombre: document.getElementById('nombre-mostrar'),
        fecha: document.getElementById('fecha-mostrar')
    };

    // Inputs de valores
    const valueInputs = {
        avaoExento: document.getElementById('span-avao_exento'),
        avaoConRetencion: document.getElementById('span-avao_con_retencion'),
        avaoSinRetencion: document.getElementById('span-avao_sin_retencion'),
        avaeExento: document.getElementById('span-avae_exento'),
        avaeConRetencion: document.getElementById('span-avae_con_retención'),
        avaeSinRetencion: document.getElementById('span-avae_sin_retención'),
        aveo: document.getElementById('span-aveo'),
        avee: document.getElementById('span-avee'),
        apae: document.getElementById('span-apae'),
        acae: document.getElementById('span-acae'),
        acao: document.getElementById('span-acao')
    };

    // Spans para mostrar resultados
    const resultSpans = {
        avaoExento: document.getElementById('avao_exento'),
        avaeExento: document.getElementById('avae_exento'),
        avaeConRetencion: document.getElementById('avae_con_retención'),
        avaeSinRetencion: document.getElementById('avae_sin_retención'),
        totalAvaoAvaeApaeAcae: document.getElementById('total_avao_avae_apae_acae'),
        sumaAvaoAvae: document.getElementById('suma_avao_avae'),
        totalAvao: document.getElementById('total_avao'),
        totalAvae: document.getElementById('total_avae'),
        sumaAcaoAveo: document.getElementById('suma_acao_aveo'),
        acao: document.getElementById('acao'),
        aveo: document.getElementById('aveo'),
        avee: document.getElementById('avee'),
        apae: document.getElementById('apae'),
        sumaTotal: document.getElementById('suma_total')
    };

    // Botón de procesamiento
    const botonProcesar = document.getElementById('procesar-simulacion');

    // Función para formatear valores monetarios
    const formatCurrency = (value) => 
        value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

    // Función para convertir valor de input a número
    const parseInputValue = (input) => parseFloat(input.value) || 0;

    // Eventos para completar datos del cliente
    Object.keys(clientInputs).forEach(key => {
        clientInputs[key].addEventListener('change', function() {
            clientDisplays[key].textContent = this.value;
        });
    });

    // Función para procesar la simulación
    botonProcesar.addEventListener('click', function() {
        // Conversión de valores
        const values = {
            avaoExento: parseInputValue(valueInputs.avaoExento),
            avaoConRetencion: parseInputValue(valueInputs.avaoConRetencion),
            avaoSinRetencion: parseInputValue(valueInputs.avaoSinRetencion),
            avaeExento: parseInputValue(valueInputs.avaeExento),
            avaeConRetencion: parseInputValue(valueInputs.avaeConRetencion),
            avaeSinRetencion: parseInputValue(valueInputs.avaeSinRetencion),
            aveo: parseInputValue(valueInputs.aveo),
            avee: parseInputValue(valueInputs.avee),
            apae: parseInputValue(valueInputs.apae),
            acae: parseInputValue(valueInputs.acae),
            acao: parseInputValue(valueInputs.acao)
        };

        // Cálculos
        const totalAvao = values.avaoExento + values.avaoConRetencion + values.avaoSinRetencion;
        const totalAvae = values.avaeExento + values.avaeConRetencion + values.avaeSinRetencion;
        const sumaAvaoAvae = totalAvao + totalAvae;
        const sumaAcaoAveo = values.acao + values.aveo;
        
        // Modificación específica para total_avao_avae_apae_acae
        const totalAvaoAvaeApaeAcae = sumaAvaoAvae + values.avee + values.apae + values.acae;
        const sumaTotal = sumaAvaoAvae + sumaAcaoAveo + values.avee + values.apae + values.acae;

        // Debug log
        console.log('Desglose total_avao_avae_apae_acae:', {
            totalAvao, 
            totalAvae, 
            apae: values.apae, 
            acae: values.acae, 
            totalAvaoAvaeApaeAcae
        });

        // Asignación de valores a los spans
        Object.entries({
            avaoExento: values.avaoExento,
            avaeExento: values.avaeExento,
            avaeConRetencion: values.avaeConRetencion,
            avaeSinRetencion: values.avaeSinRetencion,
            totalAvaoAvaeApaeAcae,
            sumaAvaoAvae,
            totalAvao,
            totalAvae,
            sumaAcaoAveo,
            acao: values.acao,
            aveo: values.aveo,
            avee: values.avee,
            apae: values.apae,
            sumaTotal
        }).forEach(([key, value]) => {
            if (resultSpans[key]) {
                resultSpans[key].textContent = formatCurrency(value);
            }
        });
    });
});
document.getElementById("procesar-simulacion").addEventListener("click", () => {
    // 1. Ejecutar la función de calcular valores
    calcularValores();

    // 2. Desplazar la página hacia arriba
    window.scrollTo({ top: 0, behavior: "smooth" }); // "smooth" para un desplazamiento suave
});
