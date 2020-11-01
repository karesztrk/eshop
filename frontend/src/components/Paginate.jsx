import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((key) => (
          <LinkContainer
            key={key + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${key + 1}`
                  : `/page/${key + 1}`
                : `/admin/productlist/${key + 1}`
            }
          >
            <Pagination.Item active={key + 1 === page}>
              {key + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
