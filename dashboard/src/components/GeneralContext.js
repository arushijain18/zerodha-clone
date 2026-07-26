import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, mode, price) => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [selectedMode, setSelectedMode] = useState("BUY");
  const [selectedPrice, setSelectedPrice] = useState(0);

  const handleOpenBuyWindow = (uid, mode = "BUY", price = 0) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setSelectedMode(mode);
    setSelectedPrice(price);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
      }}
    >
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} mode={selectedMode} initialPrice={selectedPrice} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;