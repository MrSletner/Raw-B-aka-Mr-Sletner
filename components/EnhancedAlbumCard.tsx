import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, ExternalLink, Play } from 'lucide-react';
import TrackList from './TrackList';

interface Track {
  number: number;
  title: string;
  duration: string;
  audioUrl?: string;
}

interface EnhancedAlbumCardProps {
  title: string;
  artist: string;
  year: number;
  coverUrl: string;
  streamingUrl: string;
  amazonUrl?: string;
  tracks?: Track[];
}

const EnhancedAlbumCard: React.FC<EnhancedAlbumCardProps> = ({
  title,
  artist,
  year,
  coverUrl,
  streamingUrl,
  amazonUrl,
  tracks = []
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow">
      <CardHeader className="p-0">
        <img
          src={coverUrl}
          alt={`${title} cover`}
          className="w-full h-64 object-cover"
        />
      </CardHeader>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-1">{artist}</p>
        <p className="text-gray-500 text-sm mb-4">
          {year} • {tracks.length} tracks
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(streamingUrl, '_blank')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Bandcamp
          </Button>
          
          {amazonUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(amazonUrl, '_blank')}
              className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100"
            >
              <ExternalLink className="w-4 h-4" />
              Amazon Music
            </Button>
          )}
          
          {tracks.length > 0 && (
            <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
              <CollapsibleTrigger asChild>
                <Button variant="default" size="sm" className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Tracks
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-4">
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Track List</h4>
                  <TrackList
                    tracks={tracks}
                    albumTitle={title}
                    artist={artist}
                    coverUrl={coverUrl}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedAlbumCard;