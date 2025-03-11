export const searchUsers = async (query) => {
    const response  = await fetch(`https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/users?search=${encodeURIComponent(query)}`);
    const data = await response.json()
    return data
};

