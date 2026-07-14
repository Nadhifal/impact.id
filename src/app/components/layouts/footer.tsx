import React from "react";

// Inline SVGs for social media icons
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      {/* Mobile View: Centered copyright, then centered row with Privacy Policy & Terms of Service */}
      <div className="md:hidden max-w-7xl mx-auto px-6 flex flex-col items-center gap-4 text-center">
        <span className="text-xs text-slate-500">
          &copy; 2026 IMPACT.ID Foundation. Semua hak dilindungi.
        </span>
        <div className="flex justify-center gap-6 text-xs font-semibold text-slate-500">
          <a href="#" className="hover:text-[#00473e] transition-colors">
            Kebijakan Privasi
          </a>
          <a href="#" className="hover:text-[#00473e] transition-colors">
            Syarat & Ketentuan
          </a>
        </div>
      </div>

      {/* Desktop View: Full Footer */}
      <div className="hidden md:flex max-w-7xl mx-auto px-6 md:px-12 flex-row items-center justify-between gap-8">
        {/* Logo & Copyright */}
        <div className="flex flex-col items-start gap-2">
          <span className="text-lg font-extrabold tracking-tight text-[#00473e]">
            IMPACT.ID
          </span>
          <span className="text-xs text-slate-500">
            &copy; 2026 IMPACT.ID Foundation. Semua hak dilindungi.
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500">
          <a href="#" className="hover:text-[#00473e] transition-colors">
            Syarat & Ketentuan
          </a>
          <a href="#" className="hover:text-[#00473e] transition-colors">
            Kebijakan Privasi
          </a>
          <a href="#" className="hover:text-[#00473e] transition-colors">
            Bantuan
          </a>
          <a href="#" className="hover:text-[#00473e] transition-colors">
            Kontak
          </a>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {[FacebookIcon, InstagramIcon, TwitterIcon].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-9 h-9 rounded-full bg-slate-50 hover:bg-[#e6f4f1] text-slate-600 hover:text-[#00473e] border border-slate-100 flex items-center justify-center transition-all duration-300"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
