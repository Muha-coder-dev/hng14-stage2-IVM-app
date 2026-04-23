import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import InvoiceDetail from './components/InvoiceDetail';
import Home from './components/Home'; 
// 1. WE IMPORT THE BRAIN HERE
import { InvoiceProvider } from './context/InvoiceContext';

function App() {
  return (
    // 2. WE WRAP THE ENTIRE APP IN THE PROVIDER
    <InvoiceProvider>
      <Router>
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300 flex flex-col md:flex-row font-sans">
          
          <Sidebar />

          <main className="flex-1 flex justify-center mt-20 md:mt-0 md:ml-24">
            <div className="w-full pt-8 px-6 md:pt-16 max-w-4xl">
              <Routes>
                {/* Point the root path to our new Home component */}
                <Route path="/" element={<Home />} />
                <Route path="/invoice/:id" element={<InvoiceDetail />} /> 
              </Routes>
            </div>
          </main>

        </div>
      </Router>
    </InvoiceProvider>
  );
}

export default App;