import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Music, Download, Play, Pause } from 'lucide-react';
import { discographyData } from '@/data/discography';
import { extendedDiscography } from '@/data/discography-extended';

interface Track {
  number: number;
  title: string;
  duration: string;
}

interface Album {
  title: string;
  artist: string;
  year: number;
  coverUrl: string;
  tracks: Track[];
}

interface RemixTrackSelectorProps {
  onTrackSelect: (album: string, track: Track) => void;
}

const RemixTrackSelector: React.FC<RemixTrackSelectorProps> = ({ onTrackSelect }) => {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  const allAlbums: Album[] = [...discographyData, ...extendedDiscography];

  const handleTrackSelect = (album: Album, track: Track) => {
    onTrackSelect(album.title, track);
  };

  const togglePlay = (trackId: string) => {
    setPlayingTrack(playingTrack === trackId ? null : trackId);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Music size={24} />
          Select Track to Remix
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Album Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allAlbums.map((album) => (
              <div
                key={album.title}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedAlbum === album.title
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedAlbum(selectedAlbum === album.title ? null : album.title)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={album.coverUrl}
                    alt={album.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-blue-800">{album.title}</h4>
                    <p className="text-sm text-blue-600">{album.artist} • {album.year}</p>
                    <Badge variant="secondary" className="text-xs">
                      {album.tracks.length} tracks
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Track Selection */}
          {selectedAlbum && (
            <div className="mt-6">
              <h4 className="font-bold text-blue-800 mb-4">
                Select a track from "{selectedAlbum}"
              </h4>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {allAlbums
                  .find(album => album.title === selectedAlbum)
                  ?.tracks.map((track) => {
                    const trackId = `${selectedAlbum}-${track.number}`;
                    const album = allAlbums.find(a => a.title === selectedAlbum)!;
                    
                    return (
                      <div
                        key={track.number}
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200"
                      >
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => togglePlay(trackId)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {playingTrack === trackId ? (
                              <Pause size={16} />
                            ) : (
                              <Play size={16} />
                            )}
                          </Button>
                          <div>
                            <p className="font-medium text-blue-800">
                              {track.number}. {track.title}
                            </p>
                            <p className="text-sm text-blue-600">{track.duration}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleTrackSelect(album, track)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          <Download size={16} className="mr-1" />
                          Get Stems
                        </Button>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RemixTrackSelector;