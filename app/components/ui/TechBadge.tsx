import Image from "next/image";
import { cn } from "@/app/lib/cn";
import { getTechIcon, getVendoredTechIcon } from "@/app/data/techIcons";

type TechBadgeProps = {
  name: string;
  className?: string;
  size?: "sm" | "md";
};

export default function TechBadge({ name, className, size = "sm" }: TechBadgeProps) {
  const Icon = getTechIcon(name);
  const vendoredSlug = getVendoredTechIcon(name);
  const hasIcon = Boolean(Icon || vendoredSlug);
  const dims = size === "sm" ? 14 : 18;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-glass/50 py-1 pr-3 text-xs font-medium text-ink-soft backdrop-blur-xl transition-colors duration-300 hover:border-line-strong hover:text-ink",
        hasIcon ? "pl-1.5" : "pl-3",
        className,
      )}
    >
      {hasIcon && (
        <span className="flex shrink-0 items-center justify-center rounded-full bg-ink p-1">
          {Icon ? (
            <Icon className="shrink-0" size={dims} />
          ) : (
            <Image src={`/icons/devicon/${vendoredSlug}.svg`} alt="" width={dims} height={dims} className="h-auto w-auto" style={{ width: dims, height: dims }} />
          )}
        </span>
      )}
      {name}
    </span>
  );
}
