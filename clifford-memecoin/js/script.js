// DOM elements (kept for potential future use)

// Configuration
const CONFIG = {
    presaleEndDate: new Date('2025-01-31 23:59:59'),
    minPurchase: 0.5,
    maxPurchase: 35,
    bnbChainId: '0x38', // BSC Mainnet
    contractAddress: '0x...', // Contract address would go here
    presaleAccessCode: 'CLIF-2K25-9X7R-M4QP-8W3N-F6D2', // Private presale access code
    // Presale wallet pool - LIVE ADDRESSES
    presaleWallets: [
        '0xf9a438814617c17ef29092b8a994c98e2fdce394',
        '0x9111bedabda7d6a065b4559a353f9c3bff7b2298',
        '0x40deb706bce2fc52b091703cc23528643eb8e811',
        '0xf9e706e812d7c5dba966f4a63f10ac78e4b67af9',
        '0x346bd1eb756223d7c0eeebf9054514a6b02c6226',
        '0x54fDAE05Bc899b5aA141470DF8148cde5934EB3B',
        '0x2926e1fffcE44E6cDdA74eA8c1D3789af2Dcd2CB',
        '0x34531A0e11D824c2b6C337Ad6d57d4A432Dae61b',
        '0x2c0273211aB6dD1d92d3Dc5cDb20fE42bf597cA7',
        '0xB90d37Cd7c68e97d76115844E73D73996f89D607'
    ]
};

// State
let wallet = {
    connected: false,
    address: null,
    web3: null
};

// Initialize app when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    setupPresaleLock();
    startCountdown();
    createTokenomicsChart();
    setupScrollAnimations();
    setupMobileMenu();
}

// Event Listeners
function setupEventListeners() {
    // Audio toggle button
    const audioToggleBtn = document.getElementById('audioToggle');
    audioToggleBtn?.addEventListener('click', toggleAudio);
    
    // Generate wallet button
    const generateWalletBtn = document.getElementById('generateWalletBtn');
    generateWalletBtn?.addEventListener('click', generatePresaleWallet);
    
    // Copy wallet address button
    const copyWalletBtn = document.getElementById('copyWalletBtn');
    copyWalletBtn?.addEventListener('click', copyWalletAddress);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
}

// Mobile Menu
function setupMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
    }
}

// Countdown Timer
function startCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = CONFIG.presaleEndDate.getTime() - now;
        
        if (distance < 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Tokenomics Chart
function createTokenomicsChart() {
    const ctx = document.getElementById('tokenomicsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Presale (35%)',
                'Marketing & Partnerships (20%)',
                'Liquidity Pool (15%)',
                'Staking Rewards (15%)',
                'Team & Development (10%)',
                'Reserve Fund (5%)'
            ],
            datasets: [{
                data: [35, 20, 15, 15, 10, 5],
                backgroundColor: [
                    '#ff6b35',
                    '#f7931e',
                    '#ffc107',
                    '#ff8c42',
                    '#ffb347',
                    '#ffd700'
                ],
                borderWidth: 0,
                hoverBorderWidth: 2,
                hoverBorderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#2a2a2a',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#ff6b35',
                    borderWidth: 1
                }
            },
            cutout: '60%',
            elements: {
                arc: {
                    borderRadius: 5
                }
            }
        }
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.about-card, .token-item, .staking-card, .roadmap-item, .social-link').forEach(el => {
        observer.observe(el);
    });
}

// Update token amount based on BNB input
function updateTokenAmount() {
    const bnbAmount = parseFloat(bnbAmountInput.value) || 0;
    const tokenAmount = bnbAmount * CONFIG.tokenPrice;
    cliffordAmountDisplay.textContent = tokenAmount.toLocaleString();
}

// Check if wallet is already connected
async function checkWalletConnection() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                wallet.connected = true;
                wallet.address = accounts[0];
                updateWalletUI();
            }
        } catch (error) {
            console.error('Error checking wallet connection:', error);
        }
    }
}

// Connect wallet function
async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        showNotification('Please install MetaMask or another Web3 wallet', 'error');
        return;
    }
    
    try {
        // Request account access
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        
        // Check if we're on the correct network
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== CONFIG.bnbChainId) {
            await switchToBNBChain();
        }
        
        wallet.connected = true;
        wallet.address = accounts[0];
        
        updateWalletUI();
        showNotification('Wallet connected successfully!', 'success');
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
        
    } catch (error) {
        console.error('Error connecting wallet:', error);
        showNotification('Failed to connect wallet', 'error');
    }
}

