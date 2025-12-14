import React from "react";

export default function AccountInfo({ user }) {
  return (
    <div className="bg-bg border border-primary rounded-lg p-6">
      <h3 className="text-lg font-normal text-text-light mb-4">
        Account Information
      </h3>

      <div className="space-y-3">
        <div>
          <div className="text-sm text-text mb-1">Name</div>
          <div className="text-text-light">
            {user?.firstName} {user?.lastName}
          </div>
        </div>

        <div>
          <div className="text-sm text-text mb-1">Email</div>
          <div className="text-text-light">{user?.email}</div>
        </div>

        <div>
          <div className="text-sm text-text mb-1">Phone</div>
          <div className="text-text-light">{user?.phone || "Not set"}</div>
        </div>

        <div>
          <div className="text-sm text-text mb-1">Member Since</div>
          <div className="text-text-light">
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
}
