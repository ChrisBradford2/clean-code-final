const useApi = () => {
    const baseUrl = "http://localhost:8080";

    return (url: string, options: any = {}) => {
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

        return fetch(`${baseUrl}/${url}`, {...options, headers}).then(response => {
            if (response.ok) {
                // check if it's a 204 response
                if (response.status === 204) {
                    return;
                }

                return response.json();
            }

            return response.json().then(error => {
                throw new Error(error.detail ?? response.statusText ?? "An error occurred");
            });
        });
    }
};

export default useApi;