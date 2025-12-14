import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "../components/Header";
import TiresTable from "../components/tables/tiresTable";
import TiresForm from "../components/forms/tiresForm";
import { useSearch } from "../../../hooks/useSearch";
import { ConfirmPopup } from "../../../components/ui/confirmPopup/ConfirmPopup";
import { tiresApi } from "../../../services/apis/admin/tireApi";

export default function Tires() {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTire, setSelectedTire] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, tireId: null });
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["tires"],
    queryFn: tiresApi.getTires,
  });

  const tires = useSearch(data?.data, search, {
    keys: ["serialNumber", "wearLevel", "position"],
  });

  const createMutation = useMutation({
    mutationFn: tiresApi.createTire,
    onSuccess: () => {
      queryClient.invalidateQueries(["tires"]);
      setIsOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => tiresApi.updateTire(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["tires"]);
      setSelectedTire(null);
      setIsOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: tiresApi.deleteTire,
    onSuccess: () => {
      queryClient.invalidateQueries(["tires"]);
      setDeleteConfirm({ show: false, tireId: null });
    },
  });

  const handleSearch = (e) => setSearch(e.target.value);

  const handleCreateClick = () => {
    setSelectedTire(null);
    setIsOpen(true);
  };

  const handleEdit = (tire) => {
    setSelectedTire(tire);
    setIsOpen(true);
  };
  const handleCreate = () => {
    setIsOpen(true);
  };
  
  const handleDelete = (id) => {
    setDeleteConfirm({ show: true, tireId: id });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm.tireId) {
      deleteMutation.mutate(deleteConfirm.tireId);
    }
  };

  const handleSubmit = (formData) => {
    if (selectedTire) {
      updateMutation.mutate({
        id: selectedTire._id,
        data: formData,
      });
    } else {
      console.log(formData)
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="bg-bg min-h-screen">
      <Header
        title="Tires Management"
        subtitle="Track and manage tire inventory"
        showCreateButton
        showSearch
        onCreateClick={handleCreate}
        onSearchChange={handleSearch}
        searchPlaceholder="Search tires..."
      />


        <TiresTable
          data={tires}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />


      <TiresForm
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
         
        }}
        onSubmit={handleSubmit}
        isLoading={createMutation.isLoading}
      />

      <TiresForm
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedTire(null);
        }}
        onSubmit={handleSubmit}
        initialData={selectedTire}
        isLoading={updateMutation.isLoading}
      />

      <ConfirmPopup
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false, tireId: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Tire"
        message="Delete this tire? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}