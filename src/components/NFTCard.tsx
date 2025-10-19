import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Coins, Calendar, Award, TrendingUp } from 'lucide-react';
import type { NFT } from '@/utils/nftMock';
import { BackgroundGradient } from '@/components/aceternity/BackgroundGradient';

interface NFTCardProps {
  nft: NFT;
  onViewDetails?: (nft: NFT) => void;
  onList?: (nft: NFT) => void;
}

export function NFTCard({ nft, onViewDetails, onList }: NFTCardProps) {
  const getStatusBadge = () => {
    switch (nft.status) {
      case 'minted':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/50">Minted</Badge>;
      case 'listed':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/50">Listed</Badge>;
      case 'sold':
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/50">Sold</Badge>;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'platinum':
        return 'from-cyan-500 to-blue-500';
      case 'gold':
        return 'from-yellow-500 to-orange-500';
      case 'silver':
        return 'from-gray-400 to-gray-500';
      default:
        return 'from-primary to-purple-600';
    }
  };

  const rarityAttr = nft.attributes.find(a => a.trait_type === 'Rarity');
  const rarityColor = rarityAttr ? getRarityColor(rarityAttr.value as string) : 'from-primary to-purple-600';

  return (
    <BackgroundGradient className="rounded-[22px] p-0.5 bg-white dark:bg-zinc-900">
      <Card className="group overflow-hidden border-0 bg-card hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 rounded-[20px]">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/50">
          <img 
            src={nft.image} 
            alt={nft.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3">
            {getStatusBadge()}
          </div>
          {rarityAttr && (
            <div className="absolute bottom-3 left-3">
              <Badge className={`bg-gradient-to-r ${rarityColor} text-white border-0`}>
                <Award className="w-3 h-3 mr-1" />
                {rarityAttr.value}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <div>
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{nft.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{nft.description}</p>
          </div>

          {/* Job Info */}
          {nft.jobTitle && (
            <div className="flex items-center gap-2 text-sm">
              <Coins className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground line-clamp-1">{nft.jobTitle}</span>
            </div>
          )}

          {/* Date */}
          {nft.completedDate && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">
                Completed: {new Date(nft.completedDate).toLocaleDateString()}
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground">Floor Price</p>
              <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                {nft.floorPrice} SOL
              </p>
            </div>
            {nft.lastSalePrice && (
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Last Sale</p>
                <p className="text-sm font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  {nft.lastSalePrice} SOL
                </p>
              </div>
            )}
          </div>

          {/* Attributes Preview */}
          <div className="flex flex-wrap gap-1.5">
            {nft.attributes.slice(0, 3).map((attr, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {attr.trait_type}: {attr.value}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {nft.status === 'minted' && onList && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => onList(nft)}
              >
                List for Sale
              </Button>
            )}
            <Button 
              variant="default" 
              size="sm" 
              className={`${nft.status === 'minted' && onList ? 'flex-1' : 'w-full'} bg-gradient-to-r from-primary to-purple-600`}
              onClick={() => onViewDetails?.(nft)}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </BackgroundGradient>
  );
}
