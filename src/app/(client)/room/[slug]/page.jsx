import ProductRoomStylePage from "@/components/page/ProductRoomStyle";
import { getProductRoomStyle } from "@/lib/api/apiProduct";

export const metadata = {
  title: "Nội thất hiện đại",
  description: "Nội thất hiện đại",
  icons: {
    icon: "/logo.svg",
  },
};
export default async function RoomPage({ params }) {
  const { slug } = await params;
  const { room, products } = await getProductRoomStyle(slug);
  return <ProductRoomStylePage room={room} products={products} />;
}
