const incomeHeaderAmount = document.querySelector('.income-header p:last-child')
const outcomeHeaderAmount = document.querySelector('.outcome-header p:last-child')
const balanceAmount = document.querySelector('.balance').children

const tabs = document.querySelectorAll('.budget-dashboard h2')
const incomeTab = document.querySelector('.income-container h2')
const expenseTab = document.querySelector('.expense-container h2')
const allTab = document.querySelector('.income-container h2')
const incomeList = document.querySelector('.income-container ul')
const expenseList = document.querySelector('.expense-container ul')
const allList = document.querySelector('.all ul')
const listsEl = document.querySelectorAll('.list')
const incomeTitle = document.querySelector('.income-container input[type=text]')
const incomeAmount = document.querySelector('.income-container input[type=number]')
const addIncome = document.querySelector('.income-container input[type=submit]')
const expenseTitle = document.querySelector('.expense-container input[type=text]')
const expenseAmount = document.querySelector('.expense-container input[type=number]')
const addExpense = document.querySelector('.expense-container input[type=submit]')
const chart = document.querySelector('.chart')


const canvas = document.createElement('canvas')
canvas.width = 120
canvas.height = 120
chart.appendChild(canvas)
let ctx = canvas.getContext('2d')
ctx.lineWidth = 10

let incomeBalance = 0,
    outcomeBalance = 0,
    balance = 0,
    deleteIcon = 'fa fa-trash',
    editIcon = 'fas fa-edit'
let entryList = JSON.parse(localStorage.getItem('budget-entries')) ? JSON.parse(localStorage.getItem('budget-entries')) : []
updateUI()



function drawCircle(color, ratio, anticlockwise) {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.arc(60, 60, 50, 0, Math.PI * ratio * 2, anticlockwise)
    ctx.stroke()

}




function deleteItem(e) {
    if (e.target.className === deleteIcon) {
        console.log(e.target.parentElement.parentElement)
        let itemId = e.target.parentElement.parentElement.attributes.id.value
        entryList.splice(itemId, 1)
        updateUI()
    }
}

function editItem(e) {
    if (e.target.className === editIcon) {
        const listItem = e.target.parentElement.parentElement
        if (listItem.className === 'income') {
            incomeTitle.value = entryList[listItem.attributes.id.value].title
            incomeAmount.value = entryList[listItem.attributes.id.value].amount
            entryList.splice(listItem.attributes.id.value, 1)
        } else if (listItem.className === 'expense') {
            expenseTitle.value = entryList[listItem.attributes.id.value].title
            expenseAmount.value = entryList[listItem.attributes.id.value].amount
            entryList.splice(listItem.attributes.id.value, 1)
        }
        console.log(entryList)
        updateUI()
    }
}

function clearInputs(inputs) {
    inputs.forEach(function(input) {
        input.value = ''
    })
}

function clearList() {
    listsEl.forEach(function(list) {
        list.innerHTML = ''
    })
}

function updateHeader() {
    incomeHeaderAmount.innerHTML = '$' + incomeBalance
    outcomeHeaderAmount.innerHTML = '$' + outcomeBalance
    balanceAmount[0].innerHTML = incomeBalance < outcomeBalance ? '-$' : '$'
    balanceAmount[1].innerHTML = balance
}

function addEntry(list, type, title, amount, id) {
    let listItem = `<li class="${type}" id="${id}">
                        ${title}: $${amount}
                        <div>
                            <i class="fas fa-edit"></i>
                            <i class="fa fa-trash"></i>
                        </div>
                    </li>`
    list.insertAdjacentHTML('afterbegin', listItem)
}

function updateUI() {
    clearList()
    incomeBalance = 0, outcomeBalance = 0, balance = 0
    entryList.forEach(function(entry, index) {
        if (entry.type === 'income') {
            addEntry(incomeList, entry.type, entry.title, entry.amount, index)
            incomeBalance += parseFloat(entry.amount)
        } else {
            addEntry(expenseList, entry.type, entry.title, entry.amount, index)
            outcomeBalance += parseFloat(entry.amount)
        }
        addEntry(allList, entry.type, entry.title, entry.amount, index)
    })
    balance = Math.abs(incomeBalance - outcomeBalance)
    updateHeader()
    let ratio = incomeBalance / (incomeBalance + outcomeBalance)
    drawCircle('lawngreen', -ratio, true)
    drawCircle('tomato', 1 - ratio, false)
    localStorage.setItem('budget-entries', JSON.stringify(entryList))
}

function budget(type, title, amount) {
    if (!title || !amount) return
    let entry = {
        type: type,
        title: title,
        amount: amount
    }
    entryList.push(entry)
    updateUI()
    clearInputs([incomeTitle, incomeAmount, expenseTitle, expenseAmount])
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

document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        budget('income', incomeTitle.value, incomeAmount.value)
        budget('expense', expenseTitle.value, expenseAmount.value)
    }
})

listsEl.forEach(function(list) {
    list.addEventListener('click', function(e) {
        deleteItem(e)
        editItem(e)
    })
})