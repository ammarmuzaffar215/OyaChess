import React, { useEffect, useState } from "react";
import PublicNavbar from "../../Layouts/PublicNavbar";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { FaWhatsapp } from "react-icons/fa";
import { DataView } from "primereact/dataview";
import client from "../../../services/restClient";

const ShopPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    client
      .service("items")
      .find({ query: { $limit: 100 } })
      .then((res) => {
        setItems(res.data || []);
      })
      .catch((err) => {
        console.error("❌ Error loading items:", err);
      });
  }, []);

  const whatsappLink = (item) => {
    const finalPrice = item.discount ? item.price - item.discount : item.price;
    return `https://api.whatsapp.com/send?phone=+1234567890&text=Hi! I'm interested in buying "${item.title}" for RM ${finalPrice}. Can you tell me more?`;
  };

  const itemTemplate = (item, layoutType) => {
    if (!item) return null;

    const discounted = item.discount ? item.price - item.discount : item.price;

    return (
      <div className="col-12 md:col-4 p-3">
        <div className="border-1 surface-border surface-card border-round p-4 shadow-2 h-full flex flex-column justify-between">
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-64 object-contain bg-white rounded mb-3"
            />
          )}

          <div className="text-xl font-bold mb-2 text-center">{item.title}</div>
          <div className="text-md text-gray-700 mb-2 text-center">
            {item.description}
          </div>
          <div className="text-sm text-gray-700 mb-1 text-center">
            <strong>Type: </strong> {item.type}
          </div>
          <div className="text-sm text-gray-700 mb-2 text-center">
            <strong>Stock: </strong> {item.qty}
          </div>

          <div className="text-lg font-semibold mb-3 text-center">
            {item.discount > 0 ? (
              <>
                <span className="line-through text-gray-500 mr-2">
                  RM {item.price.toFixed(2)}
                </span>
                <span className="text-red-500">RM {discounted.toFixed(2)}</span>
              </>
            ) : (
              <>RM {item.price.toFixed(2)}</>
            )}
          </div>

          <div className="flex flex-col gap-2 mt-auto">
            <Button
              label={
                <div className="flex items-center justify-center gap-2">
                  Buy via WhatsApp <FaWhatsapp className="text-white text-lg" />
                </div>
              }
              className="bg-green-500 text-white w-full"
              onClick={() => window.open(whatsappLink(item), "_blank")}
            />

            {item.productLink && (
              <Button
                label={
                  <div className="flex items-center justify-center gap-2">
                    Buy on Shopee
                  </div>
                }
                className="bg-green-600 text-white w-full"
                onClick={() => window.open(item.productLink, "_blank")}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <PublicNavbar />

      {/* Page Header */}
      <div className="bg-white py-8 text-center">
        <h1 className="text-6xl font-bold font-marlin text-black">Shop</h1>
        <div className="mt-4 border-t-4 border-black w-40 mx-auto" />
      </div>

      {/* Tagline Section */}
      <div className="bg-emerald-700 py-8 text-center">
        <p className="text-5xl font-bold font-marlin text-white">
          Buy OyaChess products today!
        </p>
      </div>

      {/* DataView Section */}
      <div className="bg-white px-4 md:px-8 py-8 w-full">
        <DataView
          value={items}
          layout="grid"
          itemTemplate={itemTemplate}
          paginator
          rows={6}
        />
      </div>

      {/* Footer */}
      <div className="bg-white text-center py-8">
        <p className="text-xl font-marlin text-black">
          Want to learn more? Join my classes now to become a good chess player!
        </p>
        <p className="text-sm mt-6 font-marlin text-black">
          Copyright © 2023 OyaChess
        </p>
      </div>
    </>
  );
};

export default ShopPage;
