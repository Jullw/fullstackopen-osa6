import { useAnecdotes, useAnecdotesActions } from "./store";

const App = () => {
  const anecdotes = useAnecdotes();
  const { vote, create } = useAnecdotesActions();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.content.value < 1) return;
    create(event.target.content.value);
    event.target.reset;
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input data-testid="new" name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
