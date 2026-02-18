export type postProps = {
  title: string;
  contents: string;
  author?: string | undefined;
};

export function Post({ title, contents, author }: postProps) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          Written by ~<strong>{author}</strong>
        </em>
      )}
    </article>
  );
}
