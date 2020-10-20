import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import WarningIcon from '@material-ui/icons/Warning';

class Maschine extends React.Component {
  componentDidMount() {
    
    const counturl = 'http://127.0.0.1:3030/api/count/'+this.props.id;
     //const local_url = 'http://127.0.0.1:3030/api/machines';

     fetch(counturl)
     .then(res => res.json())
     .then((data) => {
       this.setState({ count: data.count});
     });
     let ws = new WebSocket('ws://127.0.0.1:8000/ws');
     let id=0;
     let count_=0;
     ws.onmessage = function(msg) {
        id = msg.m_id;
        count_= msg.count;
        console.log('id:'+id+'count_'+count_);
    }
  
    if(id==this.props.id)
    alert(count_)
  }
  constructor()
  {  
    super();
    
    
      //if (this.props.name==msg.m_id)
      //  alert(msg.data);
      //console.log(msg.data);
     

    this.state = {
        count: Math.floor(Math.random() * (10 - 1)) + 1,
        isWorking:true,
        status:'',
        employee:'Mitarbeiter-1',
      };
  }
 onChangeValue()
 {
  alert('---');
    this.setState({count:1});
 }

  render(){     
    if (this.props.id%2==0)
    return(<div><h2 style={{'color':'lightgreen'}}>{this.props.name}</h2><h1>-{this.state.count}-</h1><button onClick={()=>this.onChangeValue()}>click to change</button></div>);
    else
    return(<div><h2 style={{'color':'red'}}><WarningIcon/> {this.props.name}(({this.state.status})</h2><h1>-{this.state.count}-</h1><button onClick={()=>this.onChangeValue()}>click to change</button></div>);
    
}
}
class Dashboard extends React.Component {
  constructor()
  {
    super();
    this.state = {
        machines:[],
      };
  }
  componentDidMount() {
     const get_machines_url = 'http://127.0.0.1:3030/api/machines';

     fetch(get_machines_url)
     .then(res => res.json())
     .then((data) => {
                        this.setState({ machines: data});
                      });
  }

  render (){
    return(  <div className="wrapper" id='wrapp' >

 {this.state.machines.map((machine,key) =>
<div><Maschine name={machine.name} id={machine.id}></Maschine></div>
         )}
</div>);
  };
}
function App() {
  return (
    <div className="App">
          <Dashboard/>




    </div>
  );
}

export default App;
