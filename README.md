# [KOLAB](https://kolab-app.herokuapp.com/)

<br>

## Description

Kolab is an app that allows users to connect based on their interests. In Kolab people can create and join groups, create posts, comment, like&dislike them, chat and video chat.

## User Stories

**404:** 
- As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
**Signup:** 
- As an anon I can sign up in the platform so that I can start creating and managing my backlog
- User can select a screen with a category, after that the user is presented with 1 or more groups that belong to that category
**Login:** 
- As a user I can login to the platform so that I can start creating and managing my backlog
**Logout:** 
- As a user I can logout from the platform so no one else can modify my information
**Groups** 
- User can create groups, groups are linked to categories and tags
- Groups have an admin 
- Admin can CRUD posts (or only delete) 
- User can choose groups he wants to belong to
- User can search for groups based on name / categories / tags
**Posts** 
- User can create a new post
- The posts in the group can be liked / disliked
- The posts can be shared by other users on other social media
- Users can comment on a post
- Comments can be liked or disliked
**Chat:** 
- Users can chat 1💯
*VideoChat:** 
- Users can hav video chat 1:1
**Feed**
- User can see a feed with the latest posts of all the groups of categories
- User can click on a particular post and be redirected to the post-page
**PROFILE** 
- User can set/change username, categories, description, profile picture 

## Backlog

- Video calls
- Calendar 
- Virtual reality machine learning AI integration with neurolink to guess Manish's age
- Chat with multiple people
- Invite email to join specific group (deeplinks?)
- Cool animations
- See friends on /:group page


<br>

# Client / Frontend

## React Router Routes (React App)

| Path               | Component                      | Permissions                | Behavior                                                      |
| -----------------  | ------------------------------ | -------------------------- | ------------------------------------------------------------- |
| `/`                | LandingPage, LandingNavBar          | public `<Route>`           | Conditionally renders signin/signup with pop-up. Shows friend request|
| `/signup/category` | SignupCategoryPage             | user only `<PrivateRoute>` | Forces user to pick at least 1 category |
| `/signup/group`    | JoinGroupPage                  | user only `<PrivateRoute>` | Display GroupCards that navigate to the /:group page|
| `/home`            | HomePage, Sidebar, PostCard, Navbar| user only `<PrivateRoute>`| Displays PostCard(s) in a feed, post navigate to /:post|
| `/explore   `      | ExplorePage, NavBar, PostCard, SearchBar    | user only `<PrivateRoute>` | Dsplays GroupCard(s), clicking on GroupCard navigates to /:group|
| `/:group`          | GroupPage, NavBar, SideBar, PostCard       | user only `<PrivateRoute>` | Conditional rendering for buttons, user can click on posts, and on interactions with post (like / share)|
| `/:post`           | PostPage, Sidebar, Navbar, FullPost, Comment, AddComment   | user only `<PrivateRoute>` | Displays full post, users can add comments|
| `/chat/:user`      | ChatPage, NavBar, Chat          | user only `<PrivateRoute>` | Allows user to chat with another user |
| `/profile/:user`   | ProfilePage, SearchForm, SearchResults      | user only `<PrivateRoute>` | Shows the profile of a user including  groups and posts |
| `/friends`        | FriendsPage,NavBar, UserDetail| user only `<PrivateRoute>` | Shows your friends |
| `/people`          | PeoplePage, NavBar, UserDetail                   | user only `<PrivateRoute>` | Shows all the people, allows to search for people |

## Components
- Navbar
- Sidebar
- SignUpForm
- LogInForm
- GroupCard
- AddGroup
- AddPost
- PostCard
- UserCard
- SearchBar
- FullPost
- CommentCards 
- AddComment
- AddEvent
- Animation
- Calendar
- CategoryCard
- CommentCard
- EditGroup
- EventCard
- FlashMessage
- NotificationBoard
- Pagination



## Pages 
- LandingPage
- SignupCategoryPage 
- SignupGroupPage
- HomePage 
- GroupPage
- ExplorePage
- PostPage
- ChatPage
- PeoplePage
- FriendsPage
- NotFoundPage
- ChatPage
- EventPage
- VideoChatPage
- UserPage

## Services
 - Socket IO
 - Cloudinary
 - LottieFiles
 - AxiosullCalendar
 - MaterialUI

<br>

# Server / Backend

## Models

Categories: art, sports, science, lifestyle, nature, politics, entartainment, other. 


