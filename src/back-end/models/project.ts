/// <reference path="../../contracts/ProjectMeta.ts" />

export class Project {
  public Name: string;
  public FrameworkType: string;
  public Location: string;
  constructor(meta:ProjectMeta) {
    this.Name = meta.Name;
    this.Type = meta.FrameworkType;
    this.Location = meta.Location;
  }
}
