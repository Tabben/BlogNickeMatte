var chai = require('chai'),
chaiHttp = require('chai-http');
const { request, expect } = chai

chai.use(chaiHttp);
chai.should()

const app = require("../app")
const userModel = require('../models/UserModel')
const commentModel = require('../models/CommentModel')
const postModel = require('../models/PostModel')

// var user
// var post
// var comment

// describe("Get a owner", () => {
   
//     before( async () => {
//         const username = 'nickeChai'
//         const password = 'nicke'
//         const role = 'user'

//         await userModel.createUser(username, password, role)
        
//         user = await userModel.findUser(username)
//         post = await postModel.insertPost(user._id, 'title', 'content')
        
//     })

//     it("should get a posts owner", async () => {
        
//         await userModel.setPost(user._id, post._id)

//         var owner = await userModel.postOwner(post._id)

//         var ownerId = owner._id

//         ownerId.should.equal(user._id)

//     })
    
//     it("should get a comments owner", async () => {

//         comment = await commentModel.insertComment(user._id, 'i like this', post._id)
//         await userModel.setComment(user._id, comment._id)

//         var owner = await userModel.commentOwner(comment._id)

//         var ownerId = owner._id

//         ownerId.should.equal(user._id)

//     })

    
// })

// describe("Searches for input", () => {
//     // var user
//     // var post
//     // before(async () => {
//     //     const username = 'nickeChai'
//     //     const password = 'nicke'
//     //     const role = 'user'

//     //     user =  await userModel.createUser(username, password, role)

//     //     post = await postModel.insertPost(user._id, 'title', 'content')
//     // })
    
//     it("should return posts with matching input", async () => {
        
//         let search = await postModel.search("con");

//         const searchId = search._id
//         const postId = post._id
//         searchId.should.equal(postId)

//     })
//     it("should return comments with matching input", async () => {
//         // let comment = await commentModel.insertComment(user._id, 'title', post._id)
        
//         let search = await commentModel.search("like");
//         console.log(search)
//         const searchId = search._id
//         const commentId = comment._id
//         searchId.should.equal(commentId)

//     })
// })

describe("Intergrations test for search endpoint, HTTP requests", () => {
    beforeEach(async function () {
        // var this = this
        const username = 'nickeChai'
        const password = 'nicke'
        const role = 'user'

        await userModel.createUser(username, password, role)



        this.currentUser = await userModel.findUser(username)
        this.currentPost = await postModel.insertPost(this.currentUser._id, 'title', 'content')

        this.currentTest.token = await userModel.loginUser(
            username, password
        )

        
    })

    it('should return a post', function () {
        
        const search = 'tit'

        chai.request(app)
        .get(`/posts/search`)
        .query({text: search})
        .set("Content-Type", "application/json")
        .set('authorization', this.test.token.token)
        .end((err, res) => {
            const title = res.body.title
            const content = res.body.content

            expect(title).to.not.equal(null)
            expect(content).to.not.equal(null)
        })
    })
})