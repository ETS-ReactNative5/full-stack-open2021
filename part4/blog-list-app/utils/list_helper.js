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

module.exports = { dummy, totalLikes }