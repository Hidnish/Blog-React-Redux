import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

// function that returns a function
export const fetchPosts = () => async (dispatch) => {
	const response = await jsonPlaceholder.get("/posts");

	// call dispatch only when response arrives
	dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = (userId) => dispatch => {
    _fetchUser(userId, dispatch);
}

// declare the memoize (_fetchUser) outside so that it is not called everytime fetchUser is called
const _fetchUser = _.memoize( async (id, dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    // when you fetch one single item (i.e. 1 user) it comes back as an object (not array)
    dispatch({ type: 'FETCH_USER', payload: response.data });
});

