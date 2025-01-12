# Форма калькулятора Типографии

Pocketbase приложение и svelte фронт для реализации калькулятора для рассчёта типографских заказов.

После запуска приложения следует инциализировать значения во всех коллекциях БД кроме orders.

## Сборка

```bash
docker build . --push -t twobrowin/bmstu-typo-form:<version>
```

## Развёртывание

```bash
helm upgrade --install --debug -n public bmstu-typo-v1 ./charts
```

## Зависимости k8s

Следует создать неймспейс `public`