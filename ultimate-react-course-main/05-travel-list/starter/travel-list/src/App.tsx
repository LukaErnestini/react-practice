import { useState } from "react";
import "./App.css";

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItem(item: ItemData) {
    setItems([...items, item]);
  }

  function handleDeleteItem(id: number) {
    const newItems = items.filter((i) => i.id !== id);
    setItems(newItems);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form({ onAddItem }: { onAddItem: (item: ItemData) => void }) {
  const [description, setDescription] = useState("");
  const [selectedValue, setSelectedValue] = useState(1);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!description) {
      return;
    }

    const newItem: ItemData = {
      description,
      id: Date.now(),
      packed: false,
      quantity: selectedValue,
    };

    onAddItem(newItem);

    setDescription("");
    setSelectedValue(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={selectedValue}
        onChange={(e) => setSelectedValue(+e.target.value)}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({
  items,
  onDeleteItem,
}: {
  items: ItemData[];
  onDeleteItem: (id: number) => void;
}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({
  item,
  onDeleteItem,
}: {
  item: ItemData;
  onDeleteItem: (id: number) => void;
}) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button
        onClick={() => {
          onDeleteItem(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>👜 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

type ItemData = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};
