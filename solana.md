# Easiest Solana Integration: "Sankalp Green Rewards" 🌿

The simplest and most impactful integration for your Waste Management platform is a **Reward System** where citizens earn crypto tokens (e.g., `$CLEAN` or `$SANKALP` tokens) for verified waste reports.

## 🎯 The Concept
1.  **User Reports Waste**: User uploads an image.
2.  **AI Verifies**: Your Gemini AI confirms it is valid garbage.
3.  **User Claims Reward**: User connects their Solana wallet (Phantom) and clicks "Claim Reward".
4.  **Transaction**: Specify a small amount of SOL or a custom SPL token to be sent to their wallet.

## 🛠️ Tech Stack Needed
You only need to install a few packages in your **Frontend** (`cms-frontend`):

```bash
npm install @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/wallet-adapter-base
```

## 📝 Step-by-Step Implementation Guide

### Phase 1: Setup Wallet Provider
Wrap your main `App.jsx` with the Solana Context so user can connect their wallet anywhere.

```jsx
// src/components/SolanaProvider.jsx
import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

export const SolanaProvider = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet; // Use Devnet for testing
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
```

### Phase 2: Add Connect Button
Place this in your customized header or navbar.
```jsx
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// In your Navbar component
<WalletMultiButton />
```

### Phase 3: The "Claim Reward" Feature
Add this button to your `ImageUploadPanel` or `ActionPlanPanel`. It should only be active if `pia_score` (Priority Impact Score) is high!

```jsx
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

export const ClaimRewardButton = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const handleClaim = async () => {
        if (!publicKey) return alert("Connect Wallet first!");

        // 1. Create a transaction to send 0.01 SOL (as a reward mock)
        // In a real app, you would send this FROM a Treasury wallet TO the user.
        // For a simple demo: The user can simulate a transaction or "Sign to verify".
        
        // SIMPLEST DEMO: Just "Sign" a message to prove attendance/reporting
        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey("YOUR_TREASURY_WALLET_ADDRESS"),
                    lamports: 0, // 0 SOL transfer just to verify on-chain activity
                })
            );

            const signature = await sendTransaction(transaction, connection);
            alert(`Reward Claimed! Tx: ${signature}`);
        } catch (error) {
            console.error(error);
        }
    };

    return <button onClick={handleClaim}>Claim 10 $SANKALP</button>;
};
```

## 🚀 Why this is the easiest?
1.  **No Smart Contracts (Programs)**: You don't need to write Rust code. You just use standard Javascript libraries.
2.  **Immediate Feedback**: Users see a wallet popup immediately.
3.  **Low Cost**: Solana Devnet is free to test.
