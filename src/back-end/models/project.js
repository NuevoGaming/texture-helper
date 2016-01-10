import ProjectMeta from '../../contracts/ProjectMeta';

export default class Project {
  constructor(meta) {
    this.Name = meta.Name;
    this.FrameworkType = meta.FrameworkCode;
    this.Location = meta.Location;
  }
}
