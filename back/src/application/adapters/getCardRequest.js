module.exports = (req) => {
    return {
        tags: req.query.tags ?? null,
    }
}