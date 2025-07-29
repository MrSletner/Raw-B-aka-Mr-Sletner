import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { supabase } from '@/lib/supabase';
import { Upload, Settings, Star } from 'lucide-react';

interface AdminSoundKitManagerProps {
  isAdmin?: boolean;
}

export const AdminSoundKitManager: React.FC<AdminSoundKitManagerProps> = ({ isAdmin = false }) => {
  const [uploading, setUploading] = useState(false);
  const [kitData, setKitData] = useState({
    name: '',
    description: '',
    category: 'general',
    isFeatured: false
  });

  const uploadPublicSoundKit = async (file: File) => {
    if (!file || !kitData.name.trim()) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `public-${Date.now()}-${kitData.name.replace(/\s+/g, '-')}.${fileExt}`;
      const filePath = `public-kits/${fileName}`;

      // Upload to public storage
      const { error: uploadError } = await supabase.storage
        .from('sound-kits')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('sound-kits')
        .getPublicUrl(filePath);

      // Store in database (fallback to localStorage if DB fails)
      try {
        const { error: dbError } = await supabase
          .from('public_sound_kits')
          .insert([{
            name: kitData.name,
            description: kitData.description,
            file_path: publicUrl,
            category: kitData.category,
            is_featured: kitData.isFeatured
          }]);

        if (dbError) throw dbError;
      } catch (dbError) {
        // Fallback to localStorage
        const publicKit = {
          id: Date.now().toString(),
          name: kitData.name,
          description: kitData.description,
          file_path: publicUrl,
          category: kitData.category,
          is_featured: kitData.isFeatured,
          created_at: new Date().toISOString(),
          isPublic: true
        };

        const existingPublicKits = JSON.parse(localStorage.getItem('publicSoundKits') || '[]');
        localStorage.setItem('publicSoundKits', JSON.stringify([...existingPublicKits, publicKit]));
      }

      setKitData({ name: '', description: '', category: 'general', isFeatured: false });
      alert('Public sound kit uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload sound kit');
    } finally {
      setUploading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <Card className="w-full border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-700">
          <Settings className="w-5 h-5" />
          Admin: Upload Public Sound Kits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Sound kit name"
            value={kitData.name}
            onChange={(e) => setKitData(prev => ({ ...prev, name: e.target.value }))}
          />
          <Select value={kitData.category} onValueChange={(value) => setKitData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="hip-hop">Hip Hop</SelectItem>
              <SelectItem value="electronic">Electronic</SelectItem>
              <SelectItem value="rock">Rock</SelectItem>
              <SelectItem value="jazz">Jazz</SelectItem>
              <SelectItem value="world">World</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Textarea
          placeholder="Description (optional)"
          value={kitData.description}
          onChange={(e) => setKitData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={kitData.isFeatured}
            onChange={(e) => setKitData(prev => ({ ...prev, isFeatured: e.target.checked }))}
          />
          <label htmlFor="featured" className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4" />
            Featured Kit
          </label>
        </div>

        <div className="flex gap-2">
          <Input
            type="file"
            accept=".zip,.rar,.7z,audio/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadPublicSoundKit(file);
            }}
            disabled={uploading || !kitData.name.trim()}
          />
          <Button disabled={uploading || !kitData.name.trim()} className="bg-orange-600 hover:bg-orange-700">
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Uploading...' : 'Upload Public Kit'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};