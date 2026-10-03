import Link from 'next/link';
import { ArrowLeft, Shield, Mail, Phone } from 'lucide-react';
import { businessConfig } from '@/src/config/business.config';

export const metadata = {
  title: `Privacy & Guest Data Policy | ${businessConfig.name}`,
  description: `How ${businessConfig.name} protects your personal information and reservation details.`,
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F5F7F8] text-[#101B2D] py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-14 shadow-sm border border-[#101B2D]/10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#101B2D]/70 hover:text-[#101B2D] transition-colors mb-8 focus-visible:ring-2 focus-visible:ring-[#C9993F] rounded-md px-1 py-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to homestay
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#8FA08A]/15 flex items-center justify-center text-[#8FA08A]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#8FA08A] font-medium block">Guest trust & transparency</span>
            <h1 className="font-serif text-3xl md:text-4xl text-[#101B2D] font-light">Privacy & Data Policy</h1>
          </div>
        </div>

        <p className="text-sm text-[#101B2D]/70 mb-8 pb-6 border-b border-[#101B2D]/10">
          Last revised: October 2026. This policy describes how {businessConfig.name} collects, handles, and safeguards personal details when you enquire about accommodations or subscribe to our mountain journal.
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-[#101B2D]/80">
          <section>
            <h2 className="font-serif text-xl text-[#101B2D] mb-3">1. Information We Collect</h2>
            <p>
              When you submit a reservation enquiry, we request only the details necessary to coordinate your stay: your name, contact phone number, prospective check-in and check-out dates, guest count, preferred suite, and any specific dietary or mobility requests you share with us.
            </p>
            <p className="mt-2">
              If you subscribe to our journal, we store only your email address. We do not store payment card credentials on our servers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#101B2D] mb-3">2. How Your Information Is Used</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To confirm suite availability and communicate directly via phone or WhatsApp.</li>
              <li>To prepare personalized dietary menus, bedroom arrangements, and heating for your arrival.</li>
              <li>To comply with statutory local guest registration requirements (Form C / police verification for visitors to Uttarakhand).</li>
              <li>To send occasional seasonal dispatches and harvest updates, strictly if you opted into our journal.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#101B2D] mb-3">3. Direct Host Protection & No Selling</h2>
            <p>
              We are a family-run mountain homestay. We never sell, rent, monetize, or trade your personal data to advertising brokers or corporate third parties. Your details remain confidential between you and the resident hosts of {businessConfig.name}.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#101B2D] mb-3">4. Data Retention & Deletion</h2>
            <p>
              You retain the full right at any moment to review, rectify, or request the complete deletion of your booking records or journal subscription. To exercise this right, simply contact us directly:
            </p>
            <div className="mt-4 p-4 rounded-xl bg-[#F5F7F8] border border-[#101B2D]/10 space-y-2 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8FA08A]" />
                <span>{businessConfig.contact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8FA08A]" />
                <span>{businessConfig.contact.phoneDisplay}</span>
              </div>
            </div>
          </section>

          <section className="pt-6 border-t border-[#101B2D]/10">
            <p className="text-xs text-[#101B2D]/60">
              {businessConfig.name} · {businessConfig.contact.address}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
