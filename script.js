// List of some common currencies
const currencyList = [
    "USD", "EUR", "GBP", "INR", "JPY", "CNY", "AUD", "CAD", "CHF", "SGD", "ZAR"
];

const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const resultDiv = document.getElementById('result');

// Populate currency dropdowns
currencyList.forEach(cur => {
    let option1 = document.createElement('option');
    option1.value = cur;
    option1.textContent = cur;
    fromSelect.appendChild(option1);

    let option2 = document.createElement('option');
    option2.value = cur;
    option2.textContent = cur;
    toSelect.appendChild(option2);
});
fromSelect.value = "USD";
toSelect.value = "INR";

// Fetch exchange rates and convert
async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const from = fromSelect.value;
    const to = toSelect.value;

    if (isNaN(amount) || amount < 0) {
        resultDiv.textContent = "Please enter a valid amount.";
        return;
    }
    if (from === to) {
        resultDiv.textContent = `${amount} ${from} = ${amount} ${to}`;
        return;
    }

    resultDiv.textContent = "Converting...";

    try {
        // Use a free API (exchangerate.host)
        const resp = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
        const data = await resp.json();

        if (data.result !== undefined) {
            resultDiv.textContent = `${amount} ${from} = ${data.result.toFixed(3)} ${to}`;
        } else {
            resultDiv.textContent = "Conversion failed. Try again.";
        }
    } catch (e) {
        resultDiv.textContent = "Error fetching rates.";
    }
}