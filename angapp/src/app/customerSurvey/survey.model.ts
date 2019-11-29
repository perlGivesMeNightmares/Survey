export class Survey {
  constructor(
    public title: string,
    public description: string,
    public questions: any,
    public _id?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string,
  ) { }
}