User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  image_url: {type: String, required: true},
  admin: Boolean,
  description: {type: String, required: true},
  categories: [{type: String, enum: ['art', 'sports', 'science', 'lifestyle', 'nature', 'politics', 'entertainment', 'other']}],
  groups: [{type: Schema.Types.ObjectId, ref: 'group'}]
  posts: [{type: Schema.Types.ObjectId, ref: 'posts'}],
  friends: [{type: Schema.Types.ObjectId, ref: 'user'}],
  friendRequests: [{type: Schema.Types.ObjectId, ref:'user'}]
}
```

Posts model

```javascript
 {
  timestamp: true,
  image_url: String,
  title: {type: String, required: true},
  content: {type: String, required: true},
  likes: [{type: Schema.Types.ObjectId, ref: 'user'}],
  dislikes: [{type: Schema.Types.ObjectId, ref: 'user'}],
  comments: [{type: Schema.Types.ObjectId, ref: 'user'}],
  groupOrigin: [{type: Schema.Types.ObjectId, ref:'group'}]
 }
```
Group model

```javascript
 {
  name: {type: String, required: true},
  image_url: String
  content: {type: String, required: true},
  categories: {type: String, enum: ['art', 'sports', 'science', 'lifestyle', 'nature', 'politics', 'entertainment', 'other']},
  tags: {type: String, ref: 'user', index: 'text'},
  users: [{type: Schema.Types.ObjectId, ref: 'user'}]
 }
```

Conversation model

```javascript
 {
  name: {type: String, required: true},
  participants: [{type: Schema.Types.ObjectId, ref: 'user'}]
 }
```

Messages model

```javascript
 {
  message: {type: String, required: true},
  conversationId: {type: Schema.Types.ObjectId, ref: 'conversation'}
  sender: {type: Schema.Types.ObjectId, ref: 'user'}
 }
```
<br>

## API Endpoints (backend routes)

| HTTP Method | URL               | Request Body                | Success status | Error Status | Description                                                                                                                     |
| ----------- | ----------------- | --------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | `/auth/profile`  | Saved session               | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/auth/signup`    | {name, email, password}     | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`     | {username, password}        | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/login/google`     | {username, password}        | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session        |
| POST        | `/auth/logout`    | (empty)                     | 204            | 400          | Logs out the user                                                                                                               |
| POST        | `/signup/category`     | {categories} |                | 400          | Add new backlog   and add to user    |
| GET         | `/signup/group`   |                           |                | 400          |  Querry for groups filter by categories of user (stored in session) elements     |
| GET         | `/home`           |                             |                |              | Sort by timestamp limit by 10   |
| GET         | `/:group`  |                             |                | Params, 2 querries, 1 for post model 1 for group model, populate comments             |                                                                                                              |
| POST         | `/:group/join`  |     {userid}              |      | find the group id and add user to group id        |    |
| GET         | `/:group/leave`  |     {userid}                      |                | find the group id and remove user to group id     comments             |                                                                                                              |
| PUT         | `/:group/add-post`      |  {title, description, owner}                   | 200            | 400          | edit element       |
| DELETE         | `/:post/delete-post`      |  {post-id}                   | 200            | 400          | edit element                  |
| POST         | `/:post/comment`      |  {comment}                           | 201            | 400          | Show specific element        |
| POST         | `/:post/like`      |  {userid}                           | 201            | 400          | Show specific element           |
| POST         | `/:post/dislike`      |  {userid}                           | 201            | 400          | Show specific element |
| GET      | `/explore`      |                             | 201            | 400          | delete element   |
| POST         | `/add-group`    |     {all group information}                        |                | 400          | Show series elements  |
| GET         | `/friends`     |                             |  find the user and populate friends             |      |
| GET         | `/profile/:user`     |                             |                |              | Get posts with user id elements   |
| POST         | `/profile/:user/add-friend`     |  {your user id} |                |              | elements          |
| GET         | `/people`     |      |                |              | Querry for random users elements |
| POST         | `/people/search`     |   {searchtext}     |                |              | elements     |
| GET         | `/messages/:conversationId`     |        |                |              |   |
| POST         | `/conversations`     |        |                |              |     |
<br>

## Links
### Trello/Whimsical

[Trello](https://trello.com/b/jBdQAzo3/kolab)

[Whimsical](https://whimsical.com/wireframes-JtCyGbL2GbYyoR3Gq8sTrt)

[Colors palette](https://coolors.co/006c7a-55abb1-e0f7fa-f2e7e3-543327-6d4031)


### Git

[Client repository Link](https://github.com/liliiakhr/kolab-client)

[Server repository Link](https://github.com/liliiakhr/kolab-server)

[Deployed App Link](https://kolab-app.herokuapp.com/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1aSqDH15tsHmqR4pIOInjtkMIAMbKbWqBl3wn3cLps4w/edit#slide=id.p)
