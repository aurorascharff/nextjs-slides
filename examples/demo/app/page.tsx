import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-foreground text-3xl font-bold">nextjs-slides demo</h1>
      <p className="text-muted-foreground max-w-md text-center">
        A minimal demo of the nextjs-slides library. Click below to start the slide deck.
      </p>
      <Link
        href="/slides"
        className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-md px-8 py-3 font-medium transition-colors"
      >
        Open slides →
      </Link>
    </div>
  );
}
