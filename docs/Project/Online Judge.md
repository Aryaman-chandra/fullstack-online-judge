# Online judge

---

## Frontend

Frontend of the application is primarily written in [React.js](https://react.dev/)

This is the portion of the applicaton that handles the user interaction.

### Features

Key features for our application includes :

1. [Dashboard](#Dashboard)
2. [User Roles]
3. Problems List
4. [Contests]
5. [Profile Management](#User%20Details)
6. [Authentication]
7. Graph view

### Pages

The minimal pages for our application are :

1. [Dashboard](#Dashboard)
2. [Practice Problems](#Practice%20Problems)
3. [Problems Page](#Practice%20Problems)
4. [Contests ](#Contests)
5. [User Details](#User%20Details)

#### Dashboard

The Dashboard is the first place our user lands when he visits our webpage,
here he will be shown the problems list , statistics about the upcoming contests and many more useful information.

#### Practice Problems

This page lists all the problems that the user can select from and practice by submitting the code.

#### Contests

User can participate in a contest by joining an arena of the contest , or he can view problems of the previous contests.

#### User Details

User can manage their profile section from this page.

#### Problem Management

Users with Admin roles have an additional page to create , upload , delete a problem.

By default these problem will be available to everyone if otherwise mentioned
or adding and problem to the contests.

#### Graph View

With this feature users can link their solved problems and based on some similarity and this view would render the temporal force graph of their linked notes , which provides a good visualization of problems with similar functionality.

## Backend

### Features (TBD)
#### [[Schemas Or Documents]]



### API Endpoints

| baseUrl+endpoint                        | Description                           | method | access |
| --------------------------------------- | ------------------------------------- | ------ | ------ |
| /                                       | home                                  | get    | public |
| /login                                  | login                                 | post   | public |
| /signup                                 | signup                                | post   | public |
| /problems                               | problem list                          | get    | public |
| /contests                               | contests list                         | get    | public |
| /problems/?p_id= X                      | specific problem                      | get    | public |
| /contests/?contest_id= X                | contest details                       | get    | user   |
| /contests/?contest_id=X&p_id= X         | problem details of specific contest   | get    | user   |
| /contest/leaderboard/?contest_id        | contest leaderboard                   | get    | user   |
| /user/profile                           | get user profile                      | get    | user   |
| /user/profile                           | patch user profile                    | patch  | user   |
| /user/submission/                       | submit code                           | post   | user   |
| /problem/create/?user_id=X&contest_id=Y | create problem for a contest          | post   | admin  |
| /contest/create/?user_id                | create contest                        | post   | admin  |
| /user/problems/                         | lists all the problems solved by user | get    | user   |
|                                         |                                       |        |        |
