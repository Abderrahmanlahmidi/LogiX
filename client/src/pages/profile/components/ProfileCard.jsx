import  { useState, useRef } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from '../../../services/apis/user';
import Button from '../../../components/ui/buttons/Button';
import { useToast } from '../../../components/ui/toast/Toast';
import { DisplayImages } from '../../../constants/DisplayImagesConstants';
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Save, 
  Key, 
  Calendar,
  Edit2,
  Check,
  X
} from 'lucide-react';

const ProfileCard = ({ 
  user, 
  imagePreview, 
  setImagePreview, 
  isEditing, 
  setIsEditing, 
  isChangingPassword, 
  setIsChangingPassword 
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const updateMutation = useMutation({
    mutationFn: (data) => updateProfile(user._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", user._id]);
      setSelectedFile(null);
      setImagePreview(null);
      toast.success("Profile image updated successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update profile image");
    }
  });

  const handleChooseImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateImage = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('profile', selectedFile);
      formData.append('firstName', user.firstName);
      formData.append('lastName', user.lastName);
      formData.append('email', user.email);
      formData.append('phone', user.phone || '');
      
      updateMutation.mutate(formData);
    }
  };

  const handleCancelImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-bg border border-secondary rounded-lg p-6 sticky top-6">
      {/* Profile Image */}
      <div className="relative group mb-6">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-accent/20 bg-bg-dark">
          {imagePreview || user.profile ? (
            <img 
              src={DisplayImages(user.profile)} 
              alt={user.firstName} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center">
              <User className="h-16 w-16 text-text/40" />
            </div>
          )}
        </div>


        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        
        <div className="mt-4 space-y-3">
          {selectedFile ? (
            <div className="flex gap-2">
              <Button
                variant="accent"
                size="sm"
                fullWidth
                icon={Save}
                onClick={handleUpdateImage}
                loading={updateMutation.isLoading}
              >
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={X}
                onClick={handleCancelImage}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              fullWidth
              icon={Camera}
              onClick={handleChooseImageClick}
            >
              Change Photo
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-text-light mb-1">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-accent capitalize">{user.roleId?.name || user.role}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-text">
            <Mail className="h-4 w-4" />
            <span className="text-sm">{user.email}</span>
          </div>
          
          <div className="flex items-center gap-3 text-text">
            <Phone className="h-4 w-4" />
            <span className="text-sm">{user.phone || 'Not set'}</span>
          </div>
          
          {user.createdAt && (
            <div className="flex items-center gap-3 text-text">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-secondary space-y-2">
        <Button
          variant={isEditing ? "accent" : "outline"}
          size="sm"
          fullWidth
          icon={isEditing ? Check : Edit2}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
        
        <Button
          variant={isChangingPassword ? "accent" : "outline"}
          size="sm"
          fullWidth
          icon={Key}
          onClick={() => setIsChangingPassword(!isChangingPassword)}
        >
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;