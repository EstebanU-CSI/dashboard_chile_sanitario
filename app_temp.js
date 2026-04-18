// Dashboard Chile Sanitario - App.js
// Plataforma interactiva de inteligencia de mercado sanitaria

let map;
let markers = {};
let selectedCompany = null;
let actionsData = [];

document.addEventListener('DOMContentLoaded', function() {
  initializeMap();
  populateRegions();
  populateCompanyList();
  setupEventListeners();
  loadActionsFromStorage();
});

function initializeMap() {
  map = L.map('map').setView([-23.6345, -70.3977], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map);

  if (window.companiesData) {
    window.companiesData.forEach(company => {
      if (company.lat && company.lng) {
        addMarkerToMap(company);
      }
    });
  }
}

function addMarkerToMap(company) {
  const marker = L.circleMarker([company.lat, company.lng], {
    radius: 8,
    fillColor: '#00796b',
    color: '#004d40',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8
  });

  marker.bindPopup(`<b>${company.name}</b><br>${company.region}`);
  marker.on('click', () => showCompanyDetails(company));
  marker.addTo(map);
  markers[company.id] = marker;
}

function populateRegions() {
  const regionFilter = document.getElementById('region-filter');
  const regions = [...new Set(window.companiesData?.map(c => c.region) || [])];

  regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    regionFilter.appendChild(option);
  });
}

function populateCompanyList() {
  const companyList = document.getElementById('company-list');
  companyList.innerHTML = '';

  if (window.companiesData) {
    window.companiesData.forEach(company => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#" onclick="showCompanyDetails('${company.id}'); return false;">${company.name}</a>`;
      companyList.appendChild(li);
    });
  }
}

function showCompanyDetails(companyId) {
  let company;

  if (typeof companyId === 'object') {
    company = companyId;
  } else {
    company = window.companiesData?.find(c => c.id == companyId);
  }

  if (!company) return;

  selectedCompany = company;
  const detailsPanel = document.getElementById('details-panel');
  const detailsContent = document.getElementById('details-content');

  detailsContent.innerHTML = `
    <h3>${company.name}</h3>
    <p><strong>Región:</strong> ${company.region}</p>
    <p><strong>Clientes:</strong> ${company.clients || 'N/A'}</p>
    <p><strong>Inversión:</strong> ${company.investment || 'N/A'}</p>
    <p><strong>Contacto:</strong> ${company.contact || 'N/A'}</p>
    <p><strong>Descripción:</strong> ${company.description || 'Sin información'}</p>
  `;

  detailsPanel.classList.remove('hidden');
}

function openIntelligenceModal() {
  const modal = document.getElementById('intelligence-modal');
  modal.classList.remove('hidden');
  startIntelligenceScan();
}

function startIntelligenceScan() {
  const scanningLayer = document.getElementById('scanning-layer');
  const reportContainer = document.getElementById('report-view-container');

  scanningLayer.classList.remove('hidden');
  reportContainer.classList.add('hidden');

  setTimeout(() => {
    scanningLayer.classList.add('hidden');
    reportContainer.classList.remove('hidden');
    generateIntelligenceReport();
  }, 2000);
}

function generateIntelligenceReport() {
  if (!selectedCompany) return;

  const report = document.getElementById('intelligence-report');
  report.innerHTML = `
    <h4>Análisis de ${selectedCompany.name}</h4>
    <p>Reporte generado para prospección comercial.</p>
    <ul>
      <li>Región: ${selectedCompany.region}</li>
      <li>Potencial: Alto</li>
      <li>Acción: Contacto directo</li>
    </ul>
  `;
}

function saveAction(event) {
  event.preventDefault();

  const action = {
    id: Date.now(),
    date: new Date().toLocaleDateString('es-ES'),
    company: selectedCompany?.name || 'Sin empresa',
    type: document.getElementById('action-type')?.value || '',
    status: document.getElementById('action-status')?.value || '',
    nextDate: document.getElementById('next-action-date')?.value || '',
    comments: document.getElementById('action-comments')?.value || ''
  };

  actionsData.push(action);
  saveActionsToStorage();
  updateActionsTable();
  document.getElementById('action-log-form')?.reset();
  alert('Gestión guardada correctamente');
}

