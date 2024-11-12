import { VechiclesListParams } from 'src/resources/list/types';

export const DefaultListParams: VechiclesListParams = {
  atype: 'C',
  cy: ['D', 'A', 'B', 'E', 'F', 'I', 'L', 'NL'],
  damaged_listing: 'exclude',
  powertype: 'kw',
  source: 'listpage_pagination',
  ustate: ['N', 'U'],
  desc: 0,
  sort: 'standard',
};
