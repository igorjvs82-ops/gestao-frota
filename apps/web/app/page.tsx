import { DashboardPreview } from "../components/dashboard-preview";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-500">
          Logos Studio
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-zinc-50 md:text-5xl">
          Plataforma premium para estudos bíblicos e apresentações
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-zinc-400">
          Gere materiais devocionais, estudos, sermões expositivos e slides com
          consistência teológica, excelência visual e colaboração em equipe.
        </p>
      </header>

      <DashboardPreview />

      <section className="mt-8 rounded-2xl border border-zinc-800 bg-gradient-to-br from-brand-900 to-brand-700 p-6">
        <h2 className="text-2xl font-semibold">Próximo passo</h2>
        <p className="mt-2 text-zinc-200">
          A próxima entrega conecta este dashboard ao pipeline de geração e ao
          editor de blocos com revisão teológica automática.
        </p>
      </section>
    </main>
  );
}
