import test from 'node:test';
import assert from 'node:assert/strict';

import { buildAlertMessages, calculateSummary } from '../src/utils/metrics.js';

const vehicles = [
  { status: 'disponivel', kilometers: 100, fuelEfficiency: 3, nextMaintenanceKm: 800 },
  { status: 'em_rota', kilometers: 200, fuelEfficiency: 2.5, nextMaintenanceKm: 600 },
  { status: 'em_rota', kilometers: 300, fuelEfficiency: 2, nextMaintenanceKm: 620 }
];

test('calculateSummary retorna totais agregados', () => {
  const summary = calculateSummary(vehicles);
  assert.equal(summary.totalVehicles, 3);
  assert.equal(summary.available, 1);
  assert.equal(Math.round(summary.utilization * 100), 67);
  assert.equal(summary.totalKilometers, 600);
  assert.equal(summary.avgEfficiency.toFixed(2), '2.50');
});

test('buildAlertMessages aplica threshold de proximidade', () => {
  const alerts = buildAlertMessages(
    vehicles.map((vehicle, index) => ({
      ...vehicle,
      id: index,
      model: 'Teste',
      plate: 'AAA',
      kilometers: 500 + index * 50
    })),
    200
  );
  assert.equal(alerts.length, 2);
});
