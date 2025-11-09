import { MorphingText } from "./morphing-text";

export default function Page() {
  return (
    <main className="min-h-[calc(100svh-0px)] grid place-items-center px-6">
      <section className="w-full max-w-4xl text-center">
        <h1 className="sr-only">Morphing Text Demo</h1>
        <MorphingText
          className="text-foreground"
          texts={["Design", "Build", "Launch", "Iterate"]}
        />
        <p className="mt-6 text-balance text-muted-foreground">
          A subtle morphing text effect using blur and opacity transitions.
        </p>
      </section>
    </main>
  );
}
