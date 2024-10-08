let transactions = []
let totalIncome = 0
let totalExpense = 0
let totalBalance = 0

function display() {
  const income = document.getElementById('totalIncome')
  income.innerHTML = 'R' + totalIncome

  const expense = document.getElementById('totalExpense')
  expense.innerHTML = 'R' + totalExpense

  const balance = document.getElementById('totalBalance')
  balance.innerHTML = 'R' + totalBalance

  const tbody = document.querySelector('tbody')
  tbody.innerHTML = ''

  for (let i = 0; i < transactions.length; i++) {
    let t = transactions[i]
    let className = t.type === 'income' ? 'tIncome' : 'tExpense'

    tbody.innerHTML += `
                <tr class='${className}'>
                    <td>${t.title}</td>
                    <td>R${t.amount}</td>
                    <td style='text-align: center;'><button onclick="removeTransaction(${i})">X</button></td>
                </tr>
    `
  }
}

function addTransaction() {
  const amount = +document.getElementById('amount').value
  const type = document.getElementById('type').value
  const title = document.getElementById('title').value

  if (!amount || amount < 1) {
    alert('Provide the right amount!!!')
    return
  }

  if (!title) {
    alert('Detail is required')
    return
  }

  if (totalBalance < amount && type == 'expense') {
    alert('insufficient funds...')
    return
  }

  const transaction = {
    id: Math.floor(Math.random() * 100000000000) + 1,
    amount,
    type,
    title,
  }

  transactions.push(transaction)
  calculateTotal()
  display()
  saveToStorage()
  clearInput()
}

function calculateTotal() {
  totalIncome = 0
  totalExpense = 0
  totalBalance = 0

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type == 'income') {
      totalIncome += Number(transactions[i].amount)
    }
    if (transactions[i].type == 'expense') {
      totalExpense += Number(transactions[i].amount)
    }
  }

  totalBalance = Number(totalIncome) - Number(totalExpense)
}

function saveToStorage() {
  localStorage.setItem('transaction__app', JSON.stringify(transactions))
}

function getFromStorage() {
  transactions = JSON.parse(localStorage.getItem('transaction__app') || '[]')
  calculateTotal()
}

function removeTransaction(index) {
  const deleteT = window.confirm('Delete transaction?')

  if (deleteT) {
    transactions.splice(index, 1)
    saveToStorage()
    calculateTotal()
    display()
  }
}

function clearInput() {
    document.getElementById("title").value = ""
    document.getElementById("amount").value = ""
}

document.addEventListener('DOMContentLoaded', () => {
  getFromStorage()
  display()
})
