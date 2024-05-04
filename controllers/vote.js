const fs = require("fs").promises;
const httpUtils = require("../appModules/http-utils");
const { createRating, config, updateRating } = require("../rating");


async function voteRouteController(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 404;
    res.end("Not Found");
  } else {
    res.statusCode = 200;
    const body = await httpUtils.parseBody(req);
    const data = JSON.parse(body);
    console.log(data);
    const rating = createRating(data, config.WEIGHT);

    const ratingArr = JSON.parse(await fs.readFile(config.PATH_TO_RATING_FILE));
    const updated = updateRating(ratingArr, data.id, rating);

    await fs.writeFile(config.PATH_TO_RATING_FILE, JSON.stringify(updated));
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(updated.sort((a, b) => b.rating - a.rating)));
  }
}

module.exports = voteRouteController;