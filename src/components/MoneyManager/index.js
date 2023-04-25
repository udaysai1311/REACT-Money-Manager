import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    tittleValue: '',
    amountValue: '',
    selectValue: 'Income',
    list: [],
    balance: 0,
    income: 0,
    expense: 0,
  }

  onEnterTittle = event => {
    this.setState({tittleValue: event.target.value})
  }

  onEnterAmount = event => {
    this.setState({amountValue: event.target.value})
  }

  onSelectOption = event => {
    this.setState({selectValue: event.target.value})
  }

  onAddToList = () => {
    const {
      tittleValue,
      amountValue,
      selectValue,
      balance,
      income,
      expense,
    } = this.state
    const newArrayItem = {
      id: uuidv4(),
      tittle: tittleValue,
      amount: amountValue,
      type: selectValue,
    }
    this.setState(prevState => ({
      list: [...prevState.list, newArrayItem],
      tittleValue: '',
      amountValue: '',
    }))
    if (newArrayItem.type === 'Income') {
      this.setState({
        income: parseInt(income) + parseInt(newArrayItem.amount),
        balance: parseInt(balance) + parseInt(newArrayItem.amount),
      })
    } else if (newArrayItem.type === 'Expenses') {
      this.setState({
        expense: parseInt(expense) + parseInt(newArrayItem.amount),
        balance: parseInt(balance) - parseInt(newArrayItem.amount),
      })
    }
  }

  deleteListItem = (id, amount, type) => {
    const {balance, income, expense} = this.state
    this.setState(prevState => ({
      list: prevState.list.filter(eachItem => eachItem.id !== id),
    }))
    if (type === 'Income') {
      this.setState({
        income: parseInt(income) - parseInt(amount),
        balance: parseInt(balance) - parseInt(amount),
      })
    } else if (type === 'Expenses') {
      this.setState({
        expense: parseInt(expense) - parseInt(amount),
        balance: parseInt(balance) + parseInt(amount),
      })
    }
  }

  render() {
    const {
      tittleValue,
      amountValue,
      selectValue,
      list,
      balance,
      income,
      expense,
    } = this.state
    return (
      <div className="money-manager-container">
        <div className="greeting-container">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <MoneyDetails balance={balance} expense={expense} income={income} />
        <div className="transaction-container">
          <div className="add-transaction-container">
            <h1 className="add-head">Add Transaction</h1>
            <label htmlFor="tittle">TITLE</label>
            <br />
            <input
              id="tittle"
              placeholder="TITLE"
              value={tittleValue}
              onChange={this.onEnterTittle}
            />
            <br />
            <label htmlFor="amount">AMOUNT</label>
            <br />
            <input
              id="amount"
              placeholder="AMOUNT"
              value={amountValue}
              onChange={this.onEnterAmount}
            />
            <br />
            <label htmlFor="type">TYPE</label>
            <br />
            <select
              id="type"
              value={selectValue}
              onChange={this.onSelectOption}
            >
              {transactionTypeOptions.map(eachItem => (
                <option value={eachItem.displayText} key={eachItem.optionId}>
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <br />
            <button
              type="button"
              className="add-button"
              onClick={this.onAddToList}
            >
              Add
            </button>
          </div>
          <div className="history-container">
            <h1 className="history-head">History</h1>
            <div>
              <ul className="ul-container">
                <li className="list-container list1">
                  <p>Title</p>
                  <p>Amount</p>
                  <p>Type</p>
                </li>
                {list.map(eachItem => (
                  <TransactionItem
                    listItem={eachItem}
                    key={eachItem.id}
                    deleteListItem={this.deleteListItem}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
