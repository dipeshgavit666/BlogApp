export function CreatePost() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="title" className="block font-medium">
          Title:
        </label>
        <input
          type="text"
          name="title"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="contents" className="block font-medium">
          Contents:
        </label>
        <textarea
          name="contents"
          className="w-full border rounded px-3 py-2"
        ></textarea>
      </div>

      <div>
        <label htmlFor="author" className="block font-medium">
          Author
        </label>
        <input
          type="text"
          name="author"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Create Post
      </button>
    </form>
  );
}
