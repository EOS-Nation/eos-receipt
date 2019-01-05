import eosReceipt, {getTickerPrice, getTransaction} from ".";

(async () => {
  const receipt = await eosReceipt("31e684605dadf43894ef1bde2f59a5995dabf3e249ddf6f691a44f6641403566");
  console.log(receipt);

  const price = await getTickerPrice("EOS", "CAD");
  console.log(price);

  const transaction = await getTransaction("31e684605dadf43894ef1bde2f59a5995dabf3e249ddf6f691a44f6641403566");
  console.log(transaction);
})();
