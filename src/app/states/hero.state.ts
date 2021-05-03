import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { Hero } from "../hero";
import { HeroAction } from "../actions/hero.action";
import { HeroService } from "../hero.service";
import { tap, finalize } from "rxjs/operators";

export class HeroStateModel {
  heroes: Hero[];
  selectedHero: Hero;
}

@State<HeroStateModel>({
  name: "heroes",
  defaults: {
    heroes: [],
    selectedHero: null,
  },
})
@Injectable()
export class HeroState {
  constructor(private heroService: HeroService) {}

  @Action(HeroAction.GetAll)
  getHeroes(ctx: StateContext<HeroStateModel>) {
    return this.heroService.getHeroes().pipe(tap(data => ctx.patchState({ heroes: data })));
  }

  @Action(HeroAction.Get)
  getHero(ctx: StateContext<HeroStateModel>, action: HeroAction.Get) {
    return this.heroService.getHero(action.id).pipe(tap(data => ctx.patchState({ selectedHero: data })));
  }

  @Action(HeroAction.Add)
  addHero(ctx: StateContext<HeroStateModel>, action: HeroAction.Add) {
    return this.heroService.addHero(action.hero).pipe(finalize(() => ctx.dispatch(new HeroAction.GetAll())));
  }

  @Action(HeroAction.Delete)
  deleteHero(ctx: StateContext<HeroStateModel>, action: HeroAction.Delete) {
    return this.heroService.deleteHero(action.hero).pipe(finalize(() => ctx.dispatch(new HeroAction.GetAll())));
  }

  @Action(HeroAction.Update)
  updateHero(ctx: StateContext<HeroStateModel>, action: HeroAction.Update) {
    return this.heroService.updateHero(action.hero).pipe(finalize(() => ctx.patchState({ selectedHero: action.hero })));
  }

  @Selector()
  static heroes(state: HeroStateModel) {
    return state.heroes;
  }

  @Selector()
  static selectedHero(state: HeroStateModel) {
    return state.selectedHero;
  }
}
