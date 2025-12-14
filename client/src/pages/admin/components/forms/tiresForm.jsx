import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, Truck, Package } from "lucide-react";
import Button from "../../../../components/ui/buttons/Button";
import { useQuery } from "@tanstack/react-query";
import { vehicleApi } from "../../../../services/apis/admin/fleetApi";

const TiresForm = ({
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
  initialData = null,
  isLoading = false,
  title = 'Add New Tire'
}) => {
  const isEditMode = !!initialData;

  const { data: vehiclesData, isLoading: isLoadingVehicles } = useQuery({
    queryKey: ["vehicles"],
    queryFn: vehicleApi.getVehicles,
    enabled: isOpen, 
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      serialNumber: '',
      wearLevel: '',
      position: '',
      installedOn: 'truck',
      vehicleId: ''
    }
  });

  useEffect(() => {
    if (isOpen && initialData) {
      reset({
        serialNumber: initialData.serialNumber || '',
        wearLevel: initialData.wearLevel || '',
        position: initialData.position || '',
        installedOn: initialData.installedOn || 'truck',
        vehicleId: initialData.vehicleId || ''
      });
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
    onClose();
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
              className="w-full max-w-md bg-bg border border-secondary rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-secondary">
                <h2 className="text-lg font-normal text-text-light">
                  {isEditMode ? 'Edit Tire' : title}
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
                  <div>
                    <label className="block text-sm text-text mb-1">
                      Serial Number *
                    </label>
                    <input
                      type="text"
                      {...register('serialNumber', {
                        required: 'Serial number is required'
                      })}
                      placeholder="e.g., BRIDGESTONE-12345, MICHELIN-67890"
                      className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent placeholder-text/50"
                    />
                    {errors.serialNumber && (
                      <p className="mt-1 text-xs text-error">
                        {errors.serialNumber.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-text mb-1">
                      Wear Level *
                    </label>
                    <select
                      {...register('wearLevel', {
                        required: 'Wear level is required'
                      })}
                      className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                    >
                      <option value="">Select wear level</option>
                      <option value="new">New (0-10% wear)</option>
                      <option value="good">Good (10-30% wear)</option>
                      <option value="fair">Fair (30-50% wear)</option>
                      <option value="poor">Poor (50-70% wear)</option>
                      <option value="replace">Replace (70%+ wear)</option>
                    </select>
                    {errors.wearLevel && (
                      <p className="mt-1 text-xs text-error">
                        {errors.wearLevel.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-text mb-1">
                      Position *
                    </label>
                    <select
                      {...register('position', {
                        required: 'Position is required'
                      })}
                      className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                    >
                      <option value="">Select tire position</option>
                      <option value="Front Left">Front Left</option>
                      <option value="Front Right">Front Right</option>
                      <option value="Rear Left Outer">Rear Left Outer</option>
                      <option value="Rear Left Inner">Rear Left Inner</option>
                      <option value="Rear Right Outer">Rear Right Outer</option>
                      <option value="Rear Right Inner">Rear Right Inner</option>
                      <option value="Spare">Spare</option>
                      <option value="Trailer Left">Trailer Left</option>
                      <option value="Trailer Right">Trailer Right</option>
                    </select>
                    {errors.position && (
                      <p className="mt-1 text-xs text-error">
                        {errors.position.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-text mb-1">
                      Installed On *
                    </label>
                    <div className="flex gap-2">
                      <label className="flex-1">
                        <input
                          type="radio"
                          value="truck"
                          {...register('installedOn')}
                          className="hidden peer"
                        />
                        <div className="p-3 border border-secondary rounded text-center cursor-pointer peer-checked:border-accent peer-checked:bg-accent/10">
                          <Truck className="h-5 w-5 text-text-light mx-auto mb-1" />
                          <span className="text-sm text-text-light">Truck</span>
                        </div>
                      </label>
                      
                      <label className="flex-1">
                        <input
                          type="radio"
                          value="trailer"
                          {...register('installedOn')}
                          className="hidden peer"
                        />
                        <div className="p-3 border border-secondary rounded text-center cursor-pointer peer-checked:border-accent peer-checked:bg-accent/10">
                          <Package className="h-5 w-5 text-text-light mx-auto mb-1" />
                          <span className="text-sm text-text-light">Trailer</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-text mb-1">
                      Vehicle *
                    </label>
                    <select
                      {...register('vehicleId', {
                        required: 'Vehicle is required'
                      })}
                      className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                      disabled={isLoadingVehicles}
                    >
                      <option value="">Select a vehicle</option>
                      {vehiclesData?.data?.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle._id}>
                          {vehicle.plateNumber || vehicle.id} - {vehicle.brand} {vehicle.model} 
                          {vehicle.type ? ` (${vehicle.type})` : ''}
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
                    loading={isLoading || isLoadingVehicles}
                    disabled={isLoadingVehicles}
                  >
                    {isEditMode ? 'Update Tire' : 'Add Tire'}
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

export default TiresForm;