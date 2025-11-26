export function buildPagination(query: any) {
  const page = Math.max(1, parseInt(query.page || "1", 10));
  const perPage = Math.max(1, parseInt(query.limit || "10", 10));
  const skip = (page - 1) * perPage;
  return { page, perPage, skip };
}
