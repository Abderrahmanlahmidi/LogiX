import React from 'react';
import { useMutation } from "@tanstack/react-query";
import Button from "../../../components/ui/buttons/Button";
import {useToast} from "../../../components/ui/toast/Toast";
import { User } from 'lucide-react';
import { updateProfile } from '../../../services/apis/user';

const EditProfileForm = ({ user, onCancel, onSuccess }) => {
  const { toast } = useToast();

  const updateMutation = useMutation({
    mutationFn: (data) => updateProfile(user._id, data),
    onSuccess: () => {
      onSuccess();
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Convert to FormData if we have a file
    const fileInput = e.target.querySelector('input[type="file"]');
    if (fileInput && fileInput.files[0]) {
      const formDataWithFile = new FormData();
      formDataWithFile.append('profile', fileInput.files[0]);
      formDataWithFile.append('firstName', data.firstName);
      formDataWithFile.append('lastName', data.lastName);
      formDataWithFile.append('email', data.email);
      formDataWithFile.append('phone', data.phone);
      updateMutation.mutate(formDataWithFile);
    } else {
      updateMutation.mutate(data);
    }
  };

  return (
    <div className="bg-bg border border-secondary rounded-lg p-6">
      <h3 className="text-lg font-semibold text-text-light mb-4 flex items-center gap-2">
        <User className="h-5 w-5 text-accent" />
        Edit Profile Information
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-text mb-2">First Name *</label>
            <input
              type="text"
              name="firstName"
              defaultValue={user.firstName}
              required
              className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
              placeholder="Enter first name"
            />
          </div>
          
          <div>
            <label className="block text-sm text-text mb-2">Last Name *</label>
            <input
              type="text"
              name="lastName"
              defaultValue={user.lastName}
              required
              className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
              placeholder="Enter last name"
            />
          </div>
          
          <div>
            <label className="block text-sm text-text mb-2">Email *</label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              required
              className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
              placeholder="Enter email"
            />
          </div>
          
          <div>
            <label className="block text-sm text-text mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              defaultValue={user.phone}
              className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
              placeholder="Enter phone number"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="accent"
            loading={updateMutation.isLoading}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;