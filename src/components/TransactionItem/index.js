import './index.css'

const TransactionItem = props => {
  const {listItem, deleteListItem} = props
  const {id, tittle, amount, type} = listItem

  const onDelete = () => {
    deleteListItem(id, amount, type)
  }

  return (
    <li className="list-container list2">
      <p>{tittle}</p>
      <p>{amount}</p>
      <p>{type}</p>
      <button type="button" className="del-button" data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="del-image"
          onClick={onDelete}
        />
      </button>
    </li>
  )
}
export default TransactionItem
