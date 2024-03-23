import { useEffect, useState } from "react";

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

  function handleChange(data: Item) {
    const currentItems = items.map((item) => {
      if (item.id === data.id) {
        item.description = data.description;
        item.checked = data.checked;
      }

      return item;
    })

    setItems(currentItems);
    persist();
  }

  function persist() {
    localStorage.setItem('@my-list:items', JSON.stringify(items));
  }

  function addItem() {
    let id = 1;

    if (items.length) {
      const lastItem = items.reduce((a, b) => a.id > b.id ? a : b);
      id = lastItem.id + 1;
    }

    setItems([...items, { id, description: '', checked: false }]);
  }

  function removeItem(id: number) {
    setItems(items.filter((i) => i.id !== id));
    persist();
  }

  return (
    <main>
      <h1>Coisas pra fazer</h1>

      <ul>
        {
          items?.map((item) => (
            <li key={item.id}>
              <input type="checkbox" checked={item.checked} onChange={(e) => handleChange({ id: item.id, description: item.description, checked: e.target.checked })} />
              <input type="text" value={item.description} onChange={(e) => handleChange({ id: item.id, description: e.target.value, checked: item.checked })} />
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
