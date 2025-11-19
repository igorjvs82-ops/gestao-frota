import test from 'node:test';
import assert from 'node:assert/strict';

import { filterVehicles, sortByNextMaintenance } from '../src/utils/filters.js';

const sample = [
  { id: '1', plate: 'AAA-0001', model: 'Modelo X', driver: 'João', status: 'disponivel', fuelEfficiency: 3, nextMaintenanceKm: 1000, kilometers: 800 },
  { id: '2', plate: 'BBB-0002', model: 'Modelo Y', driver: 'Maria', status: 'em_rota', fuelEfficiency: 2, nextMaintenanceKm: 900, kilometers: 850 },
  { id: '3', plate: 'CCC-0003', model: 'Modelo Z', driver: 'Clara', status: 'manutencao', fuelEfficiency: 1.8, nextMaintenanceKm: 1200, kilometers: 600 }
];

test('filterVehicles aplica filtro por status e eficiência', () => {
  const result = filterVehicles(sample, { status: 'disponivel', minEfficiency: 2.5 });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, '1');
});

test('filterVehicles realiza busca textual considerando placa e motorista', () => {
  const result = filterVehicles(sample, { searchTerm: 'maria' });
  assert.equal(result.length, 1);
  assert.equal(result[0].driver, 'Maria');
});

test('sortByNextMaintenance ordena pela quilometragem da próxima revisão', () => {
  const result = sortByNextMaintenance(sample);
  assert.deepEqual(result.map((item) => item.id), ['2', '1', '3']);
});
