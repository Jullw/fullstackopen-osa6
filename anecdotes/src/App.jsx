import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import { useAnecdotesActions } from "./store";

const App = () => {
  const { initialize } = useAnecdotesActions();

  useEffect(() => {
    initialize();
  }, [initialize]);
  return (
    <div>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
