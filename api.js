var express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const { Sequelize,Model,DataTypes } = require('sequelize');
var app = express();
const performance = require('perf_hooks').performance;

app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize('db-main', 'postgres', '987521', {
  host: '127.0.0.1',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
    port:5432
  }
})

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
  //sequelize.sync();
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
const Counter = sequelize.define("counter", {
  id : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    m_id : {
      type: DataTypes.INTEGER
    },
  count : {
      type: DataTypes.INTEGER
          },
  createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
          },
   updatedAt: {
        type: DataTypes.DATE
          }
 });
const Machine = sequelize.define("Machine", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  rev1: {
    type: DataTypes.BOOLEAN
  },
  rev2: {
    type: DataTypes.BOOLEAN
  },
  frassspin: {
    type: DataTypes.BOOLEAN
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  },

  visible: {
    type: DataTypes.BOOLEAN
  }
});

/*const Machine = sequelize.define('Machine',{
    id:{ type:DataTypes.INTEGER, primaryKey: true,autoIncrement: true},
    name: DataTypes.STRING,
    rev1: DataTypes.BOOLEAN,
    rev2: DataTypes.BOOLEAN,
    frassspin: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    visible: DataTypes.BOOLEAN
  }, { sequelize, modelName: 'Machine' });*/

app.get('/', function (req, res) {
  res.send('Hello erp4cnc World!');
});

 app.get('/api/machines',async function (req, res) {
    try{
    const Machine_ = await Machine.findAll();
    var nodedata = JSON.parse(JSON.stringify(Machine_));
    console.log(nodedata);
    res.send(nodedata);
    Machine.sync({force: false}).then(function (err) {     if(err) {         
      console.log('An error occur while creating table');     } 
    else{         console.log('Item table created successfully');     } });

    }
    catch (err) {
      console.log('--------------------------------------------------------');    
      console.log(err);
      console.log('--------------------------------------------------------');

    }

});
app.get('/type/:id', function (req, res) {
  var id = req.params.id;

sequelize
.query('SELECT * FROM event_types where id=:id', { raw: false ,replacements:{id:id}})
.then(type => {res.send(type[0]);
});
});
app.get('/api/count/:m_id',async function (req, res) {
  var id = req.params.m_id;
  let item = await Counter.findAll({limit:1, where:{ m_id:id},order:[['count','DESC']]}) //;
  .then(type => {res.send(type[0]);

  console.log(type[0].count);
})});

app.get('/api/countAll',async function (req, res) {
sequelize
.query('select m_id,max(count)as value  from counters GROUP BY m_id;')
.then(type => {res.send(type[0]);
    console.log("All counts:", JSON.stringify(type[0], null, 2));
});
});

app.get('/api/increment/:id',async function(req,res){
  console.log('/api/increment/:id');

  //Counter.sync({force:true});
  const t0 = performance.now();
  let item = await Counter.findAll({limit:1, where:{ m_id:req.params.id},order:[['id','DESC']]});
  console.log(item[0].count);
  
  const new_item = await Counter.create({ m_id: req.params.id,count:item[0].count+1});
  new_item.save();
  //await sequelize.query("COMMIT");
  const t1 = performance.now();
  console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
  res.send(`Call to doSomething took ${t1 - t0} milliseconds.`);
    // Postgres will return the updated user by default (unless disabled by setting { returning: false })
    // In other dialects, you'll want to call user.reload() to get the updated instance...
});
/////////////////////////////////POST Event/////////////////////////
app.post('/event/add', (req, res) => {
    console.log('Got body:', JSON.stringify(req.body));
    res.sendStatus(200);
});

app.listen(3030, function () {
  console.log('Example app listening on port 3030!');
});