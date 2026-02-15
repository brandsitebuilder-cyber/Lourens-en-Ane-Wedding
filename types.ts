export enum MessageTone {
  HEARTFELT = 'Heartfelt',
  FUNNY = 'Funny',
  FORMAL = 'Formal',
  SHORT = 'Short & Sweet'
}

export interface GuestBookEntry {
  name: string;
  message: string;
  relationship: string;
}

export interface RsvpData {
  name: string;
  email: string;
  attending: boolean;
  guests: number;
  dietaryRestrictions: string;
  songRequest?: string;
  plusOneName?: string;
  plusOneDietary?: string;
}

export interface NavItem {
  label: string;
  href: string;
}