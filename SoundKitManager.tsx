import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { supabase } from '@/lib/supabase';
import { Upload, Download, Trash2, Music } from 'lucide-react';

interface SoundKit {
  id: string;
  name: string;
  description?: string;
  file_path: string;
  created_at: string;
}

interface SoundKitManagerProps {
  onKitSelect: (kitUrl: string, kitName: string) => void;
}

export const SoundKitManager: React.FC<SoundKitManagerProps> = ({ onKitSelect }) => {
  const [kits, setKits] = useState<SoundKit[]>([]);
  const [uploading, setUploading] = useState(false);
  const [kitName, setKitName] = useState('');

  const uploadSoundKit = async (file: File) => {
    if (!file || !kitName.trim()) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${kitName.replace(/\s+/g, '-')}.${fileExt}`;
      const filePath = `kits/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('sound-kits')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('sound-kits')
        .getPublicUrl(filePath);

      // Store metadata (simplified - just using localStorage for now)
      const newKit: SoundKit = {
        id: Date.now().toString(),
        name: kitName,
        file_path: publicUrl,
        created_at: new Date().toISOString()
      };

      const existingKits = JSON.parse(localStorage.getItem('soundKits') || '[]');
      const updatedKits = [...existingKits, newKit];
      localStorage.setItem('soundKits', JSON.stringify(updatedKits));
      
      setKits(updatedKits);
      setKitName('');
      alert('Sound kit uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload sound kit');
    } finally {
      setUploading(false);
    }
  };

  const loadKits = () => {
    const savedKits = JSON.parse(localStorage.getItem('soundKits') || '[]');
    setKits(savedKits);
  };

  const deleteKit = (kitId: string) => {
    const updatedKits = kits.filter(kit => kit.id !== kitId);
    setKits(updatedKits);
    localStorage.setItem('soundKits', JSON.stringify(updatedKits));
  };

  useEffect(() => {
    loadKits();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="w-5 h-5" />
          Sound Kit Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Sound kit name"
            value={kitName}
            onChange={(e) => setKitName(e.target.value)}
          />
          <div className="flex gap-2">
            <Input
              type="file"
              accept=".zip,.rar,.7z,audio/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadSoundKit(file);
              }}
              disabled={uploading || !kitName.trim()}
            />
            <Button disabled={uploading || !kitName.trim()}>
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Available Sound Kits</h3>
          {kits.length === 0 ? (
            <p className="text-muted-foreground text-sm">No sound kits uploaded yet</p>
          ) : (
            <div className="grid gap-2">
              {kits.map((kit) => (
                <div key={kit.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium">{kit.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(kit.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onKitSelect(kit.file_path, kit.name)}
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteKit(kit.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};