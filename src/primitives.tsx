import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { cn } from './cn';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

function highlightCode(code: string, lang?: string): string {
  if (!lang) return hljs.highlight(code, { language: 'typescript' }).value;
  const language = lang === 'ts' || lang === 'tsx' ? 'typescript' : lang;
  const registered = hljs.getLanguage(language);
  if (!registered) return hljs.highlight(code, { language: 'typescript' }).value;
  return hljs.highlight(code, { language }).value;
}
import { SlideDemoContent } from './slide-demo-content';
import type { SlideAlign } from './types';

export function Slide({
  children,
  align = 'center',
  className,
}: {
  children: React.ReactNode;
  align?: SlideAlign;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'nxs-slide relative flex h-dvh w-dvw flex-col justify-center gap-8 overflow-hidden px-12 py-20 sm:px-24 md:px-32 lg:px-40',
        align === 'center' && 'items-center text-center',
        align === 'left' && 'items-start text-left',
        className,
      )}
    >
      <div className="border-foreground/10 pointer-events-none absolute inset-4 border sm:inset-6" aria-hidden />
      <div
        className={cn(
          'relative z-10 flex min-w-0 max-w-4xl flex-col gap-6',
          align === 'center' && 'items-center',
          align === 'left' && 'items-start',
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function SlideSplitLayout({
  left,
  right,
  className,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('nxs-slide relative flex h-dvh w-dvw overflow-hidden', className)}>
      <div className="border-foreground/10 pointer-events-none absolute inset-4 border sm:inset-6" aria-hidden />
      <div className="relative z-10 flex min-w-0 w-1/2 flex-col justify-center overflow-x-auto px-12 py-20 sm:px-16 md:px-20 lg:px-24">
        {left}
      </div>
      <div className="bg-foreground/10 absolute top-4 bottom-4 left-1/2 z-10 w-px sm:top-6 sm:bottom-6" aria-hidden />
      <div className="relative z-10 flex min-w-0 w-1/2 flex-col justify-center overflow-x-auto px-12 py-20 sm:px-16 md:px-20 lg:px-24">{right}</div>
    </div>
  );
}

export function SlideTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h1
      className={cn('text-foreground text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl', className)}
      style={{ letterSpacing: '-0.04em' }}
    >
      {children}
    </h1>
  );
}

export function SlideSubtitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('text-muted-foreground text-lg sm:text-xl md:text-2xl', className)}>{children}</p>;
}

export function SlideBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'bg-foreground text-background inline-block w-fit shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SlideHeaderBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="text-foreground text-xl font-semibold tracking-tight italic sm:text-2xl">{children}</span>
    </div>
  );
}

export function SlideCode({ children, className, title }: { children: string; className?: string; title?: string }) {
  const lang = title?.split('.').pop();
  const html = highlightCode(children, lang);

  return (
    <div className={cn('min-w-0 w-full max-w-2xl', className)}>
      {title && <div className="text-muted-foreground mb-2 text-xs font-medium tracking-wider uppercase">{title}</div>}
      <pre className="nxs-code-block min-w-0 overflow-x-auto border p-6 text-left font-mono text-[13px] leading-[1.7] sm:text-sm">
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}

export function SlideList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ul className={cn('flex flex-col gap-4 text-left', className)}>{children}</ul>;
}

export function SlideListItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <li className={cn('text-foreground/70 flex items-start gap-3 text-lg sm:text-xl', className)}>
      <span className="bg-foreground/40 mt-2 block h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden />
      <span>{children}</span>
    </li>
  );
}

export function SlideNote({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('text-muted-foreground/50 mt-4 text-sm', className)}>{children}</p>;
}

export function SlideDemo({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div data-slide-interactive className={cn('min-w-0 w-full max-w-2xl', className)}>
      {label && <div className="text-muted-foreground mb-2 text-xs font-medium tracking-wider uppercase">{label}</div>}
      <div className="border-foreground/10 bg-foreground/[0.03] border p-6">
        <SlideDemoContent>{children}</SlideDemoContent>
      </div>
    </div>
  );
}

export function SlideStatementList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex min-w-0 w-full flex-col', className)}>{children}</div>;
}

export function SlideStatement({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn('border-foreground/10 border-t px-8 py-8 last:border-b sm:px-12 md:px-16', className)}>
      <h3 className="text-foreground text-lg font-bold sm:text-xl md:text-2xl">{title}</h3>
      {description && <p className="text-muted-foreground mt-1 text-sm sm:text-base">{description}</p>}
    </div>
  );
}

export function SlideSpeaker({
  name,
  title,
  avatar,
  className,
}: {
  name: string;
  title: string;
  /** Image URL or path for the speaker avatar. Falls back to placeholder when omitted. */
  avatar?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div
        className={cn(
          'h-12 w-12 shrink-0 overflow-hidden rounded-full',
          avatar ? 'relative' : 'bg-foreground/15 border-foreground/20 border',
        )}
        aria-hidden
      >
        {avatar ? (
          <img src={avatar} alt="" className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div>
        <p className="text-foreground/90 text-sm font-medium tracking-widest uppercase">{name}</p>
        <p className="text-muted-foreground text-sm tracking-wider uppercase">{title}</p>
      </div>
    </div>
  );
}

export function SlideSpeakerGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2', className)}>{children}</div>;
}

export function SlideSpeakerList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex flex-col gap-6', className)}>{children}</div>;
}
