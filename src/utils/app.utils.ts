export class AppUtils {
  static filterUserData(data: any) {
    const { passwordHash, ...userWithoutPass } = data;
    return userWithoutPass;
  }
}
