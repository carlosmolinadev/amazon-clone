import React, { useEffect, useRef } from "react";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";

function Paypal() {
  const paypal = useRef();
  const [{ basket }, dispatch] = useStateValue();
  const history = useHistory();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, error) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Paquete turistico",
                amount: {
                  currency_code: "USD",
                  value: getBasketTotal(basket),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          dispatch({
            type: "EMPTY_BASKET",
          });

          history.replace("/orders");
        },
        onError: (err) => console.log(err),
      })
      .render(paypal.current);
  }, []);
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}

export default Paypal;
