"use client";

import { useMemo, useState } from "react";
import { IdeaCard } from "@/components/idea-card";
import { ideas, type DeliveryMode } from "@/lib/ideas";

const deliveryFilters: { label: string; value: DeliveryMode | "todos" }[] = [
  { label: "Todos", value: "todos" },
  { label: "Remoto", value: "remoto" },
  { label: "Híbrido", value: "híbrido" },
  { label: "Presencial", value: "presencial" }
];

export default function Page() {
  const [deliveryMode, setDeliveryMode] = useState<
    DeliveryMode | "todos"
  >("todos");
  const [search, setSearch] = useState("");

  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      const matchDelivery =
        deliveryMode === "todos" || idea.deliveryMode === deliveryMode;
      const matchSearch =
        search.trim().length === 0 ||
        [idea.title, idea.description, idea.differentiator]
          .join(" ")
          .toLocaleLowerCase("es")
          .includes(search.trim().toLocaleLowerCase("es"));
      return matchDelivery && matchSearch;
    });
  }, [deliveryMode, search]);

  const summary = useMemo(() => {
    const aiTools = new Set<string>();
    ideas.forEach((idea) =>
      idea.aiStack.forEach((tool) => aiTools.add(tool.name))
    );
    return {
      totalIdeas: ideas.length,
      deliveryModes: [...new Set(ideas.map((idea) => idea.deliveryMode))],
      aiToolsCount: aiTools.size
    };
  }, []);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 pb-16 pt-12">
      <header className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur">
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">
          Impacto social con IA
        </span>
        <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
          Portafolio de ideas de negocio para una mediadora con 15 años de
          experiencia
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-white/70">
          Explora oportunidades que combinan trabajo social, mediación y la
          experiencia directa con casos de desapariciones, adicciones y
          acompañamiento a familias. Cada propuesta incluye herramientas de IA,
          hoja de ruta y métricas clave.
        </p>
        <dl className="mt-8 grid gap-6 sm:grid-cols-3">
          <SummaryTile
            label="Ideas estratégicas"
            value={summary.totalIdeas.toString()}
            detail="Curadas para escalar con alto impacto social."
          />
          <SummaryTile
            label="Modelos de entrega"
            value={summary.deliveryModes.length.toString()}
            detail="Cobertura remoto, híbrido y presencial."
          />
          <SummaryTile
            label="Herramientas de IA"
            value={summary.aiToolsCount.toString()}
            detail="Ecosistema de automatización, análisis y soporte."
          />
        </dl>
      </header>

      <section className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur">
        <h2 className="text-xl font-semibold text-white">
          Filtra oportunidades
        </h2>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            {deliveryFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setDeliveryMode(filter.value)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  deliveryMode === filter.value
                    ? "border-accent bg-accent/20 text-accent"
                    : "border-white/20 bg-transparent text-white/70 hover:border-white/40"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Busca por temática, palabra clave o servicio"
              className="w-full rounded-full border border-white/15 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
        </div>
        <p className="text-sm text-white/60">
          Las propuestas se pueden combinar para crear un portafolio integral:
          mediación preventiva, reintegración social y gestión de riesgos de
          desaparición.
        </p>
      </section>

      <section className="grid gap-8">
        {filteredIdeas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
        {filteredIdeas.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-black/30 p-10 text-center text-white/60">
            No se encontraron ideas con estos filtros. Ajusta la búsqueda o
            explora otro modelo de entrega.
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 to-slate-800 p-10">
        <h2 className="text-2xl font-semibold text-white">
          Cómo activar estas ideas en menos de 90 días
        </h2>
        <ol className="mt-6 space-y-4 text-sm text-white/70">
          <li>
            <span className="font-semibold text-white">1. Diagnóstico:</span>{" "}
            entrevistar aliados potenciales (ONGs, escuelas, centros de
            rehabilitación) y documentar necesidades clave usando formularios
            digitales.
          </li>
          <li>
            <span className="font-semibold text-white">
              2. Prototipo asistido por IA:
            </span>{" "}
            crear guiones, manuales y materiales piloto con GPT-4o o Claude y
            validar con 3-5 usuarios.
          </li>
          <li>
            <span className="font-semibold text-white">
              3. Kit de herramientas:
            </span>{" "}
            configurar Notion, Airtable y tableros de BI con plantillas listadas
            arriba para entregar reportes de impacto desde el día 1.
          </li>
          <li>
            <span className="font-semibold text-white">
              4. Marketing de confianza:
            </span>{" "}
            apalancar testimonios reales, certificaciones y convenios con
            autoridades para generar credibilidad inmediata.
          </li>
        </ol>
      </section>
    </main>
  );
}

function SummaryTile({
  label,
  value,
  detail
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <p className="text-xs uppercase tracking-[0.3em] text-white/50">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-white/60">{detail}</p>
    </div>
  );
}
