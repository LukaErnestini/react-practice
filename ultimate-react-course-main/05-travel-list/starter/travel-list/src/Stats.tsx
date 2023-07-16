import { ItemData } from "./types";

export default function Stats({ items }: { items: ItemData[] }) {
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
