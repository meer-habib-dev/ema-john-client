import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import useAuth from "../../hooks/useAuth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  const { user } = useAuth();
  useEffect(() => {
    fetch(`http://localhost:5000/orders?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("idToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          history.push("/login");
        }
      })
      .then((data) => setOrders(data));
  }, []);
  return (
    <div>
      <h1>This is my order.... {orders.length}</h1>
      <ul>
        {orders.map((order) => (
          <li>{order.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
