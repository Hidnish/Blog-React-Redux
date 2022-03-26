import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";


// functions that returns FUNCTIONS

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // userIds.forEach(id => dispatch(fetchUser(id))); 

    _.chain(getState().posts)
      .map('userId')
      .uniq()
      .forEach(id => dispatch(fetchUser(id))) // 'await' does not work inside forEach
      .value();
}

export const fetchPosts = () => async dispatch => {
	const response = await jsonPlaceholder.get("/posts");

	dispatch({ type: "FETCH_POSTS", payload: response.data }); // call dispatch only when response arrives
};

export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data });
};



// export const fetchUser = (id) => dispatch => _fetchUser(id, dispatch);

// declare the memoize (_fetchUser) outside so that it is not called everytime fetchUser is called
// const _fetchUser = _.memoize( async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({ type: 'FETCH_USER', payload: response.data });
// });