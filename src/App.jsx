import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';

function App() {
  const [data, setData] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos/");
      setData(res.data);
    }
    catch (e) {
      console.log(e);
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  const filtervalues = data && data.filter(value => 
    value.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <input 
            type="text" 
            value={search} 
            placeholder="Search todos..." 
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80"
          />
          <button 
            onClick={fetchData}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Refresh Data
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <div className="grid gap-4">
            {filtervalues && filtervalues.map((item) => (
              <div 
                key={item.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <h2 className="text-lg text-gray-800">
                    {item.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App

