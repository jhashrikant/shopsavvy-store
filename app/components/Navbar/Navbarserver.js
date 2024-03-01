const apiUrl = process.env.NODE_ENV === 'production' ? process.env.APP_BASE_URL : 'http://localhost:3001';
async function fetchNavItems() {
    try {
        const res = await fetch(`${apiUrl}/api/getNavItems`, {
            cache: 'no-store'
        });

        return res.json();
    } catch (error) {
        console.error(error,'Error fetching NavItems'+error)
    }
}

export default fetchNavItems