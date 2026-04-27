export const mockUsers = [
  { email: 'encarregado@aplicar.com', nome: 'Encarregado Campo', role: 'ENCARREGADO' },
  { email: 'tecnico@aplicar.com', nome: 'Técnico Ambiental', role: 'TECNICO_AMBIENTAL' },
  { email: 'coordenador@aplicar.com', nome: 'Coordenador', role: 'COORDENADOR' },
  { email: 'rh@aplicar.com', nome: 'Administrativo RH', role: 'ADMINISTRATIVO_RH' },
  { email: 'planejamento@aplicar.com', nome: 'Planejamento', role: 'PLANEJAMENTO' },
  { email: 'auditor@aplicar.com', nome: 'Auditor Interno', role: 'AUDITOR_INTERNO' },
  { email: 'consulta@aplicar.com', nome: 'Consulta', role: 'CONSULTA' },
];

export function loginLocalMock(email: string) {
  return mockUsers.find((u) => u.email === email);
}

export const futuraIntegracao = {
  entraId: { habilitado: false, tenantId: process.env.ENTRA_TENANT_ID || '' },
  graphSharepoint: { habilitado: false, siteId: process.env.SHAREPOINT_SITE_ID || '' },
};
