import {useEffect, useState} from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const useFetch = (url) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(baseUrl + url);
            if (response.ok) {
                const json = await response.json();
                setData(json);
            }
        };

        fetchData().finally(() => setIsLoading(false)).catch((e) => setError(e));

    }, [url])

    return {data, error, isLoading};
}