// Switch to BNB Smart Chain
async function switchToBNBChain() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: CONFIG.bnbChainId }],
        });
    } catch (switchError) {
        // Chain not added to MetaMask
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: CONFIG.bnbChainId,
                        chainName: 'BNB Smart Chain',
                        nativeCurrency: {
                            name: 'BNB',
                            symbol: 'BNB',
                            decimals: 18,
                        },
                        rpcUrls: ['https://bsc-dataseed1.binance.org/'],
                        blockExplorerUrls: ['https://bscscan.com/'],
                    }],
                });
            } catch (addError) {
                console.error('Error adding BNB chain:', addError);
                throw new Error('Failed to add BNB Smart Chain');
            }
        } else {
            throw switchError;
        }
    }
}

// Handle account changes
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        wallet.connected = false;
        wallet.address = null;
        updateWalletUI();
        showNotification('Wallet disconnected', 'info');
    } else {
        wallet.address = accounts[0];
        updateWalletUI();
    }
}

// Handle chain changes
function handleChainChanged(chainId) {
    window.location.reload();
}

// Update wallet UI
function updateWalletUI() {
    if (wallet.connected) {
        connectWalletBtn.style.display = 'none';
        buyTokensBtn.style.display = 'flex';
        
        // Show shortened address
        const shortAddress = `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`;
        buyTokensBtn.innerHTML = `
            <i class="fas fa-shopping-cart"></i>
            Buy $CLIFFORD (${shortAddress})
        `;
    } else {
        connectWalletBtn.style.display = 'flex';
        buyTokensBtn.style.display = 'none';
    }
}

// Buy tokens function
async function buyTokens() {
    if (!wallet.connected) {
        showNotification('Please connect your wallet first', 'error');
        return;
    }
    
    const bnbAmount = parseFloat(bnbAmountInput.value);
    
    // Validate amount
    if (!bnbAmount || bnbAmount < CONFIG.minPurchase || bnbAmount > CONFIG.maxPurchase) {
        showNotification(`Please enter an amount between ${CONFIG.minPurchase} and ${CONFIG.maxPurchase} BNB`, 'error');
        return;
    }
    
    try {
        // Convert BNB to Wei
        const amountInWei = (bnbAmount * 1e18).toString();
        
        // This is a simplified transaction - in a real implementation,
        // you would interact with your smart contract
        const transaction = {
            to: CONFIG.contractAddress,
            value: amountInWei,
            gas: '100000',
        };
        
        showNotification('Transaction submitted! Please wait for confirmation...', 'info');
        
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transaction],
        });
        
        showNotification('Transaction successful! Tokens will be credited to your wallet.', 'success');
        console.log('Transaction hash:', txHash);
        
        // Reset form
        bnbAmountInput.value = '';
        updateTokenAmount();
        
    } catch (error) {
        console.error('Error buying tokens:', error);
        if (error.code === 4001) {
            showNotification('Transaction cancelled by user', 'info');
        } else {
            showNotification('Transaction failed. Please try again.', 'error');
        }
    }
}

// Presale Access Lock System
function setupPresaleLock() {
    const unlockBtn = document.getElementById('unlockPresaleBtn');
    const accessInput = document.getElementById('accessCodeInput');
    
    if (!unlockBtn || !accessInput) return;
    
    // Handle unlock button click
    unlockBtn.addEventListener('click', validateAccessCode);
    
    // Handle Enter key press
    accessInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validateAccessCode();
        }
    });
}

function validateAccessCode() {
    const accessInput = document.getElementById('accessCodeInput');
    const errorMessage = document.getElementById('accessErrorMessage');
    const overlay = document.getElementById('presaleLockOverlay');
    
    if (!accessInput || !errorMessage || !overlay) return;
    
    const enteredCode = accessInput.value.trim().toUpperCase();
    const correctCode = CONFIG.presaleAccessCode.toUpperCase();
    
    if (enteredCode === correctCode) {
        // Correct code - unlock presale
        errorMessage.style.display = 'none';
        overlay.classList.add('hidden');
        
        // Clear the input
        accessInput.value = '';
        
        // Show success notification
        showNotification('✓ Presale Access Granted! Welcome to the inner gang.', 'success');
    } else {
        // Wrong code - show error
        errorMessage.style.display = 'flex';
        accessInput.value = '';
        accessInput.focus();
        
        // Shake animation is handled by CSS
    }
}

