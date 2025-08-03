import React, { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Upload, Volume2, CheckCircle } from 'lucide-react';

interface SamplePadProps {
  id: string;
  name: string;
  color: string;
  volume: number;
  hasAudio?: boolean;
  onPlay: () => void;
  onFileUpload: (file: File) => void;
  onVolumeChange: (volume: number) => void;
}

const SamplePad: React.FC<SamplePadProps> = ({
  id,
  name,
  color,
  volume,
  hasAudio = false,
  onPlay,
  onFileUpload,
  onVolumeChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium">{name}</span>
          {hasAudio && <CheckCircle className="w-3 h-3 text-green-500" />}
        </div>
        
        <Button
          onClick={onPlay}
          className={`w-full h-16 ${color} hover:opacity-90 transition-all duration-150 active:scale-95`}
          disabled={!hasAudio}
        >
          {hasAudio ? 'PLAY' : 'EMPTY'}
        </Button>
        
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <Volume2 className="w-3 h-3" />
            <Slider
              value={[volume]}
              onValueChange={(value) => onVolumeChange(value[0])}
              max={100}
              min={0}
              step={1}
              className="flex-1"
            />
            <span className="text-xs w-8">{volume}</span>
          </div>
          
          <Button
            onClick={handleUploadClick}
            variant="outline"
            size="sm"
            className="w-full h-6 text-xs"
          >
            <Upload className="w-3 h-3 mr-1" />
            Upload
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SamplePad;