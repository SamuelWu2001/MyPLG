import { Injectable } from '@nestjs/common';
// import { HttpService } from '@nestjs/axios';
import { Todo } from './common/models/todo.model';
import { Observable } from 'rxjs';
import { Agent } from 'https';
import { map } from 'rxjs';

@Injectable()
export class AppService {
  constructor() {
  }
}
