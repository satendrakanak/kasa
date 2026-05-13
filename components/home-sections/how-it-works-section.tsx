import { howItWorks } from "@/lib/landing";

export function HowItWorksSection() {
  return (
    <section className="bg-background py-20 text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            How It Works
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold leading-[1.2] tracking-normal sm:text-5xl sm:leading-tight">
            From course sales to learner delivery
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
            KASA is built for coaching institutes, trainers, online academies,
            and enterprise learning teams that want to manage their entire
            education business from a single system.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {howItWorks.map((item) => (
            <article
              key={item.step}
              className="rounded-3xl border border-border bg-surface/80 p-6 shadow-sm shadow-black/20"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                {item.step}
              </div>
              <h3 className="mt-3 font-heading text-2xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3 text-slate-200">
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
