import { BsEmojiSunglasses } from 'react-icons/bs'
import { FaPaw, FaCodepen } from 'react-icons/fa'
import {
  MdAutoFixHigh,
  MdGamepad,
  MdMusicNote,
  MdOutlineAutoFixHigh,
  MdOutlineGamepad,
  MdOutlineMusicNote,
  MdOutlineSportsBasketball,
  MdSportsBasketball,
} from 'react-icons/md'
import { HiCake, HiOutlineCake } from 'react-icons/hi'
import { IoNewspaper, IoNewspaperOutline, IoPawOutline } from 'react-icons/io5'
import { ImCodepen } from 'react-icons/im'

export const topics = [
  {
    name: 'news',
    activeIcon: <IoNewspaper />,
    icon: <IoNewspaperOutline />,
  },
  {
    name: 'funny',
    activeIcon: <BsEmojiSunglasses />,
    icon: <BsEmojiSunglasses />,
  },
  {
    name: 'animals',
    activeIcon: <FaPaw />,
    icon: <IoPawOutline />,
  },
  {
    name: 'food',
    activeIcon: <HiCake />,
    icon: <HiOutlineCake />,
  },
  {
    name: 'sports',
    activeIcon: <MdSportsBasketball />,
    icon: <MdOutlineSportsBasketball />,
  },
  {
    name: 'gaming',
    activeIcon: <MdGamepad />,
    icon: <MdOutlineGamepad />,
  },
  {
    name: 'music',
    activeIcon: <MdMusicNote />,
    icon: <MdOutlineMusicNote />,
  },
  {
    name: 'beauty',
    activeIcon: <MdAutoFixHigh />,
    icon: <MdOutlineAutoFixHigh />,
  },
  {
    name: 'coding',
    activeIcon: <FaCodepen />,
    icon: <ImCodepen />,
  },
]

export const footerList1 = [
  'About',
  'Newsroom',
  'Store',
  'Contact',
  'Carrers',
  'ByteDance',
  'Creator Directory',
]
export const footerList2 = [
  'TikTik for Good',
  'Advertise',
  'Developers',
  'Transparency',
  'TikTik Rewards',
]
export const footerList3 = [
  'Help',
  'Safety',
  'Terms',
  'Privacy',
  'Creator Portal',
  'Community Guidelines',
]
