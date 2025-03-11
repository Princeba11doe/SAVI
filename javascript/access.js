// Function to load and display transactions for the selected account
function showTransactions(accountId) {
    let transactionsHTML = '';
  
    if (accountId === 'checking') {
      transactionsHTML = `
        <ul>
          <li>Deposit: +$500.00 - Jan 5, 2025</li>
          <li>Withdrawal: -$120.00 - Jan 7, 2025</li>
          <li>POS Purchase: -$45.00 - Jan 10, 2025</li>
        </ul>
      `;
    } else if (accountId === 'savings') {
      transactionsHTML = `
        <ul>
          <li>Deposit: +$200.00 - Jan 3, 2025</li>
          <li>Deposit: +$150.00 - Jan 12, 2025</li>
        </ul>
      `;
    } else if (accountId === 'credit') {
      transactionsHTML = `
        <ul>
          <li>Purchase: -$50.00 - Jan 2, 2025</li>
          <li>Purchase: -$75.00 - Jan 8, 2025</li>
          <li>Payment: +$175.00 - Jan 15, 2025</li>
        </ul>
      `;
    } else {
      transactionsHTML = `<p>No transactions found.</p>`;
    }
  
    // Update the transactions list with the new content
    document.getElementById('transactionsList').innerHTML = transactionsHTML;
  }
  
  // --- Spending Habits Chart Setup ---
  // Use a multi-color palette for spending data
  const spendingData = {
    labels: ['Food', 'Entertainment', 'Utilities', 'Transportation', 'Other'],
    datasets: [{
      data: [25, 15, 20, 10, 30],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    }]
  };
  
  const spendingOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right'
      }
    }
  };
  
  const spendingCtx = document.getElementById('spendingChart').getContext('2d');
  const spendingChart = new Chart(spendingCtx, {
    type: 'doughnut',
    data: spendingData,
    options: spendingOptions
  });
  