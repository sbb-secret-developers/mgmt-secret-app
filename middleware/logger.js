const fs = require("fs");

module.exports = (req, res, next) => {
  const ip = req.ip;

  const method = req.method;
  const uri = req.url;
  const status = res.statusCode;
  const get = req.query;
  const post = req.body;
  const log = JSON.stringify({
    ip,
    uri,
    method,
    status,
    params: { get, post },
  });

  fs.appendFile(
    "./public/logs/mgmt-service-access.log",
    new Date().getTime() + ":" + Buffer.from(log).toString("base64") + "\n",
    (err) => {
      if (err) throw err;
    }
  );

  next();
};
