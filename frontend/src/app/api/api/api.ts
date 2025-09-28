export * from './category.service';
import { CategoryService } from './category.service';
export * from './column.service';
import { ColumnService } from './column.service';
export * from './layout.service';
import { LayoutService } from './layout.service';
export * from './value.service';
import { ValueService } from './value.service';
export const APIS = [CategoryService, ColumnService, LayoutService, ValueService];
