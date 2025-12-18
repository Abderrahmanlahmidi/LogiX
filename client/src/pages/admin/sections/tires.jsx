import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "../components/Header";
import TiresTable from "../components/tables/tiresTable";
import TiresForm from "../components/forms/tiresForm";
import { useSearch } from "../../../hooks/useSearch";
import { ConfirmPopup } from "../../../components/ui/confirmPopup/ConfirmPopup";
import { tiresApi } from "../../../services/apis/admin/tireApi";
import { useToast } from "../../../components/ui/toast/Toast";

export default function Tires() {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTire, setSelectedTire] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    tireId: null,
  });
  const [search, setSearch] = useState("");
  const toast = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ["tires"],
    queryFn: tiresApi.getTires,
    onError: (error) => {
      toast.error(`Failed to load tires: ${error.message}`);
    },
  });

  const tires = useSearch(data?.data, search, {
    keys: ["serialNumber", "wearLevel", "position"],
  });

  const createMutation = useMutation({
    mutationFn: tiresApi.createTire,
    onSuccess: (response) => {
      queryClient.invalidateQueries(["tires"]);
      setIsOpen(false);
      toast.success("Tire created successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create tire";
      toast.error(errorMessage);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => tiresApi.updateTire(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries(["tires"]);
      setSelectedTire(null);
      setIsOpen(false);
      toast.success("Tire updated successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update tire";
      toast.error(errorMessage);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: tiresApi.deleteTire,
    onSuccess: (response) => {
      queryClient.invalidateQueries(["tires"]);
      setDeleteConfirm({ show: false, tireId: null });
      toast.success("Tire deleted successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete tire";
      toast.error(errorMessage);
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
      deleteMutation.mutate(deleteConfirm.tripId);
    }
  };

  const handleSubmit = (formData) => {
    if (selectedTire) {
      updateMutation.mutate({
        id: selectedTire._id,
        data: formData,
      });
    } else {
      console.log(formData);
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
