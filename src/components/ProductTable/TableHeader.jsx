import React from "react";

const TableHeader = ({ columns, setColumns, sortBy, sortDir, onSort }) => {
  const handleSort = (key) => {
    if (key === "image" || key === "actions") return;
    const newDir = sortBy === key && sortDir === "asc" ? "desc" : "asc";
    onSort(key, newDir);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("colIndex", index);
  };

  const handleDrop = (e, targetIndex) => {
    const sourceIndex = +e.dataTransfer.getData("colIndex");
    if (sourceIndex === targetIndex) return;

    const updated = [...columns];
    const [moved] = updated.splice(sourceIndex, 1);
    updated.splice(targetIndex, 0, moved);
    setColumns(updated);
  };

  return (
    <thead className="bg-gray-100 text-left">
      <tr>
        {columns.map((col, index) => (
          <th
            key={col.key}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index)}
            onClick={() => handleSort(col.key)}
            className="px-3 py-2 cursor-pointer select-none whitespace-nowrap"
          >
            {col.label}
            {sortBy === col.key && (
              <span className="ml-1 text-sm">
                {sortDir === "asc" ? "▲" : "▼"}
              </span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
