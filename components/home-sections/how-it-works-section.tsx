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
            From enquiry to learner delivery, everything stays connected.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
            This is the simple rollout logic behind KASA: launch the front
            layer, structure delivery, keep faculty workflows organized, and
            connect operations around the same learner journey.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {howItWorks.map((item) => (
            <article
              key={item.step}
              className="rounded-3xl border border-border bg-surface/80 p-6 shadow-sm shadow-black/20 transition duration-500 hover:border-primary hover:shadow-[0_0_42px_rgba(88,201,138,0.18)]"
            >
              <div className="flex items-center gap-4">
                <div className="grid size-12 place-items-center rounded-2xl border border-primary/30 bg-primary/10 font-heading text-base font-semibold text-primary">
                  {item.step}
                </div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                  Step {item.step}
                </div>
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
