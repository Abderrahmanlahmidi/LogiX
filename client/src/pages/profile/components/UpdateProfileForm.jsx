import React from "react";
import { Save } from "lucide-react";
import Button from "../../../components/ui/buttons/Button";

export default function UpdateProfileForm({
  profileForm,
  onSubmitProfile,
  loading,
}) {
  return (
    <div className="bg-bg border border-primary rounded-lg p-6">
      <h2 className="text-lg font-normal text-text-light mb-6">
        Update Profile
      </h2>

      <form onSubmit={profileForm.handleSubmit(onSubmitProfile)}>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-text mb-1">First Name</label>
            <input
              type="text"
              {...profileForm.register("firstName")}
              className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm text-text mb-1">Last Name</label>
            <input
              type="text"
              {...profileForm.register("lastName")}
              className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm text-text mb-1">Email</label>
            <input
              type="email"
              {...profileForm.register("email")}
              className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm text-text mb-1">Phone</label>
            <input
              type="tel"
              {...profileForm.register("phone")}
              className="w-full px-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="accent"
            size="sm"
            icon={Save}
            type="submit"
            loading={loading}
          >
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
