import React from 'react';
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

interface Track {
  number: number;
  title: string;
  duration: string;
  audioUrl?: string;
}

interface TrackListProps {
  tracks: Track[];
  albumTitle: string;
  artist: string;
  coverUrl: string;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, albumTitle, artist, coverUrl }) => {
  const { currentTrack, isPlaying, playTrack, pauseTrack, resumeTrack } = useAudioPlayer();

  const handleTrackPlay = (track: Track) => {
    const trackData = {
      id: `${albumTitle}-${track.number}`,
      title: track.title,
      artist,
      duration: track.duration,
      audioUrl: track.audioUrl || generateDemoUrl(track.title),
      albumTitle,
      coverUrl
    };

    const playlist = tracks.map((t, index) => ({
      id: `${albumTitle}-${t.number}`,
      title: t.title,
      artist,
      duration: t.duration,
      audioUrl: t.audioUrl || generateDemoUrl(t.title),
      albumTitle,
      coverUrl
    }));

    if (currentTrack?.id === trackData.id) {
      if (isPlaying) {
        pauseTrack();
      } else {
        resumeTrack();
      }
    } else {
      playTrack(trackData, playlist);
    }
  };

  // Generate demo audio URL (placeholder for actual audio files)
  const generateDemoUrl = (title: string) => {
    // This would normally point to your actual audio files
    // For demo purposes, using a placeholder audio service
    return `https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav`;
  };

  const isCurrentTrack = (trackNumber: number) => {
    return currentTrack?.id === `${albumTitle}-${trackNumber}`;
  };

  const isCurrentlyPlaying = (trackNumber: number) => {
    return isCurrentTrack(trackNumber) && isPlaying;
  };

  return (
    <div className="space-y-1">
      {tracks.map((track) => (
        <div
          key={track.number}
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors ${
            isCurrentTrack(track.number) ? 'bg-blue-50' : ''
          }`}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleTrackPlay(track)}
            className="p-1 h-8 w-8"
          >
            {isCurrentlyPlaying(track.number) ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          
          <span className="text-sm text-gray-500 w-6">
            {track.number}
          </span>
          
          <span className={`flex-1 text-sm ${
            isCurrentTrack(track.number) ? 'text-blue-600 font-medium' : 'text-gray-900'
          }`}>
            {track.title}
          </span>
          
          <span className="text-sm text-gray-500">
            {track.duration}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TrackList;