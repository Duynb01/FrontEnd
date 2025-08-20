"use client";

import { faPenToSquare, faSave } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Trash2, XCircle } from "lucide-react";
import { useState } from "react";

export default function CartItem({
  item,
  isSelected,
  onSelect,
  onDelete,
  onUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(item.quantity);

  const handleSave = () => {
    setIsEditing(false);
    onUpdate(item.cartItemId, localQuantity);
  };
  return (
    <div
      key={item.cartItemId}
      className="flex items-center gap-4 p-4 border rounded-lg relative"
    >
      <input type="checkbox" checked={isSelected} onChange={onSelect} />
      <img
        src={item.url}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h2 className="font-semibold text-lg">{item.name}</h2>
        <p className="text-sm text-gray-500">
          Giá: {item.price.toLocaleString()}₫
        </p>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <p>Số lượng:</p>
          {isEditing ? (
            <input
              type="number"
              value={localQuantity}
              min={1}
              onChange={(e) => setLocalQuantity(Number(e.target.value))}
              className="w-16 border px-2 py-1 rounded"
            />
          ) : (
            <span>{item.quantity}</span>
          )}
        </div>
      </div>
      <div className="gap-3 flex items-center absolute top-5 right-3">
        {isEditing ? (
          <>
            <button onClick={handleSave}>
              <FontAwesomeIcon
                icon={faSave}
                className="w-5 h-5 text-green-600"
              />
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
              }}
            >
              <XCircle className="w-5 h-5" />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>
              <FontAwesomeIcon icon={faPenToSquare} className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                onDelete(item.cartItemId);
              }}
            >
              <Trash2 />
            </button>
          </>
        )}
      </div>
      <p className="font-bold text-right">
        {(item.price * item.quantity).toLocaleString()}₫
      </p>
    </div>
  );
}
