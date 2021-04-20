import atleticoDeMadridLogo from './assets/atletico-de-madrid.png';
import barcelonaLogo from './assets/barcelona.png';
import bayernLogo from './assets/bayern.png';
import juventusLogo from './assets/juventus.png';
import manchesterCityLogo from './assets/manchester-city.png';
import manchesterUnitedLogo from './assets/manchester-united.png';
import parisSaintGermainLogo from './assets/paris-saint-germain.png';
import realMadridLogo from './assets/real-madrid.png';
import { ClubsComponent, IClubsItem } from './ClubsComponent';

export const Clubs = () => {
  const items: IClubsItem[] = [
    {
      img: bayernLogo,
      href: '#',
      name: 'Bayern München',
    },
    {
      img: barcelonaLogo,
      href: '#',
      name: 'Barcelona',
    },
    {
      img: realMadridLogo,
      href: '#',
      name: 'Real Madrid',
    },
    {
      img: juventusLogo,
      href: '#',
      name: 'Juventus',
    },
    {
      img: manchesterCityLogo,
      href: '#',
      name: 'Manchester City',
    },
    {
      img: parisSaintGermainLogo,
      href: '#',
      name: 'Paris Saint-Germain',
    },
    {
      img: manchesterUnitedLogo,
      href: '#',
      name: 'Manchester United',
    },
    {
      img: atleticoDeMadridLogo,
      href: '#',
      name: 'Club Atlético de Madrid',
    },
  ];

  return <ClubsComponent items={items} stackUp stackDown />;
};
