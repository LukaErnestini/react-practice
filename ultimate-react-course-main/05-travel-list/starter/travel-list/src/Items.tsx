import { ItemData } from "./types";

export default function Item({
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
