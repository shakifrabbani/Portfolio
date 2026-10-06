import { Button, ButtonArrow } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center px-4 pt-24 text-center">
      <div>
        <p className="text-gradient font-display text-8xl font-extrabold tracking-tight sm:text-9xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-fg sm:text-3xl">This page doesn&apos;t exist</h1>
        <p className="mx-auto mt-3 max-w-md text-fg-2">The link may be broken, or the page may have moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">
            Back to home <ButtonArrow />
          </Button>
          <Button href="/projects/" variant="secondary">
            View projects
          </Button>
        </div>
      </div>
    </section>
  );
}
