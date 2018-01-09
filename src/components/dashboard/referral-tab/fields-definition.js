export default {
  table1Fields: [
    {
      name: '__component:badge-column',
      title: '',
      dataClass: 'text-center'
    },
    {
      name: 'id',
      title: 'device',
      sortField: 'id'
    },
    {
      name: 'count',
      title: 'count'
    }
  ],
  table2Fields: [
    {
      name: '__component:badge-column',
      title: '',
      dataClass: 'text-center'
    },
    {
      name: 'id',
      title: 'os',
      sortField: 'id'
    },
    {
      name: 'count',
      title: 'count'
    }
  ],
  table3Fields: [
    {
      name: '__component:badge-column',
      title: '',
      dataClass: 'text-center'
    },
    {
      name: 'id',
      title: 'browser',
      sortField: 'id'
    },
    {
      name: 'count',
      title: 'count'
    }
  ],
  sortFunctions: {
    'name': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    }
  }
}
