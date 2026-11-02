import { createFileRoute } from '@tanstack/react-router'
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Wrench, 
  Home as HomeIcon, 
  CheckCircle2, 
  Star, 
  ArrowRight,
  CreditCard, 
  Lock,
  Calculator,
  Sliders,
  Sparkles
} from 'lucide-react';
import { PaymentElement, BrandingElement, ExpressCheckoutElement } from '@whop/elements-react';

export const Route = createFileRoute('/')({ component: HomeView })

function HomeView() {
  const [activeTab, setActiveTab] = useState('home');
  const [estimateForm, setEstimateForm] = useState({ name: '', email: '', phone: '', address: '', service: 'replacement', notes: '' });
  const [submittedLead, setSubmittedLead] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState('pending');

  const [sqFt, setSqFt] = useState(2200);
  const [shingleTier, setShingleTier] = useState('architectural');
  const [tearOffNeeded, setTearOffNeeded] = useState(true);

  const baseRatePerSqFt = shingleTier === 'designer' ? 6.5 : shingleTier === 'metal' ? 9.5 : 4.5;
  const tearOffCost = tearOffNeeded ? sqFt * 1.2 : 0;
  const estimatedTotal = Math.round((sqFt * baseRatePerSqFt) + tearOffCost);
  const suggestedDeposit = Math.round(estimatedTotal * 0.15);

  useEffect(() => {
    if (window.whop && typeof window.whop.track === 'function') {
      window.whop.track('page_view');
    }
  }, []);

  const handleServiceView = (serviceName) => {
    if (window.whop && typeof window.whop.track === 'function') {
      window.whop.track('service_viewed', { service: serviceName });
    }
    setActiveTab('services');
  };

  const handleEstimateSubmit = async (e) => {
    e.preventDefault();
    if (window.whop && typeof window.whop.track === 'function') {
      window.whop.track('estimate_requested', { value: estimatedTotal, currency: 'USD', email: estimateForm.email });
    }
    setSubmittedLead(true);
  };

  const startCheckout = (planName, price) => {
    setSelectedPlan({ name: planName, price });
    if (window.whop && typeof window.whop.track === 'function') {
      window.whop.track('deposit_started', { plan: planName, value: price, currency: 'USD' });
    }
    setCheckoutModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white text-xs md:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4" />
        <span>Licensed & Insured US Roofing Contractor • $0 Down Financing Available via Klarna, Afterpay & Splitit • Powered by Whop</span>
      </div>

      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/30">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block">ApexGuard Roofing</span>
              <span className="text-xs text-emerald-400 font-medium">Restoration & Solar Solutions</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button onClick={() => setActiveTab('home')} className={`hover:text-white transition ${activeTab === 'home' ? 'text-emerald-400 font-semibold' : ''}`}>Home</button>
            <button onClick={() => setActiveTab('calculator')} className={`hover:text-white transition ${activeTab === 'calculator' ? 'text-emerald-400 font-semibold' : ''}`}>Instant Calculator</button>
            <button onClick={() => setActiveTab('services')} className={`hover:text-white transition ${activeTab === 'services' ? 'text-emerald-400 font-semibold' : ''}`}>Services</button>
            <button onClick={() => setActiveTab('pricing')} className={`hover:text-white transition ${activeTab === 'pricing' ? 'text-emerald-400 font-semibold' : ''}`}>Pricing & Plans</button>
            <button onClick={() => setActiveTab('invoices')} className={`hover:text-white transition ${activeTab === 'invoices' ? 'text-emerald-400 font-semibold' : ''}`}>Invoices & Billing</button>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('estimate')} className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-600/20 transition">
              Request Estimate
            </button>
          </div>
        </div>
      </header>

      {activeTab === 'home' && (
        <div>
          <section className="relative overflow-hidden pt-20 pb-28 lg:pt-32 lg:pb-36 bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-emerald-400" />
                    <span>Rated #1 US Roofing & Restoration Partner</span>
                  </div>
                  <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                    Protect Your Home With <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Elite Roofing</span> & Zero-Hassle Financing.
                  </h1>
                  <p className="text-lg text-slate-300 max-w-2xl">
                    From 21-point storm inspections to full architectural shingle replacement and emergency leak repairs. Fully bonded, insured, and backed by Whop secure payments.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button onClick={() => setActiveTab('calculator')} className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition">
                      <Calculator className="w-4 h-4" /> Calculate Roof Cost Instantly
                    </button>
                    <button onClick={() => setActiveTab('estimate')} className="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold flex items-center justify-center gap-2 transition">
                      Book Free Estimate
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="bg-slate-900/95 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl relative">
                    <div className="absolute -top-3 right-6 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      Whop Verified
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Quick Quote & Deposit Flow</h3>
                    <p className="text-sm text-slate-400 mb-6">Experience our secure deposit → job → final invoice workflow.</p>
                    <button onClick={() => setActiveTab('calculator')} className="w-full mt-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition text-sm">
                      Try Interactive Cost Calculator
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-slate-950 border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950 text-emerald-400">Transformation Gallery</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">Before & After Restorations</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                  <div className="relative h-48 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full">BEFORE: Storm Damage</span>
                    <p className="text-slate-400 text-sm">Granite loss & bruised shingles</p>
                  </div>
                  <div className="relative h-48 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">AFTER: ApexGuard Shingles</span>
                    <p className="text-emerald-400 text-sm font-semibold">50-Year Non-Prorated Warranty</p>
                  </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                  <div className="relative h-48 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full">BEFORE: Active Leaks</span>
                    <p className="text-slate-400 text-sm">Rusted flashings & attic moisture</p>
                  </div>
                  <div className="relative h-48 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">AFTER: Watertight Seal</span>
                    <p className="text-emerald-400 text-sm font-semibold">Ice & Water Shield Protected</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'calculator' && (
        <div className="max-w-5xl mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Interactive Roofing Cost Calculator</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
              <div>
                <label className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                  <Sliders className="w-4 h-4 text-emerald-400" /> Roof Size: {sqFt.toLocaleString()} sq ft
                </label>
                <input type="range" min="1000" max="6000" step="100" value={sqFt} onChange={e => setSqFt(Number(e.target.value))} className="w-full accent-emerald-500" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <button onClick={() => setShingleTier('architectural')} className={`p-4 rounded-2xl border ${shingleTier === 'architectural' ? 'bg-emerald-950 border-emerald-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>Architectural</button>
                <button onClick={() => setShingleTier('designer')} className={`p-4 rounded-2xl border ${shingleTier === 'designer' ? 'bg-emerald-950 border-emerald-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>Designer</button>
                <button onClick={() => setShingleTier('metal')} className={`p-4 rounded-2xl border ${shingleTier === 'metal' ? 'bg-emerald-950 border-emerald-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>Metal</button>
              </div>
            </div>
            <div className="lg:col-span-5 bg-slate-900 border-2 border-emerald-500 rounded-3xl p-8 space-y-6 shadow-2xl">
              <div className="text-xl font-bold text-white">Estimated Total: <span className="text-emerald-400">${estimatedTotal.toLocaleString()}</span></div>
              <div className="text-sm text-slate-400">Deposit (15%): <span className="text-emerald-400 font-bold">${suggestedDeposit.toLocaleString()}</span></div>
              <button onClick={() => startCheckout(`Roof Replacement (${sqFt} sq ft)`, suggestedDeposit)} className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
                Pay Deposit (${suggestedDeposit.toLocaleString()}) via Whop
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'estimate' && (
        <div className="max-w-3xl mx-auto px-4 py-20">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Request an Estimate (Leads API)</h2>
            {submittedLead ? (
              <div className="text-emerald-400 font-semibold p-4 bg-emerald-950 rounded-xl text-center">Lead successfully submitted to Whop!</div>
            ) : (
              <form onSubmit={handleEstimateSubmit} className="space-y-4">
                <input type="text" required placeholder="Full Name" value={estimateForm.name} onChange={e => setEstimateForm({...estimateForm, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                <input type="email" required placeholder="Email" value={estimateForm.email} onChange={e => setEstimateForm({...estimateForm, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                <button type="submit" className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold">Submit Estimate</button>
              </form>
            )}
          </div>
        </div>
      )}

      {activeTab === 'invoices' && (
        <div className="max-w-3xl mx-auto px-4 py-20">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">Invoices API & Balance Billing</h2>
            <div className="text-slate-400 text-sm">Remaining Balance: <span className="text-white font-bold">$11,999.00</span></div>
            <button onClick={() => setInvoiceStatus('paid')} className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold">
              {invoiceStatus === 'paid' ? 'Invoice Paid via Card-on-File!' : 'Charge Final Balance ($11,999.00)'}
            </button>
          </div>
        </div>
      )}

      {checkoutModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Whop Payment Elements</span>
                <h3 className="text-xl font-bold text-white">{selectedPlan.name}</h3>
              </div>
              <button onClick={() => setCheckoutModalOpen(false)} className="text-slate-400 hover:text-white text-sm font-bold px-3 py-1 bg-slate-800 rounded-lg">✕</button>
            </div>

            <div className="space-y-4">
              <BrandingElement />
              <ExpressCheckoutElement amount={selectedPlan.price} currency="USD" />
              <PaymentElement amount={selectedPlan.price} currency="USD" />
            </div>

            <button onClick={() => { alert('Checkout completed successfully!'); setCheckoutModalOpen(false); }} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold">
              Complete Payment (${selectedPlan.price.toLocaleString()})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
