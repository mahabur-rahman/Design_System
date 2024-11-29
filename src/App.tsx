import "./App.css";

function App() {
  return (
    <>
      <h2> hello sentry</h2>

      <button
        onClick={() => {
          throw new Error("This is your first error!");
        }}
      >
        Break the world
      </button>
    </>
  );
}

export default App;
