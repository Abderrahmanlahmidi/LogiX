import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "../components/Header";
import FleetTable from "../components/tables/fleetTable";
import FleetForm from "../components/forms/fleetForm";
import { vehicleApi } from "../../../services/apis/admin/fleetApi";
import { useSearch } from "../../../hooks/useSearch";
import { ConfirmPopup } from "../../../components/ui/confirmPopup/ConfirmPopup";


export default function Fleet() {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, vehicleId: null });
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["vehicles"],
    queryFn: vehicleApi.getVehicles,
  });

  const vehicles = useSearch(data?.data, search, {
    keys: ["brand", "model", "plateNumber", "status"],
  });

  const createMutation = useMutation({
    mutationFn: vehicleApi.createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicles"]);
      setIsOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => vehicleApi.updateVehicle(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicles"]);
      setSelectedVehicle(null);
      setIsOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: vehicleApi.deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicles"]);
      setDeleteConfirm({ show: false, vehicle: null });
    },
  });

  const handleSearch = (e) => setSearch(e.target.value);

  const handleCreateClick = () => {
    setSelectedVehicle(null);
    setIsOpen(true);
  };

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsOpen(true);
  };
  
  const handleDelete = (id) => {
    setDeleteConfirm({ show: true, vehicleId:id });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm.vehicleId) {
      deleteMutation.mutate(deleteConfirm.vehicleId);
    }
  };

  const handleSubmit = (formData) => {
    if (selectedVehicle) {
      updateMutation.mutate({
        id: selectedVehicle._id,
        data: formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="bg-bg min-h-screen">
      <Header
        title="Fleet Management"
        subtitle="Manage your truck fleet"
        showCreateButton
        showSearch
        onCreateClick={handleCreateClick}
        onSearchChange={handleSearch}
        searchPlaceholder="Search fleet..."
      />


        <FleetTable
          data={vehicles}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />


      <FleetForm
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedVehicle(null);
        }}
        onSubmit={handleSubmit}
        initialData={selectedVehicle}
        isLoading={createMutation.isLoading || updateMutation.isLoading}
      />

      <ConfirmPopup
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false, vehicle: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Vehicle"
        message={`Delete This cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}