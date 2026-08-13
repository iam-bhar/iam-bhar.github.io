import { profile } from "@/app/data/resume";

export default function Footer() {
  return (
    <footer className="relative border-t border-line px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="text-xs text-ink-faint">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-ink-faint transition-colors hover:text-ink-soft"
        >
          LinkedIn ↗
        </a>
      </div>
    </footer>
  );
}
