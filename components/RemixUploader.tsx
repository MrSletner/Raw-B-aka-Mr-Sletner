import React, { useState, useCallback } from 'react';
import { Upload, Music, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';

interface RemixUploaderProps {
  onUploadComplete?: (remixId: string) => void;
}

const RemixUploader: React.FC<RemixUploaderProps> = ({ onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [originalTrack, setOriginalTrack] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('audio/')) {
      setFile(selectedFile);
      setUploadStatus('idle');
    }
  }, []);

  const handleUpload = async () => {
    if (!file || !title.trim()) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('remix-uploads')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data, error: dbError } = await supabase
        .from('user_remixes')
        .insert({
          title: title.trim(),
          artist_name: artistName.trim() || 'Anonymous',
          original_track: originalTrack.trim(),
          file_path: fileName,
          file_size: file.size,
          status: 'pending'
        })
        .select()
        .single();

      if (dbError) throw dbError;

      setUploadStatus('success');
      setFile(null);
      setTitle('');
      setArtistName('');
      setOriginalTrack('');
      onUploadComplete?.(data.id);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Upload size={24} />
          Submit Your Remix
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Remix Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your remix title"
          />
        </div>
        
        <div>
          <Label htmlFor="artist">Artist Name</Label>
          <Input
            id="artist"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            placeholder="Your artist name (optional)"
          />
        </div>

        <div>
          <Label htmlFor="original">Original Track</Label>
          <Input
            id="original"
            value={originalTrack}
            onChange={(e) => setOriginalTrack(e.target.value)}
            placeholder="Which track did you remix?"
          />
        </div>

        <div>
          <Label htmlFor="file">Audio File</Label>
          <Input
            id="file"
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
          />
          {file && (
            <div className="flex items-center gap-2 mt-2 text-sm text-blue-600">
              <Music size={16} />
              {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>

        {uploadStatus === 'success' && (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle size={16} />
            Upload successful! Your remix is being reviewed.
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle size={16} />
            Upload failed. Please try again.
          </div>
        )}

        <Button 
          onClick={handleUpload}
          disabled={!file || !title.trim() || uploading}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {uploading ? 'Uploading...' : 'Submit Remix'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RemixUploader;