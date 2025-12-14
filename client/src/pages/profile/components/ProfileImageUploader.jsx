import React from "react";
import { User, Camera } from "lucide-react";
import { DisplayImages } from "../../../constants/DisplayImagesConstants";
import Button from "../../../components/ui/buttons/Button";

export default function ProfileImageUploader({
  previewImage,
  profileImage,
  onImageChange,
  onRemove,
  user,
}) {
  return (
    <div className="bg-bg border border-primary rounded-lg p-6">
      <h3 className="text-lg font-normal text-text-light mb-4">
        Profile Picture
      </h3>

      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div className="h-32 w-32 rounded-full bg-bg border-2 border-secondary overflow-hidden">
            {previewImage || user?.profile ? (
              <img
                src={previewImage || DisplayImages(user?.profile)}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-accent/10">
                <User className="h-16 w-16 text-accent" />
              </div>
            )}
          </div>

          <label className="absolute bottom-2 right-2 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center hover:bg-opacity-80 transition-colors">
              <Camera className="h-4 w-4 text-bg" />
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChange}
            />
          </label>
        </div>

        {profileImage && (
          <Button variant="outline" size="sm" onClick={onRemove}>
            Remove Image
          </Button>
        )}
      </div>
    </div>
  );
}
