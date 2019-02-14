module.exports = {
    updateVoting: async (req, res) => {
        const db = req.app.get('db');
        const {upvoters, downvoters} = req.body;
        const {postID} = req.params;
        await db.updateVoting([upvoters, downvoters, postID]);
        res.sendStatus(200)
    }
}