const normalize = (text = '') => text.normalize('NFD').replace(/[^\w\s-]/g, '').toLowerCase();

export function filterVehicles(list, { searchTerm = '', status = 'todos', minEfficiency = 0 } = {}) {
  const normalizedTerm = normalize(searchTerm);
  return list.filter((vehicle) => {
    const matchesStatus = status === 'todos' ? true : vehicle.status === status;
    const matchesEfficiency = vehicle.fuelEfficiency >= Number(minEfficiency || 0);
    const searchable = normalize(`${vehicle.plate} ${vehicle.model} ${vehicle.driver}`);
    const matchesSearch = normalizedTerm ? searchable.includes(normalizedTerm) : true;
    return matchesStatus && matchesEfficiency && matchesSearch;
  });
}

export function sortByNextMaintenance(list) {
  return [...list].sort((a, b) => a.nextMaintenanceKm - b.nextMaintenanceKm);
}
