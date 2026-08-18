import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <p className="font-mono text-6xl font-bold text-brand">404</p>
      <h1 className="text-2xl font-semibold">This page went off to another agent</h1>
      <p className="max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist — but your context is safe with us.
      </p>
      <ButtonLink href="/">Back to home</ButtonLink>
    </Container>
  );
}
