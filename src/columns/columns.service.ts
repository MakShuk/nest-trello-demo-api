import { Injectable } from '@nestjs/common';

@Injectable()
export class ColumnsService {
  getUserColumns(userId: string) {
    return `Columns for user ${userId}`;
  }

  getAllColumns() {
    return `All columns`;
  }

  createColumn(title: string, userId: string) {
    return `Column ${title} created for user ${userId}`;
  }
}
