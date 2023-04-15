const getRecipientEmail = (users, userLoggedIn) =>
  users?.filter((filteringUser) => filteringUser !== userLoggedIn?.email)[0];

export default getRecipientEmail;
