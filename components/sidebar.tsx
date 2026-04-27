import Link from 'next/link';

const links = [
  '/dashboard','/obras','/ciclos','/municipios','/imoveis','/equipes','/colaboradores','/veiculos','/intervencoes','/planejamento','/tarefas','/rdos/novo','/validacao-d1','/pendencias','/evidencias','/relatorio-vivo','/auditoria-pre-cobrape'
];

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-4 hidden md:block">
      <h1 className="font-semibold text-lg mb-4">AGEDOCE / Aplicar</h1>
      <nav className="space-y-1">
        {links.map((href) => (
          <Link key={href} href={href} className="block rounded px-2 py-1 hover:bg-slate-700 text-sm">
            {href.replace('/', '') || 'home'}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
