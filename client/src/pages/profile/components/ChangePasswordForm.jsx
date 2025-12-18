import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../components/ui/toast/Toast";
import { Shield } from 'lucide-react';
import { changePassword } from '../../../services/apis/user';
import Button from '../../../components/ui/buttons/Button';
import { useForm } from 'react-hook-form';

const ChangePasswordForm = ({ userId, onCancel, onSuccess }) => {
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const newPassword = watch('newPassword');

  const passwordMutation = useMutation({
    mutationFn: (data) => changePassword(userId, data),
    onSuccess: () => {
      onSuccess();
      reset();
      toast.success("Password changed successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  });

  const onSubmit = (data) => {    
    passwordMutation.mutate(data);
  };

  return (
    <div className="bg-bg border border-secondary rounded-lg p-6">
      <h3 className="text-lg font-semibold text-text-light mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5 text-accent" />
        Change Password
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-text mb-2">Current Password *</label>
            <input
              type="password"
              {...register('oldPassword', { 
                required: 'Current password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' }
              })}
              className={`w-full px-3 py-2 bg-bg border ${errors.oldPassword ? 'border-error' : 'border-secondary'} rounded text-text-light text-sm focus:outline-none focus:border-accent`}
              placeholder="Enter current password"
            />
            {errors.oldPassword && (
              <p className="mt-1 text-xs text-error">{errors.oldPassword.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm text-text mb-2">New Password *</label>
            <input
              type="password"
              {...register('newPassword', { 
                required: 'New password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' }
              })}
              className={`w-full px-3 py-2 bg-bg border ${errors.newPassword ? 'border-error' : 'border-secondary'} rounded text-text-light text-sm focus:outline-none focus:border-accent`}
              placeholder="Enter new password (min. 6 characters)"
            />
            {errors.newPassword && (
              <p className="mt-1 text-xs text-error">{errors.newPassword.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm text-text mb-2">Confirm New Password *</label>
            <input
              type="password"
              {...register('confirmPassword', { 
                required: 'Please confirm password',
                validate: value => value === newPassword || 'Passwords do not match'
              })}
              className={`w-full px-3 py-2 bg-bg border ${errors.confirmPassword ? 'border-error' : 'border-secondary'} rounded text-text-light text-sm focus:outline-none focus:border-accent`}
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-error">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting || passwordMutation.isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="accent"
            loading={isSubmitting || passwordMutation.isLoading}
          >
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;