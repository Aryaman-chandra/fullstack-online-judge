### Database Schemas :

> [!info] Terminology use is flexible
> Since I'm using MongoDB only , i'm restricting myself to  use terminology used in NoSQL     database , however initial modeling was done keeping relational model in mind. I will try to include UML diagrams.

### Entities Or collections

Major entities include but not limited to :

1. User
2. Problems
3. Submissions
4. Contests
User  :

```
Username   : String required,
Password   : String required Hashed,
_id        : ObjectId (mongodb),
problems   : [{ ObjectId ref Problems , links : [ObjectId ref Problems]}],
submissions: [ObjectId ref Submissions],
contests   : [ObjectId ref Contests],
role       : [Admin , User]
profile    : {
			 fullname : String , 
			 programming_languages : [{language : String}],
			 bio : String ,
			 profilePicture : String (url) , 
			 socialMediaLinks : [String]
 }
```

 Problem :

```
tags         : [String]  
_id          : ObjectId
admin_id    :  ObjectId (for admin)
difficulty :  [easy , medium , hard]
problem_title : String 
problem_statement : String | refrence to file 
test_case : [ test_input: String | reference and test_ouptut: String | reference  ]
time_limit   : number max = 5sec
memory_limit : number max = 2MB
```

Submission :

```
_id          : ObjectId
_user        : ObjectId ref Users required
problem      : ObjectId ref problems required
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
