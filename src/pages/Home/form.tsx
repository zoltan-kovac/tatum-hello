// App.js
import { type Ethereum, Network, TatumSDK } from "@tatumio/tatum";
import type React from "react";
import { useState } from "react";

function Form() {
  const [inputValue, setInputValue] = useState(""); // State to hold the input value
  const [labelText, setLabelText] = useState(""); // State to hold the label text

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM,
      apiKey: { v4: import.meta.env.VITE_TATUM_MAINNET_API_KEY },
      verbose: true,
    });
    const balance = await tatum.address.getBalance({
      addresses: [inputValue],
    });
    const balanceData = balance.data.filter(
      (asset) => asset.asset === "ETH",
    )[0];

    setLabelText(`Balance: ${balanceData.balance}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.currentTarget.value)
            }
            placeholder="Enter ETH wallet address to get balance"
            style={{ padding: "5px", width: "320px" }}
          />
        </p>
        <button type="submit" style={{ padding: "5px" }}>
          Click Me
        </button>
      </form>
      <p style={{ padding: "5px", fontSize: "16px", fontWeight: "bold" }}>
        {labelText}
      </p>
    </div>
  );
}

export default Form;
