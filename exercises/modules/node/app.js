const App = require("./api");

const showPostsForCurrentUser = (userId, cb) => {
  App.getPostsForUser(userId, posts => {
    const postTemplates = posts.map(post => {
      return `
      <div class="post">
        ${post.title}
        ${post.body}
        ${post.createdBy}
      </div>`
    })
    cb(postTemplates)
  })
}

const showUserProfile = (userId, cb) => {
  App.getUserById(userId, user => {
    const profile = `
      <div>
        ${user.name}
      </div>
    `
    cb(user)
  })
}

module.exports = {
    showPostsForCurrentUser,
    showUserProfile
}
