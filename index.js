// Select the form used to add new transactions
const form = document.querySelector(".add");

// Select income and expense lists (UL elements)
const incomeList = document.querySelector("ul.income-list");
const expenseList = document.querySelector("ul.expense-list");

// Select balance, income, and expense display elements
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

// Get transactions from localStorage
// If nothing exists, use an empty array
let transactions = localStorage.getItem("transactions") !== null ? JSON.parse(localStorage.getItem("transactions")) : [];


// ---------------------------------------------
// Update income, expense, and balance statistics
// ---------------------------------------------
const updateStatistics = () => {

    // Calculate total income (amount > 0)
    const updatedIncome = transactions
        .filter(transaction => transaction.amount > 0)
        .reduce((total, transaction) => total += transaction.amount, 0)

    // Calculate total expense (amount < 0)
    // Math.abs is used to show positive values
    const updatedExpense = transactions
        .filter(transaction => transaction.amount < 0)
        .reduce((total, transaction) => total += Math.abs(transaction.amount), 0)

    // Calculate balance
    updatedBalance = updatedIncome - updatedExpense

    // Update UI values
    balance.textContent = updatedBalance
    income.textContent = updatedIncome
    expense.textContent = updatedExpense

}

// ---------------------------------------------
// Generate HTML template for transaction item
// ---------------------------------------------
function generateTemplate(id, source, amount, time) {
    return `<li data-id="${id}">
                <p>
                    <span>${source}</span>
                    <span id="time">${time}</span>
                </p>
                <span>${Math.abs(amount)}</span>
                <i class="bi bi-trash delete"></i>
            </li>`;
}

// ---------------------------------------------
// Add transaction to DOM (income or expense)
// ---------------------------------------------
function addTransactionDOM(id, source, amount, time) {
    if (amount > 0) {
        incomeList.innerHTML += generateTemplate(id, source, amount, time);
    } else {
        expenseList.innerHTML += generateTemplate(id, source, amount, time);
    }
}

// ---------------------------------------------
// Create new transaction object and store it
// ---------------------------------------------
function addTransaction(source, amount) {
    const time = new Date();

    // Transaction object
    const transaction = {
        id: Math.floor(Math.random() * 100000),
        source: source,
        amount: amount,
        time: `${time.toLocaleTimeString()} ${time.toLocaleDateString()}`
    };

    // Add to array
    transactions.push(transaction);

    // Save to localStorage
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Show in UI
    addTransactionDOM(transaction.id, source, amount, transaction.time);
}

// ---------------------------------------------
// Handle form submission
// ---------------------------------------------
form.addEventListener("submit", event => {
    event.preventDefault();

    // Validate input fields
    if (form.source.value.trim() === "" || form.amount.value === "") {
        return alert("Please fill Proper Information")
    }

    // Add transaction
    addTransaction(form.source.value.trim(), Number(form.amount.value));

    // Update balance
    updateStatistics()

    // Reset form
    form.reset();
})

// ---------------------------------------------
// Load transactions from localStorage on page load
// ---------------------------------------------
function getTransaction() {
    transactions.forEach(transaction => {
        if (transaction.amount > 0) {
            incomeList.innerHTML += generateTemplate(transaction.id, transaction.source, transaction.amount, transaction.time);
        } else {
            expenseList.innerHTML += generateTemplate(transaction.id, transaction.source, transaction.amount, transaction.time);
        }
    });
}

// ---------------------------------------------
// Delete transaction by ID
// ---------------------------------------------
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => {
        return transaction.id !== id;
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// ---------------------------------------------
// Handle delete click for income list
// ---------------------------------------------
incomeList.addEventListener("click", event => {
    if (event.target.classList.contains("delete")) {
        event.target.parentElement.remove();
        deleteTransaction(Number(event.target.parentElement.dataset.id));
        updateStatistics()
    }
});

// ---------------------------------------------
// Handle delete click for expense list
// ---------------------------------------------
expenseList.addEventListener("click", event => {
    if (event.target.classList.contains("delete")) {
        event.target.parentElement.remove();
        deleteTransaction(Number(event.target.parentElement.dataset.id));
        updateStatistics()
    }
});

// ---------------------------------------------
// Initialize application
// ---------------------------------------------
const init = () => {
    updateStatistics()
    getTransaction()
}

// Start app
init()
