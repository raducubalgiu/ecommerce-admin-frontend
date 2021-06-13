import {useState, useCallback, useEffect} from 'react';

const baseUrl = 'http://localhost:8000/api/admin';

export const useHttpGet = (route:string, applyData:any) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
            try {
                const res = await fetch(`${baseUrl}/${route}`, {credentials: 'include'});
                const data = await res.json();
                applyData(data);

            } catch (e) {
                setError(e.message);
            }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchData();

    }, [fetchData]);

    return {
        loading,
        error
    }
}

export const useHttpSend = (route:string, bodyData: {}, applyData:any) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendData = async () => {
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`${baseUrl}/${route}`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(bodyData)
            });
            const data = await res.json();
            applyData(data);
        } catch (e) {
            setError(e.message);
        }
        setLoading(false);
    }

    return {
        sendData,
        error,
        loading
    }
}

export const useHttpUser = (applyData: (data: {}) => void) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        (
            async () => {
                setError(null);
                try {
                    const res = await fetch('http://localhost:8000/api/admin/user', {credentials: 'include'});
                    if(!res.ok) {
                        throw new Error('Something went wrong!');
                    }
                    const data = await res.json();
                    applyData(data);

                } catch (e) {
                    setError(e.message);
                }
            }
        )();
    }, []);
}

export const useHttpDelete = (route:string, updateState:any) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const deleteData = async (id:number | null) => {
        setLoading(true);

        try {
            const res = await fetch(`${baseUrl}/${route}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if(res.ok) {
                await updateState(id);
                await res.json();
            } else {
                throw new Error('Something went wrong!');
            }

            setLoading(false);
        } catch (e) {
            setError(e.message);
        }
        setLoading(false);
    }

    return {
        deleteData,
        loading,
        error
    }
}