import Reveal from "./Reveal";

export default function SectionHead({
  over,
  title,
  desc,
  dark = false,
  className = "",
}: {
  over: string;
  title: string;
  desc?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <p className={`eyebrow flex items-center gap-3 ${dark ? "text-greige-300" : ""}`}>
        <span className={`inline-block h-px w-6 ${dark ? "bg-burgundy-300" : "bg-burgundy"}`} aria-hidden />
        {over}
      </p>
      <h2
        className={`mt-5 whitespace-pre-line text-[28px] font-semibold leading-[1.3] tracking-tightest md:text-[40px] ${
          dark ? "text-pearl" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {desc && (
        <p className={`mt-5 max-w-[34rem] text-[15px] leading-[1.75] md:text-base ${dark ? "text-pearl/70" : "text-navy/70"}`}>
          {desc}
        </p>
      )}
    </Reveal>
  );
}
