const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sumLikes = blogs.map((blog) => {
        return blog.likes
    })
    return sumLikes.length === 0
        ?  0
        : sumLikes.reduce((sum, likes) => {
            return sum + likes
        }, 0) 
}

const favoriteBlog = (blogs) => {
    let nLikes = []
    nLikes = blogs.map((blog) => {
        return blog.likes
    })

    if (nLikes.length === 0) {
        return []
    } else {
        const favBlogNum = nLikes.reduce((max, like) => {
            return ( like > max) ? like : max
        }, 0)
    
        const favBlog = blogs.filter(blog => {
            return blog.likes === favBlogNum
        })
        return favBlog[0]
    }
}

module.exports = { dummy, totalLikes, favoriteBlog }