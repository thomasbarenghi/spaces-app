const JG = {
    repeat: (min, max, callback) => {
      const count = _.random(min, max);
      const results = [];
      for (let i = 0; i < count; i++) {
        results.push(callback());
      }
      return results;
    },
    objectId: () => _.random(1000000000, 9999999999),
    firstName: () => 'John',
    lastName: () => 'Smith',
    snakeCase: (str) => _.snakeCase(str),
    domainZone: () => _.sample(['com', 'net', 'org']),
    company: () => 'Test Company',
    date: (start, end) => moment(_.random(start.getTime(), end.getTime())).format(),
    street: () => 'Test Street',
    city: () => 'Test City',
    state: () => 'Test State',
    integer: (min, max) => _.random(min, max),
    floating: (min, max, precision) => _.random(min, max, true).toFixed(precision),
    loremIpsum: (options) => _.times(options.count, _.random(1, 5)).map(() => _.lorem()).join(' '),
    guid: () => _.random(1000000000, 9999999999),
    random: (...args) => _.sample(args),
  };
  
  const moment = (date) => ({
    format: (format) => date.toISOString(),
    add: (count, unit) => date.add(count, unit),
  });
  
  const _ = {
    random: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
    snakeCase: (str) => str.toLowerCase().replace(/\s+/g, '_'),
    words: (str) => str.split(' '),
    uniq: (arr) => Array.from(new Set(arr)),
    lorem: () => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  };
  
  const model = {
    id: '1234567890',
    firstName: JG.firstName(),
    lastName: JG.lastName(),
    username: `${_.words(JG.firstName())[0]}${moment(new Date()).format('YY')}`.toLowerCase(),
    profileImage: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    email: `${_.snakeCase(`${JG.firstName()} ${JG.lastName()}`)}@${JG.company()}${JG.domainZone()}`.toLowerCase(),
    registerMethod: 'email',
    password: 'encriptedPassword',
    lastModified: '2018-01-01T00:00:00.000Z',
    createdAt: '2018-01-01T00:00:00.000Z',
    isSuperAdmin: false,
    softDelete: false,
    coverImage: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    spaces: JG.repeat(1, 1, () => ({
      id: '1234567890',
      name: 'Space 1',
      description: 'Space 1 description',
      coverImage: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      members: JG.repeat(2, 2, () => ({
        id: '1234567890',
        firstName: JG.firstName(),
        lastName: JG.lastName(),
        profileImage: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      })),
      lastModified: '2018-01-01T00:00:00.000Z',
      createdAt: '2018-01-01T00:00:00.000Z',
    })),
  };
  
  console.log(JSON.stringify(model, null, 2));
  