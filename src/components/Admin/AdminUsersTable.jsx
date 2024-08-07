"use client";

import { useEffect, useState } from "react";
import API from "@/api/api";

import Search from "@/components/Search";
import AdminUserTableRow from "./AdminUserTableRow";
import { Error, Success } from "@/components/Form";
import Table from "@/components/Table";
import CreateUserForm from "./CreateUserForm";
import { filter } from "lodash";

const AdminUsersTable = ({ users }) => {
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});

  useEffect(() => {
    setFilteredUsers(users);
    setLoading(false);
  }, []);

  const handleDelete = async (id) => {
    setError({});
    try {
      if (confirm("Are you sure you want to delete this user?")) {
        const response = await API.delete(`/admin/delete/${id}`, {
          headers: {
            Authorization: `Authorization: Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });
        const deletedUser = response.data.data;
        setSuccess({ message: response.data.message });
        setFilteredUsers((prev) => prev.filter((i) => i.email !== email));
      }
    } catch (error) {
      setError({ message: error.response.data.message });
      console.error(error);
    }
  };

  const handleActivation = async ({ activated, id }) => {
    setError({});
    try {
      if (activated === false) {
        await API.put(
          `/admin/activate/${id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Authorization: Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
          }
        );

        window.location.reload();
      }
      if (activated === true) {
        await API.put(
          `/admin/deactivate/${id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Authorization: Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
          }
        );

        window.location.reload();
      }
    } catch (error) {
      setError({ message: "There was an error updating this users status" });
    }
  };

  return (
    <>
      <Search
        data={users}
        filteredData={filteredUsers}
        setFilteredData={setFilteredUsers}
        filter={{ keys: ["firstName", "lastName"], tag: "role" }}
      />

      <div className="mt-8 space-y-6">
        {error?.message && <Error>{error?.message}</Error>}
        {success?.message && <Success>{success?.message}</Success>}
        <Table>
          <Table.Head>
            <tr>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
            </tr>
          </Table.Head>
          {loading ? (
            <Table.Body>
              <Table.Loading />
            </Table.Body>
          ) : (
            <Table.Body>
              {filteredUsers && filteredUsers.length > 0 ? (
                <>
                  {filteredUsers.map((user) => (
                    <AdminUserTableRow
                      error={error}
                      setError={setError}
                      selectedUsers={selectedUsers}
                      setSelectedUsers={setSelectedUsers}
                      handleActivation={handleActivation}
                      handleDelete={() => handleDelete(user.uid)}
                      {...user}
                      key={user.uid}
                    />
                  ))}
                </>
              ) : (
                <Table.Row>
                  <Table.Data colSpan="7" className="text-center py-20">
                    No users found
                  </Table.Data>
                </Table.Row>
              )}
            </Table.Body>
          )}
        </Table>
        <div className="absolute fixed bottom-8 right-8 z-50">
          <CreateUserForm />
        </div>
      </div>
    </>
  );
};

export default AdminUsersTable;
