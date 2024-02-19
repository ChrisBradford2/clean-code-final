type Adapter<T> = (data: any) => T;

const useApi = () => {
    const baseUrl = "http://localhost:8080";

    return async <T>(url: string, options: any = {}, adapter?: Adapter<T>) => {
        const headers = {
            ...options.headers,
        };

        const type = 'application/json';
        if (!headers['Content-Type']) {
            headers['Content-Type'] = type;
        }
        if (!headers['Accept']) {
            headers['Accept'] = type;
        }

        if (options.body && typeof options.body !== 'string') {
            options.body = JSON.stringify(options.body);
        }

        const response = await fetch(`${baseUrl}/${url}`, {...options, headers});
        if (response.ok) {
            // check if it's a 204 response
            if (response.status === 204) {
                return;
            }

            return response.json().then(data_1 => {
                return adapter ? adapter(data_1) : data_1;
            });
        }
        const error = await response.json();
        throw new Error(error.detail ?? response.statusText ?? "An error occurred");
    }
};

export default useApi;
