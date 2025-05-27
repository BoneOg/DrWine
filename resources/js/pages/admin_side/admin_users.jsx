import { usePage, router } from "@inertiajs/react";
import { useState, useMemo } from "react";
import AdminSidebar from "./admin_sidebar";

export default function AdminUsers() {
  const { users = [], flash = {} } = usePage().props;

  const [modal, setModal] = useState({
    isOpen: false,
    userID: null,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ field: null, order: "asc" });

  // Sort + Filter users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((user) =>
        (user.username || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (user.email || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sort.field) {
      filtered = [...filtered].sort((a, b) => {
        let aVal, bVal;
        switch (sort.field) {
          case "username":
            aVal = a.username?.toLowerCase() || "";
            bVal = b.username?.toLowerCase() || "";
            break;
          case "email":
            aVal = a.email?.toLowerCase() || "";
            bVal = b.email?.toLowerCase() || "";
            break;
          case "role":
            aVal = a.role?.toLowerCase() || "";
            bVal = b.role?.toLowerCase() || "";
            break;
          case "date":
            aVal = a.created_at ? new Date(a.created_at).getTime() : 0;
            bVal = b.created_at ? new Date(b.created_at).getTime() : 0;
            break;
          default:
            aVal = "";
            bVal = "";
        }
        if (aVal < bVal) return sort.order === "asc" ? -1 : 1;
        if (aVal > bVal) return sort.order === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [users, searchTerm, sort]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setSort({ field: null, order: "asc" });
      return;
    }
    const [field, order] = value.split("-");
    setSort({ field, order });
  };

  const openModal = (userID) => {
    setModal({ isOpen: true, userID });
  };

  const closeModal = () => {
    setModal({ isOpen: false, userID: null });
  };

  const confirmDelete = () => {
    router.delete(`/admin/users/${modal.userID}`);
    closeModal();
  };

    return (
        <AdminLayout>
            <Head title="Admin Users" />
            <div className="container-fluid mt-4">
                {/* ... other parts ... */}

                {/* Search and Sort Form - Adjust options if needed */}
                <form onSubmit={handleFilterChange} className="mb-4 bg-light p-3 rounded shadow-sm">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-4">
                            <label htmlFor="search" className="form-label visually-hidden">Search</label>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="form-control"
                                placeholder="Search by name, username or email..." // Update placeholder
                                value={data.search}
                                onChange={(e) => setData('search', e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="sort_by" className="form-label visually-hidden">Sort By</label>
                            <select
                                name="sort_by"
                                id="sort_by"
                                className="form-select"
                                value={data.sort_by}
                                onChange={(e) => setData('sort_by', e.target.value)}
                            >
                                <option value="username">Username (Alphabetical)</option> {/* **CHANGE TO USERNAME** */}
                                <option value="name">Name (Alphabetical)</option>       {/* New option */}
                                <option value="created_at">Date Added</option>
                                <option value="role">Role</option>
                            </select>
                        </div>
                        {/* ... rest of the form ... */}
                    </div>
                </form>

                {/* Table display */}
                <div className="table-responsive">
                    <table className="table table-hover table-striped table-bordered align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Username</th> {/* **CHANGE HEADER** */}
                                <th>Name</th>    {/* **ADD HEADER FOR NEW NAME FIELD** */}
                                <th>Email</th>
                                <th>Role</th>
                                <th>Date Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td> {/* **DISPLAY USERNAME** */}
                                    <td>{user.name || 'N/A'}</td> {/* **DISPLAY NEW NAME FIELD** */}
                                    <td>{user.email}</td>
                                    <td>{user.role || 'user'}</td>
                                    <td>{new Date(user.created_at).toLocaleString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(user.id, user.username)} // Use username for confirm
                                            className="btn btn-danger btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* ... pagination ... */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatusCard({ color, label, count }) {
  const colorMap = {
    yellow: "bg-yellow-50 text-yellow-800",
    green: "bg-green-50 text-green-800",
    red: "bg-red-50 text-red-800",
    blue: "bg-blue-50 text-blue-800",
  };

  return (
    <div
      className={`rounded-xl p-6 shadow-sm ${colorMap[color]} border border-gray-100`}
    >
      <h3 className="text-sm font-medium mb-2 tracking-wide">{label}</h3>
      <p className="text-3xl font-semibold">{count || 0}</p>
    </div>
  );
}
