const formatPercent = (value) => `${Math.round(value * 100)}%`;

export function calculateSummary(vehicles) {
  if (!vehicles.length) {
    return {
      totalVehicles: 0,
      available: 0,
      utilization: 0,
      totalKilometers: 0,
      avgEfficiency: 0
    };
  }

  const totalVehicles = vehicles.length;
  const available = vehicles.filter((v) => v.status === 'disponivel').length;
  const activeCount = vehicles.filter((v) => v.status === 'em_rota').length;
  const totalKilometers = vehicles.reduce((acc, vehicle) => acc + vehicle.kilometers, 0);
  const avgEfficiency =
    vehicles.reduce((acc, vehicle) => acc + vehicle.fuelEfficiency, 0) / totalVehicles;

  return {
    totalVehicles,
    available,
    utilization: activeCount / totalVehicles,
    totalKilometers,
    avgEfficiency
  };
}

export function formatSummary(summary) {
  return [
    {
      label: 'Frota total',
      value: summary.totalVehicles,
      helper: `${summary.available} disponíveis`
    },
    {
      label: 'Utilização',
      value: formatPercent(summary.utilization),
      helper: 'Veículos em rota / total'
    },
    {
      label: 'Quilometragem total',
      value: `${summary.totalKilometers.toLocaleString('pt-BR')} km`,
      helper: 'Acumulado do mês'
    },
    {
      label: 'Eficiência média',
      value: `${summary.avgEfficiency.toFixed(1)} km/l`,
      helper: 'Baseada nos últimos 30 dias'
    }
  ];
}

export function buildAlertMessages(vehicles, threshold = 800) {
  return vehicles
    .filter((vehicle) => vehicle.nextMaintenanceKm - vehicle.kilometers <= threshold)
    .map((vehicle) => ({
      id: vehicle.id,
      title: `${vehicle.model} (${vehicle.plate})`,
      content: `Faltam ${vehicle.nextMaintenanceKm - vehicle.kilometers} km para a próxima revisão.`
    }));
}

export function buildDetails(vehicle) {
  return [
    { label: 'Motorista', value: vehicle.driver },
    { label: 'Status', value: vehicle.status.replace('_', ' ') },
    { label: 'Última manutenção', value: new Date(vehicle.lastMaintenance).toLocaleDateString('pt-BR') },
    { label: 'Km atuais', value: `${vehicle.kilometers.toLocaleString('pt-BR')} km` },
    { label: 'Autonomia média', value: `${vehicle.autonomy.toFixed(1)} h` },
    { label: 'Eficiência', value: `${vehicle.fuelEfficiency.toFixed(1)} km/l` },
    { label: 'Próxima revisão', value: `${vehicle.nextMaintenanceKm.toLocaleString('pt-BR')} km` },
    { label: 'Rota', value: vehicle.route }
  ];
}
