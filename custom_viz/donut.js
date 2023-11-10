// Example using Chart.js
var ctx = document.getElementById('myCustomVisualization').getContext('2d');

// Sample data (replace this with Looker API data)
var data = {
    labels: ["Label 1", "Label 2", "Label 3"],
    datasets: [
        {
            data: [30, 40, 30],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        },
        // Add more datasets for additional donut charts
    ]
};

// Chart configuration
var options = {
    cutoutPercentage: 50, // Adjust as needed
    responsive: true,
    maintainAspectRatio: false, // Adjust as needed
};

// Create the doughnut chart
var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options
});
