type SiteContainerClassOptions = {
  className?: string;
};

export function siteContainerClasses({ className }: SiteContainerClassOptions = {}) {
  return [
    "mx-auto w-full max-w-[108rem] px-4 sm:px-6 lg:px-8",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}
