import React, { useState, useContext, useRef } from 'react';
import { InvoiceContext } from '../context/InvoiceContext';

const InvoiceForm = ({ onClose, invoice }) => {
  const isEditMode = Boolean(invoice);
  
  // 1. Pull BOTH add and update functions from the Brain
  const { addInvoice, updateInvoice } = useContext(InvoiceContext);
  
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});

  // 2. TRUE EDIT MODE: Fallback to empty strings if making a new invoice
  const invoiceId = invoice?.id || '';
  const streetAddress = invoice?.streetAddress || '';
  const city = invoice?.city || '';
  const postCode = invoice?.postCode || '';
  const country = invoice?.country || '';
  const clientName = invoice?.clientName || '';
  const clientEmail = invoice?.clientEmail || '';
  const clientStreetAddress = invoice?.clientStreetAddress || '';
  const clientCity = invoice?.clientCity || '';
  const clientPostCode = invoice?.clientPostCode || '';
  const clientCountry = invoice?.clientCountry || '';
  const invoiceDate = invoice?.invoiceDate || ''; 
  const paymentTerms = invoice?.paymentTerms || 'Net 14 Days';
  const projectDescription = invoice?.projectDescription || '';

  // 3. DYNAMIC ITEMS STATE
  // If editing, load the existing items. If new, start with an empty array.
  const [items, setItems] = useState(invoice?.items || []);

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), name: '', quantity: 1, price: 0, total: 0 }]);
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        // Auto-calculate the total when quantity or price changes
        if (field === 'quantity' || field === 'price') {
          updatedItem.total = Number(updatedItem.quantity) * Number(updatedItem.price);
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  // Helper to calculate the grand total of the whole invoice
  const calculateGrandTotal = () => {
    return items.reduce((acc, item) => acc + Number(item.total), 0);
  };

  // 4. SUBMIT LOGIC (Validation + Save & Send / Update)
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    const formData = new FormData(formRef.current);
    const newErrors = {};
    
    // Strict Validation
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

    // Make sure they added at least one item
    if (items.length === 0) {
      newErrors.items = "You must add at least 1 item";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      document.querySelector('.custom-scrollbar').scrollTo({ top: 0, behavior: 'smooth' });
      return; 
    }

    setErrors({});
    
    const rawDate = formData.get('invoiceDate');
    const formattedDate = rawDate ? new Date(rawDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Pending';

    const finalInvoice = {
      id: isEditMode ? invoiceId : Math.random().toString(36).substring(2, 8).toUpperCase(),
      paymentDue: formattedDate,
      clientName: formData.get('clientName'),
      total: calculateGrandTotal(), 
      status: isEditMode ? invoice.status : 'pending',
      items: items // Save the dynamic items array!
    };

    if (isEditMode) {
      updateInvoice(finalInvoice.id, finalInvoice);
    } else {
      addInvoice(finalInvoice);
    }
    
    onClose(); 
  };

  // 5. SAVE AS DRAFT LOGIC (Bypasses Validation!)
  const handleSaveAsDraft = () => {
    const formData = new FormData(formRef.current);
    const rawDate = formData.get('invoiceDate');
    const formattedDate = rawDate ? new Date(rawDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Pending';

    const draftInvoice = {
      id: Math.random().toString(36).substring(2, 8).toUpperCase(),
      paymentDue: formattedDate,
      clientName: formData.get('clientName') || 'Unknown Client',
      total: calculateGrandTotal(),
      status: 'draft',
      items: items
    };

    addInvoice(draftInvoice);
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

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          
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

              {/* --- DYNAMIC ITEM LIST --- */}
              <section>
                <h3 className="text-[#777F98] font-bold text-xl mb-6">Item List</h3>
                
                {errors.items && <p className="text-red-500 text-sm font-bold mb-4">{errors.items}</p>}

                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-[1fr_1fr_1fr_auto] md:grid-cols-[2fr_0.5fr_1fr_1fr_auto] gap-4 items-center">
                      <div className="col-span-4 md:col-span-1">
                        <label className="text-slate-muted text-sm block md:hidden mb-2">Item Name</label>
                        <input 
                          type="text" 
                          value={item.name} 
                          onChange={(e) => handleItemChange(item.id, 'name', e.target.value)} 
                          className="w-full p-4 border border-slate-200 dark:border-[#252945] bg-white dark:bg-[#1E2139] rounded-md font-bold text-slate-800 dark:text-white focus:outline-none focus:border-brand" 
                        />
                      </div>
                      <div>
                        <label className="text-slate-muted text-sm block md:hidden mb-2">Qty.</label>
                        <input 
                          type="number" 
                          value={item.quantity} 
                          onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)} 
                          className="w-full p-4 border border-slate-200 dark:border-[#252945] bg-white dark:bg-[#1E2139] rounded-md font-bold text-slate-800 dark:text-white focus:outline-none focus:border-brand text-center" 
                        />
                      </div>
                      <div>
                        <label className="text-slate-muted text-sm block md:hidden mb-2">Price</label>
                        <input 
                          type="number" 
                          value={item.price} 
                          onChange={(e) => handleItemChange(item.id, 'price', e.target.value)} 
                          className="w-full p-4 border border-slate-200 dark:border-[#252945] bg-white dark:bg-[#1E2139] rounded-md font-bold text-slate-800 dark:text-white focus:outline-none focus:border-brand" 
                        />
                      </div>
                      <div>
                        <label className="text-slate-muted text-sm block md:hidden mb-2">Total</label>
                        <div className="p-4 font-bold text-slate-500 dark:text-slate-300">
                          {item.total.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex items-center justify-center mt-6 md:mt-0">
                        <button type="button" onClick={() => handleDeleteItem(item.id)} className="text-[#888EB0] hover:text-red-500 transition-colors p-2">
                          <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.026 0h4.447z" fill="currentColor" fillRule="nonzero"/></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button type="button" onClick={handleAddItem} className="w-full mt-4 bg-slate-100 dark:bg-[#252945] hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-[#7E88C3] font-bold py-4 rounded-full">
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
                  {/* --- NEW: Attached the Draft function! --- */}
                  <button type="button" onClick={handleSaveAsDraft} className="px-4 md:px-6 py-4 rounded-full font-bold text-slate-muted bg-[#373B53] text-white hover:bg-[#0C0E16] transition-colors">
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