interface Member {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}
export class MembersProps {
  user: Member;
  role: string;

  constructor(user: Member, role: string) {
    this.user = user;
    this.role = role;
  }

  getUser(): Member {
    return this.user;
  }

  static deserialize(input: any): MembersProps {
    return new MembersProps(input?.user, input?.role);
  }

  static deserializeList(data: any[]): MembersProps[] {
    return data.map((member) => MembersProps.deserialize(member));
  }

  getRole(): string {
    return this.role;
  }

  getFullName(): string {
    return this.user.firstName + " " + this.user.lastName;
  }

  getFormattedRole(): string {
    if (this.role === "owner") {
      return "Propietario";
    } else if (this.role === "admin") {
      return "Administrador";
    } else {
      return "Miembro";
    }
  }

  getId(): string {
    return this.user.id;
  }

  hasPermission(permission: GeneralPermission): boolean {
    const permissions = rolePermissions[this.role];
    return permissions ? permissions.includes(permission) : false;
  }

  isOwner(): boolean {
    return this.role === "owner";
  }

  isAdmin(): boolean {
    return this.role === "admin";
  }

  getProfileImage(): string {
    return this.user.profileImage;
  }
}

export enum GeneralPermission {
  CreateSpace = "createSpace",
  EditSpace = "editSpace",
  DeleteSpace = "deleteSpace",
  CreateRoom = "createRoom",
  DeleteRoom = "deleteRoom",
  EditMemberRole = "editMemberRole",
  DeleteMember = "deleteMember",
  DeleteTask = "deleteTask",
  DeleteFile = "deleteFile",
  // Agrega más permisos según tus necesidades
}

type RolePermissions = {
  [role: string]: GeneralPermission[];
};

const rolePermissions: RolePermissions = {
  owner: [
    GeneralPermission.CreateSpace,
    GeneralPermission.EditSpace,
    GeneralPermission.DeleteSpace,
    GeneralPermission.CreateRoom,
    GeneralPermission.DeleteRoom,
    GeneralPermission.EditMemberRole,
    GeneralPermission.DeleteMember,
    GeneralPermission.DeleteTask,
    GeneralPermission.DeleteFile,
  ],
  admin: [
    GeneralPermission.CreateSpace,
    GeneralPermission.EditSpace,
    GeneralPermission.CreateRoom,
    GeneralPermission.DeleteRoom,
    GeneralPermission.EditMemberRole,
    GeneralPermission.DeleteMember,
    GeneralPermission.DeleteTask,
    GeneralPermission.DeleteFile,
  ],
  member: [GeneralPermission.CreateSpace, GeneralPermission.DeleteTask],
  // Asigna los permisos según tus necesidades y roles
};
