document.getElementById('loan-form').addEventListener('submit', function(e) {
           document.getElementById('results').style.display = 'none';
           document.getElementById('loading').style.display = 'block';

           setTimeout(calculateInterest, 2000);

    e.preventDefault();
});

function calculateInterest() {
const loanAmount = document.getElementById('amount');
const loanInterest = document.getElementById('interest');
const loanYears = document.getElementById('years-to-repay');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

const principal = parseFloat(loanAmount.value);
const calculatedInterest = parseFloat(loanInterest.value) / 100 / 12;
const calculatedPayments = parseFloat(loanYears.value) * 12;

// compute monthly payment
const x = Math.pow(1 + calculatedInterest, calculatedPayments);
const monthly = (principal * x * calculatedInterest) / (x-1);

if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
}
else {
     showError("please check numbers");
}

}

function showError(error) {

   document.getElementById('loading').style.display = 'none';
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);

    setTimeout(clearError, 3000);

}

function clearError() {
    document.querySelector('.alert').remove();
}