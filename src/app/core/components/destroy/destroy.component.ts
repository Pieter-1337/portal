import { OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

export class DestroyComponent implements OnDestroy {
  public unsubscribe$ = new Subject();
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
