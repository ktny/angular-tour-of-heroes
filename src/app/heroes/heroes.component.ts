import { Component, OnInit } from "@angular/core";

import { Hero } from "../hero";
import { Store, Select } from "@ngxs/store";
import { HeroAction } from "../actions/hero.action";
import { HeroState } from "../states/hero.state";
import { Observable } from "rxjs";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.scss"],
})
export class HeroesComponent implements OnInit {
  @Select(HeroState.heroes) heroes$: Observable<Hero[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.store.dispatch(new HeroAction.GetAll());
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.store.dispatch(new HeroAction.Add({ name } as Hero));
  }

  delete(hero: Hero): void {
    this.store.dispatch(new HeroAction.Delete(hero));
  }
}
