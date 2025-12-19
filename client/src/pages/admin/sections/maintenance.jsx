import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "../components/Header";
import MaintenanceForm from "../components/forms/MaintenanceForm";
import { maintenanceApi } from "../../../services/apis/admin/maintenanceApi";
import { useSearch } from "../../../hooks/useSearch";
import { ConfirmPopup } from "../../../components/ui/confirmPopup/ConfirmPopup";
import MaintenanceTable from "../components/tables/MaintenanceTable";
import MaintenanceStats from "../components/MaintenanceStats";
import { useToast } from "../../../components/ui/toast/Toast";

export default function Maintenance() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ 
    show: false, 
    maintenanceId: null 
  });
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["maintenance"],
    queryFn: () => maintenanceApi.getMaintenance(),
    onError: (error) => {
      toast.error(`Failed to load maintenance records: ${error.message}`);
    },
  });

  const maintenanceRecords = useSearch(data?.data, search, {
    keys: ["vehicleId.plateNumber", "vehicleId.brand", "component", "status", "description"],
  });

  const createMutation = useMutation({
    mutationFn: maintenanceApi.createMaintenance,
    onSuccess: () => {
      queryClient.invalidateQueries(["maintenance"]);
      setIsOpen(false);
      toast.success("Maintenance record created successfully!");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || "Failed to create maintenance record";
      toast.error(errorMessage);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => maintenanceApi.updateMaintenance(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["maintenance"]);
      setSelectedMaintenance(null);
      setIsOpen(false);
      toast.success("Maintenance record updated successfully!");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || "Failed to update maintenance record";
      toast.error(errorMessage);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: maintenanceApi.deleteMaintenance,
    onSuccess: () => {
      queryClient.invalidateQueries(["maintenance"]);
      setDeleteConfirm({ show: false, maintenanceId: null });
      toast.success("Maintenance record deleted successfully!");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || "Failed to delete maintenance record";
      toast.error(errorMessage);
    },
  });

  const handleSearch = (e) => setSearch(e.target.value);

  const handleCreateClick = () => {
    setSelectedMaintenance(null);
    setIsOpen(true);
  };

  const handleEdit = (maintenance) => {
    setSelectedMaintenance(maintenance);
    setIsOpen(true);
  };
  
  const handleDelete = (id) => {
    setDeleteConfirm({ show: true, maintenanceId: id });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm.maintenanceId) {
      deleteMutation.mutate(deleteConfirm.maintenanceId);
    }
  };

  const handleSubmit = (formData) => {
    if (selectedMaintenance) {
      console.log("selected maintenance:", selectedMaintenance);
      
      updateMutation.mutate({
        id: selectedMaintenance._id,
        data: formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="bg-bg min-h-screen">
      <Header
        title="Maintenance Management"
        subtitle="Schedule and track vehicle maintenance"
        showCreateButton
        showSearch
        onCreateClick={handleCreateClick}
        onSearchChange={handleSearch}
        searchPlaceholder="Search maintenance records..."
      />

      <MaintenanceStats maintenanceRecords={data?.data || []} />

      <div className="px-6">
        <MaintenanceTable
          data={maintenanceRecords}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>

      <MaintenanceForm
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedMaintenance(null);
        }}
        onSubmit={handleSubmit}
        initialData={selectedMaintenance}
        isLoading={createMutation.isLoading || updateMutation.isLoading}
      />

      <ConfirmPopup
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false, maintenanceId: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Maintenance Record"
        message="Are you sure you want to delete this maintenance record? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}