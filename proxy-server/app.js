require('dotenv').config();

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressStaticGzip = require('express-static-gzip');

const app = express();

const port = process.env.PORT || 3000;
const appFolder = process.env.APP_LOCATION || "/build";

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

app.get(`/api/init`, (req, res) => {
  res.json({
    apiUrl: process.env.API_URL,
    apiPrefix: process.env.API_PREFIX,
    apiVersion: process.env.API_VERSION,
  });
})

if (process.env.REDIRECT_TO_HTTPS === 'true') {
  app.use('/', httpsRedirectMiddleware(true))
}

// View Routes
if (process.env.UNDER_MAINTENANCE_MODE === 'true') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/under-maintenance.html'));
  });
} else {
  app.use("/", expressStaticGzip(path.join(__dirname, appFolder), { enableBrotli: true }));
  app.get('*', (req, res) => {
    res.status(200).sendFile('/', { root: path.join(__dirname, appFolder) });
  });
}

/**
 * Redirects non-secure requests to HTTPS.
 *
 * Looks at various aspects of the request and determines if the request is
 * already secure. If it is not secure, a redirect response is returned.
 *
 */
function httpsRedirectMiddleware(redirectLocalhost) {
  return function (req, res, next) {
    if (req.hostname === 'localhost' && !redirectLocalhost) {
      return next();
    }
    if (isSecure(req)) {
      return next();
    }
    // Note that we do not keep the port as we are using req.hostname
    // and not req.headers.host. The port number does not really have
    // a meaning in most cloud deployments since they port forward.
    res.redirect('https://' + req.hostname + req.originalUrl);
  };
};

function isSecure(req) {
  // Check the trivial case first.
  if (req.secure) {
    return true;
  }
  // Check if we are behind Application Request Routing (ARR).
  // This is typical for Azure.
  if (req.headers['x-arr-log-id']) {
    return typeof req.headers['x-arr-ssl'] === 'string';
  }
  // Check for forwarded protocol header.
  // This is typical for AWS.
  return req.headers['x-forwarded-proto'] === 'https';
}

app.listen(port, () => console.log("Server is Successfully Running, and App is listening on port ", port));