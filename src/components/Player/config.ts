
// export const playlist = [{
//     id: 0,
//     type: 'music',
//     name: 'Despacito',
//     singer: 'Luis Fonsi',
//     cover: 'http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg',
//     musicSrc: 'http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3',
//   },
//   {
//     id: 1,
//     type: 'music',
//     name: 'Dorost Nemisham',
//     singer: 'Sirvan Khosravi',
//     cover: 'https://res.cloudinary.com/ehsanahmadi/image/upload/v1573758778/Sirvan-Khosravi-Dorost-Nemisham_glicks.jpg',
//     musicSrc: 'https://res.cloudinary.com/ehsanahmadi/video/upload/v1573550770/Sirvan-Khosravi-Dorost-Nemisham-128_kb8urq.mp3',
//   },
//   {
//     id: 2,
//     type: 'folder',
//     name: 'Sad Songs (2020)',
//     singer: '',
//     cover: '',
//     musicSrc: 'https://res.cloudinary.com/ehsanahmadi/video/upload/v1573550770/Sirvan-Khosravi-Dorost-Nemisham-128_kb8urq.mp3',
//   },
//   {
//     id: 3,
//     type: 'music',
//     name: 'Bedtime Stories',
//     singer: 'Jay Chou',
//     cover:
//       'http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg',
//     musicSrc: 'http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3',
//   },
//   {
//     id: 4,
//     type: 'folder',
//     name: 'Starset - Músicas',
//     singer: '',
//     cover: '',
//     musicSrc: 'https://res.cloudinary.com/ehsanahmadi/video/upload/v1573550770/Sirvan-Khosravi-Dorost-Nemisham-128_kb8urq.mp3',
//   },
//   {
//     id: 5,
//     type: 'music',
//     name: `anson seabra - that's us // lyrics`,
//     singer: 'Cloundy',
//     cover: 'https://i.ytimg.com/vi/6OUbakqakCE/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDF30-ChCKCvOvrDSCGNUMjfa_GkQ',
//     musicSrc: 'http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3',
//   },
//   {
//     id: 6,
//     type: 'video',
//     name: 'Black Desert 2022.05.10 - 02.58.01.01',
//     singer: '',
//     cover: 'https://i.ytimg.com/vi/jXtqalFAY7w/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCPWmIqkoY7r8pn5gIQlWHMwNpS9A',
//     musicSrc: 'https://res.cloudinary.com/ehsanahmadi/video/upload/v1573550770/Sirvan-Khosravi-Dorost-Nemisham-128_kb8urq.mp3',
//   },
//   {
//     id: 7,
//     type: 'music',
//     name: 'Te Amar Dói',
//     singer: 'Barreto',
//     cover: 'https://i.ytimg.com/vi/mcd7unIkQ4Y/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLARUeIWfoh6AgDyZTA6sgkEl6e2og',
//     musicSrc: 'http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3',
//   },
//   {
//     id: 8,
//     type: 'music',
//     name: '/Surrender - (Lyrics) 🎵',
//     singer: 'Natalie Taylor',
//     cover: 'https://i.ytimg.com/vi/Dbf8PYnzRdo/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLA0dljK0CCWSEuFO9ZF8nZtNjPPOg',
//     musicSrc: 'http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3',
//   },
//   {
//     id: 9,
//     type: 'music',
//     name: '5 Seconds Of Summer - Ghost Of You (Lyrics)',
//     singer: 'Gold Coast Music',
//     cover: 'https://i.ytimg.com/vi/stdr6o0-HOM/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBvDmolb8aD30puvNeQN28jshxzwg',
//     musicSrc: 'http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3',
//   }
// ];

export type PlaylistProps = {
  id: number,
  type: string,
  name?: string;
  singer?: string;
  cover?: string,
  musicSrc?: string,
  duration?: number,
}