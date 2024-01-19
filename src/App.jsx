import react from 'react'
import './App.css'
import DigitBtn from './Component/DigitBtn'
import OperationBtn from './Component/OperationBtn'

export const ACTION = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}


function reducer(state, action){
  switch(action.type){

    case ACTION.ADD_DIGIT:

    if(action.payload.digit==='.' && state.currentOperand.includes('.')){
      return state;
    }

      if(action.payload.digit==='0' && state.currentOperand==='0'){
        return state;
      }
   
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${action.payload.digit}`
      }

      case ACTION.CLEAR:
        return{}

      case ACTION.CHOOSE_OPERATION:

        if(state.currentOperand == null && state.prevOperand == null){
          return state;
        }

        if(state.prevOperand == null){
          return{
            ...state,
            prevOperand: state.currentOperand,
            operation: action.payload.digit,
            currentOperand: null
          }
        }

        if(state.currentOperand == null){
          return{
            ...state,
            operation: action.payload.digit
          }
        }

      return{
          ...state,
          prevOperand : evaluate(state),
          currentOperand: null,
          operation: action.payload.digit
      }

      case ACTION.EVALUATE:
        if(state.currentOperand == null){
            return {
              ...state
            }
            
        }
        
        return{
          ...state,
              currentOperand: evaluate(state),
              operation: null,
              prevOperand:null
        }

      case ACTION.DELETE_DIGIT:
        return{
          ...state,
          currentOperand: state.currentOperand.slice(0, -1)
        }
        

      default:
        return state;
        
  }
}


function evaluate({currentOperand, prevOperand, operation}){
  let current = parseFloat(currentOperand);
  let prev = parseFloat(prevOperand)
  let result = '';
  switch(operation){
    case '+':
       result = current + prev
       break
      case '-':
         result = prev - current
         break
        case '*':
           result = current * prev
           break
          case '÷':
             result = prev / current
             break  
  }
    return result.toString()
}



function App() {

const[{currentOperand, prevOperand, operation}, dispatch] = react.useReducer(reducer, {})

  return (
    <>
    <div className="calculator">

      <div className="output">
        <div className="prev-operand"> {prevOperand} {operation}</div>
        <div className="current-operand"> {currentOperand} </div>
      </div>

      <div className="btn-container">

      <button className='span-one' onClick={()=> dispatch({type:ACTION.CLEAR})}>AC</button>
      <button onClick={()=>dispatch({type:ACTION.DELETE_DIGIT})}>DEL</button>
      <OperationBtn operation="÷" dispatch={dispatch}/>
      <DigitBtn digit="1" dispatch={dispatch}/>
      <DigitBtn digit="2" dispatch={dispatch}/>
      <DigitBtn digit="3" dispatch={dispatch}/>
      <OperationBtn operation="*" dispatch={dispatch}/>
      <DigitBtn digit="4" dispatch={dispatch}/>
      <DigitBtn digit="5" dispatch={dispatch}/>
      <DigitBtn digit="6" dispatch={dispatch}/>
      <OperationBtn operation="+" dispatch={dispatch}/>
      <DigitBtn digit="7" dispatch={dispatch}/>
      <DigitBtn digit="8" dispatch={dispatch}/>
      <DigitBtn digit="9" dispatch={dispatch}/>
      <OperationBtn operation="-" dispatch={dispatch}/>
      <DigitBtn digit="." dispatch={dispatch}/>
      <DigitBtn digit="0" dispatch={dispatch}/>
      <button className='span-two' onClick={()=>dispatch({type:ACTION.EVALUATE})} >=</button>
      
       </div>
      </div>
    </>
  )
}

export default App
