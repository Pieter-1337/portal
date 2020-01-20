import { Injectable, OnInit, OnChanges } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PersonDto } from "../models/person.model";
import { takeUntil, tap, map, take } from "rxjs/operators";
import { DestroyComponent } from "src/app/core/components/destroy/destroy.component";
import { v4 as uuidGenerator } from "uuid";

@Injectable({ providedIn: "root" })
export class PersonTableService extends DestroyComponent
  implements OnInit, OnChanges {
  persons$: BehaviorSubject<Array<PersonDto>> = new BehaviorSubject<
    Array<PersonDto>
  >(this.getPersons());

  // BehaviorSubject which sens boolean on the stream to update personsTable to each componenet which subscribes it
  updateTable$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  columnsToDisplay = ["Select", "Name", "First-name", "Edit", "Delete"];
  constructor() {
    super();
  }

  ngOnInit() {}
  ngOnChanges() {}
  getPersons(): Array<PersonDto> {
    return [
      {
        id: uuidGenerator(),
        name: "Bracke",
        firstName: "Pieter",
        selectedIn: []
      },
      {
        id: uuidGenerator(),
        name: "Van Walleghem",
        firstName: "Celine",
        selectedIn: []
      }
    ];
  }
  addPerson() {
    this.persons$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(persons => {
          persons.push({
            id: uuidGenerator(),
            name: "Bracke",
            firstName: "Maarten",
            selectedIn: []
          });
        })
      )
      .subscribe();
    this.updateTable$.next(true);
  }

  editPerson(id: string) {
    this.updateTable$.next(true);
  }

  deletePerson(id: string) {
    this.persons$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(persons => {
          persons.splice(persons.indexOf(persons.find(p => p.id === id)), 1);
        })
      )
      .subscribe();
    this.updateTable$.next(true);
  }

  setSelectedIn(id: string, tableName: string) {
    this.persons$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(persons => {
          const index = persons.indexOf(persons.find(p => p.id === id));
          const result = persons[index].selectedIn.find(t => t === tableName);
          // We remove the table from selectedIn array
          if (!!result) {
            const tableNameIndex = persons[index].selectedIn.indexOf(
              persons[index].selectedIn.find(t => t === tableName)
            );

            persons[index].selectedIn.splice(tableNameIndex, 1);
          }
          // We add the table to the selectedIn array
          else {
            persons[index].selectedIn.push(tableName);
          }
        })
      )
      .subscribe();
    this.updateTable$.next(true);
  }

  isChecked(id: string, tableName: string): boolean {
    let isChecked = false;
    this.persons$
      .pipe(
        takeUntil(this.unsubscribe$),
        map(persons => {
          const index = persons.indexOf(persons.find(p => p.id === id));
          const result = persons[index].selectedIn.find(t => t === tableName);
          if (!!result) {
            isChecked = true;
          }
        })
      )
      .subscribe();
    return isChecked;
  }
}
