// Contact form constants and options
import { ProjectType, BudgetRange, Timeline } from '../types';

export const PROJECT_TYPES: ProjectType[] = [
  'Residential Design',
  'Commercial Architecture',
  'Interior Design',
  'Landscape Architecture',
  'Planning & Consulting',
  'Renovation/Addition',
  'Other'
];

export const BUDGET_RANGES: BudgetRange[] = [
  'Under $100k',
  '$100k - $250k',
  '$250k - $500k',
  '$500k - $1M',
  '$1M - $2M',
  'Over $2M',
  'To be determined'
];

export const TIMELINES: Timeline[] = [
  'ASAP',
  '1-3 months',
  '3-6 months',
  '6-12 months',
  '1+ years',
  'Flexible'
];
