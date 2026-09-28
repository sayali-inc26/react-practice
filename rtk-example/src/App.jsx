
import './App.css'
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import { useDispatch } from 'react-redux';
import { clearAllItem } from './redux/slice';

function App() {
  const dispatch = useDispatch();
  return (
    <>
      <Header />

      <main>
        <h1>React redux toolkit tutorials</h1>
        <button onClick={() => dispatch(clearAllItem(1))}>
          Clear Cart
        </button>

        <ProductCard />
      </main>
    </>
  )
}

export default App
