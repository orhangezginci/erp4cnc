import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ScheduleIcon from '@material-ui/icons/Schedule';
import TimerIcon from '@material-ui/icons/Timer';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import StartIcon from '@material-ui/icons/PlayArrow';


function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and static variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const useCardStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

class Maschine extends React.Component {
  onGreet() {
    alert('Hello');
  }
  onChangeValue(newCountValue)
  {
    this.setState({countValue:newCountValue});
  }
  constructor(){
    super();
    this.state = {
        countValue:0,
        countItem : {}
      };
  }
  onChangeValue(newCountValue)
  {
     //this.props.onChangeValue(this.state.countValue);
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
      }
      updatevalues(){
        alert('');
      }
  render() {
    return (
<div className={useStyles.root}>
<button onClickfn={this.onChangeValue.bind(this)}>change Count</button>
<Chip
        icon={<DoneIcon />}
        label={this.props.name}
        color="Primary"
        style={{backgroundColor:'DARKTURQUOISE', Color:'black'}}
      />
        <Accordion>
        
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
                      <Typography>Auftrag-1</Typography><br></br><CircularProgressWithLabel value={'85'} />

          </AccordionSummary>
          
          <AccordionDetails>
            <Card>
            <CardHeader id={this.props.id} title="Details" subheader={this.state.countValue}></CardHeader>
              <CardContent>
              <div className={useCardStyles.root}>
                <List component="nav" aria-label="main mailbox folders">
             
                <ListItem button>
                    <ListItemIcon>
                      <AlarmOnIcon /><StartIcon />
                    </ListItemIcon>
                    <ListItemText primary="28.08 (6h30m" />
                  </ListItem>
                  
                  <ListItem button>
                    <ListItemIcon>
                      <ScheduleIcon /><DoneIcon />
                    </ListItemIcon>
                    <ListItemText primary="28.08 (6h30m" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <TimerIcon />
                    </ListItemIcon>
                    <ListItemText primary="166Sek" />
                  </ListItem>
                </List>
                <Divider />
                <List component="nav" aria-label="secondary mailbox folders">
                  <ListItem button>
                    <ListItemText primary="Produktionsverlauf" />
                  </ListItem>
                </List>
          </div>
              </CardContent></Card>
          
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={useStyles.heading}>Auftrag - 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion disabled>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={useStyles.heading}>Disabled Accordion</Typography>
          </AccordionSummary>
        </Accordion>
      </div>
    );
  }
}

export default Maschine;
