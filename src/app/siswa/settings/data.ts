export interface AccountSettingsData {
  fullName: string;
  email: string;
  bio: string;
}

export const initialSettings: AccountSettingsData = {
  fullName: "Alexander Mitchell",
  email: "alex.mitchell@impact.id",
  bio: "Impact investor focusing on sustainable education technology and social equity across Southeast Asia.",
};
