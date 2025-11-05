# Money Guard

## Kurulum

```bash
npm install
npm start
```

## Takım Üyeleri

- Gizem Demirci
- Nisa İcik
- Emre Ayvaz
- Doğan Demirbaş
- Aykut Şahinbaş
- Miraç Şengül

## Geliştirme Kuralları

## Environment variables

Create a `.env` file in the root with:
REACT_APP_API_BASE_URL=https://wallet.b.goit.study
REACT_APP_MONOBANK_URL=https://api.monobank.ua/bank/currency

### Branch Yapısı

- Branch'ler: [dev-isim] formatında oluşturulmalı

### Çalışma Akışı

1. **Kod yazmaya başlamadan önce:**

   - git checkout main
   - git pull origin main
   - git checkout [dev-isim]
   - git merge main

2. **Kodunuzu yazın ve commit edin:**

   - git add .
   - git commit -m "commit mesajı"

3. **Push atmadan önce tekrar main'i merge edin:**

   - git merge main

4. **Push atın:**

   - git push origin [dev-isim]

5. **GitHub'da Pull Request açın**
