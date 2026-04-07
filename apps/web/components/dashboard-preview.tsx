const cards = [
  { title: "Projetos ativos", value: "12", helper: "+3 esta semana" },
  { title: "Em revisão", value: "5", helper: "2 com prioridade alta" },
  { title: "Decks gerados", value: "28", helper: "98% sucesso de exportação" }
] as const;

export function DashboardPreview() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <article
          className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5"
          key={card.title}
        >
          <p className="text-sm text-zinc-400">{card.title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{card.value}</p>
          <p className="mt-2 text-sm text-zinc-500">{card.helper}</p>
        </article>
      ))}
    </section>
  );
}
