import { useAnecdotesActions } from "../store";

const AnecdoteForm = () => {
  const { create } = useAnecdotesActions();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.content.value < 1) return;
    create(event.target.content.value);
    event.target.reset;
  };

  return (
    <div>
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

export default AnecdoteForm;
