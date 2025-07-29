import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Music, Play, Square, RotateCcw, FolderOpen, Settings, Loader2 } from 'lucide-react';
import SamplePad from './SamplePad';
import SequencerGrid from './SequencerGrid';
import ProjectManager from './ProjectManager';
import { EnhancedSoundKitManager } from './EnhancedSoundKitManager';

const DrumSampler = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [bpm, setBpm] = useState([120]);
  const [sequence, setSequence] = useState<boolean[][]>(
    Array(16).fill(null).map(() => Array(16).fill(false))
  );
  const [samples, setSamples] = useState<{[key: string]: HTMLAudioElement | null}>({});
  const [volumes, setVolumes] = useState<number[]>(Array(16).fill(75));
  const [showKitManager, setShowKitManager] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingKit, setLoadingKit] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const audioContextRef = useRef<AudioContext>();

  const pads = Array(16).fill(null).map((_, i) => ({
    id: `pad${i + 1}`,
    name: `Pad ${i + 1}`,
    color: [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
      'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-indigo-500',
      'bg-teal-500', 'bg-gray-500', 'bg-cyan-500', 'bg-lime-500',
      'bg-rose-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500'
    ][i]
  }));

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => audioContextRef.current?.close();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = (prev + 1) % 16;
          playSequenceStep(nextStep);
          return nextStep;
        });
      }, (60 / bpm[0]) * 250);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, bpm, sequence]);

  const playSequenceStep = (step: number) => {
    pads.forEach((pad, padIndex) => {
      if (sequence[padIndex][step]) {
        playPad(pad.id, padIndex);
      }
    });
  };

  const playPad = async (padId: string, padIndex?: number) => {
    const audio = samples[padId];
    const volumeIndex = padIndex ?? pads.findIndex(p => p.id === padId);
    if (audio && volumeIndex >= 0) {
      try {
        audio.volume = volumes[volumeIndex] / 100;
        audio.currentTime = 0;
        await audio.play();
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  const loadAudioFromUrl = async (url: string): Promise<HTMLAudioElement | null> => {
    try {
      const audio = new Audio();
      audio.crossOrigin = 'anonymous';
      
      return new Promise((resolve, reject) => {
        audio.oncanplaythrough = () => resolve(audio);
        audio.onerror = () => reject(new Error('Failed to load audio'));
        audio.src = url;
      });
    } catch (error) {
      console.error('Error loading audio from URL:', error);
      return null;
    }
  };

  const handleFileUpload = async (padId: string, file: File) => {
    try {
      const url = URL.createObjectURL(file);
      const audio = await loadAudioFromUrl(url);
      if (audio) {
        setSamples(prev => ({ ...prev, [padId]: audio }));
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to load audio file');
    }
  };

  const handleVolumeChange = (padIndex: number, volume: number) => {
    setVolumes(prev => {
      const newVolumes = [...prev];
      newVolumes[padIndex] = volume;
      return newVolumes;
    });
  };

  const toggleStep = (padIndex: number, stepIndex: number) => {
    setSequence(prev => {
      const newSeq = [...prev];
      newSeq[padIndex][stepIndex] = !newSeq[padIndex][stepIndex];
      return newSeq;
    });
  };

  const clearSequence = () => {
    setSequence(Array(16).fill(null).map(() => Array(16).fill(false)));
    setCurrentStep(0);
  };

  const handleSaveProject = (name: string) => {
    console.log(`Project "${name}" saved!`);
  };

  const handleLoadProject = (data: any) => {
    setSequence(data.sequence);
    setVolumes(data.volumes);
    setBpm([data.bpm]);
  };

  const handleExportProject = async (format: 'wav' | 'mp3') => {
    console.log(`Exporting as ${format}...`);
  };

  const handleKitSelect = async (kitUrl: string, kitName: string) => {
    setLoadingKit(true);
    try {
      // For now, we'll load the kit file as a single sample and assign it to pad 1
      // In a full implementation, you'd extract multiple samples from a zip file
      const audio = await loadAudioFromUrl(kitUrl);
      if (audio) {
        setSamples(prev => ({ ...prev, 'pad1': audio }));
        alert(`Kit "${kitName}" loaded to Pad 1! Upload individual samples to other pads or use a zip extractor for full kit support.`);
      } else {
        throw new Error('Failed to load kit audio');
      }
    } catch (error) {
      console.error('Error loading kit:', error);
      alert(`Failed to load kit "${kitName}". Please try uploading individual audio files instead.`);
    } finally {
      setLoadingKit(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white/90 backdrop-blur-sm border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-purple-800">
            <div className="flex items-center gap-2">
              <Music size={24} />
              16-Pad Sample Sequencer
              {loadingKit && <Loader2 className="w-4 h-4 animate-spin" />}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAdmin(!isAdmin)}
                className={isAdmin ? 'bg-orange-100 border-orange-300' : ''}
              >
                <Settings size={16} className="mr-2" />
                {isAdmin ? 'Admin ON' : 'Admin'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowKitManager(!showKitManager)}
              >
                <FolderOpen size={16} className="mr-2" />
                Sound Kits
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className={isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}
            >
              {isPlaying ? <Square size={16} /> : <Play size={16} />}
            </Button>
            <Button onClick={clearSequence} variant="outline">
              <RotateCcw size={16} />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm">BPM:</span>
              <Slider
                value={bpm}
                onValueChange={setBpm}
                max={200}
                min={60}
                step={1}
                className="w-20"
              />
              <span className="text-sm w-8">{bpm[0]}</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {pads.map((pad, padIndex) => (
              <SamplePad
                key={pad.id}
                id={pad.id}
                name={pad.name}
                color={pad.color}
                volume={volumes[padIndex]}
                onPlay={() => playPad(pad.id, padIndex)}
                onFileUpload={(file) => handleFileUpload(pad.id, file)}
                onVolumeChange={(volume) => handleVolumeChange(padIndex, volume)}
                hasAudio={!!samples[pad.id]}
              />
            ))}
          </div>

          <SequencerGrid
            pads={pads}
            sequence={sequence}
            currentStep={currentStep}
            onToggleStep={toggleStep}
          />

          <ProjectManager
            projectData={{
              sequence,
              volumes,
              bpm: bpm[0],
              name: ''
            }}
            onSave={handleSaveProject}
            onLoad={handleLoadProject}
            onExport={handleExportProject}
          />
        </CardContent>
      </Card>

      {showKitManager && (
        <EnhancedSoundKitManager 
          onKitSelect={handleKitSelect} 
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};

export default DrumSampler;