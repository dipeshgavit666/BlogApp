import './App.css';
import { CreatePost } from './components/CreatePost';
import { PostList } from './components/PostList';
// import { Post } from './components/Post';
import { PostFilter } from './components/PostFilter';
import { PostSorting } from './components/PostSorting';

export function Blog() {
    const posts = [
        {
            _id: '1',
            title: 'Full-Stack React Projects',
            contents: "Let's become full-stack developers!",
            author: 'Daniel Bugl',
        },
        {
            _id: '2',
            title: 'Full-Stack React Projects',
            contents: "Let's become full-stack developers!",
            author: 'Daniel Bugl',
        },
        {
            _id: '3',
            title: 'Full-Stack React Projects',
            contents: "Let's become full-stack developers!",
            author: 'Daniel Bugl',
        },
    ];
    return (
        <>
            <div>
                <CreatePost />
                <br />
                <hr />
                Filter By:
                <PostFilter field={'author'} />
                <br />
                <PostSorting fields={['createdAt', 'updatedAt']} />
                <hr />
                <PostList posts={posts} />
            </div>
        </>
    );
}

