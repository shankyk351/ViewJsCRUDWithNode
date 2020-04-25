var express = require('express');
var router = express.Router();
var cors = require('cors');

router.use(cors());

var data = [
  {id: 1, name: 'steve', email: 'steve@test.com', mobile: '9123456789'},
  {id: 2, name: 'adam', email: 'adam@test.com', mobile: '9123456789'},
  {id: 3, name: 'john', email: 'john@test.com', mobile: '9123456789'},
  {id: 4, name: 'jenny', email: 'jenny@test.com', mobile: '9123456789'}
];

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send(data);
});

/* GET Employee */
router.get('/employeeData/:id', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log('employee id', req.params.id);
  let filterData = data.filter(item=>item.id==req.params.id);
  res.send(filterData[0]);
});

// Update Employee
router.put('/employeeData/:id', (req, res)=>{
  console.log('put request');
  let id = req.params.id;
  data = data.map(item=>{
    if(item.id==id){
      item.name = req.body.name;
      item.mobile = req.body.mobile;
      item.email = req.body.email;
    }
    return item;
  })
  res.send(data);
})

router.delete('/deleteEmployee/:id', (req, res)=>{
  console.log('req id', req.params.id);
  data = data.filter(item=>item.id!=req.params.id);
  res.send(data);
})

router.post('/addEmployee', (req, res)=>{
  console.log(req.body);
  data[data.length] = req.body;
  res.send(data);
})

module.exports = router;
