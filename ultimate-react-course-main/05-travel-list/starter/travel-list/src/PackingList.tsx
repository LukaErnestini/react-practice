import { useState } from "react";
import { ItemData } from "./types";
import Item from "./Items";

export default function PackingList({
  items,
  onDeleteItem,
  onPackItem,
  onClearItems,
}: {
  items: ItemData[];
  onDeleteItem: (id: number) => void;
  onPackItem: (id: number) => void;
  onClearItems: () => void;
}) {
  const [sortBy, setSortBy] = useState("packed");

  let sortedItems = items;

  if (sortBy === "input") {
    sortedItems;
  } else if (sortBy === "description") {
    sortedItems = [...items].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  } else if (sortBy === "packed") {
    sortedItems = [...items].sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            key={item.id}
            onPackItem={onPackItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value={"input"}>Sort by input order</option>
          <option value={"description"}>Sort by description</option>
          <option value={"packed"}>Sort by packed status</option>
        </select>
        <button onClick={onClearItems}>Clear List</button>
      </div>
    </div>
  );
}
