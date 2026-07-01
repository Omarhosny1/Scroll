import { useState, useEffect } from "react";
import { getPostsPage } from "../api/api";

const usePosts = (pageNum = 1) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isError, setIsError] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                setLoading(true);
                setIsError(false);
                setError(null);

                const data = await getPostsPage(pageNum);
                if (!isMounted) return;

                setResults((prevResults) => {
                    return pageNum === 1 ? data.items : [...prevResults, ...data.items];
                });
                setHasNextPage(Boolean(data.hasNextPage));
                setLoading(false);
            } catch (err) {
                if (!isMounted) return;
                setLoading(false);
                setIsError(true);
                setError(err.message || "Failed to load data");
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [pageNum]);

    return {
        results,
        loading,
        error,
        isError,
        hasNextPage,
    };
};

export default usePosts;