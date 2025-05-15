const statsdata = (isOpen) => [
  {
    title: 'Total caslab',
    value: '33 orang',
  },

  {
    title: 'Hak penjurian',
    value: 'interviewer',
  },

  {
    title: 'Status penjurian',
    value: isOpen ? 'open' : 'closed',
    color: isOpen ? 'text-green-500' : 'text-red-500',
  },
];

export default statsdata;
