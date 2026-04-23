import React, { useState, useContext } from 'react';
import { InvoiceContext } from '../context/InvoiceContext';

const InvoiceForm = ({ onClose, invoice }) => {
  const isEditMode = Boolean(invoice);
  const { addInvoice } = useContext(InvoiceContext);
  
  // 1. The Error State
  const [errors, setErrors] = useState({});

  const invoiceId = invoice?.id || '';
  const streetAddress = isEditMode ? '19 Union Terrace' : '';
  const city = isEditMode ? 'London' : '';
  const postCode = isEditMode ? 'E1 3EZ' : '';
  const country = isEditMode ? 'United Kingdom' : '';
  const clientName = isEditMode ? 'Alex Grim' : '';
  const clientEmail = isEditMode ? 'alexgrim@mail.com' : '';
  const clientStreetAddress = isEditMode ? '84 Church Way' : '';
  const clientCity = isEditMode ? 'Bradford' : '';
  const clientPostCode = isEditMode ? 'BD1 9PB' : '';
  const clientCountry = isEditMode ? 'United Kingdom' : '';
  const invoiceDate = isEditMode ? '2021-08-21' : ''; 
  const paymentTerms = isEditMode ? 'Net 30 Days' : 'Net 14 Days';
  const projectDescription = isEditMode ? 'Graphic Design' : '';

  // 2. Real-Time Error Clearing (Removes red border when user types)
  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  // 3. The Submit & Validation Logic
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    const formData = new FormData(e.target);
    const newErrors = {};
    
    // We check every single required field here
    const fieldsToCheck = [
      'streetAddress', 'city', 'postCode', 'country',
      'clientName', 'clientEmail', 'clientStreetAddress', 'clientCity', 'clientPostCode', 'clientCountry',
      'projectDescription'
    ];

    fieldsToCheck.forEach(field => {
      const value = formData.get(field); 
      if (!value || value.toString().trim() === '') {
        newErrors[field] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Automatically scroll to the top so the user sees the errors
      document.querySelector('.custom-scrollbar').scrollTo({ top: 0, behavior: 'smooth' });
      return; 
    }

    setErrors({});
    
    // Create the New Invoice
    const rawDate = formData.get('invoiceDate');
    const formattedDate = rawDate ? new Date(rawDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Pending';

    const newInvoice = {
      id: Math.random().toString(36).substring(2, 8).toUpperCase(),
      paymentDue: formattedDate,
      clientName: formData.get('clientName'),
      total: Math.floor(Math.random() * 1000) + 100, 
      status: 'pending'
    };

    addInvoice(newInvoice);
    onClose(); 
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose}></div>

      <div className="fixed top-0 left-0 md:left-24 w-full md:w-[716px] h-screen bg-white dark:bg-[#141625] z-50 md:rounded-r-[3rem] flex flex-col shadow-2xl overflow-hidden transition-colors">
        
        <div className="px-6 py-8 md:px-14 md:py-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
            {isEditMode ? <>Edit <span className="text-slate-muted">#</span>{invoiceId}</> : 'New Invoice'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          
          <div className="flex-1 overflow-y-auto px-6 md:px-14 pb-8 pr-4 md:pr-10 custom-scrollbar">
            <div className="flex flex-col gap-12">
              
              {/* --- BILL FROM SECTION --- */}
              <section>
                <h3 className="text-brand font-bold text-sm mb-6">Bill From</h3>
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="flex justify-between items-center pb-2">
                      <label className={`text-sm block transition-colors ${errors.streetAddress ? 'text-red-500' : 'text-slate-muted'}`}>Street Address</label>
                      {errors.streetAddress && <span className="text-xs font-semibold text-red-500">can't be empty</span>}
                    </div>
                    <input type="text" name="streetAddress" defaultValue={streetAddress} onChange={() => clearError('streetAddress')} className={`w-full p-4 border bg-white dark:bg-[#1E2139] rounded-md font-bold text-slate-800 dark:text-white focus:outline-none transition-colors ${errors.streetAddress ? 'border-red-500' : 'border-slate-200 dark:border-[#252945] focus:border-brand'}`} />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex justify-between items-center pb-2">
                        <label className={`text-sm block transition-colors ${errors.city ? 'text-red-500' : 'text-slate-muted'}`}>City</label>
                      </div>
                      <input type="text" name="city" defaultValue={city} onChange={() => clearError('city')} className={`w-full p-4 border bg-white dark:bg-[#1E2139] rounded-md font-bold text-slate-800 dark:text-white focus:outline-none transition-colors ${errors.city ? 'border-red-500' : 'border-slate-200 dark:border-[#252945] focus:border-brand'}`} />
                    </div>
                    <div>
                      <div className="flex justify-between items-center pb-2">
                        <label className={`text-sm block transition-colors ${errors.postCode ? 'text-red-500' : 'text-slate-muted'}`}>Post Code</label>
                      </div>
                      <input type="text" name="postCode" defaultValue={postCode} onChange={() => clearError('postCode')} className={`w-full p-4 border bg-white dark:bg-[#1E2139] rounded-md font-bold text-slate-800 dark:text-white focus:outline-none transition-colors ${errors.postCode ? 'border-red-500' : 'border-slate-200 dark:border-[#252945] focus:border-brand'}`} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <div className="flex justify-between items-center pb-2">
                        <label className={`text-sm block transition-colors ${errors.country ? 'text-red-500' : 'text-slate-muted'}`}>Country</label>
                      </div>
                      <input type="text" name="country" defaultValue={country} onChange={() => clearError('country')} className={`w-full p-4 border bg-white dark:bg-[#1E2139] rounded-md font-bold text-slate-800 dark:text-white focus:outline-none transition-colors ${errors.country ? 'border-red-500' : 'border-slate-200 dark:border-[#252945] focus:border-brand'}`} />
                    </div>
                  </div>
                </div>
              </section>

              {/* --- BILL TO SECTION --- */}
              <section>
                <h3 className="text-brand font-bold text-sm mb-6">Bill To</h3>
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="flex justify-between items-center pb-2">
                      <label className={`text-sm block transition-colors ${errors.clientName ? 'text-red-500' : 'text-slate-muted'}`}>Client's Name</label>
                      {errors.clientName && <span className="text-xs font-semibold text-red-500">can't be empty</span>}
                    </div>
                    <input type="text" name="clientName" defaultValue={clientName} onChange={() => clearError('clientName')} className={`w-full p-4 border bg-white dark:bg-[#1E2139] rounded-md font-bold text-slate-800 dark:text-white focus:outline-none transition-colors ${errors.clientName ? 'border-red-500' : 'border-slate-200 dark:border-[#252945] focus:border-brand'}`} />
                  </div>

                  <div>
                    <div className="flex justify-between items-center pb-2">
                      <label className={`text-sm block transition-colors ${errors.clientEmail ? 'text-red-500' : 'text-slate-muted'}`}>Client's Email</label>
                      {errors.clientEmail && <span className="text-xs font-semibold text-red-500">can't be empty</span>}
                    </div>
                    <input type="email" name="clientEmail" defaultValue={clientEmail} onChange={() => clearError('clientEmail')} className={`w-full p-4 border bg-white dark:bg-[#1E2139] rounded-md font-bold text-slate-800 dark:text-white focus:outline-none transition-colors ${errors.clientEmail ? 'border-red-500' : 'border-slate-200 dark:border-[#252945] focus:border-brand'}`} />
                  </div>

                  <div>
                    <div className="flex justify-between items-center pb-2">
                      <label className={`text-sm block transition-colors ${errors.clientStreetAddress ? 'text-red-500' : 'text-slate-muted'}`}>Street Address</label>
                      {errors.clientStreetAddress && <span className="text-xs font-semibold text-red-500">can't be empty</span>}
                    </div>
                    <input type="text" name="clientStreetAddress" defaultValue={clientStreetAddress} onChange={() => clearError('clientStreetAddress')} className={`w-full p-4 border bg-white dark:bg-[#1E2139] rounded-md font-bold text-slate-800 dark:text-white focus:outline-none transition-colors ${errors.clientStreetAddress ? 'border-red-500' : 'border-slate-200 dark:border-[#252945] focus:border-brand'}`} />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex justify-between items-center pb-2">
                        <label className={`text-sm block transition-colors ${errors.clientCity ? 'text-red-500' : 'text-slate-muted'}`}>City</label>
                      </div>
                      <input type="text" name="clientCity" defaultValue={clientCity} onChange={() => clearError('clientCity')} className={`w-full p-4 border bg-white dark:bg-[#1E2139] rounded-md font-bold text-slate-800 dark:text-white focus:outline-none transition-colors ${errors.clientCity ? 'border-red-500' : 'border-slate-200 dark:border-[#252945] focus:border-brand'}`} />
                    </div>
                    <div>
                      <div className="flex justify-between items-center pb-2">
                        <label className={`text-sm block transition-colors ${errors.clientPostCode ? 'text-red-500' : 'text-slate-muted'}`}>Post Code</label>
                      </div>
                      <input type="text" name="clientPostCode" defaultValue={clientPostCode} onChange={() => clearError('clientPostCode')} className={`w-full p-4 border bg-white dark:bg-[#1E2139] rounded-md font-bold text-slate-800 dark:text-white focus:outline-none transition-colors ${errors.clientPostCode ? 'border-red-500' : 'border-slate-200 dark:border-[#252945] focus:border-brand'}`} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <div className="flex justify-between items-center pb-2">
                        <label className={`text-sm block transition-colors ${errors.clientCountry ? 'text-red-500' : 'text-slate-muted'}`}>Country</label>
                      </div>
                      <input type="text" name="clientCountry" defaultValue={clientCountry} onChange={() => clearError('clientCountry')} className={`w-full p-4 border bg-white dark:bg-[#1E2139] rounded-md font-bold text-slate-800 dark:text-white focus:outline-none transition-colors ${errors.clientCountry ? 'border-red-500' : 'border-slate-200 dark:border-[#252945] focus:border-brand'}`} />
                    </div>
                  </div>
                </div>
              </section>

              {/* --- DETAILS SECTION --- */}
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-slate-muted text-sm pb-2 block">Invoice Date</label>
                    <input type="date" name="invoiceDate" defaultValue={invoiceDate} className="w-full p-4 border border-slate-200 dark:border-[#252945] bg-white dark:bg-[#1E2139] rounded-md font-bold text-slate-800 dark:text-white focus:outline-none focus:border-brand transition-colors cursor-pointer" />
                  </div>
                  <div className="relative">
                    <label className="text-slate-muted text-sm pb-2 block">Payment Terms</label>
                    <select name="paymentTerms" defaultValue={paymentTerms} className="w-full p-4 border border-slate-200 dark:border-[#252945] bg-white dark:bg-[#1E2139] rounded-md font-bold text-slate-800 dark:text-white focus:outline-none focus:border-brand transition-colors cursor-pointer appearance-none">
                      <option>Net 1 Day</option>
                      <option>Net 7 Days</option>
                      <option>Net 14 Days</option>
                      <option>Net 30 Days</option>
                    </select>
                    <span className="absolute right-5 top-[58px] text-brand pointer-events-none">▼</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center pb-2">
                    <label className={`text-sm block transition-colors ${errors.projectDescription ? 'text-red-500' : 'text-slate-muted'}`}>Project Description</label>
                    {errors.projectDescription && <span className="text-xs font-semibold text-red-500">can't be empty</span>}
                  </div>
                  <input type="text" name="projectDescription" defaultValue={projectDescription} onChange={() => clearError('projectDescription')} className={`w-full p-4 border bg-white dark:bg-[#1E2139] rounded-md font-bold text-slate-800 dark:text-white focus:outline-none transition-colors ${errors.projectDescription ? 'border-red-500' : 'border-slate-200 dark:border-[#252945] focus:border-brand'}`} />
                </div>
              </section>

              {/* --- ITEM LIST --- */}
              <section>
                <h3 className="text-[#777F98] font-bold text-xl mb-6">Item List</h3>
                <button type="button" className="w-full mt-4 bg-slate-100 dark:bg-[#252945] hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-[#7E88C3] font-bold py-4 rounded-full">
                  + Add New Item
                </button>
              </section>
            </div>
          </div>

          {/* --- FIXED FOOTER --- */}
          <div className="px-6 py-6 md:px-14 bg-white dark:bg-[#141625] flex items-center shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] z-10 transition-colors">
            {isEditMode ? (
              <div className="flex justify-end gap-2 md:gap-4 w-full">
                <button type="button" onClick={onClose} className="px-6 py-4 rounded-full font-bold text-slate-muted bg-slate-100 dark:bg-[#252945] hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 md:px-6 py-4 rounded-full font-bold text-white bg-brand hover:bg-brand-light transition-colors">
                  Save Changes
                </button>
              </div>
            ) : (
              <>
                <button type="button" onClick={onClose} className="px-6 py-4 rounded-full font-bold text-slate-muted bg-slate-100 dark:bg-[#252945] hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors mr-auto">
                  Discard
                </button>
                <div className="flex gap-2 md:gap-4">
                  <button type="button" className="px-4 md:px-6 py-4 rounded-full font-bold text-slate-muted bg-[#373B53] text-white hover:bg-[#0C0E16] transition-colors">
                    Save as Draft
                  </button>
                  <button type="submit" className="px-4 md:px-6 py-4 rounded-full font-bold text-white bg-brand hover:bg-brand-light transition-colors">
                    Save & Send
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default InvoiceForm;