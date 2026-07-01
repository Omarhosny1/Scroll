import { useState, useRef, useCallback } from "react";
import usePosts from "../Hooks/usePosts";
import Post from "./Posts";
const Users = () => {
  const [pageNum, setPageNum] = useState(1);
  const { results, loading, error, isError, hasNextPage } = usePosts(pageNum);

  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (loading) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver(
        (posts) => {
          const firstEntry = posts[0];
          if (firstEntry?.isIntersecting && hasNextPage && !loading) {
            setPageNum((prev) => prev + 1);
          }
        },
        { rootMargin: "200px 0px", threshold: 0.1 },
      );
      if (post) intObserver.current.observe(post);
    },
    [loading, hasNextPage],
  );

  if (isError) {
    return <div className="error-state">Error: {error.message}</div>;
  }

  const content = results.map((post, i) => {
    if (results.length === i + 1) {
      return <Post ref={lastPostRef} key={post.id} post={post} />;
    }
    return <Post key={post.id} post={post} />;
  });

  const skeletonCards = Array.from({ length: 4 }).map((_, index) => (
    <div className="skeleton-card" key={`skeleton-${index}`}>
      <div className="skeleton-line skeleton-line-short" />
      <div className="skeleton-line skeleton-line-medium" />
      <div className="skeleton-line skeleton-line-long" />
    </div>
  ));

  return (
    <main className="users-page">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Modern feed</p>
          <h1>Explore users and posts</h1>
          <p className="hero-text">
            A fresh, elegant layout designed for a smooth browsing experience on any screen.
          </p>
        </div>
        <div className="hero-badge">{results.length} items</div>
      </section>

      <section className="content-grid">
        {content}
        {loading && skeletonCards}
      </section>
    </main>
  );
};
export default Users;