function updateActionsTable() {
  const tbody = document.getElementById('actions-table-body');
  const noMsg = document.getElementById('no-actions-msg');

  if (!tbody) return;

  tbody.innerHTML = '';

  if (actionsData.length === 0) {
    noMsg?.classList.remove('hidden');
    return;
  }

  noMsg?.classList.add('hidden');

  actionsData.forEach(action => {
    const row = tbody.insertRow();
    row.innerHTML = `
      <td>${action.date}</td>
      <td>${action.company}</td>
      <td>${action.type}</td>
      <td>${action.status}</td>
      <td>${action.nextDate}</td>
      <td>${action.comments}</td>
      <td><button onclick="deleteAction(${action.id})">🗑️</button></td>
    `;
  });
}

function deleteAction(id) {
  actionsData = actionsData.filter(a => a.id !== id);
  saveActionsToStorage();
  updateActionsTable();
}

function exportToExcel() {
  if (actionsData.length === 0) {
    alert('No hay gestiones para exportar');
    return;
  }

  let csv = 'Fecha,Empresa,Acción,Estado,Próxima Acción,Comentarios\n';
  actionsData.forEach(action => {
    csv += `${action.date},"${action.company}","${action.type}","${action.status}","${action.nextDate}","${action.comments}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `gestiones_${new Date().getTime()}.csv`;
  a.click();
}

function saveActionsToStorage() {
  localStorage.setItem('dashboardActions', JSON.stringify(actionsData));
}

function loadActionsFromStorage() {
  const stored = localStorage.getItem('dashboardActions');
  if (stored) {
    actionsData = JSON.parse(stored);
    updateActionsTable();
  }
}

function switchView(viewName) {
  const views = document.querySelectorAll('.view-section');
  views.forEach(v => v.classList.add('hidden'));

  const activeView = document.getElementById(viewName);
  if (activeView) activeView.classList.remove('hidden');
}

function setupEventListeners() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const view = this.getAttribute('data-view');
      switchView(view);
    });
  });

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', filterCompanies);
  }

  const regionFilter = document.getElementById('region-filter');
  if (regionFilter) {
    regionFilter.addEventListener('change', filterCompanies);
  }

  const closeDetails = document.getElementById('close-details');
  if (closeDetails) {
    closeDetails.addEventListener('click', () => {
      document.getElementById('details-panel').classList.add('hidden');
    });
  }

  const deepResearchBtn = document.getElementById('deep-research-btn');
  if (deepResearchBtn) {
    deepResearchBtn.addEventListener('click', openIntelligenceModal);
  }

  const closeIntelligence = document.getElementById('close-intelligence');
  if (closeIntelligence) {
    closeIntelligence.addEventListener('click', () => {
      document.getElementById('intelligence-modal').classList.add('hidden');
    });
  }

  const actionForm = document.getElementById('action-log-form');
  if (actionForm) {
    actionForm.addEventListener('submit', saveAction);
  }

  const exportBtn = document.getElementById('export-actions-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportToExcel);
  }

  const trackingSearch = document.getElementById('tracking-search');
  if (trackingSearch) {
    trackingSearch.addEventListener('input', filterActions);
  }
}

function filterCompanies() {
  const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
  const regionFilter = document.getElementById('region-filter')?.value || 'all';

  const companyList = document.getElementById('company-list');
  if (!companyList) return;

  companyList.querySelectorAll('li').forEach(li => {
    const text = li.textContent.toLowerCase();
    const show = text.includes(searchTerm);
    li.style.display = show ? '' : 'none';
  });
}

function filterActions() {
  const searchTerm = document.getElementById('tracking-search')?.value.toLowerCase() || '';
  const tbody = document.getElementById('actions-table-body');

  if (!tbody) return;

  tbody.querySelectorAll('tr').forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchTerm) ? '' : 'none';
  });
}
