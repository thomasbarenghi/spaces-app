const getUsers = require("./usersDB");
const getSpaces = require("./spacesDB");
const getRooms = require("./rooms");

let users = getUsers;
let spaces = getSpaces;
let rooms = getRooms;

const spaceFormatter = (
  space,
  membersToAdd,
  showRooms,
  adminUsers,
  roomsToAdd
) => {
  const members = userFormatterForSpaces(users, adminUsers);

  const newSpace = {
    id: space.id,
    accessCode: space.accessCode,
    name: space.name,
    description: space.description,
    coverImage: space.coverImage,
    lastModified: space.lastModified,
    createdAt: space.createdAt,
    members: members,
    rooms: !showRooms
      ? []
      : roomsToAdd.map((roomId) => rooms.find((room) => room.id === roomId)),
    files: space.files,
  };

  return newSpace;
};

const userFormatterForSpaces = (members, adminUsers) => {
  const formatted = members.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    profileImage: user.profileImage,
    role: adminUsers.includes(user.id) ? "admin" : "member",
  }));
  // console.log("adminUsers", adminUsers);
  //  console.log("formatted", formatted);
  return formatted;
};

// Asigna los usuarios a los espacios
const formattedSpaces = spaces.map((space) => {
  if (space.id == "1") {
    return spaceFormatter(
      space,
      users.slice(0, 2),
      true,
      ["1", "3"],
      ["room-1"]
    );
  }
  if (space.id == "3") {
    return spaceFormatter(
      space,
      users.slice(0, 2),
      true,
      ["1", "3"],
      ["room-1"]
    );
  }
  return space;
});

// Asigna los espacios a los usuarios
const formattedUsers = users.map((user) => {
  const userSpaces = spaces.map((space) =>
    spaceFormatter(space, users.slice(0, 2), false, ["1", "3"], ["room-1"])
  );

  return {
    ...user,
    spaces: userSpaces,
  };
});

const db = {
  users: formattedUsers,
  spaces: formattedSpaces,
  rooms: getRooms,
};

module.exports = db;
