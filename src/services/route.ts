export function route(initialRoute: string, routeParam?: number|string, queryParams?: Record<string, any>): string {
    let url = initialRoute;

    if (routeParam !== undefined) {
        url += `/${routeParam}`;
    }

    if (queryParams) {
        const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${encodeURIComponent(key)} = ${encodeURIComponent(value)}`)
            .join('&');

        const separator = url.includes('?') ? '&' : '?';
        url += `${queryString ? separator + queryString : ''}`;
    }

    return url;
}