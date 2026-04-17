const companiesData = [
    {
        id: "aguas-andinas",
        nombre: "Aguas Andinas",
        tipo: "Concesionaria Privada",
        controlador: "Veolia (Francia)",
        clientes: 2100000,
        regiones: ["Región Metropolitana de Santiago"],
        proyectos: [
            { nombre: "Estanques de Reserva Pirque", lat: -33.639, lng: -70.485 },
            { nombre: "Modernización Plantas Biofactoría", lat: -33.655, lng: -70.923 }
        ],
        oportunidades: [
            { nombre: "Suministro H2V", razon: "Cercanía a polos industriales y capacidad de tratamiento a gran escala." },
            { nombre: "Reúso Industrial", razon: "Convenios con minería en la zona central para intercambios de agua." }
        ],
        deepIntelligence: {
            contacts: [
                { role: "Gerente de Compras", name: "Cristián Esteban Rosas Miranda" },
                { role: "Director de Gestión de Activos", name: "Iván Yarur" }
            ],
            pipeline2025: [
                { project: "Nueva Captación Río Maipo", budget: "USD 80M", status: "Ingeniería" },
                { project: "Plan Biociudad 2030 (Resiliencia)", budget: "USD 500M+", status: "Fases iniciales" }
            ],
            csiServices: [
                { unit: "AAT", service: "Consultoría en Reúso Industrial y Permisos SEIA" },
                { unit: "CIEMSA", service: "O&M de Plantas Biofactoría" }
            ],
            prospecting: "El portal de proveedores es centralizado via Veolia. Foco en innovación circular y reducción de huella de carbono."
        },
        contacto: "adquisiciones@aguasandinas.cl"
    },
    {
        id: "essbio",
        nombre: "Essbio",
        tipo: "Concesionaria Privada",
        controlador: "OTPP (Canadá)",
        clientes: 1210000,
        regiones: ["Región del Libertador Bernardo O'Higgins", "Región del Maule", "Región de Ñuble", "Región del Biobío"],
        proyectos: [
            { nombre: "Plan Inversiones O'Higgins 2026", lat: -34.170, lng: -70.741 },
            { nombre: "Mejora redes Gran Concepción", lat: -36.827, lng: -73.050 }
        ],
        oportunidades: [
            { nombre: "Desalinización Biobío", razon: "Evaluación de fuentes alternativas ante variabilidad climática." },
            { nombre: "Digitalización de medidores", razon: "Implementación masiva de telemetría." }
        ],
        deepIntelligence: {
            contacts: [
                { role: "Gerente General", name: "Cristián Vergara Castillo" },
                { role: "Gerente Regional O'Higgins", name: "Peter Schmohl" }
            ],
            pipeline2025: [
                { project: "Planta de Tratamiento Rafael", budget: "CLP 2B", status: "Licitación" },
                { project: "Extensión Colectores Biobío", budget: "CLP 15B", status: "Ejecución" }
            ],
            csiServices: [
                { unit: "IT", service: "Modelación Hidráulica de Redes de Alcantarillado" },
                { unit: "AAT", service: "Planes de Mitigación de Cambio Climático" }
            ],
            prospecting: "Requiere registro en su portal propio de proveedores. Valoran la experiencia regional y soluciones de resiliencia hídrica."
        },
        contacto: "compras@essbio.cl"
    },
    {
        id: "esval",
        nombre: "Esval",
        tipo: "Concesionaria Privada",
        controlador: "OTPP (Canadá)",
        clientes: 650000,
        regiones: ["Región de Valparaíso"],
        proyectos: [
            { nombre: "Conducción Aconcagua", lat: -32.833, lng: -70.600 },
            { nombre: "Refuerzo San Antonio", lat: -33.591, lng: -71.611 }
        ],
        oportunidades: [
            { nombre: "Desalación Quintero", razon: "Escasez de agua dulce en zona costera norte." },
            { nombre: "Recarga Acuíferos", razon: "Infiltración de aguas tratadas en Valle de Casablanca." }
        ],
        deepIntelligence: {
            contacts: [
                { role: "Gerente de Operaciones", name: "Alejandro Salas Olave" },
                { role: "Subgerente de Planificación", name: "Rodrigo Lastra" }
            ],
            pipeline2025: [
                { project: "Interconexión Los Aromos", budget: "USD 25M", status: "Modernización" },
                { project: "Digital Transformation (Smart Water)", budget: "USD 12M", status: "En curso" }
            ],
            csiServices: [
                { unit: "IE", service: "Infraestructura Eléctrica para Estaciones de Bombeo" },
                { unit: "IT", service: "Ingeniería de Detalle para Grandes Conducciones" }
            ],
            prospecting: "Foco en eficiencia operativa y reducción de Agua No Recaudada (ANR). Registro via portal OTPP."
        },
        contacto: "proveedores@esval.cl"
    },
    {
        id: "aguas-antofagasta",
        nombre: "Aguas Antofagasta",
        tipo: "Concesionaria Privada",
        controlador: "Grupo EPM (Colombia)",
        clientes: 180000,
        regiones: ["Región de Antofagasta"],
        proyectos: [
            { nombre: "Ampliación Desaladora La Chimba", lat: -23.542, lng: -70.399 },
            { nombre: "Planta Desaladora Taltal", lat: -25.405, lng: -70.485 }
        ],
        oportunidades: [
            { nombre: "Uso Industrial Minero", razon: "Suministro de agua de mar para procesos mineros." },
            { nombre: "Hidrógeno Verde Antofagasta", razon: "Infraestructura costera disponible." }
        ],
        deepIntelligence: {
            contacts: [
                { role: "Gerente de Proyectos e Ingeniería", name: "David Godoy Andrade" },
                { role: "Gerente General", name: "Carlos Mario Méndez" }
            ],
            pipeline2025: [
                { project: "Modernización Eléctrica Desaladoras", budget: "USD 15M", status: "Planificación" },
                { project: "Red de Medidores Inteligentes", budget: "USD 8M", status: "Piloto" }
            ],
            csiServices: [
                { unit: "AAT", service: "Consultoría Técnica en Desalinización" },
                { unit: "CIEMSA", service: "O&M de Instalaciones Industriales de Agua" }
            ],
            prospecting: "Licitaciones suelen ser privadas a través del portal de EPM. Valoran proveedores locales con estándares internacionales."
        },
        contacto: "abastecimiento@aguasantofagasta.cl"
    },
    {
        id: "aguas-del-valle",
        nombre: "Aguas del Valle",
        tipo: "Concesionaria Privada",
        controlador: "Esval (OTPP)",
        clientes: 235000,
        regiones: ["Región de Coquimbo"],
        proyectos: [
            { nombre: "Desaladora El Panul (MOP)", lat: -29.981, lng: -71.365 },
            { nombre: "Pozos de Emergencia Illapel", lat: -31.633, lng: -71.168 }
        ],
        oportunidades: [
            { nombre: "Eficiencia Agrícola", razon: "Interconexión con sistemas rurales APR." },
            { nombre: "Reúso para Riego", razon: "Descarga en quebradas productivas." }
        ],
        deepIntelligence: {
            contacts: [
                { role: "Gerente Regional", name: "Andrés Nazer" }
            ],
            pipeline2025: [
                { project: "Mejora Estación El Milagro", budget: "CLP 3B", status: "Licitación" }
            ],
            csiServices: [
                { unit: "IT", service: "Diseño de Obras Hidráulicas de Regulación" },
                { unit: "AAT", service: "Estudios de Impacto Ambiental para Desaladoras" }
            ],
            prospecting: "Portal compartido con Esval. Foco extremo en combate a la sequía y resiliencia."
        },
        contacto: "adquisiciones@aguasdelvalle.cl"
    },
    {
        id: "aguas-del-altiplano",
        nombre: "Aguas del Altiplano",
        tipo: "Concesionaria Privada",
        controlador: "Aguas Nuevas (Marubeni)",
        clientes: 200000,
        regiones: ["Región de Arica y Parinacota", "Región de Tarapacá"],
        proyectos: [
            { nombre: "Planta de Arsénico Cerro Chuño", lat: -18.472, lng: -70.288 },
            { nombre: "Nuevas fuentes Alto Hospicio", lat: -20.274, lng: -70.103 }
        ],
        oportunidades: [
            { nombre: "Desalación Arica", razon: "Definida como fuente sustentable por el MOP." }
        ],
        deepIntelligence: {
            contacts: [
                { role: "Gerente Regional", name: "Christian Barahona" }
            ],
            pipeline2025: [
                { project: "Refuerzo Redes Iquique Zona Sur", budget: "CLP 6B", status: "Ingeniería" }
            ],
            csiServices: [
                { unit: "AAT", service: "Ingeniería de Procesos para Tratamiento de Arsénico" },
                { unit: "IT", service: "Consultoría en Urbanismo Tactico Hídrico" }
            ],
            prospecting: "Portal de Aguas Nuevas. Valoran tecnología japonesa (Marubeni) aplicada a la eficiencia."
        },
        contacto: "contacto@aguasaltiplano.cl"
    },
    {
        id: "nueva-atacama",
        nombre: "Nueva Atacama",
        tipo: "Concesionaria Privada",
        controlador: "Aguas Nuevas (Marubeni)",
        clientes: 100000,
        regiones: ["Región de Atacama"],
        proyectos: [
            { nombre: "Mantenimiento Desaladora Caldera", lat: -27.062, lng: -70.825 },
            { nombre: "Redes Copiapó", lat: -27.367, lng: -70.332 }
        ],
        deepIntelligence: {
            contacts: [
                { role: "Gerente Regional", name: "Juan Enrique Sánchez" }
            ],
            pipeline2025: [
                { project: "Ampliación de Sondajes Copiapó", budget: "CLP 4B", status: "En curso" }
            ],
            csiServices: [
                { unit: "CIEMSA", service: "Montaje Electromecánico para Plantas de Desalación" },
                { unit: "AAT", service: "Plan de Eficiencia Hídrica Copiapó" }
            ],
            prospecting: "Portal Aguas Nuevas. Interés en reducción de pérdidas físicas extremas en el desierto."
        },
        contacto: "logistica@nuevaatacama.cl"
    },
    {
        id: "aguas-araucania",
        nombre: "Aguas Araucanía",
        tipo: "Concesionaria Privada",
        controlador: "Aguas Nuevas (Marubeni)",
        clientes: 280000,
        regiones: ["Región de la Araucanía"],
        proyectos: [
            { nombre: "Ampliación Plantas Temuco", lat: -38.739, lng: -72.590 }
        ],
        deepIntelligence: {
            contacts: [
                { role: "Gerente Regional", name: "José Torga" }
            ],
            pipeline2025: [
                { project: "PTAS Labranza Ampliación", budget: "CLP 2.5B", status: "Licitación" }
            ],
            csiServices: [
                { unit: "IT", service: "Ingeniería en Saneamiento Urbano" },
                { unit: "AAT", service: "Gestión de Lodos y Bioenergía" }
            ],
            prospecting: "Portal Aguas Nuevas. Foco en tratamiento biológico y relación con comunidades."
        },
        contacto: "ventas@aguasaraucania.cl"
    },
    {
        id: "essal",
        nombre: "Essal (Surbit)",
        tipo: "Concesionaria Privada",
        controlador: "Liberty (Canadian)",
        clientes: 260000,
        regiones: ["Región de Los Ríos", "Región de Los Lagos"],
        proyectos: [
            { nombre: "Saneamiento Lago Llanquihue", lat: -41.319, lng: -72.985 },
            { nombre: "Nuevas redes Osorno", lat: -40.573, lng: -73.133 }
        ],
        deepIntelligence: {
            contacts: [
                { role: "Gerente General", name: "Sebastian Febres" }
            ],
            pipeline2025: [
                { project: "Nueva PTAS Llanquihue", budget: "USD 12M", status: "Ingeniería" }
            ],
            csiServices: [
                { unit: "AAT", service: "Remediación Ambiental de Cuerpos de Agua Lacustres" },
                { unit: "IE", service: "Eficiencia Energética en Plantas de Tratamiento" }
            ],
            prospecting: "Gestión bajo estándares de Liberty. Foco en transparencia proactiva e inversiones ambientales."
        },
        contacto: "compras@essal.cl"
    },
    {
        id: "aguas-magallanes",
        nombre: "Aguas Magallanes",
        tipo: "Concesionaria Privada",
        controlador: "Aguas Nuevas (Marubeni)",
        clientes: 70000,
        regiones: ["Región de Magallanes y de la Antártica Chilena"],
        proyectos: [
            { nombre: "Infraestructura H2V Punta Arenas", lat: -53.163, lng: -70.917 }
        ],
        deepIntelligence: {
            contacts: [
                { role: "Gerente Regional", name: "Christian Adema" }
            ],
            pipeline2025: [
                { project: "Reducción ANR Magallanes", budget: "CLP 2B", status: "Fase 1" }
            ],
            csiServices: [
                { unit: "IE", service: "Infraestructura Eléctrica para Minería/H2V" },
                { unit: "IT", service: "Infraestructura en Climas Extremos" }
            ],
            prospecting: "Portal Aguas Nuevas. Altamente interesados en soporte para la naciente industria del H2V."
        },
        contacto: "compras@aguasmagallanes.cl"
    },
    {
        id: "aguas-patagonia",
        nombre: "Aguas Patagonia",
        tipo: "Concesionaria Privada",
        controlador: "Aguas Nuevas (Marubeni)",
        clientes: 35000,
        regiones: ["Región de Aysén del Gral. Carlos Ibáñez del Campo"],
        proyectos: [
            { nombre: "Mejora Captaciones Coyhaique", lat: -45.571, lng: -72.068 }
        ],
        deepIntelligence: {
            contacts: [
                { role: "Gerente Regional", name: "Franz Scheel" }
            ],
            pipeline2025: [
                { project: "Refuerzo APRs Regionales", budget: "CLP 1.5B", status: "Planificación" }
            ],
            csiServices: [
                { unit: "AAT", service: "Consultoría en Sistemas de Agua Rural (APR)" },
                { unit: "IT", service: "Infraestructura Antialuviones" }
            ],
            prospecting: "Portal Aguas Nuevas. Requiere proveedores con alta capacidad logística y resiliencia."
        },
        contacto: "contacto@aguaspatagonia.cl"
    },
    {
        id: "nuevosur",
        nombre: "Nuevosur",
        tipo: "Concesionaria Privada",
        controlador: "Essbio (OTPP)",
        clientes: 250000,
        regiones: ["Región del Maule"],
        proyectos: [
            { nombre: "Colector Talca Oriente", lat: -35.423, lng: -71.655 }
        ],
        deepIntelligence: {
            contacts: [
                { role: "Gerente Regional", name: "Juan Pablo Gonzalez" }
            ],
            pipeline2025: [
                { project: "Ampliación PTAS Constitucion", budget: "USD 5M", status: "Ingeniería" }
            ],
            csiServices: [
                { unit: "CIEMSA", service: "Construcción de Obras Hidráulicas" },
                { unit: "AAT", service: "Monitoreo Ambiental de Cuencas" }
            ],
            prospecting: "Portal Essbio/OTPP. Foco en cumplimiento normativo y reducción de olores en PTAS."
        },
        contacto: "proveedores@nuevosur.cl"
    },
    {
        id: "smapa",
        nombre: "SMAPA",
        tipo: "Pública Municipal",
        controlador: "Municipalidad de Maipú",
        clientes: 210000,
        regiones: ["Región Metropolitana de Santiago"],
        proyectos: [
            { nombre: "Renovación Matriz Maipú", lat: -33.511, lng: -70.752 }
        ],
        deepIntelligence: {
            contacts: [
                { role: "Director SMAPA", name: "Nicolás Pizarro" }
            ],
            pipeline2025: [
                { project: "Reparación Masiva Filtraciones", budget: "CLP 10B", status: "Licitación" }
            ],
            csiServices: [
                { unit: "IT", service: "Auditoría de Redes y Modernización de Activos" },
                { unit: "AAT", service: "Digitalización de Gestión Municipal de Aguas" }
            ],
            prospecting: "Licitaciones vía MercadoPúblico. Requiere agilidad administrativa y solvencia técnica certificada."
        },
        contacto: "atencion@smapa.cl"
    }
];

window.SanitaryMarketData = {
    stats: marketStats,
    opportunities: businessOpportunities,
    companies: companiesData
};
