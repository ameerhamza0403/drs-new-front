import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

let pagination = "";
let MyCustomPagination = (props) => {
  if (props.totalpages === 1) {
    pagination = "";
  } else if (props.totalpages === 2) {
    pagination = (
      <Pagination>
        {/* <PaginationItem>
          <PaginationLink
            previous
            tag="button"
            onClick={() => {
              props.page = props.page - 1;
              props.handlepagin();
            }}
          />
        </PaginationItem> */}
        <PaginationItem>
          <PaginationLink
            tag="button"
            onClick={() => {
              props.page = props.page;
              props.handlepagin();
            }}
          >
            {props.page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            tag="button"
            onClick={() => {
              props.page = props.page + 1;
              props.handlepagin();
            }}
          >
            {props.page+1}
          </PaginationLink>
        </PaginationItem>
        {/* <PaginationItem>
          <PaginationLink
            tag="button"
            onClick={() => {
              props.page = props.page + 1;
              props.handlepagin();
            }}
          >
            {props.page}
          </PaginationLink>
        </PaginationItem> */}
        {/* <PaginationItem>
          <PaginationLink
            tag="button"
            onClick={() => {
              props.page = props.page + 1;
              props.handlepagin();
            }}
          >
            {props.page + 1}
          </PaginationLink>
        </PaginationItem> */}
      </Pagination>
    );
  }

  return pagination;
};

export default MyCustomPagination;
