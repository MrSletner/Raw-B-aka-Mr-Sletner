import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';
import BottomNav from './components/BottomNav';
import AudioPlayer from './components/AudioPlayer';
import HomePage from './pages/HomePage';
import MusicPage from './pages/MusicPage';
import MediaPage from './pages/MediaPage';
import RemixCenter from './pages/RemixCenter';
import SupportPage from './pages/SupportPage';
import Header from './components/Header';

function App() {
  return (
    <AudioPlayerProvider>
      <BrowserRouter>
        <div className="bg-brand-bg text-brand-light min-h-screen font-sans flex flex-col max-w-lg mx-auto border-x border-white/10">
          <main className="flex-grow pb-20">
             <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/music" element={<MusicPage />} />
                <Route path="/remix" element={<RemixCenter />} />
                <Route path="/media" element={<MediaPage />} />
                <Route path="/support" element={<SupportPage />} />
            </Routes>
          </main>
          <BottomNav />
          <AudioPlayer />
        </div>
      </BrowserRouter>
    </AudioPlayerProvider>
  );
}

export default App;