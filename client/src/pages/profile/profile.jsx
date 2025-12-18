import React, { useState } from 'react';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { userInfo } from '../../services/apis/user';
import ProfileCard from './components/ProfileCard';
import EditProfileForm from './components/EditProfileForm';
import ChangePasswordForm from './components/ChangePasswordForm';
import AccountSecurity from './components/AccountSecurity';

export default function Profile() {
  const queryClient = useQueryClient();
  const id = useSelector((state) => state.auth.user.userId);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => userInfo(id),
    enabled: !!id
  });

  const user = data?.data || {};

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-light">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-light mb-2">My Profile</h1>
          <p className="text-text">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProfileCard 
              user={user}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              isChangingPassword={isChangingPassword}
              setIsChangingPassword={setIsChangingPassword}
            />
          </div>

          <div className="lg:col-span-2 space-y-6">
            {isEditing && (
              <EditProfileForm 
                user={user}
                onCancel={() => setIsEditing(false)}
                onSuccess={() => {
                  queryClient.invalidateQueries(["user", id]);
                  setIsEditing(false);
                }}
              />
            )}

            {isChangingPassword && (
              <ChangePasswordForm 
                userId={id}
                onCancel={() => setIsChangingPassword(false)}
                onSuccess={() => setIsChangingPassword(false)}
              />
            )}

            <AccountSecurity />
          </div>
        </div>
      </div>
    </div>
  );
}