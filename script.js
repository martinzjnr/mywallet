document.addEventListener('DOMContentLoaded', function() {
    // Token balance with 43+ digits
    const fullBalance = "8749321658749321658749321658749321658749321.658749321";
    const shortBalance = fullBalance.substring(0, 7) + "..." + fullBalance.substring(fullBalance.length - 4);
    
    // Exchange rate (BTC to USD)
    const exchangeRate = 42819.50;
    
    // DOM elements
    const balanceContainer = document.getElementById('balance-container');
    const balanceDisplay = document.getElementById('balance-display');
    const balanceHint = document.querySelector('.balance-hint');
    const usdValueDisplay = document.getElementById('usd-value');
    const updateTimeDisplay = document.getElementById('update-time');
    
    // Initial state
    let isFullBalanceShown = false;
    balanceDisplay.textContent = shortBalance;
    
    // Calculate and display USD value
    function calculateUsdValue() {
        const balanceNum = parseFloat(fullBalance);
        const usdTotal = balanceNum * exchangeRate;
        usdValueDisplay.textContent = formatCurrency(usdTotal);
    }
    
    // Format currency with commas and decimal places
    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }
    
    // Toggle balance display
    balanceContainer.addEventListener('click', function() {
        isFullBalanceShown = !isFullBalanceShown;
        
        balanceDisplay.classList.add('fade-in');
        
        if (isFullBalanceShown) {
            balanceDisplay.textContent = fullBalance;
            balanceHint.textContent = "Click to collapse";
        } else {
            balanceDisplay.textContent = shortBalance;
            balanceHint.textContent = "Click to view full balance";
        }
        
        // Remove animation class after animation completes
        setTimeout(() => {
            balanceDisplay.classList.remove('fade-in');
        }, 300);
    });
    
    // Update the "last updated" time
    function updateLastUpdatedTime() {
        const now = new Date();
        updateTimeDisplay.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Initialize
    calculateUsdValue();
    updateLastUpdatedTime();
    
    // Simulate periodic updates
    setInterval(function() {
        // Simulate small balance fluctuations
        const randomChange = (Math.random() * 0.01) - 0.005;
        const currentRate = exchangeRate * (1 + randomChange);
        
        // Recalculate USD value
        const balanceNum = parseFloat(fullBalance);
        const usdTotal = balanceNum * currentRate;
        usdValueDisplay.textContent = formatCurrency(usdTotal);
        
        // Update time
        updateLastUpdatedTime();
    }, 30000); // Update every 30 seconds
    
    // Handle navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
});