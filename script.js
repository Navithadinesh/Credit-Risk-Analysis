// Example: Update gauge dynamically (if using modal)
function updateGauge(score) {
    const ctx = document.getElementById('gaugeChart').getContext('2d');
    if (window.gaugeChart) {
        window.gaugeChart.data.datasets[0].data = [score, 100 - score];
        window.gaugeChart.update();
    } else {
        window.gaugeChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Score', 'Remaining'],
                datasets: [{
                    data: [score, 100 - score],
                    backgroundColor: ['#4caf50', '#e0e0e0'],
                    borderWidth: 0
                }]
            },
            options: {
                rotation: -90,
                circumference: 180,
                plugins: { legend: { display: false } }
            }
        });
    }
}

// Example: Button click event if gauge in modal
document.querySelectorAll('.evaluate-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const clientScore = parseInt(btn.dataset.score);
        updateGauge(clientScore);
        document.getElementById('gaugeModal').style.display = 'block';
    });
});

// Close modal
document.getElementById('closeModal')?.addEventListener('click', () => {
    document.getElementById('gaugeModal').style.display = 'none';
});
