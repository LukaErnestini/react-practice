import { ReactNode, useState } from "react";

export default function App() {
  const [bill, setBill] = useState(0);
  const [tipYou, setTipYou] = useState(0);
  const [tipFriend, setTipFriend] = useState(0);
  const showReset = bill !== 0 || tipYou !== 0 || tipFriend !== 0;

  function handleSetBill(value: string) {
    setBill(+value);
  }

  function handleSetTip(
    val: string,
    setFunction: React.Dispatch<React.SetStateAction<number>>
  ) {
    setFunction(+val);
  }

  function handleReset() {
    setBill(0);
    setTipYou(0);
    setTipFriend(0);
  }

  return (
    <div>
      <BillInput bill={bill} onSetBill={handleSetBill} />
      <TipSelect tip={tipYou} onSetTip={handleSetTip} setFunction={setTipYou}>
        How did you like the service?
      </TipSelect>
      <TipSelect
        tip={tipFriend}
        onSetTip={handleSetTip}
        setFunction={setTipFriend}
      >
        How did you friend like the service?
      </TipSelect>
      {showReset && (
        <div>
          <Result bill={bill} tip1={tipYou} tip2={tipFriend} />
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
}

function BillInput({
  bill,
  onSetBill,
}: {
  bill: number;
  onSetBill: (value: string) => void;
}) {
  return (
    <div>
      <span>How much was the bill? </span>
      <input
        type="number"
        value={bill}
        onChange={(e) => onSetBill(e.target.value)}
      />
    </div>
  );
}

function TipSelect({
  tip,
  onSetTip,
  setFunction,
  children,
}: {
  tip: number;
  onSetTip: (
    val: string,
    setFunction: React.Dispatch<React.SetStateAction<number>>
  ) => void;
  setFunction: React.Dispatch<React.SetStateAction<number>>;
  children: ReactNode;
}) {
  return (
    <div>
      <span>{children} </span>
      <select
        value={tip}
        onChange={(e) => onSetTip(e.target.value, setFunction)}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">Ok (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="15">It was great (15%)</option>
        <option value="20">It was amazing! (20%)</option>
      </select>
    </div>
  );
}

function Result({
  bill,
  tip1,
  tip2,
}: {
  bill: number;
  tip1: number;
  tip2: number;
}) {
  const tipAverage = (tip1 + tip2) / 2;
  const tip = Math.round(bill * (tipAverage / 100));
  const total = bill + tip;

  return <h1>{`You pay $${total} ($${bill} + $${tip} tip)`}</h1>;
}
