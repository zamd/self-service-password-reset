if (process.env.NODE_ENV === 'production') {
  module.exports = require('./empty');
} else {
  module.exports = require('./devtools');
}
