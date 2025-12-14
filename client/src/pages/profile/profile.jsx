import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changePassword,
  updateProfile,
  userInfo,
} from "../../services/apis/user";
import Alert from "../../components/ui/alerts/Alert";
import { useSelector } from "react-redux";
import ProfileHeader from "./components/ProfileHeader";
import ProfileImageUploader from "./components/ProfileImageUploader";
import UpdateProfileForm from "./components/UpdateProfileForm";
import ChangePasswordForm from "./components/ChangePasswordForm";
import AccountInfo from "./components/AccountInfo";
import { StorageLoading } from "../../constants/StorageLoading";


export default function Profile() {

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const queryClient = useQueryClient();
  StorageLoading();
  const id = useSelector((state) => state.auth.user?.userId);

  // fetch user info
  const {
    data: userResponse,
  } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: () => userInfo(id),
    enabled: !!id,
  });

  const user = userResponse?.data;

  // update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (formData) => updateProfile(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile", id]);
      showAlert("Profile updated successfully", "success");
      // clear preview
      setPreviewImage(null);
      setProfileImage(null);
    },
    onError: (err) =>
      showAlert(err.response?.data?.message || "Update failed", "error"),
  });

  // change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: (payload) => changePassword(id, payload),
    onSuccess: () => showAlert("Password changed successfully", "success"),
    onError: (err) =>
      showAlert(
        err.response?.data?.message || "Password change failed",
        "error"
      ),
  });

  // forms
  const profileForm = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  const passwordForm = useForm();

  // reset profile form when user data loads
  useEffect(() => {
    if (user) {
      profileForm.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // image handling
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewImage) URL.revokeObjectURL(previewImage);
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // submit profile
  const onSubmitProfile = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null)
        formData.append(key, data[key]);
    });
    if (profileImage) formData.append("profileImage", profileImage);
    updateProfileMutation.mutate(formData);
  };

  // submit password
  const onSubmitPassword = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      showAlert("Passwords do not match", "error");
      return;
    }
    changePasswordMutation.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
    passwordForm.reset();
  };

  // alert helper
  const showAlert = (message, type = "success") => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: "", message: "" }), 5000);
  };

  // cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  return (
    <div className="min-h-screen bg-bg p-4 md:p-6">
      {/* Alert */}
      {alert.show && (
        <div className="max-w-4xl mx-auto mb-4">
          <Alert type={alert.type === "error" ? "warning" : "success"} open>
            {alert.message}
          </Alert>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <ProfileHeader />

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            <UpdateProfileForm
              profileForm={profileForm}
              onSubmitProfile={onSubmitProfile}
              loading={updateProfileMutation.isLoading}
            />

            <ChangePasswordForm
              passwordForm={passwordForm}
              onSubmitPassword={onSubmitPassword}
              loading={changePasswordMutation.isLoading}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ProfileImageUploader
              previewImage={previewImage}
              profileImage={profileImage}
              onImageChange={handleImageChange}
              onRemove={() => {
                if (previewImage) URL.revokeObjectURL(previewImage);
                setPreviewImage(null);
                setProfileImage(null);
              }}
              user={user}
            />

            <AccountInfo user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
