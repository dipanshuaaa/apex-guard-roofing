import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Wrench, 
  Home, 
  FileText, 
  CreditCard, 
  PhoneCall, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Star, 
  ArrowRight,
  Calculator,
  Lock,
  DollarSign
} from 'lucide-react';
import { loadWhop } from '@whop/elements';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [estimateForm, setEstimateForm] = useState({ name: '', email: '', phone: '', address: '', service: 'replacement', notes: '' });
  const [submittedLead, setSubmittedLead] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState('pending');

  // Track pixel events on mount & interactions
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
      window.whop.track('estimate_requested', { value: 0, currency: 'USD', email: estimateForm.email });
    }
    
    // Simulate Whop Leads API call
    try {
      // In production hosted on Whop, serverless routes or API calls post to Whop Leads API
      console.log('Posting lead to Whop Leads API:', estimateForm);
      setSubmittedLead(true);
    } catch (err) {
      console.error('Lead error', err);
    }
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
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-brand-600 to-emerald-700 text-white text-xs md:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4" />
        <span>Licensed & Insured US Roofing Contractor • $0 Down Financing Available via Klarna, Afterpay & Splitit • Powered by Whop</span>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-600/30">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block">ApexGuard Roofing</span>
              <span className="text-xs text-brand-400 font-medium">Restoration & Solar Solutions</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button onClick={() => setActiveTab('home')} className={`hover:text-white transition ${activeTab === 'home' ? 'text-brand-400 font-semibold' : ''}`}>Home</button>
            <button onClick={() => setActiveTab('services')} className={`hover:text-white transition ${activeTab === 'services' ? 'text-brand-400 font-semibold' : ''}`}>Services</button>
            <button onClick={() => setActiveTab('pricing')} className={`hover:text-white transition ${activeTab === 'pricing' ? 'text-brand-400 font-semibold' : ''}`}>Pricing & Plans</button>
            <button onClick={() => setActiveTab('financing')} className={`hover:text-white transition ${activeTab === 'financing' ? 'text-brand-400 font-semibold' : ''}`}>Financing</button>
            <button onClick={() => setActiveTab('invoices')} className={`hover:text-white transition ${activeTab === 'invoices' ? 'text-brand-400 font-semibold' : ''}`}>Invoices & Billing</button>
          </nav>
          <div className="flex items-center gap-4">
            <a href="#estimate" onClick={() => setActiveTab('estimate')} className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold shadow-lg shadow-brand-600/20 transition">
              Request Estimate
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      {activeTab === 'home' && (
        <div>
          {/* Hero Section */}
          <section className="relative overflow-hidden pt-20 pb-28 lg:pt-32 lg:pb-36 bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-950/80 border border-brand-500/30 text-brand-400 text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-brand-400" />
                    <span>Rated #1 US Roofing & Restoration Partner</span>
                  </div>
                  <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                    Protect Your Home With <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-300">Elite Roofing</span> & Zero-Hassle Financing.
                  </h1>
                  <p className="text-lg text-slate-300 max-w-2xl">
                    From 21-point storm inspections to full architectural shingle replacement and emergency leak repairs. Fully bonded, insured, and backed by Whop secure payments.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button onClick={() => setActiveTab('pricing')} className="px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold shadow-xl shadow-brand-600/30 flex items-center justify-center gap-2 transition">
                      View Inspection & Deposit Plans <ArrowRight className="w-4 h-4" />
                    </button>
                    <button onClick={() => setActiveTab('estimate')} className="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold flex items-center justify-center gap-2 transition">
                      Book Free Estimate
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80 text-slate-400 text-sm">
                    <div>
                      <div className="text-2xl font-bold text-white">15,000+</div>
                      <div>Roofs Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">50-Year</div>
                      <div>Manufacturer Warranty</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">4.9 / 5.0</div>
                      <div>Homeowner Rating</div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="bg-slate-900/95 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl relative">
                    <div className="absolute -top-3 right-6 bg-brand-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      Whop Verified
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Quick Quote & Deposit Flow</h3>
                    <p className="text-sm text-slate-400 mb-6">Experience our secure deposit → job → final invoice workflow.</p>
                    
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-white">1. Roof Inspection</div>
                          <div className="text-xs text-slate-400">21-point drone & physical audit</div>
                        </div>
                        <span className="text-brand-400 font-bold">$149</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-white">2. Project Deposit</div>
                          <div className="text-xs text-slate-400">Secures materials & crew schedule</div>
                        </div>
                        <span className="text-brand-400 font-bold">$500</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-white">3. Final Invoice & Billing</div>
                          <div className="text-xs text-slate-400">Auto-charge or manual payment</div>
                        </div>
                        <span className="text-brand-400 font-bold">Invoices API</span>
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('pricing')} className="w-full mt-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition text-sm">
                      Explore Plans & Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Financing Callout */}
          <section className="py-16 bg-slate-900/50 border-y border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Flexible Financing With Buy Now, Pay Later</h2>
              <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                Don't let roof damage wait. Approved homeowners get instant access to Klarna, Afterpay, Splitit, and Sezzle right through Whop Payment Elements.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 opacity-80 text-sm font-semibold text-slate-300">
                <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">Klarna. Pay in 4</span>
                <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">Afterpay Monthly</span>
                <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">Splitit 0% APR</span>
                <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">Apple Pay & Google Pay</span>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'services' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Our Professional Roofing Services</h2>
            <p className="text-slate-400">Every project is handled by certified master installers using GAF and Owens Corning lifetime materials.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4 hover:border-brand-500/50 transition">
              <div className="w-12 h-12 rounded-2xl bg-brand-950 text-brand-400 flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Full Roof Replacement</h3>
              <p className="text-slate-400 text-sm">Complete tear-off, premium underlayment, architectural shingles, and ridge vent installation with a 50-year warranty.</p>
              <button onClick={() => handleServiceView('replacement')} className="text-brand-400 text-sm font-semibold flex items-center gap-2 hover:underline">
                Select Plan <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4 hover:border-brand-500/50 transition">
              <div className="w-12 h-12 rounded-2xl bg-brand-950 text-brand-400 flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Storm & Leak Repair</h3>
              <p className="text-slate-400 text-sm">Rapid response emergency leak patching, flashing repair, and insurance claim assistance for hail and wind damage.</p>
              <button onClick={() => handleServiceView('repair')} className="text-brand-400 text-sm font-semibold flex items-center gap-2 hover:underline">
                Select Plan <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4 hover:border-brand-500/50 transition">
              <div className="w-12 h-12 rounded-2xl bg-brand-950 text-brand-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">21-Point Inspection</h3>
              <p className="text-slate-400 text-sm">Comprehensive drone thermal imaging and physical attic assessment to detect early decay, leaks, and structural stress.</p>
              <button onClick={() => handleServiceView('inspection')} className="text-brand-400 text-sm font-semibold flex items-center gap-2 hover:underline">
                Book Inspection ($149) <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pricing' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Transparent Pricing & Plans</h2>
            <p className="text-slate-400">Powered by Whop Payment Elements with built-in Apple Pay, Google Pay, and BNPL financing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan 1: Inspection */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300">One-Time Service</span>
                <h3 className="text-2xl font-bold text-white mt-4">21-Point Inspection</h3>
                <div className="text-3xl font-extrabold text-brand-400 my-4">$149</div>
                <p className="text-slate-400 text-sm mb-6">Complete drone and physical inspection report with photo documentation.</p>
                <ul className="space-y-3 text-sm text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Drone thermal imaging</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Attic & ventilation check</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Written estimate included</li>
                </ul>
              </div>
              <button onClick={() => startCheckout('21-Point Inspection', 149)} className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition">
                Book Inspection ($149)
              </button>
            </div>

            {/* Plan 2: Deposit */}
            <div className="bg-slate-900 border-2 border-brand-500 rounded-3xl p-8 flex flex-col justify-between relative shadow-xl shadow-brand-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                Most Popular • Setup Intent
              </div>
              <div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-950 text-brand-400">Project Deposit</span>
                <h3 className="text-2xl font-bold text-white mt-4">Roof Replacement Deposit</h3>
                <div className="text-3xl font-extrabold text-brand-400 my-4">$500</div>
                <p className="text-slate-400 text-sm mb-6">Secures your installation slot, material delivery, and saves card-on-file for final balance.</p>
                <ul className="space-y-3 text-sm text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Crew & schedule reservation</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Setup Intent (Card-on-File)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Final balance via Invoices API</li>
                </ul>
              </div>
              <button onClick={() => startCheckout('Roof Replacement Deposit', 500)} className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition">
                Pay Deposit ($500)
              </button>
            </div>

            {/* Plan 3: Flat-rate Repair */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300">Flat-Rate Service</span>
                <h3 className="text-2xl font-bold text-white mt-4">Standard Leak Repair</h3>
                <div className="text-3xl font-extrabold text-brand-400 my-4">$899</div>
                <p className="text-slate-400 text-sm mb-6">Up to 3 pipe boot replacements, shingle repair, and flashing resealing.</p>
                <ul className="space-y-3 text-sm text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Same-day dispatch available</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-400" /> 5-year leak-free guarantee</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Photos before & after</li>
                </ul>
              </div>
              <button onClick={() => startCheckout('Standard Leak Repair', 899)} className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition">
                Book Repair ($899)
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'estimate' && (
        <div className="max-w-3xl mx-auto px-4 py-20">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Request an Estimate</h2>
              <p className="text-slate-400 text-sm mt-2">Wired directly to the Whop Leads API. Our team contacts you within 2 hours.</p>
            </div>

            {submittedLead ? (
              <div className="bg-brand-950/60 border border-brand-500/40 p-6 rounded-2xl text-center space-y-4">
                <div className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center mx-auto text-white">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Estimate Request Received!</h3>
                <p className="text-slate-300 text-sm">Thank you, {estimateForm.name}. Your request has been logged as a lead in Whop. An inspector is reviewing your address.</p>
                <button onClick={() => setSubmittedLead(false)} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold">
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleEstimateSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={estimateForm.name} 
                      onChange={e => setEstimateForm({...estimateForm, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-brand-500 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={estimateForm.email} 
                      onChange={e => setEstimateForm({...estimateForm, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-brand-500 focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      value={estimateForm.phone} 
                      onChange={e => setEstimateForm({...estimateForm, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-brand-500 focus:outline-none"
                      placeholder="(555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Service Needed</label>
                    <select 
                      value={estimateForm.service} 
                      onChange={e => setEstimateForm({...estimateForm, service: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-brand-500 focus:outline-none"
                    >
                      <option value="replacement">Full Roof Replacement</option>
                      <option value="repair">Storm & Leak Repair</option>
                      <option value="inspection">21-Point Inspection ($149)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Property Address</label>
                  <input 
                    type="text" 
                    required 
                    value={estimateForm.address} 
                    onChange={e => setEstimateForm({...estimateForm, address: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-brand-500 focus:outline-none"
                    placeholder="123 Main St, Dallas, TX"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Project Notes / Damage Details</label>
                  <textarea 
                    rows={4} 
                    value={estimateForm.notes} 
                    onChange={e => setEstimateForm({...estimateForm, notes: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-brand-500 focus:outline-none"
                    placeholder="Describe any leaks, age of roof, or insurance claim details..."
                  ></textarea>
                </div>
                <button type="submit" className="w-full py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition text-sm shadow-xl shadow-brand-600/30">
                  Submit Estimate Request (Whop Leads API)
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {activeTab === 'invoices' && (
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8">
            <div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-950 text-brand-400">Whop Invoices API & Setup Intents</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">Post-Deposit Final Billing Workflow</h2>
              <p className="text-slate-400 text-sm mt-1">Demonstrating how the remaining balance is billed after project completion using saved payment methods.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Project #RF-8839</span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold">Deposit Paid ($500)</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-slate-400">Total Contract:</span><span className="text-white font-medium">$12,499.00</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-400">Deposit Paid:</span><span className="text-emerald-400 font-medium">-$500.00</span></div>
                  <div className="flex justify-between text-sm pt-2 border-t border-slate-800"><span className="text-white font-bold">Remaining Balance:</span><span className="text-brand-400 font-bold">$11,999.00</span></div>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-2">
                  <Lock className="w-3.5 h-3.5 text-brand-400" /> Card-on-file secured via Setup Intent
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Final Invoice Execution</h4>
                  <p className="text-xs text-slate-400">Trigger invoice collection via Whop Invoices API (`POST /api/v1/invoices`).</p>
                </div>
                {invoiceStatus === 'paid' ? (
                  <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold text-center">
                    Invoice #INV-2026-01 successfully charged to card-on-file ($11,999.00)!
                  </div>
                ) : (
                  <button 
                    onClick={() => setInvoiceStatus('paid')}
                    className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition"
                  >
                    Charge Final Balance ($11,999.00)
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal using Whop Payment Elements & BrandingElement */}
      {checkoutModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider">Whop Payment Elements</span>
                <h3 className="text-xl font-bold text-white">{selectedPlan.name}</h3>
              </div>
              <button onClick={() => setCheckoutModalOpen(false)} className="text-slate-400 hover:text-white text-sm font-bold px-3 py-1 bg-slate-800 rounded-lg">✕</button>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white">Total Due Now</div>
                <div className="text-xs text-slate-400">Includes secure checkout & BNPL options</div>
              </div>
              <div className="text-2xl font-extrabold text-brand-400">${selectedPlan.price}.00</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
              <div className="w-12 h-12 bg-brand-950 text-brand-400 rounded-full flex items-center justify-center mx-auto">
                <CreditCard className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Whop Hosted Checkout & Express Elements</h4>
              <p className="text-xs text-slate-400">
                In production, Whop Payment Elements, ExpressCheckoutElement (Apple Pay / Google Pay), and BrandingElement render here securely.
              </p>
              <button 
                onClick={() => {
                  alert(`Successfully processed payment for ${selectedPlan.name} ($${selectedPlan.price}) via Whop Payments!`);
                  setCheckoutModalOpen(false);
                }}
                className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition"
              >
                Complete Secure Checkout (${selectedPlan.price})
              </button>
            </div>

            <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <Lock className="w-3.5 h-3.5" /> PCI-DSS Level 1 Certified • Powered by Whop
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">A</div>
            <span className="font-bold text-white">ApexGuard Roofing & Restoration</span>
          </div>
          <div>
            <span>Live on Whop Websites • Built for High-Ticket Roofing Contractors</span>
          </div>
          <div className="text-xs text-slate-500">
            © 2026 ApexGuard Roofing. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
