
async function fetchNavItems() {
    try {
        const res = await fetch(`http://localhost:3001/api/getNavItems`, {
            cache: 'no-store'
        });

        return res.json();
    } catch (error) {
        console.error('Error fetching NavItems')
    }
}

export default fetchNavItems