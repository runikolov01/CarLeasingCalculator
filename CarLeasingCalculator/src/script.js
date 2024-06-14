document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('leasingCalculator');

    // Function to update carValue text input when carValueRange changes
    document.getElementById('carValueRange').addEventListener('input', function () {
        document.getElementById('carValue').value = this.value;
        updateDownPayment();
    });

    // Function to update carValue range input when carValue text input changes
    document.getElementById('carValue').addEventListener('input', function () {
        document.getElementById('carValueRange').value = this.value;
        updateDownPayment();
    });

    // Function to update downPayment text input when downPaymentRange changes
    document.getElementById('downPaymentRange').addEventListener('input', function () {
        updateDownPayment();
    });

    function updateDownPayment() {
        document.getElementById('downPayment').value = document.getElementById('downPaymentRange').value;
    }

    form.addEventListener('input', function () {
        const carType = document.getElementById('carType').value;
        const carValue = parseInt(document.getElementById('carValue').value);
        const leasePeriod = parseInt(document.getElementById('leasePeriod').value);
        const downPaymentPercentage = parseInt(document.getElementById('downPayment').value);
        const downPayment = (carValue * downPaymentPercentage) / 100;

        let interestRate;
        if (carType === 'new') {
            interestRate = 0.0299;
        } else {
            interestRate = 0.037;
        }

        const monthlyInterestRate = interestRate / 12;
        const loanAmount = carValue - downPayment;
        const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -leasePeriod));
        const totalLeasingCost = monthlyPayment * leasePeriod + downPayment;

        document.getElementById('leasingCost').textContent = `Leasing Cost: €${totalLeasingCost.toFixed(2)}`;
        document.getElementById('downpaymentDetails').textContent = `Down Payment: €${downPayment.toFixed(2)}`;
        document.getElementById('monthlyInstallment').textContent = `Monthly Installment: €${monthlyPayment.toFixed(2)}`;
        document.getElementById('interestRate').textContent = `Interest Rate: ${(interestRate * 100).toFixed(2)}%`;
    });

    updateDownPayment();
});