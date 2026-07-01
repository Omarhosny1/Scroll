const getLocalPosts = (usersData) => {
  if (Array.isArray(usersData)) {
    return usersData;
  }

  if (Array.isArray(usersData?.posts)) {
    return usersData.posts;
  }

  if (Array.isArray(usersData?.results)) {
    return usersData.results;
  }

  if (usersData && typeof usersData === "object") {
    return Object.values(usersData);
  }

  return [];
};

export const getPostsPage = async (pageParam = 1) => {
  const response = await fetch("/Users/users.json");
  if (!response.ok) {
    throw new Error("Failed to load users data");
  }

  const usersData = await response.json();
  const posts = getLocalPosts(usersData);
  const pageSize = 20;
  const start = (pageParam - 1) * pageSize;
  const end = start + pageSize;
  const items = posts.slice(start, end);
  const hasNextPage = end < posts.length;

  return { items, hasNextPage };
};