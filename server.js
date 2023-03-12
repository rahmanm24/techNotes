require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const path = require('path');
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookeiparser = require('cookie-parser')
const corsoption = require('./config/corsOptions')
const cors = require('cors')

//console.log(process.env.NODE_ENV);

app.use(logger);
app.use(cors(corsoption));
app.use(express.json());
app.use(cookeiparser())
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/root'));



app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if(req.accepts('json')){
        res.json({message: '404 not found'});
    }
    else{
        res.type('txt').send('404 not found');
    }
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));