import './App.css';
import BarChart from './components/bar-chart'

function App() {
  const vals = `[
		{"State":"10","lesion data 1":1,"lesion data 2":2},
		{"State":"20","lesion data 1":2,"lesion data 2":1},
		{"State":"30","lesion data 1":4,"lesion data 2":2},
		{"State":"40","lesion data 1":8,"lesion data 2":1},
		{"State":"50","lesion data 1":5,"lesion data 2":2},
		{"State":"60","lesion data 1":5,"lesion data 2":4},
		{"State":"70","lesion data 1":4,"lesion data 2":10},
		{"State":"80","lesion data 1":2,"lesion data 2":9},
		{"State":"90","lesion data 1":3,"lesion data 2":6},
		{"State":"100","lesion data 1":4,"lesion data 2":1}
	]`;
  return (
    <div className="App">
        <BarChart width={280} height={130} chartData={vals}/>
    </div>
  );
}

export default App;
