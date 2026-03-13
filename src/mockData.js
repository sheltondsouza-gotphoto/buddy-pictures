const mockUserData = {
  name: 'Amy Waller',
  id: 'user-1',
};

const mockSubjects = [
  {
    id: 'sub-1',
    name: 'Autumn Phillips',
    pictureTypes: ['Individual', 'Group', 'Family'],
    status: 'Active',
    category: 'All',
  },
  {
    id: 'sub-2',
    name: 'Daniel Hamilton',
    pictureTypes: ['Individual'],
    status: 'Inactive',
    category: 'To do',
  },
  {
    id: 'sub-3',
    name: 'Ricky Smith',
    pictureTypes: ['Group'],
    status: 'Inactive',
    category: 'Absentees',
  },
  {
    id: 'sub-4',
    name: 'Joshua Jones',
    pictureTypes: ['Family'],
    status: 'Active',
    category: 'Individual',
  },
  {
    id: 'sub-5',
    name: 'Rodger Struck',
    pictureTypes: ['Individual', 'Group'],
    status: 'Inactive',
    category: 'Group',
  },
  {
    id: 'sub-6',
    name: 'Sarah Connor',
    pictureTypes: ['Family'],
    status: 'Active',
    category: 'Family',
  },
];

const mockFilters = [
  { id: 'all', label: 'All' },
  { id: 'toDo', label: 'To do' },
  { id: 'absentees', label: 'Absentees' },
  { id: 'individual', label: 'Individual' },
  { id: 'group', label: 'Group' },
  { id: 'family', label: 'Family' },
];

const mockTaggingModes = {
  single: 'single',
  multi: 'multi',
};

export { mockUserData, mockSubjects, mockFilters, mockTaggingModes };
