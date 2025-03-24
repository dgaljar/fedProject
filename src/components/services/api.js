export const searchUsers = async (query) => {
    const response  = await fetch(`https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/users?search=${encodeURIComponent(query)}`);
    const data = await response.json()
    return data
};

export const searchPosts = async (query) => {
    const response  = await fetch(`https://frontend.internetskimarketing.eu/backend/wp-json/custom/v1/post-details?search=${encodeURIComponent(query)}`);
    const data = await response.json()
    return data.posts
};

export const searchComments = async (query) => {
    const response  = await fetch(`https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/comments?_embed&search=${encodeURIComponent(query)}`);
    const data = await response.json()
    return data
};

