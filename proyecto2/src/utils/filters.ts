export function buildBookFilters(query: any) {
  const filters: any = { disabled: false };
  if (query.genre) filters.genre = query.genre;
  if (query.author) filters.author = query.author;
  if (query.publisher) filters.publisher = query.publisher;
  if (query.title) filters.title = { $regex: query.title, $options: "i" };
  if (query.available) filters.available = query.available === "true";
  if (query.publishedBefore)
    filters.publishedDate = { $lte: new Date(query.publishedBefore) };
  if (query.publishedAfter) {
    filters.publishedDate = filters.publishedDate || {};
    filters.publishedDate.$gte = new Date(query.publishedAfter);
  }
  return filters;
}
