import { ACTION } from "../App"

// eslint-disable-next-line react/prop-types
export default function DigitBtn({digit, dispatch}){
    return <button onClick={()=>dispatch({type: ACTION.ADD_DIGIT, payload:{digit:digit}})}> {digit} </button>
}