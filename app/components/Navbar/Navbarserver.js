
async function fetchNavItems() {
    try {
        const res = await fetch(`${process.env.APP_BASE_URL}/api/getNavItems`, {
            cache: 'no-store'
        });

        return res.json();
    } catch (error) {
        console.error(error,'Error fetching NavItems'+error)
    }
}

export default fetchNavItems