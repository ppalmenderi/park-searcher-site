import biking from '../assets/biking.svg';
import birdwatching from '../assets/birdwatching.svg';
import boating from '../assets/boating.svg';
import camping from '../assets/camping.svg';
import commercialTours from '../assets/commercial-tours.svg';
import fallback from '../assets/fallback.svg';
import fishing from '../assets/fishing.svg';
import guidedTours from '../assets/guided-tours.svg';
import hiking from '../assets/hiking.svg';
import mountaineering from '../assets/mountaineering.svg';
import scenicDriving from '../assets/scenic-driving.svg';
import stargazing from '../assets/stargazing.svg';
import swimming from '../assets/swimming.svg';
import wildlifeViewing from '../assets/wildlife-viewing.svg';
import winterActivities from '../assets/winter-activities.svg';

function Icon({ activity }) {
  let activityIcon;

  console.log(activity);
  switch (activity) {
    case 'Biking':
      activityIcon = biking;
      break;
    case 'Bird Watching':
      activityIcon = birdwatching;
      break;
    case 'Boating':
      activityIcon = boating;
      break;
      case 'Camping':
      activityIcon = camping;
      break;
      case 'Commercial Tours':
      activityIcon = commercialTours;
      break;
      case 'Fishing':
      activityIcon = fishing;
      break;
      case 'Guided Tours':
      activityIcon = guidedTours;
      break;
      case 'Hiking':
      activityIcon = hiking;
      break;
      case 'Mountaineering':
      activityIcon = mountaineering;
      break;
      case 'Scenic Driving':
      activityIcon = scenicDriving;
      break;
      case 'Stargazing':
      activityIcon = stargazing;
      break;
      case 'Swimming':
      activityIcon = swimming;
      break;
      case 'Wildlife Viewing':
      activityIcon = wildlifeViewing;
      break;
      case 'Winter Activities':
      activityIcon = winterActivities;
      break;
    default:
      activityIcon = fallback;
  }

  return <img src={activityIcon} className="activityIcon" alt="icon" />;
}

export default Icon;
