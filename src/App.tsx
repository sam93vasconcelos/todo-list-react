import React, { useEffect, useState } from "react";

interface Item {
  id: number;
  description: string;
  checked: boolean;
}

function App() {
  const [items, setItems] = useState<Array<Item>>([]);

  useEffect(() => {
    const items = localStorage.getItem('@my-list:items');

    if (items) {
      setItems(JSON.parse(items));
    }
  }, []);

  useEffect(() => {
    persist();
  }, [items]);

  function handleChange(data: Item) {
    const currentItems = items.map((item) => {
      if (item.id === data.id) {
        item.description = data.description;
        item.checked = data.checked;
      }

      return item;
    })

    setItems(currentItems);
  }

  function removeItem(id: number) {
    const filteredItems = items.filter((i) => i.id !== id);

    setTimeout(() => {
      setItems(filteredItems);
    });
  }

  function addItem() {
    let id = 1;

    if (items.length) {
      const lastItem = items.reduce((a, b) => a.id > b.id ? a : b);
      id = lastItem.id + 1;
    }

    setItems([...items, { id, description: '', checked: false }]);

    setTimeout(() => {
      document.getElementById(`input-${id}`)?.focus();
    });
  }

  function persist() {
    localStorage.setItem('@my-list:items', JSON.stringify(items));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === 'Enter') {
      addItem();
    }
  }

  return (
    <main>
      <h1>Coisas pra fazer</h1>

      <ul>
        {
          items?.map((item) => (
            <li key={item.id}>
              <input type="checkbox" checked={item.checked} onChange={(e) => handleChange({ id: item.id, description: item.description, checked: e.target.checked })} />
              <input id={`input-${item.id}`} type="text" value={item.description} onChange={(e) => handleChange({ id: item.id, description: e.target.value, checked: item.checked })} onKeyDown={handleKeyDown} />
              <button onClick={() => removeItem(item.id)}>X</button>
            </li>
          ))
        }
      </ul>

      <div className="add-button-wrapper">
        <button className="add-button" onClick={addItem}>Adicionar</button>
      </div>
    </main>
  )
}

export default App
