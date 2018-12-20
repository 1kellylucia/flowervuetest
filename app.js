var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const purchasers = require('./routes/purchaser');
const flowers = require("./routes/flowers");
const manageorders = require("./routes/manageOrders");
const cors = require('cors');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(cors());
app.post('/CheckUser/:username/:password', usersRouter.Checkuser);
//manageorders
app.get('/order',manageorders.findAll);
app.get('/order/:id',manageorders.findOne);
app.post('/order',manageorders.addOrder);
app.delete('/order/:id',manageorders.deleteOrder);
//purchasers
app.get('/purchaser',purchasers.findAll);
app.get('/purchaser/:PurchaserName',purchasers.findOne);
app.post('/purchaser',purchasers.addPurchaser);
app.delete('/purchaser/:id',purchasers.deletePurchaser);
//flowers
app.get('/flowers', flowers.findAll);
app.get('/flowers/0/more', flowers.findMore);
app.get('/flowers/:_id', flowers.findOne);
app.get('/flowers/1/:flower_', flowers.findByName);
app.post('/flowers',flowers.addFlower);
app.put('/flowers/:_id/amount', flowers.incrementUplikes);
app.delete('/flowers/:_id', flowers.deleteFlower);
app.put('flowers/:_id',flowers.editFlower);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
