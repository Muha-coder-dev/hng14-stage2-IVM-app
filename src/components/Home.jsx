import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import InvoiceForm from './InvoiceForm';
import { InvoiceContext } from '../context/InvoiceContext'; // 1. Import the Brain

const Home = () => {
  // 2. Pull the REAL global data instead of mocks
  const { invoices } = useContext(InvoiceContext);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // 3. The Filter State (null means "show all")
  const [filterStatus, setFilterStatus] = useState(null);

  // 4. Toggle the filter on and off
  const handleFilterClick = (status) => {
    const lowerStatus = status.toLowerCase();
    // If it's already clicked, turn it off. Otherwise, set it to the new status.
    setFilterStatus((prevStatus) => (prevStatus === lowerStatus ? null : lowerStatus));
  };

  // 5. Apply the filter before mapping to the screen
  const filteredInvoices = filterStatus
    ? invoices.filter((invoice) => invoice.status === filterStatus)
    : invoices;

  return (
    <div className="w-full max-w-3xl mx-auto pt-8 md:pt-16 pb-12 relative">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white tracking-[-1px]">
            Invoices
          </h1>
          {/* Dynamic Invoice Counter */}
          <p className="text-slate-muted text-sm mt-1">
            <span className="hidden md:inline">There are </span>
            {filteredInvoices.length} {filterStatus ? filterStatus : 'total'}
            <span className="hidden md:inline"> invoices</span>
          </p>
        </div>

        <div className="flex items-center gap-4 md:gap-10">
          
          <div className="relative group cursor-pointer z-20">
            <div className="flex items-center gap-3 font-bold text-slate-800 dark:text-white group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
              <span className="hidden md:inline">
                {filterStatus ? `Filtering: ${filterStatus}` : 'Filter by status'}
              </span>
              <span className="md:hidden">Filter</span>
              <span className="text-brand text-xs">▼</span>
            </div>
            
            <div className="absolute top-8 right-0 md:-left-4 w-48 bg-white dark:bg-[#252945] rounded-lg shadow-xl p-6 hidden group-hover:flex flex-col gap-4">
              {['Draft', 'Pending', 'Paid'].map((status) => {
                const isSelected = filterStatus === status.toLowerCase();
                return (
                  <div 
                    key={status} 
                    onClick={() => handleFilterClick(status)} 
                    className="flex items-center gap-3 cursor-pointer group/box"
                  >
                    <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors
                      ${isSelected 
                        ? 'bg-brand border-brand' 
                        : 'border-transparent bg-slate-100 dark:bg-[#1E2139] group-hover/box:border-brand'}`}
                    >
                      {isSelected && (
                        <svg width="10" height="8" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.5 4.5l2.124 2.124L8.97 1.28" stroke="#FFF" strokeWidth="2" fill="none" fillRule="evenodd"/>
                        </svg>
                      )}
                    </div>
                    <span className="font-bold text-slate-800 dark:text-white capitalize">{status}</span>
                  </div>
                );
              })}
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
        {/* Map the FILTERED array, not the mock array! */}
        {filteredInvoices.map((invoice) => (
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

      {/* Empty State (Optional but nice to have) */}
      {filteredInvoices.length === 0 && (
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mt-8 mb-4">There is nothing here</h2>
          <p className="text-slate-muted">Create a new invoice by clicking the <br/> <span className="font-bold">New Invoice</span> button and get started</p>
        </div>
      )}

      {isFormOpen && <InvoiceForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};

export default Home;