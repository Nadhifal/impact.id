export interface AccountSettingsData {
  fullName: string;
  email: string;
  bio: string;
}

// This is now just a fallback. The actual settings page loads data from /api/profile.
export const initialSettings: AccountSettingsData = {
  fullName: "",
  email: "",
  bio: "",
};
