import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryReadDto } from '../swagger';


@Injectable({
  providedIn: 'root'
})
export class ListService {
  // private categories = new BehaviorSubject<CategoryReadDto[]>([]);
  // items$ = this.categories.asObservable();

  // addItem(item: CategoryReadDto) {
  //   const current = this.categories.value;
  //   this.categories.next([...current, item]);
  // }

  // setCategories(list: CategoryReadDto[]) {
  //   this.categories.next(list);
  // }

  // getCategories(): CategoryReadDto[] {
  //   return this.categories.value;
  // }

  // removeItem(index: number) {
  //   const current = this.categories.value;
  //   current.splice(index, 1);
  //   this.categories.next([...current]);
  // }

  // removeItemById(id: string) {
  //   const current = this.categories.value;
  //   const updated = current.filter(item => item.id !== id);
  //   this.categories.next(updated);
  // }

  // clearItems() {
  //   this.categories.next([]);
  // }

  // getItemById(id: string): CategoryReadDto | undefined {
  //   return this.categories.value.find(item => item.id === id);
  // }

  // updateItem(updated: CategoryReadDto) {
  //   const current = this.categories.value;
  //   const index = current.findIndex(i => i.id === updated.id);
  //   if (index !== -1) {
  //     current[index] = updated;
  //     this.categories.next([...current]);
  //   }
  // }




  // private layouts = new BehaviorSubject<Layout[]>([]);
  // layouts$ = this.layouts.asObservable();

  // addLayout(layout: Layout) {
  //   const current = this.layouts.value;
  //   this.layouts.next([...current, layout]);
  // }

  // removeLayout(index: number) {
  //   const current = this.layouts.value;
  //   current.splice(index, 1);
  //   this.layouts.next([...current]);
  // }

  // removeLayoutById(id: number) {
  //   const current = this.layouts.value;
  //   const updated = current.filter(layout => layout.id !== id);
  //   this.layouts.next(updated);
  // }

  // clearLayouts() {
  //   this.layouts.next([]);
  // }

  // getLayoutById(id: number): Layout | undefined {
  //   return this.layouts.value.find(layout => layout.id === id);
  // }

  // updateLayout(updated: Layout) {
  //   const current = this.layouts.value;
  //   const index = current.findIndex(l => l.id === updated.id);
  //   if (index !== -1) {
  //     current[index] = updated;
  //     this.layouts.next([...current]);
  //   }
  // }


}
