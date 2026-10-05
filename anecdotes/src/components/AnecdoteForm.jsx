import { useAnecdotesActions } from "../store";

const AnecdoteForm = () => {
  const { create } = useAnecdotesActions();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    if (!content) return;

    create(content);
    event.target.reset();
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
