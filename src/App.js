import { useRef } from "react";
// import { MdContentPaste } from "react-icons/md";

function getColor() {
  const hex = "1234567890abcdef".split("");
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * hex.length)];
  }
  return color;
}

function generateColors(n) {
  const colors = [];
  for (let i = 0; i < n; i++) {
    colors.push(getColor);
  }
  return colors;
}

function Header() {
  const ref = useRef(30);

  const click = () => {
    generateColors(ref.current);
  };

  return (
    <>
      <h1 className=" text-3xl text-center text-blue-800 font-bold">
        Generage random Hexadecimal colors
      </h1>
      <div className="flex justify-between px-5 py-3">
        <input
          className=" px-5 py-1 border border-primary-400"
          max={200}
          min={1}
          type="number"
          name="input"
          id="num"
          value={ref.current}
          ref={ref}
        />
        <button
          className="text-2xl px-6 py-3 border font-semibold  rounded border-primary-500 hover:border-transparent text-primary-500 hover:text-white bg-white hover:bg-primary-500"
          onClick={click}>
          Generate
        </button>
      </div>
    </>
  );
}

function App() {
  return (
    <div id="app" className=" mx-auto w-10/12 py-10 bg-secondary-50 px-1">
      <Header />
    </div>
  );
}

export default App;
