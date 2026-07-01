import Post from "./Posts";
import usePosts from "../Hooks/usePosts";

const User = () => {
  const { results, loading, error, isError } = usePosts(1);

  if (isError) {
    return <div>Error: {error}</div>;
  }

  const content = results?.map((post) => (
    <Post key={post.id ?? post.Id ?? post.email} post={post} />
  ));

  return (
    <div>
      <h1>Users</h1>
      {loading && <p>Loading...</p>}
      {content}
    </div>
  );
};

export default User;