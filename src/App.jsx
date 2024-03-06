import React, { useEffect, useState } from 'react';
import { supabase } from "./server";
import "./App.css";

function App() {
  const [info, setInfo] = useState([]);
  const [formData, setFormData] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const fetchData = async () => {
    try {
      let { data } = await supabase
        .from('SearchTable')
        .select('*');

      setInfo(data || []);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const fetchSearchData = async () => {
    try {
      let searchQuery = `%${searchInput}%`;
      if (searchInput.includes(' ')) {
        const searchTerms = searchInput.split(' ').map((term) => `%${term}%`);
        searchQuery = `%${searchTerms.join('%')}%`;
      }

      let { data } = await supabase
        .from('SearchTable')
        .select('*')
        .filter('data', 'ilike', searchQuery);

      setInfo(data || []);
    } catch (error) {
      console.error('Error fetching search data:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.trim() !== "") {
      try {
        await supabase
          .from('SearchTable')
          .insert([{ data: formData }]);

        setFormData("");
        fetchData();
      } catch (error) {
        console.error('Error inserting data:', error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    await supabase
      .from('SearchTable')
      .delete()
      .eq('id', id);

    fetchData();
  };

  useEffect(() => {
    if (searchInput.trim() !== "") {
      fetchSearchData();
    } else {
      fetchData();
    }
  }, [searchInput]);

  return (
    <div>
      <nav>
        <h1>SEARCH APP</h1>
        <div className="input">
          <input
            type="text"
            placeholder='Search Here....'
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>
      </nav>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            type="text"
            placeholder='Enter data...'
            value={formData}
            onChange={handleChange}
          />
          <button className='button' type='submit' disabled={!formData.trim()}>
            Submit
          </button>
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Created At</th>
            <th>Data</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {info.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.created_at}</td>
              <td>
                <span dangerouslySetInnerHTML={{
                  __html: t.data.replace(
                    new RegExp(`(${searchInput.split(/\s+/).join('|')})`, 'gi'),
                    (match) => `<mark>${match}</mark>`
                  ),
                }} />
              </td>
              <td>
                <button className={`button delete-button`} onClick={() => { handleDelete(t.id) }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
