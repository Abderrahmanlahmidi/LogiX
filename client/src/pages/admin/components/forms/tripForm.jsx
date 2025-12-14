import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Fuel, MessageSquare } from 'lucide-react';
import Button from '../../../../components/ui/buttons/Button';
import { useQuery } from "@tanstack/react-query";
import { vehicleApi } from '../../../../services/apis/admin/fleetApi';
import { getUsers } from '../../../../services/apis/user';

const TripForm = ({
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
  initialData = null,
  isLoading = false,
  title = 'Add New Trip'
}) => {
  const isEditMode = !!initialData;

  const { data: usersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    enabled: isOpen,
  });

  const { data: vehiclesData, isLoading: isLoadingVehicles } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => vehicleApi.getVehicles(),
    enabled: isOpen,
  });


  const drivers = useMemo(() => {
    if (!usersData?.data) return [];
    return usersData.data.filter(user => user.roleId?.name === "Driver");
  }, [usersData]);

  const trucks = useMemo(() => {
    if (!vehiclesData?.data) return [];
    return vehiclesData.data.filter(vehicle => vehicle.type === "truck");
  }, [vehiclesData]);

  const trailers = useMemo(() => {
    if (!vehiclesData?.data) return [];
    return vehiclesData.data.filter(vehicle => vehicle.type === "trailer");
  }, [vehiclesData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const watchStartDate = watch('startDate');
  const watchStatus = watch('status');

  useEffect(() => {
    if (isOpen && initialData) {

      const formatDateForInput = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().slice(0, 16);
      };

      reset({
        driverId: initialData.driverId?._id || initialData.driverId || '',
        truckId: initialData.truckId?._id || initialData.truckId || '',
        trailerId: initialData.trailerId?._id || initialData.trailerId || '',
        startLocation: initialData.startLocation || '',
        endLocation: initialData.endLocation || '',
        startDate: formatDateForInput(initialData.startDate),
        endDate: formatDateForInput(initialData.endDate),
        status: initialData.status || 'pending',
        fuelLiters: initialData.fuelLiters || '',
        remarks: initialData.remarks || ''
      });
    } else if (isOpen) {
      reset({
        driverId: '',
        truckId: '',
        trailerId: '',
        startLocation: '',
        endLocation: '',
        startDate: '',
        endDate: '',
        status: 'pending',
        fuelLiters: '',
        remarks: ''
      });
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = (data) => {
    const formattedData = {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      fuelLiters: data.fuelLiters ? Number(data.fuelLiters) : null
    };
    
    onSubmit(formattedData);
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

  const isLoadingAll = isLoadingUsers || isLoadingVehicles || isLoading;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />
          
          {/* Form Modal */}
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
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-secondary sticky top-0 bg-bg z-10">
                <h2 className="text-lg font-normal text-text-light">
                  {isEditMode ? 'Edit Trip' : title}
                </h2>
                <button
                  onClick={handleClose}
                  className="p-1 text-text hover:text-text-light hover:bg-bg-dark rounded transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">
                <div className="space-y-4">
                  {/* Driver Selection */}
                  <div>
                    <label className="block text-sm text-text mb-1">
                      Driver *
                    </label>
                    <select
                      {...register('driverId', {
                        required: 'Driver is required'
                      })}
                      className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                      disabled={isLoadingUsers}
                    >
                      <option value="">Select a driver</option>
                      {drivers.map(driver => (
                        <option key={driver._id} value={driver._id}>
                          {driver.firstName} {driver.lastName} - {driver.phone}
                        </option>
                      ))}
                    </select>
                    {isLoadingUsers && (
                      <p className="mt-1 text-xs text-text">Loading drivers...</p>
                    )}
                    {errors.driverId && (
                      <p className="mt-1 text-xs text-error">
                        {errors.driverId.message}
                      </p>
                    )}
                  </div>

                  {/* Vehicle Selection - Truck & Trailer Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-text mb-1">
                        Truck *
                      </label>
                      <select
                        {...register('truckId', {
                          required: 'Truck is required'
                        })}
                        className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                        disabled={isLoadingVehicles}
                      >
                        <option value="">Select a truck</option>
                        {trucks.map(truck => (
                          <option key={truck._id} value={truck._id}>
                            {truck.plateNumber} - {truck.brand} {truck.model}
                            {truck.status !== 'active' ? ` (${truck.status})` : ''}
                          </option>
                        ))}
                      </select>
                      {errors.truckId && (
                        <p className="mt-1 text-xs text-error">
                          {errors.truckId.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-text mb-1">
                        Trailer *
                      </label>
                      <select
                        {...register('trailerId', {
                          required: 'Trailer is required'
                        })}
                        className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                        disabled={isLoadingVehicles}
                      >
                        <option value="">Select a trailer</option>
                        {trailers.map(trailer => (
                          <option key={trailer._id} value={trailer._id}>
                            {trailer.plateNumber} - {trailer.brand} {trailer.model}
                            {trailer.status !== 'active' ? ` (${trailer.status})` : ''}
                          </option>
                        ))}
                      </select>
                      {errors.trailerId && (
                        <p className="mt-1 text-xs text-error">
                          {errors.trailerId.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-text mb-1 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        Start Location *
                      </label>
                      <input
                        type="text"
                        {...register('startLocation', {
                          required: 'Start location is required'
                        })}
                        placeholder="e.g., Casablanca Port"
                        className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent placeholder-text/50"
                      />
                      {errors.startLocation && (
                        <p className="mt-1 text-xs text-error">
                          {errors.startLocation.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-text mb-1 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        End Location *
                      </label>
                      <input
                        type="text"
                        {...register('endLocation', {
                          required: 'End location is required'
                        })}
                        placeholder="e.g., Tangier Med Port"
                        className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent placeholder-text/50"
                      />
                      {errors.endLocation && (
                        <p className="mt-1 text-xs text-error">
                          {errors.endLocation.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-text mb-1 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Start Date & Time *
                      </label>
                      <input
                        type="datetime-local"
                        {...register('startDate', {
                          required: 'Start date is required'
                        })}
                        className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                      />
                      {errors.startDate && (
                        <p className="mt-1 text-xs text-error">
                          {errors.startDate.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-text mb-1 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        End Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        {...register('endDate', {
                          validate: value => {
                            if (!value) return true; 
                            if (!watchStartDate) return true;
                            return new Date(value) >= new Date(watchStartDate) || 
                              'End date must be after start date';
                          }
                        })}
                        min={watchStartDate}
                        className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                      />
                      {errors.endDate && (
                        <p className="mt-1 text-xs text-error">
                          {errors.endDate.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status & Fuel */}
                  <div className="grid grid-cols-2 gap-3">
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
                        <option value="active">Active</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                      </select>
                      {watchStatus === 'pending' && (
                        <p className="mt-1 text-xs text-warning">Trip is scheduled but not started</p>
                      )}
                      {watchStatus === 'active' && (
                        <p className="mt-1 text-xs text-success">Trip is currently in progress</p>
                      )}
                      {watchStatus === 'done' && (
                        <p className="mt-1 text-xs text-text">Trip has been completed</p>
                      )}
                      {watchStatus === 'canceled' && (
                        <p className="mt-1 text-xs text-error">Trip has been canceled</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-text mb-1 flex items-center">
                        <Fuel className="h-4 w-4 mr-1" />
                        Fuel (Liters)
                      </label>
                      <input
                        type="number"
                        {...register('fuelLiters', {
                          min: { value: 0, message: 'Fuel must be positive number' }
                        })}
                        placeholder="e.g., 150, 200"
                        className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent placeholder-text/50"
                      />
                      {errors.fuelLiters && (
                        <p className="mt-1 text-xs text-error">
                          {errors.fuelLiters.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Remarks */}
                  <div>
                    <label className="block text-sm text-text mb-1 flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Remarks
                    </label>
                    <textarea
                      {...register('remarks')}
                      placeholder="Additional notes, special instructions, etc."
                      rows="3"
                      className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent placeholder-text/50 resize-none"
                    />
                  </div>
                </div>

                {/* Actions */}
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
                    loading={isLoadingAll}
                    disabled={isLoadingAll}
                  >
                    {isEditMode ? 'Update Trip' : 'Create Trip'}
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

export default TripForm;