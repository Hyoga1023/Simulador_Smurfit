document.addEventListener('DOMContentLoaded', function() {
    // Elementos de entrada de datos del cliente
    const clientInputs = {
        cedula: document.getElementById('cedula'),
        nombre: document.getElementById('nombre'),
        fecha: document.getElementById('fecha'),
        fecha_antiguedad: document.getElementById('fecha_antiguedad')
    };

    // Elementos para mostrar datos del cliente
    const clientDisplays = {
        cedula: document.getElementById('cedula-mostrar'),
        nombre: document.getElementById('nombre-mostrar'),
        fecha: document.getElementById('fecha-mostrar'),
        fecha_antiguedad: document.getElementById('fecha_antiguedad-mostrar')
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
        acae: document.getElementById('acae'),
        apae: document.getElementById('apae'),
        sumaTotal: document.getElementById('suma_total'),
        avaoAvaeApae: document.getElementById('avao_avae_apae') // Nuevo span agregado
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
        const avaoAvaeApae = values.avaoExento + totalAvae + values.apae;
        const totalAvaoAvaeApaeAcae = sumaAvaoAvae + values.apae + values.acae;
        const sumaTotal = sumaAvaoAvae + sumaAcaoAveo + values.apae + values.acae + values.avee;
        const aveeTotal = values.avee + values.acae;

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
            avee: aveeTotal,
            apae: values.apae,
            sumaTotal,
            avaoAvaeApae
        }).forEach(([key, value]) => {
            if (resultSpans[key]) {
                resultSpans[key].textContent = formatCurrency(value);
            }
        });
    });
});