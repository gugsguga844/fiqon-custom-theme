import React from "react";
import "./styles.css";

import SinglePost from './components/single/SinglePost.jsx';
import ArchivePosts from './components/archive/ArchivePosts.jsx';

const App = () => {
    const { is_single, is_archive, post, posts } = window.wpData;

    if (is_single) {
        return <SinglePost post={post} />;
    } else if (is_archive) {
        return <ArchivePosts posts={posts} />;
    } else {
        return <div>Página não encontrada</div>;
    }
};

export default App;