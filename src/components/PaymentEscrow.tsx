import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '@solana/wallet-adapter-react';
import { jobService } from '@/services/job.service';
import { toast } from 'sonner';
import { Loader2, Lock, CheckCircle, ExternalLink, AlertCircle } from 'lucide-react';
import { MovingBorder } from '@/components/aceternity/MovingBorder';
import { BackgroundGradient } from '@/components/aceternity/BackgroundGradient';

interface PaymentEscrowProps {
  jobId: string;
  amount: number;
  recipientWallet?: string;
  status: 'pending' | 'escrowed' | 'released' | 'completed';
  onStatusChange?: (newStatus: 'pending' | 'escrowed' | 'released' | 'completed') => void;
}

export function PaymentEscrow({ 
  jobId, 
  amount, 
  recipientWallet, 
  status, 
  onStatusChange 
}: PaymentEscrowProps) {
  const { publicKey, connected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleEscrow = async () => {
    if (!connected || !publicKey) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      setLoading(true);
      const result = await jobService.initiateEscrow(
        jobId, 
        publicKey.toString()
      );
      
      setTxHash(result.transactionHash);
      onStatusChange?.('escrowed');
      
      toast.success('Payment Escrowed', {
        description: `$${amount} locked in smart contract`
      });
    } catch (error: any) {
      toast.error('Escrow Failed', {
        description: error.message || 'Failed to escrow payment'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRelease = async () => {
    if (!recipientWallet) {
      toast.error('No recipient wallet specified');
      return;
    }

    try {
      setLoading(true);
      const result = await jobService.releasePayment(jobId, recipientWallet);
      
      setTxHash(result.transactionHash);
      onStatusChange?.('released');
      
      toast.success('Payment Released', {
        description: `$${amount} sent to freelancer`
      });
    } catch (error: any) {
      toast.error('Release Failed', {
        description: error.message || 'Failed to release payment'
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'escrowed':
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            <Lock className="w-3 h-3 mr-1" />
            Escrowed
          </Badge>
        );
      case 'released':
      case 'completed':
        return (
          <Badge variant="outline" className="text-green-500 border-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            {status === 'released' ? 'Released' : 'Completed'}
          </Badge>
        );
    }
  };

  return (
    <BackgroundGradient className="rounded-[22px] p-0.5">
      <Card className="p-6 border-0 bg-card rounded-[20px]">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold mb-1">Payment Status</h3>
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                ${amount.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              {getStatusBadge()}
            </div>
          </div>

          {/* Transaction Hash */}
          {txHash && (
            <div className="p-3 bg-muted/50 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground mb-1">Transaction Hash:</p>
              <a
                href={`https://explorer.solana.com/tx/${txHash}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline break-all flex items-center gap-1"
              >
                {txHash.slice(0, 8)}...{txHash.slice(-8)}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Status Information */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              {status === 'pending' && '⏳ Payment is ready to be escrowed. Click "Escrow Payment" to lock funds in smart contract.'}
              {status === 'escrowed' && '🔒 Payment is locked in escrow. Release payment when work is completed.'}
              {status === 'released' && '✅ Payment has been released to the freelancer.'}
              {status === 'completed' && '✅ Job completed and payment finalized.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {status === 'pending' && (
              <MovingBorder className="flex-1" duration={3000}>
                <Button 
                  onClick={handleEscrow} 
                  disabled={loading || !connected}
                  className="w-full bg-gradient-to-r from-primary to-purple-600"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Escrow Payment
                    </>
                  )}
                </Button>
              </MovingBorder>
            )}
            
          {status === 'escrowed' && (
            <MovingBorder className="flex-1" duration={3000}>
              <Button 
                onClick={handleRelease} 
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Release Payment
                  </>
                )}
              </Button>
            </MovingBorder>
          )}            {!connected && status === 'pending' && (
              <p className="text-sm text-muted-foreground text-center w-full py-2">
                Connect your wallet to escrow payment
              </p>
            )}
          </div>

          {/* Recipient Info */}
          {recipientWallet && status !== 'pending' && (
            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground mb-1">Recipient Wallet:</p>
              <p className="text-sm font-mono">
                {recipientWallet.slice(0, 8)}...{recipientWallet.slice(-8)}
              </p>
            </div>
          )}
        </div>
      </Card>
    </BackgroundGradient>
  );
}
