const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not found file");
      resolve(data);
    });
  });
};

const writeFilePro = (file, body) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, body, (err) => {
      if (err) reject("Could not write a file");
      resolve("Success");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro("dog-img.txt", imgs.join("\n"));
    console.log("Random dog image saved to file!");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "2: Done";
};

(async () => {
  try {
    console.log("1: Print");
    const x = await getDogPic();
    console.log(x);
    console.log("3: Print ");
  } catch (err) {
    console.log("ERROR");
  }
})();

/*
console.log("1: Print");
getDogPic()
  .then((x) => {
    console.log(x);
    console.log("3: Print ");
  })
  .catch((err) => {
    console.log("ERROR");
  });
*/

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro("dog-img.txt", res.body.message);
    // fs.writeFile("dog-img.txt", res.body.message, (err, data) => {
    //   if (err) return console.log(err.message);
    //   console.log("Random dog image saved to file!");
    // });
  })
  .then(() => {
    console.log("Random dog image saved to file!");
  })
  .catch((err) => {
    if (err) return console.log(err.message);
  });

  */
