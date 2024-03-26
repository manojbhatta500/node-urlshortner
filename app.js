const express = require('express');
const urlRoute = require('./router/url');
var bodyParser = require('body-parser');
const URL = require('./models/url');
const cors = require('cors');




const {connectToMongoDB} = require('./connectdb');



const app = express();
app.use(cors());
app.use(bodyParser.json());




connectToMongoDB('mongodb://127.0.0.1:27017/urlshortner').then(()=>{
    console.log('mongo db connected ');
}).catch(()=>{
    console.log('something was wrong while connecting to mongodb');
});

const port = 8000;








app.use('/url',urlRoute);


app.get('/:shortId', async (req, res) => {
    try {
      const id = req.params.shortId;
      const entry = await URL.findOneAndUpdate({
        shortid: id
      }, {
        $push: {
          visitHistory: {
            timestamp: Date.now()
          }
        }
      });
  
      if (!entry) {
        return res.status(404).json({ message: 'URL not found' });
      }
  
      res.redirect(entry.redirectUrl);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


app.listen(port,()=>{
    console.log(`server started at port : ${port}`);
})