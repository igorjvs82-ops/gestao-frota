import { vehicles } from './data/vehicles.js';
import { filterVehicles, sortByNextMaintenance } from './utils/filters.js';
import { buildAlertMessages, buildDetails, calculateSummary, formatSummary } from './utils/metrics.js';

const tableBody = document.querySelector('#vehicles-table');
const tableCount = document.querySelector('#table-count');
const metricsPanel = document.querySelector('#metrics-panel');
const alertsList = document.querySelector('#alerts-list');
const detailsPanel = document.querySelector('#details-panel');
const detailsTitle = document.querySelector('#details-title');
const detailsContent = document.querySelector('#details-content');
const heroUtilization = document.querySelector('#hero-utilization');
const yearLabel = document.querySelector('#year');

const form = document.querySelector('#filter-form');
const searchInput = document.querySelector('#search-input');
const statusSelect = document.querySelector('#status-select');
const efficiencyInput = document.querySelector('#efficiency-input');
const refreshButton = document.querySelector('#refresh-button');

let currentList = [...vehicles];

yearLabel.textContent = new Date().getFullYear();

function renderMetrics(list) {
  const summary = calculateSummary(list);
  heroUtilization.textContent = `${Math.round(summary.utilization * 100)}%`;
  const formatted = formatSummary(summary);
  metricsPanel.innerHTML = formatted
    .map(
      (metric) => `
        <div class="metric">
          <span>${metric.label}</span>
          <strong>${metric.value}</strong>
          <small>${metric.helper}</small>
        </div>`
    )
    .join('');
}

function renderAlerts(list) {
  const alerts = buildAlertMessages(list);
  alertsList.innerHTML = alerts.length
    ? alerts
        .map(
          (alert) => `
            <li class="alert" data-id="${alert.id}">
              <strong>${alert.title}</strong>
              <span>${alert.content}</span>
            </li>`
        )
        .join('')
    : '<li>Nenhum alerta crítico para os próximos 800 km.</li>';
}

function renderTable(list) {
  tableBody.innerHTML = list
    .map(
      (vehicle) => `
        <tr data-id="${vehicle.id}">
          <td>
            <strong>${vehicle.model}</strong>
            <div class="muted">${vehicle.plate}</div>
          </td>
          <td>${vehicle.driver}</td>
          <td><span class="status-pill status-${vehicle.status}">${vehicle.status.replace('_', ' ')}</span></td>
          <td>${new Date(vehicle.lastMaintenance).toLocaleDateString('pt-BR')}</td>
          <td>${vehicle.kilometers.toLocaleString('pt-BR')} km</td>
          <td>${vehicle.fuelEfficiency.toFixed(1)} km/l</td>
        </tr>`
    )
    .join('');
  tableCount.textContent = `${list.length} ${list.length === 1 ? 'veículo' : 'veículos'}`;
}

function renderDetails(vehicle) {
  if (!vehicle) {
    detailsPanel.hidden = true;
    return;
  }
  detailsPanel.hidden = false;
  detailsTitle.textContent = `${vehicle.model} · ${vehicle.plate}`;
  const details = buildDetails(vehicle);
  detailsContent.innerHTML = `
    <div class="details-grid">
      ${details.map((item) => `<span><strong>${item.label}</strong>${item.value}</span>`).join('')}
    </div>
    <div class="details-grid">
      <span><strong>Pressão dos pneus</strong>${vehicle.telematics.tirePressure}</span>
      <span><strong>Nível do óleo</strong>${vehicle.telematics.oilLevel}</span>
      <span><strong>Temp. do motor</strong>${vehicle.telematics.coolantTemp}ºC</span>
    </div>`;
}

function applyFilters() {
  const filtered = filterVehicles(vehicles, {
    searchTerm: searchInput.value,
    status: statusSelect.value,
    minEfficiency: efficiencyInput.value
  });
  currentList = filtered;
  renderMetrics(filtered);
  renderAlerts(filtered);
  renderTable(filtered);
  return filtered;
}

function hydrateTableEvents() {
  tableBody.addEventListener('click', (event) => {
    const targetRow = event.target.closest('tr');
    if (!targetRow) return;
    const vehicle = currentList.find((item) => item.id === targetRow.dataset.id);
    renderDetails(vehicle);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const filtered = applyFilters();
  renderDetails(filtered[0]);
});

refreshButton.addEventListener('click', () => {
  refreshButton.disabled = true;
  refreshButton.textContent = 'Atualizando...';
  setTimeout(() => {
    const sorted = sortByNextMaintenance([...vehicles]);
    currentList = sorted;
    renderTable(sorted);
    renderAlerts(sorted);
    renderMetrics(sorted);
    renderDetails(sorted[0]);
    refreshButton.disabled = false;
    refreshButton.textContent = 'Atualizar dados';
  }, 600);
});

const initialList = applyFilters();
renderDetails(initialList[0]);
hydrateTableEvents();
