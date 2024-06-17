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
5. [Leader Board](#Leader%20Board)
6. [Profile Management](#User%20Details)
7. [Authentication] 
8. Graph view

### Pages 

The minimal pages for our application are :
1. [Dashboard](#Dashboard)
2. [Practice Problems](#Practice%20Problems)
4. [Problems Page](#Practice%20Problems)
5. [Contests ](#Contests)
5. [User Details](#User%20Details)
6. [LeaderBoard ](#Leader%20Board)

#### Dashboard 
The Dashboard is the first place our user lands when he visits our webpage,
here he will be shown the problems list , statistics about the upcoming contests and many more useful information. 

#### Practice Problems 

This page lists all the problems that the user can select from and practice by submitting the code. 

#### Contests 
User can participate in a contest by joining an arena of the contest , or he can view problems of the previous contests.

#### User Details 
User can manage their profile section from this page. 

#### Leader Board 
User can view the top performers of the contests here for motivation.

#### Problem Management 
Users with Admin roles have an additional page to create , upload , delete a problem.

By default these problem will be available to everyone if otherwise mentioned
or adding and problem to the contests.
#### Graph View
With this feature users can link their solved problems and based on some similarity and this view would render the temporal force graph of their linked notes , which provides a good visualization of problems with similar functionality.

## Backend 

### Features (TBD)

### Database Schemas :
> [!info] Terminology use is flexible
  Since I'm using MongoDB only , i'm restricting myself to  use terminology used in NoSQL     database , however initial modeling was done keeping relational model in mind. I will try to include UML diagrams.

### Entities Or collections
Major entities include but not limited to : 
1. User
2. Problems
3. Submissions
4. Contests
#### Schemas Or Documents

User  : 

```
Username   : String required,
Password   : String required Hashed,
_id        : ObjectId (mongodb),
problems   : [{ ObjectId ref Problems , links : [ObjectId ref Problems]}],
submissions: [ObjectId ref Submissions],
contests   : [ObjectId ref Contests],
role       : [Admin , User]
```

 Problem : 

```
tags         : [String]  
_id          : ObjectId
testcases    : [{ input : String , output:  String }]
time_limit   : number max = 5sec
memory_limit : number max = 2MB
```
 
 
Submission : 

```
_id          : ObjectId
_user        : ObjectId ref Users required
source_file  : String required
status       : enum : {  inQueue , Executing , finished}
verdict      : [Accepted , TLE , MLE , Rejected , Error , skipped ]
```

Contest : 
```
problems    : [ObjectId ref Problems]
leaderboard : [{ position: int , holder : ObjectId ref Users}]
submissions : [ObjectId ref submissions]
```


### API Endpoints 
| baseUrl+endpoint                        | Description                           | method | access |
| --------------------------------------- | ------------------------------------- | ------ | ------ |
| /                                       | home                                  | get    | public |
| /login                                  | login                                 | post   | public |
| /signup                                 | signup                                | post   | public |
| /problems                               | problem list                          | get    | public |
| /contests                               | contests list                         | get    | public |
| /problems/?p_id= X                      | specific problem                      | get    | public |
| /contests/?contest_id= X                | specific contest                      | get    | user   |
| /contest/problem/?contest_id=X&p_id= X  | specific probem of specific contest   | get    | user   |
| /contest/leaderboard/?contest_id        | contest leaderboard                   | get    | user   |
| /user/profile                           | get user profile                      | get    | user   |
| /user/profile                           | patch user profile                    | patch  | user   |
| /user/submission/                       | submit code                           | post   | user   |
| /problem/create/?user_id=X&contest_id=Y | create problem for a contest          | post   | admin  |
| /contest/create/?user_id                | create contest                        | post   | admin  |
| /user/problems/                         | lists all the problems solved by user | get    | user   |
|                                         |                                       |        |        |
