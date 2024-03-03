// import type { HttpContext } from '@adonisjs/core/http'


// export default class VerifyCsrfToken {
//   public static excludes = ['/userLogin'];

//   constructor(private ctx: HttpContext) {}

//   public async handle(next: () => Promise<void>) {
//     if (VerifyCsrfToken.excludes.includes(this.ctx.request.url())) {
//       await next();
//       return;
//     }

//     await this.ctx.verifyCsrfToken();
//     await next();
//   }
// }


import type { HttpContext } from '@adonisjs/core/http'

export default class VerifyCsrfToken {
  public static excludes = ['/userLogin'];

  constructor(private ctx: HttpContext) {}

  public async handle(next: () => Promise<void>) {
    if (VerifyCsrfToken.excludes.includes(this.ctx.request.url())) {
      await next();
      return;
    }
    await next();
  }
}
