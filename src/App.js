import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Slider, ToggleButton, Card, CardHeader, Avatar, CardContent, List, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import './App.css';
import { ReactComponent as C_OUTLINE } from './assets/fonts/alpha-c-circle-outline.svg';
import { ReactComponent as D_OUTLINE } from './assets/fonts/alpha-d-circle-outline.svg';
import { ReactComponent as H_OUTLINE } from './assets/fonts/alpha-h-circle-outline.svg';
import { ReactComponent as M_OUTLINE } from './assets/fonts/alpha-m-circle-outline.svg';
import { ReactComponent as S_OUTLINE } from './assets/fonts/alpha-s-circle-outline.svg';
import { ReactComponent as V_OUTLINE } from './assets/fonts/alpha-v-circle-outline.svg';
import Astrobiology from './assets/Images/Astrobiology.png'; 
import Atmospheric from './assets/Images/Atmospheric.png'; 
import Droplet from './assets/Images/Droplet.png';
import Ocean from './assets/Images/Ocean.png';
import PushFactory from './assets/Images/PushFactory.png';


var gazette = require('./assets/HF4_gazette.json');

function Prospector() {
  const [specTypes, setSpecTypes] = useState(Array(6).fill(false));
  const [hydration, setHydration] = useState(0);
  const [size, setSize] = useState([1,11]);

  const handleSizeChange = (event, newValue) => {
    setSize(newValue);
  };
  const handleHydrationChange = (event, newValue) => {
    setHydration(newValue);
  };


  const OnToggle = value => {
    let spec = specTypes.slice();

    if (spec[value] === false) {
      spec[value] = true;
    } else {
      spec[value] = false;
    }
    setSpecTypes(spec);
  };

   const OnCToggle = value => {
    OnToggle(0);
  };
  const OnDToggle = value => {
    OnToggle(1);
  };
  const OnHToggle = value => {
    OnToggle(2);
  };
  const OnMToggle = value => {
    OnToggle(3);
  };
  const OnSToggle = value => {
    OnToggle(4);
  };
  const OnVToggle = value => {
    OnToggle(5);
  };

  return (
    <div className="App">
      <h3>HF4A Prospector</h3>
      <div>
        <h5>Spectral Types</h5>
                  <ToggleButton
            selected={specTypes[0]}
            onClick={OnCToggle}
          >
            <C_OUTLINE />
          </ToggleButton> 
                    <ToggleButton
            selected={specTypes[1]}
            onClick={OnDToggle}
          >
            <D_OUTLINE />
          </ToggleButton> 

          <ToggleButton
            selected={specTypes[2]}
            onClick={OnHToggle}
          >
            <H_OUTLINE />
          </ToggleButton> 

          <ToggleButton
            selected={specTypes[3]}
            onClick={OnMToggle}
          >
            <M_OUTLINE />
          </ToggleButton> 

          <ToggleButton
            selected={specTypes[4]}
            onClick={OnSToggle}
          >
            <S_OUTLINE />
          </ToggleButton> 

          <ToggleButton
            selected={specTypes[5]}
            onClick={OnVToggle}
          >
            <V_OUTLINE />
          </ToggleButton> 


        <h5>Size</h5>
        <center><Box sx={{width: 300}}>
        <Slider
          
          value={size}
          valueLabelDisplay="auto"
          onChange={handleSizeChange}
          marks
          min={1}
          max={11}
         />
         </Box>
         </center>


        <h5>Hydration</h5>
        <center><Box sx={{width: 300}}>
        <Slider
          value={hydration}
          valueLabelDisplay="auto"
          step={1}
          onChange={handleHydrationChange}
          marks
          min={0}
          max={4} />
          </Box></center>
      </div>

      <SiteList spec={specTypes} size={size} hydration={hydration} />


    </div>


  );
}

function SiteList(props)
{
  let specTypeList = SpecTypesCheckToList(props.spec);
  let sites = gazette
    .filter(x => specTypeList.includes(x.SpectralType))
    .filter(x => x.Hydration >= props.hydration)
    .filter(x => x.Size <= props.size[1])
    .filter(x => x.Size >= props.size[0]);

  const siteList = [];

  sites.forEach(site =>
    siteList.push(<SiteItem key={site.SiteName} siteItem={site} />),
  );

  return (<div>{siteList}</div>);

}

function SiteItem(props)
{
  let _synodic = 'grey';

  if (props.siteItem.Synodic === 'Blue') {
    _synodic = 'blue';
  } else if (props.siteItem.Synodic === 'Red') {
    _synodic = 'red';
  } else if (props.siteItem.Synodic === 'Yellow') {
    _synodic = 'yellow';
  }

  let _label = props.siteItem.Size + props.siteItem.SpectralType;

  return (
    <center><Box sx={{width: 300}}>
    <Card key={props.siteItem.SiteName}>
      <CardHeader
        title={props.siteItem.SiteName}
            avatar={
          <Avatar sx={{bgcolor: _synodic}}>{_label}</Avatar>
        }
        //avatar={<Avatar sx={{ bgcolor: _synodic}}>{_label}</Avatar>}
       />
       <CardContent>
          <List dense="true">
            <ListItem>Hydration: {HydrationDrops(props.siteItem.Hydration)} </ListItem>
            <ListItem>Location: {props.siteItem.SolarZone} {props.siteItem.Where}</ListItem>
            <ListItem>Burns From LEO: {props.siteItem.Burns}</ListItem>
            <ListItem>Icons: {SiteIcons(props.siteItem.Icons)} </ListItem>
          </List>
       </CardContent>
    </Card>
    </Box></center>

  );


}

function HydrationDrops(hydration) {
  let result = [];
  for (let i = 0; i < hydration; i++) {
    result.push(
      <img src={Droplet} alt="Droplet" height="18" />
    );
  }
  return result;
}

function SiteIcons(iconList) {
  let result = [];

  if (iconList.indexOf('Subsurface') >= 0) {
    result.push(
      <img src={Ocean} alt="Subsurface Ocean" height="18" />
    );
  }
  if (iconList.indexOf('Push') >= 0) {
    result.push(
      <img src={PushFactory} alt="PushFactory" height="18" />
    );
  }
  if (iconList.indexOf('Astrobiology') >= 0) {
    result.push(
      <img src={Astrobiology} alt="Astrobiology" height="18" />
    );
  }
  if (iconList.indexOf('Atmospher') >= 0) {
    result.push(
      <img src={Atmospheric} alt="Atmospheric" height="18" />
      );
  }

  return result;
}

function SpecTypesCheckToList(specTypesArray) {
  let result = '';

  if (specTypesArray[0]) {
    result += 'C';
  }
  if (specTypesArray[1]) {
    result += 'D';
  }
  if (specTypesArray[2]) {
    result += 'H';
  }
  if (specTypesArray[3]) {
    result += 'M';
  }
  if (specTypesArray[4]) {
    result += 'S';
  }
  if (specTypesArray[5]) {
    result += 'V';
  }
  return result;
}

const colors = {
  SpaceCadet: '#343b5e',
  Independence: '#4b495f',
  Rhythm: '#84779a',
  LemonMeringue: '#f6ebc2',
  SilverChalice: '#abadaa',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      // Purple and green play nicely together.
      main: colors.SpaceCadet,
    },
    secondary: {
      // This is green.A700 as hex.
      main: colors.LemonMeringue,
    },
  },
});

export default function main(){
  return (
    <ThemeProvider theme={theme}>
      <Prospector />
    </ThemeProvider>
  );

}

