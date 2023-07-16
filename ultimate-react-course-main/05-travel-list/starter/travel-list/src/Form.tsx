import { useState } from "react";
import { ItemData } from "./types";

export default function Form({
  onAddItem,
}: {
  onAddItem: (item: ItemData) => void;
}) {
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
