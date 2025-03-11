// --- Chart Setup ---
// Dynamic values (Replace with dynamic user data as needed)
const savedAmount = 5230.50; // User's saved amount
let savingsGoal = 10000;     // User's savings goal (will update when user edits the goal)

// Function to update the chart with the new goal value
function updateChart() {
  // Calculate remaining money to reach goal. If savedAmount exceeds goal, remaining will be 0.
  const remaining = savedAmount >= savingsGoal ? 0 : savingsGoal - savedAmount;
  savingsChart.data.datasets[0].data = [savedAmount, remaining];
  savingsChart.update();
  
  // Update the progress text
  updateProgressText();
}

// Function to update the progress percentage text
function updateProgressText() {
  let progress = (savedAmount / savingsGoal) * 100;
  let message = '';
  if (savedAmount >= savingsGoal) {
    const exceededPercent = ((savedAmount / savingsGoal) * 100 - 100).toFixed(0);
    message = `Congratulations! You exceeded your goal by ${exceededPercent}%.`;
  } else {
    message = `Progress: ${Math.floor(progress)}% of your goal.`;
  }
  document.getElementById('progressMessage').textContent = message;
}

// Data for the savings chart
const savingsData = {
  labels: ['Saved', 'Remaining'],
  datasets: [{
    data: [savedAmount, savingsGoal - savedAmount],
    backgroundColor: ['#6a4c9c', '#ddd'], // Purple for saved, light gray for remaining
    borderWidth: 0
  }]
};

// Options for the chart
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '85%', // Increased cutout for a slimmer ring
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return '$' + tooltipItem.raw.toFixed(2);
        }
      }
    }
  }
};

// Create the chart
const ctx = document.getElementById('savingsChart').getContext('2d');
const savingsChart = new Chart(ctx, {
  type: 'doughnut',
  data: savingsData,
  options: chartOptions
});

// --- Edit Goal Functionality ---
let goalAmountSpan = document.getElementById('goalAmount');
const editGoalBtn = document.getElementById('editGoalBtn');
let isEditing = false;
let inputField;

editGoalBtn.addEventListener('click', function() {
  if (!isEditing) {
    // Switch to edit mode: replace the span with an input field
    isEditing = true;
    const currentValue = goalAmountSpan.textContent.replace(/[^0-9.]/g, '');
    inputField = document.createElement('input');
    inputField.type = 'number';
    inputField.value = currentValue;
    inputField.id = 'goalInput';
    inputField.style.fontSize = 'inherit';
    inputField.style.textAlign = 'center';
    
    // Listen for Enter key press in edit mode
    inputField.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        editGoalBtn.click();
      }
    });
    
    goalAmountSpan.parentNode.replaceChild(inputField, goalAmountSpan);
    editGoalBtn.textContent = 'Save';
  } else {
    // Save the new value: replace the input field with a span and update chart data
    isEditing = false;
    const newValue = parseFloat(inputField.value).toFixed(2);
    const newSpan = document.createElement('span');
    newSpan.id = 'goalAmount';
    newSpan.textContent = '$' + newValue;
    inputField.parentNode.replaceChild(newSpan, inputField);
    editGoalBtn.textContent = 'Edit Goal';
    
    // Update the global savingsGoal variable and refresh the chart
    savingsGoal = parseFloat(newValue);
    updateChart();
    
    // Update our reference so future edits work correctly
    goalAmountSpan = newSpan;
  }
});

// Initialize progress text when page loads
updateProgressText();
