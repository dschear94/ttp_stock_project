export const getUpdatedUser = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/user',
    })
};