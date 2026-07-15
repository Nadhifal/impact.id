import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { AccountSettingsData } from "../../data";
import { Card } from "@/app/guru/verifikasi/components/ui/Card";
import { Button } from "@/app/shared/components/ui/button";

interface AccountFormProps {
  initialData: AccountSettingsData;
  onSave: (data: AccountSettingsData) => void;
}

export const AccountForm: React.FC<AccountFormProps> = ({
  initialData,
  onSave,
}) => {
  const [formData, setFormData] = useState<AccountSettingsData>(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card className="p-6 md:p-8 border border-slate-100 shadow-xs bg-white">
      {/* Title Header */}
      <div className="border-b border-slate-100 pb-5 mb-6">
        <h3 className="text-base md:text-lg font-bold text-slate-800 leading-none">
          Account Settings
        </h3>
        <p className="text-xs md:text-sm text-slate-400 font-medium mt-2 leading-relaxed">
          Update your personal information and how others see you on the platform.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name & Email Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-[#f8fafb] hover:bg-slate-50/50 border border-slate-150 focus:border-primary/50 focus:bg-white rounded-xl px-4 py-3 text-xs md:text-sm text-slate-700 placeholder-slate-400 outline-hidden transition-all"
              placeholder="e.g. Alexander Mitchell"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#f8fafb] hover:bg-slate-50/50 border border-slate-150 focus:border-primary/50 focus:bg-white rounded-xl px-4 py-3 text-xs md:text-sm text-slate-700 placeholder-slate-400 outline-hidden transition-all"
              placeholder="e.g. alex.mitchell@impact.id"
              required
            />
          </div>
        </div>

        {/* Bio Textarea */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Bio
          </label>
          <textarea
            rows={5}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full bg-[#f8fafb] hover:bg-slate-50/50 border border-slate-150 focus:border-primary/50 focus:bg-white rounded-xl p-4 text-xs md:text-sm text-slate-700 placeholder-slate-400 outline-hidden transition-all resize-none leading-relaxed"
            placeholder="Tell us about yourself..."
          />
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <Button
            type="submit"
            variant="primary"
            className="gap-2 px-6 py-3 text-xs md:text-sm font-bold bg-primary text-white rounded-xl"
          >
            <span>Save Changes</span>
            <ChevronRight className="w-4 h-4 text-white" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
