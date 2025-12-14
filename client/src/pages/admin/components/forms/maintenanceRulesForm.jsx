import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Button from '../../../../components/ui/buttons/Button';

const MaintenanceRuleForm = ({
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
  initialData = null,
  isLoading = false,
  title = 'Add New Maintenance Rule'
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
        type: initialData.type || '',
        recommendedKm: initialData.recommendedKm || '',
        recommendedMonths: initialData.recommendedMonths || '',
        description: initialData.description || '',
        isActive: initialData.isActive !== undefined ? initialData.isActive : true
      });
    } else if (isOpen) {
      reset({
        type: '',
        recommendedKm: '',
        recommendedMonths: '',
        description: '',
        isActive: true
      });
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = (data) => {
    const formattedData = {
      ...data,
      recommendedKm: Number(data.recommendedKm),
      recommendedMonths: data.recommendedMonths ? Number(data.recommendedMonths) : null
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
                  {title}
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
                  {/* Type */}
                  <div>
                    <label className="block text-sm text-text mb-1">
                      Type *
                    </label>
                    <select
                      {...register('type', { required: 'Type is required' })}
                      className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                    >
                      <option value="">Select type</option>
                      <option value="oil">Oil Change</option>
                      <option value="filter">Filter Replacement</option>
                      <option value="tire">Tire Maintenance</option>
                      <option value="brake">Brake Service</option>
                    </select>
                    {errors.type && (
                      <p className="mt-1 text-xs text-error">
                        {errors.type.message}
                      </p>
                    )}
                  </div>

                  {/* Recommended KM */}
                  <div>
                    <label className="block text-sm text-text mb-1">
                      Recommended KM *
                    </label>
                    <input
                      type="number"
                      {...register('recommendedKm', {
                        required: 'Recommended KM is required',
                        min: { value: 1000, message: 'Minimum 1000 km' }
                      })}
                      className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                    />
                    {errors.recommendedKm && (
                      <p className="mt-1 text-xs text-error">
                        {errors.recommendedKm.message}
                      </p>
                    )}
                  </div>

                  {/* Recommended Months */}
                  <div>
                    <label className="block text-sm text-text mb-1">
                      Recommended Months
                    </label>
                    <input
                      type="number"
                      {...register('recommendedMonths')}
                      className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm text-text mb-1">
                      Description
                    </label>
                    <textarea
                      {...register('description')}
                      rows="2"
                      className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent resize-none"
                    />
                  </div>

                  {/* Active Status */}
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register('isActive')}
                        className="h-4 w-4 accent-accent"
                      />
                      <span className="text-sm text-text-light">Active Rule</span>
                    </label>
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
                    {isEditMode ? 'Update Rule' : 'Create Rule'}
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

export default MaintenanceRuleForm;