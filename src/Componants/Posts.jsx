import React from 'react';

const Posts = React.forwardRef(({ post }, ref) => {
  const title = post?.title ?? post?.name ?? post?.username ?? "Untitled";
  const description = post?.body ?? post?.email ?? post?.company?.catchPhrase ?? "No description available";
  const id = post?.id ?? post?.Id ?? "";

  const content = (
    <>
      <span className="post-pill">Post #{id || 'new'}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </>
  );

  return ref ? (
    <article className="post-card" ref={ref}>
      {content}
    </article>
  ) : (
    <article className="post-card">{content}</article>
  );
});

Posts.displayName = "Posts";

export default Posts;
