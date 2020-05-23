import React from "react";
import { DataTable } from "../common/DataTable";

const cols = [
  {
    name: "Type",
    field: "type",
  },
  {
    name: "Fact",
    field: "text",
  },
  {
    name: "Reported by",
    field: "id",
    formatter: ({ item }) => {
      if (item && item.user && item.user.name)
        return `${item.user.name.first} ${item.user.name.last}`;
      return "N/A";
    },
  },
];

export const Facts = ({ data }) => {
  if (!data || !data.all || !data.all.length)
    return <div className="welcome">Sorry, no results found</div>;
  return (
    <DataTable
      items={data.all}
      cols={cols}
      enablePaging={true}
      pagingParams={{ showPerPageSelector: true }}
    />
  );
};
