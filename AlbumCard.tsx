import React from 'react';

interface AlbumCardProps {
  title: string;
  artist: string;
  year: number;
  coverUrl: string;
  streamingUrl: string;
  tracks?: { number: number; title: string; duration: string; }[];
}

const AlbumCard: React.FC<AlbumCardProps> = ({ 
  title, 
  artist, 
  year, 
  coverUrl, 
  streamingUrl, 
  tracks = [] 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={coverUrl} 
        alt={`${title} cover`}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-1">{artist}</p>
        <p className="text-gray-500 text-sm mb-4">{year} • {tracks.length} tracks</p>
        <a
          href={streamingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Listen Now
        </a>
      </div>
    </div>
  );
};

export default AlbumCard;