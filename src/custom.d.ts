// src/custom.d.ts
declare module "*.jsx";
declare module "*.js";

// Si tu veux déclarer une page particulière (astuce rapide)
declare module "./pages/QuranAyahPage" {
  const whatever: any;
  export default whatever;
}
