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
    <div>
      <label className="block text-sm text-text-light mb-1">
        Type *
      </label>
      <select
        {...register('type', { required: 'Type is required' })}
        className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
      >
      <option value="">Choose a maintenance type...</option>
        <option value="oil" className="flex items-center gap-2">
          Oil Change
        </option>
        <option value="filter" className="flex items-center gap-2">
          Filter Replacement
        </option>
        <option value="tire" className="flex items-center gap-2">
          Tire Maintenance
        </option>
        <option value="brake" className="flex items-center gap-2">
          Brake Service
        </option>
        <option value="battery" className="flex items-center gap-2">
          Battery Check
        </option>
        <option value="coolant" className="flex items-center gap-2">
          Coolant System
        </option>
      </select>
      {errors.type && (
        <p className="mt-1 text-xs text-error">
          {errors.type.message}
        </p>
      )}
      <p className="mt-1 text-xs text-text/60">
        Select the type of maintenance this rule applies to
      </p>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm text-text-light mb-1">
          Recommended KM *
        </label>
        <input
          type="number"
          {...register('recommendedKm', {
            required: 'Recommended KM is required',
            min: { value: 1000, message: 'Minimum 1000 km' }
          })}
          placeholder="10000"
          className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent placeholder-text/50"
          step="1000"
        />
        {errors.recommendedKm && (
          <p className="mt-1 text-xs text-error">
            {errors.recommendedKm.message}
          </p>
        )}
        <p className="mt-1 text-xs text-text/60">
          Distance interval
        </p>
      </div>

      <div>
        <label className="block text-sm text-text-light mb-1">
          Recommended Months *
        </label>
        <input
          type="number"
          {...register('recommendedMonths', {
            min: { value: 1, message: 'Minimum 1 month' }
          })}
          placeholder="6"
          className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent placeholder-text/50"
        />
        <p className="mt-1 text-xs text-text/60">
          Time interval
        </p>
      </div>
    </div>

    <div>
      <label className="block text-sm text-text-light mb-1">
        Description
      </label>
      <textarea
        {...register('description')}
        rows="3"
        placeholder="Enter detailed instructions for this maintenance task. Include any special tools, materials, or safety precautions needed..."
        className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent placeholder-text/50 resize-none"
      />
      <p className="mt-1 text-xs text-text/60">
        This helps mechanics understand exactly what needs to be done
      </p>
    </div>

    <div className="flex items-start gap-3 p-3 bg-bg-dark/30 border border-secondary/50 rounded-lg">
      <div className="mt-0.5">
        <input
          type="checkbox"
          id="isActive"
          {...register('isActive')}
          className="h-4 w-4 accent-accent"
          defaultChecked={true}
        />
      </div>
      <div>
        <label htmlFor="isActive" className="text-sm text-text-light cursor-pointer">
          Enable this maintenance rule
        </label>
        <p className="text-xs text-text/60 mt-0.5">
          When enabled, vehicles will be scheduled for this maintenance based on the intervals above
        </p>
      </div>
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