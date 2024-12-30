import "./app.css"
import SlotMachine from "./components/machine/SlotMachine"
import usePrize from "./hooks/usePrize"


function App() {
  usePrize()
  return (
   <div className="App">
    <SlotMachine />
   </div>
  )
}

export default App
