import { InjectModel } from '@nestjs/mongoose';
import { objectIdDto } from 'src/modules/users/dto/users.dto';
import { objectId } from '../type/objectId.type';
// import { Model, Document } from 'mongoose';

export class Repository {
  constructor(@InjectModel('') private readonly model) {}

  public create(data): Promise<any> {
    const doc = new this.model(data);
    return doc.save();
  }

  public find(query = {}, options = '') {
    return this.model.find(query, options);
  }

  public findOne(query = {}, options = ''): Promise<any> {
    return this.model.findOne(query, options);
  }

  public findById(id: objectId, options = ''): Promise<any> {
    return this.model.findById(id, options);
  }

  public findByIdAndUpdate(
    id: objectId,
    update = {},
    options = {},
  ): Promise<any> {
    return this.model.findByIdAndUpdate(id, update, options);
  }

  public findByIdAndDelete(id: objectId, options = {}): Promise<any> {
    return this.model.findByIdAndDelete(id, options);
  }
}
