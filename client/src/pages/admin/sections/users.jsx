import React, { useState } from "react";
import Header from "../../../pages/admin/components/Header";
import { useSearch } from "../../../hooks/useSearch";
import { getUsers } from "../../../services/apis/user";
import { useQuery } from "@tanstack/react-query";
import UsersTable from "../components/tables/usersTable";



export default function Users() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const users = useSearch(data?.data, search, {
    keys: ["firstName", "lastName", "email"],
  });

  const handleSearch = (e) => setSearch(e.target.value);

  return (
    <div className="bg-bg min-h-screen">
      <Header
        title="Users"
        subtitle="System users"
        showSearch
        onSearchChange={handleSearch}
        searchPlaceholder="Search users..."
      />

      <UsersTable
        data={users}
        isLoading={isLoading}
      />
    </div>
  );
}