import { useState } from 'react';
import { ExternalLink, ShoppingCart, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ReviewModal from './ReviewModal';
const PurchaseBanner = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Raw B Music App',
        text: 'Check out this amazing music app by Raw B!',
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert('App link copied to clipboard!');
    }
  };

  const handleReview = () => {
    setIsReviewModalOpen(true);
  };

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 mb-8 border-none shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Support Raw B
          </h3>
          <p className="text-blue-100 mb-4">
            Purchase music, share with friends, and leave reviews!
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            variant="outline"
            className="bg-white text-blue-600 hover:bg-blue-50 border-white"
            onClick={() => window.open('https://MrSletner.com', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            MrSletner.com
          </Button>

          <Button
            variant="outline"
            className="bg-white text-orange-600 hover:bg-orange-50 border-white"
            onClick={() => window.open('https://amazon.com/music/player/albums/B0DDQFMT6M?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_XmSzVZuBN69QzfTP5JwhN5zY1', '_blank')}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Amazon Music
          </Button>
          
          <Button
            variant="outline"
            className="bg-white text-purple-600 hover:bg-purple-50 border-white"
            onClick={() => window.open('https://TheRawB.bandcamp.com', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Bandcamp
          </Button>

          <Button
            variant="outline"
            className="bg-white text-green-600 hover:bg-green-50 border-white"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share App
          </Button>

          <Button
            variant="outline"
            className="bg-white text-yellow-600 hover:bg-yellow-50 border-white"
            onClick={handleReview}
          >
            <Star className="h-4 w-4 mr-2" />
            Leave Review
          </Button>
        </div>
      </div>
      
      <ReviewModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
      />
    </Card>
  );
};

export default PurchaseBanner;