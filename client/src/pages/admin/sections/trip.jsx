import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "../components/Header";
import TripForm from "../components/forms/TripForm";
import { tripApi } from "../../../services/apis/admin/tripApi";
import { useSearch } from "../../../hooks/useSearch";
import { ConfirmPopup } from "../../../components/ui/confirmPopup/ConfirmPopup";
import TripTable from "../components/tables/tripTable";

export default function Trip() {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, tripId: null });
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["trips"],
    queryFn: tripApi.getTrips,
  });

  const trips = useSearch(data?.data, search, {
    keys: ["driverId.firstName", "driverId.lastName", "truckId.plateNumber", "trailerId.plateNumber", "startLocation", "endLocation", "status"],
  });

  const createMutation = useMutation({
    mutationFn: tripApi.createTrip,
    onSuccess: () => {
      queryClient.invalidateQueries(["trips"]);
      setIsOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => tripApi.updateTrip(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["trips"]);
      setSelectedTrip(null);
      setIsOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: tripApi.deleteTrip,
    onSuccess: () => {
      queryClient.invalidateQueries(["trips"]);
      setDeleteConfirm({ show: false, tripId: null });
    },
  });

  const handleSearch = (e) => setSearch(e.target.value);

  const handleCreateClick = () => {
    setSelectedTrip(null);
    setIsOpen(true);
  };

  const handleEdit = (trip) => {
    setSelectedTrip(trip);
    setIsOpen(true);
  };
  
  const handleDelete = (id) => {
    setDeleteConfirm({ show: true, tripId: id });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm.tripId) {
      deleteMutation.mutate(deleteConfirm.tripId);
    }
  };

  const handleSubmit = (formData) => {
    if (selectedTrip) {
      updateMutation.mutate({
        id: selectedTrip._id,
        data: formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="bg-bg min-h-screen">
      <Header
        title="Trip Management"
        subtitle="Manage your trips"
        showCreateButton
        showSearch
        onCreateClick={handleCreateClick}
        onSearchChange={handleSearch}
        searchPlaceholder="Search trips..."
      />

        <TripTable
          data={trips}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />

      <TripForm
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedTrip(null);
        }}
        onSubmit={handleSubmit}
        initialData={selectedTrip}
        isLoading={createMutation.isLoading || updateMutation.isLoading}
      />

      <ConfirmPopup
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false, tripId: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Trip"
        message={`Delete this trip? This cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}