import { useDispatch, useSelector } from 'react-redux'
import applyFilter from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
      const filter = event.target.value
      console.log(filter)
      dispatch(applyFilter())
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter