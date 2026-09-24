import useToggle from "./useToggle"

export default function App() {
  const [value, toggleValue] = useToggle(true)

  const [data, setData] = useToggle(true)
  console.log(value);
  return (
    <>

      <div>
        <button onClick={toggleValue}>Toggle Heading</button>
        <button onClick={() => toggleValue(false)}>Hide Haeding</button>
        <button onClick={() => toggleValue(true)}>Show Heading</button>
        {
          value ? <h1>Custom hooks in react js</h1> : null
        }
      </div>

      <hr />

      <div>
        <button onClick={setData}>Toggle Heading</button>
        <button onClick={() => setData(false)}>Hide Haeding</button>
        <button onClick={() => setData(true)}>Show Heading</button>
        {
          data ? <h1>Second Heading</h1> : null
        }
      </div>

    </>


  )
}