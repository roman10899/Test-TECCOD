MVP сервиса дополнительных услуг для авиапассажиров
=================================================
Экран выбора дополнительных услуг — список услуг, кнопки "Добавить", блок "Итого" с суммой и кнопкой оформления.

Технологии
- React + TypeScript
- Supabase (хранение услуг)

Быстрый старт
Установите зависимости и запустите dev-сервер:

```bash
npm install
npm run dev
```

SQL для таблицы `services` (вставьте в SQL-редактор Supabase):

```sql
CREATE TABLE public.services (
	id text PRIMARY KEY,
	title text NOT NULL,
	description text,
	price numeric NOT NULL,
	icon text,
	created_at timestamptz DEFAULT now()
);
```

Где смотреть
- Клиент Supabase: `src/lib/supabase.ts`
- API услуг: `src/entities/service/api.ts`
- Страницы: `src/pages/Index.tsx`, `src/pages/Admin.tsx`

Админка
- Маршрут `/admin` позволяет добавить/удалить услуги (работает через Supabase).

