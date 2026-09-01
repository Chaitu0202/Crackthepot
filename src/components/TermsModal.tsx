import React from 'react';
import { X, ShieldAlert, CheckCircle, Scale, FileText } from 'lucide-react';
import { PeacockFeatherIcon } from './SvgMotifs';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="terms-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#0B1230]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        id="terms-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-gradient-to-b from-[#14224A] to-[#0B1230] border-2 border-[#E8B923]/40 rounded-3xl p-6 sm:p-8 text-[#F6EEDD] shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#0B1230] border border-[#E8B923]/30 text-[#E8B923] hover:bg-[#14224A] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E8B923]/20">
          <div className="w-10 h-10 rounded-xl bg-[#E8B923]/10 border border-[#E8B923]/30 flex items-center justify-center text-[#E8B923]">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#F6EEDD]">
              Terms & Conditions &bull; నిబంధనలు
            </h3>
            <p className="text-xs text-[#E8B923]">
              Krishna Janmashtami "Crack Your Pot" Campaign 2026
            </p>
          </div>
        </div>

        {/* Legal Points */}
        <div className="space-y-4 text-xs sm:text-sm text-[#F6EEDD]/85 leading-relaxed">
          {/* Section 1 */}
          <div className="p-3.5 rounded-xl bg-[#0B1230]/70 border border-[#E8B923]/20">
            <h4 className="font-semibold text-[#E8B923] text-sm mb-1 flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              1. Campaign Duration & Eligibility
            </h4>
            <p>
              The "Crack Your Pot" (కుండ పగలగొట్టు) festive campaign is open to all residents of India aged 18 and above. The campaign runs until 10th September 2026, 11:59 PM IST.
            </p>
          </div>

          {/* Section 2: Grand Prize Tiers */}
          <div className="p-3.5 rounded-xl bg-[#0B1230]/70 border border-[#E8B923]/20">
            <h4 className="font-semibold text-[#E8B923] text-sm mb-1 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              2. Grand Prize Draw Structure (180 Total Winners)
            </h4>
            <p>
              The Grand Draw on 10th September 2026 comprises 4 prize categories: <strong>Grand Prize ₹1,000</strong> (10 Pot Crackers), <strong>Next ₹500</strong> (20 Pot Crackers), <strong>₹200</strong> (50 Pot Crackers), and <strong>₹100</strong> (100 Pot Crackers). All cash winnings are transferred directly to verified UPI IDs or bank accounts.
            </p>
          </div>

          {/* Section 3: Instant Prizes & Redemption */}
          <div className="p-3.5 rounded-xl bg-[#0B1230]/70 border border-[#E8B923]/20">
            <h4 className="font-semibold text-[#E8B923] text-sm mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-400" />
              3. Voucher Redemption & Expiry
            </h4>
            <p>
              All discount vouchers, sample kits, and cashback codes obtained from Venna Kunda (₹5) or Uyyala Kunda (₹9) are valid for 30 days from date of issue and redeemable once per user on participating partner stores.
            </p>
          </div>

          {/* Section 4: Live Grand Draw Transparency */}
          <div className="p-3.5 rounded-xl bg-[#0B1230]/70 border border-[#E8B923]/20">
            <h4 className="font-semibold text-[#E8B923] text-sm mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#1B7A6E]" />
              4. Grand Prize Draw Mechanism
            </h4>
            <p>
              Grand prize winners are selected via an automated cryptographically verifiable pseudorandom algorithm on 10th September 2026. Multiple pot purchases and successful friend referrals generate separate ticket IDs, proportionally increasing winner probability.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-[#E8B923]/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#E8B923] text-[#0B1230] font-bold text-sm hover:brightness-105 transition-all cursor-pointer shadow"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
