import './globals.css';
import { Sidebar } from '@/components/sidebar';

export const metadata = {
  title: 'Sistema AGEDOCE / Aplicar',
  description: 'RDO + Relatório Vivo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
