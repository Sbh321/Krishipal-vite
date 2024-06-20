import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useParams } from "react-router-dom";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import Paginate from "../../components/Paginate";

import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const UserListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="mx-5 my-3">
      {loadingDelete && <Loader />}
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <CircularProgress size={64} style={{ color: "#718096" }} />
          <span className="text-gray-600">Loading ...</span>
        </div>
      ) : error ? (
        <Alert severity="error" className="mt-[10px]">
          {error.data.message}
        </Alert>
      ) : (
        <div className="sm:container p-6 mx-auto my-8">
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left text-green-700 text-sm sm:text-base">
                    ID
                  </th>
                  <th className="py-2 px-4 border-b text-left text-green-700 text-sm sm:text-base">
                    NAME
                  </th>
                  <th className="py-2 px-4 border-b text-left text-green-700 text-sm sm:text-base">
                    Price
                  </th>
                  <th className="py-2 px-4 border-b text-left text-green-700 text-sm sm:text-base">
                    Category
                  </th>
                  <th className="py-2 px-4 border-b text-left text-green-700 text-sm sm:text-base">
                    Brand
                  </th>
                  <th className="py-2 px-4 border-b text-left text-green-700 text-sm sm:text-base">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b text-sm sm:text-base">
                      {product._id}
                    </td>
                    <td className="py-2 px-4 border-b text-sm sm:text-base">
                      {product.name}
                    </td>
                    <td className="py-2 px-4 border-b text-sm sm:text-base">
                      Rs. {product.price}
                    </td>
                    <td className="py-2 px-4 border-b text-sm sm:text-base">
                      {product.category}
                    </td>
                    <td className="py-2 px-4 border-b text-sm sm:text-base">
                      {product.brand}
                    </td>
                    <td className="py-2 px-4 border-b text-sm sm:text-base flex items-center space-x-4">
                      <Link
                        to={`/admin/product/${product._id}/edit`}
                        className="text-green-700 text-lg hover:shadow-lg hover:text-green-900"
                      >
                        <FaEdit />
                      </Link>
                      <FaRegTrashAlt
                        className="text-green-700 text-lg cursor-pointer hover:shadow-lg hover:text-green-900"
                        onClick={() => deleteHandler(product._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Paginate pages={data?.pages} page={data?.page} isAdmin={true} />
    </div>
  );
};

export default UserListScreen;
