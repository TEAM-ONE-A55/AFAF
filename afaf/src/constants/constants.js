export const defaultAvatar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6tPLpqzJTFzBgrnKZwyVwlSnBeVsxdCV_iTuP_E4HYFVA8wezZWLTggAWZq9cIqyAElE&usqp=CAU";
export const MIN_TITLE_LENGTH = 16;

export const MAX_TITLE_LENGTH = 64;

export const MIN_CONTENT_LENGTH = 32;

export const MAX_CONTENT_LENGTH = 8192;

export const MIN_NAME_LENGTH = 4;

export const MAX_NAME_LENGTH = 32;

export const threadsSortingOptions = [
  { label: "Sort by Date (descending)", value: "dateDescending" },
  { label: "Sort by Date (ascending)", value: "dateAscending" },
  { label: "Sort by Author (ascending)", value: "authorAscending" },
  { label: "Sort by Author (descending)", value: "authorDescending" },
  {
    label: "Sort by Most Liked (descending)",
    value: "mostLikedDescending",
  },
  {
    label: "Sort by Most Liked (ascending)",
    value: "mostLikedAscending",
  },
  {
    label: "Sort by Most Commented (descending)",
    value: "mostCommentedDescending",
  },
  {
    label: "Sort by Most Commented (ascending)",
    value: "mostCommentedAscending",
  },
];

export const userThreadsSortingOptions = [
  { label: "Sort by Date (descending)", value: "dateDescending" },
  { label: "Sort by Date (ascending)", value: "dateAscending" },
  {
    label: "Sort by Most Liked (descending)",
    value: "mostLikedDescending",
  },
  {
    label: "Sort by Most Liked (ascending)",
    value: "mostLikedAscending",
  },
  {
    label: "Sort by Most Commented (descending)",
    value: "mostCommentedDescending",
  },
  {
    label: "Sort by Most Commented (ascending)",
    value: "mostCommentedAscending",
  },
];

export const usersSortingOptions = [
  { label: "Sort by Date (descending)", value: "dateDescending" },
  { label: "Sort by Date (ascending)", value: "dateAscending" },
  { label: "Sort by Username (ascending)", value: "usernameAscending" },
  { label: "Sort by Username (descending)", value: "usernameDescending" },
  {
    label: "Sort by Most active users (descending)",
    value: "userActivityDescending",
  },
  {
    label: "Sort by Most active users (ascending)",
    value: "userActivityAscending",
  },
];

export const threadsFilterOptions = [
  { label: "Filter by title", value: "title" },
  { label: "Filter by author", value: "author" },
  { label: "Filter by content", value: "content" },
];

export const usersThreadOptions = [
  { label: "Filter by email", value: "email" },
  { label: "Filter by username", value: "handle" },
  { label: "Filter by name", value: "name" },
];

export const STYLE_VOTES_FILL = {
  fontVariationSettings: `'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
  cursor: "default",
  ":hover": {
    cursor: "pointer",
  },
};

export const STYLE_VOTES_EMPTY = {
  fontVariationSettings: `'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
  cursor: "default",
  ":hover": {
    cursor: "pointer",
  },
};
