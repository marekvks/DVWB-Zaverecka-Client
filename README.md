# Jak na spuštění projektu
1. Stáhnutí repozitáře

```bash
git clone https://github.com/marekvks/DVWB-Zaverecka-Client.git
```

2. Po otevření je potřeba spustit v obou souborech příkaz:
```bash
npm i
```
Tento příkaz nám nainstaluje všechny dependence, které jsou potřeba ke spuštění clienta.

3. Nastavení enviromentální proměnných
  - v kořenovém adresáři udělat soubor `.env` a vložit do něj proměnné z `.env.template`, ještě je potřeba je správně nastavit

5. Nyní už stačí jen soubory spustit a to uděláme následujícím příkazem:
```bash
npm run dev
# nebo
yarn dev
# nebo
pnpm dev
# nebo
bun dev
```
