const spaces = [
  {
    id: "1",
    accessCode: "1234567890",
    name: "NoCountry Workspace",
    description: "La startup que vino a revolucionar Argentina y Latinoamérica",
    coverImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    lastModified: "2018-01-01T00:00:00.000Z",
    createdAt: "2018-01-01T00:00:00.000Z",
    members: [], //Ref
    rooms: [], //Ref
    files: [
      {
        id: "1234567890",
        name: "File 1",
        description: "File 1 description",
        type: "image",
        src: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        lastModified: "2018-01-01T00:00:00.000Z",
        createdAt: "2018-01-01T00:00:00.000Z",
        asignedRoom: {
          id: "1234567890",
          name: "Room 1",
          description: "Room 1 description",
          coverImage:
            "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        },
        owner: {
          id: "1234567890",
          firstName: "John",
          lastName: "Smith",
          profileImage:
            "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        },
      },
    ],
  },
  {
    id: "2",
    accessCode: "1234567890",
    name: "Henry Workspace",
    description: "La startup que vino a revolucionar Argentina y Latinoamérica",
    coverImage:
      "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=775&q=80",
    lastModified: "2018-01-01T00:00:00.000Z",
    createdAt: "2018-01-01T00:00:00.000Z",
    members: [], //Ref
    rooms: [], //Ref
    files: [
      {
        id: "1234567890",
        name: "File 1",
        description: "File 1 description",
        type: "image",
        src: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        lastModified: "2018-01-01T00:00:00.000Z",
        createdAt: "2018-01-01T00:00:00.000Z",
        asignedRoom: {
          id: "1234567890",
          name: "Room 1",
          description: "Room 1 description",
          coverImage:
            "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        },
        owner: {
          id: "1234567890",
          firstName: "John",
          lastName: "Smith",
          profileImage:
            "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        },
      },
    ],
  },
];

module.exports = spaces;
