import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InvoiceForm from './InvoiceForm';

const Home = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const mockInvoices = [
    { id: 'RT3080', paymentDue: '19 Aug 2021', clientName: 'Jensen Huang', total: 1800.90, status: 'paid' },
    { id: 'XM9141', paymentDue: '20 Sep 2021', clientName: 'Alex Grim', total: 556.00, status: 'pending' },
    { id: 'RG0314', paymentDue: '01 Oct 2021', clientName: 'John Morrison', total: 14002.33, status: 'paid' },
    { id: 'RT2080', paymentDue: '12 Oct 2021', clientName: 'Alysa Werner', total: 102.04, status: 'pending' },
    { id: 'AA1449', paymentDue: '14 Oct 2021', clientName: 'Mellisa Clarke', total: 4032.33, status: 'pending' },
    { id: 'TY9141', paymentDue: '31 Oct 2021', clientName: 'Thomas Wayne', total: 6155.91, status: 'pending' },
    { id: 'FV2353', paymentDue: '12 Nov 2021', clientName: 'Anita Wainwright', total: 3102.04, status: 'draft' }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto pt-8 md:pt-16 pb-12 relative">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white tracking-[-1px]">
            Invoices
          </h1>
          <p className="text-slate-muted text-sm mt-1">
            <span className="hidden md:inline">There are </span>4 pending<span className="hidden md:inline"> invoices</span>
          </p>
        </div>

        <div className="flex items-center gap-4 md:gap-10">
          
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-3 font-bold text-slate-800 dark:text-white group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
              <span className="hidden md:inline">Filter by status</span>
              <span className="md:hidden">Filter</span>
              <span className="text-brand text-xs">▼</span>
            </div>
            
            <div className="absolute top-8 right-0 md:-left-4 w-48 bg-white dark:bg-[#252945] rounded-lg shadow-xl p-6 hidden group-hover:flex flex-col gap-4 z-20">
              {['Draft', 'Pending', 'Paid'].map((status) => (
                <label key={status} className="flex items-center gap-3 cursor-pointer group/box">
                  <div className="w-4 h-4 rounded-sm border border-transparent bg-slate-100 dark:bg-[#1E2139] group-hover/box:border-brand flex items-center justify-center transition-colors">
                    {status === 'Pending' && (
                      <div className="w-full h-full bg-brand rounded-sm flex items-center justify-center">
                        <svg width="10" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 4.5l2.124 2.124L8.97 1.28" stroke="#FFF" strokeWidth="2" fill="none" fillRule="evenodd"/></svg>
                      </div>
                    )}
                  </div>
                  <span className="font-bold text-slate-800 dark:text-white capitalize">{status}</span>
                </label>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center bg-brand hover:bg-brand-light transition-colors text-white rounded-full p-2 pr-4 md:pr-6 font-bold"
          >
            <div className="bg-white text-brand rounded-full w-8 h-8 flex items-center justify-center mr-2 md:mr-4">
              <span className="text-xl leading-none mb-1">+</span>
            </div>
            <span className="hidden md:inline">New Invoice</span>
            <span className="md:hidden">New</span>
          </button>
        </div>
      </div>

      {/* --- INVOICE LIST --- */}
      <div className="flex flex-col gap-4">
        {mockInvoices.map((invoice) => (
          <Link 
            to={`/invoice/${invoice.id}`} 
            key={invoice.id}
            className="flex flex-col md:flex-row md:items-center justify-between bg-white dark:bg-[#1E2139] p-6 rounded-lg shadow-sm border border-transparent hover:border-brand transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-center md:w-1/2 mb-4 md:mb-0">
              <span className="font-bold text-slate-800 dark:text-white">
                <span className="text-slate-muted">#</span>{invoice.id}
              </span>
              <span className="text-slate-muted text-sm md:ml-10">Due {invoice.paymentDue}</span>
              <span className="text-slate-muted text-sm md:ml-auto">{invoice.clientName}</span>
            </div>
            
            <div className="flex justify-between items-center md:w-1/2 md:justify-end gap-10">
              <span className="text-xl font-bold text-slate-800 dark:text-white">£ {invoice.total.toFixed(2)}</span>
              
              <div className="flex items-center gap-5">
                <div className={`flex items-center justify-center w-28 py-3 rounded-md font-bold capitalize
                  ${invoice.status === 'paid' ? 'text-[#33D69F] bg-[#33D69F]/10' : 
                    invoice.status === 'pending' ? 'text-[#FF8F00] bg-[#FF8F00]/10' : 
                    'text-[#373B53] dark:text-[#DFE3FA] bg-[#373B53]/10 dark:bg-[#DFE3FA]/10'}`}
                >
                  <div className={`w-2 h-2 rounded-full mr-2 
                    ${invoice.status === 'paid' ? 'bg-[#33D69F]' : 
                      invoice.status === 'pending' ? 'bg-[#FF8F00]' : 
                      'bg-[#373B53] dark:bg-[#DFE3FA]'}`}
                  ></div>
                  {invoice.status}
                </div>
                <span className="text-brand hidden md:block font-bold">›</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {isFormOpen && <InvoiceForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};

export default Home;