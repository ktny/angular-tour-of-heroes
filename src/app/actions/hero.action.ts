import { Hero } from "../hero";

export namespace HeroAction {
  export class GetAll {
    static readonly type = "[Hero] GetAll";
  }

  export class Get {
    static readonly type = "[Hero] Get";
    constructor(public id: number) {}
  }

  export class Add {
    static readonly type = "[Hero] Add";
    constructor(public hero: Hero) {}
  }

  export class Delete {
    static readonly type = "[Hero] Delete";
    constructor(public hero: Hero | number) {}
  }

  export class Update {
    static readonly type = "[Hero] Update";
    constructor(public hero: Hero) {}
  }
}
