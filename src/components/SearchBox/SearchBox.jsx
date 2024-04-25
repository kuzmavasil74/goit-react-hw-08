import { useDispatch, useSelector } from 'react-redux'
import { changeFilter } from '../../redux/filtersSlice'
import { useId } from 'react'

import css from './SearchBox.module.css'

const SearchBox = () => {
  const selectNameFilter = useSelector((state) => {
    state.filter.name
  })
  const dispatch = useDispatch()
  const id = useId()

  const handelInputSearch = (evt) => {
    dispatch(changeFilter(evt.target.value))
  }
  return (
    <div>
      <h2 className={css.searchBoxTitle}>Find contact by name:</h2>
      <input
        id={id}
        className={css.searchBoxInput}
        type="text"
        placeholder="Please enter name ..."
        value={selectNameFilter}
        onChange={handelInputSearch}
      />
    </div>
  )
}
export default SearchBox
