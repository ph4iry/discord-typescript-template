import Event from '../classes/Event';

const Ready = new Event({
  name: 'ready',
  once: true,
}, async () => {
  console.log('Ready!');
});

export default Ready;