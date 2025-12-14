import React from "react";
import Button from "../../../components/ui/buttons/Button";

export default function ChangePasswordForm({
  passwordForm,
  onSubmitPassword,
  loading,
}) {
  return (
    <div className="bg-bg border border-primary rounded-lg p-6">
      <h2 className="text-lg font-normal text-text-light mb-6">
        Change Password
      </h2>

      <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-text mb-1">
              Current Password
            </label>
            <input
              type="password"
              placeholder="Enter current password"
              {...passwordForm.register("currentPassword")}
              className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm text-text mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              {...passwordForm.register("newPassword")}
              className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm text-text mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              {...passwordForm.register("confirmPassword")}
              className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div className="pt-2">
            <Button variant="accent" size="sm" type="submit" loading={loading}>
              Change Password
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