// Presale Wallet Generation
function generatePresaleWallet() {
    const walletDisplay = document.getElementById('walletAddressDisplay');
    const displayedWallet = document.getElementById('displayedWallet');
    const generateBtn = document.getElementById('generateWalletBtn');
    
    if (!walletDisplay || !displayedWallet || !generateBtn) return;
    
    // Select random wallet from pool
    const randomIndex = Math.floor(Math.random() * CONFIG.presaleWallets.length);
    const selectedWallet = CONFIG.presaleWallets[randomIndex];
    
    // Display the wallet address
    displayedWallet.textContent = selectedWallet;
    
    // Hide button and show wallet display
    generateBtn.style.display = 'none';
    walletDisplay.style.display = 'block';
    
    // Show success notification
    showNotification('✓ Your presale wallet address has been generated!', 'success');
}

function copyWalletAddress() {
    const walletAddress = document.getElementById('displayedWallet');
    const copyBtn = document.getElementById('copyWalletBtn');
    
    if (!walletAddress || !copyBtn) return;
    
    // Copy to clipboard
    const address = walletAddress.textContent;
    
    navigator.clipboard.writeText(address).then(() => {
        // Change button text temporarily
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        
        showNotification('✓ Wallet address copied to clipboard!', 'success');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
        }, 2000);
    }).catch(err => {
        showNotification('Failed to copy address. Please copy manually.', 'error');
        console.error('Copy failed:', err);
    });
}

// Audio toggle functionality
function toggleAudio() {
    const video = document.getElementById('cliffordVideo');
    const audioToggle = document.getElementById('audioToggle');
    const icon = audioToggle.querySelector('i');
    
    if (!video || !audioToggle || !icon) return;
    
    if (video.muted) {
        // Unmute the video
        video.muted = false;
        icon.className = 'fas fa-volume-up';
        audioToggle.classList.add('unmuted');
        audioToggle.title = 'Mute Audio';
    } else {
        // Mute the video
        video.muted = true;
        icon.className = 'fas fa-volume-mute';
        audioToggle.classList.remove('unmuted');
        audioToggle.title = 'Unmute Audio';
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 300px;
        font-size: 0.9rem;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin: 0;
        line-height: 1;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(10, 10, 10, 0.95);
        backdrop-filter: blur(10px);
        padding: 2rem;
        gap: 1rem;
    }
    
    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .nav-toggle.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);

// Staking functionality (placeholder)
document.querySelectorAll('.staking-card .btn').forEach(btn => {
    btn.addEventListener('click', function() {
        showNotification('Staking will be available after the official token launch. Stay tuned!', 'info');
    });
});

// Social media tracking (optional analytics)
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function() {
        const platform = this.classList.contains('instagram') ? 'Instagram' : 
                        this.classList.contains('twitter') ? 'Twitter' :
                        this.classList.contains('telegram') ? 'Telegram' :
                        this.classList.contains('discord') ? 'Discord' : 'Unknown';
        
        console.log(`Social link clicked: ${platform}`);
        // Here you could add analytics tracking
    });
});

// Copy contract address functionality (when available)
function copyContractAddress() {
    if (CONFIG.contractAddress && CONFIG.contractAddress !== '0x...') {
        navigator.clipboard.writeText(CONFIG.contractAddress).then(() => {
            showNotification('Contract address copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Failed to copy contract address', 'error');
        });
    } else {
        showNotification('Contract address will be available soon!', 'info');
    }
}

// Performance optimization: Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
setupLazyLoading();

// Error handling for Web3 connection
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    
    // Handle specific Web3 errors
    if (event.reason && event.reason.message) {
        const message = event.reason.message;
        if (message.includes('User rejected') || message.includes('User denied')) {
            showNotification('Transaction was cancelled', 'info');
        } else if (message.includes('insufficient funds')) {
            showNotification('Insufficient funds for this transaction', 'error');
        } else if (message.includes('gas')) {
            showNotification('Gas fee estimation failed. Please try again.', 'error');
        }
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        connectWallet,
        buyTokens,
        updateTokenAmount,
        showNotification
    };
}