import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck, Package } from 'lucide-react';
import Button from '../../../../components/ui/buttons/Button';

const FleetForm = ({
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
  initialData = null,
  isLoading = false,
  title = 'Add New Vehicle'
}) => {
  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    if (isOpen && initialData) {
      reset({
        plateNumber: initialData.plateNumber || '',
        brand: initialData.brand || '',
        model: initialData.model || '',
        currentKm: initialData.currentKm || '',
        status: initialData.status || 'active',
        type: initialData.type || 'truck'
      });
    } else if (isOpen) {
      reset({
        plateNumber: '',
        brand: '',
        model: '',
        currentKm: '',
        status: 'active',
        type: 'truck'
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
              className="w-full max-w-md bg-bg border border-secondary rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-secondary">
                <h2 className="text-lg font-normal text-text-light">
                  {isEditMode ? 'Edit Vehicle' : title}
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
                  {/* Plate Number */}
                  <div>
                    <label className="block text-sm text-text mb-1">
                      Plate Number *
                    </label>
                    <input
                      type="text"
                      {...register('plateNumber', {
                        required: 'Plate number is required'
                      })}
                      placeholder="e.g., ABC-123, XYZ-789"
                      className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent placeholder-text/50"
                    />
                    {errors.plateNumber && (
                      <p className="mt-1 text-xs text-error">
                        {errors.plateNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Brand & Model Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-text mb-1">
                        Brand *
                      </label>
                      <input
                        type="text"
                        {...register('brand', {
                          required: 'Brand is required'
                        })}
                        placeholder="e.g., Volvo, Mercedes, Kenworth"
                        className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent placeholder-text/50"
                      />
                      {errors.brand && (
                        <p className="mt-1 text-xs text-error">
                          {errors.brand.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-text mb-1">
                        Model *
                      </label>
                      <input
                        type="text"
                        {...register('model', {
                          required: 'Model is required'
                        })}
                        placeholder="e.g., VNL 860, Cascadia, T680"
                        className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent placeholder-text/50"
                      />
                      {errors.model && (
                        <p className="mt-1 text-xs text-error">
                          {errors.model.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Current KM */}
                  <div>
                    <label className="block text-sm text-text mb-1">
                      Current Kilometers *
                    </label>
                    <input
                      type="number"
                      {...register('currentKm', {
                        required: 'Current kilometers are required',
                        min: { value: 0, message: 'Must be positive number' }
                      })}
                      placeholder="e.g., 150000, 75000"
                      className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent placeholder-text/50"
                    />
                    {errors.currentKm && (
                      <p className="mt-1 text-xs text-error">
                        {errors.currentKm.message}
                      </p>
                    )}
                  </div>

                  {/* Type Selection */}
                  <div>
                    <label className="block text-sm text-text mb-1">
                      Vehicle Type *
                    </label>
                    <div className="flex gap-2">
                      <label className="flex-1">
                        <input
                          type="radio"
                          value="truck"
                          {...register('type')}
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
                          {...register('type')}
                          className="hidden peer"
                        />
                        <div className="p-3 border border-secondary rounded text-center cursor-pointer peer-checked:border-accent peer-checked:bg-accent/10">
                          <Package className="h-5 w-5 text-text-light mx-auto mb-1" />
                          <span className="text-sm text-text-light">Trailer</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Status Selection */}
                  <div>
                    <label className="block text-sm text-text mb-1">
                      Status *
                    </label>
                    <select
                      {...register('status')}
                      className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                    >
                      <option value="active">Active (In service)</option>
                      <option value="inactive">Inactive (Out of service)</option>
                      <option value="maintenance">Maintenance (Being repaired)</option>
                    </select>
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
                    loading={isLoading}
                  >
                    {isEditMode ? 'Update Vehicle' : 'Add Vehicle'}
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

export default FleetForm;