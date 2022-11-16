# Project2-OpenToIntern Group 11


Discussion---> 

Project Overview → In this project we were required to implement the backend part of  an

Open to Intern Project

Problem Statements → It consist of total two Models (College-Model & Intern-Model)

College-Model→ It consist of 2 API’s (1-Post , 1-Get)

Intern-Model → It consist of 1 API(1-Post)


Used Appropriate Status code 

Approach —>

● Before starting the project we downloaded different dependencies.

● Dependencies like —>

○ Express→ (This will help us in creating different api endpoints),

○ Mongoose→ (This will help us to work with mongodb easily)

○ Nodemon→ (This will help us in restarting the node application whenever

some changes(even the minute change) in the files are noticed in the

directory)


● Then we created SRC folder where all other sub folders are stored in a

hierarchical manner.We have created Sub folders like Models, routes, Validators.

Controller.

● Initiated the project by creating Schemas for college & intern. then with the

further continuation we have stored end points in route files. Basically route file is

created for storing all the end points .


● In controller folder ,we have created files for college and intern, where it has

their respective API’s.

********************************************************************************************************************************************************

Team Members - Abi Mangalan and Bolendra Moran.

-------Project requirements from FunctionUp repo------

# Uranium

## Open to Intern Project Requirement

### Key points
- Create a group database `groupXDatabase`. You can clean the db you previously used and resue that.
- This time each group should have a *single git branch*. Coordinate amongst yourselves by ensuring every next person pulls the code last pushed by a team mate. You branch will be checked as part of the demo. Branch name should follow the naming convention `project/internshipGroupX`
- Follow the naming conventions exactly as instructed. The backend code will be integrated with the front-end application which means any mismatch in the expected request body will lead to failure in successful integration.

### Models
- College Model
```
{ name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} }
```
- Intern Model
```
{ name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}
```

### POST /functionup/colleges
- Create a college - a document for each member of the group
- The logo link will be provided to you by the mentors. This link is a s3 (Amazon's Simple Service) url. Try accessing the link to see if the link is public or not.

  `Endpoint: BASE_URL/functionup/colleges`

### POST /functionup/interns
- Create a document for an intern. 
- Also save the collegeId along with the document. Your request body contains the following fields - { name, mobile, email, collegeName}
- Return HTTP status 201 on a succesful document creation. Also return the document. The response should be a JSON object like [this](#successful-response-structure) 

- Return HTTP status 400 for an invalid request with a response body like [this](#error-response-structure)

### GET /functionup/collegeDetails
- Returns the college details for the requested college (Expect a query parameter by the name `collegeName`. This is anabbreviated college name. For example `iith`)
- Returns the list of all interns who have applied for internship at this college.
- The response structure should look like [this](#college-details)


## Testing 
- To test these apis create a new collection in Postman named Project 2 Internship
- Each api should have a new request in this collection
- Each request in the collection should be rightly named. Eg Create college, Get college details etc
- Each member of each team should have their tests in running state


Refer below sample

 ![A Postman collection and request sample](assets/Postman-collection-sample.png)

## Response

### Successful Response structure
```yaml
{
  status: true,
  data: {

  }
}
```
### Error Response structure
```yaml
{
  status: false,
  message: ""
}
```

## Collections samples

#### College
```yaml
{
    "name" : "iith",
    "fullName" : "Indian Institute of Technology, Hyderabad",
    "logoLink" : "https://functionup.s3.ap-south-1.amazonaws.com/colleges/iith.png",
    "isDeleted" : false
}
```
#### Intern
```yaml
   {
    "isDeleted" : false,
    "name" : "Jane Does",
    "email" : "jane.doe@iith.in",
    "mobile" : "90000900000",
    "collegeId" : ObjectId("888771129c9ea621dc7f5e3b")
}
```
## Response samples

### College details
```yaml
{
  "data": {
    "name": "xyz",
    "fullName": "Some Institute of Engineering and Technology",
    "logoLink": "some public s3 link for a college logo",
    "interests": [
      {
        "_id": "123a47301a53ecaeea02be59",
        "name": "Jane Doe",
        "email": "jane.doe@miet.ac.in",
        "mobile": "8888888888"
      },
      {
        "_id": "45692c0e1a53ecaeea02b1ac",
        "name": "John Doe",
        "email": "john.doe@miet.ac.in",
        "mobile": "9999999999"
      },
      {
        "_id": "7898d0251a53ecaeea02a623",
        "name": "Sukruti",
        "email": "dummy.email@miet.ac.in",
        "mobile": "9191919191"
      },
      {
        "_id": "999803da1a53ecaeea02a07e",
        "name": "Neeraj Kumar",
        "email": "another.example@miet.ac.in",
        "mobile": "9898989898"
      }
    ]
  }
}
```
