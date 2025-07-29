import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Music, TrendingUp, Clock, Target } from 'lucide-react';

interface EnhancedSuggestion {
  style: string;
  description: string;
  elements: string[];
  bpmChange?: string;
  difficulty?: string;
  marketAppeal?: string;
  uniqueFeature?: string;
}

interface Track {
  number: number;
  title: string;
  duration: string;
}

interface Props {
  selectedTrack?: {album: string, track: Track} | null;
  onSuggestionsGenerated?: (suggestions: EnhancedSuggestion[]) => void;
}

const EnhancedRemixSuggestions: React.FC<Props> = ({ selectedTrack, onSuggestionsGenerated }) => {
  const [suggestions, setSuggestions] = useState<EnhancedSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState('');
  const [mood, setMood] = useState('');

  const generateAdvancedSuggestions = async () => {
    setLoading(true);
    try {
      const trackContext = selectedTrack ? 
        `for "${selectedTrack.track.title}" from ${selectedTrack.album}` : 
        'for your selected track';

      const enhancedSuggestions: EnhancedSuggestion[] = [
        {
          style: "Hip-Hop Evolution",
          description: `Transform ${trackContext} into a modern hip-hop masterpiece. Layer trap-influenced hi-hats over the original vocals while maintaining Raw B's lyrical flow and adding contemporary 808 patterns.`,
          elements: ["Trap hi-hats", "808 bass patterns", "Vocal chops", "Modern percussion"],
          bpmChange: "+10-20 BPM",
          difficulty: "Intermediate",
          marketAppeal: "Hip-hop heads, trap music fans",
          uniqueFeature: "Preserves original vocal delivery style"
        },
        {
          style: "Lo-Fi Chill Remix",
          description: `Create a laid-back lo-fi version ${trackContext}. Add vinyl crackle, warm analog filters, and jazz-influenced chord progressions while keeping Raw B's vocals prominent but softened.`,
          elements: ["Vinyl crackle", "Analog warmth", "Jazz chords", "Soft percussion"],
          bpmChange: "-20-30 BPM",
          difficulty: "Beginner",
          marketAppeal: "Study music listeners, chill-hop fans",
          uniqueFeature: "Nostalgic analog processing on digital vocals"
        },
        {
          style: "Electronic Fusion",
          description: `Blend Raw B's lyrical content with electronic dance elements. Use synth arpeggios and electronic drums while maintaining the original's energy and message.`,
          elements: ["Synth arpeggios", "Electronic drums", "Vocal processing", "Build-ups"],
          bpmChange: "+30-40 BPM",
          difficulty: "Advanced", 
          marketAppeal: "EDM fans, electronic hip-hop enthusiasts",
          uniqueFeature: "Seamless genre crossover maintaining lyrical integrity"
        },
        {
          style: "Acoustic Reimagining",
          description: `Strip down ${trackContext} to its core message with acoustic instruments. Use live drums, bass guitar, and subtle strings to create an intimate, organic version.`,
          elements: ["Live drums", "Bass guitar", "Acoustic elements", "String arrangements"],
          bpmChange: "Match original",
          difficulty: "Intermediate",
          marketAppeal: "Acoustic music lovers, unplugged session fans",
          uniqueFeature: "Raw B's lyrics over live instrumentation"
        }
      ];

      setSuggestions(enhancedSuggestions);
      onSuggestionsGenerated?.(enhancedSuggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Sparkles size={24} />
          AI Remix Suggestions
          {selectedTrack && (
            <Badge variant="outline" className="ml-2">
              {selectedTrack.track.title}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger>
              <SelectValue placeholder="Target Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hip-hop">Hip-Hop</SelectItem>
              <SelectItem value="electronic">Electronic</SelectItem>
              <SelectItem value="lo-fi">Lo-Fi</SelectItem>
              <SelectItem value="acoustic">Acoustic</SelectItem>
              <SelectItem value="trap">Trap</SelectItem>
            </SelectContent>
          </Select>
          <Select value={mood} onValueChange={setMood}>
            <SelectTrigger>
              <SelectValue placeholder="Target Mood" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="energetic">Energetic</SelectItem>
              <SelectItem value="chill">Chill</SelectItem>
              <SelectItem value="aggressive">Aggressive</SelectItem>
              <SelectItem value="emotional">Emotional</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-center mb-6">
          <Button 
            onClick={generateAdvancedSuggestions}
            disabled={loading || !selectedTrack}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {loading ? 'Analyzing Track...' : 'Generate Remix Ideas'}
          </Button>
          {!selectedTrack && (
            <p className="text-sm text-blue-600 mt-2">Select a track first to get personalized suggestions</p>
          )}
        </div>

        {suggestions.length > 0 && (
          <div className="space-y-6">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-bold text-blue-800">{suggestion.style}</h4>
                  {suggestion.difficulty && (
                    <Badge className={getDifficultyColor(suggestion.difficulty)}>
                      {suggestion.difficulty}
                    </Badge>
                  )}
                </div>
                
                <p className="text-blue-700 mb-4 leading-relaxed">{suggestion.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {suggestion.bpmChange && (
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <Clock size={16} />
                      <span>BPM: {suggestion.bpmChange}</span>
                    </div>
                  )}
                  {suggestion.marketAppeal && (
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <Target size={16} />
                      <span>{suggestion.marketAppeal}</span>
                    </div>
                  )}
                </div>

                {suggestion.uniqueFeature && (
                  <div className="mb-4 p-3 bg-purple-100 rounded-lg">
                    <div className="flex items-center gap-2 text-purple-800">
                      <TrendingUp size={16} />
                      <span className="font-semibold">Unique Feature:</span>
                    </div>
                    <p className="text-purple-700 text-sm mt-1">{suggestion.uniqueFeature}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {suggestion.elements.map((element, i) => (
                    <Badge key={i} variant="outline" className="text-blue-700 border-blue-300">
                      {element}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedRemixSuggestions;