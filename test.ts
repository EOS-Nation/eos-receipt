import eosReceipt from "."

(async () => {
  const receipt = await eosReceipt("b7bf6f77fb8749652d8fd23eb10e5173e3eb4914ea91e81488f76f914a96649f", "CAD");
  console.log(receipt);
})();
