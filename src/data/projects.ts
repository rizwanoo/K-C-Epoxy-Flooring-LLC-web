import residentialGarageTwoBay from '../assets/kc/proj_50.png';
import residentialGarageWindows from '../assets/kc/proj_165.png';
import commercialEventHall from '../assets/kc/proj_182.jpeg';
import commercialCobaltMetallic from '../assets/kc/proj_31.png';
import decorativeCharcoalMetallic from '../assets/kc/proj_76.png';
import commercialCrimsonFlake from '../assets/kc/proj_173.png';
import industrialCrewInstall from '../assets/kc/proj_160.jpeg';
import residentialRecRoom from '../assets/kc/logo_or_mark_189.png';

export type ProjectCategory =
  | 'Residential Flooring'
  | 'Commercial Flooring'
  | 'Industrial Flooring'
  | 'Garage Flooring'
  | 'Decorative Epoxy Flooring';

export interface ProjectItem {
  id: string;
  src: string;
  width: number;
  height: number;
  title: string;
  finishType: string;
  categories: ProjectCategory[];
  summary: string;
  alt: string;
}

export const GALLERY_CATEGORIES: Array<'All Projects' | ProjectCategory> = [
  'All Projects',
  'Residential Flooring',
  'Commercial Flooring',
  'Industrial Flooring',
  'Garage Flooring',
  'Decorative Epoxy Flooring',
];

export const KC_PROJECTS: ProjectItem[] = [
  {
    id: 'residential-garage-charcoal',
    src: residentialGarageWindows,
    width: 1710,
    height: 920,
    title: 'Multi-Tone Charcoal Flake Residential Garage',
    finishType: 'Full-Broadcast Decorative Flake & Cove Base',
    categories: ['Residential Flooring', 'Garage Flooring', 'Decorative Epoxy Flooring'],
    summary:
      'Seamless architectural gray and black flake system with matching coated stem walls and high-gloss protective topcoat.',
    alt: 'Completed residential garage epoxy flake flooring with glossy reflective surface and coated stem walls by K & C Epoxy Flooring LLC',
  },
  {
    id: 'commercial-cobalt-metallic',
    src: commercialCobaltMetallic,
    width: 1086,
    height: 1448,
    title: 'Cobalt & Ocean Metallic Commercial Interior',
    finishType: 'Custom Metallic Epoxy System',
    categories: ['Commercial Flooring', 'Decorative Epoxy Flooring'],
    summary:
      'High-gloss cobalt blue and deep slate metallic resin floor installed across an open commercial suite and reception zone.',
    alt: 'Cobalt blue metallic epoxy floor installation inside a commercial interior suite by K & C Epoxy Flooring LLC',
  },
  {
    id: 'commercial-event-hall',
    src: commercialEventHall,
    width: 1600,
    height: 1200,
    title: 'Large-Span Commercial Venue Epoxy Finish',
    finishType: 'Seamless High-Gloss Neutral Epoxy',
    categories: ['Commercial Flooring', 'Industrial Flooring'],
    summary:
      'Continuous light-gray commercial epoxy flooring engineered for uniform light reflectance and straightforward daily floor care.',
    alt: 'Expansive commercial hall finished with seamless high-gloss light gray epoxy flooring by K & C Epoxy Flooring LLC',
  },
  {
    id: 'residential-double-bay-garage',
    src: residentialGarageTwoBay,
    width: 1871,
    height: 840,
    title: 'Double-Bay Residential Garage Coating',
    finishType: 'Gray Decorative Flake System',
    categories: ['Residential Flooring', 'Garage Flooring'],
    summary:
      'Wall-to-wall residential garage transformation featuring slip-resistant flake texture, clean perimeter coving, and bright light reflection.',
    alt: 'Two-bay residential garage with finished gray epoxy flake floor and coated perimeter base by K & C Epoxy Flooring LLC',
  },
  {
    id: 'decorative-smoke-metallic',
    src: decorativeCharcoalMetallic,
    width: 1152,
    height: 1536,
    title: 'Charcoal & Smoke Metallic Interior Concrete',
    finishType: 'Multi-Layer Metallic Epoxy',
    categories: ['Residential Flooring', 'Decorative Epoxy Flooring'],
    summary:
      'Deep marbled charcoal and pewter metallic epoxy finish bringing seamless architectural depth to an interior concrete space.',
    alt: 'Dark charcoal and silver marbled metallic epoxy interior concrete floor installed by K & C Epoxy Flooring LLC',
  },
  {
    id: 'commercial-crimson-kitchen',
    src: commercialCrimsonFlake,
    width: 1086,
    height: 1448,
    title: 'Commercial Food-Service & Prep Area Epoxy',
    finishType: 'High-Gloss Crimson Broadcast Flake',
    categories: ['Commercial Flooring', 'Industrial Flooring'],
    summary:
      'Non-porous, easy-to-sanitize crimson epoxy floor coating tailored for heavy-duty commercial back-of-house operations.',
    alt: 'High-gloss red epoxy flake flooring installed in a commercial food-service prep room by K & C Epoxy Flooring LLC',
  },
  {
    id: 'industrial-workshop-install',
    src: industrialCrewInstall,
    width: 1200,
    height: 1600,
    title: 'Large-Bay Concrete Preparation & Flake Application',
    finishType: 'Commercial & Workshop Epoxy Flake',
    categories: ['Industrial Flooring', 'Residential Flooring', 'Garage Flooring'],
    summary:
      'On-site installation by the K & C crew applying continuous decorative flake coverage across an expansive concrete slab.',
    alt: 'K & C Epoxy Flooring LLC installers finishing a large gray flake epoxy floor inside a multi-bay space',
  },
  {
    id: 'residential-home-gym-suite',
    src: residentialRecRoom,
    width: 1254,
    height: 1254,
    title: 'Home Gym & Recreation Suite Epoxy Floor',
    finishType: 'Gray Flake Seamless Topcoat',
    categories: ['Residential Flooring', 'Garage Flooring'],
    summary:
      'Clean, durable residential recreation and fitness floor coating built to handle equipment loads while staying easy to sweep and mop.',
    alt: 'Three-view showcase of a residential home gym and recreation space with gray epoxy flake flooring by K & C Epoxy Flooring LLC',
  },
];

export const HERO_PROJECT = KC_PROJECTS[0];
export const RESIDENTIAL_FEATURE = KC_PROJECTS[3];
export const COMMERCIAL_FEATURE = KC_PROJECTS[2];
export const INDUSTRIAL_FEATURE = KC_PROJECTS[6];
