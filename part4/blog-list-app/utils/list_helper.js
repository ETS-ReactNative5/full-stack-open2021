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

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return []
    } else {
        const authorNames = blogs.map(blog => blog.author)
        const uniqueAuthorNames = [...new Set(authorNames)]

        const mostBlogsObject = []
        uniqueAuthorNames.forEach(name => {
            const entry = {
                author: name,
                blogs: 0
            }
            mostBlogsObject.push(entry)
        })

        mostBlogsObject.forEach(element => {
            const uniLikes = blogs.filter(blog => element.author == blog.author)
            element.blogs = uniLikes.length
        })

        const nBlogs = mostBlogsObject.map(blog => {
            return blog.blogs
        })

        const maxBlogs = nBlogs.reduce((max, blog) => {
            return (blog > max) ? blog : max
        }, 0)

        const authorMostBlogs = mostBlogsObject.filter(blog => {
            return blog.blogs === maxBlogs 
        })
        return authorMostBlogs[0]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return []
    } else {
        const authorNames = blogs.map(blog => blog.author)
        const uniqueAuthorNames = [...new Set(authorNames)]

        const mostLikesObject = []
        uniqueAuthorNames.forEach(name => {
            const entry = {
                author: name,
                likes: 0
            }
            mostLikesObject.push(entry)
        })

        mostLikesObject.forEach(element => {
            const uniLikes = blogs.filter(blog => element.author == blog.author)
            let uniLikesNum = 0
            uniLikes.forEach(uniLike => {
                uniLikesNum += uniLike.likes
            })
            element.likes = uniLikesNum
        })
        console.log(mostLikesObject);

        const nLikes = mostLikesObject.map(blog => {
            return blog.likes
        })

        const maxLikes = nLikes.reduce((max, like) => {
            return (like > max) ? like : max
        }, 0)

        const authorMostLikes = mostLikesObject.filter(blog => {
            return blog.likes === maxLikes 
        })
        return authorMostLikes[0]
    }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }