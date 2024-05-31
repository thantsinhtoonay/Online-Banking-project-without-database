let balance = 0;
const transactions = [];

const recipientMap = {
    '09987654321': 'John Doe',
    '09111111111': 'Chit Chit',
    // Add more recipient mappings as needed
};


function startOperation(operationType) {
    const amountElement = document.getElementById(`${operationType}Amount`);
    const amount = parseFloat(amountElement.value);

    switch (operationType) {
        case 'deposit':
            deposit(amount);
            break;
        case 'withdraw':
            withdraw(amount);
            break;
        case 'transfer':
            transfer();
            break;
    }

    amountElement.value = ''; // Clear the input field
}

function deposit(amount) {
    if (!isNaN(amount) && amount > 0) {
        balance += amount;
        updateBalance();
        addTransition(amount, 'Deposit');
    } else {
        displayInvalidMessage('Please enter a valid amount for deposit.');
    }
}

function withdraw(amount) {
    if (!isNaN(amount) && amount > 0 && balance >= amount) {
        balance -= amount;
        updateBalance();
        addTransition(-amount, 'Withdrawal');
    } else {
        displayInvalidMessage('Invalid withdrawal amount or insufficient balance.');
    }
}

function transfer() {
    const recipientNumber = document.getElementById('recipient').value;
    const amount = parseFloat(document.getElementById('transferAmount').value);

    if (!isNaN(amount) && amount > 0 && validRecipient(recipientNumber)) {
        if (balance >= amount) {
            const confirmation = confirm(`Are you sure you want to transfer $${amount} to ${recipientMap[recipientNumber]}?`);
            if (confirmation) {
                balance -= amount;
                updateBalance();
                addTransition(-amount, 'Transfer', recipientNumber);
            }
        } else {
            displayInvalidMessage('Insufficient balance for the transfer.');
        }
    } else {
        displayInvalidMessage('Please enter a valid amount and recipient.');
    }
}


function updateBalance() {
    const balanceElement = document.getElementById('balanceAmount');
    const newBalance = balance.toFixed(2);
    balanceElement.classList.add('hidden');
    setTimeout(() => {
        balanceElement.textContent = newBalance;
        balanceElement.classList.remove('hidden');
    }, 500);
}

function addTransition(amount, type, recipientNumber) {
    const time = new Date().toLocaleString();
    const recipientName = recipientMap[recipientNumber] || 'Unknown Recipient';
    transactions.push({ amount, type, recipient: recipientName, time });
    updateInvoice();
}


function updateInvoice() {
    const issueDate = new Date().toLocaleString();
    document.getElementById('issueDate').textContent = issueDate;

    const transactionList = document.getElementById('transitionList'); // Change 'transitionList' to 'transactionList'
    transactionList.innerHTML = '';

    transactions.forEach(transition => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transition.type}</td>
            <td>$${Math.abs(transition.amount).toFixed(2)}</td>
            <td>${transition.recipient}</td>
            <td>${transition.time}</td>
        `;
        transactionList.prepend(row); // Change 'prependChild' to 'prepend'
    });
}

function validRecipient(recipient) {
    const phonePattern = /^\d{11}$/; // Assuming a 11-digit phone number
    return recipient.trim() !== '' && phonePattern.test(recipient.trim());
}

function displayInvalidMessage(message) {
    const invalidMessageElement = document.getElementById('invalidMessage');
    invalidMessageElement.textContent = message;
    invalidMessageElement.style.display = 'block';
}