// import Message from "../../components/Message";
// import Loader from "../../components/Loader";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";

import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const UserListScreen = () => {
  const { data: users, refetch, error, isLoading } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        toast.success("User deleted successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
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
                    Email
                  </th>
                  <th className="py-2 px-4 border-b text-left text-green-700 text-sm sm:text-base">
                    ADMIN
                  </th>
                  <th className="py-2 px-4 border-b text-left text-green-700 text-sm sm:text-base">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b text-sm sm:text-base">
                      {user._id}
                    </td>
                    <td className="py-2 px-4 border-b text-sm sm:text-base">
                      {user.name}
                    </td>
                    <td className="py-2 px-4 border-b text-sm sm:text-base">
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td className="py-2 px-4 border-b text-sm sm:text-base">
                      {user.isAdmin ? <p>Y</p> : <p>N</p>}
                    </td>
                    <td className="py-2 px-4 border-b text-sm sm:text-base flex items-center space-x-4">
                      <Link
                        to={`/admin/user/${user._id}/edit`}
                        className="text-green-700 text-lg"
                      >
                        <FaEdit />
                      </Link>
                      <FaRegTrashAlt className="text-green-700 text-lg cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListScreen;
