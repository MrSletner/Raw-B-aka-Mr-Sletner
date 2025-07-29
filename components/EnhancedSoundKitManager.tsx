import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { supabase } from '@/lib/supabase';
import { AdminSoundKitManager } from './AdminSoundKitManager';
import { Upload, Download, Trash2, Music, Star, Users, User, AlertCircle } from 'lucide-react';

interface SoundKit {
  id: string;
  name: string;
  description?: string;
  file_path: string;
  category?: string;
  is_featured?: boolean;
  download_count?: number;
  created_at: string;
  isPublic?: boolean;
}

interface EnhancedSoundKitManagerProps {
  onKitSelect: (kitUrl: string, kitName: string) => void;
  isAdmin?: boolean;
}

export const EnhancedSoundKitManager: React.FC<EnhancedSoundKitManagerProps> = ({ 
  onKitSelect, 
  isAdmin = false 
}) => {
  const [publicKits, setPublicKits] = useState<SoundKit[]>([]);
  const [userKits, setUserKits] = useState<SoundKit[]>([]);
  const [uploading, setUploading] = useState(false);
  const [kitName, setKitName] = useState('');

  const loadPublicKits = async () => {
    try {
      const { data, error } = await supabase
        .from('public_sound_kits')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (!error && data) {
        setPublicKits(data.map(kit => ({ ...kit, isPublic: true })));
      } else {
        const savedPublicKits = JSON.parse(localStorage.getItem('publicSoundKits') || '[]');
        setPublicKits(savedPublicKits);
      }
    } catch (error) {
      const savedPublicKits = JSON.parse(localStorage.getItem('publicSoundKits') || '[]');
      setPublicKits(savedPublicKits);
    }
  };

  const loadUserKits = () => {
    const savedKits = JSON.parse(localStorage.getItem('soundKits') || '[]');
    setUserKits(savedKits);
  };

  const uploadUserKit = async (file: File) => {
    if (!file || !kitName.trim()) return;

    setUploading(true);
    try {
      // Check if file is audio
      if (!file.type.startsWith('audio/')) {
        throw new Error('Please upload an audio file (MP3, WAV, etc.)');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `user-${Date.now()}-${kitName.replace(/\s+/g, '-')}.${fileExt}`;
      const filePath = `user-kits/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('sound-kits')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('sound-kits')
        .getPublicUrl(filePath);

      const newKit: SoundKit = {
        id: Date.now().toString(),
        name: kitName,
        file_path: publicUrl,
        created_at: new Date().toISOString(),
        isPublic: false
      };

      const existingKits = JSON.parse(localStorage.getItem('soundKits') || '[]');
      const updatedKits = [...existingKits, newKit];
      localStorage.setItem('soundKits', JSON.stringify(updatedKits));
      
      setUserKits(updatedKits);
      setKitName('');
      alert('Sound kit uploaded successfully!');
    } catch (error: any) {
      console.error('Upload error:', error);
      alert(error.message || 'Failed to upload sound kit');
    } finally {
      setUploading(false);
    }
  };

  const deleteUserKit = async (kitId: string) => {
    const kit = userKits.find(k => k.id === kitId);
    if (kit) {
      try {
        // Try to delete from storage
        const pathParts = kit.file_path.split('/');
        const fileName = pathParts[pathParts.length - 1];
        await supabase.storage
          .from('sound-kits')
          .remove([`user-kits/${fileName}`]);
      } catch (error) {
        console.log('Could not delete from storage:', error);
      }
    }
    
    const updatedKits = userKits.filter(kit => kit.id !== kitId);
    setUserKits(updatedKits);
    localStorage.setItem('soundKits', JSON.stringify(updatedKits));
  };

  const incrementDownloadCount = async (kit: SoundKit) => {
    if (kit.isPublic) {
      try {
        await supabase
          .from('public_sound_kits')
          .update({ download_count: (kit.download_count || 0) + 1 })
          .eq('id', kit.id);
      } catch (error) {
        console.log('Could not update download count');
      }
    }
    onKitSelect(kit.file_path, kit.name);
  };

  useEffect(() => {
    loadPublicKits();
    loadUserKits();
  }, []);

  const KitGrid = ({ kits, showDelete = false }: { kits: SoundKit[], showDelete?: boolean }) => (
    <div className="grid gap-3">
      {kits.length === 0 ? (
        <div className="text-center py-8 space-y-2">
          <Music className="w-8 h-8 mx-auto text-muted-foreground" />
          <p className="text-muted-foreground text-sm">No sound kits available</p>
          {!showDelete && (
            <p className="text-xs text-muted-foreground">
              Upload audio files to create your personal sound library
            </p>
          )}
        </div>
      ) : (
        kits.map((kit) => (
          <div key={kit.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium">{kit.name}</p>
                {kit.is_featured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                {kit.category && <Badge variant="secondary" className="text-xs">{kit.category}</Badge>}
              </div>
              {kit.description && (
                <p className="text-xs text-muted-foreground mb-1">{kit.description}</p>
              )}
              <p className="text-xs text-muted-foreground">
                {new Date(kit.created_at).toLocaleDateString()}
                {kit.download_count && ` • ${kit.download_count} downloads`}
              </p>
            </div>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => incrementDownloadCount(kit)}
              >
                <Download className="w-3 h-3 mr-1" />
                Load
              </Button>
              {showDelete && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteUserKit(kit.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="w-5 h-5" />
          Sound Kit Library
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isAdmin && <AdminSoundKitManager isAdmin={isAdmin} />}
        
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Audio File Support</p>
              <p className="text-xs">Upload individual audio samples (MP3, WAV, etc.) for best results. Kits will load to Pad 1 - upload individual samples to other pads for full drum kit functionality.</p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="public" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="public" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Public Kits ({publicKits.length})
            </TabsTrigger>
            <TabsTrigger value="user" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              My Kits ({userKits.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="public" className="space-y-4">
            <KitGrid kits={publicKits} />
          </TabsContent>
          
          <TabsContent value="user" className="space-y-4">
            <div className="space-y-3 p-4 border rounded-lg bg-muted/20">
              <Input
                placeholder="Your sound kit name"
                value={kitName}
                onChange={(e) => setKitName(e.target.value)}
              />
              <div className="flex gap-2">
                <Input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadUserKit(file);
                  }}
                  disabled={uploading || !kitName.trim()}
                />
                <Button disabled={uploading || !kitName.trim()}>
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Supported formats: MP3, WAV, FLAC, OGG, and other audio files
              </p>
            </div>
            <KitGrid kits={userKits} showDelete={true} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};