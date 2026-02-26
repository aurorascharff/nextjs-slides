import { SlideLink } from 'nextjs-slides';
import { Counter } from '@/app/slides/_components/Counter';

export default function Demo1Page() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center gap-6 p-8">
      <div className="border-foreground/10 pointer-events-none absolute inset-4 border sm:inset-6" aria-hidden />
      <h1 className="text-foreground text-3xl font-extrabold tracking-tight">Demo Page</h1>
      <p className="text-muted-foreground max-w-md text-center text-lg">
        This is a regular page at /slides/demo1. It lives inside the slides layout but has its own UI — no deck chrome.
      </p>
      <div className="border-foreground/10 bg-foreground/3 w-full max-w-sm border p-6">
        <p className="text-muted-foreground mb-4 text-center text-sm font-medium tracking-wider uppercase">Counter</p>
        <Counter />
      </div>
      <SlideLink href="/slides/10">← Back to slides</SlideLink>
    </div>
  );
}
