interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-16">
      <p className="text-text-secondary">Event detail coming soon</p>
      <h1 className="mt-2 text-3xl font-bold text-text-primary">Event {id}</h1>
    </section>
  );
}
