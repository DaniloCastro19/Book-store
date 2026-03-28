import { Pagination } from "react-bootstrap";

type PaginationBarProps = {
  page: number;
  setPage: (value: number) => void;
};

export default function PaginationBar({ page, setPage }: PaginationBarProps) {
  return (
    <Pagination className="justify-content-center mt-4">
      <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 0} />
      <Pagination.Item active>{page + 1}</Pagination.Item>
      <Pagination.Next onClick={() => setPage(page + 1)} />
    </Pagination>
  );
}
