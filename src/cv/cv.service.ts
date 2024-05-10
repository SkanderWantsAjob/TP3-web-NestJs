import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CvRepository } from './cv.repository';
import { Cv } from './entities/cv.entity';
import { GetCvFilterDto } from './dto/get-cv-filter.dto';
import { ActionEnum } from '../common/action.enum';
import { eventType } from 'src/common/event.type';
import { Users } from 'src/auth/auth.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvRepository)
    private cvrespository: CvRepository,
    private eventEmitter: EventEmitter2,
    private userService: UserService,
  ) {}

  async create(createCvDto: CreateCvDto): Promise<Cv> {
    const createdCV = await this.cvrespository.createCv(createCvDto);
    const eventData = {
      cv: createdCV,
      name: createCvDto.name,
      actionBy: createdCV.user,
      date: new Date(),
      userid: await this.userService.findById(+createdCV.user),
    };
    this.eventEmitter.emit('cv.added', eventData);
    this.eventEmitter.emit('persistence', {
      cv: createdCV,
      user:  await this.userService.findById(+createdCV.user),
      action: ActionEnum.CREATE,
    } as eventType);
    
    return createdCV;
  }

  async findAll(filter: GetCvFilterDto): Promise<Cv[]> {
    return await this.cvrespository.getCvs(filter);
  }

  async findById(id: number): Promise<Cv> {
    const found = await this.cvrespository.findOne({ where: { id } });
    if (found) {
      return found;
    }
    throw new NotFoundException(`Cv with id ${id} not found`);
  }

  async remove(id: number): Promise<Cv> {
    const found = await this.findById(id);
    if (found) {
      const eventData = {
        cv: found,
        name: found.name,
        actionBy: found.user,
        date: new Date(),
        userid: found.user,
      };
      this.eventEmitter.emit('cv.deleted', eventData);
      this.eventEmitter.emit('persistence', {
        cv: found,
        user: found.user,
        action: ActionEnum.DELETE,
      } as eventType);

      this.cvrespository.remove(found);
      return found;
    } else {
      throw new NotFoundException();
    }
  }
  async update(id: number, updateCvDto: UpdateCvDto): Promise<Cv> {
    const cv = await this.findById(id);
    if (cv) {
      Object.assign(cv, updateCvDto);
      const eventData = {
        cv: cv,
        name: cv.name,
        actionBy: cv.user,
        date: new Date(),
        userid: cv.user,
      };
      this.eventEmitter.emit('cv.updated', eventData);
      this.eventEmitter.emit('persistence', {
        cv: cv,
        user: await this.userService.findById(+cv.user),
        action: ActionEnum.UPDATE,
      } as eventType);
      return this.cvrespository.save(cv);
    } else {
      throw new NotFoundException();
    }
  }
}
