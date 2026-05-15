type SectionShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
};

export function SectionShell({
  eyebrow,
  title,
  description,
  align = "left",
  children,
}: SectionShellProps) {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={[
            "max-w-3xl",
            align === "center" ? "mx-auto text-center" : "",
          ].join(" ")}
        >
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 font-heading text-3xl font-semibold leading-[1.15] tracking-normal text-white sm:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-5 text-sm leading-7 text-muted sm:text-base sm:leading-8">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
