"use client";

import { useState } from "react";
import type { Idea } from "@/lib/ideas";

interface IdeaCardProps {
  idea: Idea;
}

const gradientByMode: Record<string, string> = {
  remoto: "from-sky-500/20 to-blue-900/40",
  híbrido: "from-emerald-500/20 to-emerald-900/40",
  presencial: "from-amber-500/20 to-orange-900/40"
};

export function IdeaCard({ idea }: IdeaCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${gradientByMode[idea.deliveryMode]} p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl font-semibold text-white">{idea.title}</h2>
        <span className="rounded-full bg-white/10 px-3 py-1 text-sm uppercase tracking-wide text-white/80">
          {idea.deliveryMode}
        </span>
      </div>
      <p className="mt-4 text-base text-white/80">{idea.description}</p>
      <p className="mt-2 text-sm text-white/60">{idea.experienceAnchor}</p>
      <p className="mt-4 text-sm font-semibold text-accent">
        {idea.valueProposition}
      </p>

      <section className="mt-6 space-y-4">
        <Block title="Audiencia objetivo">
          <ul className="list-disc space-y-1 pl-5 text-sm text-white/80">
            {idea.audience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Block>

        <Block title="Diferenciador clave">
          <p className="text-sm text-white/80">{idea.differentiator}</p>
        </Block>

        <Block title="Servicios principales">
          <div className="space-y-3">
            {idea.services.map((service) => (
              <div
                key={service.name}
                className="rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <h3 className="text-sm font-semibold text-white">
                  {service.name}
                </h3>
                <p className="text-sm text-white/70">{service.detail}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Stack de IA recomendado">
          <div className="grid gap-3 md:grid-cols-3">
            {idea.aiStack.map((tool) => (
              <div
                key={tool.name}
                className="rounded-xl border border-white/10 bg-black/20 p-3"
              >
                <h4 className="text-sm font-semibold text-white">
                  {tool.name}
                </h4>
                <p className="mt-2 text-xs text-white/60">{tool.purpose}</p>
                <p className="mt-2 text-xs text-white/50">
                  Ejemplo: {tool.workflowExample}
                </p>
              </div>
            ))}
          </div>
        </Block>
      </section>

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:border-accent hover:text-accent"
      >
        {expanded ? "Ocultar plan detallado" : "Ver plan detallado"}
      </button>

      {expanded && (
        <div className="mt-6 space-y-5 rounded-3xl border border-white/10 bg-black/40 p-5">
          <Block title="Modelos de monetización">
            <ul className="list-disc space-y-1 pl-5 text-sm text-white/70">
              {idea.monetization.map((item) => (
                <li key={item.model}>
                  <span className="font-semibold text-white">
                    {item.model}:
                  </span>{" "}
                  {item.detail}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Hoja de ruta de lanzamiento">
            <div className="space-y-3">
              {idea.launchRoadmap.map((stage) => (
                <div key={stage.phase}>
                  <h4 className="text-sm font-semibold text-white">
                    {stage.phase}
                  </h4>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-white/70">
                    {stage.actions.map((action) => (
                      <li key={action}>{action}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Métricas de impacto y éxito">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wide text-white/60">
                  Indicadores de impacto
                </h5>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-white/70">
                  {idea.impactMetrics.map((metric) => (
                    <li key={metric}>{metric}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wide text-white/60">
                  Señales de éxito
                </h5>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-white/70">
                  {idea.successSignals.map((signal) => (
                    <li key={signal}>{signal}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Block>
        </div>
      )}
    </article>
  );
}

function Block({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
        {title}
      </h3>
      <div className="mt-2">{children}</div>
    </section>
  );
}
