import {
  useAnecdotesActions,
  useAnecdotes,
  useNotificationActions,
} from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote } = useAnecdotesActions();

  const { setNotification } = useNotificationActions();

  const handleVote = async (anecdote) => {
    await vote(anecdote.id);
    setNotification(`you voted '${anecdote.content}'`, 5);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
