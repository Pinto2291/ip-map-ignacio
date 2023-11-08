/* Function usando fetch */

export const get_ip = async (ip) => {
    const request_api = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_s8my8tAhCHQa0bGfd1v1FjZN7S9Mo&ipAddress=${ip}`);
    const response = await request_api.json();
    return response;
};