import josh_Merlot from './bottles/josh-merlot.webp';
import bogle_Merlot from './bottles/bogle-merlot.webp';
import duckhorn_Merlot from './bottles/duckhorn-merlot.webp';
import lowhangingfruit_Merlot from './bottles/low-hanging-fruit-merlot.webp';
import radius_Merlot from './bottles/radius-merlot.webp';
import stagsleap_Merlot from './bottles/stags-leap-merlot.webp'
import california_PinotNoir from './bottles/california-pinot-noir.webp';
import oregon_PinotNoir from './bottles/oregon-pinot-noir.webp';

export function getBottleImage(title) {
  switch(title) {
    case 'Josh Merlot': return josh_Merlot;
    case 'Bogle Merlot': return bogle_Merlot;
    case 'Oregon Merlot': return bogle_Merlot;
    case 'Duckhorn Merlot': return duckhorn_Merlot;
    case 'Low Hanging Fruit Merlot': return lowhangingfruit_Merlot;
    case 'Radius Merlot':  return radius_Merlot;
    case 'Stags Leap Merlot':  return stagsleap_Merlot;
    case 'California Pinot Noir': return california_PinotNoir;
    case 'Oregon Pinot Noir': return oregon_PinotNoir;
    default: 
      console.log("no image for: ", title);
      return josh_Merlot;
  }
}

