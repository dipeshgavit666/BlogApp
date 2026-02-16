import { Post } from './Post';

export type postEntity = {
    _id: string;
    title: string;
    contents: string;
    author?: string;
};

type postListProps = {
    posts?: postEntity[];
};

export function PostList({ posts = [] }: postListProps) {
    return (
        <>
            {posts.map(({ _id, ...postProps }) => (
                <div key={_id}>
                    <Post {...postProps} />
                    <hr />
                </div>
            ))}
        </>
    );
}
