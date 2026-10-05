import { useAnecdotesActions, useAnecdotes } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote } = useAnecdotesActions();

  return (
    <>
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
    </>
  );
};

export default AnecdoteList;
