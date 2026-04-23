import React, { useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import InvoiceForm from './InvoiceForm';
import { InvoiceContext } from '../context/InvoiceContext'; // 1. Import the Brain

const InvoiceDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); // 2. The tool to change pages
  
  // 3. Grab the delete function and the data from Context
  const { invoices, deleteInvoice } = useContext(InvoiceContext);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  // Find the exact invoice we are looking at
  const invoice = invoices.find(inv => inv.id === id);

  // If someone types a bad ID in the URL, tell them it's missing
  if (!invoice) {
    return (
      <div className="w-full max-w-3xl mx-auto pt-16 text-center text-slate-800 dark:text-white font-bold text-2xl">
        Invoice not found! 
        <Link to="/" className="block text-brand mt-4 text-base">Go back home</Link>
      </div>
    );
  }

  // 4. THE MAGIC FUNCTION
  const handleDelete = () => {
    deleteInvoice(invoice.id); // Erase it from memory
    navigate('/'); // Send the user back to the home screen
  };

  return (
    <div className="w-full max-w-3xl mx-auto pt-8 md:pt-16 pb-12 relative">
      
      <Link to="/" className="flex items-center gap-4 text-slate-800 dark:text-white font-bold mb-8 hover:text-slate-muted transition-colors w-fit">
        <span className="text-brand text-xl pb-1">‹</span> Go back
      </Link>

      <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-[#1E2139] rounded-lg shadow-sm p-6 mb-6 transition-colors">
        <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0 gap-4">
          <span className="text-slate-muted">Status</span>
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
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <button onClick={() => setIsEditFormOpen(true)} className="px-6 py-3 rounded-full font-bold text-slate-muted bg-slate-100 dark:bg-[#252945] hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            Edit
          </button>
          <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 rounded-full font-bold text-white bg-red-500 hover:bg-red-400 transition-colors">
            Delete
          </button>
          <button className="px-6 py-3 rounded-full font-bold text-white bg-brand hover:bg-brand-light transition-colors">
            Mark as Paid
          </button>
        </div>
      </div>

      {/* Invoice Details Card - NOW USING REAL DATA */}
      <div className="bg-white dark:bg-[#1E2139] rounded-lg shadow-sm p-6 md:p-12 transition-colors">
        <div className="flex flex-col md:flex-row justify-between items-start mb-10">
          <div className="mb-8 md:mb-0">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              <span className="text-slate-muted">#</span>{invoice.id}
            </h1>
            <p className="text-slate-muted text-sm">Graphic Design</p>
          </div>
          <div className="flex flex-col text-left md:text-right text-slate-muted text-sm leading-relaxed">
            <span>19 Union Terrace</span>
            <span>London</span>
            <span>E1 3EZ</span>
            <span>United Kingdom</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-24 mb-12">
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-slate-muted text-sm mb-3">Invoice Date</p>
              <p className="text-slate-800 dark:text-white font-bold text-xl">21 Aug 2021</p>
            </div>
            <div>
              <p className="text-slate-muted text-sm mb-3">Payment Due</p>
              <p className="text-slate-800 dark:text-white font-bold text-xl">{invoice.paymentDue}</p>
            </div>
          </div>

          <div>
            <p className="text-slate-muted text-sm mb-3">Bill To</p>
            <p className="text-slate-800 dark:text-white font-bold text-xl mb-2">{invoice.clientName}</p>
            <div className="flex flex-col text-slate-muted text-sm leading-relaxed">
              <span>84 Church Way</span>
              <span>Bradford</span>
              <span>BD1 9PB</span>
              <span>United Kingdom</span>
            </div>
          </div>

          <div>
            <p className="text-slate-muted text-sm mb-3">Sent to</p>
            <p className="text-slate-800 dark:text-white font-bold text-xl">alexgrim@mail.com</p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-[#252945] rounded-t-lg p-6 md:p-8 transition-colors">
          <div className="hidden md:grid grid-cols-5 text-slate-muted text-sm mb-6">
            <span className="col-span-2">Item Name</span>
            <span className="text-center">QTY.</span>
            <span className="text-right">Price</span>
            <span className="text-right">Total</span>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-5 items-center font-bold text-slate-800 dark:text-white mb-6">
            <div className="col-span-2 w-full flex justify-between md:block mb-2 md:mb-0">
              <span>Banner Design</span>
              <span className="md:hidden">£ {invoice.total.toFixed(2)}</span>
            </div>
            <span className="w-full md:w-auto text-slate-muted md:text-center text-sm md:text-base">1</span>
            <span className="hidden md:block text-slate-muted text-right">£ {invoice.total.toFixed(2)}</span>
            <span className="hidden md:block text-right">£ {invoice.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-slate-800 dark:bg-[#0C0E16] rounded-b-lg p-6 md:p-8 flex justify-between items-center text-white transition-colors">
          <span className="text-sm">Amount Due</span>
          <span className="text-2xl md:text-3xl font-bold">£ {invoice.total.toFixed(2)}</span>
        </div>
      </div>

      {/* DELETE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 transition-opacity">
          <div className="bg-white dark:bg-[#1E2139] rounded-lg p-8 md:p-12 max-w-md w-full shadow-xl">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Confirm Deletion</h2>
            <p className="text-slate-muted text-sm leading-relaxed mb-8">
              Are you sure you want to delete invoice #{invoice.id}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-full font-bold text-slate-muted bg-slate-100 dark:bg-[#252945] hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                Cancel
              </button>
              {/* 5. ATTACH THE FUNCTION TO THE BUTTON */}
              <button onClick={handleDelete} className="px-6 py-3 rounded-full font-bold text-white bg-red-500 hover:bg-red-400 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT FORM */}
      {isEditFormOpen && (
        <InvoiceForm onClose={() => setIsEditFormOpen(false)} invoice={invoice} />
      )}
    </div>
  );
};

export default InvoiceDetail;