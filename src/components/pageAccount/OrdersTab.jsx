import React from "react";

export default function OrdersTab() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Đơn hàng của tôi
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-gray-900">{order.id}</h3>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusIcon(order.status)}
                  {getStatusText(order.status)}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">{order.total}</div>
                <div className="text-sm text-gray-600">{order.date}</div>
              </div>
            </div>

            <div className="border-t pt-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {order.items} sản phẩm:
                  </p>
                  <p className="text-sm text-gray-800">
                    {order.products.join(", ")}
                  </p>
                </div>
                <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
