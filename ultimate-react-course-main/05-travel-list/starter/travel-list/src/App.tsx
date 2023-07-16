import { useState } from "react";
import "./App.css";
import Logo from "./Logo";
import { ItemData } from "./types";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItem(item: ItemData) {
    setItems([...items, item]);
  }

  function handleDeleteItem(id: number) {
    const newItems = items.filter((i) => i.id !== id);
    setItems(newItems);
  }

  function handleClearItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (!confirmed) {
      return;
    }

    setItems([]);
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
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];
