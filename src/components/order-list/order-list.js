import { useEffect } from "react";
import { useSelector } from "react-redux";
import Order from "../order/order";

const OrderList = () => {
  const { orders } = useSelector((store) => store.websocket);

  const feed = useEffect(() => {
    orders?.map((item) => (
      <li key={item._id}>
        <Order order={item} />
      </li>
    ));
  }, [orders]);

  return (
    <ul>
      {feed && feed.length === 0 ? (
        <li className={`text text_type_main-large`}>
          <h1>Заказы отсутствуют</h1>
        </li>
      ) : (
        <>{feed}</>
      )}
    </ul>
  );
};

export default OrderList;
