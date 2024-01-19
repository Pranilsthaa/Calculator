import { ACTION } from "../App"

// eslint-disable-next-line react/prop-types
export default function OperationBtn({operation, dispatch}){
    return <button onClick={()=> dispatch({type:ACTION.CHOOSE_OPERATION, payload:{digit:operation}})}>{operation}</button>
}