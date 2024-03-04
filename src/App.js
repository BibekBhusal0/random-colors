import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MdContentPaste } from "react-icons/md";

const n = 30;
const colorContext = createContext();

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
    colors.push(getColor());
  }
  return colors;
}

function Header() {
  const { setColor } = useContext(colorContext);
  const ref = useRef(null);

  const click = () => {
    setColor(generateColors(ref.current.value));
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

function Color({ color }) {
  const [copied, setcopied] = useState(false);

  const resetCopied = () => {
    console.log("you copied");
    setcopied(false);
  };

  useEffect(() => {
    document.addEventListener("copy", resetCopied);
    return () => {
      document.removeEventListener("copy", resetCopied);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(color);
      setcopied(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{ backgroundColor: color }}
      className="text-white rounded-lg  p-3 w-48 h-48   text-center text-bold uppercase relative ">
      <div className="text-2xl drop-shadow-2xl shadow-black">{color}</div>
      <MdContentPaste
        onClick={copy}
        className=" peer text-center mx-auto mt-10 text-5xl cursor-pointer"
      />
      <div
        className={` hidden peer-hover:block absolute font-bold text-black shadow-md shadow-black p-3 ${
          copied ? "bg-green-300" : "bg-red-300"
        }`}>
        {copied ? "Coied!" : "copy"}
      </div>
    </div>
  );
}

function Body() {
  const { color } = useContext(colorContext);

  return (
    <div className="flex flex-wrap gap-6 m-auto justify-center">
      {color.map((item) => (
        <Color color={item} />
      ))}
    </div>
  );
}

function App() {
  const [color, setColor] = useState(generateColors(n));

  return (
    <div id="app" className=" mx-auto w-10/12 py-10 bg-secondary-50 px-1">
      <colorContext.Provider value={{ color, setColor }}>
        <Header />
        <Body />
      </colorContext.Provider>
    </div>
  );
}

export default App;
