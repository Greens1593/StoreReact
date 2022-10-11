import React, { useContext } from "react";
import { Context } from "../index";
import { Pagination } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const Pages = observer(() => {
  const { device } = useContext(Context);
  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = [];

  for (let i = 1; i < pageCount; i++) {
    pages.push(i);
  }

  return (
    <Pagination size="lg" className="mt-5">
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={device.page === page}
          onClick={() => device.setPage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Pages;
