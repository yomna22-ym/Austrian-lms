export function parseSearchParams(
  url: string,
): Record<string, string | undefined> {
  const { searchParams } = new URL(url);
  const result: Record<string, string | undefined> = {};
  searchParams.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

export function parseNumericParam(
  value: string | undefined,
): number | undefined {
  if (value === undefined || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}
