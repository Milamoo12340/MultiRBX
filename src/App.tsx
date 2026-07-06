import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HomePage from '@/pages/HomePage'
import MethodsPage from '@/pages/MethodsPage'
import ScriptGeneratorPage from '@/pages/ScriptGeneratorPage'
import AccountManagerPage from '@/pages/AccountManagerPage'
import SafetyPage from '@/pages/SafetyPage'
import SandboxPage from '@/pages/SandboxPage'
import MacPage from '@/pages/MacPage'
import NotFoundPage from '@/pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/methods" element={<MethodsPage />} />
          <Route path="/scripts" element={<ScriptGeneratorPage />} />
          <Route path="/accounts" element={<AccountManagerPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/sandbox" element={<SandboxPage />} />
          <Route path="/mac" element={<MacPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
