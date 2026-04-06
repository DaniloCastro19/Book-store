import { Pagination } from "react-bootstrap";

type PaginationBarProps = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

export default function PaginationBar({
  page,
  totalPages,
  setPage,
}: PaginationBarProps) {
  const visiblePages = 10;
  if (totalPages <= 1) return null;

  const half = Math.floor(visiblePages / 2);

  let start = Math.max(0, page - half);
  let end = start + visiblePages;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(0, end - visiblePages);
  }
  const pages = Array.from({ length: end - start }, (_, i) => start + i);
  return (
    <Pagination className="justify-content-center mt-4">
      <Pagination.Prev
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
      />
      {start > 0 && (
        <>
          <Pagination.Item onClick={() => setPage(0)}>1</Pagination.Item>
          {start > 1 && <Pagination.Ellipsis disabled />}
        </>
      )}
      {pages.map((p) => (
        <Pagination.Item 
          key={p} 
          active={p === page} 
          onClick={() => setPage(p)}
          >
          {p + 1}
        </Pagination.Item>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <Pagination.Ellipsis disabled />}

        </>
      )}
      <Pagination.Next
        onClick={() => setPage(page + 1)}
        disabled={page >= totalPages - 1}
      />
    </Pagination>
  );
}
