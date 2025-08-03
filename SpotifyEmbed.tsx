import React from 'react';

interface SpotifyEmbedProps {
  artistId?: string;
  albumId?: string;
  trackId?: string;
  playlistId?: string;
  height?: number;
  width?: string;
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({
  artistId,
  albumId,
  trackId,
  playlistId,
  height = 352,
  width = "100%"
}) => {
  let embedUrl = '';
  
  if (artistId) {
    embedUrl = `https://open.spotify.com/embed/artist/${artistId}?utm_source=generator&theme=0`;
  } else if (albumId) {
    embedUrl = `https://open.spotify.com/embed/album/${albumId}?utm_source=generator&theme=0`;
  } else if (trackId) {
    embedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
  } else if (playlistId) {
    embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
  }

  if (!embedUrl) {
    return null;
  }

  return (
    <div className="w-full mb-8">
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: '12px' }}
        src={embedUrl}
        width={width}
        height={height}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="w-full"
      />
    </div>
  );
};

export default SpotifyEmbed;