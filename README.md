# Hırdanet B2B E-Ticaret Platformu

## 📌 Proje Hakkında

Hırdanet B2B, işletmelerin ürünlerini bayilere ulaştırmasını sağlayan modern bir **B2B e-ticaret platformudur**.  
Proje, hem **müşteri tarafı** (ürün inceleme, sepet, sipariş oluşturma) hem de **yönetici tarafı** (ürün, kullanıcı ve sipariş yönetimi) özelliklerini kapsayan uçtan uca bir sistem olarak geliştirilmiştir.

Bu proje kişisel olarak geliştirilmiş olup, modern web teknolojileri ve güncel yazılım mimarileriyle inşa edilmiştir. Amaç, profesyonel bir B2B çözümünün **backend** ve **frontend** entegrasyonunu gerçek bir ürün seviyesinde deneyimlemekti.

---

## 🚀 Kullanılan Teknolojiler

### Backend

- **ASP.NET Core 8.0 / .NET 9**
- **Entity Framework 6 (EF6)**
- **SQLite** veritabanı
- **JWT Authentication** ile kimlik doğrulama
- **Authorization Policy** ile rol ve yetki bazlı kontrol
- **Global Exception Handling**
- **DTO Projection** & Katmanlı Mimari
- **Unit of Work & Generic Repository**
- **MassTransit & RabbitMQ** ile mesaj kuyruğu
- **Redis + FusionCache** ile önbellekleme

### Frontend

- **React (TypeScript)**
- **Redux Toolkit** ile state yönetimi
- **Material UI (MUI)** ile modern UI tasarımı
- **Axios** ile API entegrasyonu
- **React Router** ile çok sayfalı yapı
- **React-Toastify** ile bildirimler

---

## 🛠️ Özellikler

### Kullanıcı Tarafı

- Ürünleri listeleme, detay görüntüleme
- Sepet oluşturma ve yönetme
- Sipariş oluşturma & checkout süreci
- Sipariş geçmişi ve detaylarını görüntüleme
- Kayıt olma & giriş yapma
- JWT tabanlı güvenli oturum yönetimi

### Yönetici (Admin) Paneli

- Yeni ürün ekleme, düzenleme, silme
- Kullanıcı hesaplarını yönetme (aktif/pasif, silme, siparişleri görüntüleme)
- Siparişlerin durumunu değiştirme
- Kullanıcıların bıraktığı mesajları görüntüleme
- AdminGuard ile rol bazlı erişim kontrolü

### Genel Özellikler

- Global hata yönetimi (ProblemDetails)
- Modern 404 sayfası
- Çok dilli karşılama sayfası
- JSONL tabanlı iletişim mesajı kaydı
- Responsive tasarım (mobil uyumlu)

---

## 📂 Proje Yapısı (Özet)

```
Hirdanet-B2B/
│── Api/                # ASP.NET Core Web API
│   ├── Controllers/
│   ├── Entities/
│   ├── DTOs/
│   ├── Services/
│   ├── Data/
│── Client/             # React (TypeScript) frontend
│   ├── src/components/
│   ├── src/pages/
│   ├── src/store/
│   ├── src/api/
│── Infrastructure/     # Redis, MassTransit, Mail Service vb.
```

---

## 🔑 Kurulum ve Çalıştırma

Projeyi klonlamak için:

```bash
git clone https://github.com/menesscelik/B2B-HirdaNet.git
cd B2B-HirdaNet
```

### Gereksinimler

Projeyi çalıştırmak için aşağıdaki araçların kurulu olması gerekir:

- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- [Node.js (>=18.x)](https://nodejs.org/)
- [npm](https://www.npmjs.com/) veya [yarn](https://yarnpkg.com/)
- [SQLite](https://www.sqlite.org/download.html) (opsiyonel, EF Core otomatik oluşturur)
- [Redis](https://redis.io/) (cache için)
- [RabbitMQ](https://www.rabbitmq.com/) (mesaj kuyruğu için, opsiyonel)

### Backend

```bash
cd Api
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend

```bash
cd Client
npm install
npm run dev
```

API varsayılan olarak **https://localhost:5105** üzerinden çalışır.  
Frontend varsayılan olarak **http://localhost:5173** adresinde açılır.

---

## 📖 Sonuç

Bu proje sayesinde modern e-ticaret altyapısının uçtan uca nasıl geliştirileceği deneyimlenmiştir.  
Backend tarafında **güvenlik, performans, entegrasyon** odaklı çözümler; frontend tarafında ise **kullanıcı dostu, modern ve responsive** arayüzler uygulanmıştır.

Projede kullanılan tüm yapılar, ölçeklenebilir ve genişletilebilir bir mimari oluşturmayı hedeflemektedir.

---

## 🧰 Gereksinimler (Prerequisites)

> Aşağıdaki araçların kurulu olması gerekir:

- **.NET SDK 8.0 veya 9.0**
- **Node.js 18+** ve **npm**
- **SQLite** (geliştirme için dahili dosya veritabanı yeterlidir)
- **EF Core CLI** (opsiyonel): `dotnet tool install --global dotnet-ef`
- **Redis** (cache için) — local kurulum veya Docker
- **RabbitMQ** (mesaj kuyruğu/MassTransit için) — local kurulum veya Docker
- (Opsiyonel) **MailTrap** veya SMTP bilgileri (e-posta bildirimleri için)

> Not: Depoda **API** (ASP.NET Core) ve **b2bhirdanet** (React/TypeScript) klasörleri bulunmaktadır. Diller C# ve TypeScript ağırlıklıdır.

---

## 🔧 Kurulum & Çalıştırma

### 1) Depoyu klonla

```bash
git clone https://github.com/menesscelik/B2B-HirdaNet.git
cd B2B-HirdaNet
```

### 2) Backend (API)

```bash
cd API
dotnet restore
dotnet ef database update        # ilk kurulumda migrate et
dotnet run                       # API varsayılan olarak https://localhost:5105'te açılabilir
```

### 3) Frontend (React/TypeScript)

```bash
cd ../b2bhirdanet
npm install
npm run dev                      # varsayılan olarak http://localhost:5173
```

> Geliştirme akışı: Önce Docker ile Redis/RabbitMQ’yu başlatın → API’yi çalıştırın → Frontend’i başlatın.

---

## 🧑‍💻 Geliştirici Komutları

**EF Core**

```bash
dotnet ef migrations add Init
dotnet ef database update
```

**NPM**

```bash
npm run dev       # geliştirme
npm run build     # üretim derlemesi
npm run preview   # build sonrası yerel önizleme
```

---

## ❓ Sık Karşılaşılan Sorular

- **Veritabanı dosyası nerede?**  
  SQLite kullanıyorsanız `app.db` gibi bir dosya API çalıştığında proje kökünde oluşur.
  
- **JWT Key nedir?**  
  `appsettings.json` altındaki `Jwt:Key` alanı, token imzalama anahtarıdır. Yerelde uzun ve güçlü bir key kullanın.
  
- **Cache/RabbitMQ olmadan çalışır mı?**  
  API temel fonksiyonları çalışır, ancak mesajlaşma/önbellek özellikleri devre dışı kalır veya sınırlı çalışır.
  

---

## 🔐 Güvenlik Notları

- Gizli bilgileri `.gitignore` dışındaki dosyalara koymayın.
- Üretimde **HTTPS**, **Güçlü JWT Key**, **CORS ayarları** ve **Rate Limiting** uygulayın.
- Admin arayüz erişimlerini **Policy/Role** bazlı kontrol edin.
