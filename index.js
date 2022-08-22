const tabs = document.querySelectorAll('.budget-dashboard h2')
const incomeTab = document.querySelector('.income h2')
const expenseTab = document.querySelector('.expense h2')
const allTab = document.querySelector('.income h2')
const incomeTitle = document.querySelector('.income input[type=text]')
const incomeAmount = document.querySelector('.income input[type=number]')
const addIncome = document.querySelector('.income input[type=submit]')
const expenseTitle = document.querySelector('.expense input[type=text]')
const expenseAmount = document.querySelector('.expense input[type=number]')
const addExpense = document.querySelector('.expense input[type=submit]')

let entryList = []




function budget(type, title, amount) {
    if (!title || !amount) return
    let entry = {
        type: type,
        title: title,
        amount: amount
    }
    entryList.push(entry)
    console.log(entryList)
}


tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
        tabs.forEach(function(tab) {
            tab.parentNode.classList.remove('active')
        })
        this.parentNode.classList.add('active')
    })
})

addIncome.addEventListener('click', function() {
    budget('income', incomeTitle.value, incomeAmount.value)
})

addExpense.addEventListener('click', function() {
    budget('expense', expenseTitle.value, expenseAmount.value)
})