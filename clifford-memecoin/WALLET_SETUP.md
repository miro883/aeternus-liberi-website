# 💰 Presale Wallet Setup Guide

## How It Works

When users unlock the presale with the pass key and click **"Get My Presale Wallet Address"**, the system:

1. Randomly selects one wallet from your pool of 10 wallets
2. Displays it to the user with a copy button
3. Shows clear instructions for sending BNB
4. User sends BNB directly to that address

## Current Wallet Pool (PLACEHOLDER)

These are **temporary random addresses**. Replace them with your actual BNB wallet addresses:

```javascript
'0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1',
'0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
'0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
'0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB',
'0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb',
'0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE',
'0x2e8f13A4E4e1ca2b8dE1E3e8c8F5c1b3a9e7d6f4',
'0x9d8A62f656a8d1615C1294fd71e9CFb3E4855A4F',
'0x6EcB537E2F1C0e5B0E6B7C9D8A3F2E1C5D4B3A2F',
'0x8fA12EF9C3B2D1A0E9F8E7D6C5B4A3F2E1D0C9B8'
```

## How to Update With Your Real Wallets

### Step 1: Prepare Your 10 BNB Wallets

Create 10 new BNB Chain (BSC) wallet addresses. You can use:
- MetaMask
- Trust Wallet
- Any BEP-20 compatible wallet

**Important:** Keep the private keys safe!

### Step 2: Edit the Configuration

Open: `js/script.js`

Find this section (around line 16):

```javascript
presaleWallets: [
    '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1',
    '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
    // ... more addresses
]
```

### Step 3: Replace with Your Addresses

Replace each address with your own:

```javascript
presaleWallets: [
    '0xYOUR_WALLET_ADDRESS_1',
    '0xYOUR_WALLET_ADDRESS_2',
    '0xYOUR_WALLET_ADDRESS_3',
    '0xYOUR_WALLET_ADDRESS_4',
    '0xYOUR_WALLET_ADDRESS_5',
    '0xYOUR_WALLET_ADDRESS_6',
    '0xYOUR_WALLET_ADDRESS_7',
    '0xYOUR_WALLET_ADDRESS_8',
    '0xYOUR_WALLET_ADDRESS_9',
    '0xYOUR_WALLET_ADDRESS_10'
]
```

### Step 4: Save and Test

1. Save the file
2. Refresh your website
3. Test the presale flow:
   - Enter pass key
   - Click "Get My Presale Wallet Address"
   - Verify one of YOUR addresses appears
   - Test the copy button

## Benefits of This System

✅ **Privacy**: Funds are distributed across 10 wallets  
✅ **Security**: No single point of failure  
✅ **Simplicity**: Users don't need to connect wallets  
✅ **No Wallet Required**: Anyone with BNB can participate  
✅ **Load Distribution**: Spreads incoming funds  
✅ **Easy Tracking**: You control all receiving addresses  

## User Flow

1. User unlocks presale with pass key
2. User enters desired BNB amount (0.1-20 BNB)
3. User clicks "Get My Presale Wallet Address"
4. System shows one of your 10 wallet addresses
5. User copies address and sends BNB from their wallet
6. You receive BNB directly
7. After presale ends, you airdrop $CLIFFORD tokens to senders

## Tracking Presale Participants

Since users send directly to your wallets, you can:

1. Monitor all 10 wallets on BSCScan
2. See incoming transactions in real-time
3. Record sender addresses from blockchain
4. Calculate tokens owed based on BNB received
5. Prepare airdrop list after presale ends

## Security Tips

- Never share private keys
- Use fresh wallets for presale collection
- Monitor wallets regularly
- Keep backup of all wallet info
- Transfer funds to cold storage periodically

## Need Help?

If you need to:
- Add more than 10 wallets
- Change the random selection logic
- Add wallet validation
- Implement tracking features

Just let me know!

---

**Ready to launch once you add your real wallet addresses!** 🚀
