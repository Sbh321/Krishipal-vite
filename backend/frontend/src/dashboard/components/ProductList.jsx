import React from "react";
import MUIDataTable from "mui-datatables";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { useParams } from "react-router-dom";

const options = {
  filterType: "checkbox",
  selectableRows: "none",
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 20, 50],
};

const ProductList = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No users found.</div>;
  }

  const { products } = data;

  console.log(products);

  const columns = [
    "ID",
    "NAME",
    "PRICE",
    "CATEGORY",
    "BRAND",
    "STOCK",
    "ACTIONS",
  ];

  const transformedData = products.map((product) => [
    product._id,
    product.name,
    product.price,
    product.category,
    product.brand,
    product.countInStock,
  ]);

  return (
    <div>
      <div className="m-4">
        <MUIDataTable
          title={"Products List"}
          data={transformedData}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
};

export default ProductList;
