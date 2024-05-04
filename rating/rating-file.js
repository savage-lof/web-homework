const fs = require("fs").promises;

async function makeRatingFile(path, array) {
  const ratingArr = JSON.parse(await fs.readFile(path, "utf8"));
  array.forEach(item => {
    if (!ratingArr.length || !ratingArr.find(el => el.id === item.id)) {
      let obj = {
        id: item.id,
        title: item.title,
        image: item.image,
        link: item.link,
        description: item.description,
        rating: 0
      };
      ratingArr.push(obj);
    }
  });
  await fs.writeFile(path, JSON.stringify(ratingArr));
}

module.exports = makeRatingFile;