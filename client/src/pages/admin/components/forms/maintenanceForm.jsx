import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Wrench, 
  Truck, 
  Calendar, 
  DollarSign, 
  Navigation,
  FileText,
  Settings,
  CheckCircle,
  Clock,
  PlayCircle,
  Ban
} from 'lucide-react';
import Button from '../../../../components/ui/buttons/Button';
import { useQuery } from "@tanstack/react-query";
vehicleApi
import { vehicleApi } from '../../../../services/apis/admin/fleetApi';
import { maintenanceRulesApi } from '../../../../services/apis/admin/maintenanceRulesApi';

const MaintenanceForm = ({
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
  initialData = null,
  isLoading = false,
  title = 'Schedule Maintenance'
}) => {
  const isEditMode = !!initialData;

  const { data: vehiclesData, isLoading: isLoadingVehicles } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => vehicleApi.getVehicles(),
  });

  const { data: rulesData, isLoading: isLoadingRules } = useQuery({
    queryKey: ["maintenance-rules"],
    queryFn: () => maintenanceRulesApi.getMaintenanceRules(),
  });

  const vehicles = vehiclesData?.data || [];
  const rules = rulesData?.data || [];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();

  const watchRuleId = watch('maintenanceRuleId');
  const watchVehicleId = watch('vehicleId');
  const watchStatus = watch('status');

  useEffect(() => {
    if (isOpen && initialData) {
      reset({
        maintenanceRuleId: initialData.maintenanceRuleId?._id || initialData.maintenanceRuleId || '',
        vehicleId: initialData.vehicleId?._id || initialData.vehicleId || '',
        targetType: initialData.targetType || 'km_based',
        component: initialData.component || '',
        status: initialData.status || 'pending',
        description: initialData.description || '',
        cost: initialData.cost || '',
        date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        kmAtMaintenance: initialData.kmAtMaintenance || ''
      });
    } else if (isOpen) {
      reset({
        maintenanceRuleId: '',
        vehicleId: '',
        targetType: 'km_based',
        component: '',
        status: 'pending',
        description: '',
        cost: '',
        date: new Date().toISOString().split('T')[0],
        kmAtMaintenance: ''
      });
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'in_progress':
        return <PlayCircle className="h-4 w-4 text-blue-400" />;
      case 'done':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'canceled':
        return <Ban className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-400" />;
    }
  };

  const selectedRule = rules.find(rule => rule._id === watchRuleId);
  const selectedVehicle = vehicles.find(vehicle => vehicle._id === watchVehicleId);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />
          
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.2, delay: 0.1 }}
              className="w-full max-w-lg bg-bg border border-secondary rounded-lg shadow-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-secondary sticky top-0 bg-bg z-10">
                <h2 className="text-lg font-normal text-text-light">
                  {isEditMode ? 'Edit Maintenance' : title}
                </h2>
                <button
                  onClick={handleClose}
                  className="p-1 text-text hover:text-text-light hover:bg-bg-dark rounded transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">
                <div className="space-y-4">
                  {/* Maintenance Rule */}
                  <div>
                    <label className="block text-sm text-text mb-1 flex items-center">
                      <Settings className="h-4 w-4 mr-1" />
                      Maintenance Rule *
                    </label>
                    <select
                      {...register('maintenanceRuleId', {
                        required: 'Maintenance rule is required'
                      })}
                      className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                      disabled={isLoadingRules}
                    >
                      <option value="">Select a maintenance rule...</option>
                      {rules.map(rule => (
                        <option key={rule._id} value={rule._id}>
                          {rule.type.charAt(0).toUpperCase() + rule.type.slice(1)} - 
                          Every {rule.recommendedKm.toLocaleString()} km / {rule.recommendedMonths} months
                        </option>
                      ))}
                    </select>
                    {isLoadingRules && (
                      <p className="mt-1 text-xs text-text">Loading rules...</p>
                    )}
                    {errors.maintenanceRuleId && (
                      <p className="mt-1 text-xs text-error">
                        {errors.maintenanceRuleId.message}
                      </p>
                    )}
                    
                    {/* Show selected rule details */}
                    {selectedRule && (
                      <div className="mt-2 p-2 bg-bg-dark/30 border border-secondary/50 rounded text-xs">
                        <p className="text-text-light">{selectedRule.description}</p>
                        <div className="flex gap-4 mt-1 text-text/60">
                          <span>Interval: {selectedRule.recommendedKm.toLocaleString()} km</span>
                          <span>Time: {selectedRule.recommendedMonths} months</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Vehicle */}
                  <div>
                    <label className="block text-sm text-text mb-1 flex items-center">
                      <Truck className="h-4 w-4 mr-1" />
                      Vehicle *
                    </label>
                    <select
                      {...register('vehicleId', {
                        required: 'Vehicle is required'
                      })}
                      className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                      disabled={isLoadingVehicles}
                    >
                      <option value="">Select a vehicle...</option>
                      {vehicles.map(vehicle => (
                        <option key={vehicle._id} value={vehicle._id}>
                          {vehicle.plateNumber} - {vehicle.brand} {vehicle.model}
                          {vehicle.status !== 'active' ? ` (${vehicle.status})` : ''}
                        </option>
                      ))}
                    </select>
                    {isLoadingVehicles && (
                      <p className="mt-1 text-xs text-text">Loading vehicles...</p>
                    )}
                    {errors.vehicleId && (
                      <p className="mt-1 text-xs text-error">
                        {errors.vehicleId.message}
                      </p>
                    )}
                    
                    {/* Show selected vehicle details */}
                    {selectedVehicle && (
                      <div className="mt-2 p-2 bg-bg-dark/30 border border-secondary/50 rounded text-xs">
                        <div className="flex justify-between">
                          <span className="text-text-light">Current KM: {selectedVehicle.currentKm.toLocaleString()}</span>
                          <span className={`px-2 py-0.5 rounded text-xs ${selectedVehicle.status === 'active' ? 'bg-green-900/20 text-green-400' : 'bg-yellow-900/20 text-yellow-400'}`}>
                            {selectedVehicle.status}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Target Type */}
                    <div>
                      <label className="block text-sm text-text mb-1">
                        Trigger Type *
                      </label>
                      <select
                        {...register('targetType', {
                          required: 'Trigger type is required'
                        })}
                        className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                      >
                        <option value="km_based">Kilometer Based</option>
                        <option value="time_based">Time Based</option>
                        <option value="manual">Manual</option>
                      </select>
                      {errors.targetType && (
                        <p className="mt-1 text-xs text-error">
                          {errors.targetType.message}
                        </p>
                      )}
                    </div>

                    {/* Component */}
                    <div>
                      <label className="block text-sm text-text mb-1 flex items-center">
                        <Wrench className="h-4 w-4 mr-1" />
                        Component *
                      </label>
                      <input
                        type="text"
                        {...register('component', {
                          required: 'Component is required'
                        })}
                        placeholder="e.g., Engine Oil, Brake Pads, Air Filter"
                        className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent placeholder-text/50"
                      />
                      {errors.component && (
                        <p className="mt-1 text-xs text-error">
                          {errors.component.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Status */}
                    <div>
                      <label className="block text-sm text-text mb-1">
                        Status *
                      </label>
                      <select
                        {...register('status', {
                          required: 'Status is required'
                        })}
                        className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                      </select>
                      {watchStatus && (
                        <div className="mt-1 flex items-center gap-1 text-xs">
                          {getStatusIcon(watchStatus)}
                          <span className={`${
                            watchStatus === 'pending' ? 'text-yellow-400' :
                            watchStatus === 'in_progress' ? 'text-blue-400' :
                            watchStatus === 'done' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {watchStatus === 'in_progress' ? 'In Progress' : 
                             watchStatus === 'done' ? 'Completed' : 
                             watchStatus.charAt(0).toUpperCase() + watchStatus.slice(1)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Maintenance Date */}
                    <div>
                      <label className="block text-sm text-text mb-1 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Date *
                      </label>
                      <input
                        type="date"
                        {...register('date', {
                          required: 'Date is required'
                        })}
                        className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                      />
                      {errors.date && (
                        <p className="mt-1 text-xs text-error">
                          {errors.date.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* KM at Maintenance */}
                    <div>
                      <label className="block text-sm text-text mb-1 flex items-center">
                        <Navigation className="h-4 w-4 mr-1" />
                        KM at Maintenance
                      </label>
                      <input
                        type="number"
                        {...register('kmAtMaintenance', {
                          min: { value: 0, message: 'Must be positive number' }
                        })}
                        placeholder="e.g., 125430, 200000"
                        className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent placeholder-text/50"
                      />
                      {errors.kmAtMaintenance && (
                        <p className="mt-1 text-xs text-error">
                          {errors.kmAtMaintenance.message}
                        </p>
                      )}
                    </div>

                    {/* Cost */}
                    <div>
                      <label className="block text-sm text-text mb-1 flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        Cost (Optional)
                      </label>
                      <input
                        type="number"
                        {...register('cost', {
                          min: { value: 0, message: 'Cost must be positive' }
                        })}
                        placeholder="e.g., 250, 500, 1000"
                        step="0.01"
                        className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent placeholder-text/50"
                      />
                      {errors.cost && (
                        <p className="mt-1 text-xs text-error">
                          {errors.cost.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm text-text mb-1 flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      Description
                    </label>
                    <textarea
                      {...register('description')}
                      rows="3"
                      placeholder="Notes, observations, special instructions..."
                      className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent placeholder-text/50 resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-6 pt-4 border-t border-secondary">
                  <Button
                    type="button"
                    variant="outline"
                    fullWidth
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="accent"
                    fullWidth
                    loading={isLoading}
                  >
                    {isEditMode ? 'Update Maintenance' : 'Schedule Maintenance'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MaintenanceForm;