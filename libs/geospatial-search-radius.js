module.exports = {
    method: 'post',
    endpoint: '/geospatial-search-radius',
    middleware: [async (req, res, next) => {

        const db = req.app.get('db');

        try {

            const result = await db.Geolocation.query(req.body);

            req.data = { status: 200, result: result };
            next();

        } catch (err) { fail(err); }

        function fail (err) {
            console.error(err);
            req.data = { status: err.statusCode || 500, result: { message: err.message } };
            next();
        }

    }]
};
