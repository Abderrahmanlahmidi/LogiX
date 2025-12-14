import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { 
  Wrench, Droplets, Filter, Circle, AlertTriangle, 
  Edit2, Trash2, Plus, CheckCircle, XCircle, 
  Calendar, TrendingUp, FileText
} from 'lucide-react';
import { maintenanceRulesApi } from "../../../services/apis/admin/maintenanceRulesApi";
import MaintenanceRuleForm from "../components/forms/maintenanceRulesForm";
import { ConfirmPopup } from "../../../components/ui/confirmPopup/ConfirmPopup";
import Button from "../../../components/ui/buttons/Button";

const MaintenanceRule = () => {
  const queryClient = useQueryClient();
  const role = useSelector(state => state.auth.user.role);
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, ruleId: null });

  const isAdmin = role  === "Admin";

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["maintenance-rules"],
    queryFn: maintenanceRulesApi.getMaintenanceRules,
  });

  // Show all rules (not filtered by active)
  const rules = data?.data || [];

  const createMutation = useMutation({
    mutationFn: maintenanceRulesApi.createMaintenanceRule,
    onSuccess: () => {
      queryClient.invalidateQueries(["maintenance-rules"]);
      setIsCreateOpen(false);
      refetch(); // Refresh data to show new rule
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => maintenanceRulesApi.updateMaintenanceRule(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["maintenance-rules"]);
      setSelectedRule(null);
      setIsUpdateOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: maintenanceRulesApi.deleteMaintenanceRule,
    onSuccess: () => {
      queryClient.invalidateQueries(["maintenance-rules"]);
      setDeleteConfirm({ show: false, ruleId: null });
    },
  });

  const handleCreateClick = () => {
    setIsCreateOpen(true);
  };

  const handleEdit = (rule) => {
    setSelectedRule(rule);
    setIsUpdateOpen(true);
  };
  
  const handleDelete = (id) => {
    setDeleteConfirm({ show: true, ruleId: id });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm.ruleId) {
      deleteMutation.mutate(deleteConfirm.ruleId);
    }
  };

  const handleCreateSubmit = (formData) => {
    createMutation.mutate(formData);
  };

  const handleUpdateSubmit = (formData) => {
    if (selectedRule) {
      updateMutation.mutate({
        id: selectedRule._id,
        data: formData,
      });
    }
  };

  // Helper functions
  const getTypeIcon = (type) => {
    switch (type) {
      case 'oil': return Droplets;
      case 'filter': return Filter;
      case 'tire': return Circle;
      case 'brake': return AlertTriangle;
      default: return Wrench;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'oil': return 'Oil Change';
      case 'filter': return 'Filter Replacement';
      case 'tire': return 'Tire Maintenance';
      case 'brake': return 'Brake Service';
      default: return type;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-light">Loading maintenance rules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-text-light">Maintenance Rules</h1>
              <p className="text-text mt-2">Maintenance schedules for fleet management</p>
            </div>
            
            {isAdmin && (
              <Button
                variant="accent"
                icon={Plus}
                onClick={handleCreateClick}
                className="whitespace-nowrap"
              >
                Add New Rule
              </Button>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className=" border border-secondary rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text">Total Rules</p>
                  <p className="text-3xl font-bold text-text-light mt-1">
                    {rules.length || 0}
                  </p>
                </div>
                <Wrench className="h-12 w-12 text-accent/60" />
              </div>
            </div>
            
            <div className=" border border-secondary rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text">Active Rules</p>
                  <p className="text-3xl font-bold text-success mt-1">
                    {rules.filter(r => r.isActive).length || 0}
                  </p>
                </div>
                <CheckCircle className="h-12 w-12 text-success/60" />
              </div>
            </div>
          </div>
        </div>

        {/* Rules Grid */}
        {rules.length === 0 ? (
          <div className="text-center py-16 bg-bg-dark border border-secondary rounded-lg">
            <Wrench className="h-16 w-16 text-text/40 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-text-light mb-2">No Maintenance Rules</h3>
            <p className="text-text mb-6">Create maintenance rules to get started</p>
            {isAdmin && (
              <Button
                variant="accent"
                icon={Plus}
                onClick={handleCreateClick}
              >
                Create First Rule
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rules.map((rule) => {
              const TypeIcon = getTypeIcon(rule.type);
              
              return (
                <div 
                  key={rule._id} 
                  className={`bg-bg-dark border rounded-lg overflow-hidden transition-all hover:shadow-lg ${
                    rule.isActive ? 'border-secondary' : 'border-error'
                  }`}
                >
                  {/* Card Header */}
                  <div className="p-4 border-b border-secondary bg-bg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <TypeIcon className="h-5 w-5 text-accent" />
                        <div>
                          <h3 className="font-medium text-text-light">
                            {getTypeLabel(rule.type)}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              rule.isActive 
                                ? 'bg-success/10 text-success' 
                                : 'bg-error/10 text-error'
                            }`}>
                              {rule.isActive ? (
                                <>
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Active
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Inactive
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Admin Actions */}
                      {isAdmin && (
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={Edit2}
                            onClick={() => handleEdit(rule)}
                            className="text-text hover:text-accent"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={Trash2}
                            onClick={() => handleDelete(rule._id)}
                            className="text-text hover:text-error"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 bg-bg">
                    {/* Interval */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-sm text-text mb-2">
                        <TrendingUp className="h-4 w-4" />
                        <span>Maintenance Interval</span>
                      </div>
                      <div className="bg-bg border border-secondary rounded p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-text-light font-medium">
                              Every {rule.recommendedKm?.toLocaleString() || '—'} km
                              {rule.recommendedMonths && ` or ${rule.recommendedMonths} months`}
                            </div>
                          </div>
                          <Calendar className="h-4 w-4 text-text/60" />
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    {rule.description && (
                      <div>
                        <div className="flex items-center gap-2 text-sm text-text mb-2">
                          <FileText className="h-4 w-4" />
                          <span>Description</span>
                        </div>
                        <p className="text-sm text-text-light bg-bg border border-secondary rounded p-3">
                          {rule.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-8 text-center text-sm text-text">
          <p>
            Showing {rules.length} maintenance rules
          </p>
        </div>
      </div>

      {/* Create Form Modal */}
      <MaintenanceRuleForm
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateSubmit}
        title="Add New Maintenance Rule"
        isLoading={createMutation.isLoading}
      />

      {/* Update Form Modal */}
      <MaintenanceRuleForm
        isOpen={isUpdateOpen}
        onClose={() => {
          setIsUpdateOpen(false);
          setSelectedRule(null);
        }}
        onSubmit={handleUpdateSubmit}
        initialData={selectedRule}
        title="Edit Maintenance Rule"
        isLoading={updateMutation.isLoading}
      />

      {/* Delete Confirmation */}
      <ConfirmPopup
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false, ruleId: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Maintenance Rule"
        message="Are you sure you want to delete this maintenance rule? This action cannot be undone."
        confirmText="Delete Rule"
        cancelText="Cancel"
        type="danger"
        isLoading={deleteMutation.isLoading}
      />
    </div>
  );
};

export default MaintenanceRule;