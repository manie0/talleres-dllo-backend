import { BookModel } from "./book.model";
import { buildPagination } from "../utils/pagination";
import { buildBookFilters } from "../utils/filters";

async function readBooksAction(query: any) {
  const filters = buildBookFilters(query);
  const { page, perPage, skip } = buildPagination(query);
  const total = await BookModel.countDocuments(filters);
  const items = await BookModel.find(filters)
    .select("title")
    .skip(skip)
    .limit(perPage);
  return {
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
    books: items,
  };
}

export default readBooksAction;
