document.addEventListener('DOMContentLoaded', () => {
    const data = window.SanitaryMarketData;
    if (!data) {
        console.error("Data layer not found.");
        return;
    }

    // --- State Management ---
    let currentFilter = {
        region: 'all',
        search: ''
    };
    let map;
    let geoJsonLayer;
    let projectMarkers = L.layerGroup();
    let selectedCompany = null;

    // --- Helper for robust matching ---
    function normalize(str) {
        if (!str) return "";
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    }

    // --- Initialization ---
    initStats();
    initOpportunities();
    initMap();
    populateRegions();
    renderCompanyList();

    // --- Event Listeners ---
    document.getElementById('search-input').addEventListener('input', (e) => {
        currentFilter.search = e.target.value.toLowerCase();
        renderCompanyList();
    });

    document.getElementById('region-filter').addEventListener('change', (e) => {
        currentFilter.region = e.target.value;
        renderCompanyList();
        if (currentFilter.region !== 'all') {
            zoomToRegion(currentFilter.region);
        } else {
            map.setView([-35.6751, -71.5430], 5);
            resetMapStyles();
        }
    });

    document.getElementById('close-details').addEventListener('click', () => {
        document.getElementById('details-panel').classList.add('hidden');
        selectedCompany = null;
        renderCompanyList();
        if (geoJsonLayer) geoJsonLayer.eachLayer(l => geoJsonLayer.resetStyle(l));
    });

    // --- Intelligence Module Logic ---
    const intelBtn = document.getElementById('deep-research-btn');
    const intelModal = document.getElementById('intelligence-modal');
    const closeIntel = document.getElementById('close-intelligence');

    intelBtn.addEventListener('click', () => {
        if (!selectedCompany) return;
        showDeepIntelligence(selectedCompany);
    });

    closeIntel.addEventListener('click', () => {
        intelModal.classList.add('hidden');
    });

    intelModal.addEventListener('click', (e) => {
        if (e.target === intelModal) intelModal.classList.add('hidden');
    });

    function showDeepIntelligence(company) {
        const scanner = document.getElementById('scanning-layer');
        const report = document.getElementById('intelligence-report');
        
        report.innerHTML = '';
        scanner.classList.remove('hidden');
        intelModal.classList.remove('hidden');

        // Simulate "Cloud Scanning" for executive feel
        setTimeout(() => {
            scanner.classList.add('hidden');
            renderIntelligenceReport(company);
        }, 1800);
    }

    function renderIntelligenceReport(company) {
        const intel = company.deepIntelligence;
        const container = document.getElementById('intelligence-report');

        const contactsHtml = intel.contacts.map(c => `
            <div class="contact-card">
                <span class="contact-role">${c.role}</span>
                <strong>${c.name}</strong>
            </div>
        `).join('');

        const projectsHtml = intel.pipeline2025.map(p => `
            <tr>
                <td>${p.project}</td>
                <td>${p.budget}</td>
                <td><span class="unit-badge">${p.status}</span></td>
            </tr>
        `).join('');

        const servicesHtml = intel.csiServices.map(s => `
            <div class="csi-matching-item">
                <span class="unit-badge">${s.unit}</span> ${s.service}
            </div>
        `).join('');

        container.innerHTML = `
            <div class="report-header">
                <h2>Intelligence Report: ${company.nombre}</h2>
                <p>Análisis estratégico de prospección comercial 2025-2026</p>
            </div>
            <div class="report-grid">
                <div class="intel-section">
                    <h4>👥 Contactos Clave</h4>
                    ${contactsHtml}
                </div>
                <div class="intel-section">
                    <h4>🏗️ Pipeline Proyectos 2025</h4>
                    <table class="project-table">
                        <thead><tr><th>Proyecto</th><th>Inversión</th><th>Estado</th></tr></thead>
                        <tbody>${projectsHtml}</tbody>
                    </table>
                </div>
                <div class="intel-section">
                    <h4>🚀 Propuesta de Valor CSI</h4>
                    <div class="csi-matching-list">${servicesHtml}</div>
                </div>
                <div class="intel-section">
                    <h4>💡 Estrategia de Acceso</h4>
                    <p style="font-size: 0.9rem; opacity: 0.9; line-height: 1.5;">${intel.prospecting}</p>
                    <p style="margin-top: 1rem; font-size: 0.8rem; color: var(--accent-cyan);"><strong>Email:</strong> ${company.contacto}</p>
                </div>
            </div>
        `;
    }

    // --- Functions ---

    function initStats() {
        document.getElementById('stat-clients').textContent = data.stats.totalClients;
        document.getElementById('stat-invest').textContent = data.stats.totalInvestment;
        document.getElementById('stat-companies').textContent = data.stats.totalCompanies;
    }

    function initOpportunities() {
        const grid = document.getElementById('opportunities-grid');
        data.opportunities.forEach(opp => {
            const card = document.createElement('div');
            card.className = 'opportunity-card';
            card.innerHTML = `
                <span class="opp-icon">${opp.icon}</span>
                <h4 class="opp-title">${opp.title}</h4>
                <p class="opp-desc">${opp.description}</p>
                <div class="opp-stats">${opp.stats}</div>
            `;
            grid.appendChild(card);
        });
    }

    function initMap() {
        map = L.map('map', {
            center: [-35.6751, -71.5430],
            zoom: 5,
            zoomControl: false
        });

        L.control.zoom({ position: 'bottomleft' }).addTo(map);
        projectMarkers.addTo(map);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; CARTO'
        }).addTo(map);

        // Load GeoJSON from local variable (fixes CORS/fetch issues)
        if (window.ChileSanitariasGeoJSON) {
            geoJsonLayer = L.geoJSON(window.ChileSanitariasGeoJSON, {
                style: styleFeature,
                onEachFeature: onEachFeature
            }).addTo(map);
        } else {
            console.error("GeoJSON data not found in window.ChileSanitariasGeoJSON");
        }
    }

    function styleFeature(feature) {
        return {
            fillColor: '#0061ff',
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.1
        };
    }

    function resetMapStyles() {
        if (geoJsonLayer) {
            geoJsonLayer.eachLayer(layer => geoJsonLayer.resetStyle(layer));
        }
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: (e) => {
                if (selectedCompany && selectedCompany.regiones.includes(feature.properties.Region)) return;
                e.target.setStyle({ fillOpacity: 0.3, fillColor: '#60efff' });
            },
            mouseout: (e) => {
                if (selectedCompany && selectedCompany.regiones.includes(feature.properties.Region)) return;
                geoJsonLayer.resetStyle(e.target);
            },
            click: (e) => {
                const regionName = feature.properties.Region;
                // Bidirectional: Map -> List
                currentFilter.region = regionName;
                document.getElementById('region-filter').value = regionName;
                renderCompanyList();
                
                // Select the primary company for this region
                const normRegion = normalize(regionName);
                const primary = data.companies.find(c => 
                    c.regiones.some(r => normalize(r) === normRegion)
                );
                if (primary) showDetails(primary);
                
                map.fitBounds(e.target.getBounds());
            }
        });
        layer.bindTooltip(feature.properties.Region, { sticky: true });
    }

    function populateRegions() {
        const select = document.getElementById('region-filter');
        const regions = [...new Set(data.companies.flatMap(c => c.regiones))].sort();
        regions.forEach(reg => {
            const opt = document.createElement('option');
            opt.value = reg; opt.textContent = reg;
            select.appendChild(opt);
        });
    }

    function renderCompanyList() {
        const list = document.getElementById('company-list');
        list.innerHTML = '';

        const normFilterRegion = normalize(currentFilter.region);

        const filtered = data.companies.filter(c => {
            const matchesRegion = currentFilter.region === 'all' || 
                                 c.regiones.some(r => normalize(r) === normFilterRegion);
            const matchesSearch = c.nombre.toLowerCase().includes(currentFilter.search) || 
                                 c.controlador.toLowerCase().includes(currentFilter.search);
            return matchesRegion && matchesSearch;
        });

        filtered.forEach(company => {
            const li = document.createElement('li');
            li.className = 'company-item';
            if (selectedCompany && selectedCompany.id === company.id) li.classList.add('active');
            li.innerHTML = `
                <h4>${company.nombre}</h4>
                <p>${company.controlador}</p>
            `;
            li.addEventListener('click', () => showDetails(company));
            list.appendChild(li);
        });
    }

    function showDetails(company) {
        selectedCompany = company;
        const panel = document.getElementById('details-panel');
        const content = document.getElementById('details-content');
        projectMarkers.clearLayers();

        // Build HTML for interactivity
        const regionsHtml = company.regiones.map(r => `<span class="tag region-tag" data-region="${r}">${r}</span>`).join('');
        const projectsHtml = company.proyectos.map((p, i) => `<span class="tag project project-tag" data-idx="${i}">${p.nombre}</span>`).join('');
        const opportunitiesHtml = company.oportunidades.map((o, i) => `
            <div class="opp-item">
                <span class="tag opportunity opp-tag" data-idx="${i}">${o.nombre}</span>
                <div class="rationale-box" id="rat-${company.id}-${i}">
                    <p class="rationale-text">${o.razon}</p>
                </div>
            </div>
        `).join('');

        content.innerHTML = `
            <h2>${company.nombre}</h2>
            <div class="detail-section"><h5>Controlador</h5><p>${company.controlador} (${company.tipo})</p></div>
            <div class="detail-section"><h5>Suministro</h5><p>${company.clientes.toLocaleString()} Clientes</p></div>
            <div class="detail-section"><h5>Regiones Operativas (Clic p/ zoom)</h5><div class="tag-container">${regionsHtml}</div></div>
            <div class="detail-section"><h5>Proyectos SEIA (Clic p/ ubicar)</h5><div class="tag-container">${projectsHtml}</div></div>
            <div class="detail-section"><h5>Oportunidades Específicas</h5><div class="tag-container" style="flex-direction: column; align-items: flex-start;">${opportunitiesHtml}</div></div>
        `;

        panel.classList.remove('hidden');
        renderCompanyList(); // Update active state in sidebar

        // Bidirectional: List -> Map (Highlight all territories)
        highlightCompanyTerritory(company);

        // Add event listeners to tags
        content.querySelectorAll('.region-tag').forEach(tag => {
            tag.addEventListener('click', () => zoomToRegion(tag.dataset.region));
        });

        content.querySelectorAll('.project-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const proj = company.proyectos[tag.dataset.idx];
                showProjectOnMap(proj);
            });
        });

        content.querySelectorAll('.opp-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const idx = tag.dataset.idx;
                const box = document.getElementById(`rat-${company.id}-${idx}`);
                box.classList.toggle('active');
            });
        });
    }

    function highlightCompanyTerritory(company) {
        if (!geoJsonLayer) return;
        const bounds = L.latLngBounds();
        let found = false;

        const companyRegionsNormalized = company.regiones.map(r => normalize(r));

        geoJsonLayer.eachLayer(layer => {
            const regionNorm = normalize(layer.feature.properties.Region);
            if (companyRegionsNormalized.includes(regionNorm)) {
                layer.setStyle({ fillOpacity: 0.4, fillColor: '#0061ff', color: '#60efff', weight: 3 });
                bounds.extend(layer.getBounds());
                found = true;
            } else {
                geoJsonLayer.resetStyle(layer);
            }
        });

        if (found) map.fitBounds(bounds, { padding: [50, 50] });
    }

    function zoomToRegion(regionName) {
        if (!geoJsonLayer) return;
        
        const targetNorm = normalize(regionName);

        // Reset all to base style first for maximum contrast of the specific region
        geoJsonLayer.eachLayer(layer => {
            geoJsonLayer.resetStyle(layer);
        });

        geoJsonLayer.eachLayer(layer => {
            if (normalize(layer.feature.properties.Region) === targetNorm) {
                map.fitBounds(layer.getBounds(), { padding: [50, 50] });
                layer.setStyle({ 
                    fillOpacity: 0.6, 
                    fillColor: '#60efff', 
                    color: '#0061ff', 
                    weight: 4,
                    dashArray: '5, 5' 
                });
                layer.bringToFront();
            }
        });
    }

    function showProjectOnMap(proj) {
        projectMarkers.clearLayers();
        const marker = L.marker([proj.lat, proj.lng], {
            icon: L.divIcon({ className: 'project-marker' })
        }).bindPopup(`<b>${proj.nombre}</b>`).addTo(projectMarkers);
        
        map.setView([proj.lat, proj.lng], 10);
        marker.openPopup();
    }
});
