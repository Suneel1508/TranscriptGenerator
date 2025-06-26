import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import TranscriptForm from './pages/TranscriptForm'
import AdminPanel from './pages/AdminPanel'
import { TranscriptProvider } from './context/TranscriptContext'

function App() {
  return (
    <TranscriptProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<TranscriptForm />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TranscriptProvider>
  )
}

export default App