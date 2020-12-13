const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const mongoosastic = require('mongoosastic');
const mainRouter = require('./routes/index');

const { Book } = require('./models/Book');
const { Order } = require('./models/Order');
mongoose
  .connect('mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to mongoDB'))
  .catch((err) => console.log(err));

Book.createMapping(
  {
    settings: {
      analysis: {
        filter: {
          autocomplete_filter: {
            type: 'edge_ngram',
            min_gram: 1,
            max_gram: 20,
          },
        },
        analyzer: {
          autocomplete: {
            type: 'custom',
            tokenizer: 'standard',
            filter: ['lowercase', 'autocomplete_filter'],
          },
        },
      },
    },
    mappings: {
      properties: {
        name: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256,
            },
          },
          analyzer: 'autocomplete',
          search_analyzer: 'standard',
        },
      },
    },
  },
  function (err, mapping) {
    if (err) {
      console.log('error creating mapping');
      console.log(err);
    } else {
      console.log('Mapping Created');
      console.log(mapping);
    }
  }
);
Order.createMapping(
  {
    settings: {
      analysis: {
        tokenizer: {
          autocomplete_token: {
            type: 'edge_ngram',
            min_gram: 1,
            max_gram: 20,
            token_chars: ['letter', 'digit'],
          },
        },
        analyzer: {
          autocomplete: {
            type: 'custom',
            tokenizer: 'autocomplete_token',
            filter: ['lowercase'],
          },
        },
      },
    },
    mappings: {
      properties: {
        receiver: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256,
            },
          },
          analyzer: 'autocomplete',
          search_analyzer: 'standard',
        },
        address: {
          type: 'nested',
          properties: {
            mobile: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256,
                },
              },
              analyzer: 'autocomplete',
              search_analyzer: 'standard',
            },
          },
        },
      },
    },
  },
  function (err, mapping) {
    if (err) {
      console.log('error creating mapping');
      console.log(err);
    } else {
      console.log('Mapping Created');
      console.log(mapping);
    }
  }
);

const stream = Book.synchronize();
const stream1 = Order.synchronize();
var count = 0;
stream.on('data', function () {
  count++;
});

stream.on('close', function () {
  console.log('Indexed: ' + count + ' documents');
});

stream.on('error', function (err) {
  console.log(err);
});

var count1 = 0;

stream1.on('data', function () {
  count1++;
});

stream1.on('close', function () {
  console.log('Indexed: ' + count1 + ' documents');
});

stream1.on('error', function (err) {
  console.log(err);
});

const app = express();
const server = http.createServer(app);
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, token'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
app.use(express.json());

app.use('/', mainRouter);

const port = 1234;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
