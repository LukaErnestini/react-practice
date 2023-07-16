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

  function handlePackItem(id: number) {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, packed: !item.packed };
      }
      return item;
    });
    setItems(newItems);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onPackItem={handlePackItem}
      />
      <Stats items={items} />
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
  onPackItem,
}: {
  items: ItemData[];
  onDeleteItem: (id: number) => void;
  onPackItem: (id: number) => void;
}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            key={item.id}
            onPackItem={onPackItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({
  item,
  onDeleteItem,
  onPackItem,
}: {
  item: ItemData;
  onDeleteItem: (id: number) => void;
  onPackItem: (id: number) => void;
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => {
          onPackItem(item.id);
        }}
      />
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

function Stats({ items }: { items: ItemData[] }) {
  const total = items.length;
  const packed = items.filter((item) => item.packed).length;
  const packedPercent = Math.round((packed / total) * 100);

  const renderStats = () => {
    if (!total) {
      return <em>Start adding some items to your packing list 🚀</em>;
    }

    if (packedPercent === 100) {
      return <em>You got everything! ready to go ✈</em>;
    }

    return (
      <em>
        👜 You have {total} items on your list, and you already packed {packed}(
        {packedPercent}%)
      </em>
    );
  };

  return <footer className="stats">{renderStats()}</footer>;
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
