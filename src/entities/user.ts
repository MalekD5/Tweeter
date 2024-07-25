export class User {
  id: string;
  username: string;
  displayName: string;
  image: string;

  constructor(id: string, username: string, displayName: string, image: string) {
    this.id = id;
    this.username = username;
    this.displayName = displayName;
    this.image = image;
  }
}
