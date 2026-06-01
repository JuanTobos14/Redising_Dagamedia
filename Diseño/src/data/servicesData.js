import gif2D from '../assets/2d gif.gif';
import gif3D from '../assets/3d gif.gif';

export const SERVICES = [
  {
    id: '2d',
    titleKey: 'services_2d_title',
    descKey: 'services_2d_desc',
    subtitleKey: 'services_2d_fun',
    detailKey: 'services_2d_detail',
    image: gif2D,
    type: 'image',
  },
  {
    id: '3d',
    titleKey: 'services_3d_title',
    descKey: 'services_3d_desc',
    subtitleKey: 'services_3d_fun',
    detailKey: 'services_3d_detail',
    image: gif3D,
    type: 'cube',
  },
];

export const DEFAULT_SERVICE_ID = '2d';