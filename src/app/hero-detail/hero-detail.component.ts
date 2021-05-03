import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Hero } from "../hero";
import { Store, Select } from "@ngxs/store";
import { HeroAction } from "../actions/hero.action";
import { HeroState } from "../states/hero.state";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";

@Component({
  selector: "app-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.scss"],
})
export class HeroDetailComponent implements OnInit {
  @Select(HeroState.selectedHero) hero$: Observable<Hero>;

  constructor(private route: ActivatedRoute, private location: Location, private store: Store) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.store.dispatch(new HeroAction.Get(id));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.hero$.pipe(first()).subscribe(hero => {
      this.store.dispatch(new HeroAction.Update(hero));
      this.goBack();
    });
  }
}
