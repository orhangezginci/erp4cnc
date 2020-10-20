import React from 'react';
import Maschine from './maschine';
import ReactDOM from 'react-dom';


class MGrid extends React.Component {
  handleClick = () => {
    // force a re-render
    alert('9');
    this.setState({countValue:5});

    this.forceUpdate();
  }
  
    //console.log(this.state.counts);
    //return '678';
}


  constructor()
  {
   
    super();
    this.state = {
        countValue:"3",
        machines: [],
        counts: [{m_id:6,value:"2"},{m_id:"18",value:"44"}],
        countItem : {m_id:6,value:"2"}
      };
  };
  onChangeValue()
  {
    
    this.setState({countValue:5});
    this.forceUpdate();
  }
  
  componentDidMount() {
    const aws_url = 'http://ec2-18-216-163-77.us-east-2.compute.amazonaws.com:3030/api/machines';
    const local_url = 'http://127.0.0.1:3030/api/machines'; 
    const machineurl = local_url;
    const counturl = 'http://127.0.0.1:3030/api/countAll';
        fetch(machineurl)
        .then(res => res.json())
        .then((data) => {
          this.setState({ machines: data });
          console.log(this.state.machines);
        })
        .catch(data => console.log(data));

        fetch(counturl) 
        .then(res => res.json())
        .then((dataCount) => {
          this.setState({ counts: dataCount });
          console.log('#########Counts############');
          console.log(this.state.counts);
          console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
          console.log(typeof this.state.counts);

          console.log('################################<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
          //const element = <div><Maschine name=''makina id='0' count='798'></Maschine></div>;
          //ReactDOM.render(element, document.getElementById('wrapp'));


          console.log('---------------------------------------------------');      
        });
   
      }
      
  render() {
    console.log('render');
    return(
      

      <div className="wrapper" id='wrapp' >
<button onClick={this.handleClick}>refreshCount</button>
 {this.state.machines.map((machine,key) =>
<div><Maschine name={machine.name} id={machine.id} count={this.state.countValue}></Maschine></div>
         )}
</div>

       )
  }
}

export default MGrid;
